import test from 'node:test'
import assert from 'node:assert/strict'
import { applyWorkflowEditOperations, computeWorkflowEditDiff, missingEditInstructionChanges, parseWorkflowEditOperations, validateEditInstructionTargets } from '../lib/types/domain/workflow-edit.js'
import { describeWorkflowNodeChanges } from '../lib/types/client/edit-summary.js'

function baseWorkflow(workspace) {
  const tasks = [
    { type: 'task', id: 'task-requirements', title: '需求整理', instructions: '整理页面目标。', acceptanceCriteria: ['内容明确。'], expectedArtifacts: [], expectedContents: [], acceptanceMode: 'manual', order: 0, position: { x: 20, y: 40 } },
    { type: 'task', id: 'task-page', title: '页面实现', instructions: '实现页面。', acceptanceCriteria: ['页面可读。'], expectedArtifacts: ['index.html'], expectedContents: [], acceptanceMode: 'manual', order: 1, position: { x: 380, y: 40 } },
    { type: 'task', id: 'task-review', title: '结果检查', instructions: '检查页面。', acceptanceCriteria: ['检查结论明确。'], expectedArtifacts: [], expectedContents: [], acceptanceMode: 'manual', order: 2, position: { x: 740, y: 40 } },
  ]
  const file = { type: 'file', id: 'file-brief', title: '需求资料', path: `${workspace}/brief.md`, position: { x: 20, y: 300 } }
  const prompt = { type: 'prompt', id: 'prompt-guidance', title: '页面要求', text: '保留现有内容', enabled: true, position: { x: 20, y: 520 } }
  return {
    id: 'workflow-stable', title: '介绍页', objective: '实现介绍页', workspaceDirectory: workspace, outputDirectory: `${workspace}/out`,
    schemaVersion: 1, revision: 4, nodes: [...tasks, file, prompt],
    edges: [
      { type: 'dependency', id: 'edge-req-page', source: tasks[0].id, target: tasks[1].id },
      { type: 'dependency', id: 'edge-page-review', source: tasks[1].id, target: tasks[2].id },
      { type: 'context', id: 'edge-file-req', source: file.id, target: tasks[0].id },
      { type: 'context', id: 'edge-prompt-review', source: prompt.id, target: tasks[2].id },
    ], createdAt: 10, updatedAt: 20,
  }
}

const requestedChanges = [
  { op: 'add_task', ref: 'check-materials', title: '检查素材', instructions: '检查页面需要的素材是否齐全。', acceptanceCriteria: ['素材清单已经核对。'], acceptanceMode: 'manual', expectedArtifacts: [], expectedContents: [], dependsOn: ['需求整理'] },
  { op: 'update_task', target: '页面实现', changes: { title: '制作页面' } },
  { op: 'set_dependencies', target: '页面实现', dependsOn: ['检查素材'] },
]

test('结构化编辑新增/改名/重接依赖，保留原流程身份、原节点及未修改连线 ID', () => {
  const base = baseWorkflow('C:/workspace')
  const parsed = parseWorkflowEditOperations(JSON.stringify({ operations: requestedChanges }))
  const candidate = applyWorkflowEditOperations(base, parsed)
  assert.equal(candidate.id, base.id)
  assert.equal(candidate.revision, base.revision)
  for (const node of base.nodes.filter((node) => node.id !== 'task-page')) {
    assert.deepEqual(candidate.nodes.find((item) => item.id === node.id), node)
  }
  assert.deepEqual(candidate.edges.find((edge) => edge.id === 'edge-page-review'), base.edges.find((edge) => edge.id === 'edge-page-review'))
  const added = candidate.nodes.find((node) => node.title === '检查素材')
  const page = candidate.nodes.find((node) => node.id === 'task-page')
  assert.ok(added.id !== 'check-materials', '模型 ref is not used as an application ID')
  assert.notDeepEqual(added.position, base.nodes[0].position)
  assert.equal(page.title, '制作页面')
  assert.ok(candidate.edges.some((edge) => edge.type === 'dependency' && edge.source === 'task-requirements' && edge.target === added.id))
  assert.ok(candidate.edges.some((edge) => edge.type === 'dependency' && edge.source === added.id && edge.target === 'task-page'))
  assert.equal(candidate.edges.some((edge) => edge.id === 'edge-req-page'), false)
  const diff = computeWorkflowEditDiff(base, candidate)
  assert.equal(diff.addedNodes.length, 1)
  assert.equal(diff.changedNodes.length, 1)
  assert.equal(diff.removedEdges.length, 1)
  assert.equal(diff.addedEdges.length, 2)
})

test('接受真实模型返回的 type/ref 编辑操作形态并规范化为结构化提案', () => {
  const base = baseWorkflow('C:/workspace')
  const modelShape = {
    operations: [{
      type: 'update_task',
      ref: 'task-page',
      changes: { acceptanceCriteria: ['页面可读。', '系统目录对话框取消后，原路径保持不变。'] },
    }],
  }
  const parsed = parseWorkflowEditOperations(JSON.stringify(modelShape))
  assert.deepEqual(parsed, [{
    op: 'update_task',
    target: 'task-page',
    changes: { acceptanceCriteria: ['页面可读。', '系统目录对话框取消后，原路径保持不变。'] },
  }])
  const candidate = applyWorkflowEditOperations(base, parsed)
  assert.equal(candidate.nodes.find((node) => node.id === 'task-page').acceptanceCriteria.length, 2)
  assert.equal(computeWorkflowEditDiff(base, candidate).changedNodes.length, 1)
  assert.equal(candidate.revision, base.revision)
})

test('编辑要求覆盖检查识别部分建议和缺失的显式目标，不接受静默省略', () => {
  const base = baseWorkflow('C:/workspace')
  const instruction = '在需求整理之后增加“检查素材”任务，再连接到页面实现；把“页面实现”改名为“制作页面”，其他内容保持不变。'
  assert.deepEqual(validateEditInstructionTargets(instruction, base), [])
  const partial = applyWorkflowEditOperations(base, parseWorkflowEditOperations(JSON.stringify({ operations: [requestedChanges[0]] })))
  assert.deepEqual(missingEditInstructionChanges(instruction, base, partial), [
    '将任务“检查素材”连接到“页面实现”',
    '将任务“页面实现”改名为“制作页面”',
  ])
  const complete = applyWorkflowEditOperations(base, parseWorkflowEditOperations(JSON.stringify({ operations: requestedChanges })))
  assert.deepEqual(missingEditInstructionChanges(instruction, base, complete), [])

  const missingPage = { ...base, nodes: base.nodes.filter((node) => node.id !== 'task-page'), edges: base.edges.filter((edge) => edge.source !== 'task-page' && edge.target !== 'task-page') }
  assert.deepEqual(validateEditInstructionTargets(instruction, missingPage), ['找不到唯一目标任务“页面实现”'])
})

test('编辑支持按要求删除任务及资料上下文，并显示自动移除的关联边', () => {
  const base = baseWorkflow('C:/workspace')
  const candidate = applyWorkflowEditOperations(base, [
    { op: 'remove_context', target: 'file-brief' },
    { op: 'delete_task', target: 'task-page' },
  ])
  assert.equal(candidate.nodes.some((node) => node.id === 'file-brief' || node.id === 'task-page'), false)
  assert.equal(candidate.edges.some((edge) => edge.source === 'file-brief' || edge.target === 'task-page'), false)
  const diff = computeWorkflowEditDiff(base, candidate)
  assert.deepEqual(diff.removedNodes.map((node) => node.id).sort(), ['file-brief', 'task-page'])
  assert.deepEqual(diff.removedEdges.map((edge) => edge.id).sort(), ['edge-file-req', 'edge-page-review', 'edge-req-page'])
  assert.ok(candidate.edges.some((edge) => edge.id === 'edge-prompt-review'), 'deleting one task preserves unrelated prompt context links')
})

test('资料节点只按明确的结构修改，任务上下文边可独立调整', () => {
  const base = baseWorkflow('C:/workspace')
  const candidate = applyWorkflowEditOperations(base, [
    { op: 'update_context', target: 'file-brief', changes: { title: '产品资料' } },
    { op: 'update_context', target: 'prompt-guidance', changes: { text: '只调整介绍页部分', enabled: false } },
    { op: 'set_context_links', target: 'file-brief', tasks: ['页面实现'] },
  ])
  assert.equal(candidate.nodes.find((node) => node.id === 'file-brief').path, base.nodes.find((node) => node.id === 'file-brief').path)
  assert.equal(candidate.nodes.find((node) => node.id === 'prompt-guidance').text, '只调整介绍页部分')
  assert.equal(candidate.nodes.find((node) => node.id === 'prompt-guidance').enabled, false)
  assert.deepEqual(candidate.nodes.filter((node) => node.type !== 'task').map((node) => node.id), ['file-brief', 'prompt-guidance'])
  assert.ok(candidate.edges.some((edge) => edge.type === 'context' && edge.source === 'file-brief' && edge.target === 'task-page'))
  assert.equal(candidate.edges.some((edge) => edge.id === 'edge-file-req'), false)
})

test('编辑差异展示任务、文件和提示词的变更字段及精确位置', () => {
  const base = baseWorkflow('C:/workspace')
  const file = base.nodes.find((node) => node.type === 'file')
  const prompt = base.nodes.find((node) => node.type === 'prompt')
  const task = base.nodes.find((node) => node.type === 'task')
  assert.ok(describeWorkflowNodeChanges(file, { ...file, path: 'C:/workspace/new-brief.md' }).some((field) => field.includes('brief.md') && field.includes('new-brief.md')))
  const promptFields = describeWorkflowNodeChanges(prompt, { ...prompt, text: '新增约束', enabled: false })
  assert.ok(promptFields.includes('提示词内容'))
  assert.ok(promptFields.some((field) => field.includes('启用 → 停用')))
  const taskFields = describeWorkflowNodeChanges(task, { ...task, instructions: '更新要求', position: { x: 95, y: 110 } })
  assert.ok(taskFields.includes('任务说明'))
  assert.ok(taskFields.some((field) => field.includes('(20, 40) → (95, 110)')))
})

test('编辑结构拒绝依赖环、失效引用、非法产物路径和非结构化回复', () => {
  const base = baseWorkflow('C:/workspace')
  assert.throws(() => applyWorkflowEditOperations(base, [
    { op: 'set_dependencies', target: '需求整理', dependsOn: ['页面实现'] },
  ]), /循环/u)
  assert.throws(() => applyWorkflowEditOperations(base, [
    { op: 'update_task', target: '不存在的任务', changes: { title: 'x' } },
  ]), /找不到/u)
  assert.throws(() => applyWorkflowEditOperations(base, [{
    op: 'add_task', ref: 'unsafe', title: '不安全产物', instructions: 'test', acceptanceCriteria: ['ok'], acceptanceMode: 'manual',
    expectedArtifacts: ['../outside.txt'], expectedContents: [], dependsOn: [],
  }]), /相对路径/u)
  assert.throws(() => parseWorkflowEditOperations('建议如下：{}'), /有效 JSON/u)
})

