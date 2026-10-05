import assert from 'node:assert/strict'
import test from 'node:test'
import {
  clearPowernodeCommandStatuses,
  getPowernodeCommandStatus,
  getLatestPowernodeCommandStatus,
  publishPowernodeCommandStatus,
  subscribeLatestPowernodeCommandStatus,
  subscribePowernodeCommandStatus,
} from '../lib/types/client/command-progress.js'

test('Powernode progress stays isolated by session and reports completion, failure, cancellation', () => {
  clearPowernodeCommandStatuses()
  const updatesA = []
  const updatesB = []
  const latestUpdates = []
  const stopLatest = subscribeLatestPowernodeCommandStatus(() => latestUpdates.push(getLatestPowernodeCommandStatus()))
  const stopA = subscribePowernodeCommandStatus('session-a', () => updatesA.push(getPowernodeCommandStatus('session-a')))
  const stopB = subscribePowernodeCommandStatus('session-b', () => updatesB.push(getPowernodeCommandStatus('session-b')))

  publishPowernodeCommandStatus('session-a', { commandId: 'draft-a', kind: 'draft', phase: 'generating' })
  publishPowernodeCommandStatus('session-b', { commandId: 'edit-b', kind: 'proposal', phase: 'generating' })
  publishPowernodeCommandStatus('session-a', { commandId: 'draft-a', kind: 'draft', phase: 'complete' })
  publishPowernodeCommandStatus('session-b', { commandId: 'edit-b', kind: 'proposal', phase: 'cancelled', message: '编辑建议已取消' })

  assert.deepEqual(updatesA.map((status) => status?.phase), ['generating', 'complete'])
  assert.deepEqual(updatesB.map((status) => status?.phase), ['generating', 'cancelled'])
  assert.equal(getPowernodeCommandStatus('session-a')?.commandId, 'draft-a')
  assert.equal(getPowernodeCommandStatus('session-b')?.kind, 'proposal')
  assert.deepEqual(latestUpdates.map((snapshot) => snapshot?.sessionId), ['session-a', 'session-b', 'session-a', 'session-b'])
  assert.equal(getLatestPowernodeCommandStatus()?.sessionId, 'session-b')
  assert.equal(getLatestPowernodeCommandStatus()?.status.phase, 'cancelled')

  publishPowernodeCommandStatus('session-a', { commandId: 'draft-failed', kind: 'draft', phase: 'failed', message: '模型不可用' })
  assert.equal(getPowernodeCommandStatus('session-a')?.phase, 'failed')
  assert.equal(getPowernodeCommandStatus('session-a')?.message, '模型不可用')
  stopA()
  stopB()
  stopLatest()
  clearPowernodeCommandStatuses()
  assert.equal(getLatestPowernodeCommandStatus(), undefined)
})

test('command feedback truncates oversized DSH messages before rendering', () => {
  const message = 'x'.repeat(2000)
  publishPowernodeCommandStatus('session-large', { commandId: 'large', kind: 'draft', phase: 'failed', message })
  assert.equal(getPowernodeCommandStatus('session-large')?.message?.length, 1200)
  clearPowernodeCommandStatuses()
})
