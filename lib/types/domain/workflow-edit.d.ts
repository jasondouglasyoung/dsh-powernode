import type { TaskNode, WorkflowDefinition, WorkflowEditDiff } from '../shared/types.js';
export type WorkflowEditOperation = {
    readonly op: 'add_task';
    readonly ref: string;
    readonly title: string;
    readonly instructions: string;
    readonly acceptanceCriteria: readonly string[];
    readonly acceptanceMode: 'automatic' | 'manual';
    readonly expectedArtifacts: readonly string[];
    readonly expectedContents: readonly {
        readonly path: string;
        readonly text: string;
    }[];
    readonly dependsOn: readonly string[];
} | {
    readonly op: 'delete_task';
    readonly target: string;
} | {
    readonly op: 'update_task';
    readonly target: string;
    readonly changes: Partial<Pick<TaskNode, 'title' | 'instructions' | 'acceptanceCriteria' | 'acceptanceMode' | 'expectedArtifacts' | 'expectedContents'>>;
} | {
    readonly op: 'set_dependencies';
    readonly target: string;
    readonly dependsOn: readonly string[];
} | {
    readonly op: 'update_context';
    readonly target: string;
    readonly changes: {
        readonly title?: string;
        readonly path?: string;
        readonly text?: string;
        readonly enabled?: boolean;
    };
} | {
    readonly op: 'remove_context';
    readonly target: string;
} | {
    readonly op: 'set_context_links';
    readonly target: string;
    readonly tasks: readonly string[];
};
/** Reject explicitly named task targets that do not resolve uniquely. */
export declare function validateEditInstructionTargets(instruction: string, base: WorkflowDefinition): readonly string[];
/** Return explicit requested changes that the proposed graph does not satisfy. */
export declare function missingEditInstructionChanges(instruction: string, base: WorkflowDefinition, candidate: WorkflowDefinition): readonly string[];
export declare function parseWorkflowEditOperations(text: string): readonly WorkflowEditOperation[];
export declare function applyWorkflowEditOperations(base: WorkflowDefinition, operations: readonly WorkflowEditOperation[]): WorkflowDefinition;
export declare function assertEditCandidateAllowed(base: WorkflowDefinition, candidate: WorkflowDefinition): void;
export declare function computeWorkflowEditDiff(base: WorkflowDefinition, candidate: WorkflowDefinition): WorkflowEditDiff;
//# sourceMappingURL=workflow-edit.d.ts.map