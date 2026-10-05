import assert from 'node:assert/strict'
import test from 'node:test'
import {
  canGenerateFromInitialPrompt,
  getWorkflowProtectionMessage,
  hasWorkflowChangesSinceSnapshot,
  isWorkflowRunUnfinished,
} from '../lib/types/domain/workflow-safety.js'

function workflow(overrides = {}) {
  return {
    id: 'workflow-a',
    title: '介绍页',
    objective: '',
    workspaceDirectory: 'C:/preview',
    outputDirectory: 'C:/preview',
    schemaVersion: 1,
    revision: 0,
    nodes: [{ type: 'task', id: 'task-1', title: '需求整理', instructions: '整理需求', acceptanceCriteria: ['目标清楚'], expectedArtifacts: [], expectedContents: [], acceptanceMode: 'manual', order: 0, position: { x: 10, y: 20 } }],
    edges: [],
    createdAt: 1,
    updatedAt: 1,
    ...overrides,
  }
}

test('unsaved saved-workflow edits block Run and apply-and-run with the required message', () => {
  const baseline = workflow()
  const changed = workflow({ nodes: [{ ...baseline.nodes[0], title: '改过但未保存' }] })
  assert.equal(hasWorkflowChangesSinceSnapshot(changed, baseline), true)
  assert.equal(getWorkflowProtectionMessage('start-run', { hasUnsavedChanges: true }), '有未保存修改，请先保存。')
  assert.equal(getWorkflowProtectionMessage('apply-run', { hasUnsavedChanges: true }), '有未保存修改，请先保存。')
  assert.equal(getWorkflowProtectionMessage('start-run', { hasUnsavedChanges: false }), undefined)
})

test('plan generation accepts only a new flow with prompt fields edited and an unchanged canvas', () => {
  const baseline = workflow()
  const promptOnly = workflow({ objective: '生成一个简单介绍页' })
  assert.equal(canGenerateFromInitialPrompt(promptOnly, baseline, ''), true)
  assert.equal(getWorkflowProtectionMessage('generate', {
    hasUnsavedChanges: true,
    initialPromptOnlyDraft: true,
    objective: promptOnly.objective,
  }), undefined)

  const editedCanvas = workflow({
    objective: '生成一个简单介绍页',
    nodes: [{ ...baseline.nodes[0], title: '已编辑任务' }],
  })
  assert.equal(canGenerateFromInitialPrompt(editedCanvas, baseline, ''), false)
  assert.match(getWorkflowProtectionMessage('generate', {
    hasUnsavedChanges: true,
    initialPromptOnlyDraft: false,
    objective: editedCanvas.objective,
  }), /有未保存修改/u)
  assert.match(getWorkflowProtectionMessage('generate', {
    hasUnsavedChanges: false,
    objective: '   ',
  }), /请先填写整体目标/u)
})

test('generation and Markdown import preserve unfinished Run state and canvas', () => {
  for (const runState of ['queued', 'running', 'pausing', 'paused', 'verifying', 'needs_review', 'interrupted']) {
    assert.equal(isWorkflowRunUnfinished(runState), true)
    assert.match(getWorkflowProtectionMessage('generate', { hasUnsavedChanges: false, runState, objective: '目标' }), /当前运行尚未结束/u)
    assert.match(getWorkflowProtectionMessage('import-markdown', { hasUnsavedChanges: false, runState }), /当前运行尚未结束/u)
  }
  for (const runState of ['completed', 'failed', 'cancelled', 'accepted']) assert.equal(isWorkflowRunUnfinished(runState), false)

  assert.match(getWorkflowProtectionMessage('import-markdown', { hasUnsavedChanges: true }), /有未保存修改/u)
  assert.equal(getWorkflowProtectionMessage('import-markdown', { hasUnsavedChanges: false }), undefined)
})
