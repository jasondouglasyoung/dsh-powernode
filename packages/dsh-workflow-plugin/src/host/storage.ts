import { createHash, randomUUID } from 'node:crypto'
import { constants } from 'node:fs'
import { access, open, mkdir, readFile, readdir, realpath, rename, stat, unlink } from 'node:fs/promises'
import { homedir } from 'node:os'
import { dirname, isAbsolute, join, normalize, relative, resolve, sep } from 'node:path'
import type { ArtifactCheckResult, PendingEditProposalSummary, PendingSessionDraftSummary, SessionWorkflowAssociation, SessionWorkflowDraft, SessionWorkflowEditProposal, WorkflowDefinition, WorkflowRun } from '../shared/types.js'
import { normalizeDirectoryInput } from '../shared/path-input.js'
import { validateWorkflow, WorkflowValidationError } from '../domain/graph.js'
import { assertEditCandidateAllowed, computeWorkflowEditDiff } from '../domain/workflow-edit.js'

interface StoreData {
  readonly schemaVersion: number
  workflows: WorkflowDefinition[]
  runs: WorkflowRun[]
  associations: SessionWorkflowAssociation[]
  sessionDrafts: SessionWorkflowDraft[]
  editProposals: SessionWorkflowEditProposal[]
}

interface LockRecord {
  readonly pid: number
  readonly runId: string
  readonly nonce: string
  readonly createdAt: number
}

const MAX_STORE_BYTES = 64 * 1024 * 1024
const ACTIVE_RUN_STATES = new Set(['queued', 'running', 'pausing', 'paused', 'verifying'])
const MAX_ATOMIC_RENAME_RETRIES = 5

/** Windows scanners/indexers may briefly hold the previous state file during replace. */
export async function renameWithTransientRetry(
  source: string,
  destination: string,
  renameFile: typeof rename = rename,
  wait: (milliseconds: number) => Promise<void> = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)),
  signal?: AbortSignal,
): Promise<void> {
  for (let attempt = 0; ; attempt++) {
    throwIfAborted(signal)
    try {
      await renameFile(source, destination)
      return
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code
      if (!['EPERM', 'EACCES', 'EBUSY'].includes(code ?? '') || attempt >= MAX_ATOMIC_RENAME_RETRIES) throw error
      await wait(Math.min(20 * 2 ** attempt, 320))
    }
  }
}

export function emptyStore(): StoreData {
  return { schemaVersion: 5, workflows: [], runs: [], associations: [], sessionDrafts: [], editProposals: [] }
}

export function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

export class WorkflowStorage {
  readonly root: string
  private readonly statePath: string
  private readonly lockPath: string
  private localQueue: Promise<void> = Promise.resolve()
  private data: StoreData = emptyStore()

  constructor() {
    const dshHome = process.env.DSH_HOME?.trim()
    this.root = resolve(dshHome || join(homedir(), '.dsh'), 'workflow-plugin')
    this.statePath = join(this.root, 'state.json')
    this.lockPath = join(this.root, 'workflow-run.lock')
  }

  async initialize(): Promise<void> {
    await mkdir(this.root, { recursive: true })
    const actualRoot = await realpath(this.root)
    const rootStat = await stat(actualRoot)
    if (!rootStat.isDirectory()) throw new Error('DSH 工作流数据路径不是目录。')
    const content = await readFile(this.statePath, 'utf8').catch((error: NodeJS.ErrnoException) => {
      if (error.code === 'ENOENT') return undefined
      throw error
    })
    if (content !== undefined) {
      if (Buffer.byteLength(content, 'utf8') > MAX_STORE_BYTES) throw new Error('工作流本地数据超过 64 MiB，已停止读取以保护启动过程。')
      const parsed = JSON.parse(content) as Partial<StoreData>
      if (![1, 2, 3, 4, 5].includes(parsed.schemaVersion ?? 0) || !Array.isArray(parsed.workflows) || !Array.isArray(parsed.runs)) {
        throw new Error('工作流本地数据格式无法识别；原文件已保留，请先备份后修复。')
      }
      this.data = decodeStore(parsed as StoreData)
      if (parsed.schemaVersion !== 5) await this.mutate(() => undefined)
    }
    await this.recoverInterruptedRuns()
  }

  listWorkflows(): readonly WorkflowDefinition[] {
    return cloneValue(this.data.workflows)
  }

  getWorkflow(id: string): WorkflowDefinition | undefined {
    const workflow = this.data.workflows.find((item) => item.id === id)
    return workflow ? cloneValue(workflow) : undefined
  }

  getSessionAssociation(sessionId: string): SessionWorkflowAssociation | undefined {
    const association = this.data.associations.find((item) => item.sessionId === sessionId)
    return association ? cloneValue(association) : undefined
  }

  getSessionDraft(sessionId: string): SessionWorkflowDraft | undefined {
    const draft = this.data.sessionDrafts.find((item) => item.sessionId === sessionId)
    return draft ? cloneValue(draft) : undefined
  }

  getSessionEditProposal(sessionId: string): SessionWorkflowEditProposal | undefined {
    const proposal = this.data.editProposals.find((item) => item.sessionId === sessionId)
    return proposal ? cloneValue(proposal) : undefined
  }

  listPendingEditProposals(): readonly PendingEditProposalSummary[] {
    return this.data.editProposals.map((proposal) => ({
      sessionId: proposal.sessionId,
      proposalId: proposal.proposalId,
      workflowId: proposal.workflowId,
      workflowTitle: proposal.baseWorkflow.title,
      baseWorkflowRevision: proposal.baseWorkflowRevision,
      revision: proposal.revision,
      model: proposal.model,
      createdAt: proposal.createdAt,
      updatedAt: proposal.updatedAt,
    }))
  }

  listPendingSessionDrafts(): readonly PendingSessionDraftSummary[] {
    return this.data.sessionDrafts.map((draft) => ({
      sessionId: draft.sessionId,
      draftId: draft.draftId,
      commandId: draft.commandId,
      workflowTitle: draft.workflow.title,
      revision: draft.revision,
      taskCount: draft.workflow.nodes.filter((node) => node.type === 'task').length,
      model: draft.model,
      createdAt: draft.createdAt,
      updatedAt: draft.updatedAt,
    }))
  }

  async withSessionDraftLock<T>(sessionId: string, operation: () => Promise<T>, signal?: AbortSignal): Promise<T> {
    validateSessionId(sessionId)
    throwIfAborted(signal)
    const lockPath = join(this.root, `workflow-draft-${createHash('sha256').update(sessionId).digest('hex')}.lock`)
    let lock: LockRecord
    try {
      lock = await this.acquireLock(lockPath, `draft:${sessionId}`)
    } catch (error) {
      if (error instanceof WorkflowValidationError && error.code === 'run.locked') {
        throw new WorkflowValidationError('draft.busy', '当前会话已有工作流草稿正在生成，请稍后重试。')
      }
      throw error
    }
    try {
      throwIfAborted(signal)
      return await operation()
    } finally {
      await this.releaseLock(lockPath, lock)
    }
  }

  listRuns(workflowId?: string): readonly WorkflowRun[] {
    return cloneValue(this.data.runs
      .filter((run) => workflowId === undefined || run.workflowId === workflowId)
      .sort((a, b) => b.createdAt - a.createdAt))
  }

  getRun(id: string): WorkflowRun | undefined {
    const run = this.data.runs.find((item) => item.id === id)
    return run ? cloneValue(run) : undefined
  }

  async refresh(): Promise<void> {
    await this.localQueue
    await this.refreshFromDisk()
  }

  findRunByRequestId(requestId: string): WorkflowRun | undefined {
    const run = this.data.runs.find((item) => item.requestId === requestId)
    return run ? cloneValue(run) : undefined
  }

  hasActiveRun(workflowId?: string): boolean {
    return this.data.runs.some((run) => ACTIVE_RUN_STATES.has(run.state) && (workflowId === undefined || run.workflowId === workflowId))
  }

  async saveWorkflow(workflow: WorkflowDefinition, expectedRevision: number): Promise<WorkflowDefinition> {
    validateWorkflow(workflow)
    if (!Number.isInteger(expectedRevision) || expectedRevision < 0) throw new WorkflowValidationError('workflow.revision', 'expectedRevision 无效。')
    let committed: WorkflowDefinition | undefined
    await this.mutate((data) => {
      const index = data.workflows.findIndex((item) => item.id === workflow.id)
      const current = index < 0 ? undefined : data.workflows[index]
      const actualRevision = current?.revision ?? 0
      if (actualRevision !== expectedRevision) throw new WorkflowValidationError('workflow.conflict', `修订冲突：期望 ${expectedRevision}，当前 ${actualRevision}。`)
      committed = { ...cloneValue(workflow), revision: actualRevision + 1, updatedAt: Date.now() }
      if (index < 0) data.workflows.push(committed)
      else data.workflows[index] = committed
    })
    return cloneValue(committed!)
  }

  /** Save a graph and link it to one session under the same cross-process write lock. */
  async saveWorkflowForSession(
    workflow: WorkflowDefinition,
    expectedRevision: number,
    sessionId: string,
    expectedAssociationRevision: number,
    draftCommit?: { readonly draftId: string; readonly expectedDraftRevision: number },
  ): Promise<{ workflow: WorkflowDefinition; association: SessionWorkflowAssociation }> {
    validateWorkflow(workflow)
    validateExpectedRevision(expectedRevision, 'workflow.revision')
    validateSessionId(sessionId)
    validateExpectedRevision(expectedAssociationRevision, 'association.revision')
    let committed: WorkflowDefinition | undefined
    let association: SessionWorkflowAssociation | undefined
    await this.mutate((data) => {
      const index = data.workflows.findIndex((item) => item.id === workflow.id)
      const current = index < 0 ? undefined : data.workflows[index]
      const actualRevision = current?.revision ?? 0
      if (actualRevision !== expectedRevision) throw new WorkflowValidationError('workflow.conflict', `修订冲突：期望 ${expectedRevision}，当前 ${actualRevision}。`)

      const associationIndex = data.associations.findIndex((item) => item.sessionId === sessionId)
      const currentAssociation = associationIndex < 0 ? undefined : data.associations[associationIndex]
      const actualAssociationRevision = currentAssociation?.revision ?? 0
      if (actualAssociationRevision !== expectedAssociationRevision) {
        throw new WorkflowValidationError('association.conflict', `会话关联已更新：期望 ${expectedAssociationRevision}，当前 ${actualAssociationRevision}。`)
      }

      if (draftCommit) {
        const draftIndex = data.sessionDrafts.findIndex((item) => item.sessionId === sessionId)
        const currentDraft = draftIndex < 0 ? undefined : data.sessionDrafts[draftIndex]
        if (!currentDraft || currentDraft.draftId !== draftCommit.draftId
          || currentDraft.revision !== draftCommit.expectedDraftRevision
          || currentDraft.workflow.id !== workflow.id) {
          throw new WorkflowValidationError('draft.conflict', '会话草稿已变化或失效；请刷新后再保存。')
        }
        data.sessionDrafts.splice(draftIndex, 1)
      }
      if (data.editProposals.some((proposal) => proposal.sessionId === sessionId)) {
        throw new WorkflowValidationError('edit.pending', '当前会话有待确认的编辑建议，请先应用或放弃，再保存其他改动。')
      }

      committed = { ...cloneValue(workflow), revision: actualRevision + 1, updatedAt: Date.now() }
      if (index < 0) data.workflows.push(committed)
      else data.workflows[index] = committed

      if (currentAssociation?.workflowId === workflow.id) association = currentAssociation
      else {
        association = {
          sessionId,
          workflowId: workflow.id,
          revision: actualAssociationRevision + 1,
          updatedAt: Date.now(),
        }
        if (associationIndex < 0) data.associations.push(association)
        else data.associations[associationIndex] = association
      }
    })
    return { workflow: cloneValue(committed!), association: cloneValue(association!) }
  }

  async saveSessionDraft(draft: Omit<SessionWorkflowDraft, 'revision' | 'updatedAt'>, expectedRevision: number, signal?: AbortSignal): Promise<SessionWorkflowDraft> {
    validateSessionId(draft.sessionId)
    validateExpectedRevision(expectedRevision, 'draft.revision')
    validateWorkflow(draft.workflow)
    if (!draft.draftId.trim() || !draft.commandId.trim() || draft.workflow.id !== draft.draftId
      || !Number.isFinite(draft.createdAt) || !draft.model.trim()) {
      throw new WorkflowValidationError('draft.shape', '命令草稿记录信息无效。')
    }
    throwIfAborted(signal)
    let committed: SessionWorkflowDraft | undefined
    await this.mutate((data) => {
      throwIfAborted(signal)
      const index = data.sessionDrafts.findIndex((item) => item.sessionId === draft.sessionId)
      const current = index < 0 ? undefined : data.sessionDrafts[index]
      const actualRevision = current?.revision ?? 0
      if (actualRevision !== expectedRevision || current && current.draftId !== draft.draftId) {
        throw new WorkflowValidationError('draft.conflict', `草稿修订冲突：期望 ${expectedRevision}，当前 ${actualRevision}。`)
      }
      committed = { ...cloneValue(draft), revision: actualRevision + 1, updatedAt: Date.now() }
      if (index < 0) data.sessionDrafts.push(committed)
      else data.sessionDrafts[index] = committed
    }, signal)
    return cloneValue(committed!)
  }

  async discardSessionDraft(sessionId: string, draftId: string, expectedRevision: number): Promise<void> {
    validateSessionId(sessionId)
    validateExpectedRevision(expectedRevision, 'draft.revision')
    await this.mutate((data) => {
      const index = data.sessionDrafts.findIndex((item) => item.sessionId === sessionId)
      const current = index < 0 ? undefined : data.sessionDrafts[index]
      if (!current || current.draftId !== draftId || current.revision !== expectedRevision) {
        throw new WorkflowValidationError('draft.conflict', '会话草稿已变化或失效；请刷新后重试。')
      }
      data.sessionDrafts.splice(index, 1)
    })
  }

  async saveSessionEditProposal(proposal: Omit<SessionWorkflowEditProposal, 'revision' | 'updatedAt'>, expectedRevision = 0, signal?: AbortSignal): Promise<SessionWorkflowEditProposal> {
    validateSessionId(proposal.sessionId)
    validateExpectedRevision(expectedRevision, 'edit.revision')
    if (!proposal.proposalId.trim() || !proposal.commandId.trim() || !proposal.workflowId.trim() || proposal.baseWorkflow.id !== proposal.workflowId
      || proposal.workflow.id !== proposal.workflowId || proposal.baseWorkflow.revision !== proposal.baseWorkflowRevision
      || proposal.workflow.revision !== proposal.baseWorkflowRevision || !proposal.model.trim()
      || !Number.isFinite(proposal.createdAt)) throw new WorkflowValidationError('edit.shape', '编辑提案记录信息无效。')
    validateWorkflow(proposal.baseWorkflow)
    validateWorkflow(proposal.workflow)
    assertEditCandidateAllowed(proposal.baseWorkflow, proposal.workflow)
    throwIfAborted(signal)
    let committed: SessionWorkflowEditProposal | undefined
    await this.mutate((data) => {
      throwIfAborted(signal)
      const index = data.editProposals.findIndex((item) => item.sessionId === proposal.sessionId)
      const current = index < 0 ? undefined : data.editProposals[index]
      const actualRevision = current?.revision ?? 0
      if (actualRevision !== expectedRevision || current) throw new WorkflowValidationError('edit.pending', '当前会话已有待处理的编辑建议，请先应用或放弃。')
      committed = { ...cloneValue(proposal), revision: actualRevision + 1, updatedAt: Date.now() }
      data.editProposals.push(committed)
    }, signal)
    return cloneValue(committed!)
  }

  async updateSessionEditProposal(sessionId: string, proposalId: string, expectedRevision: number, workflow: WorkflowDefinition): Promise<SessionWorkflowEditProposal> {
    validateSessionId(sessionId)
    validateExpectedRevision(expectedRevision, 'edit.revision')
    validateWorkflow(workflow)
    let committed: SessionWorkflowEditProposal | undefined
    await this.mutate((data) => {
      const index = data.editProposals.findIndex((item) => item.sessionId === sessionId)
      const current = index < 0 ? undefined : data.editProposals[index]
      if (!current || current.proposalId !== proposalId || current.revision !== expectedRevision || workflow.id !== current.workflowId || workflow.revision !== current.baseWorkflowRevision) {
        throw new WorkflowValidationError('edit.conflict', '编辑提案已变化或失效；请刷新后重试。')
      }
      assertEditCandidateAllowed(current.baseWorkflow, workflow)
      committed = { ...current, workflow: cloneValue(workflow), revision: current.revision + 1, updatedAt: Date.now() }
      data.editProposals[index] = committed
    })
    return cloneValue(committed!)
  }

  async applySessionEditProposal(sessionId: string, proposalId: string, expectedProposalRevision: number): Promise<WorkflowDefinition> {
    validateSessionId(sessionId)
    validateExpectedRevision(expectedProposalRevision, 'edit.revision')
    let committed: WorkflowDefinition | undefined
    await this.mutate((data) => {
      const proposalIndex = data.editProposals.findIndex((item) => item.sessionId === sessionId)
      const proposal = proposalIndex < 0 ? undefined : data.editProposals[proposalIndex]
      if (!proposal || proposal.proposalId !== proposalId || proposal.revision !== expectedProposalRevision) {
        throw new WorkflowValidationError('edit.conflict', '编辑提案已变化或已处理；请刷新后查看当前状态。')
      }
      const workflowIndex = data.workflows.findIndex((item) => item.id === proposal.workflowId)
      const current = workflowIndex < 0 ? undefined : data.workflows[workflowIndex]
      if (!current || current.revision !== proposal.baseWorkflowRevision || JSON.stringify(current) !== JSON.stringify(proposal.baseWorkflow)) {
        throw new WorkflowValidationError('edit.workflow-conflict', `基础流程修订已变化（提案依据 ${proposal.baseWorkflowRevision}，当前 ${current?.revision ?? '已删除'}）；提案保留，请重新加载后规划。`)
      }
      const association = data.associations.find((item) => item.sessionId === sessionId)
      if (!association || association.workflowId !== proposal.workflowId || association.revision !== proposal.baseAssociationRevision) {
        throw new WorkflowValidationError('edit.association-conflict', '当前会话的流程关联已变化；提案保留，请重新打开当前关联流程后规划。')
      }
      if (data.runs.some((run) => run.workflowId === proposal.workflowId && ACTIVE_RUN_STATES.has(run.state))) {
        throw new WorkflowValidationError('edit.run-active', '该流程仍有活动运行。请先从运行控制界面处理运行，再应用编辑。')
      }
      const proposed = { ...cloneValue(proposal.workflow), id: current.id, revision: current.revision, createdAt: current.createdAt, updatedAt: current.updatedAt }
      validateWorkflow(proposed)
      assertEditCandidateAllowed(current, proposed)
      const diff = computeWorkflowEditDiff(current, proposed)
      if (!diff.addedNodes.length && !diff.removedNodes.length && !diff.changedNodes.length && !diff.addedEdges.length && !diff.removedEdges.length) {
        throw new WorkflowValidationError('edit.empty', '编辑建议没有实际差异；请放弃提案，不会创建空修订。')
      }
      const candidate = { ...proposed, revision: current.revision + 1, updatedAt: Date.now() }
      validateWorkflow(candidate)
      committed = candidate
      data.workflows[workflowIndex] = candidate
      data.editProposals.splice(proposalIndex, 1)
    })
    return cloneValue(committed!)
  }

  async discardSessionEditProposal(sessionId: string, proposalId: string, expectedRevision: number): Promise<void> {
    validateSessionId(sessionId)
    validateExpectedRevision(expectedRevision, 'edit.revision')
    await this.mutate((data) => {
      const index = data.editProposals.findIndex((item) => item.sessionId === sessionId)
      const current = index < 0 ? undefined : data.editProposals[index]
      if (!current || current.proposalId !== proposalId || current.revision !== expectedRevision) {
        throw new WorkflowValidationError('edit.conflict', '编辑提案已变化或失效；请刷新后重试。')
      }
      data.editProposals.splice(index, 1)
    })
  }

  async associateSessionWorkflow(
    sessionId: string,
    workflowId: string,
    expectedAssociationRevision: number,
  ): Promise<SessionWorkflowAssociation> {
    validateSessionId(sessionId)
    validateExpectedRevision(expectedAssociationRevision, 'association.revision')
    let committed: SessionWorkflowAssociation | undefined
    await this.mutate((data) => {
      if (!data.workflows.some((item) => item.id === workflowId)) {
        throw new WorkflowValidationError('workflow.not-found', '找不到该工作流，请刷新列表后重新选择。')
      }
      const index = data.associations.findIndex((item) => item.sessionId === sessionId)
      const current = index < 0 ? undefined : data.associations[index]
      if (data.editProposals.some((proposal) => proposal.sessionId === sessionId)) {
        throw new WorkflowValidationError('edit.pending', '当前会话有待处理编辑建议，请先应用或放弃，再更改流程关联。')
      }
      const actualRevision = current?.revision ?? 0
      if (actualRevision !== expectedAssociationRevision) {
        throw new WorkflowValidationError('association.conflict', `会话关联已更新：期望 ${expectedAssociationRevision}，当前 ${actualRevision}。`)
      }
      if (current?.workflowId === workflowId) {
        committed = current
        return
      }
      committed = { sessionId, workflowId, revision: actualRevision + 1, updatedAt: Date.now() }
      if (index < 0) data.associations.push(committed)
      else data.associations[index] = committed
    })
    return cloneValue(committed!)
  }

  async removeWorkflow(id: string): Promise<void> {
    await this.mutate((data) => {
      data.workflows = data.workflows.filter((workflow) => workflow.id !== id)
      data.editProposals = data.editProposals.filter((proposal) => proposal.workflowId !== id)
      data.associations = data.associations.map((association) => association.workflowId === id
        ? { ...association, workflowId: '', revision: association.revision + 1, updatedAt: Date.now() }
        : association)
    })
  }

  async saveRun(run: WorkflowRun): Promise<void> {
    await this.mutate((data) => {
      const index = data.runs.findIndex((item) => item.id === run.id)
      if (index < 0) data.runs.push(cloneValue(run))
      else data.runs[index] = cloneValue(run)
      if (data.runs.length > 200) data.runs.splice(200)
    })
  }

  async withRunLock<T>(runId: string, operation: () => Promise<T>): Promise<T> {
    const lock = await this.acquireRunLock(runId)
    try { return await operation() } finally { await this.releaseRunLock(lock) }
  }

  acquireRunLock(runId: string): Promise<LockRecord> {
    return this.acquireLock(this.lockPath, runId)
  }

  releaseRunLock(lock: LockRecord): Promise<void> {
    return this.releaseLock(this.lockPath, lock)
  }

  async canonicalWorkspaceDirectory(input: string): Promise<string> {
    const requestedInput = normalizeDirectoryInput(input)
    if (!requestedInput || !isAbsolute(requestedInput)) {
      throw new WorkflowValidationError('workspace.path', '工作区必须是已存在的绝对路径。')
    }
    if (requestedInput.startsWith('\\\\?\\') || requestedInput.startsWith('\\\\.\\') || /^[A-Za-z]:\\?$/.test(requestedInput)) {
      throw new WorkflowValidationError('workspace.path', '工作区不能指向 Windows 设备命名空间或盘符根。')
    }
    const real = await realpath(resolve(requestedInput)).catch((error: NodeJS.ErrnoException) => {
      if (error.code === 'ENOENT') throw new WorkflowValidationError('workspace.missing', `工作区不存在：${resolve(requestedInput)}`)
      throw error
    })
    if (!(await stat(real)).isDirectory()) throw new WorkflowValidationError('workspace.not-directory', '工作区路径不是目录。')
    return normalize(real)
  }

  async normalizeOutputPath(input: string, workspaceInput: string): Promise<string> {
    const normalized = normalizeDirectoryInput(input)
    const actual = await this.normalizeWorkspacePath(normalized, workspaceInput, 'output')
    const info = await stat(actual).catch((error: NodeJS.ErrnoException) => {
      if (error.code === 'ENOENT') throw new WorkflowValidationError('output.missing', `输出目录不存在：${actual}。请先选择现有目录，或明确点击“创建输出目录”。`)
      throw error
    })
    if (!info.isDirectory()) throw new WorkflowValidationError('output.not-directory', '输出路径不是目录。')
    return actual
  }

  async normalizeWorkspacePath(input: string, workspaceInput: string, code = 'file'): Promise<string> {
    const normalizedInput = normalizeDirectoryInput(input)
    if (!normalizedInput || !isAbsolute(normalizedInput)) throw new WorkflowValidationError(`${code}.path`, '工作区内的路径必须是绝对路径。')
    const workspacePath = resolve(workspaceInput)
    const requested = resolve(normalizedInput)
    if (!isWithinPath(workspacePath, requested)) throw new WorkflowValidationError(`${code}.outside-workspace`, '路径必须位于选定工作区内。')
    const workspaceReal = await this.canonicalWorkspaceDirectory(workspaceInput)
    const actual = await resolveInsideRealWorkspace(requested, workspaceReal, code)
    if (!isWithinPath(workspaceReal, actual)) throw new WorkflowValidationError(`${code}.symlink-escape`, '路径解析后超出了工作区。')
    return normalize(actual)
  }

  async canonicalOutputDirectory(input: string, workspaceInput: string, create: boolean): Promise<string> {
    const requested = await this.normalizeOutputPath(input, workspaceInput)
    if (create) await mkdir(requested, { recursive: true })
    const real = await realpath(requested).catch((error: NodeJS.ErrnoException) => {
      if (error.code === 'ENOENT') throw new WorkflowValidationError('output.missing', `输出目录不存在：${requested}`)
      throw error
    })
    const workspaceReal = await this.canonicalWorkspaceDirectory(workspaceInput)
    if (!isWithinPath(workspaceReal, real)) throw new WorkflowValidationError('output.symlink-escape', '输出目录解析后超出了工作区。')
    if (!(await stat(real)).isDirectory()) throw new WorkflowValidationError('output.not-directory', '输出路径不是目录。')
    return normalize(real)
  }

  async assertOutputDirectoryWritable(input: string, workspaceInput: string): Promise<string> {
    const directory = await this.canonicalOutputDirectory(input, workspaceInput, false)
    try { await access(directory, constants.W_OK) }
    catch { throw new WorkflowValidationError('output.not-writable', `输出目录不可写：${directory}`) }
    return directory
  }

  async createOutputDirectory(input: string, workspaceInput: string): Promise<string> {
    const workspace = await this.canonicalWorkspaceDirectory(workspaceInput)
    const normalized = normalizeDirectoryInput(input)
    if (!normalized || !isAbsolute(normalized)) throw new WorkflowValidationError('output.path', '输出目录必须是已存在工作区内的绝对路径。')
    const safeCandidate = await this.normalizeWorkspacePath(normalized, workspace, 'output')
    await mkdir(safeCandidate, { recursive: true })
    return this.assertOutputDirectoryWritable(safeCandidate, workspace)
  }

  async browseDirectories(input: string, workspaceInput?: string): Promise<{ path: string; parentPath?: string; directories: { name: string; path: string }[]; truncated: boolean }> {
    const normalized = normalizeDirectoryInput(input) || process.cwd()
    if (!isAbsolute(normalized)) throw new WorkflowValidationError('folder.path', '请选择或输入绝对路径后再浏览。')
    if (normalized.startsWith('\\\\?\\') || normalized.startsWith('\\\\.\\')) throw new WorkflowValidationError('folder.path', '不能浏览 Windows 设备命名空间。')

    let current: string
    let workspaceRoot: string | undefined
    if (workspaceInput) {
      workspaceRoot = await this.canonicalWorkspaceDirectory(workspaceInput)
      current = await this.normalizeWorkspacePath(normalized, workspaceRoot, 'folder')
    } else {
      current = normalize(await realpath(resolve(normalized)).catch((error: NodeJS.ErrnoException) => {
        if (error.code === 'ENOENT') throw new WorkflowValidationError('folder.missing', `目录不存在：${resolve(normalized)}`)
        throw error
      }))
    }
    if (!(await stat(current)).isDirectory()) throw new WorkflowValidationError('folder.not-directory', '所选路径不是目录。')

    const parentCandidate = dirname(current)
    const parentPath = parentCandidate === current || workspaceRoot && !isWithinPath(workspaceRoot, parentCandidate)
      ? undefined
      : normalize(parentCandidate)
    const entries = await readdir(current, { withFileTypes: true })
    const directories = entries
      .filter((entry) => entry.isDirectory() && !entry.isSymbolicLink())
      .sort((left, right) => left.name.localeCompare(right.name, 'zh-CN'))
    const truncated = directories.length > 500
    const result = [] as { name: string; path: string }[]
    for (const entry of directories.slice(0, 500)) {
      const candidate = join(current, entry.name)
      const child = normalize(await realpath(candidate))
      if (workspaceRoot && !isWithinPath(workspaceRoot, child)) continue
      result.push({ name: entry.name, path: child })
    }
    return { path: normalize(current), ...(parentPath ? { parentPath } : {}), directories: result, truncated }
  }

  async readContextFile(input: string, workspaceInput: string): Promise<{ path: string; content: string; sha256: string; size: number }> {
    const canonical = await this.normalizeWorkspacePath(input, workspaceInput, 'file')
    const info = await stat(canonical)
    if (!info.isFile()) throw new WorkflowValidationError('file.not-file', `上下文不是普通文件：${canonical}`)
    if (info.size > 2 * 1024 * 1024) throw new WorkflowValidationError('file.size', `上下文文件超过 2 MiB：${canonical}`)
    const bytes = await readFile(canonical)
    if (bytes.byteLength > 2 * 1024 * 1024) throw new WorkflowValidationError('file.size', `上下文文件超过 2 MiB：${canonical}`)
    let content: string
    try { content = new TextDecoder('utf-8', { fatal: true }).decode(bytes).replace(/^\uFEFF/, '') }
    catch { throw new WorkflowValidationError('file.encoding', `上下文文件不是有效 UTF-8：${canonical}`) }
    return { path: canonical, content, sha256: createHash('sha256').update(bytes).digest('hex'), size: bytes.byteLength }
  }

  async checkOutputArtifact(path: string, workflow: WorkflowDefinition, expectedText?: string): Promise<ArtifactCheckResult> {
    const outputRoot = await this.canonicalOutputDirectory(workflow.outputDirectory, workflow.workspaceDirectory, false)
    const requested = resolve(outputRoot, path)
    if (!isWithinPath(outputRoot, requested)) throw new WorkflowValidationError('artifact.outside-output', '预期产物路径超出了输出目录。')
    const canonical = await this.normalizeWorkspacePath(requested, workflow.workspaceDirectory, 'artifact')
    if (!isWithinPath(outputRoot, canonical)) throw new WorkflowValidationError('artifact.symlink-escape', '预期产物解析后超出了输出目录。')
    const info = await stat(canonical).catch((error: NodeJS.ErrnoException) => error.code === 'ENOENT' ? undefined : Promise.reject(error))
    const type = expectedText === undefined ? 'file_exists' : 'file_contains'
    if (!info) return { path, type, exists: false, passed: false, size: 0, error: '文件不存在。', sha256: '' }
    if (!info.isFile()) return { path, type, exists: false, passed: false, size: info.size, error: '路径不是普通文件。', sha256: '' }
    if (expectedText === undefined) {
      const sha256 = info.size <= 2 * 1024 * 1024
        ? createHash('sha256').update(await readFile(canonical)).digest('hex')
        : ''
      return { path, type, exists: true, passed: true, size: info.size, error: '', sha256 }
    }
    if (info.size > 2 * 1024 * 1024) return { path, type, exists: true, passed: false, size: info.size, error: '内容核验文件超过 2 MiB。', sha256: '' }
    const preview = await this.readContextFile(canonical, workflow.workspaceDirectory)
    const passed = preview.content.includes(expectedText)
    return { path, type, exists: true, passed, size: info.size, error: passed ? '' : '文件中未找到预期文本。', sha256: preview.sha256 }
  }

  private async mutate(operation: (data: StoreData) => void, signal?: AbortSignal): Promise<void> {
    const run = this.localQueue.then(async () => {
      await this.withWriteLock(async () => {
        throwIfAborted(signal)
        await this.refreshFromDisk()
        throwIfAborted(signal)
        const next = cloneValue(this.data)
        operation(next)
        await this.persist(signal, next)
        this.data = next
      })
    })
    this.localQueue = run.catch(() => undefined)
    return run
  }

  private async refreshFromDisk(): Promise<void> {
    const content = await readFile(this.statePath, 'utf8').catch((error: NodeJS.ErrnoException) => {
      if (error.code === 'ENOENT') return undefined
      throw error
    })
    if (content === undefined) return
    if (Buffer.byteLength(content, 'utf8') > MAX_STORE_BYTES) throw new Error('工作流本地数据超过 64 MiB。')
    const parsed = JSON.parse(content) as Partial<StoreData>
    if (![1, 2, 3, 4, 5].includes(parsed.schemaVersion ?? 0) || !Array.isArray(parsed.workflows) || !Array.isArray(parsed.runs)) {
      throw new Error('工作流本地数据格式无效，拒绝覆盖。')
    }
    this.data = decodeStore(parsed as StoreData)
  }

  private async recoverInterruptedRuns(): Promise<void> {
    if (!this.data.runs.some((run) => ACTIVE_RUN_STATES.has(run.state))) return

    let recoveryLock: LockRecord
    try {
      recoveryLock = await this.acquireRunLock('startup-recovery')
    } catch (error) {
      if (error instanceof WorkflowValidationError && error.code === 'run.locked') return
      throw error
    }

    try {
      // Another Host may have updated the snapshot between our first read and lock acquisition.
      await this.refreshFromDisk()
      if (!this.data.runs.some((run) => ACTIVE_RUN_STATES.has(run.state))) return
      await this.mutate((data) => {
        data.runs = data.runs.map((run) => {
          if (!ACTIVE_RUN_STATES.has(run.state)) return run
          const now = Date.now()
          return {
            ...run,
            state: 'interrupted',
            endedAt: now,
            error: 'DSH Host 已退出，运行被安全中断。检查工作区后可手动恢复或重试。',
            tasks: run.tasks.map((task) => {
              if (task.state !== 'running') return task
              return {
                ...task,
                state: 'pending',
                attempts: task.attempts.map((attempt, index) => index === task.attempts.length - 1 && attempt.state === 'running'
                  ? { ...attempt, state: 'interrupted', endedAt: now, error: 'DSH Host 退出时任务仍在运行；结果未被判定为成功。' }
                  : attempt),
              }
            }),
            events: [...run.events, {
              seq: run.events.length,
              at: now,
              type: 'recovery.interrupted',
              taskId: '',
              message: `没有活动 Host 持有运行锁；此前运行状态为 ${run.state}。检查工作区后，点击“恢复运行”或重试。`,
            }],
          }
        })
      })
    } finally {
      await this.releaseRunLock(recoveryLock)
    }
  }

  private async persist(signal?: AbortSignal, data: StoreData = this.data): Promise<void> {
    throwIfAborted(signal)
    await mkdir(dirname(this.statePath), { recursive: true })
    const json = JSON.stringify(data)
    if (Buffer.byteLength(json, 'utf8') > MAX_STORE_BYTES) throw new Error('本地工作流数据将超过 64 MiB，保存已拒绝。')
    const temporary = `${this.statePath}.${process.pid}.${randomUUID()}.tmp`
    try {
      const handle = await open(temporary, constants.O_CREAT | constants.O_EXCL | constants.O_WRONLY, 0o600)
      try {
        await handle.writeFile(json, 'utf8')
        await handle.sync()
      } finally {
        await handle.close()
      }
      throwIfAborted(signal)
      await renameWithTransientRetry(temporary, this.statePath, rename, undefined, signal)
    } catch (error) {
      await unlink(temporary).catch(() => undefined)
      throw error
    }
  }

  private async withWriteLock<T>(operation: () => Promise<T>): Promise<T> {
    const lockPath = join(this.root, 'state-write.lock')
    const lock = await this.acquireLock(lockPath, 'state-write')
    try {
      return await operation()
    } finally {
      await this.releaseLock(lockPath, lock)
    }
  }

  private async acquireLock(lockPath: string, runId: string): Promise<LockRecord> {
    await mkdir(this.root, { recursive: true })
    const lock: LockRecord = { pid: process.pid, runId, nonce: randomUUID(), createdAt: Date.now() }
    try {
      const handle = await open(lockPath, constants.O_CREAT | constants.O_EXCL | constants.O_WRONLY, 0o600)
      await handle.writeFile(JSON.stringify(lock), 'utf8')
      await handle.sync()
      await handle.close()
      return lock
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error
    }
    const content = await readFile(lockPath, 'utf8').catch((error: NodeJS.ErrnoException) => {
      if (error.code === 'ENOENT') return undefined
      throw error
    })
    let existing: LockRecord | undefined
    if (content !== undefined) {
      try { existing = JSON.parse(content) as LockRecord } catch {
        throw new WorkflowValidationError('run.lock-invalid', '运行锁内容无法识别；为避免误恢复或覆盖，已保留锁文件并停止操作。')
      }
      if (!existing || !Number.isSafeInteger(existing.pid) || existing.pid <= 0 || typeof existing.nonce !== 'string') {
        throw new WorkflowValidationError('run.lock-invalid', '运行锁字段不完整；为避免误恢复或覆盖，已保留锁文件并停止操作。')
      }
    }
    if (existing && processIsAlive(existing.pid)) {
      throw new WorkflowValidationError('run.locked', `已有工作流运行持有本地锁（进程 ${existing.pid}）。`)
    }
    const stale = `${lockPath}.stale-${Date.now()}-${randomUUID()}`
    await rename(lockPath, stale).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== 'ENOENT') throw error
    })
    return this.acquireLock(lockPath, runId)
  }

  private async releaseLock(lockPath: string, lock: LockRecord): Promise<void> {
    const current = await readFile(lockPath, 'utf8').then((text) => JSON.parse(text) as LockRecord).catch(() => undefined)
    if (current?.nonce === lock.nonce) await unlink(lockPath).catch(() => undefined)
  }
}

function decodeStore(value: StoreData): StoreData {
  const workflows = value.workflows.map((workflow) => normalizeStoredWorkflow(workflow))
  const runs = value.runs.map((run) => ({
    ...run,
    workflow: normalizeStoredWorkflow(run.workflow),
    contextSnapshots: Array.isArray(run.contextSnapshots) ? run.contextSnapshots : [],
    tasks: run.tasks.map((task) => ({
      ...task,
      attempts: task.attempts.map((attempt) => ({
        ...attempt,
        acceptanceMethod: attempt.acceptanceMethod ?? 'pending',
        artifactChecks: attempt.artifactChecks ?? [],
        reviewDecision: attempt.reviewDecision ?? '',
      })),
    })),
  }))
  for (const workflow of workflows) validateWorkflow(workflow)
  for (const run of runs) validateWorkflow(run.workflow)
  const associationsBySession = new Map<string, SessionWorkflowAssociation>()
  for (const candidate of Array.isArray(value.associations) ? value.associations : []) {
    if (!candidate || typeof candidate.sessionId !== 'string' || !candidate.sessionId.trim()
      || typeof candidate.workflowId !== 'string' || !Number.isSafeInteger(candidate.revision) || candidate.revision < 0
      || !Number.isFinite(candidate.updatedAt)) continue
    const current = associationsBySession.get(candidate.sessionId)
    if (!current || candidate.revision > current.revision || candidate.updatedAt > current.updatedAt) {
      associationsBySession.set(candidate.sessionId, {
        sessionId: candidate.sessionId,
        workflowId: candidate.workflowId,
        revision: candidate.revision,
        updatedAt: candidate.updatedAt,
      })
    }
  }
  const draftsBySession = new Map<string, SessionWorkflowDraft>()
  for (const candidate of Array.isArray(value.sessionDrafts) ? value.sessionDrafts : []) {
    if (!candidate || typeof candidate.sessionId !== 'string' || !candidate.sessionId.trim()
      || typeof candidate.draftId !== 'string' || !candidate.draftId.trim()
      || typeof candidate.commandId !== 'string' || !candidate.commandId.trim()
      || !Number.isSafeInteger(candidate.revision) || candidate.revision < 1
      || !Number.isFinite(candidate.createdAt) || !Number.isFinite(candidate.updatedAt)
      || typeof candidate.model !== 'string' || !candidate.model.trim()
      || !candidate.workflow || candidate.workflow.id !== candidate.draftId) {
      throw new Error('工作流会话草稿记录格式无法识别；原状态文件已保留。')
    }
    validateWorkflow(candidate.workflow)
    const current = draftsBySession.get(candidate.sessionId)
    if (!current || candidate.revision > current.revision || candidate.updatedAt > current.updatedAt) {
      draftsBySession.set(candidate.sessionId, cloneValue(candidate))
    }
  }
  const proposalsBySession = new Map<string, SessionWorkflowEditProposal>()
  for (const candidate of Array.isArray(value.editProposals) ? value.editProposals : []) {
    if (!candidate || typeof candidate.sessionId !== 'string' || !candidate.sessionId.trim()
      || typeof candidate.proposalId !== 'string' || !candidate.proposalId.trim()
      || typeof candidate.commandId !== 'string' || !candidate.commandId.trim()
      || typeof candidate.workflowId !== 'string' || !candidate.workflowId.trim()
      || !Number.isSafeInteger(candidate.baseWorkflowRevision) || candidate.baseWorkflowRevision < 0
      || !Number.isSafeInteger(candidate.baseAssociationRevision) || candidate.baseAssociationRevision < 1
      || !Number.isSafeInteger(candidate.revision) || candidate.revision < 1
      || !Number.isFinite(candidate.createdAt) || !Number.isFinite(candidate.updatedAt)
      || typeof candidate.model !== 'string' || !candidate.model.trim()
      || candidate.baseWorkflow?.id !== candidate.workflowId || candidate.workflow?.id !== candidate.workflowId
      || candidate.baseWorkflow?.revision !== candidate.baseWorkflowRevision || candidate.workflow?.revision !== candidate.baseWorkflowRevision) {
      throw new Error('工作流会话编辑提案记录格式无法识别；原状态文件已保留。')
    }
    validateWorkflow(candidate.baseWorkflow)
    validateWorkflow(candidate.workflow)
    const current = proposalsBySession.get(candidate.sessionId)
    if (!current || candidate.revision > current.revision || candidate.updatedAt > current.updatedAt) proposalsBySession.set(candidate.sessionId, cloneValue(candidate))
  }
  return { schemaVersion: 5, workflows, runs, associations: [...associationsBySession.values()], sessionDrafts: [...draftsBySession.values()], editProposals: [...proposalsBySession.values()] }
}

function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) throw signal.reason instanceof Error ? signal.reason : new DOMException('操作已取消。', 'AbortError')
}

function validateExpectedRevision(revision: number, code: string): void {
  if (!Number.isInteger(revision) || revision < 0) throw new WorkflowValidationError(code, 'expectedRevision 鏃犳晥銆')
}

function validateSessionId(sessionId: string): void {
  if (typeof sessionId !== 'string' || !sessionId.trim()) throw new WorkflowValidationError('association.session', 'DSH 会话标识无效。')
}

function normalizeStoredWorkflow(workflow: WorkflowDefinition): WorkflowDefinition {
  const legacy = workflow as WorkflowDefinition & Partial<WorkflowDefinition>
  const outputDirectory = typeof legacy.outputDirectory === 'string' ? legacy.outputDirectory : ''
  const workspaceDirectory = typeof legacy.workspaceDirectory === 'string' && legacy.workspaceDirectory.trim()
    ? legacy.workspaceDirectory
    : dirname(outputDirectory)
  const nodes = legacy.nodes.map((node, index) => node.type === 'task'
    ? {
        ...node,
        acceptanceCriteria: Array.isArray(node.acceptanceCriteria) && node.acceptanceCriteria.length
          ? node.acceptanceCriteria
          : [`人工核对“${node.title}”的执行结果和关联产物。`],
        expectedArtifacts: Array.isArray(node.expectedArtifacts) ? node.expectedArtifacts : [],
        expectedContents: Array.isArray(node.expectedContents) ? node.expectedContents : [],
        acceptanceMode: node.acceptanceMode === 'automatic' ? 'automatic' as const : 'manual' as const,
        order: Number.isInteger(node.order) && node.order >= 0 ? node.order : index,
      }
    : node.type === 'prompt' ? { ...node, enabled: typeof node.enabled === 'boolean' ? node.enabled : true } : node)
  return {
    ...legacy,
    workspaceDirectory,
    outputDirectory,
    schemaVersion: 1,
    revision: Number.isInteger(legacy.revision) && legacy.revision >= 0 ? legacy.revision : 1,
    nodes,
  }
}

function isWithinPath(root: string, candidate: string): boolean {
  const relativePath = relative(resolve(root), resolve(candidate))
  return relativePath === '' || (relativePath !== '..' && !relativePath.startsWith(`..${sep}`) && !isAbsolute(relativePath))
}

async function resolveInsideRealWorkspace(requested: string, workspaceReal: string, code: string): Promise<string> {
  let cursor = requested
  const missingSegments: string[] = []
  let existingReal: string
  while (true) {
    try {
      existingReal = await realpath(cursor)
      break
    } catch (error) {
      const fsError = error as NodeJS.ErrnoException
      if (fsError.code !== 'ENOENT') throw error
      const parent = dirname(cursor)
      if (parent === cursor) throw new WorkflowValidationError(`${code}.missing-parent`, `路径的现存父目录无法解析：${requested}`)
      missingSegments.unshift(cursor.slice(parent.length + (parent.endsWith(sep) ? 0 : 1)))
      cursor = parent
    }
  }
  if (!isWithinPath(workspaceReal, existingReal)) {
    throw new WorkflowValidationError(`${code}.symlink-escape`, '路径的现存父目录解析后超出了工作区。')
  }
  const actual = resolve(existingReal, ...missingSegments)
  if (!isWithinPath(workspaceReal, actual)) {
    throw new WorkflowValidationError(`${code}.symlink-escape`, '路径解析后超出了工作区。')
  }
  return actual
}

function processIsAlive(pid: number): boolean {
  if (!Number.isInteger(pid) || pid < 1) return false
  try {
    process.kill(pid, 0)
    return true
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === 'EPERM'
  }
}
