import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { runInNewContext } from 'node:vm'
import test from 'node:test'
import { Context, Service } from '@deepseek-ai/cordis'

const require = createRequire(import.meta.url)
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
const bundle = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
const clientSource = readFileSync(new URL('../src/client/index.tsx', import.meta.url), 'utf8')

test('folder selection uses the version-locked public DSH native picker and keeps cancellation non-mutating', () => {
  assert.equal(packageJson.peerDependencies['@deepseek-ai/dsh-api-workspace-controller'], packageJson.engines.dsh)
  assert.match(clientSource, /import type \{\} from '@deepseek-ai\/dsh-api-workspace-controller\/remote'/u)
  assert.match(clientSource, /remoteCtx\.inject\(\['remote\.directoryPicker'\], \(directoryPickerCtx\) =>\s*\{\s*registerWorkflowUI\(directoryPickerCtx/u)
  assert.match(clientSource, /remoteCtx\.get\('remote\.directoryPicker'\)/u)
  assert.match(clientSource, /ctx\.remote\.directoryPicker\.pick\(controller\.signal\)/u)
  assert.match(clientSource, /if \(selected === null\)[\s\S]*?选择已取消[\s\S]*?return/u)
  assert.match(clientSource, /选择文件夹[\s\S]*?浏览目录/u)
  assert.ok(packageJson.dsh.client.inject.includes('@deepseek-ai/dsh-api-workspace-controller'))
  assert.ok(packageJson.dsh.client.external.includes('@deepseek-ai/dsh-api-workspace-controller/client'))
})

test('directory picker obeys Cordis namespace injection instead of a prefilled context mock', async () => {
  const root = new Context()
  const selectedPath = 'D:\\资料 文件夹'
  const provider = root.plugin((ctx) => {
    new (class extends Service { constructor(serviceCtx) { super(serviceCtx, 'remote') } })(ctx)
    new (class extends Service {
      constructor(serviceCtx) {
        super(serviceCtx, 'remote.directoryPicker')
        this.pick = async () => selectedPath
      }
    })(ctx)
  })
  await provider

  let selectedResult
  const consumer = root.inject(['remote'], async (ctx) => {
    assert.throws(() => ctx.remote.directoryPicker.pick(), /cannot get property "remote\.directoryPicker" without inject/u)
    await ctx.inject(['remote.directoryPicker'], (directoryPickerCtx) => {
      selectedResult = directoryPickerCtx.remote.directoryPicker.pick()
    })
  })
  await consumer
  assert.equal(await selectedResult, selectedPath)
  await consumer.dispose()
  await provider.dispose()
})

test('session initialization stays independent from Run polling and uses latest editor state', () => {
  const openDraft = clientSource.match(/const openCommandDraft = useCallback\([\s\S]*?\n  \}, \[([^\]]*)\]\)/u)
  const openProposal = clientSource.match(/const openEditProposal = useCallback\([\s\S]*?\n  \}, \[([^\]]*)\]\)/u)
  assert.ok(openDraft)
  assert.ok(openProposal)
  assert.doesNotMatch(openDraft[1], /\b(?:run|workflow|savedSnapshot|error|notice|activeEditProposalId)\b/u)
  assert.doesNotMatch(openProposal[1], /\b(?:run|workflow|savedSnapshot|error|notice|activeEditProposalId|hasUnsavedCanvasChanges)\b/u)
  assert.match(clientSource, /const current = editorStateRef\.current/u)
  assert.match(clientSource, /activeEditProposalIdRef\.current = activeEditProposalId/u)
  assert.match(clientSource, /useEffect\(\(\) => \{\s*if \(!sessionId \|\| remoteFailure \|\| !remoteApi\) return;?[\s\S]*?subscribeSessionDraft/u)
})

test('run, generation, import and proposal actions preserve unsaved state', () => {
  const startRun = clientSource.match(/const startRun = useCallback\([\s\S]*?\n  \}, \[[^\]]*\]\)/u)?.[0]
  const runAction = clientSource.match(/const runAction = useCallback\([\s\S]*?\n  \}, \[[^\]]*\]\)/u)?.[0]
  const generatePlan = clientSource.match(/const generatePlan = useCallback\([\s\S]*?\n  \}, \[[^\]]*\]\)/u)?.[0]
  const importMarkdown = clientSource.match(/const importMarkdown = useCallback\([\s\S]*?\n  \}, \[[^\]]*\]\)/u)?.[0]
  const discardProposal = clientSource.match(/const discardEditProposal = useCallback\([\s\S]*?\n  \}, \[[^\]]*\]\)/u)?.[0]

  assert.match(startRun ?? '', /getWorkflowProtectionMessage\('start-run'/u)
  assert.match(runAction ?? '', /action === 'apply'[\s\S]*?getWorkflowProtectionMessage\('apply-run'/u)
  assert.match(generatePlan ?? '', /getWorkflowProtectionMessage\('generate'/u)
  assert.match(generatePlan ?? '', /objective: workflow\.objective/u)
  assert.match(generatePlan ?? '', /setSavedSnapshot\(result\.workflow\)/u)
  assert.match(importMarkdown ?? '', /getWorkflowProtectionMessage\('import-markdown'/u)
  assert.match(discardProposal ?? '', /unwrap\(await remote\.sessionEditProposalDiscard/u)
  assert.ok((startRun ?? '').indexOf("getWorkflowProtectionMessage('start-run'") < (startRun ?? '').indexOf('remote.sessionStartRun'))
  assert.ok((generatePlan ?? '').indexOf("getWorkflowProtectionMessage('generate'") < (generatePlan ?? '').indexOf('remote.sessionGenerateDraft'))
  assert.ok((importMarkdown ?? '').indexOf("getWorkflowProtectionMessage('import-markdown'") < (importMarkdown ?? '').indexOf('remote.importMarkdown'))

  const discardedAfterRemote = discardProposal?.indexOf('setEditProposal(undefined)') ?? -1
  const checkedRemote = discardProposal?.indexOf('unwrap(await remote.sessionEditProposalDiscard') ?? -1
  assert.ok(checkedRemote >= 0 && discardedAfterRemote > checkedRemote, 'proposal is cleared only after the Remote result succeeds')
  const discardFailure = discardProposal?.match(/\} catch \(cause\) \{([\s\S]*?)\} finally/u)?.[1] ?? ''
  assert.doesNotMatch(discardFailure, /setEditProposal\(undefined\)|setWorkflow\(/u)

  const generationFailure = generatePlan?.match(/\} catch \(cause\) \{([\s\S]*?)\} finally/u)?.[1] ?? ''
  const importFailure = importMarkdown?.match(/\} catch \(cause\) \{([\s\S]*?)\} finally/u)?.[1] ?? ''
  assert.doesNotMatch(generationFailure, /setWorkflow\(|setRun\(|setSavedSnapshot\(/u)
  assert.doesNotMatch(importFailure, /setWorkflow\(|setRun\(|setSavedSnapshot\(/u)
  assert.match(clientSource, /objective: '',/u)
  assert.match(clientSource, /placeholder="请描述项目目标、约束和验收条件。"/u)
  assert.match(clientSource, /AI 生成流程草稿/u)
  assert.match(clientSource, /本次快照：修订 \{run\.workflow\.revision\} · Run \{run\.id\}/u)
})

test('client bundle registers the package factory and resolves only declared externals', () => {
  let registration
  runInNewContext(bundle, {
    window: {
      __ModuleLoader__: {
        load(value) { registration = value },
      },
    },
  }, { filename: 'client.js' })

  assert.equal(registration?.id, packageJson.name)
  assert.equal(typeof registration?.factory, 'function')

  const dshModules = new Set([
    '@deepseek-ai/dsh-api-gateway/client',
    '@deepseek-ai/dsh-api-workspace-controller/client',
    '@deepseek-ai/dsh-client-ui-layout/client',
    '@deepseek-ai/dsh-client-ui-sidebar/client',
    '@deepseek-ai/dsh-client-ui-theme/client',
    '@deepseek-ai/dsh-client-ui-renderer/client',
    '@deepseek-ai/dsh-client-ui-commands/client',
    '@deepseek-ai/dsh-client-ui-conversation/client',
  ])
  const plugin = registration.factory((specifier) => {
    if (dshModules.has(specifier)) return {}
    return require(specifier)
  })

  assert.equal(plugin.name, `${packageJson.name}-client`)
  assert.deepEqual(Array.from(plugin.inject), ['remote', 'layout', 'slots', 'theme', 'commandUi'])
  assert.equal(typeof plugin.apply, 'function')
})

test('native menu decoration opens the session editor, registers the conversation tab, and cleans up', async () => {
  let registration
  runInNewContext(bundle, {
    window: { __ModuleLoader__: { load(value) { registration = value } } },
    document: { createElement: () => ({ dataset: {}, textContent: '', remove() { this.removed = true } }), head: { append() {} } },
  }, { filename: 'client.js' })
  const dshModules = new Set(packageJson.dsh.client.external.filter((specifier) => specifier.startsWith('@deepseek-ai/')))
  const plugin = registration.factory((specifier) => dshModules.has(specifier) ? {} : require(specifier))
  const commands = []
  const selectedPanels = []
  const entries = []
  const slotDisposers = []
  const effectDisposers = []
  const remoteCalls = []
  const eventListeners = new Map()
  const remote = new Proxy({}, { get: (_target, key) => key === '$mount' ? async () => {} : (...args) => { remoteCalls.push([key, args]); return Promise.resolve({ data: null, error: null }) } })
  const ctx = {
    remote: { $mount: async () => {} },
    async inject(_services, callback) { return callback({ get: () => undefined, remote: { dshWorkflow: remote } }) },
    layout: { selectPanel: (id) => selectedPanels.push(id) },
    theme: { getTheme: () => ({ preference: 'system', active: { colorScheme: 'light' } }) },
    commandUi: { decorate: (item) => { commands.push(item); return () => commands.splice(commands.indexOf(item), 1) } },
    on: (name, listener) => {
      const listeners = eventListeners.get(name) ?? new Set()
      listeners.add(listener)
      eventListeners.set(name, listeners)
      return () => listeners.delete(listener)
    },
    effect: (effect) => { const dispose = effect(); effectDisposers.push(dispose); return () => dispose?.() },
    slots: {
      inject: (_slot, contribution) => { const dispose = contribution(); slotDisposers.push(dispose); return () => dispose?.() },
      register: (spec, component) => {
        const entry = { spec, component, active: true }
        entries.push(entry)
        return () => { entry.active = false }
      },
    },
  }

  await plugin.apply(ctx)
  const conversationView = entries.find((entry) => entry.spec.name === 'conversation.view')
  assert.equal(conversationView?.spec.id, 'dsh-workflow')
  assert.equal(conversationView?.spec.label(), '工作流')
  const view = conversationView.component({ sessionId: 'session-a' })
  assert.equal(view.key, 'session-a')
  assert.equal(view.props.sessionId, 'session-a')
  assert.equal(commands.length, 1)
  assert.equal(commands[0].name, 'powernode')
  assert.ok(entries.some((entry) => entry.active && entry.spec.name === 'conversation.header.leading'), 'new-session root header exposes command progress even before a Session header exists')

  commands[0].ui.run({ sessionId: 'session-a' })
  assert.deepEqual(selectedPanels, ['dsh-workflow-session'])
  assert.deepEqual(remoteCalls, [], 'open only navigates; it makes no model, create, or run RPC')

  const emit = (sessionId, type, data) => {
    for (const listener of eventListeners.get('session/event') ?? []) listener({ id: sessionId }, { type, data })
  }
  emit('session-a', 'command/run', { commandId: 'command-a', name: 'powernode', args: ' 目标' })
  emit('session-a', 'command/done', { commandId: 'command-a', kind: 'success', text: '草稿已生成' })
  await new Promise((resolve) => setTimeout(resolve, 0))
  assert.deepEqual(selectedPanels, ['dsh-workflow-session'], '带参数命令完成时不强制切换面板或会话')
  assert.deepEqual(remoteCalls, [], '命令回复本身不被解析；激活的会话界面会再经结构化 RPC 读取草稿')

  for (const dispose of effectDisposers) dispose?.()
  for (const dispose of slotDisposers) dispose?.()
  assert.equal(commands.length, 0)
  assert.equal(entries.filter((entry) => entry.active).length, 0)
  assert.equal(eventListeners.get('session/event')?.size ?? 0, 0, '卸载清理命令事件监听')
})
