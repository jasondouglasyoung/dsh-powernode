import type { Context } from '@deepseek-ai/cordis'
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, Handle, MarkerType, MiniMap, Position as FlowPosition, ReactFlow, type Connection, type Edge, type EdgeChange, type Node, type NodeChange, type NodeProps, type NodeTypes, type ReactFlowInstance } from '@xyflow/react'
import reactFlowStyles from '@xyflow/react/dist/style.css?inline'
import React, { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import TYPERT_REMOTE from '../../lib/typert.remote-client.js'
import type { MainPanelId } from '@deepseek-ai/dsh-client-ui-layout/client'
import type { SidebarPanelIconOwnerProps } from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type { ThemePreference, ThemeSnapshot } from '@deepseek-ai/dsh-client-ui-theme/client'
import type { ConversationSessionHeaderSlotProps, ConvViewProps } from '@deepseek-ai/dsh-client-ui-conversation/client'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import type { BrowseDirectoriesResult, ContextFilePreview, PendingEditProposalSummary, PendingSessionDraftSummary, PreviewContextFileRequest, SessionWorkflowDraft, SessionWorkflowEditProposal, WorkflowDefinition, WorkflowEdge, WorkflowEditDiff, WorkflowNode, WorkflowRun, WorkflowSummary } from '../shared/types.js'
import { validateWorkflow } from '../domain/graph.js'
import { canGenerateFromInitialPrompt, getWorkflowProtectionMessage, hasWorkflowChangesSinceSnapshot } from '../domain/workflow-safety.js'
import { normalizeDirectoryInput } from '../shared/path-input.js'
import { describeWorkflowNodeChanges } from './edit-summary.js'
import { clearPowernodeCommandStatuses, getLatestPowernodeCommandStatus, getPowernodeCommandStatus, publishPowernodeCommandStatus, subscribeLatestPowernodeCommandStatus, subscribePowernodeCommandStatus } from './command-progress.js'
import workflowStyles from './workflow.css?inline'
import '@deepseek-ai/dsh-api-gateway/client'
import '@deepseek-ai/dsh-client-ui-layout/client'
import '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-ui-theme/client'
import '@deepseek-ai/dsh-client-ui-renderer/client'
import '@deepseek-ai/dsh-client-ui-commands/client'
import '@deepseek-ai/dsh-client-ui-conversation/client'
import '@deepseek-ai/dsh-api-workspace-controller/client'
import type {} from '@deepseek-ai/dsh-client-ui-session/client'
import type {} from '@deepseek-ai/dsh-commands'
import type {} from '@deepseek-ai/dsh-session'
import type {} from '@deepseek-ai/dsh-api-workspace-controller/remote'
import type {} from '../../lib/typert.remote-client.js'

const PANEL_ID = 'dsh-workflow' as MainPanelId
const SESSION_PANEL_ID = 'dsh-workflow-session' as MainPanelId
const CONVERSATION_VIEW_ID = 'dsh-workflow'
const DEFAULT_TASKS = [
  { title: '任务 1', instructions: '写明要做的事情、执行步骤和完成标准。' },
] as const

type FlowNode = Node<{ readonly node: WorkflowNode; readonly onAddContext?: (kind: 'file' | 'prompt') => void }, 'task' | 'file' | 'prompt'>
type FlowEdge = Edge<{ readonly kind: WorkflowEdge['type'] }>

export const name = 'dsh-workflow-plugin-client'
export const inject = ['remote', 'layout', 'slots', 'theme', 'commandUi']

let requestedSessionId: SessionId | undefined
const requestedSessionListeners = new Set<() => void>()
const retainedEditorState = new Map<string, unknown>()
const sessionDraftListeners = new Map<SessionId, Set<() => void>>()
const commandSessions = new Map<string, SessionId>()
const clientId = `client-${Date.now()}-${Math.random().toString(36).slice(2)}`
const editorStatusSequences = new Map<string, number>()

interface ParkedEditorState {
  readonly workflow: WorkflowDefinition
  readonly savedSnapshot: WorkflowDefinition | undefined
  readonly editing: boolean
  readonly savedWorkflowId: string
  readonly selectedNodeId: string
  readonly inspectorOpen: boolean
  readonly settingsOpen: boolean
  readonly run: WorkflowRun | undefined
  readonly preview: ContextFilePreview | undefined
  readonly error: string
  readonly notice: string
}

const parkedEditors = new Map<string, ParkedEditorState>()

function subscribeRequestedSession(listener: () => void): () => void {
  requestedSessionListeners.add(listener)
  return () => requestedSessionListeners.delete(listener)
}

function getRequestedSession(): SessionId | undefined {
  return requestedSessionId
}

function subscribeSessionDraft(sessionId: SessionId, listener: () => void): () => void {
  const listeners = sessionDraftListeners.get(sessionId) ?? new Set<() => void>()
  listeners.add(listener)
  sessionDraftListeners.set(sessionId, listeners)
  return () => {
    listeners.delete(listener)
    if (!listeners.size) sessionDraftListeners.delete(sessionId)
  }
}

function notifySessionDraft(sessionId: SessionId): void {
  for (const listener of sessionDraftListeners.get(sessionId) ?? []) listener()
}

function requestSessionPanel(ctx: Context, sessionId: SessionId): void {
  requestedSessionId = sessionId
  for (const listener of requestedSessionListeners) listener()
  ctx.layout.selectPanel(SESSION_PANEL_ID)
}

function useRetainedState<T>(scope: string, name: string, initial: () => T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const key = `${scope}:${name}`
  const [value, setValue] = useState<T>(() => retainedEditorState.has(key) ? retainedEditorState.get(key) as T : initial())
  const setRetained = useCallback<React.Dispatch<React.SetStateAction<T>>>((next) => {
    setValue((previous) => {
      const value = typeof next === 'function' ? (next as (previous: T) => T)(previous) : next
      retainedEditorState.set(key, value)
      while (retainedEditorState.size > 800) retainedEditorState.delete(retainedEditorState.keys().next().value!)
      return value
    })
  }, [key])
  return [value, setRetained]
}

export async function apply(ctx: Context): Promise<void> {
  // Mount the generated Host contribution before a panel can call ctx.remote.dshWorkflow.
  // ClientRemote binds the disposer to this plugin fiber.
  let remoteFailure = ''
  let workflowRemote: Context['remote']['dshWorkflow'] | undefined
  try {
    await ctx.remote.$mount(TYPERT_REMOTE)
    await ctx.inject(['remote.dshWorkflow'], async (remoteCtx) => {
      workflowRemote = remoteCtx.remote.dshWorkflow
      // Cordis exposes Remote namespaces as independently injected services.
      // Pass the child context that actually injects directoryPicker to every
      // rendered panel; a type-only import cannot make that service available.
      if (remoteCtx.get('remote.directoryPicker')) {
        await remoteCtx.inject(['remote.directoryPicker'], (directoryPickerCtx) => {
          registerWorkflowUI(directoryPickerCtx, workflowRemote, '')
        })
      } else {
        registerWorkflowUI(remoteCtx, workflowRemote, '')
      }
    })
  }
  catch (cause) {
    remoteFailure = `DSH Remote 初始化失败：${errorMessage(cause)}`
    registerWorkflowUI(ctx, workflowRemote, remoteFailure)
  }
}

function registerWorkflowUI(ctx: Context, remoteApi: Context['remote']['dshWorkflow'] | undefined, remoteFailure: string): void {
  const style = document.createElement('style')
  style.dataset.dshWorkflowPlugin = 'styles'
  style.textContent = `${reactFlowStyles}\n${workflowStyles}`
  document.head.append(style)
  ctx.effect(() => () => style.remove())
  ctx.effect(() => {
    const dispose = ctx.on('session/event', (session, event) => {
      const payload = event.data as { readonly commandId?: string; readonly name?: string; readonly kind?: string }
      if (event.type === 'command/run' && payload.name === 'powernode' && payload.commandId) {
        commandSessions.set(payload.commandId, session.id as SessionId)
        const args = (event.data as { readonly args?: string }).args ?? ''
        publishPowernodeCommandStatus(session.id, {
          commandId: payload.commandId,
          kind: /^\s*edit\b/iu.test(args) ? 'proposal' : 'draft',
          phase: 'generating',
        })
        return
      }
      if (event.type === 'command/done' && payload.commandId) {
        const sessionId = commandSessions.get(payload.commandId)
        commandSessions.delete(payload.commandId)
        if (sessionId) {
          const previous = getPowernodeCommandStatus(sessionId)
          const text = (event.data as { readonly text?: string }).text ?? ''
          const cancelled = payload.kind !== 'success' && /取消|aborted|abort/iu.test(text)
          publishPowernodeCommandStatus(sessionId, {
            commandId: payload.commandId,
            kind: previous?.commandId === payload.commandId ? previous.kind : 'draft',
            phase: payload.kind === 'success' ? 'complete' : cancelled ? 'cancelled' : 'failed',
            message: text,
          })
          if (payload.kind === 'success') notifySessionDraft(sessionId)
        }
      }
    })
    return () => {
      dispose()
      commandSessions.clear()
      clearPowernodeCommandStatuses()
      sessionDraftListeners.clear()
    }
  })
  ctx.slots.inject('main', () => ctx.slots.register(
    { name: 'main', key: PANEL_ID, registrant: 'dsh-workflow-plugin' },
    () => <WorkflowPanel ctx={ctx} remoteFailure={remoteFailure} remoteApi={remoteApi} />,
  ))
  ctx.slots.inject('main', () => ctx.slots.register(
    { name: 'main', key: SESSION_PANEL_ID, registrant: 'dsh-workflow-plugin' },
    () => <SessionWorkflowPanel ctx={ctx} remoteFailure={remoteFailure} remoteApi={remoteApi} />,
  ))
  ctx.slots.inject('sidebar.panellist', () => ctx.slots.register(
    { name: 'sidebar.panellist', id: PANEL_ID, order: 45, label: '工作流', registrant: 'dsh-workflow-plugin' },
    ({ size }: SidebarPanelIconOwnerProps) => <span className="dsh-wp-sidebar-icon" style={{ width: size, height: size }} aria-hidden="true"><i /><i /><i /></span>,
  ))
  ctx.slots.inject('conversation.view', () => ctx.slots.register(
    {
      name: 'conversation.view',
      id: CONVERSATION_VIEW_ID,
      order: 40,
      label: () => '工作流',
    },
    (props: ConvViewProps) => <WorkflowPanel key={props.sessionId} ctx={ctx} remoteFailure={remoteFailure} remoteApi={remoteApi} sessionId={props.sessionId} />,
  ))
  ctx.slots.inject('conversation.session.header.actions', () => ctx.slots.register(
    { name: 'conversation.session.header.actions', id: 'dsh-workflow-pending-action', order: 70, registrant: 'dsh-workflow-plugin' },
    (props: ConversationSessionHeaderSlotProps) => <PendingWorkflowAction remoteApi={remoteApi} sessionId={props.sessionId} selectView={props.selectView} />,
  ))
  ctx.slots.inject('conversation.header.leading', () => ctx.slots.register(
    { name: 'conversation.header.leading', registrant: 'dsh-workflow-plugin' },
    () => <LatestCommandProgressAction onOpen={(sessionId) => requestSessionPanel(ctx, sessionId as SessionId)} />,
  ))
  ctx.effect(() => ctx.commandUi.decorate({
    name: 'powernode',
    available: () => true,
    ui: {
      kind: 'action',
      run: (session) => requestSessionPanel(ctx, session.sessionId),
    },
  }))
}

function LatestCommandProgressAction({ onOpen }: { readonly onOpen: (sessionId: string) => void }) {
  const latest = useSyncExternalStore(subscribeLatestPowernodeCommandStatus, getLatestPowernodeCommandStatus, getLatestPowernodeCommandStatus)
  if (!latest) return null
  const { status, sessionId } = latest
  const label = status.kind === 'proposal' ? '\u7f16\u8f91\u5efa\u8bae' : '\u5de5\u4f5c\u6d41\u8349\u7a3f'
  if (status.phase === 'generating') return <div className="dsh-wp-command-progress" role="status" aria-live="polite">
    <span>{'\u6b63\u5728\u751f\u6210'}{label}{'\u2026'}</span>
  </div>
  if (status.phase === 'failed' || status.phase === 'cancelled') return <div className="dsh-wp-command-progress" role="status" aria-live="polite">
    <span>{status.phase === 'cancelled' ? `${label}\u751f\u6210\u5df2\u53d6\u6d88` : `${label}\u751f\u6210\u5931\u8d25`}</span>
    {status.message && <details><summary>{'\u67e5\u770b\u547d\u4ee4\u7ed3\u679c'}</summary><small>{status.message}</small></details>}
    <button className="dsh-wp-header-action" onClick={() => onOpen(sessionId)}>{'\u8fd4\u56de\u547d\u4ee4\u4f1a\u8bdd'}</button>
  </div>
  return <div className="dsh-wp-command-progress" role="status" aria-live="polite">
    <span>{label}{'\u5df2\u751f\u6210\uff0c\u5f52\u5c5e\u4e8e\u547d\u4ee4\u6240\u5728\u4f1a\u8bdd'}</span>
    <button className="dsh-wp-header-action" onClick={() => onOpen(sessionId)}>
      {status.kind === 'proposal' ? '\u67e5\u770b\u7f16\u8f91\u5efa\u8bae' : '\u6253\u5f00\u5de5\u4f5c\u6d41\u8349\u7a3f'}
    </button>
  </div>
}
function PendingWorkflowAction({ remoteApi, sessionId, selectView }: {
  readonly remoteApi: Context['remote']['dshWorkflow'] | undefined
  readonly sessionId: SessionId
  readonly selectView: (view: string) => void
}) {
  const [kind, setKind] = useState<'proposal' | 'draft' | undefined>()
  const [refreshSequence, setRefreshSequence] = useState(0)
  const [commandStatus, setCommandStatus] = useState(() => getPowernodeCommandStatus(sessionId))
  useEffect(() => subscribeSessionDraft(sessionId, () => setRefreshSequence((value) => value + 1)), [sessionId])
  useEffect(() => {
    setCommandStatus(getPowernodeCommandStatus(sessionId))
    return subscribePowernodeCommandStatus(sessionId, () => setCommandStatus(getPowernodeCommandStatus(sessionId)))
  }, [sessionId])
  useEffect(() => {
    let current = true
    if (!remoteApi) return () => { current = false }
    void remoteApi.sessionState(sessionId).then((result) => {
      if (!current) return
      const state = unwrap(result)
      setKind(state.editProposal ? 'proposal' : state.commandDraft ? 'draft' : undefined)
    }).catch(() => { if (current) setKind(undefined) })
    return () => { current = false }
  }, [remoteApi, refreshSequence, sessionId])
  const actionKind = commandStatus?.kind ?? kind
  if (commandStatus?.phase === 'generating') return <div className="dsh-wp-command-progress" role="status" aria-live="polite">
    <span>正在生成{actionKind === 'proposal' ? '编辑建议' : '工作流草稿'}…</span>
  </div>
  if (commandStatus?.phase === 'failed' || commandStatus?.phase === 'cancelled') return <div className="dsh-wp-command-progress" role="status" aria-live="polite">
    <span>{commandStatus.phase === 'cancelled' ? '工作流生成已取消。' : `${actionKind === 'proposal' ? '编辑建议' : '工作流草稿'}生成失败。`}</span>
    {commandStatus.message && <details><summary>查看命令结果</summary><small>{commandStatus.message}</small></details>}
  </div>
  if (commandStatus?.phase === 'complete') return <div className="dsh-wp-command-progress" role="status" aria-live="polite">
    <span>{actionKind === 'proposal' ? '编辑建议已生成；原流程尚未修改。' : '工作流草稿已生成；尚未保存或运行。'}</span>
    <button className="dsh-wp-header-action" onClick={() => selectView(CONVERSATION_VIEW_ID)}>
      {actionKind === 'proposal' ? '查看编辑建议' : '打开工作流草稿'}
    </button>
  </div>
  if (!kind) return null
  return <button className="dsh-wp-header-action" onClick={() => selectView(CONVERSATION_VIEW_ID)}>
    {kind === 'proposal' ? '查看编辑建议' : '查看工作流草稿'}
  </button>
}

function SessionWorkflowPanel({ ctx, remoteFailure, remoteApi }: { readonly ctx: Context; readonly remoteFailure: string; readonly remoteApi: Context['remote']['dshWorkflow'] | undefined }) {
  const sessionId = useSyncExternalStore(subscribeRequestedSession, getRequestedSession, getRequestedSession)
  if (!sessionId) return <main className="dsh-wp-root dsh-wp-home"><h1>工作流</h1><p>请在普通会话中使用 /powernode 打开当前会话的工作流。</p></main>
  return <WorkflowPanel key={sessionId} ctx={ctx} remoteFailure={remoteFailure} remoteApi={remoteApi} sessionId={sessionId} surface="main" />
}

function WorkflowPanel({ ctx, remoteFailure, remoteApi, sessionId, surface = 'conversation' }: { readonly ctx: Context; readonly remoteFailure: string; readonly remoteApi: Context['remote']['dshWorkflow'] | undefined; readonly sessionId?: SessionId; readonly surface?: 'conversation' | 'main' }) {
  const remote = remoteApi!
  const [items, setItems] = useState<readonly WorkflowSummary[]>([])
  const [pendingProposals, setPendingProposals] = useState<readonly PendingEditProposalSummary[]>([])
  const [pendingDrafts, setPendingDrafts] = useState<readonly PendingSessionDraftSummary[]>([])
  const scopeKey = sessionId ?? 'global'
  const [workflow, setWorkflow] = useRetainedState<WorkflowDefinition>(scopeKey, 'workflow', () => newWorkflow())
  const [savedSnapshot, setSavedSnapshot] = useRetainedState<WorkflowDefinition | undefined>(scopeKey, 'savedSnapshot', () => undefined)
  const [nodeMeasurements, setNodeMeasurements] = useState<Map<string, { measured: NonNullable<FlowNode['measured']>; width?: number; height?: number }>>(() => new Map())
  const [editing, setEditing] = useRetainedState(scopeKey, 'editing', () => false)
  const [savedWorkflowId, setSavedWorkflowId] = useRetainedState(scopeKey, 'savedWorkflowId', () => '')
  const [selectedNodeId, setSelectedNodeId] = useRetainedState(scopeKey, 'selectedNodeId', () => '')
  const [inspectorOpen, setInspectorOpen] = useRetainedState(scopeKey, 'inspectorOpen', () => false)
  const [settingsOpen, setSettingsOpen] = useRetainedState(scopeKey, 'settingsOpen', () => false)
  const [nodeMenu, setNodeMenu] = useState<{ readonly id: string; readonly x: number; readonly y: number } | undefined>()
  const [flowInstance, setFlowInstance] = useState<ReactFlowInstance<FlowNode, FlowEdge> | null>(null)
  const [run, setRun] = useRetainedState<WorkflowRun | undefined>(scopeKey, 'run', () => undefined)
  const [preview, setPreview] = useRetainedState<ContextFilePreview | undefined>(scopeKey, 'preview', () => undefined)
  const [error, setError] = useRetainedState(scopeKey, 'error', () => remoteFailure)
  const [notice, setNotice] = useRetainedState(scopeKey, 'notice', () => '')
  const [sessionAssociationRevision, setSessionAssociationRevision] = useRetainedState(scopeKey, 'associationRevision', () => 0)
  const [sessionWorkspaceDirectory, setSessionWorkspaceDirectory] = useRetainedState(scopeKey, 'workspaceDirectory', () => '')
  const [commandDraft, setCommandDraft] = useRetainedState<SessionWorkflowDraft | undefined>(scopeKey, 'commandDraft', () => undefined)
  const [activeCommandDraftId, setActiveCommandDraftId] = useRetainedState(scopeKey, 'activeCommandDraftId', () => '')
  const [editProposal, setEditProposal] = useRetainedState<SessionWorkflowEditProposal | undefined>(scopeKey, 'editProposal', () => undefined)
  const [activeEditProposalId, setActiveEditProposalId] = useRetainedState(scopeKey, 'activeEditProposalId', () => '')
  const [folderPickerTarget, setFolderPickerTarget] = useState<'workspace' | 'output' | undefined>()
  const [folderPickerPath, setFolderPickerPath] = useState('')
  const [folderPickerParent, setFolderPickerParent] = useState<string | undefined>()
  const [folderPickerDirectories, setFolderPickerDirectories] = useState<BrowseDirectoriesResult['directories']>([])
  const [folderPickerRoot, setFolderPickerRoot] = useState<string | undefined>()
  const [folderPickerError, setFolderPickerError] = useState('')
  const [folderPickerBusy, setFolderPickerBusy] = useState(false)
  const folderPickerSequence = useRef(0)
  const folderPickerAbort = useRef<AbortController | undefined>(undefined)
  useEffect(() => () => {
    folderPickerSequence.current++
    folderPickerAbort.current?.abort()
  }, [])
  const [hasParkedEditor, setHasParkedEditor] = useState(() => parkedEditors.has(scopeKey))
  const [busy, setBusy] = useState(Boolean(remoteFailure) || Boolean(sessionId))
  const [theme, setTheme] = useState<ThemeSnapshot>(() => ctx.theme.getTheme())
  const currentRun = run?.workflowId === workflow.id ? run : undefined
  const active = currentRun !== undefined && ['queued', 'running', 'pausing', 'verifying'].includes(currentRun.state)
  const runLocked = active || currentRun?.state === 'paused'
  const revisionNeedsApply = Boolean(currentRun && savedWorkflowId === workflow.id && workflow.revision > currentRun.workflow.revision)
  const selectedNode = workflow.nodes.find((node) => node.id === selectedNodeId)
  const taskNodes = workflow.nodes.filter((node) => node.type === 'task')
  const canEdit = !active
  const canEditSettings = canEdit && !editProposal
  const proposalDiff = editProposal ? buildUiEditDiff(editProposal.baseWorkflow, workflow) : undefined
  const hasUnsavedCanvasChanges = hasWorkflowChangesSinceSnapshot(workflow, savedSnapshot)
  const initialPromptOnlyDraft = canGenerateFromInitialPrompt(workflow, savedSnapshot, savedWorkflowId)
  const activeEditProposalIdRef = useRef(activeEditProposalId)
  activeEditProposalIdRef.current = activeEditProposalId
  const editorStateRef = useRef<ParkedEditorState>({
    workflow, savedSnapshot, editing, savedWorkflowId, selectedNodeId, inspectorOpen, settingsOpen,
    run, preview, error, notice,
  })
  editorStateRef.current = {
    workflow, savedSnapshot, editing, savedWorkflowId, selectedNodeId, inspectorOpen, settingsOpen,
    run, preview, error, notice,
  }
  const runActionInFlight = useRef(false)

  const browseFolder = useCallback(async (path: string, workspaceRoot?: string) => {
    const sequence = ++folderPickerSequence.current
    setFolderPickerBusy(true)
    setFolderPickerError('')
    try {
      const result = unwrap(await remote.browseDirectories({ path, ...(workspaceRoot ? { workspaceRoot } : {}) }))
      if (sequence !== folderPickerSequence.current) return
      setFolderPickerPath(result.path)
      setFolderPickerParent(result.parentPath)
      setFolderPickerDirectories(result.directories)
      if (result.truncated) setFolderPickerError('此目录下文件夹超过 500 个，仅显示前 500 项。')
    } catch (cause) {
      if (sequence === folderPickerSequence.current) setFolderPickerError(errorMessage(cause))
    } finally {
      if (sequence === folderPickerSequence.current) setFolderPickerBusy(false)
    }
  }, [remote])

  const openFolderPicker = useCallback((target: 'workspace' | 'output') => {
    let workspaceRoot: string | undefined
    try {
      if (target === 'output') {
        workspaceRoot = normalizeDirectoryInput(workflow.workspaceDirectory)
        if (!workspaceRoot) throw new Error('请先填写或选择工作区目录。')
      }
      const initialPath = target === 'output'
        ? workspaceRoot!
        : normalizeDirectoryInput(workflow.workspaceDirectory) || sessionWorkspaceDirectory
      setFolderPickerTarget(target)
      setFolderPickerRoot(workspaceRoot)
      setFolderPickerPath(initialPath)
      setFolderPickerParent(undefined)
      setFolderPickerDirectories([])
      setFolderPickerError('')
      void browseFolder(initialPath, workspaceRoot)
    } catch (cause) { setError(errorMessage(cause)) }
  }, [browseFolder, sessionWorkspaceDirectory, setError, workflow.workspaceDirectory])

  const pickDirectory = useCallback(async (target: 'workspace' | 'output') => {
    if (folderPickerAbort.current) return
    if (!ctx.get('remote.directoryPicker')) {
      const message = 'DSH 当前未提供系统目录选择服务，可改用“浏览目录”。'
      setFolderPickerError(message)
      setError(message)
      return
    }
    const sequence = ++folderPickerSequence.current
    const controller = new AbortController()
    folderPickerAbort.current = controller
    setFolderPickerBusy(true)
    setBusy(true)
    setFolderPickerError('')
    setError('')
    try {
      const selected = unwrap(await ctx.remote.directoryPicker.pick(controller.signal))
      if (sequence !== folderPickerSequence.current) return
      if (selected === null) {
        setNotice(`${target === 'workspace' ? '工作区' : '输出目录'}选择已取消，原路径保持不变。`)
        return
      }
      const path = normalizeDirectoryInput(selected)
      const workspaceRoot = target === 'output' ? normalizeDirectoryInput(workflow.workspaceDirectory) : undefined
      // Reuse the Host's real-path/symlink boundary checks before adopting the choice.
      unwrap(await remote.browseDirectories({ path, ...(workspaceRoot ? { workspaceRoot } : {}) }))
      if (sequence !== folderPickerSequence.current) return
      setWorkflow((current) => target === 'workspace'
        ? { ...current, workspaceDirectory: path, outputDirectory: current.outputDirectory || path }
        : { ...current, outputDirectory: path })
      setNotice(`${target === 'workspace' ? '工作区' : '输出目录'}已选择；点击“保存”后才会保存设置。`)
      setError('')
    } catch (cause) {
      if (sequence === folderPickerSequence.current && !controller.signal.aborted) {
        const message = `系统文件夹选择失败：${errorMessage(cause)} 可改用“浏览目录”。`
        setFolderPickerError(message)
        setError(message)
      }
    } finally {
      if (sequence === folderPickerSequence.current) {
        setFolderPickerBusy(false)
        setBusy(false)
        if (folderPickerAbort.current === controller) folderPickerAbort.current = undefined
      }
    }
  }, [ctx, remote, setBusy, setError, setNotice, setWorkflow, workflow.workspaceDirectory])

  const chooseFolder = useCallback(() => {
    if (!folderPickerTarget) return
    try {
      const path = normalizeDirectoryInput(folderPickerPath)
      setWorkflow((current) => folderPickerTarget === 'workspace'
        ? { ...current, workspaceDirectory: path }
        : { ...current, outputDirectory: path })
      setNotice(`${folderPickerTarget === 'workspace' ? '工作区' : '输出目录'}已选择；点击“保存”后才会保存设置。`)
      setError('')
      folderPickerSequence.current++
      setFolderPickerTarget(undefined)
    } catch (cause) { setFolderPickerError(errorMessage(cause)) }
  }, [folderPickerPath, folderPickerTarget, setError, setNotice, setWorkflow])

  const createOutputDirectory = useCallback(async () => {
    setBusy(true)
    setError('')
    try {
      const workspaceDirectory = normalizeDirectoryInput(workflow.workspaceDirectory)
      const outputDirectory = normalizeDirectoryInput(workflow.outputDirectory)
      const created = unwrap(await remote.createOutputDirectory({ workspaceDirectory, outputDirectory }))
      setWorkflow((current) => ({ ...current, workspaceDirectory, outputDirectory: created }))
      setNotice(`已按你的明确请求创建输出目录：${created}。设置尚未保存，也没有启动运行。`)
    } catch (cause) { setError(errorMessage(cause)) } finally { setBusy(false) }
  }, [remote, setError, setNotice, setWorkflow, workflow.outputDirectory, workflow.workspaceDirectory])

  const openCommandDraft = useCallback((draft: SessionWorkflowDraft, preserveCurrent = true) => {
    const current = editorStateRef.current
    if (preserveCurrent && current.workflow.id !== draft.workflow.id) {
      parkedEditors.set(scopeKey, current)
      setHasParkedEditor(true)
    }
    setWorkflow(draft.workflow)
    setSavedSnapshot(undefined)
    setEditProposal(undefined)
    setActiveEditProposalId('')
    setEditing(true)
    setSavedWorkflowId('')
    setSelectedNodeId(draft.workflow.nodes[0]?.id ?? '')
    setInspectorOpen(Boolean(draft.workflow.nodes[0]))
    setSettingsOpen(false)
    setRun(undefined)
    setPreview(undefined)
    setActiveCommandDraftId(draft.draftId)
    setNotice(`命令 ${draft.commandId} 的草稿已恢复（修订 ${draft.revision}，模型 ${draft.model}）。检查和编辑后点击“保存”建立会话关联。`)
    setError('')
  }, [scopeKey, setActiveCommandDraftId, setActiveEditProposalId, setEditProposal, setEditing, setError, setInspectorOpen, setNotice, setPreview, setRun, setSavedSnapshot, setSavedWorkflowId, setSelectedNodeId, setSettingsOpen, setWorkflow])

  const openEditProposal = useCallback((proposal: SessionWorkflowEditProposal) => {
    const current = editorStateRef.current
    const currentHasUnsavedChanges = Boolean(current.savedWorkflowId && current.savedWorkflowId === current.workflow.id
      && current.savedSnapshot && JSON.stringify(current.workflow) !== JSON.stringify(current.savedSnapshot))
    if (currentHasUnsavedChanges && current.workflow.id === proposal.workflowId) {
      setError('当前画布还有未保存修改；为保护这些内容，暂不打开编辑建议。请先保存或撤销画布改动。')
      return
    }
    setWorkflow(proposal.workflow)
    setSavedSnapshot(proposal.baseWorkflow)
    setEditing(true)
    setSavedWorkflowId(proposal.workflowId)
    setActiveEditProposalId(proposal.proposalId)
    setEditProposal(proposal)
    setSelectedNodeId(proposal.workflow.nodes[0]?.id ?? '')
    setInspectorOpen(Boolean(proposal.workflow.nodes[0]))
    setSettingsOpen(false)
    setRun(undefined)
    setPreview(undefined)
    setNotice(`编辑建议 ${proposal.proposalId}：依据已保存修订 ${proposal.baseWorkflowRevision}，模型 ${proposal.model}。应用前原流程保持不变。`)
    setError('')
  }, [setActiveEditProposalId, setEditProposal, setEditing, setError, setInspectorOpen, setNotice, setPreview, setRun, setSavedSnapshot, setSavedWorkflowId, setSelectedNodeId, setSettingsOpen, setWorkflow])

  const restoreParkedEditor = useCallback(() => {
    const previous = parkedEditors.get(scopeKey)
    if (!previous) return
    setWorkflow(previous.workflow)
    setSavedSnapshot(previous.savedSnapshot)
    setEditing(previous.editing)
    setSavedWorkflowId(previous.savedWorkflowId)
    setSelectedNodeId(previous.selectedNodeId)
    setInspectorOpen(previous.inspectorOpen)
    setSettingsOpen(previous.settingsOpen)
    setRun(previous.run)
    setPreview(previous.preview)
    setError(previous.error)
    setNotice(previous.notice)
    setActiveCommandDraftId('')
    parkedEditors.delete(scopeKey)
    setHasParkedEditor(false)
  }, [scopeKey, setActiveCommandDraftId, setEditing, setError, setInspectorOpen, setNotice, setPreview, setRun, setSavedSnapshot, setSavedWorkflowId, setSelectedNodeId, setSettingsOpen, setWorkflow])

  const discardCommandDraft = useCallback(async () => {
    if (!sessionId || !commandDraft || commandDraft.draftId === activeCommandDraftId) return
    setBusy(true)
    setError('')
    try {
      unwrap(await remote.sessionDiscardDraft(sessionId, { draftId: commandDraft.draftId, expectedRevision: commandDraft.revision }))
      setCommandDraft(undefined)
      setNotice('未保存的命令草稿已丢弃；当前关联流程和运行记录未更改。')
    } catch (cause) {
      setError(errorMessage(cause))
      try {
        const state = unwrap(await remote.sessionState(sessionId))
        setCommandDraft(state.commandDraft)
      } catch { /* Keep the conflict visible without discarding the editor state. */ }
    } finally { setBusy(false) }
  }, [activeCommandDraftId, commandDraft, remote, sessionId, setCommandDraft, setError, setNotice])

  const refreshList = useCallback(async () => {
    let result: readonly WorkflowSummary[]
    if (sessionId) {
      const state = unwrap(await remote.sessionState(sessionId))
      result = state.availableWorkflows
      setPendingProposals([])
      setPendingDrafts([])
      setSessionAssociationRevision(state.associationRevision)
      setSessionWorkspaceDirectory(state.workspaceDirectory)
      setCommandDraft(state.commandDraft)
      setEditProposal(state.editProposal)
    } else {
      const [workflows, proposals, drafts] = await Promise.all([remote.list(), remote.listPendingEditProposals(), remote.listPendingSessionDrafts()])
      result = unwrap(workflows)
      setPendingProposals(unwrap(proposals))
      setPendingDrafts(unwrap(drafts))
    }
    setItems(result)
    return result
  }, [remote, sessionId, setCommandDraft, setEditProposal, setSessionAssociationRevision, setSessionWorkspaceDirectory])

  useEffect(() => {
    if (!sessionId || remoteFailure || !remoteApi) return
    let current = true
    const unsubscribeDraft = subscribeSessionDraft(sessionId, () => {
      void remote.sessionState(sessionId).then((response) => {
        if (!current) return
        const state = unwrap(response)
        setCommandDraft(state.commandDraft)
        setEditProposal(state.editProposal)
        setSessionAssociationRevision(state.associationRevision)
        setSessionWorkspaceDirectory(state.workspaceDirectory)
        setItems(state.availableWorkflows)
        if (state.editProposal && state.editProposal.proposalId !== activeEditProposalIdRef.current) openEditProposal(state.editProposal)
      }).catch((cause: unknown) => { if (current) setError(errorMessage(cause)) })
    })
    return () => { current = false; unsubscribeDraft() }
  }, [openEditProposal, remote, remoteApi, remoteFailure, sessionId, setCommandDraft, setEditProposal, setError, setItems, setSessionAssociationRevision, setSessionWorkspaceDirectory])

  useEffect(() => {
    const dispose = ctx.on('theme/change', (next: ThemeSnapshot) => setTheme(next))
    return () => { dispose() }
  }, [ctx])

  useEffect(() => {
    if (remoteFailure) return
    if (!sessionId) {
      void refreshList().catch((cause: unknown) => setError(errorMessage(cause)))
      return
    }
    let current = true
    const hadRetainedEditor = retainedEditorState.has(`${scopeKey}:editing`)
    const retainedSavedId = retainedEditorState.get(`${scopeKey}:savedWorkflowId`) as string | undefined
    void (async () => {
      setBusy(true)
      try {
        const state = unwrap(await remote.sessionState(sessionId))
        if (!current) return
        setItems(state.availableWorkflows)
        setSessionAssociationRevision(state.associationRevision)
        setSessionWorkspaceDirectory(state.workspaceDirectory)
        setCommandDraft(state.commandDraft)
        setEditProposal(state.editProposal)
        if (!hadRetainedEditor) {
          if (state.editProposal) {
            openEditProposal(state.editProposal)
          } else if (state.workflow) {
            setWorkflow(state.workflow)
            setSavedSnapshot(state.workflow)
            setEditing(true)
            setSavedWorkflowId(state.workflow.id)
            setSelectedNodeId(state.workflow.nodes[0]?.id ?? '')
            setInspectorOpen(Boolean(state.workflow.nodes[0]))
            const sessionRuns = unwrap(await remote.sessionRuns(sessionId, state.workflow.id))
            if (!current) return
            setRun(sessionRuns[0])
            setNotice('已打开当前会话关联的工作流。')
          } else if (state.commandDraft) {
            openCommandDraft(state.commandDraft, false)
          } else {
            setWorkflow(newWorkflow(state.workspaceDirectory))
            setSavedWorkflowId('')
            setEditing(false)
            setRun(undefined)
            setNotice(state.association ? '当前会话关联的工作流已失效，请重新选择或新建。' : '当前会话还没有关联工作流。')
          }
        } else if (retainedSavedId && state.workflow?.id === retainedSavedId) {
          if (state.editProposal && state.editProposal.proposalId !== activeEditProposalIdRef.current) openEditProposal(state.editProposal)
          const sessionRuns = unwrap(await remote.sessionRuns(sessionId, state.workflow.id))
          if (!current) return
          setRun(sessionRuns[0])
        } else if (retainedSavedId && !state.workflow) {
          setWorkflow(newWorkflow(state.workspaceDirectory))
          setSavedWorkflowId('')
          setEditing(false)
          setRun(undefined)
          setNotice('当前会话关联的工作流已失效，请重新选择或新建。')
        } else if (state.editProposal && state.editProposal.proposalId !== activeEditProposalIdRef.current) {
          openEditProposal(state.editProposal)
        }
      } catch (cause) {
        if (current) setError(errorMessage(cause))
      } finally {
        if (current) setBusy(false)
      }
    })()
    return () => { current = false }
  }, [ctx, openCommandDraft, openEditProposal, remote, refreshList, remoteFailure, scopeKey, sessionId, setCommandDraft, setEditProposal, setEditing, setError, setInspectorOpen, setItems, setNotice, setRun, setSavedSnapshot, setSavedWorkflowId, setSelectedNodeId, setSessionAssociationRevision, setSessionWorkspaceDirectory, setWorkflow])

  useEffect(() => {
    if (!sessionId || !savedWorkflowId || workflow.id !== savedWorkflowId || !savedSnapshot || remoteFailure) return
    const sequence = (editorStatusSequences.get(sessionId) ?? 0) + 1
    editorStatusSequences.set(sessionId, sequence)
    void remote.sessionEditorStatus(sessionId, {
      clientId, sequence, workflowId: savedWorkflowId, baseRevision: savedSnapshot.revision,
      isDirty: JSON.stringify(workflow) !== JSON.stringify(savedSnapshot),
    }).catch(() => undefined)
  }, [remote, remoteFailure, savedSnapshot, savedWorkflowId, sessionId, workflow])

  useEffect(() => {
    if (!nodeMenu) return
    const close = (event: PointerEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest('.dsh-wp-context-menu')) setNodeMenu(undefined)
    }
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setNodeMenu(undefined) }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', escape)
    }
  }, [nodeMenu])

  useEffect(() => {
    if (!run || run.workflowId !== workflow.id || !['queued', 'running', 'pausing', 'paused', 'verifying', 'interrupted', 'needs_review'].includes(run.state)) return
    const runId = run.id
    const workflowId = workflow.id
    const timer = window.setInterval(() => {
      const request = sessionId
        ? remote.sessionGetRun(sessionId, { workflowId, runId })
        : remote.getRun(runId)
      void request.then(unwrap).then((latest) => {
        if (latest.workflowId === workflowId) setRun(latest)
      }).catch((cause: unknown) => setError(errorMessage(cause)))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [remote, run?.id, run?.state, run?.workflowId, sessionId, workflow.id])

  const addContextToTask = useCallback((taskId: string, kind: 'file' | 'prompt') => {
    const task = workflow.nodes.find((node) => node.id === taskId && node.type === 'task')
    if (!task || task.type !== 'task') return
    const id = `${kind}-${newId()}`
    const candidates = [
      { x: task.position.x + 300, y: task.position.y },
      { x: task.position.x - 300, y: task.position.y },
      { x: task.position.x, y: task.position.y + 215 },
      { x: task.position.x, y: task.position.y - 215 },
    ]
    const position = candidates.find((candidate) => workflow.nodes.every((other) => {
      if (other.id === task.id) return true
      return Math.abs(candidate.x - other.position.x) >= 276 || Math.abs(candidate.y - other.position.y) >= 210
    })) ?? { x: task.position.x + 300, y: task.position.y + workflow.nodes.length * 215 }
    const node: WorkflowNode = kind === 'file'
      ? { type: 'file', id, title: '参考文件', path: '', position }
      : { type: 'prompt', id, title: '补充提示', text: '', enabled: true, position }
    const edge: WorkflowEdge = { type: 'context', id: newId(), source: id, target: task.id }
    setWorkflow((current) => ({ ...current, nodes: [...current.nodes, node], edges: [...current.edges, edge] }))
    setSelectedNodeId(id)
    setInspectorOpen(true)
    setNodeMenu(undefined)
    setPreview(undefined)
    window.requestAnimationFrame(() => flowInstance?.fitView({ nodes: [{ id: task.id }, { id }], padding: 0.35, duration: 220 }))
  }, [flowInstance, workflow.nodes])

  const flowNodes = useMemo<FlowNode[]>(() => workflow.nodes.map((node) => ({
    ...nodeMeasurements.get(node.id),
    id: node.id,
    type: node.type,
    position: { x: node.position.x, y: node.position.y },
    data: { node, ...(node.type === 'task' ? { onAddContext: (kind: 'file' | 'prompt') => addContextToTask(node.id, kind) } : {}) },
    selected: node.id === selectedNodeId,
  })), [addContextToTask, nodeMeasurements, selectedNodeId, workflow.nodes])

  const flowEdges = useMemo<FlowEdge[]>(() => workflow.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    type: 'smoothstep',
    label: edge.type === 'dependency' ? '依赖' : '上下文',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: edge.type === 'context' ? { stroke: 'var(--dsw-alias-label-tertiary)', strokeDasharray: '6 5' } : { stroke: 'var(--dsw-alias-brand-primary)' },
    data: { kind: edge.type },
  })), [workflow.edges])

  const changeWorkflow = useCallback((change: (current: WorkflowDefinition) => WorkflowDefinition) => {
    setWorkflow((current) => change(current))
  }, [])

  const onNodesChange = useCallback((changes: NodeChange<FlowNode>[]) => {
    const removedIds = new Set(changes.filter((change): change is Extract<NodeChange<FlowNode>, { type: 'remove' }> => change.type === 'remove').map((change) => change.id))
    const dimensionChanges = changes.filter((change): change is Extract<NodeChange<FlowNode>, { type: 'dimensions' }> => change.type === 'dimensions')
    if (removedIds.size > 0 || dimensionChanges.length > 0) {
      setNodeMeasurements((current) => {
        const next = new Map(current)
        for (const id of removedIds) next.delete(id)
        for (const change of dimensionChanges) {
          if (!change.dimensions) continue
          const measurement = { ...(next.get(change.id) ?? {}), measured: { ...change.dimensions } }
          if (change.setAttributes === true || change.setAttributes === 'width') measurement.width = change.dimensions.width
          if (change.setAttributes === true || change.setAttributes === 'height') measurement.height = change.dimensions.height
          next.set(change.id, measurement)
        }
        return next
      })
    }
    if (removedIds.has(selectedNodeId)) {
      setSelectedNodeId('')
      setInspectorOpen(false)
      setPreview(undefined)
    }
    // React Flow reports dimensions, selection and drag updates against its own
    // transient node snapshot. Only an explicit remove event should prune edges.
    setWorkflow((current) => {
      const nextNodes = applyNodeChanges(changes, toFlowNodes(current))
      const positions = new Map(nextNodes.map((node) => [node.id, node.position]))
      return {
        ...current,
        nodes: current.nodes.filter((node) => !removedIds.has(node.id)).map((node) => {
          const position = positions.get(node.id)
          return position ? { ...node, position } : node
        }),
        edges: removedIds.size > 0 ? current.edges.filter((edge) => !removedIds.has(edge.source) && !removedIds.has(edge.target)) : current.edges,
      }
    })
  }, [selectedNodeId])

  const onEdgesChange = useCallback((changes: EdgeChange<FlowEdge>[]) => {
    setWorkflow((current) => ({ ...current, edges: fromFlowEdges(applyEdgeChanges(changes, toFlowEdges(current))) }))
  }, [])

  const onConnect = useCallback((connection: Connection) => {
    const source = workflow.nodes.find((node) => node.id === connection.source)
    const target = workflow.nodes.find((node) => node.id === connection.target)
    if (!source || !target || source.id === target.id || target.type !== 'task' || source.type === 'task' && target.type !== 'task') {
      setError('连线方向无效：依赖只能连接任务，文件或提示词只能连接到任务。')
      return
    }
    const type = source.type === 'task' ? 'dependency' : 'context'
    const edge: WorkflowEdge = { type, id: newId(), source: source.id, target: target.id }
    if (workflow.edges.some((existing) => existing.type === type && existing.source === source.id && existing.target === target.id)) {
      setError('这两个节点之间已经有相同类型的连线。')
      return
    }
    changeWorkflow((current) => ({ ...current, edges: fromFlowEdges(addEdge({ ...connection, id: edge.id, data: { kind: type } }, toFlowEdges(current))).map((item) => item.id === edge.id ? edge : item) }))
  }, [changeWorkflow, workflow.edges, workflow.nodes])

  const save = useCallback(async () => {
    setBusy(true)
    setError('')
    try {
      const normalizedWorkflow = {
        ...workflow,
        workspaceDirectory: normalizeDirectoryInput(workflow.workspaceDirectory),
        outputDirectory: normalizeDirectoryInput(workflow.outputDirectory),
      }
      setWorkflow(normalizedWorkflow)
      validateWorkflow(normalizedWorkflow)
      if (editProposal && activeEditProposalId === editProposal.proposalId) {
        if (!sessionId || normalizedWorkflow.id !== editProposal.workflowId) throw new Error('当前编辑建议的会话上下文无效，请重新加载。')
        const updated = unwrap(await remote.sessionEditProposalUpdate(sessionId, {
          proposalId: editProposal.proposalId, expectedRevision: editProposal.revision, workflow: normalizedWorkflow,
        }))
        setEditProposal(updated)
        setWorkflow(updated.workflow)
        setSavedSnapshot(updated.baseWorkflow)
        setNotice(`编辑建议已保存为提案修订 ${updated.revision}；原工作流修订 ${updated.baseWorkflowRevision} 尚未改变。点击“应用修改”才会写入新工作流修订。`)
        return
      }
      const expectedRevision = savedWorkflowId === normalizedWorkflow.id ? normalizedWorkflow.revision : 0
      let saved: WorkflowDefinition
      if (sessionId) {
        const draftCommit = commandDraft?.draftId === activeCommandDraftId && commandDraft.workflow.id === normalizedWorkflow.id
          ? { draftId: commandDraft.draftId, expectedDraftRevision: commandDraft.revision }
          : {}
        const result = unwrap(await remote.sessionSave(sessionId, { workflow: normalizedWorkflow, expectedRevision, expectedAssociationRevision: sessionAssociationRevision, ...draftCommit }))
        saved = result.workflow
        setSessionAssociationRevision(result.association.revision)
      } else saved = unwrap(await remote.save({ workflow: normalizedWorkflow, expectedRevision }))
      setWorkflow(saved)
      setSavedSnapshot(saved)
      setSavedWorkflowId(saved.id)
      setSettingsOpen(false)
      setNotice(`已保存（修订 ${saved.revision}）。`)
      if (commandDraft?.workflow.id === saved.id) {
        setCommandDraft(undefined)
        setActiveCommandDraftId('')
      }
      if (sessionId) notifySessionDraft(sessionId)
      await refreshList()
    } catch (cause) { setError(errorMessage(cause)) } finally { setBusy(false) }
  }, [activeCommandDraftId, activeEditProposalId, commandDraft, editProposal, refreshList, remote, savedWorkflowId, sessionAssociationRevision, sessionId, setActiveCommandDraftId, setCommandDraft, setEditProposal, setError, setNotice, setSavedSnapshot, setSessionAssociationRevision, setWorkflow, workflow])

  const applyEditProposal = useCallback(async () => {
    if (!sessionId || !editProposal || editProposal.proposalId !== activeEditProposalId) return
    if (JSON.stringify(workflow) !== JSON.stringify(editProposal.workflow)) {
      setError('当前提案画布有未保存修改。先点击“保存建议修改”，再应用。')
      return
    }
    setBusy(true)
    setError('')
    try {
      const committed = unwrap(await remote.sessionEditProposalApply(sessionId, {
        proposalId: editProposal.proposalId, expectedRevision: editProposal.revision,
      }))
      setWorkflow(committed)
      setSavedSnapshot(committed)
      setSavedWorkflowId(committed.id)
      setEditProposal(undefined)
      setActiveEditProposalId('')
      setActiveCommandDraftId('')
      setNotice(`修改已应用：工作流 ${committed.id} 保存为修订 ${committed.revision}。历史运行记录保留，未自动启动新运行。`)
      notifySessionDraft(sessionId)
      if (sessionId) {
        const runs = unwrap(await remote.sessionRuns(sessionId, committed.id))
        setRun(runs[0])
      }
      await refreshList()
    } catch (cause) { setError(errorMessage(cause)) } finally { setBusy(false) }
  }, [activeEditProposalId, editProposal, refreshList, remote, sessionId, setActiveCommandDraftId, setActiveEditProposalId, setEditProposal, setError, setNotice, setRun, setSavedSnapshot, setSavedWorkflowId, setWorkflow, workflow])

  const discardEditProposal = useCallback(async () => {
    if (!sessionId || !editProposal || editProposal.proposalId !== activeEditProposalId) return
    setBusy(true)
    setError('')
    try {
      unwrap(await remote.sessionEditProposalDiscard(sessionId, { proposalId: editProposal.proposalId, expectedRevision: editProposal.revision }))
      setWorkflow(editProposal.baseWorkflow)
      setSavedSnapshot(editProposal.baseWorkflow)
      setSavedWorkflowId(editProposal.workflowId)
      setEditProposal(undefined)
      setActiveEditProposalId('')
      const runs = unwrap(await remote.sessionRuns(sessionId, editProposal.workflowId))
      setRun(runs[0])
      setNotice(`编辑建议已放弃。原工作流 ${editProposal.workflowId} 修订 ${editProposal.baseWorkflowRevision} 未修改。`)
      notifySessionDraft(sessionId)
      await refreshList()
    } catch (cause) { setError(errorMessage(cause)) } finally { setBusy(false) }
  }, [activeEditProposalId, editProposal, refreshList, remote, sessionId, setActiveEditProposalId, setEditProposal, setError, setNotice, setRun, setSavedSnapshot, setSavedWorkflowId, setWorkflow])

  const createNew = useCallback(() => {
    if (hasUnsavedCanvasChanges || editProposal) {
      setError(editProposal ? '先应用或放弃待处理编辑建议，再新建其他流程。' : '当前画布有未保存修改；请先保存或撤销，再新建流程。')
      return
    }
    const next = newWorkflow(workflow.workspaceDirectory || sessionWorkspaceDirectory)
    setWorkflow(next)
    setSavedSnapshot(next)
    setEditing(true)
    setSettingsOpen(true)
    setSavedWorkflowId('')
    setSelectedNodeId(next.nodes[0]!.id)
    setInspectorOpen(true)
    setNodeMenu(undefined)
    setRun(undefined)
    setEditProposal(undefined)
    setActiveEditProposalId('')
    setPreview(undefined)
    setNotice('手动编辑和保存不需要模型密钥。先填写目标与工作区，再添加资料并完善任务。')
    setError('')
  }, [editProposal, hasUnsavedCanvasChanges, sessionWorkspaceDirectory, setActiveEditProposalId, setEditProposal, setError, setSavedSnapshot, workflow.workspaceDirectory])

  const selectSaved = useCallback(async (id: string) => {
    if (!id) return
    if (editProposal) { setError('当前会话有待处理编辑建议；请先应用或放弃，再选择其他工作流。'); return }
    if (hasUnsavedCanvasChanges) { setError('当前画布有未保存修改；请先保存或撤销，再选择其他工作流。'); return }
    setBusy(true)
    try {
      if (sessionId) {
        const association = unwrap(await remote.sessionAssociate(sessionId, { workflowId: id, expectedAssociationRevision: sessionAssociationRevision }))
        setSessionAssociationRevision(association.revision)
      }
      const loaded = sessionId
        ? unwrap(await remote.sessionGet(sessionId, id))
        : unwrap(await remote.get(id))
      setWorkflow(loaded)
      setSavedSnapshot(loaded)
      setEditing(true)
      setSettingsOpen(false)
      setSavedWorkflowId(loaded.id)
      setSelectedNodeId(loaded.nodes[0]?.id ?? '')
      setInspectorOpen(Boolean(loaded.nodes[0]))
      setNodeMenu(undefined)
      setRun(undefined)
      setPreview(undefined)
      const runs = sessionId ? unwrap(await remote.sessionRuns(sessionId, id)) : unwrap(await remote.runs(id))
      setRun(runs[0])
      setNotice('已加载已保存的工作流。')
      setError('')
    } catch (cause) { setError(errorMessage(cause)) } finally { setBusy(false) }
  }, [editProposal, hasUnsavedCanvasChanges, remote, sessionAssociationRevision, sessionId, setError, setSavedSnapshot, setSessionAssociationRevision, setWorkflow])

  const addNode = useCallback((kind: WorkflowNode['type']) => {
    const index = workflow.nodes.length
    const id = `${kind}-${newId()}`
    const position = { x: 90 + index % 3 * 310, y: 80 + Math.floor(index / 3) * 185 }
    const node: WorkflowNode = kind === 'task'
      ? { type: 'task', id, title: '新任务', instructions: '写明目标、步骤和验收条件。', acceptanceCriteria: ['人工核对任务结果和产物。'], expectedArtifacts: [], expectedContents: [], acceptanceMode: 'manual', order: workflow.nodes.filter((node) => node.type === 'task').length, position }
      : kind === 'file'
        ? { type: 'file', id, title: '参考文件', path: '', position }
        : { type: 'prompt', id, title: '补充提示', text: '', enabled: true, position }
    changeWorkflow((current) => ({ ...current, nodes: [...current.nodes, node] }))
    setSelectedNodeId(id)
    setInspectorOpen(true)
    setNodeMenu(undefined)
    setPreview(undefined)
  }, [changeWorkflow, workflow.nodes.length])

  const updateNode = useCallback((id: string, update: (node: WorkflowNode) => WorkflowNode) => {
    changeWorkflow((current) => ({ ...current, nodes: current.nodes.map((node) => node.id === id ? update(node) : node) }))
  }, [changeWorkflow])

  const generatePlan = useCallback(async () => {
    if (editProposal) { setError('先应用或放弃当前编辑建议，再生成其他草稿。'); return }
    const protectionMessage = getWorkflowProtectionMessage('generate', {
      hasUnsavedChanges: hasUnsavedCanvasChanges,
      initialPromptOnlyDraft,
      runState: currentRun?.state,
      objective: workflow.objective,
    })
    if (protectionMessage) { setError(protectionMessage); return }
    setBusy(true)
    setError('')
    try {
      const request = {
        title: workflow.title,
        objective: workflow.objective,
        workspaceDirectory: workflow.workspaceDirectory,
        outputDirectory: workflow.outputDirectory,
        contextNodes: workflow.nodes.filter((node): node is Extract<WorkflowNode, { type: 'file' | 'prompt' }> => node.type !== 'task'),
      }
      const result = sessionId
        ? unwrap(await remote.sessionGenerateDraft(sessionId, { workflowId: savedWorkflowId, request }, new AbortController().signal))
        : unwrap(await remote.generateDraft(request, new AbortController().signal))
      setWorkflow(result.workflow)
      setSavedSnapshot(result.workflow)
      setEditing(true)
      setSettingsOpen(false)
      setSavedWorkflowId('')
      setRun(undefined)
      setSelectedNodeId(result.workflow.nodes[0]?.id ?? '')
      setInspectorOpen(Boolean(result.workflow.nodes[0]))
      setNotice(`模型 ${result.model} 已生成可编辑草稿，请检查后保存。`)
    } catch (cause) { setError(`AI 草稿生成失败（如尚未配置模型，请前往 DSH 设置 → Models 添加模型）。${errorMessage(cause)}`) } finally { setBusy(false) }
  }, [currentRun?.state, editProposal, hasUnsavedCanvasChanges, initialPromptOnlyDraft, remote, savedWorkflowId, sessionId, setError, setSavedSnapshot, setWorkflow, workflow])

  const importMarkdown = useCallback(async (file: File) => {
    const protectionMessage = getWorkflowProtectionMessage('import-markdown', {
      hasUnsavedChanges: hasUnsavedCanvasChanges,
      runState: currentRun?.state,
    })
    if (protectionMessage) { setError(protectionMessage); return }
    setBusy(true)
    setError('')
    try {
      const text = await file.text()
      const imported = unwrap(await remote.importMarkdown({
        text,
        workspaceDirectory: workflow.workspaceDirectory,
        outputDirectory: workflow.outputDirectory,
      }))
      setWorkflow(imported)
      setSavedSnapshot(imported)
      setEditing(true)
      setSettingsOpen(false)
      setSavedWorkflowId(imported.id)
      setRun(undefined)
      setSelectedNodeId(imported.nodes[0]?.id ?? '')
      setInspectorOpen(Boolean(imported.nodes[0]))
      setNotice('Markdown 已解析并保存；保存后的任务仍可继续编辑。')
      await refreshList()
    } catch (cause) { setError(errorMessage(cause)) } finally { setBusy(false) }
  }, [currentRun?.state, hasUnsavedCanvasChanges, refreshList, remote, setError, setSavedSnapshot, setWorkflow, workflow])

  const previewFile = useCallback(async (node: Extract<WorkflowNode, { type: 'file' }>) => {
    setBusy(true)
    setError('')
    try {
      const result = sessionId
        ? unwrap(await remote.sessionPreviewFile(sessionId, { path: node.path, workflowId: workflow.id }))
        : unwrap(await remote.previewFile({ path: node.path, workspaceDirectory: workflow.workspaceDirectory } satisfies PreviewContextFileRequest))
      setPreview(result)
      setNotice(`已读取 UTF-8 文件（SHA-256 ${result.sha256.slice(0, 12)}…）。`) 
    } catch (cause) { setPreview(undefined); setError(errorMessage(cause)) } finally { setBusy(false) }
  }, [remote, sessionId, workflow.id, workflow.workspaceDirectory])

  const startRun = useCallback(async () => {
    const protectionMessage = getWorkflowProtectionMessage('start-run', { hasUnsavedChanges: hasUnsavedCanvasChanges })
    if (protectionMessage) { setError(protectionMessage); return }
    if (editProposal) { setError('当前有待处理编辑建议。请先应用或放弃，再启动工作流运行。'); return }
    if (!savedWorkflowId || savedWorkflowId !== workflow.id) {
      setError('先保存当前草稿，再启动运行。')
      return
    }
    if (runActionInFlight.current) return
    runActionInFlight.current = true
    setBusy(true)
    setError('')
    try {
      const request = { workflowId: workflow.id, requestId: newId() }
      const started = sessionId
        ? unwrap(await remote.sessionStartRun(sessionId, request))
        : unwrap(await remote.startRun(request))
      setRun(started)
      setInspectorOpen(true)
      setNotice('运行快照已保存；任务会按依赖顺序由 DSH Agent 串行处理。')
    } catch (cause) { setError(errorMessage(cause)) } finally { runActionInFlight.current = false; setBusy(false) }
  }, [editProposal, hasUnsavedCanvasChanges, remote, savedWorkflowId, sessionId, setError, workflow.id])

  const runAction = useCallback(async (action: 'pause' | 'resume' | 'cancel' | 'recover' | 'retry' | 'verify' | 'accept' | 'reject' | 'apply', taskId = '') => {
    if (!run || run.workflowId !== workflow.id || runActionInFlight.current) return
    if (action === 'apply') {
      const protectionMessage = getWorkflowProtectionMessage('apply-run', { hasUnsavedChanges: hasUnsavedCanvasChanges })
      if (protectionMessage) { setError(protectionMessage); return }
    }
    runActionInFlight.current = true
    setBusy(true)
    setError('')
    try {
      const request = sessionId
        ? remote.sessionAction(sessionId, { workflowId: workflow.id, runId: run.id, action, taskId })
        : remote.action({ runId: run.id, action, taskId })
      const next = unwrap(await request)
      setRun(next)
      setNotice(action === 'apply'
        ? `已应用修订 ${next.workflow.revision}；旧运行保留，未受影响且产物核验仍通过的任务会标为复用。`
        : action === 'accept' ? '验收通过已记录。' : action === 'reject' ? '驳回决定已记录。' : `已提交“${actionLabel(action)}”操作。`)
    } catch (cause) { setError(errorMessage(cause)) } finally { runActionInFlight.current = false; setBusy(false) }
  }, [hasUnsavedCanvasChanges, remote, run, sessionId, setError, workflow.id])

  const deleteNode = useCallback((nodeId: string) => {
    changeWorkflow((current) => ({
      ...current,
      nodes: current.nodes.filter((node) => node.id !== nodeId),
      edges: current.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
    }))
    if (selectedNodeId === nodeId) setSelectedNodeId('')
    setInspectorOpen(false)
    setNodeMenu(undefined)
    setPreview(undefined)
  }, [changeWorkflow, selectedNodeId])

  const returnToList = useCallback(() => {
    setEditing(false)
    setInspectorOpen(false)
    setSelectedNodeId('')
    setNodeMenu(undefined)
    setError('')
    setNotice('')
    void refreshList().catch((cause: unknown) => setError(errorMessage(cause)))
  }, [refreshList])

  const linksToSelected = selectedNode?.type === 'task'
    ? workflow.edges.filter((edge) => edge.type === 'context' && edge.target === selectedNode.id)
    : []

  const chooseTheme = (value: string) => ctx.theme.setTheme(value as ThemePreference)
  const themeControl = <label className="dsh-wp-theme-control">主题
    <select aria-label="主题" value={theme.preference} onChange={(event) => chooseTheme(event.target.value)}>
      <option value="system">跟随系统</option><option value="light">浅色</option><option value="dark">深色</option>
    </select>
  </label>

  if (!editing && sessionId) return <main className="dsh-wp-root dsh-wp-home" data-theme={theme.active.colorScheme}>
    <header className="dsh-wp-header">
      <div><h1>当前会话的工作流</h1><p>这里只显示并编辑当前会话关联的流程。打开界面不会调用模型或启动运行。</p></div>
      <div className="dsh-wp-home-actions">
        {surface === 'main' && <button onClick={() => ctx.layout.selectPanel('conversation' as MainPanelId)}>返回对话</button>}
        {themeControl}
        <button className="is-primary" onClick={createNew} disabled={busy}>新建工作流</button>
      </div>
    </header>
    {error && <div className="dsh-wp-alert is-error" role="alert">{error}</div>}
    {notice && <div className="dsh-wp-alert" role="status">{notice}</div>}
    {commandDraft && <section className="dsh-wp-command-draft" role="status">
      <div><b>本会话有命令草稿待检查</b><p>{commandDraft.workflow.title} · 修订 {commandDraft.revision} · {commandDraft.workflow.nodes.filter((node) => node.type === 'task').length} 个任务 · {commandDraft.model}</p><small>草稿尚未保存，不会运行，也不会替换当前关联流程。</small></div>
      <div><button className="is-primary" onClick={() => openCommandDraft(commandDraft, commandDraft.workflow.id !== workflow.id)} disabled={busy}>{commandDraft.workflow.id === workflow.id && activeCommandDraftId === commandDraft.draftId ? '继续编辑草稿' : '打开草稿'}</button>
        {commandDraft.draftId !== activeCommandDraftId && <button className="is-danger" onClick={() => void discardCommandDraft()} disabled={busy}>丢弃草稿</button>}</div>
    </section>}
    {!sessionWorkspaceDirectory && <p className="dsh-wp-empty-card">此会话没有可用的工作区目录。新建后请填写一个已存在的绝对路径。</p>}
    <section className="dsh-wp-saved-list">
      <div className="dsh-wp-section-heading"><div><h2>选择已有工作流</h2><p>选择后只会将该工作流关联到当前会话。</p></div><span>{items.length} 项</span></div>
      {busy ? <p className="dsh-wp-empty-card">正在读取当前会话的关联与工作区…</p> : items.length === 0
        ? <p className="dsh-wp-empty-card">还没有已保存的工作流。可以新建一个手动流程，再保存到当前会话。</p>
        : <div className="dsh-wp-workflow-list">{items.map((item) => <button key={item.id} className="dsh-wp-workflow-row" onClick={() => void selectSaved(item.id)} disabled={busy}>
          <span><b>{item.title}</b><small>{item.objective || '尚未填写目标'}</small></span>
          <span className="dsh-wp-workflow-meta">{item.taskCount} 个任务 · 修订 {item.revision}<b aria-hidden="true">关联并打开 →</b></span>
        </button>)}</div>}
    </section>
  </main>

  if (!editing) return <main className="dsh-wp-root dsh-wp-home" data-theme={theme.active.colorScheme}>
    <header className="dsh-wp-header">
      <div><h1>工作流</h1><p>把目标、资料和任务整理成可编辑的流程，再交给 DSH Agent 执行。</p></div>
      <div className="dsh-wp-home-actions">{themeControl}<button className="is-primary" onClick={createNew} disabled={busy}>＋ 新建工作流</button></div>
    </header>
    {error && <div className="dsh-wp-alert is-error" role="alert">{error}</div>}
    {notice && <div className="dsh-wp-alert" role="status">{notice}</div>}
    {pendingDrafts.length > 0 && <section className="dsh-wp-saved-list" aria-label="待处理命令草稿恢复入口">
      <div className="dsh-wp-section-heading"><div><h2>待处理命令草稿</h2><p>可从这里恢复尚未发送普通聊天消息的会话草稿；草稿内容仍由原会话 Host 校验，不会自动关联或运行。</p></div><span>{pendingDrafts.length} 项</span></div>
      <div className="dsh-wp-workflow-list">{pendingDrafts.map((draft) => <button key={draft.draftId} className="dsh-wp-workflow-row" onClick={() => requestSessionPanel(ctx, draft.sessionId as SessionId)}>
        <span><b>{draft.workflowTitle}</b><small>会话 {draft.sessionId} · 命令 {draft.commandId} · 模型 {draft.model}</small></span>
        <span className="dsh-wp-workflow-meta">{draft.taskCount} 个任务 · 草稿修订 {draft.revision}<b aria-hidden="true">查看草稿 →</b></span>
      </button>)}</div>
    </section>}
    {pendingProposals.length > 0 && <section className="dsh-wp-saved-list" aria-label="待处理编辑建议恢复入口">
      <div className="dsh-wp-section-heading"><div><h2>待处理编辑建议</h2><p>此恢复列表只显示提案索引；点击后按原会话读取提案，不会重新关联、应用或丢弃数据。</p></div><span>{pendingProposals.length} 项</span></div>
      <div className="dsh-wp-workflow-list">{pendingProposals.map((proposal) => <button key={proposal.proposalId} className="dsh-wp-workflow-row" onClick={() => requestSessionPanel(ctx, proposal.sessionId as SessionId)}>
        <span><b>{proposal.workflowTitle}</b><small>会话 {proposal.sessionId} · 流程 {proposal.workflowId} · 模型 {proposal.model}</small></span>
        <span className="dsh-wp-workflow-meta">基于修订 {proposal.baseWorkflowRevision} · 提案修订 {proposal.revision}<b aria-hidden="true">查看建议 →</b></span>
      </button>)}</div>
    </section>}
    <section className="dsh-wp-onboarding">
      <div className="dsh-wp-onboarding-copy">
        <span className="dsh-wp-eyebrow">快速开始</span>
        <h2>从目标开始，逐步搭好工作流</h2>
        <ol>
          <li><b>填写目标与工作区</b><span>设置要完成什么、参考哪个项目目录、产物写到哪里。</span></li>
          <li><b>添加资料</b><span>在任务节点上选择参考文件，或写一段专用提示词。</span></li>
          <li><b>生成或手动建立任务</b><span>可手动新增任务；AI 草稿需要先在 DSH 设置 → Models 配置模型。</span></li>
          <li><b>编辑连线</b><span>依赖边表示先后顺序；上下文边表示任务要读取的资料。</span></li>
          <li><b>保存工作流</b><span>保存后可从已保存列表重新打开，节点位置和连线会保留。</span></li>
          <li><b>运行并查看结果</b><span>由 DSH Agent 按依赖顺序处理，再从运行详情查看进度和产物检查。</span></li>
        </ol>
        <p className="dsh-wp-manual-note">没有模型密钥时，手动编辑、连线和保存仍可使用；只有 AI 生成与 Agent 运行需要已配置的模型。</p>
        <button className="is-primary" onClick={createNew} disabled={busy}>新建手动工作流</button>
      </div>
      <div className="dsh-wp-node-guide" aria-label="工作流节点和连线说明">
        <article><span className="dsh-wp-guide-symbol is-task">T</span><div><b>Task · 执行任务</b><p>写明做什么、步骤和验收条件。</p></div></article>
        <article><span className="dsh-wp-guide-symbol is-file">F</span><div><b>参考文件 · 工作区文件</b><p>引用工作区内已有的 UTF-8 文件，运行前由 DSH Host 读取。</p></div></article>
        <article><span className="dsh-wp-guide-symbol is-prompt">P</span><div><b>提示词 · 补充要求</b><p>保存文本说明，可选择是否启用。</p></div></article>
        <div className="dsh-wp-edge-guide"><span><i className="is-dependency" />依赖边：任务先后顺序</span><span><i className="is-context" />上下文边：资料流向任务</span></div>
      </div>
    </section>
    <section className="dsh-wp-saved-list">
      <div className="dsh-wp-section-heading"><div><h2>已保存的工作流</h2><p>选择要继续编辑的项目。已有内容和验收样例会保留在这里。</p></div><span>{items.length} 项</span></div>
      {items.length === 0 ? <p className="dsh-wp-empty-card">还没有已保存的工作流。新建后保存即可在这里重新打开。</p> : <div className="dsh-wp-workflow-list">
        {items.map((item) => <button key={item.id} className="dsh-wp-workflow-row" onClick={() => void selectSaved(item.id)} disabled={busy}>
          <span><b>{item.title}</b><small>{item.objective || '尚未填写目标'}</small></span>
          <span className="dsh-wp-workflow-meta">{item.taskCount} 个任务 · 修订 {item.revision}<b aria-hidden="true">打开 →</b></span>
        </button>)}
      </div>}
    </section>
  </main>

  return (
    <main className={`dsh-wp-root${sessionId ? ' is-session-scope' : ''}`} data-theme={theme.active.colorScheme}>
      {sessionId && <div className="dsh-wp-session-nav">
        <button className="dsh-wp-back" onClick={returnToList}>← 当前会话</button>
        {surface === 'main' && <button className="dsh-wp-back" onClick={() => ctx.layout.selectPanel('conversation' as MainPanelId)}>返回对话</button>}
        {hasParkedEditor && <button className="dsh-wp-back" onClick={restoreParkedEditor}>返回先前编辑</button>}
      </div>}
      <header className="dsh-wp-header">
        <div className="dsh-wp-title-block"><button className="dsh-wp-back" onClick={returnToList}>← 所有工作流</button><h1>{workflow.title || '未命名工作流'}</h1><p>画布上拖动节点、拖动连线；选中节点后在侧栏编辑。</p></div>
        <div className="dsh-wp-toolbar">
          <select aria-label="打开已保存的工作流" value={savedWorkflowId} onChange={(event) => void selectSaved(event.target.value)} disabled={busy || Boolean(editProposal) || hasUnsavedCanvasChanges}>
            <option value="">当前草稿</option>
            {items.map((item) => <option key={item.id} value={item.id}>{item.title}（{item.taskCount} 项）</option>)}
          </select>
          <button onClick={createNew} disabled={busy || Boolean(editProposal) || hasUnsavedCanvasChanges}>新建</button>
          {!sessionId && <label className="dsh-wp-file-button">导入 Markdown<input type="file" accept=".md,.markdown,text/markdown,text/plain" onChange={(event) => { const file = event.target.files?.[0]; if (file) void importMarkdown(file); event.currentTarget.value = '' }} /></label>}
          <button onClick={() => void generatePlan()} disabled={busy || Boolean(editProposal) || !workflow.workspaceDirectory.trim()}>AI 生成流程草稿</button>
          <button className="is-primary" onClick={() => void save()} disabled={busy}>{editProposal && activeEditProposalId === editProposal.proposalId ? '保存建议修改' : '保存'}</button>
          {editProposal && activeEditProposalId === editProposal.proposalId && <>
            <button className="is-primary" onClick={() => void applyEditProposal()} disabled={busy || JSON.stringify(workflow) !== JSON.stringify(editProposal.workflow)}>应用修改</button>
            <button className="is-danger" onClick={() => void discardEditProposal()} disabled={busy}>放弃修改</button>
          </>}
          {themeControl}
        </div>
      </header>

      {(error || notice) && <div className={`dsh-wp-alert${error ? ' is-error' : ''}`} role={error ? 'alert' : 'status'}>{error || notice}</div>}
      {editProposal && <section className="dsh-wp-command-draft is-active" role="status">
        <b>编辑建议 · 基于流程修订 {editProposal.baseWorkflowRevision} · 提案修订 {editProposal.revision}</b>
        <span>命令 {editProposal.commandId} · 流程 {editProposal.workflowId} · 模型 {editProposal.model}。应用前原流程保持不变；此阶段不会运行工作流。</span>
        {editProposal.instruction
          ? <small>本次修改要求：{editProposal.instruction}</small>
          : <small>这是 Alpha.11 及更早版本保存的提案，未保留原始修改说明。请逐项人工核对差异；此提案不会自动应用。</small>}
        {proposalDiff && <EditProposalDiff base={editProposal.baseWorkflow} candidate={workflow} diff={proposalDiff} />}
        {JSON.stringify(workflow) !== JSON.stringify(editProposal.workflow) && <small>画布包含尚未保存的建议修改。先点“保存建议修改”，再应用。</small>}
      </section>}
      {commandDraft && commandDraft.draftId !== activeCommandDraftId && <section className="dsh-wp-command-draft" role="status">
        <div><b>本会话另有命令草稿待检查</b><p>{commandDraft.workflow.title} · 修订 {commandDraft.revision} · {commandDraft.model}</p><small>打开草稿不会覆盖当前编辑；返回按钮可恢复当前页面的编辑内容。</small></div>
        <button className="is-primary" onClick={() => openCommandDraft(commandDraft)} disabled={busy}>查看命令草稿</button>
      </section>}
      {activeCommandDraftId && commandDraft?.draftId === activeCommandDraftId && <div className="dsh-wp-command-draft is-active" role="status">
        <b>命令草稿 · 尚未保存</b><span>检查节点和连线后点击“保存”建立当前会话关联。此时没有工作流运行记录。</span>
      </div>}
      <details className="dsh-wp-settings" open={settingsOpen} onToggle={(event) => setSettingsOpen(event.currentTarget.open)}>
        <summary><span>工作流设置</span><small>目标、工作区与输出位置</small></summary>
        <div className="dsh-wp-settings-grid">
          <label>工作流名称<input value={workflow.title} disabled={!canEditSettings} onChange={(event) => setWorkflow({ ...workflow, title: event.target.value })} /></label>
          <label className="is-wide">整体目标<textarea rows={3} value={workflow.objective} disabled={!canEditSettings} onChange={(event) => setWorkflow({ ...workflow, objective: event.target.value })} placeholder="请描述项目目标、约束和验收条件。" /></label>
          <div className="dsh-wp-path-field is-wide">
            <label>工作区目录<textarea aria-label="工作区目录" rows={2} spellCheck={false} value={workflow.workspaceDirectory} disabled={!canEditSettings} onBlur={(event) => { try { const value = normalizeDirectoryInput(event.target.value); setWorkflow((current) => ({ ...current, workspaceDirectory: value, outputDirectory: current.outputDirectory || value })); setError('') } catch (cause) { setError(errorMessage(cause)) } }} onChange={(event) => setWorkflow({ ...workflow, workspaceDirectory: event.target.value, outputDirectory: workflow.outputDirectory || event.target.value })} placeholder="填写现有绝对路径，或选择一个文件夹" /></label>
            <button onClick={() => void pickDirectory('workspace')} disabled={!canEditSettings || busy || folderPickerBusy}>选择文件夹</button>
            <button onClick={() => openFolderPicker('workspace')} disabled={!canEditSettings || busy || folderPickerBusy}>浏览目录</button>
          </div>
          <div className="dsh-wp-path-field is-wide">
            <label>输出目录<textarea aria-label="输出目录" rows={2} spellCheck={false} value={workflow.outputDirectory} disabled={!canEditSettings} onBlur={(event) => { try { setWorkflow((current) => ({ ...current, outputDirectory: normalizeDirectoryInput(event.target.value) })); setError('') } catch (cause) { setError(errorMessage(cause)) } }} onChange={(event) => setWorkflow({ ...workflow, outputDirectory: event.target.value })} placeholder="选择工作区内的现有目录" /></label>
            <button onClick={() => void pickDirectory('output')} disabled={!canEditSettings || busy || folderPickerBusy || !workflow.workspaceDirectory.trim()}>选择文件夹</button>
            <button onClick={() => openFolderPicker('output')} disabled={!canEditSettings || busy || folderPickerBusy || !workflow.workspaceDirectory.trim()}>浏览目录</button>
            <button onClick={() => void createOutputDirectory()} disabled={!canEditSettings || busy || folderPickerBusy || !workflow.workspaceDirectory.trim() || !workflow.outputDirectory.trim()}>创建输出目录</button>
          </div>
        </div>
      </details>

      {folderPickerTarget && <div className="dsh-wp-folder-backdrop" role="presentation">
        <section className="dsh-wp-folder-dialog" role="dialog" aria-modal="true" aria-label={`选择${folderPickerTarget === 'workspace' ? '工作区' : '输出'}文件夹`}>
          <header><div><h2>选择{folderPickerTarget === 'workspace' ? '工作区' : '输出'}文件夹</h2><p>这里只浏览文件夹名称；取消不会更改当前设置。</p></div></header>
          <div className="dsh-wp-folder-path"><input aria-label="当前文件夹路径" value={folderPickerPath} onChange={(event) => setFolderPickerPath(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') void browseFolder(folderPickerPath, folderPickerRoot) }} /><button onClick={() => void browseFolder(folderPickerPath, folderPickerRoot)} disabled={folderPickerBusy}>转到</button></div>
          {folderPickerError && <p className="dsh-wp-folder-error" role="alert">{folderPickerError}</p>}
          <p className="dsh-wp-folder-current">当前位置：{folderPickerPath || '尚未选择'}</p>
          <div className="dsh-wp-folder-list" aria-label="子文件夹">
            {folderPickerBusy ? <p>正在读取文件夹…</p> : folderPickerDirectories.length ? folderPickerDirectories.map((entry) => <button key={entry.path} onClick={() => void browseFolder(entry.path, folderPickerRoot)}><span aria-hidden="true">📁</span>{entry.name}<small>打开</small></button>) : <p>此目录下没有可显示的子文件夹。</p>}
          </div>
          <footer>
            <button onClick={() => folderPickerParent && void browseFolder(folderPickerParent, folderPickerRoot)} disabled={folderPickerBusy || !folderPickerParent}>上一级</button>
            <span />
            <button onClick={() => { folderPickerSequence.current++; setFolderPickerTarget(undefined) }}>取消</button>
            <button className="is-primary" onClick={chooseFolder} disabled={folderPickerBusy || !folderPickerPath}>选择当前文件夹</button>
          </footer>
        </section>
      </div>}

      <section className="dsh-wp-actions">
        <span>节点 {workflow.nodes.length}　任务 {taskNodes.length}　资料 {workflow.nodes.length - taskNodes.length}　修订 {workflow.revision}</span>
        <div className="dsh-wp-actions-group">
          <button onClick={() => addNode('task')} disabled={!canEdit}>＋ 任务</button>
          <details className="dsh-wp-add-menu"><summary>＋ 添加资料</summary><div><button onClick={() => selectedNode?.type === 'task' ? addContextToTask(selectedNode.id, 'file') : addNode('file')} disabled={!canEdit || Boolean(editProposal)}>参考文件{selectedNode?.type === 'task' ? '并关联所选任务' : ''}</button><button onClick={() => selectedNode?.type === 'task' ? addContextToTask(selectedNode.id, 'prompt') : addNode('prompt')} disabled={!canEdit || Boolean(editProposal)}>提示词{selectedNode?.type === 'task' ? '并关联所选任务' : ''}</button></div></details>
          {selectedNode && <button className="is-danger" onClick={() => deleteNode(selectedNode.id)} disabled={!canEdit}>删除所选</button>}
          <button onClick={() => setInspectorOpen((open) => !open)} aria-expanded={inspectorOpen}>详情 {inspectorOpen ? '隐藏' : '显示'}</button>
          {revisionNeedsApply && <button className="is-primary" onClick={() => void runAction('apply')} disabled={busy || Boolean(editProposal) || active && currentRun?.state !== 'paused'}>应用修改并运行</button>}
          <button className="is-primary" onClick={() => void startRun()} disabled={busy || runLocked || !savedWorkflowId || Boolean(editProposal)}>运行</button>
        </div>
      </section>
      {revisionNeedsApply && <p className="dsh-wp-revision-note" role="status">已保存修订 {workflow.revision}，当前运行仍使用修订 {currentRun?.workflow.revision}。应用后，内容、资料或依赖发生变化的任务及其后继将重新执行；输入和产物均未变化、且磁盘文件复核一致的成功任务会明确标记为复用。旧运行记录继续保留。</p>}

      <div className={`dsh-wp-workarea${inspectorOpen ? ' has-inspector' : ''}`}>
        <div className="dsh-wp-canvas" aria-label="工作流画布">
          <ReactFlow<FlowNode, FlowEdge>
            onInit={(instance) => setFlowInstance(instance)}
            nodes={flowNodes}
            edges={flowEdges}
            nodeTypes={NODE_TYPES}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={(_event, node) => { setSelectedNodeId(node.id); setInspectorOpen(true); setNodeMenu(undefined); setPreview(undefined) }}
            onNodeContextMenu={(event, node) => { event.preventDefault(); setSelectedNodeId(node.id); setInspectorOpen(true); setNodeMenu({ id: node.id, x: Math.min(event.clientX, window.innerWidth - 190), y: Math.min(event.clientY, window.innerHeight - 90) }) }}
            onPaneClick={() => setNodeMenu(undefined)}
            isValidConnection={(connection) => canConnect(workflow, connection)}
            fitView
            fitViewOptions={{ padding: 0.25 }}
            minZoom={0.25}
            maxZoom={1.8}
            deleteKeyCode={canEdit ? ['Backspace', 'Delete'] : null}
            nodesDraggable
            nodesConnectable={canEdit}
            elementsSelectable
            panOnDrag
            panOnScroll
            zoomOnScroll
          >
            <Background gap={24} size={1} color="var(--dsw-alias-border-l2)" />
            <MiniMap pannable zoomable nodeColor={(node) => node.type === 'task' ? 'var(--dsw-alias-brand-primary)' : node.type === 'file' ? 'var(--dsw-alias-state-success-primary)' : 'var(--dsw-alias-label-tertiary)'} />
            <Controls showInteractive />
          </ReactFlow>
          {nodeMenu && <div className="dsh-wp-context-menu" role="menu" style={{ left: nodeMenu.x, top: nodeMenu.y }}>
            <button role="menuitem" className="is-danger" onClick={() => deleteNode(nodeMenu.id)}>删除此节点</button>
          </div>}
        </div>

        {inspectorOpen && <aside className="dsh-wp-inspector">
          <div className="dsh-wp-inspector-top"><strong>{selectedNode ? '节点详情' : '运行详情'}</strong><button aria-label="关闭详情" onClick={() => setInspectorOpen(false)}>收起</button></div>
          {selectedNode ? <NodeInspector
            node={selectedNode}
            canEdit={canEdit}
            taskNodes={workflow.nodes}
            links={linksToSelected}
            workflow={workflow}
            run={currentRun}
            preview={preview}
            onUpdate={(update) => updateNode(selectedNode.id, update)}
            onPreview={() => selectedNode.type === 'file' && void previewFile(selectedNode)}
            onLink={(contextId) => changeWorkflow((current) => {
              if (current.edges.some((edge) => edge.type === 'context' && edge.source === contextId && edge.target === selectedNode.id)) return current
              return { ...current, edges: [...current.edges, { type: 'context', id: newId(), source: contextId, target: selectedNode.id }] }
            })}
            onUnlink={(contextId) => changeWorkflow((current) => ({ ...current, edges: current.edges.filter((edge) => !(edge.type === 'context' && edge.source === contextId && edge.target === selectedNode.id)) }))}
          /> : <p className="dsh-wp-empty">选中画布节点后，在这里编辑内容、关联资料并查看运行记录。</p>}
          {currentRun && <RunInspector run={currentRun} busy={busy} onAction={(action, taskId) => void runAction(action, taskId)} />}
        </aside>}
      </div>
      <footer className="dsh-wp-footer">数据保存在 DSH_HOME。手动编辑无需模型；AI 草稿与 Agent 运行需要 DSH 设置 → Models 中已配置的模型。</footer>
    </main>
  )
}

function NodeInspector(props: {
  readonly node: WorkflowNode
  readonly canEdit: boolean
  readonly taskNodes: readonly WorkflowNode[]
  readonly links: readonly WorkflowEdge[]
  readonly workflow: WorkflowDefinition
  readonly run: WorkflowRun | undefined
  readonly preview: ContextFilePreview | undefined
  readonly onUpdate: (update: (node: WorkflowNode) => WorkflowNode) => void
  readonly onPreview: () => void
  readonly onLink: (contextId: string) => void
  readonly onUnlink: (contextId: string) => void
}) {
  const { node } = props
  const currentRunTask = props.run?.tasks.find((task) => task.taskId === node.id)
  const contexts = props.taskNodes.filter((item) => item.type !== 'task')
  return (
    <div className="dsh-wp-inspector-section">
      <div className={`dsh-wp-type-badge is-${node.type}`}>{node.type === 'task' ? '任务节点' : node.type === 'file' ? '文件节点' : '提示词节点'}</div>
      <label>标题<input value={node.title} disabled={!props.canEdit} onChange={(event) => props.onUpdate((current) => ({ ...current, title: event.target.value }))} /></label>
      {node.type === 'task' && <>
        <label>任务要求<textarea rows={5} value={node.instructions} disabled={!props.canEdit} onChange={(event) => props.onUpdate((current) => current.type === 'task' ? { ...current, instructions: event.target.value } : current)} /></label>
        <label>验收条件（每行一条）<textarea rows={3} value={node.acceptanceCriteria.join('\n')} disabled={!props.canEdit} onChange={(event) => props.onUpdate((current) => current.type === 'task' ? { ...current, acceptanceCriteria: lines(event.target.value) } : current)} /></label>
        <label>预期产物（相对输出目录，每行一个）<textarea rows={2} value={node.expectedArtifacts.join('\n')} disabled={!props.canEdit} onChange={(event) => props.onUpdate((current) => current.type === 'task' ? { ...current, expectedArtifacts: lines(event.target.value) } : current)} /></label>
        <label>文件内容检查（每行填写“相对路径 + 制表符 + 必须包含的文本”）<textarea rows={2} value={node.expectedContents.map(({ path, text }) => `${path}\t${text}`).join('\n')} disabled={!props.canEdit} onChange={(event) => props.onUpdate((current) => current.type === 'task' ? { ...current, expectedContents: parseContentChecks(event.target.value) } : current)} /></label>
        <label className="dsh-wp-checkbox"><input type="checkbox" checked={node.acceptanceMode === 'automatic'} disabled={!props.canEdit} onChange={(event) => props.onUpdate((current) => current.type === 'task' ? { ...current, acceptanceMode: event.target.checked ? 'automatic' : 'manual' } : current)} />自动核验预期产物；未勾选时等待人工验收</label>
      </>}
      {node.type === 'file' && <>
        <label>工作区内的绝对文件路径<textarea rows={2} spellCheck={false} value={node.path} disabled={!props.canEdit} onChange={(event) => props.onUpdate((current) => current.type === 'file' ? { ...current, path: event.target.value } : current)} placeholder={`${props.workflow.workspaceDirectory}\inputs\需求.md`} /></label>
        <button onClick={props.onPreview} disabled={!node.path.trim()}>预览并校验文件</button>
        {props.preview?.path === node.path && <pre className="dsh-wp-preview">{props.preview.content.slice(0, 12000)}{props.preview.content.length > 12000 ? '\n…（预览截断，运行快照保留完整文件）' : ''}</pre>}
      </>}
      {node.type === 'prompt' && <>
        <label>补充要求<textarea rows={7} value={node.text} disabled={!props.canEdit} onChange={(event) => props.onUpdate((current) => current.type === 'prompt' ? { ...current, text: event.target.value } : current)} /></label>
        <label className="dsh-wp-checkbox"><input type="checkbox" checked={node.enabled} disabled={!props.canEdit} onChange={(event) => props.onUpdate((current) => current.type === 'prompt' ? { ...current, enabled: event.target.checked } : current)} />启用此提示词</label>
      </>}
      {node.type === 'task' && <>
        <h3>关联上下文</h3>
        <div className="dsh-wp-context-list">
          {props.links.map((edge) => <div key={edge.id}><span>{props.workflow.nodes.find((item) => item.id === edge.source)?.title ?? edge.source}</span><button onClick={() => props.onUnlink(edge.source)} disabled={!props.canEdit}>解除</button></div>)}
          {contexts.filter((context) => !props.links.some((edge) => edge.source === context.id)).map((context) => <button key={context.id} onClick={() => props.onLink(context.id)} disabled={!props.canEdit}>＋ {context.title}</button>)}
          {contexts.length === 0 && <small>还没有文件或提示词节点。可从上方添加，或拖动上下文节点连到任务。</small>}
        </div>
      </>}
      {currentRunTask && <>
        <h3>最近运行</h3>
        <p>状态：{taskStateLabel(currentRunTask.state)} · 本次尝试：{currentRunTask.attempts.length}</p>
        {currentRunTask.reusedFromRunId && <p className="dsh-wp-reused-result">本次复用了运行 {currentRunTask.reusedFromRunId} 的第 {currentRunTask.reusedFromAttemptNumber} 次成功结果；详细 Agent 记录仍在源运行中。</p>}
        {currentRunTask.attempts.map((attempt) => <article className="dsh-wp-attempt" key={attempt.number}>
          <strong>第 {attempt.number} 次 · {taskStateLabel(attempt.state)}</strong>
          {attempt.agentId && <p>DSH 会话：{attempt.agentId}</p>}
          {attempt.toolNames.length > 0 && <p>工具：{attempt.toolNames.join('、')}</p>}
          {attempt.error && <pre>{attempt.error}</pre>}
          {attempt.result && <pre>{attempt.result.slice(0, 5000)}</pre>}
        </article>)}
      </>}
    </div>
  )
}

function buildUiEditDiff(base: WorkflowDefinition, candidate: WorkflowDefinition): WorkflowEditDiff {
  const beforeNodes = new Map(base.nodes.map((node) => [node.id, node]))
  const afterNodes = new Map(candidate.nodes.map((node) => [node.id, node]))
  const beforeEdges = new Map(base.edges.map((edge) => [edge.id, edge]))
  const afterEdges = new Map(candidate.edges.map((edge) => [edge.id, edge]))
  return {
    addedNodes: candidate.nodes.filter((node) => !beforeNodes.has(node.id)),
    removedNodes: base.nodes.filter((node) => !afterNodes.has(node.id)),
    changedNodes: candidate.nodes.flatMap((node) => {
      const before = beforeNodes.get(node.id)
      return before && JSON.stringify(before) !== JSON.stringify(node) ? [{ before, after: node }] : []
    }),
    addedEdges: candidate.edges.filter((edge) => !beforeEdges.has(edge.id)),
    removedEdges: base.edges.filter((edge) => !afterEdges.has(edge.id)),
  }
}

function EditProposalDiff({ base, candidate, diff }: { readonly base: WorkflowDefinition; readonly candidate: WorkflowDefinition; readonly diff: WorkflowEditDiff }) {
  const name = (id: string) => candidate.nodes.find((node) => node.id === id)?.title ?? base.nodes.find((node) => node.id === id)?.title ?? id
  const edgeText = (edge: WorkflowEdge) => `${name(edge.source)} → ${name(edge.target)}（${edge.type === 'dependency' ? '依赖' : '资料上下文'}）`
  return <div className="dsh-wp-edit-diff">
    <strong>待应用差异（按当前候选画布计算）</strong>
    {!diff.addedNodes.length && !diff.removedNodes.length && !diff.changedNodes.length && !diff.addedEdges.length && !diff.removedEdges.length && <p>当前没有差异。</p>}
    {diff.addedNodes.map((node) => <p key={`add-${node.id}`}>＋ 新增{node.type === 'task' ? '任务' : node.type === 'file' ? '文件' : '提示词'}：{node.title}</p>)}
    {diff.removedNodes.map((node) => <p key={`remove-${node.id}`}>− 删除{node.type === 'task' ? '任务' : node.type === 'file' ? '文件' : '提示词'}：{node.title}（相关连线也会移除）</p>)}
    {diff.changedNodes.map(({ before, after }) => <p key={`change-${after.id}`}>✎ 修改“{before.title}”：{describeWorkflowNodeChanges(before, after).join('、') || '节点属性'}</p>)}
    {diff.removedEdges.map((edge) => <p key={`edge-remove-${edge.id}`}>− 移除连线：{edgeText(edge)}</p>)}
    {diff.addedEdges.map((edge) => <p key={`edge-add-${edge.id}`}>＋ 新增连线：{edgeText(edge)}</p>)}
  </div>
}

function RunInspector({ run, busy, onAction }: {
  readonly run: WorkflowRun | undefined
  readonly busy: boolean
  readonly onAction: (action: 'pause' | 'resume' | 'cancel' | 'recover' | 'retry' | 'verify' | 'accept' | 'reject' | 'apply', taskId?: string) => void
}) {
  if (!run) return <div className="dsh-wp-inspector-section"><h2>运行记录</h2><p className="dsh-wp-empty">保存后可以启动串行运行。每个任务使用独立 DSH 会话，失败任务不会自动重试。</p></div>
  const inFlight = ['queued', 'running', 'pausing', 'paused', 'verifying'].includes(run.state)
  const failedTask = run.tasks.find((task) => task.state === 'failed')
  const reviewTask = run.tasks.find((task) => task.state === 'needs_review')
  return <div className="dsh-wp-inspector-section dsh-wp-run">
    <h2>运行记录</h2>
    <div className={`dsh-wp-run-state is-${run.state}`}>{runStateLabel(run.state)}</div>
    <p>本次快照：修订 {run.workflow.revision} · Run {run.id}</p>
    {run.parentRunId && <p>来源运行：{run.parentRunId}；复用 {run.tasks.filter((task) => task.reusedFromRunId).length} 项，需重新执行 {run.invalidatedTaskIds?.length ?? 0} 项。</p>}
    {run.error && <p className="dsh-wp-run-error">{run.error}</p>}
    <div className="dsh-wp-run-actions">
      {run.state === 'running' && <button onClick={() => onAction('pause')} disabled={busy}>暂停（当前任务结束后）</button>}
      {run.state === 'paused' && !reviewTask && <button onClick={() => onAction('resume')} disabled={busy}>继续</button>}
      {run.state === 'interrupted' && <button className="is-primary" onClick={() => onAction('recover')} disabled={busy}>恢复运行</button>}
      {run.state === 'paused' && reviewTask && <><button className="is-primary" onClick={() => onAction('accept', reviewTask.taskId)} disabled={busy}>通过此任务</button><button className="is-danger" onClick={() => onAction('reject', reviewTask.taskId)} disabled={busy}>驳回此任务</button></>}
      {inFlight && <button className="is-danger" onClick={() => onAction('cancel')} disabled={busy}>停止</button>}
      {failedTask && <button onClick={() => onAction('retry', failedTask.taskId)} disabled={busy}>重试失败任务</button>}
      {run.state === 'needs_review' && run.tasks.every((task) => task.state === 'succeeded') && <>
        <button onClick={() => onAction('verify')} disabled={busy}>重新检查</button>
        <button className="is-primary" onClick={() => onAction('accept')} disabled={busy}>人工验收完成</button>
      </>}
    </div>
    {run.contextSnapshots.length > 0 && <details><summary>本次上下文快照（{run.contextSnapshots.length}）</summary>{run.contextSnapshots.map((item) => <p key={item.nodeId}>{item.title} · {item.sha256 || '提示词快照'}</p>)}</details>}
    <details><summary>事件日志（{run.events.length}）</summary><ol className="dsh-wp-event-list">{run.events.map((event) => <li key={event.seq}><time>{new Date(event.at).toLocaleTimeString()}</time><b>{event.type}</b><span>{event.message}</span></li>)}</ol></details>
    {run.verification.summary && <div className="dsh-wp-verification"><strong>独立检查：{run.verification.status === 'passed' ? '通过' : run.verification.status === 'failed' ? '未通过' : '受阻'}</strong><p>{run.verification.summary}</p>{run.verification.toolNames.length > 0 && <small>实际检查工具：{run.verification.toolNames.join('、')}</small>}</div>}
  </div>
}

function TaskCard({ data, selected }: NodeProps<FlowNode>) {
  const [menuOpen, setMenuOpen] = useState(false)
  const node = data.node
  if (node.type !== 'task') return null
  return <div className={`dsh-wp-node dsh-wp-node-task${selected ? ' is-selected' : ''}`}>
    <Handle type="target" position={FlowPosition.Left} id="in" />
    <span className="dsh-wp-node-kind">任务 · 执行</span>
    <strong>{node.title}</strong>
    <p>{node.instructions}</p>
    <div className="dsh-wp-node-add-wrap nodrag nopan" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => event.stopPropagation()}>
      <button className="dsh-wp-node-add" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>＋ 添加资料</button>
      {menuOpen && <div className="dsh-wp-node-add-menu" role="menu">
        <button role="menuitem" onClick={() => { data.onAddContext?.('file'); setMenuOpen(false) }}>参考文件</button>
        <button role="menuitem" onClick={() => { data.onAddContext?.('prompt'); setMenuOpen(false) }}>提示词</button>
      </div>}
    </div>
    <Handle type="source" position={FlowPosition.Right} id="out" />
  </div>
}

function FileCard({ data, selected }: NodeProps<FlowNode>) {
  const node = data.node
  if (node.type !== 'file') return null
  return <div className={`dsh-wp-node dsh-wp-node-file${selected ? ' is-selected' : ''}`}>
    <strong>▤ {node.title}</strong><p>{node.path || '双击选中后填写工作区文件路径'}</p>
    <Handle type="source" position={FlowPosition.Right} id="out" />
  </div>
}

function PromptCard({ data, selected }: NodeProps<FlowNode>) {
  const node = data.node
  if (node.type !== 'prompt') return null
  return <div className={`dsh-wp-node dsh-wp-node-prompt${selected ? ' is-selected' : ''}`}>
    <strong>✎ {node.title}</strong><p>{node.text || '双击选中后填写补充要求'}</p>
    <Handle type="source" position={FlowPosition.Right} id="out" />
  </div>
}

const NODE_TYPES: NodeTypes = { task: TaskCard, file: FileCard, prompt: PromptCard }

function newWorkflow(workspaceDirectory = ''): WorkflowDefinition {
  const now = Date.now()
  const nodes: WorkflowNode[] = DEFAULT_TASKS.map((item, index) => ({
    type: 'task',
    id: `task-${index + 1}`,
    title: item.title,
    instructions: item.instructions,
    acceptanceCriteria: [`人工核对“${item.title}”的执行结果和关联产物。`],
    expectedArtifacts: [],
    expectedContents: [],
    acceptanceMode: 'manual',
    order: index,
    position: { x: 60 + index * 330, y: 120 },
  }))
  const edges: WorkflowEdge[] = []
  return {
    id: newId(),
    title: '新建工作流',
    objective: '',
    workspaceDirectory,
    outputDirectory: workspaceDirectory,
    schemaVersion: 1,
    revision: 0,
    nodes,
    edges,
    createdAt: now,
    updatedAt: now,
  }
}

function toFlowNodes(workflow: WorkflowDefinition): FlowNode[] {
  return workflow.nodes.map((node) => ({ id: node.id, type: node.type, position: { ...node.position }, data: { node } }))
}

function toFlowEdges(workflow: WorkflowDefinition): FlowEdge[] {
  return workflow.edges.map((edge) => ({ id: edge.id, source: edge.source, target: edge.target, data: { kind: edge.type } }))
}

function fromFlowEdges(edges: readonly FlowEdge[]): WorkflowEdge[] {
  const result: WorkflowEdge[] = []
  for (const edge of edges) {
    if (edge.data?.kind === 'dependency') result.push({ type: 'dependency', id: edge.id, source: edge.source, target: edge.target })
    if (edge.data?.kind === 'context') result.push({ type: 'context', id: edge.id, source: edge.source, target: edge.target })
  }
  return result
}

function canConnect(workflow: WorkflowDefinition, connection: Connection | Edge): boolean {
  if (!connection.source || !connection.target || connection.source === connection.target) return false
  const source = workflow.nodes.find((node) => node.id === connection.source)
  const target = workflow.nodes.find((node) => node.id === connection.target)
  if (!source || !target || target.type !== 'task') return false
  if (source.type === 'task' && target.type !== 'task') return false
  return !workflow.edges.some((edge) => edge.source === source.id && edge.target === target.id && edge.type === (source.type === 'task' ? 'dependency' : 'context'))
}

function unwrap<T>(result: { readonly ok: true; readonly value: T } | { readonly ok: false; readonly error: Error }): T {
  if (!result.ok) throw new Error(result.error.message)
  return result.value
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

function newId(): string {
  return globalThis.crypto.randomUUID()
}

function actionLabel(action: string): string {
  return ({ pause: '暂停', resume: '继续', cancel: '停止', recover: '恢复运行', retry: '重试', verify: '重新检查', accept: '人工验收', reject: '驳回', apply: '应用修订' } as Record<string, string>)[action] ?? action
}

function taskStateLabel(state: string): string {
  return ({ pending: '等待中', running: '运行中', needs_review: '待人工验收', succeeded: '已完成', failed: '失败', skipped: '已跳过', cancelled: '已取消', interrupted: '已中断' } as Record<string, string>)[state] ?? state
}

function lines(value: string): string[] {
  return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
}

function parseContentChecks(value: string): { path: string; text: string }[] {
  return value.split(/\r?\n/).map((line) => {
    const tab = line.indexOf('\t')
    return tab < 1 ? undefined : { path: line.slice(0, tab).trim(), text: line.slice(tab + 1).trim() }
  }).filter((check): check is { path: string; text: string } => Boolean(check?.path && check.text))
}

function runStateLabel(state: string): string {
  return ({ queued: '排队中', running: '运行中', pausing: '等待任务边界暂停', paused: '已暂停', verifying: '产物检查中', completed: '检查通过', needs_review: '等待人工验收', failed: '运行失败', cancelled: '已停止', interrupted: '上次运行中断', accepted: '人工验收完成' } as Record<string, string>)[state] ?? state
}
