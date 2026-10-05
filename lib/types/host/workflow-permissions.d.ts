import type { Agent } from '@deepseek-ai/dsh-agent';
import type { Session } from '@deepseek-ai/dsh-session';
export interface WorkflowPermissions {
    readonly preset?: string;
    readonly sandbox?: 'read-only' | 'workspace-write' | 'danger-full-access';
    readonly approval?: 'ask' | 'never';
}
/** Snapshot before async initialization: defaults for new sessions can differ
 * from the user's selection in the conversation that starts the workflow. */
export declare function captureWorkflowPermissions(parent?: Agent): WorkflowPermissions | undefined;
/** Seed the child before publication. Never widen permissions or bypass an
 * approval merely because a task requires a write. */
export declare function applyWorkflowPermissions(session: Session, permissions?: WorkflowPermissions): void;
//# sourceMappingURL=workflow-permissions.d.ts.map