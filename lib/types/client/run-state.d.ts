import type { WorkflowRun } from '../shared/types.js';
export declare function latestSessionRun(sessionId: string): WorkflowRun | undefined;
export declare function publishSessionRun(sessionId: string, run: WorkflowRun | undefined): void;
export declare function subscribeSessionRun(sessionId: string, listener: () => void): () => void;
export declare function clearSessionRuns(): void;
//# sourceMappingURL=run-state.d.ts.map