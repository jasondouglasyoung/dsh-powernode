import type {
  TaskNode,
  WorkflowDefinition,
  WorkflowEdge,
  WorkflowNode,
} from '../shared/types.js'

export const MAX_TASKS = 30
export const MAX_CONTEXT_NODES = 20
export const MAX_CONTEXT_FILE_BYTES = 2 * 1024 * 1024
export const MAX_WORKFLOW_TEXT_BYTES = 2 * 1024 * 1024

export class WorkflowValidationError extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = 'WorkflowValidationError'
    this.code = code
  }
}

export function validateWorkflow(workflow: WorkflowDefinition): void {
  if (workflow.schemaVersion !== 1) throw new WorkflowValidationError('workflow.schema', '工作流数据版本不受支持。')
  if (!Number.isInteger(workflow.revision) || workflow.revision < 0) {
    throw new WorkflowValidationError('workflow.revision', '工作流修订号无效。')
  }
  if (!workflow.id.trim()) throw new WorkflowValidationError('workflow.id', '工作流缺少 ID。')
  if (!workflow.title.trim()) throw new WorkflowValidationError('workflow.title', '工作流标题不能为空。')
  if (!workflow.objective.trim()) throw new WorkflowValidationError('workflow.objective', '工作流目标不能为空。')
  if (!Array.isArray(workflow.nodes) || !Array.isArray(workflow.edges)) {
    throw new WorkflowValidationError('workflow.shape', '工作流节点或连线数据格式无效。')
  }

  const tasks = workflow.nodes.filter((node) => node.type === 'task')
  const contexts = workflow.nodes.filter((node) => node.type !== 'task')
  if (tasks.length < 1 || tasks.length > MAX_TASKS) {
    throw new WorkflowValidationError('task.limit', `任务数量必须为 1 至 ${MAX_TASKS}。`)
  }
  if (contexts.length > MAX_CONTEXT_NODES) {
    throw new WorkflowValidationError('context.limit', `上下文节点不能超过 ${MAX_CONTEXT_NODES} 个。`)
  }

  const ids = new Set<string>()
  const byId = new Map<string, WorkflowNode>()
  for (const node of workflow.nodes) {
    if (!node.id.trim() || ids.has(node.id)) {
      throw new WorkflowValidationError('node.id', `节点 ID 为空或重复：${node.id || '(空)'}`)
    }
    ids.add(node.id)
    byId.set(node.id, node)
    if (!node.title.trim()) {
      throw new WorkflowValidationError('node.title', `节点 ${node.id} 的标题不能为空。`)
    }
    if (!Number.isFinite(node.position.x) || !Number.isFinite(node.position.y)) {
      throw new WorkflowValidationError('node.position', `节点 ${node.title} 的位置无效。`)
    }
    if (node.type === 'task' && !node.instructions.trim()) {
      throw new WorkflowValidationError('task.instructions', `任务“${node.title}”缺少执行说明。`)
    }
    if (node.type === 'task') {
      if (!Number.isInteger(node.order) || node.order < 0) throw new WorkflowValidationError('task.order', `任务“${node.title}”的顺序值无效。`)
      if (!Array.isArray(node.acceptanceCriteria) || node.acceptanceCriteria.length === 0 || !node.acceptanceCriteria.every((item: unknown) => typeof item === 'string' && item.trim().length > 0)) {
        throw new WorkflowValidationError('task.acceptance', `任务“${node.title}”至少需要一条验收条件。`)
      }
      if (!Array.isArray(node.expectedArtifacts) || !node.expectedArtifacts.every((item: unknown) => typeof item === 'string' && isSafeRelativeArtifact(item))) {
        throw new WorkflowValidationError('task.artifacts', `任务“${node.title}”的预期产物必须是工作区内的相对路径。`)
      }
      if (!Array.isArray(node.expectedContents) || !node.expectedContents.every((item: unknown) =>
        typeof item === 'object' && item !== null && 'path' in item && 'text' in item
        && typeof item.path === 'string' && isSafeRelativeArtifact(item.path)
        && typeof item.text === 'string' && item.text.trim().length > 0)) {
        throw new WorkflowValidationError('task.expected-content', `任务“${node.title}”的文件内容核验规则无效。`)
      }
      if (node.acceptanceMode === 'automatic' && node.expectedArtifacts.length + node.expectedContents.length === 0) {
        throw new WorkflowValidationError('task.artifacts', `自动验收任务“${node.title}”至少需要一个文件检查。`)
      }
      if (node.acceptanceMode !== 'automatic' && node.acceptanceMode !== 'manual') {
        throw new WorkflowValidationError('task.acceptance-mode', `任务“${node.title}”的验收方式无效。`)
      }
    }
    if (node.type === 'file' && !node.path.trim()) {
      throw new WorkflowValidationError('file.path', `文件节点“${node.title}”缺少路径。`)
    }
    if (node.type === 'prompt' && !node.text.trim()) {
      throw new WorkflowValidationError('prompt.text', `提示节点“${node.title}”内容不能为空。`)
    }
    if (node.type === 'prompt' && typeof node.enabled !== 'boolean') {
      throw new WorkflowValidationError('prompt.enabled', `提示节点“${node.title}”的启用状态无效。`)
    }
  }

  const edgeIds = new Set<string>()
  const edgeKeys = new Set<string>()
  const dependencies = new Map<string, string[]>()
  for (const edge of workflow.edges) {
    const source = byId.get(edge.source)
    const target = byId.get(edge.target)
    if (!source || !target) {
      throw new WorkflowValidationError('edge.endpoint', `连线 ${edge.id} 引用了不存在的节点。`)
    }
    if (!edge.id.trim() || edgeIds.has(edge.id)) {
      throw new WorkflowValidationError('edge.id', `连线 ID 为空或重复：${edge.id || '(空)'}`)
    }
    edgeIds.add(edge.id)
    if (edge.source === edge.target) {
      throw new WorkflowValidationError('edge.self', '节点不能连接到自身。')
    }
    if (edge.type === 'dependency') {
      if (source.type !== 'task' || target.type !== 'task') {
        throw new WorkflowValidationError('edge.type', '依赖连线只能从任务连到任务。')
      }
      const key = `${edge.type}:${edge.source}:${edge.target}`
      if (edgeKeys.has(key)) throw new WorkflowValidationError('edge.duplicate', '不能重复添加同一条连线。')
      edgeKeys.add(key)
      dependencies.set(edge.target, [...(dependencies.get(edge.target) ?? []), edge.source])
    } else {
      if (source.type === 'task' || target.type !== 'task') {
        throw new WorkflowValidationError('edge.type', '上下文连线只能从文件或提示节点连到任务。')
      }
      const key = `${edge.type}:${edge.source}:${edge.target}`
      if (edgeKeys.has(key)) throw new WorkflowValidationError('edge.duplicate', '不能重复添加同一条连线。')
      edgeKeys.add(key)
    }
  }
  assertAcyclic(tasks, dependencies)
}

export function assertAcyclic(
  tasks: readonly TaskNode[],
  dependencies: ReadonlyMap<string, readonly string[]>,
): void {
  const visiting = new Set<string>()
  const visited = new Set<string>()
  const visit = (id: string): void => {
    if (visiting.has(id)) throw new WorkflowValidationError('dependency.cycle', '任务依赖关系包含循环。')
    if (visited.has(id)) return
    visiting.add(id)
    for (const prerequisite of dependencies.get(id) ?? []) visit(prerequisite)
    visiting.delete(id)
    visited.add(id)
  }
  for (const task of tasks) visit(task.id)
}

export function topologicalTasks(workflow: WorkflowDefinition): readonly TaskNode[] {
  validateWorkflow(workflow)
  const byId = new Map<string, TaskNode>()
  const incoming = new Map<string, number>()
  const next = new Map<string, string[]>()
  for (const node of workflow.nodes) if (node.type === 'task') {
    byId.set(node.id, node)
    incoming.set(node.id, 0)
  }
  for (const edge of workflow.edges) if (edge.type === 'dependency') {
    incoming.set(edge.target, (incoming.get(edge.target) ?? 0) + 1)
    next.set(edge.source, [...(next.get(edge.source) ?? []), edge.target])
  }
  const compareTasks = (left: TaskNode, right: TaskNode) => left.order - right.order || left.id.localeCompare(right.id)
  const ready = workflow.nodes
    .filter((node): node is TaskNode => node.type === 'task' && incoming.get(node.id) === 0)
    .sort(compareTasks)
    .map((node) => node.id)
  const ordered: TaskNode[] = []
  while (ready.length > 0) {
    const id = ready.shift()!
    const task = byId.get(id)
    if (task) ordered.push(task)
    for (const successor of next.get(id) ?? []) {
      const remaining = (incoming.get(successor) ?? 0) - 1
      incoming.set(successor, remaining)
      if (remaining === 0) {
        ready.push(successor)
        ready.sort((left, right) => compareTasks(byId.get(left)!, byId.get(right)!))
      }
    }
  }
  if (ordered.length !== byId.size) {
    throw new WorkflowValidationError('dependency.cycle', '任务依赖关系包含循环。')
  }
  return ordered
}

export function dependenciesOf(workflow: WorkflowDefinition, taskId: string): readonly string[] {
  return workflow.edges
    .filter((edge): edge is Extract<WorkflowEdge, { type: 'dependency' }> =>
      edge.type === 'dependency' && edge.target === taskId)
    .map((edge) => edge.source)
}

export function contextNodeIdsOf(workflow: WorkflowDefinition, taskId: string): readonly string[] {
  return workflow.edges
    .filter((edge): edge is Extract<WorkflowEdge, { type: 'context' }> =>
      edge.type === 'context' && edge.target === taskId)
    .map((edge) => edge.source)
}

function isSafeRelativeArtifact(path: string): boolean {
  if (!path.trim() || path.includes('\0') || path.startsWith('/') || path.startsWith('\\') || /^[A-Za-z]:/.test(path)) return false
  const segments = path.replaceAll('\\', '/').split('/')
  return segments.every((segment) => segment !== '..' && segment !== '') && segments.some((segment) => segment !== '.')
}
