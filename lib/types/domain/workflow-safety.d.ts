import type { WorkflowDefinition, WorkflowRunState } from '../shared/types.js';
export type WorkflowProtectionAction = 'start-run' | 'apply-run' | 'generate' | 'import-markdown';
export interface WorkflowProtectionInput {
    readonly hasUnsavedChanges: boolean;
    readonly initialPromptOnlyDraft?: boolean | undefined;
    readonly runState?: WorkflowRunState | undefined;
    readonly objective?: string | undefined;
}
export declare function hasWorkflowChangesSinceSnapshot(workflow: WorkflowDefinition, snapshot: WorkflowDefinition | undefined): boolean;
export declare function canGenerateFromInitialPrompt(workflow: WorkflowDefinition, snapshot: WorkflowDefinition | undefined, savedWorkflowId: string): boolean;
export declare function isWorkflowRunUnfinished(runState: WorkflowRunState | undefined): boolean;
export declare function getWorkflowProtectionMessage(action: WorkflowProtectionAction, input: WorkflowProtectionInput): string | undefined;
//# sourceMappingURL=workflow-safety.d.ts.map