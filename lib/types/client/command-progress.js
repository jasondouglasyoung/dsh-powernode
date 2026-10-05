const statuses = new Map();
const listeners = new Map();
const latestListeners = new Set();
let latestSnapshot;
export function getPowernodeCommandStatus(sessionId) {
    return statuses.get(sessionId);
}
export function getLatestPowernodeCommandStatus() {
    return latestSnapshot;
}
export function publishPowernodeCommandStatus(sessionId, status) {
    statuses.delete(sessionId);
    const snapshot = { ...status, ...(status.message ? { message: status.message.slice(0, 1200) } : {}) };
    statuses.set(sessionId, snapshot);
    latestSnapshot = { sessionId, status: snapshot };
    while (statuses.size > 500)
        statuses.delete(statuses.keys().next().value);
    for (const listener of listeners.get(sessionId) ?? [])
        listener();
    for (const listener of latestListeners)
        listener();
}
export function subscribePowernodeCommandStatus(sessionId, listener) {
    const current = listeners.get(sessionId) ?? new Set();
    current.add(listener);
    listeners.set(sessionId, current);
    return () => {
        current.delete(listener);
        if (!current.size)
            listeners.delete(sessionId);
    };
}
export function subscribeLatestPowernodeCommandStatus(listener) {
    latestListeners.add(listener);
    return () => latestListeners.delete(listener);
}
export function clearPowernodeCommandStatuses() {
    const sessionIds = [...listeners.keys()];
    statuses.clear();
    for (const sessionId of sessionIds) {
        for (const listener of listeners.get(sessionId) ?? [])
            listener();
    }
    latestSnapshot = undefined;
    for (const listener of latestListeners)
        listener();
}
//# sourceMappingURL=command-progress.js.map