import type { WorkflowRun } from '../shared/types.js';
export declare function RunProgress({ run, syncError, onTask, onStop }: {
    run: WorkflowRun;
    syncError?: string;
    onTask: (id: string) => void;
    onStop?: (() => void) | undefined;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=run-progress.d.ts.map