export type PowernodeCommandKind = 'draft' | 'proposal'
export type PowernodeCommandPhase = 'generating' | 'complete' | 'failed' | 'cancelled'

export interface PowernodeCommandStatus {
  readonly commandId: string
  readonly kind: PowernodeCommandKind
  readonly phase: PowernodeCommandPhase
  readonly message?: string
}

export interface PowernodeCommandStatusSnapshot {
  readonly sessionId: string
  readonly status: PowernodeCommandStatus
}

const statuses = new Map<string, PowernodeCommandStatus>()
const listeners = new Map<string, Set<() => void>>()
const latestListeners = new Set<() => void>()
let latestSnapshot: PowernodeCommandStatusSnapshot | undefined

export function getPowernodeCommandStatus(sessionId: string): PowernodeCommandStatus | undefined {
  return statuses.get(sessionId)
}

export function getLatestPowernodeCommandStatus(): PowernodeCommandStatusSnapshot | undefined {
  return latestSnapshot
}

export function publishPowernodeCommandStatus(sessionId: string, status: PowernodeCommandStatus): void {
  statuses.delete(sessionId)
  const snapshot = { ...status, ...(status.message ? { message: status.message.slice(0, 1200) } : {}) }
  statuses.set(sessionId, snapshot)
  latestSnapshot = { sessionId, status: snapshot }
  while (statuses.size > 500) statuses.delete(statuses.keys().next().value!)
  for (const listener of listeners.get(sessionId) ?? []) listener()
  for (const listener of latestListeners) listener()
}

export function subscribePowernodeCommandStatus(sessionId: string, listener: () => void): () => void {
  const current = listeners.get(sessionId) ?? new Set<() => void>()
  current.add(listener)
  listeners.set(sessionId, current)
  return () => {
    current.delete(listener)
    if (!current.size) listeners.delete(sessionId)
  }
}

export function subscribeLatestPowernodeCommandStatus(listener: () => void): () => void {
  latestListeners.add(listener)
  return () => latestListeners.delete(listener)
}

export function clearPowernodeCommandStatuses(): void {
  const sessionIds = [...listeners.keys()]
  statuses.clear()
  for (const sessionId of sessionIds) {
    for (const listener of listeners.get(sessionId) ?? []) listener()
  }
  latestSnapshot = undefined
  for (const listener of latestListeners) listener()
}
