import { rename } from 'node:fs/promises';
import type { ArtifactCheckResult, PendingEditProposalSummary, PendingSessionDraftSummary, SessionWorkflowAssociation, SessionWorkflowDraft, SessionWorkflowEditProposal, WorkflowDefinition, WorkflowRun } from '../shared/types.js';
interface StoreData {
    readonly schemaVersion: number;
    workflows: WorkflowDefinition[];
    runs: WorkflowRun[];
    associations: SessionWorkflowAssociation[];
    sessionDrafts: SessionWorkflowDraft[];
    editProposals: SessionWorkflowEditProposal[];
}
interface LockRecord {
    readonly pid: number;
    readonly runId: string;
    readonly nonce: string;
    readonly createdAt: number;
}
/** Windows scanners/indexers may briefly hold the previous state file during replace. */
export declare function renameWithTransientRetry(source: string, destination: string, renameFile?: typeof rename, wait?: (milliseconds: number) => Promise<void>, signal?: AbortSignal): Promise<void>;
export declare function emptyStore(): StoreData;
export declare function cloneValue<T>(value: T): T;
export declare class WorkflowStorage {
    readonly root: string;
    private readonly statePath;
    private readonly lockPath;
    private localQueue;
    private data;
    constructor();
    initialize(): Promise<void>;
    listWorkflows(): readonly WorkflowDefinition[];
    getWorkflow(id: string): WorkflowDefinition | undefined;
    getSessionAssociation(sessionId: string): SessionWorkflowAssociation | undefined;
    getSessionDraft(sessionId: string): SessionWorkflowDraft | undefined;
    getSessionEditProposal(sessionId: string): SessionWorkflowEditProposal | undefined;
    listPendingEditProposals(): readonly PendingEditProposalSummary[];
    listPendingSessionDrafts(): readonly PendingSessionDraftSummary[];
    withSessionDraftLock<T>(sessionId: string, operation: () => Promise<T>, signal?: AbortSignal): Promise<T>;
    listRuns(workflowId?: string): readonly WorkflowRun[];
    getRun(id: string): WorkflowRun | undefined;
    refresh(): Promise<void>;
    findRunByRequestId(requestId: string): WorkflowRun | undefined;
    hasActiveRun(workflowId?: string): boolean;
    saveWorkflow(workflow: WorkflowDefinition, expectedRevision: number): Promise<WorkflowDefinition>;
    /** Save a graph and link it to one session under the same cross-process write lock. */
    saveWorkflowForSession(workflow: WorkflowDefinition, expectedRevision: number, sessionId: string, expectedAssociationRevision: number, draftCommit?: {
        readonly draftId: string;
        readonly expectedDraftRevision: number;
    }): Promise<{
        workflow: WorkflowDefinition;
        association: SessionWorkflowAssociation;
    }>;
    saveSessionDraft(draft: Omit<SessionWorkflowDraft, 'revision' | 'updatedAt'>, expectedRevision: number, signal?: AbortSignal): Promise<SessionWorkflowDraft>;
    discardSessionDraft(sessionId: string, draftId: string, expectedRevision: number): Promise<void>;
    saveSessionEditProposal(proposal: Omit<SessionWorkflowEditProposal, 'revision' | 'updatedAt'>, expectedRevision?: number, signal?: AbortSignal): Promise<SessionWorkflowEditProposal>;
    updateSessionEditProposal(sessionId: string, proposalId: string, expectedRevision: number, workflow: WorkflowDefinition): Promise<SessionWorkflowEditProposal>;
    applySessionEditProposal(sessionId: string, proposalId: string, expectedProposalRevision: number): Promise<WorkflowDefinition>;
    discardSessionEditProposal(sessionId: string, proposalId: string, expectedRevision: number): Promise<void>;
    associateSessionWorkflow(sessionId: string, workflowId: string, expectedAssociationRevision: number): Promise<SessionWorkflowAssociation>;
    removeWorkflow(id: string): Promise<void>;
    saveRun(run: WorkflowRun): Promise<void>;
    withRunLock<T>(runId: string, operation: () => Promise<T>): Promise<T>;
    acquireRunLock(runId: string): Promise<LockRecord>;
    releaseRunLock(lock: LockRecord): Promise<void>;
    canonicalWorkspaceDirectory(input: string): Promise<string>;
    normalizeOutputPath(input: string, workspaceInput: string): Promise<string>;
    normalizeWorkspacePath(input: string, workspaceInput: string, code?: string): Promise<string>;
    canonicalOutputDirectory(input: string, workspaceInput: string, create: boolean): Promise<string>;
    assertOutputDirectoryWritable(input: string, workspaceInput: string): Promise<string>;
    createOutputDirectory(input: string, workspaceInput: string): Promise<string>;
    browseDirectories(input: string, workspaceInput?: string): Promise<{
        path: string;
        parentPath?: string;
        directories: {
            name: string;
            path: string;
        }[];
        truncated: boolean;
    }>;
    readContextFile(input: string, workspaceInput: string): Promise<{
        path: string;
        content: string;
        sha256: string;
        size: number;
    }>;
    checkOutputArtifact(path: string, workflow: WorkflowDefinition, expectedText?: string): Promise<ArtifactCheckResult>;
    private mutate;
    private refreshFromDisk;
    private recoverInterruptedRuns;
    private persist;
    private withWriteLock;
    private acquireLock;
    private releaseLock;
}
export {};
//# sourceMappingURL=storage.d.ts.map