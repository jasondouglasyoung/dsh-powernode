import type { TaskNode, WorkflowDefinition, WorkflowEdge, WorkflowEditDiff, WorkflowNode } from '../shared/types.js'
import { validateWorkflow, WorkflowValidationError } from './graph.js'

export type WorkflowEditOperation =
  | { readonly op: 'add_task'; readonly ref: string; readonly title: string; readonly instructions: string; readonly acceptanceCriteria: readonly string[]; readonly acceptanceMode: 'automatic' | 'manual'; readonly expectedArtifacts: readonly string[]; readonly expectedContents: readonly { readonly path: string; readonly text: string }[]; readonly dependsOn: readonly string[] }
  | { readonly op: 'delete_task'; readonly target: string }
  | { readonly op: 'update_task'; readonly target: string; readonly changes: Partial<Pick<TaskNode, 'title' | 'instructions' | 'acceptanceCriteria' | 'acceptanceMode' | 'expectedArtifacts' | 'expectedContents'>> }
  | { readonly op: 'set_dependencies'; readonly target: string; readonly dependsOn: readonly string[] }
  | { readonly op: 'update_context'; readonly target: string; readonly changes: { readonly title?: string; readonly path?: string; readonly text?: string; readonly enabled?: boolean } }
  | { readonly op: 'remove_context'; readonly target: string }
  | { readonly op: 'set_context_links'; readonly target: string; readonly tasks: readonly string[] }

interface EditIntent {
  readonly addAfter?: { readonly predecessor: string; readonly title: string }
  readonly connectTo?: string
  readonly rename?: { readonly from: string; readonly to: string }
}

/** Reject explicitly named task targets that do not resolve uniquely. */
export function validateEditInstructionTargets(instruction: string, base: WorkflowDefinition): readonly string[] {
  const intent = extractEditIntent(instruction)
  const names = new Set([
    ...(intent.addAfter ? [intent.addAfter.predecessor] : []),
    ...(intent.connectTo ? [intent.connectTo] : []),
    ...(intent.rename ? [intent.rename.from] : []),
  ])
  const issues: string[] = []
  for (const name of names) {
    const matches = base.nodes.filter((node) => node.type === 'task' && node.title === name)
    if (matches.length !== 1) issues.push(matches.length ? `任务“${name}”不唯一` : `找不到唯一目标任务“${name}”`)
  }
  return issues
}

/** Return explicit requested changes that the proposed graph does not satisfy. */
export function missingEditInstructionChanges(
  instruction: string,
  base: WorkflowDefinition,
  candidate: WorkflowDefinition,
): readonly string[] {
  const intent = extractEditIntent(instruction)
  const missing: string[] = []
  const tasks = candidate.nodes.filter((node): node is TaskNode => node.type === 'task')

  if (intent.addAfter) {
    const added = tasks.filter((node) => node.title === intent.addAfter!.title)
    const predecessor = base.nodes.find((node) => node.type === 'task' && node.title === intent.addAfter!.predecessor)
    if (added.length !== 1 || !predecessor || !hasDependency(candidate, predecessor.id, added[0]?.id ?? '')) {
      missing.push(`在“${intent.addAfter.predecessor}”之后增加并连接任务“${intent.addAfter.title}”`)
    }
  }

  if (intent.connectTo) {
    const insertedTitle = intent.addAfter?.title
    const source = insertedTitle ? tasks.find((node) => node.title === insertedTitle) : undefined
    const baseTarget = base.nodes.find((node) => node.type === 'task' && node.title === intent.connectTo)
    const candidateTarget = baseTarget
      ? tasks.find((node) => node.id === baseTarget.id)
      : tasks.find((node) => node.title === intent.connectTo)
    if (!source || !candidateTarget || !hasDependency(candidate, source.id, candidateTarget.id)) {
      missing.push(`将任务“${insertedTitle ?? '新任务'}”连接到“${intent.connectTo}”`)
    }
  }

  if (intent.rename) {
    const original = base.nodes.filter((node) => node.type === 'task' && node.title === intent.rename!.from)
    const renamed = original.length === 1 && tasks.find((node) => node.id === original[0]!.id)
    if (!renamed || renamed.title !== intent.rename.to) {
      missing.push(`将任务“${intent.rename.from}”改名为“${intent.rename.to}”`)
    }
  }
  return missing
}

function extractEditIntent(instruction: string): EditIntent {
  const renameMatch = /(?:把|将)\s*[“「『"]([^”」』"]+)[”」』"]\s*(?:改名为|重命名为|改成|改为)\s*[“「『"]([^”」』"]+)[”」』"]/u.exec(instruction)
  const addMatch = /在\s*([^\s“”「」『』"'；;，,。]+)\s*之后\s*(?:增加|新增|添加|插入)\s*[“「『"]([^”」』"]+)[”」』"]\s*任务/u.exec(instruction)
  const connectMatch = /(?:再\s*)?(?:连接到|连接至|连到)\s*(?:[“「『"]([^”」』"]+)[”」』"]|([^\s；;，,。]+))/u.exec(instruction)
  return {
    ...(addMatch ? { addAfter: { predecessor: addMatch[1]!.trim(), title: addMatch[2]!.trim() } } : {}),
    ...(connectMatch ? { connectTo: (connectMatch[1] ?? connectMatch[2])!.trim() } : {}),
    ...(renameMatch ? { rename: { from: renameMatch[1]!.trim(), to: renameMatch[2]!.trim() } } : {}),
  }
}

function hasDependency(workflow: WorkflowDefinition, source: string, target: string): boolean {
  return workflow.edges.some((edge) => edge.type === 'dependency' && edge.source === source && edge.target === target)
}

export function parseWorkflowEditOperations(text: string): readonly WorkflowEditOperation[] {
  let value: unknown
  try { value = JSON.parse(text) } catch { throw new WorkflowValidationError('edit.json', '规划 Agent 返回的编辑建议不是有效 JSON。') }
  if (!value || typeof value !== 'object' || Array.isArray(value) || !Array.isArray((value as { operations?: unknown }).operations)) {
    throw new WorkflowValidationError('edit.shape', '编辑建议必须包含 operations 数组。')
  }
  const raw = (value as { operations: unknown[] }).operations
  if (raw.length > 40) throw new WorkflowValidationError('edit.limit', '一次编辑最多包含 40 项结构化修改。')
  return raw.map((entry, index) => parseOperation(entry, index))
}

export function applyWorkflowEditOperations(base: WorkflowDefinition, operations: readonly WorkflowEditOperation[]): WorkflowDefinition {
  validateWorkflow(base)
  let nodes = base.nodes.map((node) => ({ ...node })) as WorkflowNode[]
  let edges = base.edges.map((edge) => ({ ...edge })) as WorkflowEdge[]
  const refs = new Map<string, string>()
  const aliases = new Map<string, string>()
  for (const node of base.nodes) {
    aliases.set(node.id, node.id)
    if (!base.nodes.some((other) => other.id !== node.id && other.title === node.title)) aliases.set(node.title, node.id)
  }

  for (const operation of operations) {
    if (operation.op === 'add_task') {
      if (refs.has(operation.ref) || aliases.has(operation.ref)) throw new WorkflowValidationError('edit.ref', `编辑建议重复使用任务代号“${operation.ref}”。`)
      const id = `task-${newId()}`
      const order = Math.max(-1, ...nodes.filter((node) => node.type === 'task').map((node) => node.order)) + 1
      const node: TaskNode = {
        type: 'task', id, title: operation.title, instructions: operation.instructions,
        acceptanceCriteria: [...operation.acceptanceCriteria], expectedArtifacts: [...operation.expectedArtifacts],
        expectedContents: operation.expectedContents.map((item) => ({ ...item })), acceptanceMode: operation.acceptanceMode,
        order, position: findIncrementalPosition(nodes),
      }
      nodes.push(node)
      refs.set(operation.ref, id)
      aliases.set(operation.ref, id)
      // Dependencies are resolved in a second pass after all proposed task IDs exist.
      continue
    }
    if (operation.op === 'delete_task') {
      const id = resolveNodeId(nodes, operation.target, aliases, 'task')
      nodes = nodes.filter((node) => node.id !== id)
      edges = edges.filter((edge) => edge.source !== id && edge.target !== id)
      continue
    }
    if (operation.op === 'update_task') {
      const id = resolveNodeId(nodes, operation.target, aliases, 'task')
      nodes = nodes.map((node) => node.id === id && node.type === 'task' ? { ...node, ...operation.changes } : node)
      continue
    }
    if (operation.op === 'set_dependencies') {
      const targetId = resolveNodeId(nodes, operation.target, aliases, 'task')
      const sources = unique(operation.dependsOn.map((target) => resolveNodeId(nodes, target, aliases, 'task')))
      edges = replaceEdges(edges, 'dependency', targetId, sources)
      continue
    }
    if (operation.op === 'remove_context') {
      const id = resolveNodeId(nodes, operation.target, aliases, 'context')
      nodes = nodes.filter((node) => node.id !== id)
      edges = edges.filter((edge) => edge.source !== id && edge.target !== id)
      continue
    }
    if (operation.op === 'update_context') {
      const id = resolveNodeId(nodes, operation.target, aliases, 'context')
      const current = nodes.find((node) => node.id === id)!
      if (operation.changes.path !== undefined && current.type !== 'file') throw new WorkflowValidationError('edit.context-type', '只有文件资料节点可以修改路径。')
      if ((operation.changes.text !== undefined || operation.changes.enabled !== undefined) && current.type !== 'prompt') throw new WorkflowValidationError('edit.context-type', '只有提示词节点可以修改文本或启用状态。')
      nodes = nodes.map((node) => node.id !== id ? node : { ...node, ...operation.changes })
      continue
    }
    const sourceId = resolveNodeId(nodes, operation.target, aliases, 'context')
    const targets = unique(operation.tasks.map((target) => resolveNodeId(nodes, target, aliases, 'task')))
    edges = edges.filter((edge) => !(edge.type === 'context' && edge.source === sourceId))
    const existing = new Map(base.edges.filter((edge) => edge.type === 'context' && edge.source === sourceId).map((edge) => [edge.target, edge]))
    edges.push(...targets.map((target) => existing.get(target) ?? { type: 'context' as const, id: `edge-${newId()}`, source: sourceId, target }))
  }

  // Resolve dependencies for new tasks after every ref has been allocated.
  for (const operation of operations) if (operation.op === 'add_task') {
    const targetId = aliases.get(operation.ref)!
    const sources = unique(operation.dependsOn.map((target) => resolveNodeId(nodes, target, aliases, 'task')))
    edges = replaceEdges(edges, 'dependency', targetId, sources)
  }

  const candidate: WorkflowDefinition = { ...base, nodes, edges }
  validateWorkflow(candidate)
  assertEditCandidateAllowed(base, candidate)
  return candidate
}

export function assertEditCandidateAllowed(base: WorkflowDefinition, candidate: WorkflowDefinition): void {
  if (candidate.id !== base.id || candidate.revision !== base.revision || candidate.title !== base.title
    || candidate.objective !== base.objective || candidate.workspaceDirectory !== base.workspaceDirectory
    || candidate.outputDirectory !== base.outputDirectory || candidate.createdAt !== base.createdAt || candidate.updatedAt !== base.updatedAt) {
    throw new WorkflowValidationError('edit.settings', '编辑提案不能改变流程身份、标题、目标或目录设置。')
  }
  const oldNodes = new Map(base.nodes.map((node) => [node.id, node]))
  for (const node of candidate.nodes) {
    const old = oldNodes.get(node.id)
    if (!old) {
      if (node.type !== 'task') throw new WorkflowValidationError('edit.context-add', '编辑提案不能虚构新的文件或提示词资料。')
      continue
    }
    if (old.type !== node.type) throw new WorkflowValidationError('edit.node-type', '编辑提案不能改变现有节点类型。')
    if (old.type === 'file' && node.type === 'file') {
      const permitted = { ...old, title: node.title, path: node.path, position: node.position }
      if (JSON.stringify(permitted) !== JSON.stringify(node)) throw new WorkflowValidationError('edit.context-change', '文件资料只能修改标题、工作区内路径或画布位置。')
    }
    if (old.type === 'prompt' && node.type === 'prompt') {
      const permitted = { ...old, title: node.title, text: node.text, enabled: node.enabled, position: node.position }
      if (JSON.stringify(permitted) !== JSON.stringify(node)) throw new WorkflowValidationError('edit.context-change', '提示词资料只能修改标题、文本、启用状态或画布位置。')
    }
  }
}

export function computeWorkflowEditDiff(base: WorkflowDefinition, candidate: WorkflowDefinition): WorkflowEditDiff {
  const beforeNodes = new Map(base.nodes.map((node) => [node.id, node]))
  const afterNodes = new Map(candidate.nodes.map((node) => [node.id, node]))
  const addedNodes = candidate.nodes.filter((node) => !beforeNodes.has(node.id))
  const removedNodes = base.nodes.filter((node) => !afterNodes.has(node.id))
  const changedNodes = candidate.nodes.flatMap((node) => {
    const previous = beforeNodes.get(node.id)
    return previous && JSON.stringify(previous) !== JSON.stringify(node) ? [{ before: previous, after: node }] : []
  })
  const beforeEdges = new Map(base.edges.map((edge) => [edge.id, edge]))
  const afterEdges = new Map(candidate.edges.map((edge) => [edge.id, edge]))
  return {
    addedNodes,
    removedNodes,
    changedNodes,
    addedEdges: candidate.edges.filter((edge) => !beforeEdges.has(edge.id)),
    removedEdges: base.edges.filter((edge) => !afterEdges.has(edge.id)),
  }
}

function parseOperation(value: unknown, index: number): WorkflowEditOperation {
  const item = asRecord(value, `第 ${index + 1} 项修改`)
  // Models commonly emit the same structured operation using JSON-Schema-style
  // `type` and `ref` keys. Accept those aliases while keeping the validated
  // internal representation canonical (`op` and `target`).
  const op = requiredString(item.op ?? item.type, `第 ${index + 1} 项修改缺少 op`)
  const target = (message: string) => requiredString(item.target ?? item.ref, message)
  if (op === 'add_task') {
    return {
      op, ref: requiredString(item.ref, '新增任务缺少 ref'), title: requiredString(item.title, '新增任务缺少标题'),
      instructions: requiredString(item.instructions, '新增任务缺少说明'),
      acceptanceCriteria: stringArray(item.acceptanceCriteria, '新增任务缺少验收条件'),
      acceptanceMode: item.acceptanceMode === 'automatic' ? 'automatic' : item.acceptanceMode === 'manual' ? 'manual' : invalid('新增任务验收方式无效'),
      expectedArtifacts: stringArray(item.expectedArtifacts ?? [], '新增任务预期产物格式无效'),
      expectedContents: expectedContents(item.expectedContents ?? []),
      dependsOn: stringArray(item.dependsOn ?? [], '新增任务依赖格式无效'),
    }
  }
  if (op === 'delete_task') return { op, target: target('删除任务缺少 target') }
  if (op === 'update_task') {
    const changes = asRecord(item.changes, '任务字段修改无效')
    const allowed = new Set(['title', 'instructions', 'acceptanceCriteria', 'acceptanceMode', 'expectedArtifacts', 'expectedContents'])
    if (Object.keys(changes).some((key) => !allowed.has(key))) return invalid('编辑建议试图修改不支持的任务字段。')
    const parsed: Record<string, unknown> = {}
    if ('title' in changes) parsed.title = requiredString(changes.title, '任务标题不能为空')
    if ('instructions' in changes) parsed.instructions = requiredString(changes.instructions, '任务说明不能为空')
    if ('acceptanceCriteria' in changes) parsed.acceptanceCriteria = stringArray(changes.acceptanceCriteria, '验收条件格式无效')
    if ('acceptanceMode' in changes) parsed.acceptanceMode = changes.acceptanceMode === 'automatic' || changes.acceptanceMode === 'manual' ? changes.acceptanceMode : invalid('任务验收方式无效')
    if ('expectedArtifacts' in changes) parsed.expectedArtifacts = stringArray(changes.expectedArtifacts, '预期产物格式无效')
    if ('expectedContents' in changes) parsed.expectedContents = expectedContents(changes.expectedContents)
    return { op, target: target('修改任务缺少 target'), changes: parsed as Extract<WorkflowEditOperation, { op: 'update_task' }>['changes'] }
  }
  if (op === 'set_dependencies') return { op, target: target('依赖修改缺少 target'), dependsOn: stringArray(item.dependsOn, '依赖列表格式无效') }
  if (op === 'update_context') {
    const changes = asRecord(item.changes, '资料修改字段无效')
    if (Object.keys(changes).some((key) => !['title', 'path', 'text', 'enabled'].includes(key))) return invalid('编辑建议试图修改不支持的资料字段。')
    const parsed: { title?: string; path?: string; text?: string; enabled?: boolean } = {}
    if ('title' in changes) parsed.title = requiredString(changes.title, '资料标题不能为空')
    if ('path' in changes) parsed.path = requiredString(changes.path, '文件资料路径不能为空')
    if ('text' in changes) parsed.text = requiredString(changes.text, '提示词内容不能为空')
    if ('enabled' in changes) parsed.enabled = typeof changes.enabled === 'boolean' ? changes.enabled : invalid('提示词启用状态无效')
    if (!Object.keys(parsed).length) return invalid('资料修改没有包含字段。')
    return { op, target: target('资料修改缺少 target'), changes: parsed }
  }
  if (op === 'remove_context') return { op, target: target('删除资料缺少 target') }
  if (op === 'set_context_links') return { op, target: target('资料连线修改缺少 target'), tasks: stringArray(item.tasks, '资料任务列表格式无效') }
  return invalid(`编辑建议包含不支持的操作“${op}”。`)
}

function resolveNodeId(nodes: readonly WorkflowNode[], target: string, aliases: ReadonlyMap<string, string>, type: 'task' | 'context'): string {
  const ref = aliases.get(target)
  if (ref) {
    const node = nodes.find((item) => item.id === ref)
    if (node && (type === 'task' ? node.type === 'task' : node.type !== 'task')) return ref
    throw new WorkflowValidationError('edit.reference', `节点“${target}”已删除或类型不匹配。`)
  }
  const matches = nodes.filter((node) => (type === 'task' ? node.type === 'task' : node.type !== 'task') && (node.id === target || node.title === target))
  if (matches.length !== 1) throw new WorkflowValidationError('edit.reference', matches.length ? `“${target}”对应多个节点，请使用节点 ID。` : `找不到编辑建议引用的节点“${target}”。`)
  return matches[0]!.id
}

function replaceEdges(edges: WorkflowEdge[], type: 'dependency' | 'context', target: string, sources: readonly string[]): WorkflowEdge[] {
  const matches = new Map(edges.filter((edge) => edge.type === type && edge.target === target).map((edge) => [edge.source, edge]))
  const retained = edges.filter((edge) => !(edge.type === type && edge.target === target))
  return [...retained, ...sources.map((source) => matches.get(source) ?? { type, id: `edge-${newId()}`, source, target })]
}

function findIncrementalPosition(nodes: readonly WorkflowNode[]): { x: number; y: number } {
  const minX = nodes.length ? Math.min(...nodes.map((node) => node.position.x)) : 80
  const minY = nodes.length ? Math.min(...nodes.map((node) => node.position.y)) : 80
  for (let row = 0; row < nodes.length + 3; row++) for (let column = 0; column < nodes.length + 3; column++) {
    const candidate = { x: minX + column * 330, y: minY + row * 220 }
    if (nodes.every((node) => Math.abs(node.position.x - candidate.x) >= 290 || Math.abs(node.position.y - candidate.y) >= 185)) return candidate
  }
  return { x: minX, y: minY + (nodes.length + 4) * 220 }
}

function expectedContents(value: unknown): readonly { path: string; text: string }[] {
  if (!Array.isArray(value) || value.some((item) => !item || typeof item !== 'object' || typeof item.path !== 'string' || typeof item.text !== 'string')) return invalid('文件内容检查列表格式无效')
  return value.map((item) => ({ path: item.path, text: item.text }))
}

function stringArray(value: unknown, message: string): string[] {
  if (!Array.isArray(value) || !value.every((item) => typeof item === 'string')) return invalid(message)
  return value
}

function asRecord(value: unknown, message: string): Record<string, any> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return invalid(message)
  return value as Record<string, any>
}

function requiredString(value: unknown, message: string): string {
  if (typeof value !== 'string' || !value.trim()) return invalid(message)
  return value.trim()
}

function unique<T>(values: readonly T[]): T[] { return [...new Set(values)] }
function newId(): string { return globalThis.crypto.randomUUID() }
function invalid(message: string): never { throw new WorkflowValidationError('edit.operation', message) }
