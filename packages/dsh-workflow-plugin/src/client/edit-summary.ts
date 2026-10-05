import type { WorkflowNode } from '../shared/types.js'

export function describeWorkflowNodeChanges(before: WorkflowNode, after: WorkflowNode): readonly string[] {
  const fields: string[] = []
  if (before.title !== after.title) fields.push(`标题：${before.title} → ${after.title}`)
  if (before.type === 'task' && after.type === 'task') {
    if (before.instructions !== after.instructions) fields.push('任务说明')
    if (JSON.stringify(before.acceptanceCriteria) !== JSON.stringify(after.acceptanceCriteria)) fields.push('验收条件')
    if (JSON.stringify(before.expectedArtifacts) !== JSON.stringify(after.expectedArtifacts)) fields.push('预期产物')
    if (JSON.stringify(before.expectedContents) !== JSON.stringify(after.expectedContents)) fields.push('文件内容检查')
    if (before.acceptanceMode !== after.acceptanceMode) fields.push('验收方式')
  }
  if (before.type === 'file' && after.type === 'file' && before.path !== after.path) fields.push(`资料路径：${before.path} → ${after.path}`)
  if (before.type === 'prompt' && after.type === 'prompt') {
    if (before.text !== after.text) fields.push('提示词内容')
    if (before.enabled !== after.enabled) fields.push(`提示词状态：${before.enabled ? '启用' : '停用'} → ${after.enabled ? '启用' : '停用'}`)
  }
  if (JSON.stringify(before.position) !== JSON.stringify(after.position)) {
    fields.push(`画布位置：(${before.position.x}, ${before.position.y}) → (${after.position.x}, ${after.position.y})`)
  }
  return fields
}
