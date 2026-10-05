import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile, stat } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { basename, join, resolve } from 'node:path'
import { renameWithTransientRetry, WorkflowStorage } from '../lib/types/host/storage.js'
import { normalizeDirectoryInput } from '../lib/types/shared/path-input.js'

function task(id = 'task-1', state = 'pending') {
  return { taskId: id, state, attempts: [], result: '' }
}

function workflow(workspace, revision = 0, id = 'wf-storage') {
  return {
    id, title: '存储测试', objective: '验证并发写入', workspaceDirectory: workspace,
    outputDirectory: join(workspace, 'out'), schemaVersion: 1, revision,
    nodes: [{
      type: 'task', id: 'task-1', title: '检查', instructions: '执行检查',
      acceptanceCriteria: ['核验检查结果'], expectedArtifacts: [], expectedContents: [], acceptanceMode: 'manual', order: 0,
      position: { x: 0, y: 0 },
    }],
    edges: [], createdAt: 10, updatedAt: 10,
  }
}

test('保存使用乐观修订号，数据可重开且拒绝陈旧覆盖', async (t) => {
  const home = await mkdtemp(join(tmpdir(), 'dsh-wp-store-'))
  const workspace = join(home, 'workspace')
  await mkdir(workspace)
  process.env.DSH_HOME = join(home, 'dsh')
  t.after(async () => { delete process.env.DSH_HOME; await rm(home, { recursive: true, force: true }) })

  const store = new WorkflowStorage()
  await store.initialize()
  const first = await store.saveWorkflow(workflow(workspace), 0)
  assert.equal(first.revision, 1)
  await assert.rejects(store.saveWorkflow(workflow(workspace), 0), /修订冲突/u)
  const second = await store.saveWorkflow({ ...first, title: '已更新' }, 1)
  assert.equal(second.revision, 2)

  const reopened = new WorkflowStorage()
  await reopened.initialize()
  assert.equal(reopened.getWorkflow(first.id)?.title, '已更新')
  assert.equal(reopened.getWorkflow(first.id)?.revision, 2)
  const data = JSON.parse(await readFile(join(process.env.DSH_HOME, 'workflow-plugin', 'state.json'), 'utf8'))
  assert.equal(data.schemaVersion, 5)
})

test('目录输入去掉首尾空白及复制路径引号，保留中文和内部空格并拒绝控制字符', () => {
  assert.equal(normalizeDirectoryInput('  D:\\中文 项目\\out folder  '), 'D:\\中文 项目\\out folder')
  assert.equal(normalizeDirectoryInput('  "D:\\中文 项目\\out folder"  '), 'D:\\中文 项目\\out folder')
  assert.equal(normalizeDirectoryInput("D:\\people's project"), "D:\\people's project")
  assert.throws(() => normalizeDirectoryInput('D:\\project\r\nother'), /换行或控制字符/u)
  assert.throws(() => normalizeDirectoryInput('"D:\\project'), /首尾引号不匹配/u)
})

test('原子替换遇到 Windows 瞬时共享冲突时有限重试，其他错误立即返回', async () => {
  let attempts = 0
  const delays = []
  await renameWithTransientRetry('state.tmp', 'state.json', async () => {
    attempts++
    if (attempts < 3) throw Object.assign(new Error('transient sharing violation'), { code: attempts === 1 ? 'EPERM' : 'EBUSY' })
  }, async (milliseconds) => { delays.push(milliseconds) })
  assert.equal(attempts, 3)
  assert.deepEqual(delays, [20, 40])

  attempts = 0
  await assert.rejects(renameWithTransientRetry('state.tmp', 'state.json', async () => {
    attempts++
    throw Object.assign(new Error('invalid path'), { code: 'EINVAL' })
  }, async () => assert.fail('non-transient errors are not retried')), /invalid path/u)
  assert.equal(attempts, 1)
})

test('待处理命令草稿提供不含画布的全局恢复索引，重载后仍指向原会话', async (t) => {
  const home = await mkdtemp(join(tmpdir(), 'dsh-wp-draft-index-'))
  const workspace = join(home, '工作区 中文 project')
  await mkdir(workspace)
  process.env.DSH_HOME = join(home, 'dsh')
  t.after(async () => { delete process.env.DSH_HOME; await rm(home, { recursive: true, force: true }) })

  const store = new WorkflowStorage()
  await store.initialize()
  const definition = workflow(workspace, 0, 'command-draft-id')
  const draft = await store.saveSessionDraft({
    sessionId: 'session-with-command-only', draftId: definition.id, commandId: 'cmd-recover-1',
    workflow: definition, model: 'provider/model', createdAt: 20,
  }, 0)
  const summaries = store.listPendingSessionDrafts()
  assert.deepEqual(summaries, [{
    sessionId: 'session-with-command-only', draftId: draft.draftId, commandId: 'cmd-recover-1',
    workflowTitle: definition.title, revision: 1, taskCount: 1, model: 'provider/model',
    createdAt: 20, updatedAt: draft.updatedAt,
  }])
  assert.equal(Object.hasOwn(summaries[0], 'workflow'), false, '全局恢复列表不带画布或正文')

  const reopened = new WorkflowStorage()
  await reopened.initialize()
  assert.equal(reopened.listPendingSessionDrafts()[0].sessionId, 'session-with-command-only')
  assert.equal(reopened.getSessionDraft('session-with-command-only').draftId, draft.draftId)
})

test('Host 目录浏览与显式创建限定真实工作区，保存前拒绝不存在或非目录输出路径', async (t) => {
  const home = await mkdtemp(join(tmpdir(), 'dsh-wp-folder-picker-'))
  const workspace = join(home, '中文 project with spaces')
  await mkdir(workspace)
  process.env.DSH_HOME = join(home, 'dsh')
  t.after(async () => { delete process.env.DSH_HOME; await rm(home, { recursive: true, force: true }) })
  const child = join(workspace, '输出 with spaces')
  await mkdir(child)
  const filePath = join(workspace, 'not-a-folder.txt')
  await writeFile(filePath, 'test', 'utf8')

  const store = new WorkflowStorage()
  await store.initialize()
  assert.equal(await store.canonicalWorkspaceDirectory(`  "${workspace}"  `), resolve(workspace))
  const rootListing = await store.browseDirectories(`  "${workspace}"  `)
  assert.ok(rootListing.directories.some((entry) => entry.path === resolve(child)))
  const childListing = await store.browseDirectories(child, workspace)
  assert.equal(childListing.parentPath, resolve(workspace), '受限浏览允许回到工作区根目录，但不能越过根目录')

  const missing = join(workspace, 'new output folder')
  await assert.rejects(store.normalizeOutputPath(missing, workspace), /输出目录不存在/u)
  const created = await store.createOutputDirectory(` "${missing}" `, workspace)
  assert.equal(created, resolve(missing))
  assert.equal((await stat(created)).isDirectory(), true)
  await assert.rejects(store.normalizeOutputPath(filePath, workspace), /输出路径不是目录/u)
  await assert.rejects(store.browseDirectories(filePath), /不是目录/u)
  await assert.rejects(store.browseDirectories(join(home, 'missing')), /目录不存在/u)
})

test('旧状态迁移保留历史流程但不自动关联到任何会话', async (t) => {
  const home = await mkdtemp(join(tmpdir(), 'dsh-wp-migration-'))
  const workspace = join(home, 'workspace')
  await mkdir(workspace)
  process.env.DSH_HOME = join(home, 'dsh')
  t.after(async () => { delete process.env.DSH_HOME; await rm(home, { recursive: true, force: true }) })
  const root = join(process.env.DSH_HOME, 'workflow-plugin')
  await mkdir(root, { recursive: true })
  await writeFile(join(root, 'state.json'), JSON.stringify({ schemaVersion: 2, workflows: [workflow(workspace)], runs: [] }), 'utf8')

  const store = new WorkflowStorage()
  await store.initialize()
  assert.ok(store.getWorkflow('wf-storage'))
  assert.equal(store.getSessionAssociation('legacy-session'), undefined)
  const migrated = JSON.parse(await readFile(join(root, 'state.json'), 'utf8'))
  assert.equal(migrated.schemaVersion, 5)
  assert.deepEqual(migrated.associations, [])
  assert.deepEqual(migrated.sessionDrafts, [])
  assert.deepEqual(migrated.editProposals, [])
})

test('编辑提案以独立 ID 持久化；更新和应用在一次 CAS 事务中升级原流程修订', async (t) => {
  const home = await mkdtemp(join(tmpdir(), 'dsh-wp-edit-proposal-'))
  const workspace = join(home, 'workspace')
  await mkdir(workspace)
  process.env.DSH_HOME = join(home, 'dsh')
  t.after(async () => { delete process.env.DSH_HOME; await rm(home, { recursive: true, force: true }) })
  const store = new WorkflowStorage()
  await store.initialize()
  const base = await store.saveWorkflow(workflow(workspace, 0, 'stable-workflow'), 0)
  const association = await store.associateSessionWorkflow('session-a', base.id, 0)
  const candidate = { ...base, nodes: [{ ...base.nodes[0], title: '已修改任务' }] }
  const saved = await store.saveSessionEditProposal({
    sessionId: 'session-a', proposalId: 'proposal-separate-id', commandId: 'edit-command', workflowId: base.id,
    baseWorkflowRevision: base.revision, baseAssociationRevision: association.revision,
    baseWorkflow: base, workflow: candidate, model: 'provider/model', createdAt: 12,
  })
  assert.equal(saved.revision, 1)
  assert.notEqual(saved.proposalId, saved.workflowId)
  assert.deepEqual(store.getWorkflow(base.id), base, '生成提案不改变原流程')

  const reload1 = new WorkflowStorage()
  await reload1.initialize()
  assert.equal(reload1.getSessionEditProposal('session-a').proposalId, 'proposal-separate-id')
  const changedCandidate = { ...candidate, nodes: [{ ...candidate.nodes[0], instructions: '进一步说明' }] }
  const updated = await reload1.updateSessionEditProposal('session-a', saved.proposalId, 1, changedCandidate)
  assert.equal(updated.revision, 2)
  await assert.rejects(reload1.updateSessionEditProposal('session-a', saved.proposalId, 1, changedCandidate), /提案已变化/u)
  await assert.rejects(reload1.saveWorkflowForSession(changedCandidate, base.revision, 'session-a', association.revision), /有待确认的编辑建议/u)

  const reload2 = new WorkflowStorage()
  await reload2.initialize()
  const persisted = reload2.getSessionEditProposal('session-a')
  assert.equal(persisted.revision, 2)
  assert.equal(persisted.workflow.nodes[0].instructions, '进一步说明')
  const committed = await reload2.applySessionEditProposal('session-a', saved.proposalId, 2)
  assert.equal(committed.id, base.id)
  assert.equal(committed.revision, base.revision + 1)
  assert.equal(committed.nodes[0].instructions, '进一步说明')
  assert.equal(reload2.getSessionEditProposal('session-a'), undefined)
  assert.equal(reload2.getSessionAssociation('session-a').workflowId, base.id)
  await assert.rejects(reload2.applySessionEditProposal('session-a', saved.proposalId, 2), /已处理/u)
})

test('流程或关联修订冲突拒绝应用并保留提案；放弃不改流程', async (t) => {
  const home = await mkdtemp(join(tmpdir(), 'dsh-wp-edit-conflict-'))
  const workspace = join(home, 'workspace')
  await mkdir(workspace)
  process.env.DSH_HOME = join(home, 'dsh')
  t.after(async () => { delete process.env.DSH_HOME; await rm(home, { recursive: true, force: true }) })
  const store = new WorkflowStorage()
  await store.initialize()
  const base = await store.saveWorkflow(workflow(workspace, 0, 'conflicted-workflow'), 0)
  const association = await store.associateSessionWorkflow('session-a', base.id, 0)
  const candidate = { ...base, nodes: [{ ...base.nodes[0], title: '提案标题' }] }
  const proposal = await store.saveSessionEditProposal({
    sessionId: 'session-a', proposalId: 'proposal-conflict', commandId: 'command-conflict', workflowId: base.id,
    baseWorkflowRevision: base.revision, baseAssociationRevision: association.revision,
    baseWorkflow: base, workflow: candidate, model: 'provider/model', createdAt: 20,
  })

  await store.saveWorkflow({ ...base, title: '其他编辑已保存' }, base.revision)
  await assert.rejects(store.applySessionEditProposal('session-a', proposal.proposalId, proposal.revision), /基础流程修订已变化/u)
  assert.equal(store.getSessionEditProposal('session-a').revision, proposal.revision)
  assert.equal(store.getWorkflow(base.id).title, '其他编辑已保存')
  await assert.rejects(store.discardSessionEditProposal('session-a', proposal.proposalId, proposal.revision + 1), /已变化/u)
  await store.discardSessionEditProposal('session-a', proposal.proposalId, proposal.revision)
  assert.equal(store.getSessionEditProposal('session-a'), undefined)
  assert.equal(store.getWorkflow(base.id).title, '其他编辑已保存')
})

test('会话关联修订变化时应用被 CAS 拒绝，提案仍可读取或放弃', async (t) => {
  const home = await mkdtemp(join(tmpdir(), 'dsh-wp-edit-association-conflict-'))
  const workspace = join(home, 'workspace')
  await mkdir(workspace)
  process.env.DSH_HOME = join(home, 'dsh')
  t.after(async () => { delete process.env.DSH_HOME; await rm(home, { recursive: true, force: true }) })
  const store = new WorkflowStorage()
  await store.initialize()
  const base = await store.saveWorkflow(workflow(workspace, 0, 'association-flow'), 0)
  const other = await store.saveWorkflow(workflow(workspace, 0, 'other-flow'), 0)
  const association = await store.associateSessionWorkflow('session-a', base.id, 0)
  const candidate = { ...base, nodes: [{ ...base.nodes[0], title: '建议名称' }] }
  const proposal = await store.saveSessionEditProposal({
    sessionId: 'session-a', proposalId: 'association-proposal', commandId: 'association-command', workflowId: base.id,
    baseWorkflowRevision: base.revision, baseAssociationRevision: association.revision,
    baseWorkflow: base, workflow: candidate, model: 'provider/model', createdAt: 25,
  })

  // Simulate a stale independent writer that changed the association before this CAS.
  const statePath = join(process.env.DSH_HOME, 'workflow-plugin', 'state.json')
  const state = JSON.parse(await readFile(statePath, 'utf8'))
  state.associations[0] = { ...state.associations[0], workflowId: other.id, revision: association.revision + 1, updatedAt: Date.now() }
  await writeFile(statePath, JSON.stringify(state), 'utf8')
  await assert.rejects(store.applySessionEditProposal('session-a', proposal.proposalId, proposal.revision), /流程关联已变化/u)
  assert.equal(store.getSessionEditProposal('session-a').proposalId, proposal.proposalId)
  assert.equal(store.getWorkflow(base.id).revision, base.revision)
  await store.discardSessionEditProposal('session-a', proposal.proposalId, proposal.revision)
})

test('活动运行期间不允许应用编辑提案，运行快照与提案均不变', async (t) => {
  const home = await mkdtemp(join(tmpdir(), 'dsh-wp-edit-running-'))
  const workspace = join(home, 'workspace')
  await mkdir(workspace)
  process.env.DSH_HOME = join(home, 'dsh')
  t.after(async () => { delete process.env.DSH_HOME; await rm(home, { recursive: true, force: true }) })
  const store = new WorkflowStorage()
  await store.initialize()
  const base = await store.saveWorkflow(workflow(workspace, 0, 'running-workflow'), 0)
  const association = await store.associateSessionWorkflow('session-a', base.id, 0)
  const candidate = { ...base, nodes: [{ ...base.nodes[0], title: '提案标题' }] }
  const proposal = await store.saveSessionEditProposal({
    sessionId: 'session-a', proposalId: 'proposal-active', commandId: 'command-active', workflowId: base.id,
    baseWorkflowRevision: base.revision, baseAssociationRevision: association.revision,
    baseWorkflow: base, workflow: candidate, model: 'provider/model', createdAt: 30,
  })
  const run = {
    id: 'run-active', requestId: 'run-active', workflowId: base.id, sessionId: 'session-a', workflow: base,
    state: 'paused', createdAt: 1, startedAt: 1, endedAt: 0, tasks: [task()], contextSnapshots: [],
    verification: { status: 'pending', summary: '', checkedAt: 0, agentId: '', toolNames: [] }, events: [], error: '',
  }
  await store.saveRun(run)
  await assert.rejects(store.applySessionEditProposal('session-a', proposal.proposalId, proposal.revision), /活动运行/u)
  assert.equal(store.getWorkflow(base.id).revision, base.revision)
  assert.equal(store.getRun(run.id).workflow.revision, base.revision)
  assert.equal(store.getSessionEditProposal('session-a').proposalId, proposal.proposalId)
})

test('会话命令草稿跨重载恢复；保存和草稿删除在同一 revision CAS 内提交', async (t) => {
  const home = await mkdtemp(join(tmpdir(), 'dsh-wp-session-draft-'))
  const workspace = join(home, 'workspace')
  await mkdir(workspace)
  process.env.DSH_HOME = join(home, 'dsh')
  t.after(async () => { delete process.env.DSH_HOME; await rm(home, { recursive: true, force: true }) })
  const store = new WorkflowStorage()
  await store.initialize()
  const definition = workflow(workspace, 0, 'draft-flow')
  const record = {
    sessionId: 'session-a', draftId: definition.id, commandId: 'command-a',
    workflow: definition, model: 'provider/model', createdAt: 10,
  }
  const savedDraft = await store.saveSessionDraft(record, 0)
  assert.equal(savedDraft.revision, 1)
  await assert.rejects(store.saveSessionDraft(record, 0), /草稿修订冲突/u)

  const reloaded = new WorkflowStorage()
  await reloaded.initialize()
  assert.equal(reloaded.getSessionDraft('session-a')?.workflow.id, 'draft-flow')
  assert.equal(reloaded.getSessionDraft('session-b'), undefined)
  const staleEdit = { ...definition, title: '过期草稿编辑' }
  await assert.rejects(reloaded.saveWorkflowForSession(staleEdit, 0, 'session-a', 0, {
    draftId: 'draft-flow', expectedDraftRevision: 0,
  }), /草稿已变化/u)
  assert.equal(reloaded.getWorkflow('draft-flow'), undefined, '冲突不写入全局流程')
  assert.equal(reloaded.getSessionAssociation('session-a'), undefined, '冲突不创建会话关联')
  assert.equal(reloaded.getSessionDraft('session-a')?.revision, 1, '冲突保留原草稿')

  const committed = await reloaded.saveWorkflowForSession(definition, 0, 'session-a', 0, {
    draftId: 'draft-flow', expectedDraftRevision: 1,
  })
  assert.equal(committed.workflow.revision, 1)
  assert.equal(committed.association.workflowId, 'draft-flow')
  assert.equal(reloaded.getSessionDraft('session-a'), undefined)
})

test('草稿持久化的取消检查在原子提交前拒绝写盘', async (t) => {
  const home = await mkdtemp(join(tmpdir(), 'dsh-wp-draft-cancel-'))
  const workspace = join(home, 'workspace')
  await mkdir(workspace)
  process.env.DSH_HOME = join(home, 'dsh')
  t.after(async () => { delete process.env.DSH_HOME; await rm(home, { recursive: true, force: true }) })
  const store = new WorkflowStorage()
  await store.initialize()
  const controller = new AbortController()
  controller.abort(new DOMException('cancelled', 'AbortError'))
  await assert.rejects(store.saveSessionDraft({
    sessionId: 'session-a', draftId: 'draft-cancel', commandId: 'command-cancel',
    workflow: workflow(workspace, 0, 'draft-cancel'), model: 'provider/model', createdAt: 1,
  }, 0, controller.signal), /cancelled/u)
  assert.equal(store.getSessionDraft('session-a'), undefined)
})

test('会话关联和新流程一次提交，跨实例冲突只允许一个修订者成功', async (t) => {
  const home = await mkdtemp(join(tmpdir(), 'dsh-wp-associations-'))
  const workspace = join(home, 'workspace')
  await mkdir(workspace)
  process.env.DSH_HOME = join(home, 'dsh')
  t.after(async () => { delete process.env.DSH_HOME; await rm(home, { recursive: true, force: true }) })

  const store = new WorkflowStorage()
  await store.initialize()
  const created = await store.saveWorkflowForSession(workflow(workspace, 0, 'workflow-a'), 0, 'session-a', 0)
  assert.equal(created.workflow.revision, 1)
  assert.equal(created.association.revision, 1)
  await store.saveWorkflow(workflow(workspace, 0, 'workflow-b'), 0)
  await store.saveWorkflow(workflow(workspace, 0, 'workflow-c'), 0)

  const secondHost = new WorkflowStorage()
  await secondHost.initialize()
  const competing = await Promise.allSettled([
    store.associateSessionWorkflow('session-a', 'workflow-b', 1),
    secondHost.associateSessionWorkflow('session-a', 'workflow-c', 1),
  ])
  assert.equal(competing.filter((item) => item.status === 'fulfilled').length, 1)
  assert.equal(competing.filter((item) => item.status === 'rejected').length, 1)

  const reopened = new WorkflowStorage()
  await reopened.initialize()
  const current = reopened.getSessionAssociation('session-a')
  assert.ok(['workflow-b', 'workflow-c'].includes(current?.workflowId))
  assert.equal(current?.revision, 2)
  await reopened.removeWorkflow(current.workflowId)
  assert.equal(reopened.getSessionAssociation('session-a')?.workflowId, '')
  assert.equal(reopened.getSessionAssociation('session-a')?.revision, 3)
})

test('上下文读取验证 UTF-8、BOM、大小和 SHA-256', async (t) => {
  const home = await mkdtemp(join(tmpdir(), 'dsh-wp-files-'))
  const workspace = join(home, 'workspace')
  await mkdir(workspace)
  process.env.DSH_HOME = join(home, 'dsh')
  t.after(async () => { delete process.env.DSH_HOME; await rm(home, { recursive: true, force: true }) })
  const store = new WorkflowStorage()
  await store.initialize()

  const definition = workflow(workspace)
  await mkdir(definition.outputDirectory)
  await writeFile(join(definition.outputDirectory, 'index.html'), '<h1>中文结果</h1>')
  assert.equal((await store.checkOutputArtifact('index.html', definition)).passed, true)
  assert.equal((await store.checkOutputArtifact('index.html', definition, '中文结果')).passed, true)
  assert.equal((await store.checkOutputArtifact('index.html', definition, '缺失字符串')).passed, false)

  const valid = Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), Buffer.from('需求内容', 'utf8')])
  const path = join(workspace, 'requirements.md')
  await writeFile(path, valid)
  const preview = await store.readContextFile(path, workspace)
  assert.equal(preview.content, '需求内容')
  assert.equal(preview.sha256, createHash('sha256').update(valid).digest('hex'))
  assert.equal(preview.size, valid.byteLength)

  const invalid = join(workspace, 'broken.txt')
  await writeFile(invalid, Buffer.from([0xff, 0xfe]))
  await assert.rejects(store.readContextFile(invalid, workspace), /有效 UTF-8/u)

  const oversized = join(workspace, 'large.txt')
  await writeFile(oversized, Buffer.alloc(2 * 1024 * 1024 + 1, 65))
  await assert.rejects(store.readContextFile(oversized, workspace), /超过 2 MiB/u)
})

test('拒绝工作区外路径和经目录链接逃出的新输出目录', async (t) => {
  const home = await mkdtemp(join(tmpdir(), 'dsh-wp-paths-'))
  const workspace = join(home, 'workspace')
  const outside = join(home, 'outside')
  await Promise.all([mkdir(workspace), mkdir(outside)])
  process.env.DSH_HOME = join(home, 'dsh')
  t.after(async () => { delete process.env.DSH_HOME; await rm(home, { recursive: true, force: true }) })
  const store = new WorkflowStorage()
  await store.initialize()

  await assert.rejects(store.normalizeOutputPath(outside, workspace), /工作区/u)
  const link = join(workspace, 'linked')
  try {
    await symlink(outside, link, 'junction')
  } catch (error) {
    if (['EPERM', 'EACCES', 'ENOTSUP'].includes(error.code)) return t.skip(`当前 Windows 环境不允许创建测试 junction：${error.code}`)
    throw error
  }
  await assert.rejects(store.canonicalOutputDirectory(join(link, 'generated'), workspace, true), /超出了工作区/u)
  await assert.rejects(stat(join(outside, 'generated')))
})

test('重启将活动运行标记为 interrupted，保留结果且不自动派发', async (t) => {
  const home = await mkdtemp(join(tmpdir(), 'dsh-wp-recovery-'))
  const workspace = join(home, 'workspace')
  await mkdir(workspace)
  process.env.DSH_HOME = join(home, 'dsh')
  t.after(async () => { delete process.env.DSH_HOME; await rm(home, { recursive: true, force: true }) })
  const store = new WorkflowStorage()
  await store.initialize()
  const definition = await store.saveWorkflow(workflow(workspace), 0)
  await store.saveRun({
    id: 'run-active', requestId: 'req-1', workflowId: definition.id, workflow: definition,
    state: 'running', createdAt: 1, startedAt: 1, endedAt: 0, tasks: [{
      ...task('task-1', 'running'),
      attempts: [{ number: 1, state: 'running', startedAt: 2, endedAt: 0, agentId: 'agent-1', toolNames: [], result: '', error: '', acceptanceMethod: 'pending', artifactChecks: [], reviewDecision: '' }],
    }],
    contextSnapshots: [], verification: { status: 'pending', summary: '', checkedAt: 0, agentId: '', toolNames: [] },
    events: [{ seq: 0, at: 1, type: 'run.started', taskId: '', message: 'started' }], error: '',
  })

  const reopened = new WorkflowStorage()
  await reopened.initialize()
  assert.equal(reopened.getRun('run-active')?.state, 'interrupted')
  assert.equal(reopened.getRun('run-active')?.tasks[0]?.state, 'pending')
  assert.equal(reopened.getRun('run-active')?.tasks[0]?.attempts[0]?.state, 'interrupted')
  assert.equal(reopened.getRun('run-active')?.events.at(-1)?.type, 'recovery.interrupted')
})

test('第二个 Host 发现活动运行锁由存活进程持有时不恢复或改写运行', async (t) => {
  const home = await mkdtemp(join(tmpdir(), 'dsh-wp-live-lock-'))
  const workspace = join(home, 'workspace')
  await mkdir(workspace)
  process.env.DSH_HOME = join(home, 'dsh')
  t.after(async () => { delete process.env.DSH_HOME; await rm(home, { recursive: true, force: true }) })
  const owner = new WorkflowStorage()
  await owner.initialize()
  const definition = await owner.saveWorkflow(workflow(workspace), 0)
  await owner.saveRun({
    id: 'run-live', requestId: 'req-live', workflowId: definition.id, workflow: definition,
    state: 'paused', createdAt: 1, startedAt: 1, endedAt: 0, tasks: [task('task-1')],
    contextSnapshots: [], verification: { status: 'pending', summary: '', checkedAt: 0, agentId: '', toolNames: [] },
    events: [{ seq: 0, at: 1, type: 'run.paused', taskId: '', message: 'paused at safe boundary' }], error: '',
  })
  const liveLock = await owner.acquireRunLock('run-live')

  const secondHost = new WorkflowStorage()
  await secondHost.initialize()
  assert.equal(secondHost.getRun('run-live')?.state, 'paused')
  assert.equal(secondHost.getRun('run-live')?.events.at(-1)?.type, 'run.paused')

  await owner.releaseRunLock(liveLock)
})

test('无法识别运行锁时保留锁文件并拒绝猜测进程是否已退出', async (t) => {
  const home = await mkdtemp(join(tmpdir(), 'dsh-wp-bad-lock-'))
  const workspace = join(home, 'workspace')
  await mkdir(workspace)
  process.env.DSH_HOME = join(home, 'dsh')
  t.after(async () => { delete process.env.DSH_HOME; await rm(home, { recursive: true, force: true }) })
  const store = new WorkflowStorage()
  await store.initialize()
  const definition = await store.saveWorkflow(workflow(workspace), 0)
  await store.saveRun({
    id: 'run-unknown-owner', requestId: 'req-unknown', workflowId: definition.id, workflow: definition,
    state: 'running', createdAt: 1, startedAt: 1, endedAt: 0, tasks: [task('task-1', 'running')],
    contextSnapshots: [], verification: { status: 'pending', summary: '', checkedAt: 0, agentId: '', toolNames: [] },
    events: [{ seq: 0, at: 1, type: 'run.started', taskId: '', message: 'started' }], error: '',
  })
  const lockPath = join(process.env.DSH_HOME, 'workflow-plugin', 'workflow-run.lock')
  await writeFile(lockPath, '{broken', 'utf8')

  const reopened = new WorkflowStorage()
  await assert.rejects(reopened.initialize(), /运行锁内容无法识别/u)
  assert.equal(await readFile(lockPath, 'utf8'), '{broken')
})
