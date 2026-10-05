const runs = new Map();
const listeners = new Map();
export function latestSessionRun(sessionId) { return runs.get(sessionId); }
export function publishSessionRun(sessionId, run) {
    if (runs.get(sessionId) === run)
        return;
    if (run)
        runs.set(sessionId, run);
    else
        runs.delete(sessionId);
    for (const listener of listeners.get(sessionId) ?? [])
        listener();
}
export function subscribeSessionRun(sessionId, listener) {
    const subscribers = listeners.get(sessionId) ?? new Set();
    subscribers.add(listener);
    listeners.set(sessionId, subscribers);
    return () => { subscribers.delete(listener); if (!subscribers.size)
        listeners.delete(sessionId); };
}
export function clearSessionRuns() { runs.clear(); listeners.clear(); }
//# sourceMappingURL=run-state.js.map