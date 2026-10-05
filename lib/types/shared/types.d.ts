export type NodeId = string;
export type RunId = string;
export interface Position {
    readonly x: number;
    readonly y: number;
}
export interface TaskNode {
    readonly type: 'task';
    readonly id: NodeId;
    readonly title: string;
    readonly instructions: string;
    readonly acceptanceCriteria: readonly string[];
    readonly expectedArtifacts: readonly string[];
    readonly expectedContents: readonly {
        readonly path: string;
        readonly text: string;
    }[];
    readonly acceptanceMode: 'automatic' | 'manual';
    readonly order: number;
    readonly position: Position;
}
export interface FileNode {
    readonly type: 'file';
    readonly id: NodeId;
    readonly title: string;
    readonly path: string;
    readonly position: Position;
}
export interface PromptNode {
    readonly type: 'prompt';
    readonly id: NodeId;
    readonly title: string;
    readonly text: string;
    readonly enabled: boolean;
    readonly position: Position;
}
export type WorkflowNode = TaskNode | FileNode | PromptNode;
export interface DependencyEdge {
    readonly type: 'dependency';
    readonly id: string;
    readonly source: NodeId;
    readonly target: NodeId;
}
export interface ContextEdge {
    readonly type: 'context';
    readonly id: string;
    readonly source: NodeId;
    readonly target: NodeId;
}
export type WorkflowEdge = DependencyEdge | ContextEdge;
export interface WorkflowDefinition {
    readonly id: string;
    readonly title: string;
    readonly objective: string;
    readonly workspaceDirectory: string;
    readonly outputDirectory: string;
    readonly schemaVersion: 1;
    readonly revision: number;
    readonly nodes: readonly WorkflowNode[];
    readonly edges: readonly WorkflowEdge[];
    readonly createdAt: number;
    readonly updatedAt: number;
}
export interface WorkflowSummary {
    readonly id: string;
    readonly title: string;
    readonly objective: string;
    readonly updatedAt: number;
    readonly taskCount: number;
    readonly revision: number;
}
/** One optimistic, durable link from a DSH conversation to a saved workflow. */
export interface SessionWorkflowAssociation {
    readonly sessionId: string;
    /** Empty means the session was explicitly unlinked, for revision-safe deletion. */
    readonly workflowId: string;
    readonly revision: number;
    readonly updatedAt: number;
}
/** Session-local data returned by the Host after resolving a real DSH Session. */
export interface SessionWorkflowState {
    readonly association?: SessionWorkflowAssociation;
    readonly associationRevision: number;
    readonly workflow?: WorkflowDefinition;
    readonly commandDraft?: SessionWorkflowDraft;
    readonly editProposal?: SessionWorkflowEditProposal;
    readonly editDiff?: WorkflowEditDiff;
    readonly availableWorkflows: readonly WorkflowSummary[];
    readonly workspaceDirectory: string;
}
export interface SessionWorkflowEditProposal {
    readonly sessionId: string;
    readonly proposalId: string;
    readonly commandId: string;
    /** User's exact edit request, absent only on Alpha.11 and older proposals. */
    readonly instruction?: string;
    readonly workflowId: string;
    readonly baseWorkflowRevision: number;
    readonly baseAssociationRevision: number;
    readonly baseWorkflow: WorkflowDefinition;
    readonly workflow: WorkflowDefinition;
    readonly revision: number;
    readonly model: string;
    readonly createdAt: number;
    readonly updatedAt: number;
}
/** Minimal global recovery index; graph contents remain session-scoped. */
export interface PendingEditProposalSummary {
    readonly sessionId: string;
    readonly proposalId: string;
    readonly workflowId: string;
    readonly workflowTitle: string;
    readonly baseWorkflowRevision: number;
    readonly revision: number;
    readonly model: string;
    readonly createdAt: number;
    readonly updatedAt: number;
}
/** Minimal global recovery index; graph contents remain session-scoped. */
export interface PendingSessionDraftSummary {
    readonly sessionId: string;
    readonly draftId: string;
    readonly commandId: string;
    readonly workflowTitle: string;
    readonly revision: number;
    readonly taskCount: number;
    readonly model: string;
    readonly createdAt: number;
    readonly updatedAt: number;
}
export interface WorkflowEditDiff {
    readonly addedNodes: readonly WorkflowNode[];
    readonly removedNodes: readonly WorkflowNode[];
    readonly changedNodes: readonly {
        readonly before: WorkflowNode;
        readonly after: WorkflowNode;
    }[];
    readonly addedEdges: readonly WorkflowEdge[];
    readonly removedEdges: readonly WorkflowEdge[];
}
export interface SessionWorkflowEditProposalUpdateRequest {
    readonly proposalId: string;
    readonly expectedRevision: number;
    readonly workflow: WorkflowDefinition;
}
export interface SessionWorkflowEditProposalActionRequest {
    readonly proposalId: string;
    readonly expectedRevision: number;
}
export interface SessionEditorStatusRequest {
    readonly workflowId: string;
    readonly baseRevision: number;
    readonly isDirty: boolean;
    readonly sequence: number;
}
export interface SessionWorkflowSaveRequest extends SaveWorkflowRequest {
    readonly expectedAssociationRevision: number;
    readonly draftId?: string;
    readonly expectedDraftRevision?: number;
}
/** A command-generated, session-local graph that is not a saved workflow yet. */
export interface SessionWorkflowDraft {
    readonly sessionId: string;
    readonly draftId: string;
    readonly commandId: string;
    readonly revision: number;
    readonly workflow: WorkflowDefinition;
    readonly model: string;
    readonly createdAt: number;
    readonly updatedAt: number;
}
export interface DiscardSessionDraftRequest {
    readonly draftId: string;
    readonly expectedRevision: number;
}
export interface SessionWorkflowSaveResult {
    readonly workflow: WorkflowDefinition;
    readonly association: SessionWorkflowAssociation;
}
export interface AssociateSessionWorkflowRequest {
    readonly workflowId: string;
    readonly expectedAssociationRevision: number;
}
export interface SessionWorkflowTargetRequest {
    readonly workflowId: string;
}
export interface SessionRunTargetRequest extends SessionWorkflowTargetRequest {
    readonly runId: string;
}
export interface SessionRunActionRequest extends SessionWorkflowTargetRequest {
    readonly action: RunActionRequest['action'];
    readonly runId: string;
    readonly taskId: string;
}
export interface SessionPreviewContextFileRequest extends SessionWorkflowTargetRequest {
    readonly path: string;
}
export interface SessionDraftRequest {
    /** Empty while explicitly creating a new, not-yet-associated workflow. */
    readonly workflowId: string;
    readonly request: DraftRequest;
}
export interface DraftRequest {
    readonly title: string;
    readonly objective: string;
    readonly workspaceDirectory: string;
    readonly outputDirectory: string;
    readonly contextNodes: readonly (FileNode | PromptNode)[];
}
export interface PreviewContextFileRequest {
    readonly path: string;
    readonly workspaceDirectory: string;
}
/** One-level, user-directed folder browsing request. Only directory names return to the Client. */
export interface BrowseDirectoriesRequest {
    readonly path: string;
    /** When present, browsing is confined to this validated workspace. */
    readonly workspaceRoot?: string;
}
export interface BrowseDirectoriesResult {
    readonly path: string;
    readonly parentPath?: string;
    readonly directories: readonly {
        readonly name: string;
        readonly path: string;
    }[];
    readonly truncated: boolean;
}
/** Explicit user action; the Host never creates an output path during save or run setup. */
export interface CreateOutputDirectoryRequest {
    readonly workspaceDirectory: string;
    readonly outputDirectory: string;
}
export interface ContextFilePreview {
    readonly path: string;
    readonly content: string;
    readonly sha256: string;
    readonly size: number;
}
export interface ImportMarkdownRequest {
    readonly text: string;
    readonly workspaceDirectory: string;
    readonly outputDirectory: string;
}
export interface RemoveWorkflowResult {
    readonly removed: boolean;
}
export interface DraftResult {
    readonly workflow: WorkflowDefinition;
    readonly model: string;
}
export type AttemptState = 'running' | 'needs_review' | 'succeeded' | 'failed' | 'cancelled' | 'interrupted';
export type TaskState = 'pending' | 'running' | 'needs_review' | 'succeeded' | 'failed' | 'skipped';
export type WorkflowRunState = 'queued' | 'running' | 'pausing' | 'stopping' | 'paused' | 'verifying' | 'completed' | 'needs_review' | 'failed' | 'cancelled' | 'interrupted' | 'accepted';
/** Live execution facts, separate from the task's business acceptance state. */
export interface TaskActivity {
    readonly phase: 'starting' | 'thinking' | 'tool' | 'waiting_permission' | 'checking' | 'stalled' | 'stopping';
    readonly at: number;
    readonly message: string;
    readonly toolName?: string;
    readonly approvalId?: string;
}
export interface TaskMessage {
    readonly at: number;
    readonly text: string;
}
export interface TaskAttempt {
    readonly number: number;
    readonly state: AttemptState;
    readonly startedAt: number;
    readonly endedAt: number;
    readonly agentId: string;
    /** Durable child-history address; null means an ordinary session, absent on old runs. */
    readonly agentParentSessionId?: string | null;
    readonly toolNames: readonly string[];
    readonly result: string;
    readonly error: string;
    readonly acceptanceMethod: 'pending' | 'automatic' | 'manual';
    readonly artifactChecks: readonly ArtifactCheckResult[];
    readonly reviewDecision: 'accepted' | 'rejected' | '';
    /** Optional so old saved runs remain readable without rewriting their history. */
    readonly activity?: TaskActivity;
    readonly messages?: readonly TaskMessage[];
    /** Stable inputs recorded when this attempt was dispatched; absent on pre-Alpha.6 history. */
    readonly semanticFingerprint?: string;
    readonly contextHash?: string;
    readonly dependencyHash?: string;
}
export interface ArtifactCheckResult {
    readonly path: string;
    readonly type: 'file_exists' | 'file_contains';
    readonly exists: boolean;
    readonly passed: boolean;
    readonly size: number;
    readonly error: string;
    /** Present when the host could safely hash the current file contents. */
    readonly sha256?: string;
}
export interface RunTask {
    readonly taskId: NodeId;
    readonly state: TaskState;
    readonly attempts: readonly TaskAttempt[];
    readonly result: string;
    /** Reused outcomes are explicit references, not fabricated attempts in this run. */
    readonly reusedFromRunId?: RunId;
    readonly reusedFromAttemptNumber?: number;
    readonly reusedArtifactChecks?: readonly ArtifactCheckResult[];
    /** Inherited signatures allow safe reuse to be traced across multiple applied revisions. */
    readonly semanticFingerprint?: string;
    readonly contextHash?: string;
    readonly dependencyHash?: string;
}
export interface RunEvent {
    readonly seq: number;
    readonly at: number;
    readonly type: string;
    readonly taskId: string;
    readonly message: string;
}
export interface VerificationResult {
    readonly status: 'pending' | 'passed' | 'failed' | 'blocked';
    readonly summary: string;
    readonly checkedAt: number;
    readonly agentId: string;
    readonly toolNames: readonly string[];
}
export interface WorkflowRun {
    readonly id: RunId;
    readonly requestId: string;
    readonly workflowId: string;
    /** DSH session resolved by the Host for session-scoped runs; absent on legacy/global runs. */
    readonly sessionId?: string;
    readonly workflow: WorkflowDefinition;
    readonly state: WorkflowRunState;
    readonly createdAt: number;
    readonly startedAt: number;
    readonly endedAt: number;
    readonly tasks: readonly RunTask[];
    readonly contextSnapshots: readonly ContextSnapshot[];
    readonly verification: VerificationResult;
    readonly events: readonly RunEvent[];
    readonly error: string;
    readonly parentRunId?: RunId;
    readonly invalidatedTaskIds?: readonly NodeId[];
    readonly supersededByRunId?: RunId;
}
export interface ContextSnapshot {
    readonly nodeId: string;
    readonly title: string;
    readonly sourcePath: string;
    readonly sha256: string;
    readonly content: string;
}
export interface SaveWorkflowRequest {
    readonly workflow: WorkflowDefinition;
    readonly expectedRevision: number;
}
export interface RemoveWorkflowRequest {
    readonly workflowId: string;
}
export interface StartRunRequest {
    readonly workflowId: string;
    readonly requestId: string;
}
export interface RunActionRequest {
    readonly runId: string;
    readonly action: 'pause' | 'resume' | 'cancel' | 'recover' | 'retry' | 'verify' | 'accept' | 'reject' | 'apply';
    readonly taskId: string;
}
//# sourceMappingURL=types.d.ts.map