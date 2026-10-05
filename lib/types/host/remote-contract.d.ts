import type { Context } from '@deepseek-ai/cordis';
import { TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';
import type { AssociateSessionWorkflowRequest, BrowseDirectoriesRequest, BrowseDirectoriesResult, ContextFilePreview, CreateOutputDirectoryRequest, DiscardSessionDraftRequest, DraftRequest, DraftResult, ImportMarkdownRequest, PendingEditProposalSummary, PendingSessionDraftSummary, PreviewContextFileRequest, RemoveWorkflowRequest, RemoveWorkflowResult, RunActionRequest, SaveWorkflowRequest, SessionDraftRequest, SessionPreviewContextFileRequest, SessionRunActionRequest, SessionRunTargetRequest, SessionWorkflowAssociation, SessionWorkflowEditProposal, SessionWorkflowEditProposalActionRequest, SessionWorkflowEditProposalUpdateRequest, SessionEditorStatusRequest, SessionWorkflowSaveRequest, SessionWorkflowSaveResult, SessionWorkflowState, StartRunRequest, WorkflowDefinition, WorkflowRun, WorkflowSummary } from '../shared/types.js';
/**
 * Small source surface used to generate DSH's strict Host/Client contract.
 * Runtime behavior lives in WorkflowService; these bodies are never installed.
 */
export default class WorkflowRemoteContract extends TypertRemoteService {
    constructor(ctx: Context);
    list(): Promise<readonly WorkflowSummary[]>;
    listPendingEditProposals(): Promise<readonly PendingEditProposalSummary[]>;
    listPendingSessionDrafts(): Promise<readonly PendingSessionDraftSummary[]>;
    get(workflowId: string): Promise<WorkflowDefinition>;
    sessionState(sessionId: string): Promise<SessionWorkflowState>;
    sessionEditorStatus(sessionId: string, request: SessionEditorStatusRequest & {
        readonly clientId: string;
    }): Promise<void>;
    sessionEditProposalUpdate(sessionId: string, request: SessionWorkflowEditProposalUpdateRequest): Promise<SessionWorkflowEditProposal>;
    sessionEditProposalApply(sessionId: string, request: SessionWorkflowEditProposalActionRequest): Promise<WorkflowDefinition>;
    sessionEditProposalDiscard(sessionId: string, request: SessionWorkflowEditProposalActionRequest): Promise<void>;
    sessionDiscardDraft(sessionId: string, request: DiscardSessionDraftRequest): Promise<void>;
    sessionGet(sessionId: string, workflowId: string): Promise<WorkflowDefinition>;
    sessionAssociate(sessionId: string, request: AssociateSessionWorkflowRequest): Promise<SessionWorkflowAssociation>;
    sessionSave(sessionId: string, request: SessionWorkflowSaveRequest): Promise<SessionWorkflowSaveResult>;
    sessionRuns(sessionId: string, workflowId: string): Promise<readonly WorkflowRun[]>;
    sessionGetRun(sessionId: string, request: SessionRunTargetRequest): Promise<WorkflowRun>;
    sessionPreviewFile(sessionId: string, request: SessionPreviewContextFileRequest): Promise<ContextFilePreview>;
    sessionGenerateDraft(sessionId: string, request: SessionDraftRequest, signal: AbortSignal): Promise<DraftResult>;
    sessionStartRun(sessionId: string, request: StartRunRequest): Promise<WorkflowRun>;
    sessionAction(sessionId: string, request: SessionRunActionRequest): Promise<WorkflowRun>;
    save(request: SaveWorkflowRequest): Promise<WorkflowDefinition>;
    removeWorkflow(request: RemoveWorkflowRequest): Promise<RemoveWorkflowResult>;
    importMarkdown(request: ImportMarkdownRequest): Promise<WorkflowDefinition>;
    previewFile(request: PreviewContextFileRequest): Promise<ContextFilePreview>;
    browseDirectories(request: BrowseDirectoriesRequest): Promise<BrowseDirectoriesResult>;
    createOutputDirectory(request: CreateOutputDirectoryRequest): Promise<string>;
    generateDraft(request: DraftRequest, signal: AbortSignal): Promise<DraftResult>;
    runs(workflowId: string): Promise<readonly WorkflowRun[]>;
    getRun(runId: string): Promise<WorkflowRun>;
    startRun(request: StartRunRequest): Promise<WorkflowRun>;
    action(request: RunActionRequest): Promise<WorkflowRun>;
}
declare module '@deepseek-ai/cordis' {
    interface Context {
        /** Host service consumed through the generated DSH Remote API. */
        dshWorkflow: WorkflowRemoteContract;
    }
}
//# sourceMappingURL=remote-contract.d.ts.map