import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import WorkflowService from '../lib/types/host/index.js'

function deferred() {
  let resolve
  const promise = new Promise((done) => { resolve = done })
  return { promise, resolve }
}

function makeContext(behaviors = [], workspaceDirectory = '') {
  const eventListeners = new Set()
  const createOptions = []
  const followups = []
  const mountedPresets = []
  const resolvedPresets = []
  const registeredPresets = []
  const disposedPresets = []
  const effectDisposers = []
  const commandDefinitions = []
  const selection = { provider: 'test-provider', model: 'test-model', reasoningEffort: 'high' }
  const emit = (sessionId, type, data) => {
    for (const listener of eventListeners) listener({ id: sessionId }, { type, data })
  }
  const ctx = {
    reflect: { provide() {} },
    commands: {
      register(definition) {
        commandDefinitions.push(definition)
        return () => {
          const index = commandDefinitions.indexOf(definition)
          if (index >= 0) commandDefinitions.splice(index, 1)
        }
      },
    },
    sessionController: {
      async inspect(sessionId) { return { meta: { id: sessionId, cwd: workspaceDirectory } } },
    },
    effect(execute) {
      const dispose = execute()
      if (typeof dispose === 'function') effectDisposers.push(dispose)
      return () => dispose?.()
    },
    on(event, listener) {
      if (event !== 'session/event') return () => {}
      eventListeners.add(listener)
      return () => eventListeners.delete(listener)
    },
    agentDefaultModel: { currentSelection: () => selection },
    agentPresets: {
      async register(definition) {
        registeredPresets.push(definition)
        return async () => { disposedPresets.push(definition.id) }
      },
      async resolve(id) { const value = { id: id ?? 'test-default' }; resolvedPresets.push(value); return value },
      async mount(_agentCtx, id) { mountedPresets.push(id) },
    },
    agents: {
      get() { return undefined },
      async create(options) {
        createOptions.push(options)
        // Planner Agents use synthetic session IDs; deterministic A/B test
        // responses are selected from their prompt, not async creation order.
        let behavior = Array.isArray(behaviors) ? behaviors.shift() ?? {} : undefined
        const setupEvents = []
        const agentCtx = { on(event) { setupEvents.push(event); return () => {} } }
        const agent = {
          session: { id: options.sessionId },
          followup(message) {
            const text = message.content?.[0]?.text ?? ''
            followups.push(text)
            if (!Array.isArray(behaviors)) behavior = Object.entries(behaviors).find(([key]) => text.includes(key))?.[1] ?? {}
          },
          cancel() { behavior?.cancel?.() },
          async whenIdle() {
            await behavior?.wait?.promise
            if (options.signal?.aborted) return
            await behavior?.execute?.(options)
            if (options.signal?.aborted) return
            if (behavior?.toolName !== false) emit(options.sessionId, 'tool/call', { name: behavior?.toolName ?? 'write' })
            emit(options.sessionId, 'assistant/message', {
              message: { content: [{ type: 'text', text: behavior?.text ?? '测试 Agent 已完成任务。' }] },
            })
          },
          setupEvents,
        }
        await options.setup?.(agentCtx, agent)
        return { agent, dispose: async () => {} }
      },
    },
  }
  return { ctx, createOptions, mountedPresets, resolvedPresets, registeredPresets, disposedPresets, followups, effectDisposers, commandDefinitions }
}

function definition(workspace, { taskCount = 1, manual = false } = {}) {
  const nodes = Array.from({ length: taskCount }, (_, index) => ({
    type: 'task', id: `task-${index + 1}`, title: `任务 ${index + 1}`, instructions: `执行任务 ${index + 1}`,
    acceptanceCriteria: ['检查测试产物'], expectedArtifacts: manual ? [] : [`task-${index + 1}.md`], expectedContents: [],
    acceptanceMode: manual ? 'manual' : 'automatic', order: index, position: { x: index * 300, y: 0 },
  }))
  return {
    id: `wf-${Math.random().toString(16).slice(2)}`, title: '调度回归', objective: '验证运行控制',
    workspaceDirectory: workspace, outputDirectory: join(workspace, 'out'), schemaVersion: 1, revision: 0,
    nodes, edges: nodes.slice(1).map((node, index) => ({ type: 'dependency', id: `edge-${index + 1}`, source: nodes[index].id, target: node.id })),
    createdAt: Date.now(), updatedAt: Date.now(),
  }
}

async function createService(t, options = {}) {
  const home = await mkdtemp(join(tmpdir(), 'dsh-wp-service-'))
  const workspace = join(home, 'workspace')
  await mkdir(workspace)
  await mkdir(join(workspace, 'out'))
  process.env.DSH_HOME = join(home, 'dsh')
  t.after(async () => { delete process.env.DSH_HOME; await rm(home, { recursive: true, force: true }) })
  const sessionWorkspaceDirectory = Object.hasOwn(options, 'sessionWorkspaceDirectory')
    ? options.sessionWorkspaceDirectory
    : workspace
  const fake = makeContext(options.behaviors ?? [], sessionWorkspaceDirectory)
  const service = new WorkflowService(fake.ctx)
  const workflow = await service.save({ workflow: definition(workspace, options), expectedRevision: 0 })
  return { service, workflow, workspace, ...fake }
}

async function waitForRun(service, runId, predicate, label) {
  const deadline = Date.now() + 5000
  let current
  while (Date.now() < deadline) {
    current = await service.getRun(runId)
    if (predicate(current)) return current
    await new Promise((resolve) => setTimeout(resolve, 10))
  }
  assert.fail(`等待${label}超时；最后状态：${current?.state}`)
}

function writeArtifact(name) {
  return async (options) => {
    await mkdir(options.meta.cwd, { recursive: true })
    await writeFile(join(options.meta.cwd, name), `generated:${name}:ALPHA5-TEST`, 'utf8')
  }
}

test('Agent 使用 DSH 默认模型选择与默认 preset setup，并收集实际工具事件', async (t) => {
  const { service, workflow, createOptions, mountedPresets } = await createService(t, {
    behaviors: [{ execute: writeArtifact('task-1.md') }],
  })
  const run = await service.startRun({ workflowId: workflow.id, requestId: 'agent-composition' })
  const finished = await waitForRun(service, run.id, (value) => value.state === 'needs_review', 'Agent 任务结束')

  assert.equal(createOptions.length, 1)
  assert.equal(createOptions[0].meta.agentPreset, 'test-default')
  assert.equal(createOptions[0].agentOptions.provider, 'test-provider')
  assert.equal(createOptions[0].agentOptions.model, 'test-model')
  assert.deepEqual(mountedPresets, ['test-default'])
  assert.deepEqual(finished.tasks[0].attempts[0].toolNames, ['write'])
  assert.match(finished.tasks[0].attempts[0].result, /测试 Agent/u)
})

test('Host 注册单一 /powernode 命令；无参数不调用模型，edit 校验会话关联与说明', async (t) => {
  const fixture = await createService(t)
  assert.equal(fixture.commandDefinitions.length, 1)
  const command = fixture.commandDefinitions[0]
  assert.equal(command.name, 'powernode')
  assert.match(command.input.hint, /目标/u)
  assert.equal((await command.handler(commandInvocation('  ', 'session-a', 'command-empty'))).kind, 'success')
  for (const action of ['run', 'status', 'pause', 'resume', 'stop', 'retry']) {
    const result = await command.handler(commandInvocation(`${action} now`, 'session-a', `command-${action}`))
    assert.equal(result.kind, 'error', `${action} must not be parsed as a new planning goal`)
    assert.match(result.text, /“工作流”界面/u)
  }
  assert.equal((await command.handler(commandInvocation(' edit ', 'session-a', 'command-edit'))).kind, 'error')
  const missing = await command.handler(commandInvocation(' edit 修改旧流程', 'session-a', 'command-edit-2'))
  assert.equal(missing.kind, 'error')
  assert.match(missing.text, /尚未关联/u)
  assert.equal(fixture.createOptions.length, 0, '命令解析不创建 Agent 或调用模型')
  assert.equal(fixture.service.storage.getSessionDraft('session-a'), undefined)

  fixture.effectDisposers[0]()
  assert.equal(fixture.commandDefinitions.length, 0, 'Host 命令随插件卸载而撤销')
})

function commandInvocation(rawInput, sessionId = 'session-a', commandId = 'command-test', signal = new AbortController().signal) {
  return {
    commandId,
    agent: { session: { id: sessionId, meta: { delegationDepth: 0 } } },
    rawInput,
    attachments: [],
    signal,
  }
}

function generatedPlan(text = '测试目标') {
  return JSON.stringify({ tasks: [
    { title: '需求整理', instructions: '拆分用户目标并明确页面内容。', acceptanceCriteria: ['确认页面信息结构。'], acceptanceMode: 'manual', expectedArtifacts: [], expectedContents: [], dependsOn: [] },
    { title: '页面实现', instructions: '在指定输出目录实现介绍页。', acceptanceCriteria: ['index.html 与 style.css 可读取。'], acceptanceMode: 'automatic', expectedArtifacts: ['index.html', 'style.css'], expectedContents: [], dependsOn: ['需求整理'] },
    { title: '结果检查', instructions: '核对页面资源引用和必需内容。', acceptanceCriteria: ['人工浏览页面并核对内容。'], acceptanceMode: 'manual', expectedArtifacts: [], expectedContents: [], dependsOn: ['页面实现'] },
  ], note: text })
}

function editOperations() {
  return JSON.stringify({ operations: [
    { op: 'add_task', ref: 'check-materials', title: '检查素材', instructions: '核对页面素材是否齐备。', acceptanceCriteria: ['素材清单已核对。'], acceptanceMode: 'manual', expectedArtifacts: [], expectedContents: [], dependsOn: ['需求整理'] },
    { op: 'update_task', target: '页面实现', changes: { title: '制作页面' } },
    { op: 'set_dependencies', target: '页面实现', dependsOn: ['检查素材'] },
  ] })
}

async function associateEditWorkflow(fixture, sessionIds = ['session-a']) {
  const seed = definition(fixture.workspace, { taskCount: 3, manual: true })
  const nodes = seed.nodes.map((node, index) => node.type === 'task'
    ? { ...node, title: ['需求整理', '页面实现', '结果检查'][index], instructions: `${['需求整理', '页面实现', '结果检查'][index]}说明` }
    : node)
  const base = await fixture.service.storage.saveWorkflow({ ...seed, nodes }, 0)
  for (const sessionId of sessionIds) await fixture.service.sessionAssociate(sessionId, { workflowId: base.id, expectedAssociationRevision: 0 })
  return base
}

test('带目标的命令用隔离规划 Agent 生成会话草稿，不建 Run、不建产物目录或更改关联', async (t) => {
  const fixture = await createService(t, { behaviors: [{ text: generatedPlan(), toolName: false }] })
  const before = fixture.service.storage.listWorkflows().map((item) => item.id)
  const result = await fixture.commandDefinitions[0].handler(commandInvocation(' 制作一个包含 index.html 和 style.css 的简单介绍页，把工作拆成需求整理、页面实现和结果检查，先生成流程草稿', 'session-a', 'command-goal'))

  assert.equal(result.kind, 'success')
  assert.match(result.text, /草稿/u)
  assert.match(result.text, /全局“工作流”页的待处理草稿恢复入口/u)
  assert.equal(fixture.createOptions.length, 1, '带目标只调用一次规划 Agent')
  assert.equal(fixture.createOptions[0].agentOptions.model, 'test-model')
  const planningPresetId = fixture.createOptions[0].meta.agentPreset
  assert.match(planningPresetId, /^dsh-workflow-planning-/u, '规划 Agent 有单独的临时 preset 身份')
  assert.deepEqual(fixture.registeredPresets.map(({ plugins }) => plugins), [[]], '规划 preset 不带工具、提示词或技能插件')
  assert.deepEqual(fixture.mountedPresets, [planningPresetId], '规划 Agent 加入空 capability scope，满足 DSH preset 绑定契约')
  assert.deepEqual(fixture.disposedPresets, [planningPresetId], '规划完成后释放临时 preset')
  assert.deepEqual(fixture.resolvedPresets, [], '规划不会解析或挂载用户的默认执行 preset')

  const state = await fixture.service.sessionState('session-a')
  const draft = state.commandDraft
  assert.ok(draft)
  assert.equal(draft.commandId, 'command-goal')
  assert.equal(draft.sessionId, 'session-a')
  assert.equal(draft.revision, 1)
  assert.equal(draft.workflow.revision, 0)
  assert.deepEqual(await fixture.service.listPendingSessionDrafts(), [{
    sessionId: 'session-a', draftId: draft.draftId, commandId: 'command-goal',
    workflowTitle: draft.workflow.title, revision: draft.revision,
    taskCount: draft.workflow.nodes.filter((node) => node.type === 'task').length,
    model: draft.model, createdAt: draft.createdAt, updatedAt: draft.updatedAt,
  }], '命令草稿有轻量的跨会话恢复索引')
  assert.equal(draft.workflow.outputDirectory, fixture.workspace, '无关联流程时仅使用经校验且已存在的会话工作区作为默认输出根目录')
  assert.equal(state.association, undefined, '生成草稿保留原关联')
  assert.equal(state.workflow, undefined)
  assert.deepEqual(fixture.service.storage.listWorkflows().map((item) => item.id), before, '草稿不写入全局流程列表')
  assert.equal(fixture.service.storage.listRuns().length, 0, '规划不会创建 WorkflowRun')
  await assert.rejects(stat(`${fixture.workspace}/workflow-output`), { code: 'ENOENT' })

  const tasks = draft.workflow.nodes.filter((node) => node.type === 'task')
  assert.equal(tasks.length, 3)
  assert.equal(draft.workflow.edges.filter((edge) => edge.type === 'dependency').length, 2)
  assert.equal(draft.workflow.edges.filter((edge) => edge.type === 'context' && edge.source.startsWith('prompt-')).length, 3)
  assert.equal(draft.workflow.objective, '制作一个包含 index.html 和 style.css 的简单介绍页，把工作拆成需求整理、页面实现和结果检查')
  assert.equal(draft.workflow.nodes.find((node) => node.type === 'prompt')?.text, draft.workflow.objective)
  assert.equal(tasks.some((task) => /生成流程草稿/u.test(task.title)), false, '命令操作要求不应变成业务 Task')
  const saved = await fixture.service.sessionSave('session-a', {
    workflow: { ...draft.workflow, title: '已检查的介绍页流程' },
    expectedRevision: 0,
    expectedAssociationRevision: state.associationRevision,
    draftId: draft.draftId,
    expectedDraftRevision: draft.revision,
  })
  assert.equal(saved.workflow.revision, 1)
  const afterSave = await fixture.service.sessionState('session-a')
  assert.equal(afterSave.workflow.id, draft.draftId)
  assert.equal(afterSave.commandDraft, undefined, '明确保存后草稿转换为关联流程')
  assert.equal(afterSave.association.workflowId, draft.draftId)
})

test('用 Alpha.10 原目标分离“先生成流程草稿”，保留实际任务及“生成流程图”业务目标', async (t) => {
  const fixture = await createService(t, { behaviors: [{ text: generatedPlan(), toolName: false }] })
  const result = await fixture.commandDefinitions[0].handler(commandInvocation(
    '制作一个包含 index.html 和 style.css 的简单介绍页，把工作拆成需求整理、页面实现和结果检查，先生成流程草稿。',
    'session-a', 'command-original-alpha10-goal',
  ))
  assert.equal(result.kind, 'success')
  const draft = (await fixture.service.sessionState('session-a')).commandDraft
  assert.equal(draft.workflow.objective, '制作一个包含 index.html 和 style.css 的简单介绍页，把工作拆成需求整理、页面实现和结果检查')
  assert.equal(draft.workflow.nodes.find((node) => node.type === 'prompt')?.text, draft.workflow.objective)
  assert.deepEqual(draft.workflow.nodes.filter((node) => node.type === 'task').map((node) => node.title), ['需求整理', '页面实现', '结果检查'])
  assert.match(fixture.followups[0], /用户目标：\n制作一个包含 index\.html 和 style\.css 的简单介绍页/u)

  const flowchartFixture = await createService(t, { behaviors: [{ text: generatedPlan(), toolName: false }] })
  const flowchart = await flowchartFixture.commandDefinitions[0].handler(commandInvocation('生成一个项目流程图', 'session-flowchart', 'command-flowchart'))
  assert.equal(flowchart.kind, 'success')
  const flowchartDraft = (await flowchartFixture.service.sessionState('session-flowchart')).commandDraft
  assert.equal(flowchartDraft.workflow.objective, '生成一个项目流程图')
  assert.match(flowchartFixture.followups[0], /用户目标：\n生成一个项目流程图/u, '不能用普通词语黑名单删除用户真正要求的流程图任务')

  const currentControlFixture = await createService(t, { behaviors: [{ text: generatedPlan(), toolName: false }] })
  const currentControl = await currentControlFixture.commandDefinitions[0].handler(commandInvocation(
    '制作一个介绍页，把工作拆成需求整理、页面实现和结果检查三个任务；现在只生成可编辑草稿，不要运行。',
    'session-control-wording', 'command-control-wording',
  ))
  assert.equal(currentControl.kind, 'success')
  const currentDraft = (await currentControlFixture.service.sessionState('session-control-wording')).commandDraft
  assert.equal(currentDraft.workflow.objective, '制作一个介绍页，把工作拆成需求整理、页面实现和结果检查三个任务')
  assert.equal(currentDraft.workflow.nodes.find((node) => node.type === 'prompt')?.text, currentDraft.workflow.objective)
  assert.doesNotMatch(currentDraft.workflow.objective, /现在只生成可编辑草稿|不要运行/u)
  assert.doesNotMatch(currentDraft.workflow.nodes.find((node) => node.type === 'prompt')?.text ?? '', /现在只生成可编辑草稿|不要运行/u)
  assert.match(currentControlFixture.followups[0], /用户目标：\n制作一个介绍页/u)
  assert.doesNotMatch(currentControlFixture.followups[0].split('用户目标：\n')[1]?.split('\n\n')[0] ?? '', /现在只生成可编辑草稿|不要运行/u)
})

test('edit 先生成独立提案；明确应用后同一 workflowId 原子升级修订', async (t) => {
  const fixture = await createService(t, { behaviors: [{ text: editOperations(), toolName: false }] })
  const base = await associateEditWorkflow(fixture)
  const invocation = commandInvocation('edit 在需求整理之后增加“检查素材”任务，再连接到页面实现；把“页面实现”改名为“制作页面”，其他内容保持不变。', 'session-a', 'edit-command-a')
  const result = await fixture.commandDefinitions[0].handler(invocation)
  assert.equal(result.kind, 'success')
  assert.match(result.text, /原流程未修改/u)
  assert.equal(fixture.createOptions.length, 1)
  assert.equal(fixture.createOptions[0].parentAgent, invocation.agent, '规划 Agent 是发出命令的 Agent 子级')
  assert.equal(fixture.createOptions[0].meta.parentSession, 'session-a')
  assert.equal(fixture.createOptions[0].meta.origin, 'subagent')
  const planningPresetId = fixture.createOptions[0].meta.agentPreset
  assert.match(planningPresetId, /^dsh-workflow-planning-/u)
  assert.deepEqual(fixture.registeredPresets.map(({ plugins }) => plugins), [[]])
  assert.deepEqual(fixture.mountedPresets, [planningPresetId])
  assert.deepEqual(fixture.disposedPresets, [planningPresetId])
  assert.match(fixture.followups[0], /当前已保存工作流快照/u)

  const state = await fixture.service.sessionState('session-a')
  const proposal = state.editProposal
  assert.ok(proposal)
  assert.equal(proposal.sessionId, 'session-a')
  assert.equal(proposal.commandId, 'edit-command-a')
  assert.equal(proposal.workflowId, base.id)
  assert.equal(proposal.baseWorkflowRevision, base.revision)
  assert.equal(proposal.baseAssociationRevision, state.association.revision)
  assert.equal(proposal.revision, 1)
  assert.equal(proposal.baseWorkflow.id, proposal.workflow.id)
  assert.notEqual(proposal.proposalId, proposal.workflowId, '提案 ID 与流程 ID 分离')
  assert.deepEqual(fixture.service.storage.getWorkflow(base.id), base, '模型提案阶段不覆盖保存流程')
  assert.equal(state.editDiff.addedNodes[0].title, '检查素材')
  assert.equal(state.editDiff.changedNodes[0].before.id, 'task-2')
  assert.deepEqual(fixture.service.storage.listRuns(), [])

  const repeated = await fixture.commandDefinitions[0].handler(invocation)
  assert.equal(repeated.kind, 'success')
  assert.equal(fixture.createOptions.length, 1, '重复 commandId 复用既有提案，不再次调用模型')
  assert.equal((await fixture.service.sessionState('session-a')).editProposal.proposalId, proposal.proposalId)

  const committed = await fixture.service.sessionEditProposalApply('session-a', { proposalId: proposal.proposalId, expectedRevision: proposal.revision })
  assert.equal(committed.id, base.id)
  assert.equal(committed.revision, base.revision + 1)
  assert.equal(committed.nodes.find((node) => node.id === 'task-2').title, '制作页面')
  assert.ok(committed.nodes.some((node) => node.id === 'task-1'), '未修改任务节点 ID 保留')
  assert.ok(committed.nodes.some((node) => node.id === 'task-3'), '后续未修改任务节点 ID 保留')
  const inserted = committed.nodes.find((node) => node.title === '检查素材')
  assert.ok(committed.edges.some((edge) => edge.type === 'dependency' && edge.source === 'task-1' && edge.target === inserted.id))
  assert.ok(committed.edges.some((edge) => edge.type === 'dependency' && edge.source === inserted.id && edge.target === 'task-2'))
  assert.ok(committed.edges.some((edge) => edge.id === 'edge-2' && edge.source === 'task-2' && edge.target === 'task-3'))
  assert.equal((await fixture.service.sessionState('session-a')).editProposal, undefined)
  assert.equal((await fixture.service.sessionState('session-a')).association.workflowId, base.id)
  assert.equal(fixture.service.storage.listRuns().length, 0, '生成或应用提案都不创建运行记录')
  await assert.rejects(fixture.service.sessionEditProposalApply('session-a', { proposalId: proposal.proposalId, expectedRevision: proposal.revision }), /已处理/u)
})

test('edit 的显式目标节点不存在时不调用模型，也不保存部分提案', async (t) => {
  const fixture = await createService(t)
  const seed = definition(fixture.workspace, { taskCount: 2, manual: true })
  const nodes = seed.nodes.map((node, index) => node.type === 'task'
    ? { ...node, title: index === 0 ? '需求整理' : '结果检查' }
    : node)
  const base = await fixture.service.storage.saveWorkflow({ ...seed, nodes }, 0)
  await fixture.service.sessionAssociate('session-a', { workflowId: base.id, expectedAssociationRevision: 0 })
  const result = await fixture.commandDefinitions[0].handler(commandInvocation(
    'edit 在需求整理之后增加“检查素材”任务，再连接到页面实现；把“页面实现”改名为“制作页面”，其他内容保持不变。',
    'session-a', 'edit-missing-page',
  ))
  assert.equal(result.kind, 'error')
  assert.match(result.text, /找不到唯一目标任务“页面实现”/u)
  assert.match(result.text, /改名要求未完成/u)
  assert.equal(fixture.createOptions.length, 0)
  assert.equal((await fixture.service.sessionState('session-a')).editProposal, undefined)
  assert.equal(fixture.service.storage.getWorkflow(base.id).revision, base.revision)
  assert.deepEqual(fixture.service.storage.listRuns(), [])
})

test('Host 检出首轮部分建议后仅补全一次，并核对节点改名与两条依赖边', async (t) => {
  const partial = JSON.stringify({ operations: [
    { op: 'add_task', ref: 'check-materials', title: '检查素材', instructions: '核对页面素材是否齐备。', acceptanceCriteria: ['素材清单已核对。'], acceptanceMode: 'manual', expectedArtifacts: [], expectedContents: [], dependsOn: ['需求整理'] },
  ] })
  const completion = JSON.stringify({ operations: [
    { op: 'update_task', target: '页面实现', changes: { title: '制作页面' } },
    { op: 'set_dependencies', target: '制作页面', dependsOn: ['检查素材'] },
  ] })
  const fixture = await createService(t, { behaviors: [
    { text: partial, toolName: false },
    { text: completion, toolName: false },
  ] })
  const base = await associateEditWorkflow(fixture)
  const result = await fixture.commandDefinitions[0].handler(commandInvocation(
    'edit 在需求整理之后增加“检查素材”任务，再连接到页面实现；把“页面实现”改名为“制作页面”，其他内容保持不变。',
    'session-a', 'edit-completion',
  ))
  assert.equal(result.kind, 'success')
  assert.equal(fixture.createOptions.length, 2, '最多进行一次 Host 驱动的补全请求')
  assert.match(fixture.followups[1], /Host 根据候选图计算出的未满足要求/u)
  const state = await fixture.service.sessionState('session-a')
  const proposal = state.editProposal
  assert.ok(proposal)
  assert.deepEqual(proposal.workflow.nodes.filter((node) => node.type === 'task').map((node) => node.title), ['需求整理', '制作页面', '结果检查', '检查素材'])
  const page = proposal.workflow.nodes.find((node) => node.type === 'task' && node.id === base.nodes[1].id)
  assert.equal(page.title, '制作页面')
  const inserted = proposal.workflow.nodes.find((node) => node.type === 'task' && node.title === '检查素材')
  assert.ok(proposal.workflow.edges.some((edge) => edge.type === 'dependency' && edge.source === base.nodes[0].id && edge.target === inserted.id))
  assert.ok(proposal.workflow.edges.some((edge) => edge.type === 'dependency' && edge.source === inserted.id && edge.target === base.nodes[1].id))
  assert.deepEqual(fixture.service.storage.getWorkflow(base.id), base, '补全阶段只改变提案快照')
})

test('编辑 File 路径只允许切换到本次明确 @ 引用且经 Host 读取校验的文件', async (t) => {
  let modelReply = ''
  const fixture = await createService(t, { behaviors: [
    { get text() { return modelReply }, toolName: false },
    { get text() { return modelReply }, toolName: false },
  ] })
  const originalPath = join(fixture.workspace, 'brief.md')
  const requestedPath = join(fixture.workspace, 'next-brief.md')
  await writeFile(originalPath, '原始需求资料', 'utf8')
  await writeFile(requestedPath, '本次明确提供的新资料', 'utf8')
  modelReply = JSON.stringify({ operations: [{ op: 'update_context', target: 'file-brief', changes: { path: requestedPath } }] })
  const seed = definition(fixture.workspace, { taskCount: 3, manual: true })
  const file = { type: 'file', id: 'file-brief', title: '需求资料', path: originalPath, position: { x: 20, y: 260 } }
  const base = await fixture.service.storage.saveWorkflow({
    ...seed, nodes: [...seed.nodes, file], edges: [...seed.edges, { type: 'context', id: 'edge-brief-requirements', source: file.id, target: 'task-1' }],
  }, 0)
  await fixture.service.sessionAssociate('session-a', { workflowId: base.id, expectedAssociationRevision: 0 })

  const command = fixture.commandDefinitions[0].handler
  const unreferenced = await command(commandInvocation('edit 将文件资料切换到新文件', 'session-a', 'edit-file-without-reference'))
  assert.equal(unreferenced.kind, 'error')
  assert.match(unreferenced.text, /@绝对路径/u)
  assert.deepEqual(fixture.service.storage.getWorkflow(base.id), base)
  assert.equal((await fixture.service.sessionState('session-a')).editProposal, undefined)

  const cited = await command(commandInvocation(`edit 将文件资料切换到 @"${requestedPath}"`, 'session-a', 'edit-file-cited'))
  assert.equal(cited.kind, 'success')
  const proposal = (await fixture.service.sessionState('session-a')).editProposal
  assert.equal(proposal.workflow.nodes.find((node) => node.id === file.id).path, requestedPath)
  assert.deepEqual(fixture.service.storage.getWorkflow(base.id), base, '候选使用已核验资料，但生成提案不会改原流程')
})

test('无关联、空说明、未保存画布、待处理新草稿及活动运行均在规划前拒绝 edit', async (t) => {
  const fixture = await createService(t)
  const command = fixture.commandDefinitions[0].handler
  assert.match((await command(commandInvocation('edit', 'session-a', 'edit-empty'))).text, /请补充/u)
  assert.match((await command(commandInvocation('edit 更新任务', 'session-a', 'edit-no-link'))).text, /尚未关联/u)
  assert.equal(fixture.createOptions.length, 0)

  const base = await associateEditWorkflow(fixture)
  await fixture.service.sessionEditorStatus('session-a', {
    clientId: 'client-a', sequence: 1, workflowId: base.id, baseRevision: base.revision, isDirty: true,
  })
  assert.match((await command(commandInvocation('edit 更新任务', 'session-a', 'edit-dirty'))).text, /未保存修改/u)
  assert.equal(fixture.createOptions.length, 0)
  await fixture.service.sessionEditorStatus('session-a', {
    clientId: 'client-a', sequence: 2, workflowId: base.id, baseRevision: base.revision, isDirty: false,
  })
  await fixture.service.storage.saveSessionDraft({
    sessionId: 'session-a', draftId: 'pending-new', commandId: 'goal-pending', workflow: { ...base, id: 'pending-new', revision: 0 }, model: 'test/model', createdAt: Date.now(),
  }, 0)
  assert.match((await command(commandInvocation('edit 更新任务', 'session-a', 'edit-pending'))).text, /未处理的新建流程草稿/u)
  assert.equal(fixture.createOptions.length, 0)
  assert.deepEqual(fixture.service.storage.getWorkflow(base.id), base)
})

test('编辑提案冲突和放弃都保留原流程及独立会话数据', async (t) => {
  const fixture = await createService(t, { behaviors: [{ text: editOperations(), toolName: false }, { text: editOperations(), toolName: false }] })
  const base = await associateEditWorkflow(fixture, ['session-a', 'session-b'])
  const command = fixture.commandDefinitions[0].handler
  assert.equal((await command(commandInvocation('edit 增加检查素材', 'session-a', 'edit-conflict-a'))).kind, 'success')
  assert.equal((await command(commandInvocation('edit 增加检查素材', 'session-b', 'edit-discard-b'))).kind, 'success')
  const proposalA = (await fixture.service.sessionState('session-a')).editProposal
  const proposalB = (await fixture.service.sessionState('session-b')).editProposal
  assert.ok(proposalA && proposalB)
  assert.notEqual(proposalA.proposalId, proposalB.proposalId)
  assert.equal(proposalA.sessionId, 'session-a')
  assert.equal(proposalB.sessionId, 'session-b')
  assert.deepEqual(fixture.service.storage.getWorkflow(base.id), base)

  await fixture.service.storage.saveWorkflow({ ...base, title: '另一处已保存更改' }, base.revision)
  await assert.rejects(fixture.service.sessionEditProposalApply('session-a', { proposalId: proposalA.proposalId, expectedRevision: proposalA.revision }), /基础流程修订已变化/u)
  assert.equal(fixture.service.storage.getWorkflow(base.id).title, '另一处已保存更改')
  assert.equal((await fixture.service.sessionState('session-a')).editProposal.proposalId, proposalA.proposalId, '修订冲突保留提案')

  await fixture.service.sessionEditProposalDiscard('session-b', { proposalId: proposalB.proposalId, expectedRevision: proposalB.revision })
  assert.equal((await fixture.service.sessionState('session-b')).editProposal, undefined)
  assert.equal(fixture.service.storage.getWorkflow(base.id).title, '另一处已保存更改', '放弃不回写原流程')
})

test('A/B 编辑 Agent 晚到结果分别回到原始命令会话', async (t) => {
  const gateA = deferred()
  const gateB = deferred()
  const fixture = await createService(t, { behaviors: [
    { wait: gateA, cancel: () => gateA.resolve(), text: editOperations(), toolName: false },
    { wait: gateB, cancel: () => gateB.resolve(), text: editOperations(), toolName: false },
  ] })
  await associateEditWorkflow(fixture, ['session-a', 'session-b'])
  const command = fixture.commandDefinitions[0].handler
  const first = command(commandInvocation('edit A 的改动', 'session-a', 'edit-late-a'))
  const waitA = Date.now() + 3000
  while (fixture.createOptions.length < 1 && Date.now() < waitA) await new Promise((resolve) => setTimeout(resolve, 10))
  const second = command(commandInvocation('edit B 的改动', 'session-b', 'edit-late-b'))
  const waitB = Date.now() + 3000
  while (fixture.createOptions.length < 2 && Date.now() < waitB) await new Promise((resolve) => setTimeout(resolve, 10))
  gateB.resolve()
  assert.equal((await second).kind, 'success')
  assert.equal((await fixture.service.sessionState('session-b')).editProposal.commandId, 'edit-late-b')
  assert.equal((await fixture.service.sessionState('session-a')).editProposal, undefined)
  gateA.resolve()
  assert.equal((await first).kind, 'success')
  assert.equal((await fixture.service.sessionState('session-a')).editProposal.commandId, 'edit-late-a')
  assert.equal((await fixture.service.sessionState('session-b')).editProposal.commandId, 'edit-late-b')
})

test('同一会话重复 edit 在任务进行中明确拒绝，不派发第二个规划任务', async (t) => {
  const gate = deferred()
  const fixture = await createService(t, { behaviors: [{ wait: gate, cancel: () => gate.resolve(), text: editOperations(), toolName: false }] })
  const base = await associateEditWorkflow(fixture)
  const command = fixture.commandDefinitions[0].handler
  const first = command(commandInvocation('edit 第一个要求', 'session-a', 'edit-first-inflight'))
  const deadline = Date.now() + 3000
  while (fixture.createOptions.length < 1 && Date.now() < deadline) await new Promise((resolve) => setTimeout(resolve, 10))
  const second = await command(commandInvocation('edit 第二个要求', 'session-a', 'edit-second-inflight'))
  assert.equal(second.kind, 'error')
  assert.match(second.text, /正在生成/u)
  assert.equal(fixture.createOptions.length, 1)
  gate.resolve()
  assert.equal((await first).kind, 'success')
  assert.equal((await fixture.service.sessionState('session-a')).editProposal.baseWorkflowRevision, base.revision)
})

test('规划 Agent 收到工具调用事件时拒绝编辑提案且原流程不变', async (t) => {
  const fixture = await createService(t, { behaviors: [{ text: editOperations(), toolName: 'write' }] })
  const base = await associateEditWorkflow(fixture)

  const result = await fixture.commandDefinitions[0].handler(commandInvocation('edit 修改任务说明', 'session-a', 'edit-tool-attempt'))

  assert.equal(result.kind, 'error')
  assert.match(result.text, /工具调用/u)
  assert.deepEqual(fixture.service.storage.getWorkflow(base.id), base)
  assert.equal((await fixture.service.sessionState('session-a')).editProposal, undefined)
  assert.equal(fixture.service.storage.listRuns().length, 0)
  assert.deepEqual(fixture.registeredPresets.map(({ plugins }) => plugins), [[]])
  assert.deepEqual(fixture.disposedPresets, [fixture.registeredPresets[0].id])
})

test('取消、非法模型回复和活动运行不产生编辑提案', async (t) => {
  const gate = deferred()
  const fixture = await createService(t, { behaviors: [
    { wait: gate, cancel: () => gate.resolve(), text: editOperations(), toolName: false },
    { text: 'not json', toolName: false },
  ] })
  const base = await associateEditWorkflow(fixture)
  const controller = new AbortController()
  const cancelled = fixture.commandDefinitions[0].handler(commandInvocation('edit 取消变更', 'session-a', 'edit-cancelled', controller.signal))
  const deadline = Date.now() + 3000
  while (fixture.createOptions.length < 1 && Date.now() < deadline) await new Promise((resolve) => setTimeout(resolve, 10))
  controller.abort(new DOMException('cancelled', 'AbortError'))
  assert.equal((await cancelled).kind, 'error')
  assert.equal((await fixture.service.sessionState('session-a')).editProposal, undefined)
  assert.deepEqual(fixture.service.storage.getWorkflow(base.id), base)

  const invalid = await fixture.commandDefinitions[0].handler(commandInvocation('edit invalid response', 'session-a', 'edit-invalid-json'))
  assert.equal(invalid.kind, 'error')
  assert.equal((await fixture.service.sessionState('session-a')).editProposal, undefined)

  await fixture.service.storage.saveRun({
    id: 'active-edit-run', requestId: 'active-edit-run', workflowId: base.id, sessionId: 'session-a', workflow: base,
    state: 'paused', createdAt: 1, startedAt: 1, endedAt: 0, tasks: [], contextSnapshots: [],
    verification: { status: 'pending', summary: '', checkedAt: 0, agentId: '', toolNames: [] }, events: [], error: '',
  })
  const active = await fixture.commandDefinitions[0].handler(commandInvocation('edit during run', 'session-a', 'edit-active-run'))
  assert.equal(active.kind, 'error')
  assert.match(active.text, /运行/u)
  assert.equal(fixture.createOptions.length, 2, '活动运行前检查不再启动规划 Agent')
  assert.equal((await fixture.service.sessionState('session-a')).editProposal, undefined)
})

test('卸载插件会取消正在生成的 edit 提案，不会保存迟到结果', async (t) => {
  const gate = deferred()
  const fixture = await createService(t, { behaviors: [{ wait: gate, cancel: () => gate.resolve(), text: editOperations(), toolName: false }] })
  const base = await associateEditWorkflow(fixture)
  const request = fixture.commandDefinitions[0].handler(commandInvocation('edit 卸载期间变更', 'session-a', 'edit-unload'))
  const deadline = Date.now() + 3000
  while (fixture.createOptions.length < 1 && Date.now() < deadline) await new Promise((resolve) => setTimeout(resolve, 10))
  await fixture.effectDisposers[1]()
  assert.equal((await request).kind, 'error')
  assert.equal((await fixture.service.sessionState('session-a')).editProposal, undefined)
  assert.deepEqual(fixture.service.storage.getWorkflow(base.id), base)
  assert.equal(fixture.registeredPresets.length, 1)
  assert.deepEqual(fixture.disposedPresets, [fixture.registeredPresets[0].id], '规划 Agent 结束后卸载流程会释放临时 preset')
})

test('会话没有有效工作区时在调用模型前提示补填', async (t) => {
  const fixture = await createService(t, {
    sessionWorkspaceDirectory: '',
    behaviors: [{ text: generatedPlan(), toolName: false }],
  })
  const result = await fixture.commandDefinitions[0].handler(commandInvocation('整理项目需求', 'session-no-cwd', 'command-no-cwd'))

  assert.equal(result.kind, 'error')
  assert.match(result.text, /绝对路径/u)
  assert.equal(fixture.createOptions.length, 0, '缺少工作区时不启动模型')
  assert.equal((await fixture.service.sessionState('session-no-cwd')).commandDraft, undefined)
  assert.equal(fixture.service.storage.listRuns().length, 0)
})

test('显式 @绝对路径资料经工作区校验后进入草稿和规划上下文', async (t) => {
  const fixture = await createService(t, { behaviors: [{ text: generatedPlan(), toolName: false }] })
  const referencePath = join(fixture.workspace, 'project brief.md')
  const referenceText = '品牌使用青色；页面包含介绍与联系方式。'
  await writeFile(referencePath, referenceText, 'utf8')
  const result = await fixture.commandDefinitions[0].handler(commandInvocation(
    `制作介绍页 @"${referencePath}"`, 'session-reference', 'command-reference',
  ))

  assert.equal(result.kind, 'success')
  assert.equal(fixture.createOptions.length, 1)
  assert.match(fixture.followups[0], new RegExp(referenceText))
  const draft = (await fixture.service.sessionState('session-reference')).commandDraft
  const fileNode = draft.workflow.nodes.find((node) => node.type === 'file')
  assert.equal(fileNode.path, referencePath)
  assert.equal(fixture.service.storage.listRuns().length, 0)
})

test('A/B 会话可并行规划并分别持久化，完成次序不改变命令归属', async (t) => {
  const gateA = deferred()
  const gateB = deferred()
  const fixture = await createService(t, { behaviors: {
    '目标 A': { wait: gateA, text: generatedPlan('会话 A'), toolName: false },
    '目标 B': { wait: gateB, text: generatedPlan('会话 B'), toolName: false },
  } })
  const command = fixture.commandDefinitions[0]
  const first = command.handler(commandInvocation('目标 A', 'session-a', 'command-a'))
  const second = command.handler(commandInvocation('目标 B', 'session-b', 'command-b'))
  const deadline = Date.now() + 3000
  while (fixture.createOptions.length < 2 && Date.now() < deadline) await new Promise((resolve) => setTimeout(resolve, 10))
  assert.equal(fixture.createOptions.length, 2, '不同会话的规划可同时运行')
  gateB.resolve()
  const resultB = await second
  assert.equal(resultB.kind, 'success')
  assert.equal((await fixture.service.sessionState('session-b')).commandDraft.commandId, 'command-b')
  gateA.resolve()
  const resultA = await first
  assert.equal(resultA.kind, 'success')

  const stateA = await fixture.service.sessionState('session-a')
  const stateB = await fixture.service.sessionState('session-b')
  assert.equal(stateA.commandDraft.commandId, 'command-a')
  assert.equal(stateB.commandDraft.commandId, 'command-b')
  assert.notEqual(stateA.commandDraft.draftId, stateB.commandDraft.draftId)
  assert.equal(stateA.association, undefined)
  assert.equal(stateB.association, undefined)
  assert.equal(fixture.service.storage.listRuns().length, 0)
})

test('同一会话同时提交只允许一个规划任务和一个草稿落盘', async (t) => {
  const gate = deferred()
  const fixture = await createService(t, { behaviors: [{ wait: gate, text: generatedPlan(), toolName: false }] })
  const command = fixture.commandDefinitions[0]
  const first = command.handler(commandInvocation('第一个目标', 'session-a', 'command-first'))
  const deadline = Date.now() + 3000
  while (fixture.createOptions.length < 1 && Date.now() < deadline) await new Promise((resolve) => setTimeout(resolve, 10))
  assert.equal(fixture.createOptions.length, 1)
  const second = await command.handler(commandInvocation('第二个目标', 'session-a', 'command-second'))
  assert.equal(second.kind, 'error')
  assert.match(second.text, /正在生成/u)
  assert.equal(fixture.createOptions.length, 1)
  gate.resolve()
  assert.equal((await first).kind, 'success')
  assert.equal((await fixture.service.sessionState('session-a')).commandDraft.commandId, 'command-first')
})

test('模型失败、无效 JSON 和非法资料路径不修改流程、关联或运行记录', async (t) => {
  const fixture = await createService(t, { behaviors: [
    { toolName: false, text: 'not-json' },
    { execute: async () => { throw new Error('provider unavailable') }, toolName: false },
  ] })
  const originalIds = fixture.service.storage.listWorkflows().map((item) => item.id)
  const first = await fixture.commandDefinitions[0].handler(commandInvocation('无效返回目标', 'session-a', 'command-invalid'))
  assert.equal(first.kind, 'error')
  assert.equal((await fixture.service.sessionState('session-a')).commandDraft, undefined)
  const second = await fixture.commandDefinitions[0].handler(commandInvocation('模型失败目标', 'session-b', 'command-fail'))
  assert.equal(second.kind, 'error')
  assert.equal((await fixture.service.sessionState('session-b')).commandDraft, undefined)
  const invalidPath = await fixture.commandDefinitions[0].handler(commandInvocation('目标 @C:\\outside\\secret.md', 'session-c', 'command-path'))
  assert.equal(invalidPath.kind, 'error')
  assert.match(invalidPath.text, /工作区/u)
  assert.equal(fixture.createOptions.length, 2, '无效资料路径在模型调用前拒绝')
  assert.deepEqual(fixture.service.storage.listWorkflows().map((item) => item.id), originalIds)
  assert.equal(fixture.service.storage.listRuns().length, 0)
  assert.equal((await fixture.service.sessionState('session-c')).association, undefined)
})

test('取消和插件卸载会等待规划 Agent 结束且不保存迟到草稿', async (t) => {
  const gate = deferred()
  const fixture = await createService(t, { behaviors: [{ wait: gate, cancel: () => gate.resolve(), text: generatedPlan(), toolName: false }] })
  const controller = new AbortController()
  const request = fixture.commandDefinitions[0].handler(commandInvocation('取消目标', 'session-a', 'command-cancel', controller.signal))
  const deadline = Date.now() + 3000
  while (fixture.createOptions.length < 1 && Date.now() < deadline) await new Promise((resolve) => setTimeout(resolve, 10))
  controller.abort(new DOMException('cancelled', 'AbortError'))
  assert.equal((await request).kind, 'error')
  assert.equal((await fixture.service.sessionState('session-a')).commandDraft, undefined)
  assert.equal(fixture.service.storage.listRuns().length, 0)

  const disposeGate = deferred()
  fixture.ctx.agents.create = async (options) => {
    fixture.createOptions.push(options)
    const agent = { session: { id: options.sessionId }, followup() {}, cancel: () => disposeGate.resolve(), whenIdle: () => disposeGate.promise, dispose: async () => {} }
    await options.setup?.({ on() { return () => {} } }, agent)
    return { agent, dispose: async () => {} }
  }
  const unloading = fixture.commandDefinitions[0].handler(commandInvocation('卸载期间目标', 'session-b', 'command-unload'))
  const secondDeadline = Date.now() + 3000
  while (fixture.createOptions.length < 2 && Date.now() < secondDeadline) await new Promise((resolve) => setTimeout(resolve, 10))
  await fixture.effectDisposers[1]()
  assert.equal((await unloading).kind, 'error')
  assert.equal((await fixture.service.sessionState('session-b')).commandDraft, undefined)
})

test('Host 按真实会话校验关联，并将运行记录限制到 workflowId 与所属会话', async (t) => {
  const fixture = await createService(t, { manual: true })
  const secondWorkflow = await fixture.service.save({ workflow: definition(fixture.workspace, { manual: true }), expectedRevision: 0 })
  const stateA = await fixture.service.sessionState('session-a')
  const stateB = await fixture.service.sessionState('session-b')
  assert.equal(stateA.workspaceDirectory, fixture.workspace)
  assert.equal(stateA.association, undefined)
  assert.equal(stateB.association, undefined)

  await fixture.service.sessionAssociate('session-a', { workflowId: fixture.workflow.id, expectedAssociationRevision: 0 })
  await fixture.service.sessionAssociate('session-b', { workflowId: secondWorkflow.id, expectedAssociationRevision: 0 })
  await assert.rejects(fixture.service.sessionGet('session-a', secondWorkflow.id), /没有关联/u)

  await fixture.service.sessionAssociate('session-b', { workflowId: fixture.workflow.id, expectedAssociationRevision: 1 })
  const makeRun = (id, sessionId) => ({
    id, requestId: id, workflowId: fixture.workflow.id, sessionId, workflow: fixture.workflow,
    state: 'completed', createdAt: Date.now(), startedAt: Date.now(), endedAt: Date.now(), tasks: [],
    contextSnapshots: [], verification: { status: 'pending', summary: '', checkedAt: 0, agentId: '', toolNames: [] },
    events: [], error: '',
  })
  await fixture.service.storage.saveRun(makeRun('run-a', 'session-a'))
  await fixture.service.storage.saveRun(makeRun('run-b', 'session-b'))

  assert.deepEqual((await fixture.service.sessionRuns('session-a', fixture.workflow.id)).map((run) => run.id), ['run-a'])
  assert.deepEqual((await fixture.service.sessionRuns('session-b', fixture.workflow.id)).map((run) => run.id), ['run-b'])
  assert.equal((await fixture.service.sessionGetRun('session-a', { workflowId: fixture.workflow.id, runId: 'run-a' })).id, 'run-a')
  await assert.rejects(fixture.service.sessionGetRun('session-b', { workflowId: fixture.workflow.id, runId: 'run-a' }), /找不到该会话/u)
  assert.equal(fixture.createOptions.length, 0, '会话和运行记录读取不启动 Agent')
})

test('重复提交同一 requestId 返回同一运行且不会重复派发', async (t) => {
  const gate = deferred()
  const { service, workflow, createOptions } = await createService(t, { manual: true, behaviors: [{ wait: gate, cancel: () => gate.resolve() }] })
  const first = await service.startRun({ workflowId: workflow.id, requestId: 'same-start-request' })
  const repeated = await service.startRun({ workflowId: workflow.id, requestId: 'same-start-request' })
  while (createOptions.length < 1) await new Promise((resolve) => setTimeout(resolve, 10))
  assert.equal(repeated.id, first.id)
  assert.equal(createOptions.length, 1)
  await service.action({ runId: first.id, action: 'cancel', taskId: '' })
})

test('暂停边界继续先持久化新状态再唤醒等待器，并派发后续任务', async (t) => {
  const first = deferred()
  const { service, workflow, createOptions } = await createService(t, {
    taskCount: 2,
    behaviors: [{ wait: first, execute: writeArtifact('task-1.md') }, { execute: writeArtifact('task-2.md') }],
  })
  const run = await service.startRun({ workflowId: workflow.id, requestId: 'pause-resume' })
  const deadline = Date.now() + 3000
  while (createOptions.length < 1 && Date.now() < deadline) await new Promise((resolve) => setTimeout(resolve, 10))
  assert.equal(createOptions.length, 1, '第一项任务 Agent 已启动')

  await service.action({ runId: run.id, action: 'pause', taskId: '' })
  first.resolve()
  await waitForRun(service, run.id, (value) => value.state === 'paused', '安全暂停边界')
  const resumed = await service.action({ runId: run.id, action: 'resume', taskId: '' })
  assert.equal(resumed.state, 'running', '继续操作返回最新的 running 状态')
  const finished = await waitForRun(service, run.id, (value) => value.state === 'needs_review', '第二项任务完成')
  assert.equal(createOptions.length, 2, '继续后第二项任务确实启动')
  assert.deepEqual(finished.tasks.map((task) => task.state), ['succeeded', 'succeeded'])
})

test('继续与停止并发到达时按顺序处理，最终不会把取消记作失败', async (t) => {
  const first = deferred()
  const second = deferred()
  const { service, workflow, createOptions } = await createService(t, {
    taskCount: 2,
    behaviors: [
      { wait: first, execute: writeArtifact('task-1.md') },
      { wait: second, cancel: () => second.resolve() },
    ],
  })
  const run = await service.startRun({ workflowId: workflow.id, requestId: 'resume-cancel-race' })
  while (createOptions.length < 1) await new Promise((resolve) => setTimeout(resolve, 10))
  await service.action({ runId: run.id, action: 'pause', taskId: '' })
  first.resolve()
  await waitForRun(service, run.id, (value) => value.state === 'paused', '并发操作前的安全暂停')

  const [resumed, cancelled] = await Promise.all([
    service.action({ runId: run.id, action: 'resume', taskId: '' }),
    service.action({ runId: run.id, action: 'cancel', taskId: '' }),
  ])
  assert.equal(resumed.state, 'running')
  assert.equal(cancelled.state, 'cancelled')
  assert.ok(['cancelled', 'pending'].includes(cancelled.tasks[1].state))
})

test('停止活动 Agent、暂停等待和人工验收等待都会记录为 cancelled', async (t) => {
  const active = deferred()
  const first = await createService(t, { behaviors: [{ wait: active }] })
  const activeRun = await first.service.startRun({ workflowId: first.workflow.id, requestId: 'cancel-agent' })
  while (first.createOptions.length < 1) await new Promise((resolve) => setTimeout(resolve, 10))
  assert.equal((await first.service.action({ runId: activeRun.id, action: 'cancel', taskId: '' })).state, 'cancelled')

  const boundaryGate = deferred()
  const boundary = await createService(t, {
    taskCount: 2,
    behaviors: [{ wait: boundaryGate, execute: writeArtifact('task-1.md') }],
  })
  const boundaryRun = await boundary.service.startRun({ workflowId: boundary.workflow.id, requestId: 'cancel-boundary' })
  while (boundary.createOptions.length < 1) await new Promise((resolve) => setTimeout(resolve, 10))
  await boundary.service.action({ runId: boundaryRun.id, action: 'pause', taskId: '' })
  boundaryGate.resolve()
  await waitForRun(boundary.service, boundaryRun.id, (value) => value.state === 'paused', '暂停等待')
  assert.equal((await boundary.service.action({ runId: boundaryRun.id, action: 'cancel', taskId: '' })).state, 'cancelled')

  const review = await createService(t, { manual: true, behaviors: [{}] })
  const reviewRun = await review.service.startRun({ workflowId: review.workflow.id, requestId: 'cancel-review' })
  await waitForRun(review.service, reviewRun.id, (value) => value.state === 'paused' && value.tasks[0].state === 'needs_review', '人工验收等待')
  assert.equal((await review.service.action({ runId: reviewRun.id, action: 'cancel', taskId: '' })).state, 'cancelled')
})

test('插件卸载清理返回可等待的 Promise，活动运行结束后才完成卸载', async (t) => {
  const active = deferred()
  const fixture = await createService(t, { behaviors: [{ wait: active }] })
  const run = await fixture.service.startRun({ workflowId: fixture.workflow.id, requestId: 'plugin-dispose-awaits-run' })
  while (fixture.createOptions.length < 1) await new Promise((resolve) => setTimeout(resolve, 10))

  const dispose = fixture.effectDisposers.at(-1)
  assert.equal(typeof dispose, 'function')
  const cleanup = dispose()
  assert.equal(typeof cleanup?.then, 'function', 'Cordis effect disposer must receive the stopActiveRuns promise')
  let settled = false
  cleanup.then(() => { settled = true })
  await Promise.resolve()
  assert.equal(settled, false, 'cleanup must remain pending while the activity has not exited')

  active.resolve()
  await cleanup
  assert.equal(settled, true)
  assert.equal((await fixture.service.getRun(run.id)).state, 'cancelled')
})

test('新工作流 run 查询只返回相同 workflowId 的记录', async (t) => {
  const { service, workflow } = await createService(t, { manual: true, behaviors: [{}] })
  const run = await service.startRun({ workflowId: workflow.id, requestId: 'history-owner' })
  await waitForRun(service, run.id, (value) => value.state === 'paused', '历史测试运行暂停')
  const otherWorkflowId = 'workflow-created-after-import'
  assert.deepEqual(await service.runs(otherWorkflowId), [])
  assert.equal((await service.runs(workflow.id))[0].workflowId, workflow.id)
})

test('中断的人工验收任务可显式恢复，人工通过后继续收尾', async (t) => {
  const { service, workflow } = await createService(t, { manual: true, behaviors: [] })
  const now = Date.now()
  const interrupted = {
    id: 'run-review-recovery', requestId: 'review-recovery', workflowId: workflow.id, workflow,
    state: 'interrupted', createdAt: now, startedAt: now, endedAt: now,
    tasks: [{
      taskId: 'task-1', state: 'needs_review', result: '已生成待检查结果。', attempts: [{
        number: 1, state: 'needs_review', startedAt: now - 100, endedAt: now, agentId: 'old-agent', toolNames: ['write'],
        result: '已生成待检查结果。', error: '', acceptanceMethod: 'manual', artifactChecks: [], reviewDecision: '',
      }],
    }],
    contextSnapshots: [], verification: { status: 'pending', summary: '', checkedAt: 0, agentId: '', toolNames: [] },
    events: [{ seq: 0, at: now, type: 'recovery.interrupted', taskId: '', message: 'host exited while waiting for review' }],
    error: 'DSH Host 已退出。',
  }
  await service.storage.saveRun(interrupted)

  const recovered = await service.action({ runId: interrupted.id, action: 'recover', taskId: '' })
  assert.equal(recovered.state, 'paused')
  const review = await waitForRun(service, interrupted.id, (value) => value.state === 'paused', '恢复到验收边界')
  assert.equal(review.tasks[0].state, 'needs_review')
  const accepted = await service.action({ runId: interrupted.id, action: 'accept', taskId: 'task-1' })
  assert.equal(accepted.tasks[0].state, 'succeeded')
  const finished = await waitForRun(service, interrupted.id, (value) => value.state === 'needs_review', '恢复后检查完成')
  assert.equal(finished.tasks[0].attempts[0].reviewDecision, 'accepted')
})

test('失败任务阻塞后续；重试保留旧尝试并重新执行受影响的后继', async (t) => {
  const { service, workflow, createOptions } = await createService(t, {
    taskCount: 2,
    behaviors: [{}, { execute: writeArtifact('task-1.md') }, { execute: writeArtifact('task-2.md') }],
  })
  const run = await service.startRun({ workflowId: workflow.id, requestId: 'retry-chain' })
  const failed = await waitForRun(service, run.id, (value) => value.state === 'failed', '第一项任务失败')
  assert.equal(createOptions.length, 1, `第一项失败时应当先启动一个 Agent；诊断=${JSON.stringify({
    runState: failed.state,
    runError: failed.error,
    events: failed.events.map(({ type, taskId, message }) => ({ type, taskId, message })),
    tasks: failed.tasks.map(({ taskId, state, attempts }) => ({ taskId, state, attempts })),
  })}`)
  assert.equal(failed.tasks[1].attempts.length, 0)

  await service.action({ runId: run.id, action: 'retry', taskId: 'task-1' })
  const finished = await waitForRun(service, run.id, (value) => value.state === 'needs_review', '重试链路完成')
  assert.equal(createOptions.length, 3)
  assert.deepEqual(finished.tasks.map((task) => task.attempts.length), [2, 1])
  assert.equal(finished.tasks[0].attempts[0].state, 'failed')
  assert.equal(finished.tasks[0].attempts[1].state, 'succeeded')
})

test('运行继续使用启动时快照；中途保存的修订只影响新运行', async (t) => {
  const first = deferred()
  const { service, workflow, createOptions, followups } = await createService(t, {
    taskCount: 2,
    behaviors: [{ wait: first, execute: writeArtifact('task-1.md') }, { execute: writeArtifact('task-2.md') },
      { execute: writeArtifact('task-1.md') }, { execute: writeArtifact('task-2.md') }],
  })
  const initial = await service.get(workflow.id)
  const run = await service.startRun({ workflowId: workflow.id, requestId: 'immutable-snapshot' })
  while (createOptions.length < 1) await new Promise((resolve) => setTimeout(resolve, 10))
  const changed = {
    ...initial,
    nodes: initial.nodes.map((node) => node.id === 'task-2' ? { ...node, instructions: '中途保存的新修订要求' } : node),
  }
  const savedRevision = await service.save({ workflow: changed, expectedRevision: initial.revision })
  first.resolve()
  const finished = await waitForRun(service, run.id, (value) => value.state === 'needs_review', '旧快照运行结束')
  assert.equal(finished.workflow.revision, initial.revision)
  assert.equal(finished.workflow.nodes.find((node) => node.id === 'task-2').instructions, '执行任务 2')
  assert.match(followups[1], /执行任务 2/u)
  assert.doesNotMatch(followups[1], /中途保存/u)

  const next = await service.startRun({ workflowId: workflow.id, requestId: 'latest-snapshot' })
  assert.equal(next.workflow.revision, savedRevision.revision)
  const latestFinished = await waitForRun(service, next.id, (value) => value.state === 'needs_review', '最新修订运行结束')
  assert.equal(latestFinished.workflow.revision, savedRevision.revision)
  assert.match(followups[3], /中途保存的新修订要求/u)
})

test('应用修订会保留旧运行、复用有效独立结果并重跑变更任务及其后继', async (t) => {
  const behaviors = Array.from({ length: 6 }, (_, index) => ({ execute: writeArtifact(`task-${(index % 4) + 1}.md`) }))
  const { service, workflow, createOptions } = await createService(t, { taskCount: 4, behaviors })
  const original = await service.get(workflow.id)
  const prompt = { type: 'prompt', id: 'revision-prompt', title: '页面要求', text: '使用蓝色标题', enabled: true, position: { x: 0, y: 600 } }
  const tasks = original.nodes.map((node) => node.type === 'task'
    ? { ...node, acceptanceMode: 'automatic', expectedArtifacts: [`${node.id}.md`] }
    : node)
  const withContext = {
    ...original,
    nodes: [...tasks, prompt],
    edges: [
      { type: 'dependency', id: 'edge-1-2', source: 'task-1', target: 'task-2' },
      { type: 'dependency', id: 'edge-2-4', source: 'task-2', target: 'task-4' },
      { type: 'context', id: 'edge-prompt-2', source: prompt.id, target: 'task-2' },
    ],
  }
  const savedOriginal = await service.save({ workflow: withContext, expectedRevision: original.revision })
  const first = await service.startRun({ workflowId: workflow.id, requestId: 'revision-reuse-baseline' })
  await waitForRun(service, first.id, (value) => value.state === 'needs_review', '基线任务和验证完成')
  const accepted = await service.action({ runId: first.id, action: 'accept', taskId: '' })
  assert.equal(accepted.state, 'accepted')
  assert.equal(createOptions.length, 4)

  const edited = await service.get(workflow.id)
  const revision = {
    ...edited,
    nodes: edited.nodes.map((node) => node.id === 'task-2'
      ? { ...node, instructions: '按新要求修改第二项任务' }
      : node.type === 'prompt' ? { ...node, text: '使用深色标题' } : node),
  }
  const savedRevision = await service.save({ workflow: revision, expectedRevision: savedOriginal.revision })
  const applied = await service.action({ runId: first.id, action: 'apply', taskId: '' })
  assert.equal(applied.parentRunId, first.id)
  assert.deepEqual(applied.invalidatedTaskIds, ['task-2', 'task-4'])
  const second = await waitForRun(service, applied.id, (value) => value.state === 'needs_review', '新修订运行完成')
  assert.equal(second.workflow.revision, savedRevision.revision)
  assert.deepEqual(second.tasks.map((task) => task.state), ['succeeded', 'succeeded', 'succeeded', 'succeeded'])
  assert.deepEqual(second.tasks.map((task) => task.attempts.length), [0, 1, 0, 1])
  assert.equal(second.tasks[0].reusedFromRunId, first.id)
  assert.equal(second.tasks[2].reusedFromRunId, first.id)
  assert.equal(second.tasks[0].reusedArtifactChecks[0].sha256.length, 64)
  assert.equal(createOptions.length, 6, '新修订只新建两个受影响任务的 Agent')
  assert.equal((await service.getRun(first.id)).state, 'accepted', '已结束的源运行保持原状态')
  assert.equal((await service.getRun(first.id)).workflow.revision, savedOriginal.revision)

  await service.action({ runId: second.id, action: 'accept', taskId: '' })
  await writeFile(join(savedRevision.outputDirectory, 'task-3.md'), '外部修改了旧运行的产物', 'utf8')
  const secondRevision = await service.get(workflow.id)
  const layoutOnly = {
    ...secondRevision,
    nodes: secondRevision.nodes.map((node) => node.id === 'task-1' ? { ...node, position: { x: node.position.x + 40, y: node.position.y } } : node),
  }
  const savedLayout = await service.save({ workflow: layoutOnly, expectedRevision: secondRevision.revision })
  const thirdStarted = await service.action({ runId: second.id, action: 'apply', taskId: '' })
  assert.equal(thirdStarted.workflow.revision, savedLayout.revision)
  assert.deepEqual(thirdStarted.invalidatedTaskIds, ['task-3'], '位置变化不让任务失效，磁盘产物被改动的任务必须重跑')
  const third = await waitForRun(service, thirdStarted.id, (value) => value.state === 'needs_review', '复核外部改动后的产物')
  assert.deepEqual(third.tasks.map((task) => task.attempts.length), [0, 0, 1, 0])
  assert.equal(createOptions.length, 7, '只有被改动的旧产物对应 Agent 会再次运行')
})

test('暂停边界应用新修订会结束旧等待并创建子运行', async (t) => {
  const gate = deferred()
  const { service, workflow, createOptions } = await createService(t, {
    taskCount: 2,
    behaviors: [
      { wait: gate, execute: writeArtifact('task-1.md') },
      { execute: writeArtifact('task-2.md') },
    ],
  })
  const source = await service.startRun({ workflowId: workflow.id, requestId: 'paused-apply-source' })
  while (createOptions.length < 1) await new Promise((resolve) => setTimeout(resolve, 10))
  await service.action({ runId: source.id, action: 'pause', taskId: '' })
  gate.resolve()
  await waitForRun(service, source.id, (value) => value.state === 'paused', '旧运行停在任务边界')

  const saved = await service.get(workflow.id)
  const changed = { ...saved, nodes: saved.nodes.map((node) => node.id === 'task-2' ? { ...node, instructions: '新修订的第二项任务' } : node) }
  const committed = await service.save({ workflow: changed, expectedRevision: saved.revision })
  const child = await service.action({ runId: source.id, action: 'apply', taskId: '' })
  assert.equal(child.parentRunId, source.id)
  assert.equal(child.workflow.revision, committed.revision)
  const finished = await waitForRun(service, child.id, (value) => value.state === 'needs_review', '应用后的子运行完成')
  const superseded = await service.getRun(source.id)
  assert.equal(superseded.state, 'cancelled')
  assert.equal(superseded.supersededByRunId, child.id)
  assert.ok(superseded.events.some((event) => event.type === 'run.superseded'))
  assert.deepEqual(finished.tasks.map((task) => task.attempts.length), [0, 1])
  assert.equal(finished.tasks[0].reusedFromRunId, source.id)
  assert.equal(createOptions.length, 2, '只为新修订中尚未完成的第二项任务创建 Agent')
})

test('AI 草稿为任务与参考资料重新排布位置，不沿用会造成重叠的旧坐标', async (t) => {
  const response = JSON.stringify({ tasks: [{
    title: '第一步', instructions: '读取资料并完成分析', acceptanceCriteria: ['核对分析内容'],
    acceptanceMode: 'automatic', expectedArtifacts: ['analysis.md'], expectedContents: [], dependsOn: [],
  }, {
    title: '第二步', instructions: '读取分析并生成摘要', acceptanceCriteria: ['核对摘要内容'],
    acceptanceMode: 'automatic', expectedArtifacts: ['summary.md'], expectedContents: [], dependsOn: ['第一步'],
  }] })
  const { service, workflow, workspace, createOptions, mountedPresets, resolvedPresets } = await createService(t, { behaviors: [{ text: response, toolName: false }] })
  const referencePath = join(workspace, 'reference.md')
  await writeFile(referencePath, 'alpha5 reference input', 'utf8')
  const result = await service.generateDraft({
    title: workflow.title, objective: workflow.objective, workspaceDirectory: workspace, outputDirectory: workflow.outputDirectory,
    contextNodes: [{ type: 'file', id: 'source-file', title: '输入参考', path: referencePath, position: { x: 80, y: 90 } }],
  }, new AbortController().signal)
  const task = result.workflow.nodes.find((node) => node.type === 'task')
  const file = result.workflow.nodes.find((node) => node.type === 'file')
  assert.ok(task && file)
  const overlaps = task.position.x < file.position.x + 236 && task.position.x + 236 > file.position.x
    && task.position.y < file.position.y + 124 && task.position.y + 124 > file.position.y
  assert.equal(overlaps, false)
  assert.ok(file.position.y > Math.max(...result.workflow.nodes.filter((node) => node.type === 'task').map((node) => node.position.y)))
  assert.ok(result.workflow.edges.some((edge) => edge.type === 'context' && edge.source === 'source-file' && edge.target === task.id))
  const planningPresetId = createOptions[0].meta.agentPreset
  assert.match(planningPresetId, /^dsh-workflow-planning-/u)
  assert.deepEqual(mountedPresets, [planningPresetId], '规划草稿加入空的 preset scope，不加载执行工具')
  assert.deepEqual(resolvedPresets, [], '规划草稿不读取默认执行 preset')
})
