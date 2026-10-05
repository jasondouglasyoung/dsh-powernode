import type { Context } from '@deepseek-ai/cordis'
import { Remote, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol'
import type {
  AssociateSessionWorkflowRequest,
  BrowseDirectoriesRequest,
  BrowseDirectoriesResult,
  ContextFilePreview,
  CreateOutputDirectoryRequest,
  DiscardSessionDraftRequest,
  DraftRequest,
  DraftResult,
  ImportMarkdownRequest,
  PendingEditProposalSummary,
  PendingSessionDraftSummary,
  PreviewContextFileRequest,
  RemoveWorkflowRequest,
  RemoveWorkflowResult,
  RunActionRequest,
  SaveWorkflowRequest,
  SessionDraftRequest,
  SessionPreviewContextFileRequest,
  SessionRunActionRequest,
  SessionRunTargetRequest,
  SessionWorkflowAssociation,
  SessionWorkflowEditProposal,
  SessionWorkflowEditProposalActionRequest,
  SessionWorkflowEditProposalUpdateRequest,
  SessionEditorStatusRequest,
  SessionWorkflowSaveRequest,
  SessionWorkflowSaveResult,
  SessionWorkflowState,
  StartRunRequest,
  WorkflowDefinition,
  WorkflowRun,
  WorkflowSummary,
} from '../shared/types.js'

/**
 * Small source surface used to generate DSH's strict Host/Client contract.
 * Runtime behavior lives in WorkflowService; these bodies are never installed.
 */
export default class WorkflowRemoteContract extends TypertRemoteService {
  constructor(ctx: Context) {
    super(ctx, 'dshWorkflow')
  }

  @Remote
  async list(): Promise<readonly WorkflowSummary[]> { throw new Error('contract only') }

  @Remote
  async listPendingEditProposals(): Promise<readonly PendingEditProposalSummary[]> { throw new Error('contract only') }

  @Remote
  async listPendingSessionDrafts(): Promise<readonly PendingSessionDraftSummary[]> { throw new Error('contract only') }

  @Remote
  async get(workflowId: string): Promise<WorkflowDefinition> { throw new Error('contract only') }

  @Remote
  async sessionState(sessionId: string): Promise<SessionWorkflowState> { throw new Error('contract only') }

  @Remote
  async sessionEditorStatus(sessionId: string, request: SessionEditorStatusRequest & { readonly clientId: string }): Promise<void> { throw new Error('contract only') }

  @Remote
  async sessionEditProposalUpdate(sessionId: string, request: SessionWorkflowEditProposalUpdateRequest): Promise<SessionWorkflowEditProposal> { throw new Error('contract only') }

  @Remote
  async sessionEditProposalApply(sessionId: string, request: SessionWorkflowEditProposalActionRequest): Promise<WorkflowDefinition> { throw new Error('contract only') }

  @Remote
  async sessionEditProposalDiscard(sessionId: string, request: SessionWorkflowEditProposalActionRequest): Promise<void> { throw new Error('contract only') }

  @Remote
  async sessionDiscardDraft(sessionId: string, request: DiscardSessionDraftRequest): Promise<void> { throw new Error('contract only') }

  @Remote
  async sessionGet(sessionId: string, workflowId: string): Promise<WorkflowDefinition> { throw new Error('contract only') }

  @Remote
  async sessionAssociate(sessionId: string, request: AssociateSessionWorkflowRequest): Promise<SessionWorkflowAssociation> { throw new Error('contract only') }

  @Remote
  async sessionSave(sessionId: string, request: SessionWorkflowSaveRequest): Promise<SessionWorkflowSaveResult> { throw new Error('contract only') }

  @Remote
  async sessionRuns(sessionId: string, workflowId: string): Promise<readonly WorkflowRun[]> { throw new Error('contract only') }

  @Remote
  async sessionGetRun(sessionId: string, request: SessionRunTargetRequest): Promise<WorkflowRun> { throw new Error('contract only') }

  @Remote
  async sessionPreviewFile(sessionId: string, request: SessionPreviewContextFileRequest): Promise<ContextFilePreview> { throw new Error('contract only') }

  @Remote
  async sessionGenerateDraft(sessionId: string, request: SessionDraftRequest, signal: AbortSignal): Promise<DraftResult> { throw new Error('contract only') }

  @Remote
  async sessionStartRun(sessionId: string, request: StartRunRequest): Promise<WorkflowRun> { throw new Error('contract only') }

  @Remote
  async sessionAction(sessionId: string, request: SessionRunActionRequest): Promise<WorkflowRun> { throw new Error('contract only') }

  @Remote
  async save(request: SaveWorkflowRequest): Promise<WorkflowDefinition> { throw new Error('contract only') }

  @Remote
  async removeWorkflow(request: RemoveWorkflowRequest): Promise<RemoveWorkflowResult> { throw new Error('contract only') }

  @Remote
  async importMarkdown(request: ImportMarkdownRequest): Promise<WorkflowDefinition> { throw new Error('contract only') }

  @Remote
  async previewFile(request: PreviewContextFileRequest): Promise<ContextFilePreview> { throw new Error('contract only') }

  @Remote
  async browseDirectories(request: BrowseDirectoriesRequest): Promise<BrowseDirectoriesResult> { throw new Error('contract only') }

  @Remote
  async createOutputDirectory(request: CreateOutputDirectoryRequest): Promise<string> { throw new Error('contract only') }

  @Remote
  async generateDraft(request: DraftRequest, signal: AbortSignal): Promise<DraftResult> { throw new Error('contract only') }

  @Remote
  async runs(workflowId: string): Promise<readonly WorkflowRun[]> { throw new Error('contract only') }

  @Remote
  async getRun(runId: string): Promise<WorkflowRun> { throw new Error('contract only') }

  @Remote
  async startRun(request: StartRunRequest): Promise<WorkflowRun> { throw new Error('contract only') }

  @Remote
  async action(request: RunActionRequest): Promise<WorkflowRun> { throw new Error('contract only') }
}

declare module '@deepseek-ai/cordis' {
  interface Context {
    /** Host service consumed through the generated DSH Remote API. */
    dshWorkflow: WorkflowRemoteContract
  }
}
