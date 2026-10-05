var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
import { Remote, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';
let WorkflowRemoteContract = (() => {
    let _classSuper = TypertRemoteService;
    let _instanceExtraInitializers = [];
    let _list_decorators;
    let _listPendingEditProposals_decorators;
    let _listPendingSessionDrafts_decorators;
    let _get_decorators;
    let _sessionState_decorators;
    let _sessionEditorStatus_decorators;
    let _sessionEditProposalUpdate_decorators;
    let _sessionEditProposalApply_decorators;
    let _sessionEditProposalDiscard_decorators;
    let _sessionDiscardDraft_decorators;
    let _sessionGet_decorators;
    let _sessionAssociate_decorators;
    let _sessionSave_decorators;
    let _sessionRuns_decorators;
    let _sessionGetRun_decorators;
    let _sessionPreviewFile_decorators;
    let _sessionGenerateDraft_decorators;
    let _sessionStartRun_decorators;
    let _sessionAction_decorators;
    let _save_decorators;
    let _removeWorkflow_decorators;
    let _importMarkdown_decorators;
    let _previewFile_decorators;
    let _browseDirectories_decorators;
    let _createOutputDirectory_decorators;
    let _generateDraft_decorators;
    let _runs_decorators;
    let _getRun_decorators;
    let _startRun_decorators;
    let _action_decorators;
    return class WorkflowRemoteContract extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _list_decorators = [Remote];
            _listPendingEditProposals_decorators = [Remote];
            _listPendingSessionDrafts_decorators = [Remote];
            _get_decorators = [Remote];
            _sessionState_decorators = [Remote];
            _sessionEditorStatus_decorators = [Remote];
            _sessionEditProposalUpdate_decorators = [Remote];
            _sessionEditProposalApply_decorators = [Remote];
            _sessionEditProposalDiscard_decorators = [Remote];
            _sessionDiscardDraft_decorators = [Remote];
            _sessionGet_decorators = [Remote];
            _sessionAssociate_decorators = [Remote];
            _sessionSave_decorators = [Remote];
            _sessionRuns_decorators = [Remote];
            _sessionGetRun_decorators = [Remote];
            _sessionPreviewFile_decorators = [Remote];
            _sessionGenerateDraft_decorators = [Remote];
            _sessionStartRun_decorators = [Remote];
            _sessionAction_decorators = [Remote];
            _save_decorators = [Remote];
            _removeWorkflow_decorators = [Remote];
            _importMarkdown_decorators = [Remote];
            _previewFile_decorators = [Remote];
            _browseDirectories_decorators = [Remote];
            _createOutputDirectory_decorators = [Remote];
            _generateDraft_decorators = [Remote];
            _runs_decorators = [Remote];
            _getRun_decorators = [Remote];
            _startRun_decorators = [Remote];
            _action_decorators = [Remote];
            __esDecorate(this, null, _list_decorators, { kind: "method", name: "list", static: false, private: false, access: { has: obj => "list" in obj, get: obj => obj.list }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _listPendingEditProposals_decorators, { kind: "method", name: "listPendingEditProposals", static: false, private: false, access: { has: obj => "listPendingEditProposals" in obj, get: obj => obj.listPendingEditProposals }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _listPendingSessionDrafts_decorators, { kind: "method", name: "listPendingSessionDrafts", static: false, private: false, access: { has: obj => "listPendingSessionDrafts" in obj, get: obj => obj.listPendingSessionDrafts }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _get_decorators, { kind: "method", name: "get", static: false, private: false, access: { has: obj => "get" in obj, get: obj => obj.get }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sessionState_decorators, { kind: "method", name: "sessionState", static: false, private: false, access: { has: obj => "sessionState" in obj, get: obj => obj.sessionState }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sessionEditorStatus_decorators, { kind: "method", name: "sessionEditorStatus", static: false, private: false, access: { has: obj => "sessionEditorStatus" in obj, get: obj => obj.sessionEditorStatus }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sessionEditProposalUpdate_decorators, { kind: "method", name: "sessionEditProposalUpdate", static: false, private: false, access: { has: obj => "sessionEditProposalUpdate" in obj, get: obj => obj.sessionEditProposalUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sessionEditProposalApply_decorators, { kind: "method", name: "sessionEditProposalApply", static: false, private: false, access: { has: obj => "sessionEditProposalApply" in obj, get: obj => obj.sessionEditProposalApply }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sessionEditProposalDiscard_decorators, { kind: "method", name: "sessionEditProposalDiscard", static: false, private: false, access: { has: obj => "sessionEditProposalDiscard" in obj, get: obj => obj.sessionEditProposalDiscard }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sessionDiscardDraft_decorators, { kind: "method", name: "sessionDiscardDraft", static: false, private: false, access: { has: obj => "sessionDiscardDraft" in obj, get: obj => obj.sessionDiscardDraft }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sessionGet_decorators, { kind: "method", name: "sessionGet", static: false, private: false, access: { has: obj => "sessionGet" in obj, get: obj => obj.sessionGet }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sessionAssociate_decorators, { kind: "method", name: "sessionAssociate", static: false, private: false, access: { has: obj => "sessionAssociate" in obj, get: obj => obj.sessionAssociate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sessionSave_decorators, { kind: "method", name: "sessionSave", static: false, private: false, access: { has: obj => "sessionSave" in obj, get: obj => obj.sessionSave }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sessionRuns_decorators, { kind: "method", name: "sessionRuns", static: false, private: false, access: { has: obj => "sessionRuns" in obj, get: obj => obj.sessionRuns }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sessionGetRun_decorators, { kind: "method", name: "sessionGetRun", static: false, private: false, access: { has: obj => "sessionGetRun" in obj, get: obj => obj.sessionGetRun }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sessionPreviewFile_decorators, { kind: "method", name: "sessionPreviewFile", static: false, private: false, access: { has: obj => "sessionPreviewFile" in obj, get: obj => obj.sessionPreviewFile }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sessionGenerateDraft_decorators, { kind: "method", name: "sessionGenerateDraft", static: false, private: false, access: { has: obj => "sessionGenerateDraft" in obj, get: obj => obj.sessionGenerateDraft }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sessionStartRun_decorators, { kind: "method", name: "sessionStartRun", static: false, private: false, access: { has: obj => "sessionStartRun" in obj, get: obj => obj.sessionStartRun }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sessionAction_decorators, { kind: "method", name: "sessionAction", static: false, private: false, access: { has: obj => "sessionAction" in obj, get: obj => obj.sessionAction }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _save_decorators, { kind: "method", name: "save", static: false, private: false, access: { has: obj => "save" in obj, get: obj => obj.save }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _removeWorkflow_decorators, { kind: "method", name: "removeWorkflow", static: false, private: false, access: { has: obj => "removeWorkflow" in obj, get: obj => obj.removeWorkflow }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _importMarkdown_decorators, { kind: "method", name: "importMarkdown", static: false, private: false, access: { has: obj => "importMarkdown" in obj, get: obj => obj.importMarkdown }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _previewFile_decorators, { kind: "method", name: "previewFile", static: false, private: false, access: { has: obj => "previewFile" in obj, get: obj => obj.previewFile }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _browseDirectories_decorators, { kind: "method", name: "browseDirectories", static: false, private: false, access: { has: obj => "browseDirectories" in obj, get: obj => obj.browseDirectories }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _createOutputDirectory_decorators, { kind: "method", name: "createOutputDirectory", static: false, private: false, access: { has: obj => "createOutputDirectory" in obj, get: obj => obj.createOutputDirectory }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _generateDraft_decorators, { kind: "method", name: "generateDraft", static: false, private: false, access: { has: obj => "generateDraft" in obj, get: obj => obj.generateDraft }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _runs_decorators, { kind: "method", name: "runs", static: false, private: false, access: { has: obj => "runs" in obj, get: obj => obj.runs }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getRun_decorators, { kind: "method", name: "getRun", static: false, private: false, access: { has: obj => "getRun" in obj, get: obj => obj.getRun }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _startRun_decorators, { kind: "method", name: "startRun", static: false, private: false, access: { has: obj => "startRun" in obj, get: obj => obj.startRun }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _action_decorators, { kind: "method", name: "action", static: false, private: false, access: { has: obj => "action" in obj, get: obj => obj.action }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        constructor(ctx) {
            super(ctx, 'dshWorkflow');
            __runInitializers(this, _instanceExtraInitializers);
        }
        async list() { throw new Error('contract only'); }
        async listPendingEditProposals() { throw new Error('contract only'); }
        async listPendingSessionDrafts() { throw new Error('contract only'); }
        async get(workflowId) { throw new Error('contract only'); }
        async sessionState(sessionId) { throw new Error('contract only'); }
        async sessionEditorStatus(sessionId, request) { throw new Error('contract only'); }
        async sessionEditProposalUpdate(sessionId, request) { throw new Error('contract only'); }
        async sessionEditProposalApply(sessionId, request) { throw new Error('contract only'); }
        async sessionEditProposalDiscard(sessionId, request) { throw new Error('contract only'); }
        async sessionDiscardDraft(sessionId, request) { throw new Error('contract only'); }
        async sessionGet(sessionId, workflowId) { throw new Error('contract only'); }
        async sessionAssociate(sessionId, request) { throw new Error('contract only'); }
        async sessionSave(sessionId, request) { throw new Error('contract only'); }
        async sessionRuns(sessionId, workflowId) { throw new Error('contract only'); }
        async sessionGetRun(sessionId, request) { throw new Error('contract only'); }
        async sessionPreviewFile(sessionId, request) { throw new Error('contract only'); }
        async sessionGenerateDraft(sessionId, request, signal) { throw new Error('contract only'); }
        async sessionStartRun(sessionId, request) { throw new Error('contract only'); }
        async sessionAction(sessionId, request) { throw new Error('contract only'); }
        async save(request) { throw new Error('contract only'); }
        async removeWorkflow(request) { throw new Error('contract only'); }
        async importMarkdown(request) { throw new Error('contract only'); }
        async previewFile(request) { throw new Error('contract only'); }
        async browseDirectories(request) { throw new Error('contract only'); }
        async createOutputDirectory(request) { throw new Error('contract only'); }
        async generateDraft(request, signal) { throw new Error('contract only'); }
        async runs(workflowId) { throw new Error('contract only'); }
        async getRun(runId) { throw new Error('contract only'); }
        async startRun(request) { throw new Error('contract only'); }
        async action(request) { throw new Error('contract only'); }
    };
})();
/**
 * Small source surface used to generate DSH's strict Host/Client contract.
 * Runtime behavior lives in WorkflowService; these bodies are never installed.
 */
export default WorkflowRemoteContract;
//# sourceMappingURL=remote-contract.js.map