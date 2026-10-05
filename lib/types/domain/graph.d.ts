import type { TaskNode, WorkflowDefinition } from '../shared/types.js';
export declare const MAX_TASKS = 30;
export declare const MAX_CONTEXT_NODES = 20;
export declare const MAX_CONTEXT_FILE_BYTES: number;
export declare const MAX_WORKFLOW_TEXT_BYTES: number;
export declare class WorkflowValidationError extends Error {
    readonly code: string;
    constructor(code: string, message: string);
}
export declare function validateWorkflow(workflow: WorkflowDefinition): void;
export declare function assertAcyclic(tasks: readonly TaskNode[], dependencies: ReadonlyMap<string, readonly string[]>): void;
export declare function topologicalTasks(workflow: WorkflowDefinition): readonly TaskNode[];
export declare function dependenciesOf(workflow: WorkflowDefinition, taskId: string): readonly string[];
export declare function contextNodeIdsOf(workflow: WorkflowDefinition, taskId: string): readonly string[];
//# sourceMappingURL=graph.d.ts.map