import test from 'node:test'
import assert from 'node:assert/strict'
import { validateWorkflow, topologicalTasks, WorkflowValidationError } from '../lib/types/domain/graph.js'
import { importWorkflowMarkdown } from '../lib/types/domain/markdown.js'
import { layoutGeneratedDraft } from '../lib/types/domain/draft-layout.js'

function task(id, order, overrides = {}) {
  return {
    type: 'task', id, title: id, instructions: `执行 ${id}`,
    acceptanceCriteria: [`检查 ${id}`], expectedArtifacts: [], expectedContents: [], acceptanceMode: 'manual', order,
    position: { x: order * 180, y: 0 }, ...overrides,
  }
}

function workflow(nodes, edges = []) {
  return {
    id: 'wf-test', title: '测试工作流', objective: '验证依赖和路径', workspaceDirectory: 'C:/workspace',
    outputDirectory: 'C:/workspace/out', schemaVersion: 1, revision: 0,
    nodes, edges, createdAt: 1, updatedAt: 1,
  }
}

test('拓扑顺序只读取 dependency 边，并按 order 和稳定 ID 决定并列任务', () => {
  const graph = workflow([
    task('later', 2), task('first', 0), task('middle', 1),
    { type: 'file', id: 'file', title: '文件', path: 'C:/workspace/req.md', position: { x: 0, y: 80 } },
  ], [
    { type: 'dependency', id: 'dep', source: 'first', target: 'later' },
    { type: 'context', id: 'ctx', source: 'file', target: 'first' },
  ])
  validateWorkflow(graph)
  assert.deepEqual(topologicalTasks(graph).map((node) => node.id), ['first', 'middle', 'later'])
})

test('拒绝依赖环、方向错误、缺少验收条件和越界产物', () => {
  assert.throws(() => validateWorkflow(workflow([task('a', 0), task('b', 1)], [
    { type: 'dependency', id: 'ab', source: 'a', target: 'b' },
    { type: 'dependency', id: 'ba', source: 'b', target: 'a' },
  ])), (error) => error instanceof WorkflowValidationError && error.code === 'dependency.cycle')
  assert.throws(() => validateWorkflow(workflow([task('a', 0, { expectedArtifacts: ['../private.txt'] })])), /相对路径/u)
  assert.throws(() => validateWorkflow(workflow([task('a', 0, { acceptanceCriteria: [] })])), /验收条件/u)
  assert.throws(() => validateWorkflow(workflow([
    task('a', 0), { type: 'file', id: 'f', title: 'F', path: 'C:/workspace/f', position: { x: 0, y: 0 } },
  ], [{ type: 'dependency', id: 'bad', source: 'f', target: 'a' }])), /依赖连线/u)
})

test('Markdown 导入保留依赖并生成需要人工验收的任务', () => {
  const imported = importWorkflowMarkdown('# 页面需求\n\n制作静态页面。\n\n## 分析\n读取要求。\n\n## 实现\n依赖：分析\n写出页面。', {
    id: 'wf-md', workspaceDirectory: 'C:/workspace', outputDirectory: 'C:/workspace/out', now: 100,
  })
  assert.equal(imported.nodes.length, 2)
  assert.deepEqual(imported.edges.map(({ source, target }) => [source, target]), [['task-1', 'task-2']])
  assert.equal(imported.nodes[1].acceptanceMode, 'manual')
  assert.deepEqual(topologicalTasks(imported).map((node) => node.title), ['分析', '实现'])
  assert.throws(() => importWorkflowMarkdown('# 标题\n\n## A\nx\n\n## B\n依赖：未知', {
    id: 'wf-bad', workspaceDirectory: 'C:/workspace', outputDirectory: 'C:/workspace/out', now: 100,
  }), /不存在的依赖/u)
})

test('AI 草稿把任务和上下文资料放入不重叠的布局区域', () => {
  const nodes = [
    ...Array.from({ length: 7 }, (_, index) => task(`task-${index + 1}`, index)),
    ...Array.from({ length: 6 }, (_, index) => ({
      type: index % 2 ? 'prompt' : 'file', id: `context-${index + 1}`, title: `资料 ${index + 1}`,
      ...(index % 2 ? { text: '说明', enabled: true } : { path: `C:/workspace/ref-${index + 1}.md` }),
      position: { x: 760, y: 550 },
    })),
  ]
  const laidOut = layoutGeneratedDraft(nodes)
  const boxes = laidOut.map((node) => ({
    id: node.id,
    x: node.position.x,
    y: node.position.y,
    width: 236,
    height: 124,
  }))
  for (let left = 0; left < boxes.length; left += 1) {
    for (let right = left + 1; right < boxes.length; right += 1) {
      const a = boxes[left]
      const b = boxes[right]
      const overlaps = a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
      assert.equal(overlaps, false, `${a.id} must not overlap ${b.id}`)
    }
  }
  assert.deepEqual(laidOut.slice(0, 7).map((node) => node.id), nodes.slice(0, 7).map((node) => node.id))
  assert.ok(laidOut.find((node) => node.id === 'context-1').position.y > Math.max(...laidOut.filter((node) => node.type === 'task').map((node) => node.position.y)))
})
