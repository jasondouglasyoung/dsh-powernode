import type { RunTask, WorkflowRun } from '../shared/types.js';
export declare function taskProgressState(task: RunTask | undefined): string;
export declare function taskProgressLabel(state: string): string;
/** Counts come from the immutable execution graph, never from canvas order. */
export declare function workflowProgress(run: WorkflowRun): {
    total: number;
    completed: number;
    currentTask: import("../shared/types.js").TaskNode | undefined;
    currentIndex: number;
    currentState: import("../shared/types.js").TaskState | undefined;
    activity: import("../shared/types.js").TaskActivity | undefined;
    latestActivityAt: number;
};
//# sourceMappingURL=run-progress.d.ts.map