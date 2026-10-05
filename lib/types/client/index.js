import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, Handle, MarkerType, MiniMap, Position as FlowPosition, ReactFlow } from '@xyflow/react';
import reactFlowStyles from '@xyflow/react/dist/style.css?inline';
import React, { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import TYPERT_REMOTE from '../../lib/typert.remote-client.js';
import { validateWorkflow } from '../domain/graph.js';
import { canGenerateFromInitialPrompt, getWorkflowProtectionMessage, hasWorkflowChangesSinceSnapshot } from '../domain/workflow-safety.js';
import { normalizeDirectoryInput } from '../shared/path-input.js';
import { describeWorkflowNodeChanges } from './edit-summary.js';
import { clearPowernodeCommandStatuses, getLatestPowernodeCommandStatus, getPowernodeCommandStatus, publishPowernodeCommandStatus, subscribeLatestPowernodeCommandStatus, subscribePowernodeCommandStatus } from './command-progress.js';
import workflowStyles from './workflow.css?inline';
import { registerWorkflowChat, WorkflowConversation } from './workflow-chat.js';
import { watchRun } from './run-sync.js';
import { RunProgress } from './run-progress.js';
import { taskProgressLabel, taskProgressState } from '../domain/run-progress.js';
import { clearSessionRuns, latestSessionRun, publishSessionRun, subscribeSessionRun } from './run-state.js';
import '@deepseek-ai/dsh-api-gateway/client';
import '@deepseek-ai/dsh-client-ui-layout/client';
import '@deepseek-ai/dsh-client-ui-sidebar/client';
import '@deepseek-ai/dsh-client-ui-renderer/client';
import '@deepseek-ai/dsh-client-ui-commands/client';
import '@deepseek-ai/dsh-client-ui-conversation/client';
import '@deepseek-ai/dsh-api-workspace-controller/client';
const PANEL_ID = 'dsh-workflow';
const SESSION_PANEL_ID = 'dsh-workflow-session';
const CONVERSATION_VIEW_ID = 'dsh-workflow';
const DEFAULT_TASKS = [
    { title: '任务 1', instructions: '写明要做的事情、执行步骤和完成标准。' },
];
export const name = 'dsh-workflow-plugin-client';
export const inject = ['remote', 'layout', 'slots', 'theme', 'commandUi', 'sessions'];
let requestedSessionId;
const requestedTaskIds = new Map();
const requestedSessionListeners = new Set();
const retainedEditorState = new Map();
const sessionDraftListeners = new Map();
const commandSessions = new Map();
const clientId = `client-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const editorStatusSequences = new Map();
const parkedEditors = new Map();
function subscribeRequestedSession(listener) {
    requestedSessionListeners.add(listener);
    return () => requestedSessionListeners.delete(listener);
}
function getRequestedSession() {
    return requestedSessionId;
}
function subscribeSessionDraft(sessionId, listener) {
    const listeners = sessionDraftListeners.get(sessionId) ?? new Set();
    listeners.add(listener);
    sessionDraftListeners.set(sessionId, listeners);
    return () => {
        listeners.delete(listener);
        if (!listeners.size)
            sessionDraftListeners.delete(sessionId);
    };
}
function notifySessionDraft(sessionId) {
    for (const listener of sessionDraftListeners.get(sessionId) ?? [])
        listener();
}
function requestSessionPanel(ctx, sessionId, taskId = '') {
    requestedSessionId = sessionId;
    requestedTaskIds.set(sessionId, taskId);
    for (const listener of requestedSessionListeners)
        listener();
    ctx.layout.selectPanel(SESSION_PANEL_ID);
}
function useRetainedState(scope, name, initial) {
    const key = `${scope}:${name}`;
    const [value, setValue] = useState(() => retainedEditorState.has(key) ? retainedEditorState.get(key) : initial());
    const setRetained = useCallback((next) => {
        setValue((previous) => {
            const value = typeof next === 'function' ? next(previous) : next;
            retainedEditorState.set(key, value);
            while (retainedEditorState.size > 800)
                retainedEditorState.delete(retainedEditorState.keys().next().value);
            return value;
        });
    }, [key]);
    return [value, setRetained];
}
export async function apply(ctx) {
    // Mount the generated Host contribution before a panel can call ctx.remote.dshWorkflow.
    // ClientRemote binds the disposer to this plugin fiber.
    let remoteFailure = '';
    let workflowRemote;
    try {
        await ctx.remote.$mount(TYPERT_REMOTE);
        await ctx.inject(['remote.dshWorkflow'], async (remoteCtx) => {
            workflowRemote = remoteCtx.remote.dshWorkflow;
            // Cordis exposes Remote namespaces as independently injected services.
            // Pass the child context that actually injects directoryPicker to every
            // rendered panel; a type-only import cannot make that service available.
            if (remoteCtx.get('remote.directoryPicker')) {
                await remoteCtx.inject(['remote.directoryPicker'], (directoryPickerCtx) => {
                    registerWorkflowUI(directoryPickerCtx, workflowRemote, '');
                });
            }
            else {
                registerWorkflowUI(remoteCtx, workflowRemote, '');
            }
        });
    }
    catch (cause) {
        remoteFailure = `DSH Remote 初始化失败：${errorMessage(cause)}`;
        registerWorkflowUI(ctx, workflowRemote, remoteFailure);
    }
}
function registerWorkflowUI(ctx, remoteApi, remoteFailure) {
    registerWorkflowChat(ctx);
    const style = document.createElement('style');
    style.dataset.dshWorkflowPlugin = 'styles';
    style.textContent = `${reactFlowStyles}\n${workflowStyles}`;
    document.head.append(style);
    ctx.effect(() => () => style.remove());
    ctx.effect(() => {
        const dispose = ctx.on('session/event', (session, event) => {
            const payload = event.data;
            if (event.type === 'command/run' && payload.name === 'powernode' && payload.commandId) {
                commandSessions.set(payload.commandId, session.id);
                const args = event.data.args ?? '';
                publishPowernodeCommandStatus(session.id, {
                    commandId: payload.commandId,
                    kind: /^\s*edit\b/iu.test(args) ? 'proposal' : 'draft',
                    phase: 'generating',
                });
                return;
            }
            if (event.type === 'command/done' && payload.commandId) {
                const sessionId = commandSessions.get(payload.commandId);
                commandSessions.delete(payload.commandId);
                if (sessionId) {
                    const previous = getPowernodeCommandStatus(sessionId);
                    const text = event.data.text ?? '';
                    const cancelled = payload.kind !== 'success' && /取消|aborted|abort/iu.test(text);
                    publishPowernodeCommandStatus(sessionId, {
                        commandId: payload.commandId,
                        kind: previous?.commandId === payload.commandId ? previous.kind : 'draft',
                        phase: payload.kind === 'success' ? 'complete' : cancelled ? 'cancelled' : 'failed',
                        message: text,
                    });
                    if (payload.kind === 'success')
                        notifySessionDraft(sessionId);
                }
            }
        });
        return () => {
            dispose();
            commandSessions.clear();
            clearPowernodeCommandStatuses();
            clearSessionRuns();
            requestedTaskIds.clear();
            sessionDraftListeners.clear();
        };
    });
    ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: PANEL_ID, registrant: 'dsh-workflow-plugin' }, ({ renderFactorySlot }) => _jsx(WorkflowPanel, { ctx: ctx, remoteFailure: remoteFailure, remoteApi: remoteApi, renderFactorySlot: renderFactorySlot })));
    ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: SESSION_PANEL_ID, registrant: 'dsh-workflow-plugin' }, ({ renderFactorySlot }) => _jsx(SessionWorkflowPanel, { ctx: ctx, remoteFailure: remoteFailure, remoteApi: remoteApi, renderFactorySlot: renderFactorySlot })));
    ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({ name: 'sidebar.panellist', id: PANEL_ID, order: 45, label: '工作流', registrant: 'dsh-workflow-plugin' }, ({ size }) => _jsxs("span", { className: "dsh-wp-sidebar-icon", style: { width: size, height: size }, "aria-hidden": "true", children: [_jsx("i", {}), _jsx("i", {}), _jsx("i", {})] })));
    ctx.slots.inject('conversation.view', () => ctx.slots.register({
        name: 'conversation.view',
        id: CONVERSATION_VIEW_ID,
        order: 40,
        label: () => '工作流',
    }, (props) => _jsx(WorkflowWorkspaceEntry, { ctx: ctx, sessionId: props.sessionId, openView: props.openView }, props.sessionId)));
    ctx.slots.inject('conversation.session.header.actions', () => ctx.slots.register({ name: 'conversation.session.header.actions', id: 'dsh-workflow-pending-action', order: 70, registrant: 'dsh-workflow-plugin' }, (props) => _jsx(PendingWorkflowAction, { remoteApi: remoteApi, sessionId: props.sessionId, selectView: () => requestSessionPanel(ctx, props.sessionId) })));
    ctx.slots.inject('conversation.header.leading', () => ctx.slots.register({ name: 'conversation.header.leading', registrant: 'dsh-workflow-plugin' }, () => _jsx(LatestCommandProgressAction, { onOpen: (sessionId) => requestSessionPanel(ctx, sessionId) })));
    ctx.slots.inject('conversation.input.dock', () => ctx.slots.register({ name: 'conversation.input.dock', id: 'dsh-workflow-run-progress', order: 30, registrant: 'dsh-workflow-plugin' }, ({ sessionId }) => _jsx(SessionRunDock, { ctx: ctx, remoteApi: remoteApi, sessionId: sessionId })));
    ctx.effect(() => ctx.commandUi.decorate({
        name: 'powernode',
        available: () => true,
        ui: {
            kind: 'action',
            run: (session) => requestSessionPanel(ctx, session.sessionId),
        },
    }));
}
function LatestCommandProgressAction({ onOpen }) {
    const latest = useSyncExternalStore(subscribeLatestPowernodeCommandStatus, getLatestPowernodeCommandStatus, getLatestPowernodeCommandStatus);
    if (!latest)
        return null;
    const { status, sessionId } = latest;
    const label = status.kind === 'proposal' ? '\u7f16\u8f91\u5efa\u8bae' : '\u5de5\u4f5c\u6d41\u8349\u7a3f';
    if (status.phase === 'generating')
        return _jsx("div", { className: "dsh-wp-command-progress", role: "status", "aria-live": "polite", children: _jsxs("span", { children: ['\u6b63\u5728\u751f\u6210', label, '\u2026'] }) });
    if (status.phase === 'failed' || status.phase === 'cancelled')
        return _jsxs("div", { className: "dsh-wp-command-progress", role: "status", "aria-live": "polite", children: [_jsx("span", { children: status.phase === 'cancelled' ? `${label}\u751f\u6210\u5df2\u53d6\u6d88` : `${label}\u751f\u6210\u5931\u8d25` }), status.message && _jsxs("details", { children: [_jsx("summary", { children: '\u67e5\u770b\u547d\u4ee4\u7ed3\u679c' }), _jsx("small", { children: status.message })] }), _jsx("button", { className: "dsh-wp-header-action", onClick: () => onOpen(sessionId), children: '\u8fd4\u56de\u547d\u4ee4\u4f1a\u8bdd' })] });
    return _jsxs("div", { className: "dsh-wp-command-progress", role: "status", "aria-live": "polite", children: [_jsxs("span", { children: [label, '\u5df2\u751f\u6210\uff0c\u5f52\u5c5e\u4e8e\u547d\u4ee4\u6240\u5728\u4f1a\u8bdd'] }), _jsx("button", { className: "dsh-wp-header-action", onClick: () => onOpen(sessionId), children: status.kind === 'proposal' ? '\u67e5\u770b\u7f16\u8f91\u5efa\u8bae' : '\u6253\u5f00\u5de5\u4f5c\u6d41\u8349\u7a3f' })] });
}
function PendingWorkflowAction({ remoteApi, sessionId, selectView }) {
    const [kind, setKind] = useState();
    const [refreshSequence, setRefreshSequence] = useState(0);
    const [commandStatus, setCommandStatus] = useState(() => getPowernodeCommandStatus(sessionId));
    useEffect(() => subscribeSessionDraft(sessionId, () => setRefreshSequence((value) => value + 1)), [sessionId]);
    useEffect(() => {
        setCommandStatus(getPowernodeCommandStatus(sessionId));
        return subscribePowernodeCommandStatus(sessionId, () => setCommandStatus(getPowernodeCommandStatus(sessionId)));
    }, [sessionId]);
    useEffect(() => {
        let current = true;
        if (!remoteApi)
            return () => { current = false; };
        void remoteApi.sessionState(sessionId).then((result) => {
            if (!current)
                return;
            const state = unwrap(result);
            setKind(state.editProposal ? 'proposal' : state.commandDraft ? 'draft' : undefined);
        }).catch(() => { if (current)
            setKind(undefined); });
        return () => { current = false; };
    }, [remoteApi, refreshSequence, sessionId]);
    const actionKind = commandStatus?.kind ?? kind;
    if (commandStatus?.phase === 'generating')
        return _jsx("div", { className: "dsh-wp-command-progress", role: "status", "aria-live": "polite", children: _jsxs("span", { children: ["\u6B63\u5728\u751F\u6210", actionKind === 'proposal' ? '编辑建议' : '工作流草稿', "\u2026"] }) });
    if (commandStatus?.phase === 'failed' || commandStatus?.phase === 'cancelled')
        return _jsxs("div", { className: "dsh-wp-command-progress", role: "status", "aria-live": "polite", children: [_jsx("span", { children: commandStatus.phase === 'cancelled' ? '工作流生成已取消。' : `${actionKind === 'proposal' ? '编辑建议' : '工作流草稿'}生成失败。` }), commandStatus.message && _jsxs("details", { children: [_jsx("summary", { children: "\u67E5\u770B\u547D\u4EE4\u7ED3\u679C" }), _jsx("small", { children: commandStatus.message })] })] });
    if (commandStatus?.phase === 'complete')
        return _jsxs("div", { className: "dsh-wp-command-progress", role: "status", "aria-live": "polite", children: [_jsx("span", { children: actionKind === 'proposal' ? '编辑建议已生成；原流程尚未修改。' : '工作流草稿已生成；尚未保存或运行。' }), _jsx("button", { className: "dsh-wp-header-action", onClick: () => selectView(CONVERSATION_VIEW_ID), children: actionKind === 'proposal' ? '查看编辑建议' : '打开工作流草稿' })] });
    if (!kind)
        return null;
    return _jsx("button", { className: "dsh-wp-header-action", onClick: () => selectView(CONVERSATION_VIEW_ID), children: kind === 'proposal' ? '查看编辑建议' : '查看工作流草稿' });
}
function WorkflowWorkspaceEntry({ ctx, sessionId, openView }) {
    const open = useCallback(() => {
        // The native renderer forbids nesting conversation.content factories,
        // even when the nested occurrence explicitly selects the Chat view.
        // Move to the root workspace before embedding the actual conversation.
        requestSessionPanel(ctx, sessionId);
        openView('chat', '');
    }, [ctx, sessionId, openView]);
    useEffect(open, [open]);
    return _jsx("button", { onClick: open, children: "\u6253\u5F00\u5DE5\u4F5C\u6D41\u4E0E\u5BF9\u5E94\u5BF9\u8BDD" });
}
function SessionWorkflowPanel({ ctx, remoteFailure, remoteApi, renderFactorySlot }) {
    const sessionId = useSyncExternalStore(subscribeRequestedSession, getRequestedSession, getRequestedSession);
    if (!sessionId)
        return _jsxs("main", { className: "dsh-wp-root dsh-wp-home", children: [_jsx("h1", { children: "\u5DE5\u4F5C\u6D41" }), _jsx("p", { children: "\u8BF7\u5728\u666E\u901A\u4F1A\u8BDD\u4E2D\u4F7F\u7528 /powernode \u6253\u5F00\u5F53\u524D\u4F1A\u8BDD\u7684\u5DE5\u4F5C\u6D41\u3002" })] });
    return _jsxs("div", { className: "dsh-wp-session-workspace", children: [_jsxs("header", { className: "dsh-wp-workspace-navigation", children: [_jsx("strong", { children: "\u5F53\u524D\u4F1A\u8BDD\u7684\u5DE5\u4F5C\u6D41\u4E0E\u5BF9\u8BDD" }), _jsx("button", { onClick: () => ctx.layout.selectPanel('conversation'), children: "\u8FD4\u56DE\u4F20\u7EDF\u5BF9\u8BDD" })] }), _jsx(WorkflowPanel, { ctx: ctx, remoteFailure: remoteFailure, remoteApi: remoteApi, sessionId: sessionId, surface: "main", renderFactorySlot: renderFactorySlot }, sessionId)] });
}
function SessionRunDock({ ctx, remoteApi, sessionId }) {
    const subscribe = useCallback((listener) => subscribeSessionRun(sessionId, listener), [sessionId]);
    const snapshot = useCallback(() => latestSessionRun(sessionId), [sessionId]);
    const run = useSyncExternalStore(subscribe, snapshot, snapshot);
    const [syncError, setSyncError] = useState('');
    useEffect(() => {
        if (!remoteApi)
            return;
        let current = true;
        const before = latestSessionRun(sessionId);
        void (async () => {
            try {
                const state = unwrap(await remoteApi.sessionState(sessionId));
                const runs = state.workflow ? unwrap(await remoteApi.sessionRuns(sessionId, state.workflow.id)) : [];
                if (current && latestSessionRun(sessionId) === before)
                    publishSessionRun(sessionId, runs[0]);
            }
            catch (cause) {
                if (current)
                    setSyncError(errorMessage(cause));
            }
        })();
        return () => { current = false; };
    }, [remoteApi, sessionId]);
    useEffect(() => {
        if (!remoteApi || !run || !['queued', 'running', 'pausing', 'paused', 'verifying', 'stopping'].includes(run.state))
            return;
        const runId = run.id;
        const workflowId = run.workflowId;
        return watchRun({
            read: () => remoteApi.sessionGetRun(sessionId, { workflowId, runId }).then(unwrap),
            onData: (next) => {
                if (latestSessionRun(sessionId)?.id === runId && next.id === runId) {
                    publishSessionRun(sessionId, next);
                    setSyncError('');
                }
            },
            onError: (cause) => setSyncError(errorMessage(cause)),
        });
    }, [remoteApi, run?.id, run?.state, sessionId]);
    if (!run)
        return null;
    return _jsx("div", { className: "dsh-wp-run-dock", children: _jsx(RunProgress, { run: run, syncError: syncError, onTask: (id) => requestSessionPanel(ctx, sessionId, id) }) });
}
function WorkflowPanel(props) {
    const [executionRun, setExecutionRun] = useState();
    const [chatTaskId, setChatTaskId] = useState(() => props.sessionId ? requestedTaskIds.get(props.sessionId) ?? '' : '');
    const [focusTaskId, setFocusTaskId] = useState(chatTaskId);
    const [taskSelection, setTaskSelection] = useState(0);
    const openTask = useCallback((id) => { setChatTaskId(id); setFocusTaskId(id); setTaskSelection((value) => value + 1); }, []);
    const receiveRun = useCallback((next) => setExecutionRun(next), []);
    const hasChat = Boolean(props.sessionId || executionRun);
    return _jsx("div", { className: "dsh-wp-workspace-frame", children: _jsxs("div", { className: `dsh-wp-workspace${hasChat ? ' has-chat' : ''}`, children: [_jsx(WorkflowEditor, { ...props, onExecutionRun: receiveRun, onTaskConversation: openTask, focusTaskId: focusTaskId }), hasChat && _jsx(WorkflowConversation, { ctx: props.ctx, sessionId: props.sessionId, run: executionRun, taskId: chatTaskId, taskSelection: taskSelection, onTask: openTask, renderFactorySlot: props.renderFactorySlot, residentComposer: props.surface !== 'main' && Boolean(props.sessionId) })] }) });
}
function WorkflowEditor({ ctx, remoteFailure, remoteApi, sessionId, surface = 'conversation', onExecutionRun, onTaskConversation, focusTaskId }) {
    const remote = remoteApi;
    const [items, setItems] = useState([]);
    const [pendingProposals, setPendingProposals] = useState([]);
    const [pendingDrafts, setPendingDrafts] = useState([]);
    const scopeKey = sessionId ?? 'global';
    const [workflow, setWorkflow] = useRetainedState(scopeKey, 'workflow', () => newWorkflow());
    const [savedSnapshot, setSavedSnapshot] = useRetainedState(scopeKey, 'savedSnapshot', () => undefined);
    const [nodeMeasurements, setNodeMeasurements] = useState(() => new Map());
    const [editing, setEditing] = useRetainedState(scopeKey, 'editing', () => false);
    const [savedWorkflowId, setSavedWorkflowId] = useRetainedState(scopeKey, 'savedWorkflowId', () => '');
    const [selectedNodeId, setSelectedNodeId] = useRetainedState(scopeKey, 'selectedNodeId', () => '');
    const [inspectorOpen, setInspectorOpen] = useRetainedState(scopeKey, 'inspectorOpen', () => false);
    const [settingsOpen, setSettingsOpen] = useRetainedState(scopeKey, 'settingsOpen', () => false);
    const [nodeMenu, setNodeMenu] = useState();
    const [flowInstance, setFlowInstance] = useState(null);
    const [run, setRun] = useRetainedState(scopeKey, 'run', () => undefined);
    const [preview, setPreview] = useRetainedState(scopeKey, 'preview', () => undefined);
    const [error, setError] = useRetainedState(scopeKey, 'error', () => remoteFailure);
    const [notice, setNotice] = useRetainedState(scopeKey, 'notice', () => '');
    const [sessionAssociationRevision, setSessionAssociationRevision] = useRetainedState(scopeKey, 'associationRevision', () => 0);
    const [sessionWorkspaceDirectory, setSessionWorkspaceDirectory] = useRetainedState(scopeKey, 'workspaceDirectory', () => '');
    const [commandDraft, setCommandDraft] = useRetainedState(scopeKey, 'commandDraft', () => undefined);
    const [activeCommandDraftId, setActiveCommandDraftId] = useRetainedState(scopeKey, 'activeCommandDraftId', () => '');
    const [editProposal, setEditProposal] = useRetainedState(scopeKey, 'editProposal', () => undefined);
    const [activeEditProposalId, setActiveEditProposalId] = useRetainedState(scopeKey, 'activeEditProposalId', () => '');
    const [folderPickerTarget, setFolderPickerTarget] = useState();
    const [folderPickerPath, setFolderPickerPath] = useState('');
    const [folderPickerParent, setFolderPickerParent] = useState();
    const [folderPickerDirectories, setFolderPickerDirectories] = useState([]);
    const [folderPickerRoot, setFolderPickerRoot] = useState();
    const [folderPickerError, setFolderPickerError] = useState('');
    const [folderPickerBusy, setFolderPickerBusy] = useState(false);
    const folderPickerSequence = useRef(0);
    const folderPickerAbort = useRef(undefined);
    useEffect(() => () => {
        folderPickerSequence.current++;
        folderPickerAbort.current?.abort();
    }, []);
    const [hasParkedEditor, setHasParkedEditor] = useState(() => parkedEditors.has(scopeKey));
    const [busy, setBusy] = useState(Boolean(remoteFailure) || Boolean(sessionId));
    const [runSyncError, setRunSyncError] = useState('');
    const [theme, setTheme] = useState(() => ctx.theme.getTheme());
    const currentRun = run?.workflowId === workflow.id ? run : undefined;
    const active = currentRun !== undefined && ['queued', 'running', 'pausing', 'verifying', 'stopping'].includes(currentRun.state);
    useEffect(() => {
        if (currentRun && !active && notice === '运行快照已保存；任务会按依赖顺序由 DSH Agent 串行处理。')
            setNotice('');
    }, [currentRun, active, notice, setNotice]);
    const runLocked = active || currentRun?.state === 'paused';
    const revisionNeedsApply = Boolean(currentRun && savedWorkflowId === workflow.id && workflow.revision > currentRun.workflow.revision);
    const selectedNode = workflow.nodes.find((node) => node.id === selectedNodeId);
    useEffect(() => { onExecutionRun(currentRun); }, [currentRun, onExecutionRun]);
    useEffect(() => { if (sessionId && currentRun)
        publishSessionRun(sessionId, currentRun); }, [currentRun, sessionId]);
    useEffect(() => {
        if (focusTaskId && workflow.nodes.some((node) => node.id === focusTaskId)) {
            setSelectedNodeId(focusTaskId);
            setInspectorOpen(true);
        }
    }, [focusTaskId, workflow.nodes]);
    const taskNodes = workflow.nodes.filter((node) => node.type === 'task');
    const canEdit = !active;
    const canEditSettings = canEdit && !editProposal;
    const proposalDiff = editProposal ? buildUiEditDiff(editProposal.baseWorkflow, workflow) : undefined;
    const hasUnsavedCanvasChanges = hasWorkflowChangesSinceSnapshot(workflow, savedSnapshot);
    const initialPromptOnlyDraft = canGenerateFromInitialPrompt(workflow, savedSnapshot, savedWorkflowId);
    const activeEditProposalIdRef = useRef(activeEditProposalId);
    activeEditProposalIdRef.current = activeEditProposalId;
    const editorStateRef = useRef({
        workflow, savedSnapshot, editing, savedWorkflowId, selectedNodeId, inspectorOpen, settingsOpen,
        run, preview, error, notice,
    });
    editorStateRef.current = {
        workflow, savedSnapshot, editing, savedWorkflowId, selectedNodeId, inspectorOpen, settingsOpen,
        run, preview, error, notice,
    };
    const runActionInFlight = useRef(false);
    const browseFolder = useCallback(async (path, workspaceRoot) => {
        const sequence = ++folderPickerSequence.current;
        setFolderPickerBusy(true);
        setFolderPickerError('');
        try {
            const result = unwrap(await remote.browseDirectories({ path, ...(workspaceRoot ? { workspaceRoot } : {}) }));
            if (sequence !== folderPickerSequence.current)
                return;
            setFolderPickerPath(result.path);
            setFolderPickerParent(result.parentPath);
            setFolderPickerDirectories(result.directories);
            if (result.truncated)
                setFolderPickerError('此目录下文件夹超过 500 个，仅显示前 500 项。');
        }
        catch (cause) {
            if (sequence === folderPickerSequence.current)
                setFolderPickerError(errorMessage(cause));
        }
        finally {
            if (sequence === folderPickerSequence.current)
                setFolderPickerBusy(false);
        }
    }, [remote]);
    const openFolderPicker = useCallback((target) => {
        let workspaceRoot;
        try {
            if (target === 'output') {
                workspaceRoot = normalizeDirectoryInput(workflow.workspaceDirectory);
                if (!workspaceRoot)
                    throw new Error('请先填写或选择工作区目录。');
            }
            const initialPath = target === 'output'
                ? workspaceRoot
                : normalizeDirectoryInput(workflow.workspaceDirectory) || sessionWorkspaceDirectory;
            setFolderPickerTarget(target);
            setFolderPickerRoot(workspaceRoot);
            setFolderPickerPath(initialPath);
            setFolderPickerParent(undefined);
            setFolderPickerDirectories([]);
            setFolderPickerError('');
            void browseFolder(initialPath, workspaceRoot);
        }
        catch (cause) {
            setError(errorMessage(cause));
        }
    }, [browseFolder, sessionWorkspaceDirectory, setError, workflow.workspaceDirectory]);
    const pickDirectory = useCallback(async (target) => {
        if (folderPickerAbort.current)
            return;
        if (!ctx.get('remote.directoryPicker')) {
            const message = 'DSH 当前未提供系统目录选择服务，可改用“浏览目录”。';
            setFolderPickerError(message);
            setError(message);
            return;
        }
        const sequence = ++folderPickerSequence.current;
        const controller = new AbortController();
        folderPickerAbort.current = controller;
        setFolderPickerBusy(true);
        setBusy(true);
        setFolderPickerError('');
        setError('');
        try {
            const selected = unwrap(await ctx.remote.directoryPicker.pick(controller.signal));
            if (sequence !== folderPickerSequence.current)
                return;
            if (selected === null) {
                setNotice(`${target === 'workspace' ? '工作区' : '输出目录'}选择已取消，原路径保持不变。`);
                return;
            }
            const path = normalizeDirectoryInput(selected);
            const workspaceRoot = target === 'output' ? normalizeDirectoryInput(workflow.workspaceDirectory) : undefined;
            // Reuse the Host's real-path/symlink boundary checks before adopting the choice.
            unwrap(await remote.browseDirectories({ path, ...(workspaceRoot ? { workspaceRoot } : {}) }));
            if (sequence !== folderPickerSequence.current)
                return;
            setWorkflow((current) => target === 'workspace'
                ? { ...current, workspaceDirectory: path, outputDirectory: current.outputDirectory || path }
                : { ...current, outputDirectory: path });
            setNotice(`${target === 'workspace' ? '工作区' : '输出目录'}已选择；点击“保存”后才会保存设置。`);
            setError('');
        }
        catch (cause) {
            if (sequence === folderPickerSequence.current && !controller.signal.aborted) {
                const message = `系统文件夹选择失败：${errorMessage(cause)} 可改用“浏览目录”。`;
                setFolderPickerError(message);
                setError(message);
            }
        }
        finally {
            if (sequence === folderPickerSequence.current) {
                setFolderPickerBusy(false);
                setBusy(false);
                if (folderPickerAbort.current === controller)
                    folderPickerAbort.current = undefined;
            }
        }
    }, [ctx, remote, setBusy, setError, setNotice, setWorkflow, workflow.workspaceDirectory]);
    const chooseFolder = useCallback(() => {
        if (!folderPickerTarget)
            return;
        try {
            const path = normalizeDirectoryInput(folderPickerPath);
            setWorkflow((current) => folderPickerTarget === 'workspace'
                ? { ...current, workspaceDirectory: path }
                : { ...current, outputDirectory: path });
            setNotice(`${folderPickerTarget === 'workspace' ? '工作区' : '输出目录'}已选择；点击“保存”后才会保存设置。`);
            setError('');
            folderPickerSequence.current++;
            setFolderPickerTarget(undefined);
        }
        catch (cause) {
            setFolderPickerError(errorMessage(cause));
        }
    }, [folderPickerPath, folderPickerTarget, setError, setNotice, setWorkflow]);
    const createOutputDirectory = useCallback(async () => {
        setBusy(true);
        setError('');
        try {
            const workspaceDirectory = normalizeDirectoryInput(workflow.workspaceDirectory);
            const outputDirectory = normalizeDirectoryInput(workflow.outputDirectory);
            const created = unwrap(await remote.createOutputDirectory({ workspaceDirectory, outputDirectory }));
            setWorkflow((current) => ({ ...current, workspaceDirectory, outputDirectory: created }));
            setNotice(`已按你的明确请求创建输出目录：${created}。设置尚未保存，也没有启动运行。`);
        }
        catch (cause) {
            setError(errorMessage(cause));
        }
        finally {
            setBusy(false);
        }
    }, [remote, setError, setNotice, setWorkflow, workflow.outputDirectory, workflow.workspaceDirectory]);
    const openCommandDraft = useCallback((draft, preserveCurrent = true) => {
        const current = editorStateRef.current;
        if (preserveCurrent && current.workflow.id !== draft.workflow.id) {
            parkedEditors.set(scopeKey, current);
            setHasParkedEditor(true);
        }
        setWorkflow(draft.workflow);
        setSavedSnapshot(undefined);
        setEditProposal(undefined);
        setActiveEditProposalId('');
        setEditing(true);
        setSavedWorkflowId('');
        setSelectedNodeId(draft.workflow.nodes[0]?.id ?? '');
        setInspectorOpen(Boolean(draft.workflow.nodes[0]));
        setSettingsOpen(false);
        setRun(undefined);
        setPreview(undefined);
        setActiveCommandDraftId(draft.draftId);
        setNotice(`命令 ${draft.commandId} 的草稿已恢复（修订 ${draft.revision}，模型 ${draft.model}）。检查和编辑后点击“保存”建立会话关联。`);
        setError('');
    }, [scopeKey, setActiveCommandDraftId, setActiveEditProposalId, setEditProposal, setEditing, setError, setInspectorOpen, setNotice, setPreview, setRun, setSavedSnapshot, setSavedWorkflowId, setSelectedNodeId, setSettingsOpen, setWorkflow]);
    const openEditProposal = useCallback((proposal) => {
        const current = editorStateRef.current;
        const currentHasUnsavedChanges = Boolean(current.savedWorkflowId && current.savedWorkflowId === current.workflow.id
            && current.savedSnapshot && JSON.stringify(current.workflow) !== JSON.stringify(current.savedSnapshot));
        if (currentHasUnsavedChanges && current.workflow.id === proposal.workflowId) {
            setError('当前画布还有未保存修改；为保护这些内容，暂不打开编辑建议。请先保存或撤销画布改动。');
            return;
        }
        setWorkflow(proposal.workflow);
        setSavedSnapshot(proposal.baseWorkflow);
        setEditing(true);
        setSavedWorkflowId(proposal.workflowId);
        setActiveEditProposalId(proposal.proposalId);
        setEditProposal(proposal);
        setSelectedNodeId(proposal.workflow.nodes[0]?.id ?? '');
        setInspectorOpen(Boolean(proposal.workflow.nodes[0]));
        setSettingsOpen(false);
        setRun(undefined);
        setPreview(undefined);
        setNotice(`编辑建议 ${proposal.proposalId}：依据已保存修订 ${proposal.baseWorkflowRevision}，模型 ${proposal.model}。应用前原流程保持不变。`);
        setError('');
    }, [setActiveEditProposalId, setEditProposal, setEditing, setError, setInspectorOpen, setNotice, setPreview, setRun, setSavedSnapshot, setSavedWorkflowId, setSelectedNodeId, setSettingsOpen, setWorkflow]);
    const restoreParkedEditor = useCallback(() => {
        const previous = parkedEditors.get(scopeKey);
        if (!previous)
            return;
        setWorkflow(previous.workflow);
        setSavedSnapshot(previous.savedSnapshot);
        setEditing(previous.editing);
        setSavedWorkflowId(previous.savedWorkflowId);
        setSelectedNodeId(previous.selectedNodeId);
        setInspectorOpen(previous.inspectorOpen);
        setSettingsOpen(previous.settingsOpen);
        setRun(previous.run);
        setPreview(previous.preview);
        setError(previous.error);
        setNotice(previous.notice);
        setActiveCommandDraftId('');
        parkedEditors.delete(scopeKey);
        setHasParkedEditor(false);
    }, [scopeKey, setActiveCommandDraftId, setEditing, setError, setInspectorOpen, setNotice, setPreview, setRun, setSavedSnapshot, setSavedWorkflowId, setSelectedNodeId, setSettingsOpen, setWorkflow]);
    const discardCommandDraft = useCallback(async () => {
        if (!sessionId || !commandDraft || commandDraft.draftId === activeCommandDraftId)
            return;
        setBusy(true);
        setError('');
        try {
            unwrap(await remote.sessionDiscardDraft(sessionId, { draftId: commandDraft.draftId, expectedRevision: commandDraft.revision }));
            setCommandDraft(undefined);
            setNotice('未保存的命令草稿已丢弃；当前关联流程和运行记录未更改。');
        }
        catch (cause) {
            setError(errorMessage(cause));
            try {
                const state = unwrap(await remote.sessionState(sessionId));
                setCommandDraft(state.commandDraft);
            }
            catch { /* Keep the conflict visible without discarding the editor state. */ }
        }
        finally {
            setBusy(false);
        }
    }, [activeCommandDraftId, commandDraft, remote, sessionId, setCommandDraft, setError, setNotice]);
    const refreshList = useCallback(async () => {
        let result;
        if (sessionId) {
            const state = unwrap(await remote.sessionState(sessionId));
            result = state.availableWorkflows;
            setPendingProposals([]);
            setPendingDrafts([]);
            setSessionAssociationRevision(state.associationRevision);
            setSessionWorkspaceDirectory(state.workspaceDirectory);
            setCommandDraft(state.commandDraft);
            setEditProposal(state.editProposal);
        }
        else {
            const [workflows, proposals, drafts] = await Promise.all([remote.list(), remote.listPendingEditProposals(), remote.listPendingSessionDrafts()]);
            result = unwrap(workflows);
            setPendingProposals(unwrap(proposals));
            setPendingDrafts(unwrap(drafts));
        }
        setItems(result);
        return result;
    }, [remote, sessionId, setCommandDraft, setEditProposal, setSessionAssociationRevision, setSessionWorkspaceDirectory]);
    useEffect(() => {
        if (!sessionId || remoteFailure || !remoteApi)
            return;
        let current = true;
        const unsubscribeDraft = subscribeSessionDraft(sessionId, () => {
            void remote.sessionState(sessionId).then((response) => {
                if (!current)
                    return;
                const state = unwrap(response);
                setCommandDraft(state.commandDraft);
                setEditProposal(state.editProposal);
                setSessionAssociationRevision(state.associationRevision);
                setSessionWorkspaceDirectory(state.workspaceDirectory);
                setItems(state.availableWorkflows);
                if (state.editProposal && state.editProposal.proposalId !== activeEditProposalIdRef.current)
                    openEditProposal(state.editProposal);
            }).catch((cause) => { if (current)
                setError(errorMessage(cause)); });
        });
        return () => { current = false; unsubscribeDraft(); };
    }, [openEditProposal, remote, remoteApi, remoteFailure, sessionId, setCommandDraft, setEditProposal, setError, setItems, setSessionAssociationRevision, setSessionWorkspaceDirectory]);
    useEffect(() => {
        const dispose = ctx.on('theme/change', (next) => setTheme(next));
        return () => { dispose(); };
    }, [ctx]);
    useEffect(() => {
        if (remoteFailure)
            return;
        if (!sessionId) {
            void refreshList().catch((cause) => setError(errorMessage(cause)));
            return;
        }
        let current = true;
        const hadRetainedEditor = retainedEditorState.has(`${scopeKey}:editing`);
        const retainedSavedId = retainedEditorState.get(`${scopeKey}:savedWorkflowId`);
        void (async () => {
            setBusy(true);
            try {
                const state = unwrap(await remote.sessionState(sessionId));
                if (!current)
                    return;
                setItems(state.availableWorkflows);
                setSessionAssociationRevision(state.associationRevision);
                setSessionWorkspaceDirectory(state.workspaceDirectory);
                setCommandDraft(state.commandDraft);
                setEditProposal(state.editProposal);
                if (!hadRetainedEditor) {
                    if (state.editProposal) {
                        openEditProposal(state.editProposal);
                    }
                    else if (state.workflow) {
                        setWorkflow(state.workflow);
                        setSavedSnapshot(state.workflow);
                        setEditing(true);
                        setSavedWorkflowId(state.workflow.id);
                        setSelectedNodeId(state.workflow.nodes[0]?.id ?? '');
                        setInspectorOpen(Boolean(state.workflow.nodes[0]));
                        const sessionRuns = unwrap(await remote.sessionRuns(sessionId, state.workflow.id));
                        if (!current)
                            return;
                        setRun(sessionRuns[0]);
                        setNotice('已打开当前会话关联的工作流。');
                    }
                    else if (state.commandDraft) {
                        openCommandDraft(state.commandDraft, false);
                    }
                    else {
                        setWorkflow(newWorkflow(state.workspaceDirectory));
                        setSavedWorkflowId('');
                        setEditing(false);
                        setRun(undefined);
                        setNotice(state.association ? '当前会话关联的工作流已失效，请重新选择或新建。' : '当前会话还没有关联工作流。');
                    }
                }
                else if (retainedSavedId && state.workflow?.id === retainedSavedId) {
                    if (state.editProposal && state.editProposal.proposalId !== activeEditProposalIdRef.current)
                        openEditProposal(state.editProposal);
                    const sessionRuns = unwrap(await remote.sessionRuns(sessionId, state.workflow.id));
                    if (!current)
                        return;
                    setRun(sessionRuns[0]);
                }
                else if (retainedSavedId && !state.workflow) {
                    setWorkflow(newWorkflow(state.workspaceDirectory));
                    setSavedWorkflowId('');
                    setEditing(false);
                    setRun(undefined);
                    setNotice('当前会话关联的工作流已失效，请重新选择或新建。');
                }
                else if (state.editProposal && state.editProposal.proposalId !== activeEditProposalIdRef.current) {
                    openEditProposal(state.editProposal);
                }
            }
            catch (cause) {
                if (current)
                    setError(errorMessage(cause));
            }
            finally {
                if (current)
                    setBusy(false);
            }
        })();
        return () => { current = false; };
    }, [ctx, openCommandDraft, openEditProposal, remote, refreshList, remoteFailure, scopeKey, sessionId, setCommandDraft, setEditProposal, setEditing, setError, setInspectorOpen, setItems, setNotice, setRun, setSavedSnapshot, setSavedWorkflowId, setSelectedNodeId, setSessionAssociationRevision, setSessionWorkspaceDirectory, setWorkflow]);
    useEffect(() => {
        if (!sessionId || !savedWorkflowId || workflow.id !== savedWorkflowId || !savedSnapshot || remoteFailure)
            return;
        const sequence = (editorStatusSequences.get(sessionId) ?? 0) + 1;
        editorStatusSequences.set(sessionId, sequence);
        void remote.sessionEditorStatus(sessionId, {
            clientId, sequence, workflowId: savedWorkflowId, baseRevision: savedSnapshot.revision,
            isDirty: JSON.stringify(workflow) !== JSON.stringify(savedSnapshot),
        }).catch(() => undefined);
    }, [remote, remoteFailure, savedSnapshot, savedWorkflowId, sessionId, workflow]);
    useEffect(() => {
        if (!nodeMenu)
            return;
        const close = (event) => {
            if (!(event.target instanceof Element) || !event.target.closest('.dsh-wp-context-menu'))
                setNodeMenu(undefined);
        };
        const escape = (event) => { if (event.key === 'Escape')
            setNodeMenu(undefined); };
        document.addEventListener('pointerdown', close);
        document.addEventListener('keydown', escape);
        return () => {
            document.removeEventListener('pointerdown', close);
            document.removeEventListener('keydown', escape);
        };
    }, [nodeMenu]);
    useEffect(() => {
        if (!run || run.workflowId !== workflow.id || !['queued', 'running', 'pausing', 'paused', 'verifying', 'stopping', 'interrupted', 'needs_review'].includes(run.state))
            return;
        const runId = run.id;
        const workflowId = workflow.id;
        return watchRun({
            read: () => (sessionId
                ? remote.sessionGetRun(sessionId, { workflowId, runId })
                : remote.getRun(runId)).then(unwrap),
            onData: (latest) => {
                if (latest.id === runId && latest.workflowId === workflowId) {
                    setRun(latest);
                    setRunSyncError('');
                }
            },
            onError: (cause) => setRunSyncError(errorMessage(cause)),
        });
    }, [remote, run?.id, run?.state, run?.workflowId, sessionId, workflow.id]);
    const addContextToTask = useCallback((taskId, kind) => {
        const task = workflow.nodes.find((node) => node.id === taskId && node.type === 'task');
        if (!task || task.type !== 'task')
            return;
        const id = `${kind}-${newId()}`;
        const candidates = [
            { x: task.position.x + 300, y: task.position.y },
            { x: task.position.x - 300, y: task.position.y },
            { x: task.position.x, y: task.position.y + 215 },
            { x: task.position.x, y: task.position.y - 215 },
        ];
        const position = candidates.find((candidate) => workflow.nodes.every((other) => {
            if (other.id === task.id)
                return true;
            return Math.abs(candidate.x - other.position.x) >= 276 || Math.abs(candidate.y - other.position.y) >= 210;
        })) ?? { x: task.position.x + 300, y: task.position.y + workflow.nodes.length * 215 };
        const node = kind === 'file'
            ? { type: 'file', id, title: '参考文件', path: '', position }
            : { type: 'prompt', id, title: '补充提示', text: '', enabled: true, position };
        const edge = { type: 'context', id: newId(), source: id, target: task.id };
        setWorkflow((current) => ({ ...current, nodes: [...current.nodes, node], edges: [...current.edges, edge] }));
        setSelectedNodeId(id);
        setInspectorOpen(true);
        setNodeMenu(undefined);
        setPreview(undefined);
        window.requestAnimationFrame(() => flowInstance?.fitView({ nodes: [{ id: task.id }, { id }], padding: 0.35, duration: 220 }));
    }, [flowInstance, workflow.nodes]);
    const flowNodes = useMemo(() => workflow.nodes.map((node) => ({
        ...nodeMeasurements.get(node.id),
        id: node.id,
        type: node.type,
        position: { x: node.position.x, y: node.position.y },
        data: { node, ...(node.type === 'task' ? {
                state: currentRun && currentRun.workflow.revision !== workflow.revision ? 'outdated' : taskProgressState(currentRun?.tasks.find((task) => task.taskId === node.id)),
                onAddContext: (kind) => addContextToTask(node.id, kind),
            } : {}) },
        selected: node.id === selectedNodeId,
    })), [addContextToTask, currentRun, nodeMeasurements, selectedNodeId, workflow.nodes, workflow.revision]);
    const flowEdges = useMemo(() => workflow.edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: 'smoothstep',
        label: edge.type === 'dependency' ? '依赖' : '上下文',
        markerEnd: { type: MarkerType.ArrowClosed },
        style: edge.type === 'context' ? { stroke: 'var(--dsw-alias-label-tertiary)', strokeDasharray: '6 5' } : { stroke: 'var(--dsw-alias-brand-primary)' },
        data: { kind: edge.type },
    })), [workflow.edges]);
    const changeWorkflow = useCallback((change) => {
        setWorkflow((current) => change(current));
    }, []);
    const onNodesChange = useCallback((changes) => {
        const removedIds = new Set(changes.filter((change) => change.type === 'remove').map((change) => change.id));
        const dimensionChanges = changes.filter((change) => change.type === 'dimensions');
        if (removedIds.size > 0 || dimensionChanges.length > 0) {
            setNodeMeasurements((current) => {
                const next = new Map(current);
                for (const id of removedIds)
                    next.delete(id);
                for (const change of dimensionChanges) {
                    if (!change.dimensions)
                        continue;
                    const measurement = { ...(next.get(change.id) ?? {}), measured: { ...change.dimensions } };
                    if (change.setAttributes === true || change.setAttributes === 'width')
                        measurement.width = change.dimensions.width;
                    if (change.setAttributes === true || change.setAttributes === 'height')
                        measurement.height = change.dimensions.height;
                    next.set(change.id, measurement);
                }
                return next;
            });
        }
        if (removedIds.has(selectedNodeId)) {
            setSelectedNodeId('');
            setInspectorOpen(false);
            setPreview(undefined);
        }
        // React Flow reports dimensions, selection and drag updates against its own
        // transient node snapshot. Only an explicit remove event should prune edges.
        setWorkflow((current) => {
            const nextNodes = applyNodeChanges(changes, toFlowNodes(current));
            const positions = new Map(nextNodes.map((node) => [node.id, node.position]));
            return {
                ...current,
                nodes: current.nodes.filter((node) => !removedIds.has(node.id)).map((node) => {
                    const position = positions.get(node.id);
                    return position ? { ...node, position } : node;
                }),
                edges: removedIds.size > 0 ? current.edges.filter((edge) => !removedIds.has(edge.source) && !removedIds.has(edge.target)) : current.edges,
            };
        });
    }, [selectedNodeId]);
    const onEdgesChange = useCallback((changes) => {
        setWorkflow((current) => ({ ...current, edges: fromFlowEdges(applyEdgeChanges(changes, toFlowEdges(current))) }));
    }, []);
    const onConnect = useCallback((connection) => {
        const source = workflow.nodes.find((node) => node.id === connection.source);
        const target = workflow.nodes.find((node) => node.id === connection.target);
        if (!source || !target || source.id === target.id || target.type !== 'task' || source.type === 'task' && target.type !== 'task') {
            setError('连线方向无效：依赖只能连接任务，文件或提示词只能连接到任务。');
            return;
        }
        const type = source.type === 'task' ? 'dependency' : 'context';
        const edge = { type, id: newId(), source: source.id, target: target.id };
        if (workflow.edges.some((existing) => existing.type === type && existing.source === source.id && existing.target === target.id)) {
            setError('这两个节点之间已经有相同类型的连线。');
            return;
        }
        changeWorkflow((current) => ({ ...current, edges: fromFlowEdges(addEdge({ ...connection, id: edge.id, data: { kind: type } }, toFlowEdges(current))).map((item) => item.id === edge.id ? edge : item) }));
    }, [changeWorkflow, workflow.edges, workflow.nodes]);
    const save = useCallback(async () => {
        setBusy(true);
        setError('');
        try {
            const normalizedWorkflow = {
                ...workflow,
                workspaceDirectory: normalizeDirectoryInput(workflow.workspaceDirectory),
                outputDirectory: normalizeDirectoryInput(workflow.outputDirectory),
            };
            setWorkflow(normalizedWorkflow);
            validateWorkflow(normalizedWorkflow);
            if (editProposal && activeEditProposalId === editProposal.proposalId) {
                if (!sessionId || normalizedWorkflow.id !== editProposal.workflowId)
                    throw new Error('当前编辑建议的会话上下文无效，请重新加载。');
                const updated = unwrap(await remote.sessionEditProposalUpdate(sessionId, {
                    proposalId: editProposal.proposalId, expectedRevision: editProposal.revision, workflow: normalizedWorkflow,
                }));
                setEditProposal(updated);
                setWorkflow(updated.workflow);
                setSavedSnapshot(updated.baseWorkflow);
                setNotice(`编辑建议已保存为提案修订 ${updated.revision}；原工作流修订 ${updated.baseWorkflowRevision} 尚未改变。点击“应用修改”才会写入新工作流修订。`);
                return;
            }
            const expectedRevision = savedWorkflowId === normalizedWorkflow.id ? normalizedWorkflow.revision : 0;
            let saved;
            if (sessionId) {
                const draftCommit = commandDraft?.draftId === activeCommandDraftId && commandDraft.workflow.id === normalizedWorkflow.id
                    ? { draftId: commandDraft.draftId, expectedDraftRevision: commandDraft.revision }
                    : {};
                const result = unwrap(await remote.sessionSave(sessionId, { workflow: normalizedWorkflow, expectedRevision, expectedAssociationRevision: sessionAssociationRevision, ...draftCommit }));
                saved = result.workflow;
                setSessionAssociationRevision(result.association.revision);
            }
            else
                saved = unwrap(await remote.save({ workflow: normalizedWorkflow, expectedRevision }));
            setWorkflow(saved);
            setSavedSnapshot(saved);
            setSavedWorkflowId(saved.id);
            setSettingsOpen(false);
            setNotice(`已保存（修订 ${saved.revision}）。`);
            if (commandDraft?.workflow.id === saved.id) {
                setCommandDraft(undefined);
                setActiveCommandDraftId('');
            }
            if (sessionId)
                notifySessionDraft(sessionId);
            await refreshList();
        }
        catch (cause) {
            setError(errorMessage(cause));
        }
        finally {
            setBusy(false);
        }
    }, [activeCommandDraftId, activeEditProposalId, commandDraft, editProposal, refreshList, remote, savedWorkflowId, sessionAssociationRevision, sessionId, setActiveCommandDraftId, setCommandDraft, setEditProposal, setError, setNotice, setSavedSnapshot, setSessionAssociationRevision, setWorkflow, workflow]);
    const applyEditProposal = useCallback(async () => {
        if (!sessionId || !editProposal || editProposal.proposalId !== activeEditProposalId)
            return;
        if (JSON.stringify(workflow) !== JSON.stringify(editProposal.workflow)) {
            setError('当前提案画布有未保存修改。先点击“保存建议修改”，再应用。');
            return;
        }
        setBusy(true);
        setError('');
        try {
            const committed = unwrap(await remote.sessionEditProposalApply(sessionId, {
                proposalId: editProposal.proposalId, expectedRevision: editProposal.revision,
            }));
            setWorkflow(committed);
            setSavedSnapshot(committed);
            setSavedWorkflowId(committed.id);
            setEditProposal(undefined);
            setActiveEditProposalId('');
            setActiveCommandDraftId('');
            setNotice(`修改已应用：工作流 ${committed.id} 保存为修订 ${committed.revision}。历史运行记录保留，未自动启动新运行。`);
            notifySessionDraft(sessionId);
            if (sessionId) {
                const runs = unwrap(await remote.sessionRuns(sessionId, committed.id));
                setRun(runs[0]);
            }
            await refreshList();
        }
        catch (cause) {
            setError(errorMessage(cause));
        }
        finally {
            setBusy(false);
        }
    }, [activeEditProposalId, editProposal, refreshList, remote, sessionId, setActiveCommandDraftId, setActiveEditProposalId, setEditProposal, setError, setNotice, setRun, setSavedSnapshot, setSavedWorkflowId, setWorkflow, workflow]);
    const discardEditProposal = useCallback(async () => {
        if (!sessionId || !editProposal || editProposal.proposalId !== activeEditProposalId)
            return;
        setBusy(true);
        setError('');
        try {
            unwrap(await remote.sessionEditProposalDiscard(sessionId, { proposalId: editProposal.proposalId, expectedRevision: editProposal.revision }));
            setWorkflow(editProposal.baseWorkflow);
            setSavedSnapshot(editProposal.baseWorkflow);
            setSavedWorkflowId(editProposal.workflowId);
            setEditProposal(undefined);
            setActiveEditProposalId('');
            const runs = unwrap(await remote.sessionRuns(sessionId, editProposal.workflowId));
            setRun(runs[0]);
            setNotice(`编辑建议已放弃。原工作流 ${editProposal.workflowId} 修订 ${editProposal.baseWorkflowRevision} 未修改。`);
            notifySessionDraft(sessionId);
            await refreshList();
        }
        catch (cause) {
            setError(errorMessage(cause));
        }
        finally {
            setBusy(false);
        }
    }, [activeEditProposalId, editProposal, refreshList, remote, sessionId, setActiveEditProposalId, setEditProposal, setError, setNotice, setRun, setSavedSnapshot, setSavedWorkflowId, setWorkflow]);
    const createNew = useCallback(() => {
        if (hasUnsavedCanvasChanges || editProposal) {
            setError(editProposal ? '先应用或放弃待处理编辑建议，再新建其他流程。' : '当前画布有未保存修改；请先保存或撤销，再新建流程。');
            return;
        }
        const next = newWorkflow(workflow.workspaceDirectory || sessionWorkspaceDirectory);
        setWorkflow(next);
        setSavedSnapshot(next);
        setEditing(true);
        setSettingsOpen(true);
        setSavedWorkflowId('');
        setSelectedNodeId(next.nodes[0].id);
        setInspectorOpen(true);
        setNodeMenu(undefined);
        setRun(undefined);
        setEditProposal(undefined);
        setActiveEditProposalId('');
        setPreview(undefined);
        setNotice('手动编辑和保存不需要模型密钥。先填写目标与工作区，再添加资料并完善任务。');
        setError('');
    }, [editProposal, hasUnsavedCanvasChanges, sessionWorkspaceDirectory, setActiveEditProposalId, setEditProposal, setError, setSavedSnapshot, workflow.workspaceDirectory]);
    const selectSaved = useCallback(async (id) => {
        if (!id)
            return;
        if (editProposal) {
            setError('当前会话有待处理编辑建议；请先应用或放弃，再选择其他工作流。');
            return;
        }
        if (hasUnsavedCanvasChanges) {
            setError('当前画布有未保存修改；请先保存或撤销，再选择其他工作流。');
            return;
        }
        setBusy(true);
        try {
            if (sessionId) {
                const association = unwrap(await remote.sessionAssociate(sessionId, { workflowId: id, expectedAssociationRevision: sessionAssociationRevision }));
                setSessionAssociationRevision(association.revision);
            }
            const loaded = sessionId
                ? unwrap(await remote.sessionGet(sessionId, id))
                : unwrap(await remote.get(id));
            setWorkflow(loaded);
            setSavedSnapshot(loaded);
            setEditing(true);
            setSettingsOpen(false);
            setSavedWorkflowId(loaded.id);
            setSelectedNodeId(loaded.nodes[0]?.id ?? '');
            setInspectorOpen(Boolean(loaded.nodes[0]));
            setNodeMenu(undefined);
            setRun(undefined);
            setPreview(undefined);
            const runs = sessionId ? unwrap(await remote.sessionRuns(sessionId, id)) : unwrap(await remote.runs(id));
            setRun(runs[0]);
            setNotice('已加载已保存的工作流。');
            setError('');
        }
        catch (cause) {
            setError(errorMessage(cause));
        }
        finally {
            setBusy(false);
        }
    }, [editProposal, hasUnsavedCanvasChanges, remote, sessionAssociationRevision, sessionId, setError, setSavedSnapshot, setSessionAssociationRevision, setWorkflow]);
    const addNode = useCallback((kind) => {
        const index = workflow.nodes.length;
        const id = `${kind}-${newId()}`;
        const position = { x: 90 + index % 3 * 310, y: 80 + Math.floor(index / 3) * 185 };
        const node = kind === 'task'
            ? { type: 'task', id, title: '新任务', instructions: '写明目标、步骤和验收条件。', acceptanceCriteria: ['人工核对任务结果和产物。'], expectedArtifacts: [], expectedContents: [], acceptanceMode: 'manual', order: workflow.nodes.filter((node) => node.type === 'task').length, position }
            : kind === 'file'
                ? { type: 'file', id, title: '参考文件', path: '', position }
                : { type: 'prompt', id, title: '补充提示', text: '', enabled: true, position };
        changeWorkflow((current) => ({ ...current, nodes: [...current.nodes, node] }));
        setSelectedNodeId(id);
        setInspectorOpen(true);
        setNodeMenu(undefined);
        setPreview(undefined);
    }, [changeWorkflow, workflow.nodes.length]);
    const updateNode = useCallback((id, update) => {
        changeWorkflow((current) => ({ ...current, nodes: current.nodes.map((node) => node.id === id ? update(node) : node) }));
    }, [changeWorkflow]);
    const generatePlan = useCallback(async () => {
        if (editProposal) {
            setError('先应用或放弃当前编辑建议，再生成其他草稿。');
            return;
        }
        const protectionMessage = getWorkflowProtectionMessage('generate', {
            hasUnsavedChanges: hasUnsavedCanvasChanges,
            initialPromptOnlyDraft,
            runState: currentRun?.state,
            objective: workflow.objective,
        });
        if (protectionMessage) {
            setError(protectionMessage);
            return;
        }
        setBusy(true);
        setError('');
        try {
            const request = {
                title: workflow.title,
                objective: workflow.objective,
                workspaceDirectory: workflow.workspaceDirectory,
                outputDirectory: workflow.outputDirectory,
                contextNodes: workflow.nodes.filter((node) => node.type !== 'task'),
            };
            const result = sessionId
                ? unwrap(await remote.sessionGenerateDraft(sessionId, { workflowId: savedWorkflowId, request }, new AbortController().signal))
                : unwrap(await remote.generateDraft(request, new AbortController().signal));
            setWorkflow(result.workflow);
            setSavedSnapshot(result.workflow);
            setEditing(true);
            setSettingsOpen(false);
            setSavedWorkflowId('');
            setRun(undefined);
            setSelectedNodeId(result.workflow.nodes[0]?.id ?? '');
            setInspectorOpen(Boolean(result.workflow.nodes[0]));
            setNotice(`模型 ${result.model} 已生成可编辑草稿，请检查后保存。`);
        }
        catch (cause) {
            setError(`AI 草稿生成失败（如尚未配置模型，请前往 DSH 设置 → Models 添加模型）。${errorMessage(cause)}`);
        }
        finally {
            setBusy(false);
        }
    }, [currentRun?.state, editProposal, hasUnsavedCanvasChanges, initialPromptOnlyDraft, remote, savedWorkflowId, sessionId, setError, setSavedSnapshot, setWorkflow, workflow]);
    const importMarkdown = useCallback(async (file) => {
        const protectionMessage = getWorkflowProtectionMessage('import-markdown', {
            hasUnsavedChanges: hasUnsavedCanvasChanges,
            runState: currentRun?.state,
        });
        if (protectionMessage) {
            setError(protectionMessage);
            return;
        }
        setBusy(true);
        setError('');
        try {
            const text = await file.text();
            const imported = unwrap(await remote.importMarkdown({
                text,
                workspaceDirectory: workflow.workspaceDirectory,
                outputDirectory: workflow.outputDirectory,
            }));
            setWorkflow(imported);
            setSavedSnapshot(imported);
            setEditing(true);
            setSettingsOpen(false);
            setSavedWorkflowId(imported.id);
            setRun(undefined);
            setSelectedNodeId(imported.nodes[0]?.id ?? '');
            setInspectorOpen(Boolean(imported.nodes[0]));
            setNotice('Markdown 已解析并保存；保存后的任务仍可继续编辑。');
            await refreshList();
        }
        catch (cause) {
            setError(errorMessage(cause));
        }
        finally {
            setBusy(false);
        }
    }, [currentRun?.state, hasUnsavedCanvasChanges, refreshList, remote, setError, setSavedSnapshot, setWorkflow, workflow]);
    const previewFile = useCallback(async (node) => {
        setBusy(true);
        setError('');
        try {
            const result = sessionId
                ? unwrap(await remote.sessionPreviewFile(sessionId, { path: node.path, workflowId: workflow.id }))
                : unwrap(await remote.previewFile({ path: node.path, workspaceDirectory: workflow.workspaceDirectory }));
            setPreview(result);
            setNotice(`已读取 UTF-8 文件（SHA-256 ${result.sha256.slice(0, 12)}…）。`);
        }
        catch (cause) {
            setPreview(undefined);
            setError(errorMessage(cause));
        }
        finally {
            setBusy(false);
        }
    }, [remote, sessionId, workflow.id, workflow.workspaceDirectory]);
    const startRun = useCallback(async () => {
        const protectionMessage = getWorkflowProtectionMessage('start-run', { hasUnsavedChanges: hasUnsavedCanvasChanges });
        if (protectionMessage) {
            setError(protectionMessage);
            return;
        }
        if (editProposal) {
            setError('当前有待处理编辑建议。请先应用或放弃，再启动工作流运行。');
            return;
        }
        if (!savedWorkflowId || savedWorkflowId !== workflow.id) {
            setError('先保存当前草稿，再启动运行。');
            return;
        }
        if (runActionInFlight.current)
            return;
        runActionInFlight.current = true;
        setBusy(true);
        setError('');
        try {
            const request = { workflowId: workflow.id, requestId: newId() };
            const started = sessionId
                ? unwrap(await remote.sessionStartRun(sessionId, request))
                : unwrap(await remote.startRun(request));
            setRun(started);
            setInspectorOpen(true);
            setNotice('运行快照已保存；任务会按依赖顺序由 DSH Agent 串行处理。');
        }
        catch (cause) {
            setError(errorMessage(cause));
        }
        finally {
            runActionInFlight.current = false;
            setBusy(false);
        }
    }, [editProposal, hasUnsavedCanvasChanges, remote, savedWorkflowId, sessionId, setError, workflow.id]);
    const runAction = useCallback(async (action, taskId = '') => {
        if (!run || run.workflowId !== workflow.id || runActionInFlight.current)
            return;
        if (action === 'apply') {
            const protectionMessage = getWorkflowProtectionMessage('apply-run', { hasUnsavedChanges: hasUnsavedCanvasChanges });
            if (protectionMessage) {
                setError(protectionMessage);
                return;
            }
        }
        runActionInFlight.current = true;
        setBusy(true);
        setError('');
        try {
            const request = sessionId
                ? remote.sessionAction(sessionId, { workflowId: workflow.id, runId: run.id, action, taskId })
                : remote.action({ runId: run.id, action, taskId });
            const next = unwrap(await request);
            setRun(next);
            setNotice(action === 'apply'
                ? `已应用修订 ${next.workflow.revision}；旧运行保留，未受影响且产物核验仍通过的任务会标为复用。`
                : action === 'accept' ? '验收通过已记录。' : action === 'reject' ? '驳回决定已记录。' : `已提交“${actionLabel(action)}”操作。`);
        }
        catch (cause) {
            setError(errorMessage(cause));
        }
        finally {
            runActionInFlight.current = false;
            setBusy(false);
        }
    }, [hasUnsavedCanvasChanges, remote, run, sessionId, setError, workflow.id]);
    const deleteNode = useCallback((nodeId) => {
        changeWorkflow((current) => ({
            ...current,
            nodes: current.nodes.filter((node) => node.id !== nodeId),
            edges: current.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
        }));
        if (selectedNodeId === nodeId)
            setSelectedNodeId('');
        setInspectorOpen(false);
        setNodeMenu(undefined);
        setPreview(undefined);
    }, [changeWorkflow, selectedNodeId]);
    const returnToList = useCallback(() => {
        setEditing(false);
        setInspectorOpen(false);
        setSelectedNodeId('');
        setNodeMenu(undefined);
        setError('');
        setNotice('');
        void refreshList().catch((cause) => setError(errorMessage(cause)));
    }, [refreshList]);
    const linksToSelected = selectedNode?.type === 'task'
        ? workflow.edges.filter((edge) => edge.type === 'context' && edge.target === selectedNode.id)
        : [];
    const chooseTheme = (value) => ctx.theme.setTheme(value);
    const themeControl = _jsxs("label", { className: "dsh-wp-theme-control", children: ["\u4E3B\u9898", _jsxs("select", { "aria-label": "\u4E3B\u9898", value: theme.preference, onChange: (event) => chooseTheme(event.target.value), children: [_jsx("option", { value: "system", children: "\u8DDF\u968F\u7CFB\u7EDF" }), _jsx("option", { value: "light", children: "\u6D45\u8272" }), _jsx("option", { value: "dark", children: "\u6DF1\u8272" })] })] });
    if (!editing && sessionId)
        return _jsxs("main", { className: "dsh-wp-root dsh-wp-home", "data-theme": theme.active.colorScheme, children: [_jsxs("header", { className: "dsh-wp-header", children: [_jsxs("div", { children: [_jsx("h1", { children: "\u5F53\u524D\u4F1A\u8BDD\u7684\u5DE5\u4F5C\u6D41" }), _jsx("p", { children: "\u8FD9\u91CC\u53EA\u663E\u793A\u5E76\u7F16\u8F91\u5F53\u524D\u4F1A\u8BDD\u5173\u8054\u7684\u6D41\u7A0B\u3002\u6253\u5F00\u754C\u9762\u4E0D\u4F1A\u8C03\u7528\u6A21\u578B\u6216\u542F\u52A8\u8FD0\u884C\u3002" })] }), _jsxs("div", { className: "dsh-wp-home-actions", children: [surface === 'main' && _jsx("button", { onClick: () => ctx.layout.selectPanel('conversation'), children: "\u8FD4\u56DE\u5BF9\u8BDD" }), themeControl, _jsx("button", { className: "is-primary", onClick: createNew, disabled: busy, children: "\u65B0\u5EFA\u5DE5\u4F5C\u6D41" })] })] }), error && _jsx("div", { className: "dsh-wp-alert is-error", role: "alert", children: error }), notice && _jsx("div", { className: "dsh-wp-alert", role: "status", children: notice }), commandDraft && _jsxs("section", { className: "dsh-wp-command-draft", role: "status", children: [_jsxs("div", { children: [_jsx("b", { children: "\u672C\u4F1A\u8BDD\u6709\u547D\u4EE4\u8349\u7A3F\u5F85\u68C0\u67E5" }), _jsxs("p", { children: [commandDraft.workflow.title, " \u00B7 \u4FEE\u8BA2 ", commandDraft.revision, " \u00B7 ", commandDraft.workflow.nodes.filter((node) => node.type === 'task').length, " \u4E2A\u4EFB\u52A1 \u00B7 ", commandDraft.model] }), _jsx("small", { children: "\u8349\u7A3F\u5C1A\u672A\u4FDD\u5B58\uFF0C\u4E0D\u4F1A\u8FD0\u884C\uFF0C\u4E5F\u4E0D\u4F1A\u66FF\u6362\u5F53\u524D\u5173\u8054\u6D41\u7A0B\u3002" })] }), _jsxs("div", { children: [_jsx("button", { className: "is-primary", onClick: () => openCommandDraft(commandDraft, commandDraft.workflow.id !== workflow.id), disabled: busy, children: commandDraft.workflow.id === workflow.id && activeCommandDraftId === commandDraft.draftId ? '继续编辑草稿' : '打开草稿' }), commandDraft.draftId !== activeCommandDraftId && _jsx("button", { className: "is-danger", onClick: () => void discardCommandDraft(), disabled: busy, children: "\u4E22\u5F03\u8349\u7A3F" })] })] }), !sessionWorkspaceDirectory && _jsx("p", { className: "dsh-wp-empty-card", children: "\u6B64\u4F1A\u8BDD\u6CA1\u6709\u53EF\u7528\u7684\u5DE5\u4F5C\u533A\u76EE\u5F55\u3002\u65B0\u5EFA\u540E\u8BF7\u586B\u5199\u4E00\u4E2A\u5DF2\u5B58\u5728\u7684\u7EDD\u5BF9\u8DEF\u5F84\u3002" }), _jsxs("section", { className: "dsh-wp-saved-list", children: [_jsxs("div", { className: "dsh-wp-section-heading", children: [_jsxs("div", { children: [_jsx("h2", { children: "\u9009\u62E9\u5DF2\u6709\u5DE5\u4F5C\u6D41" }), _jsx("p", { children: "\u9009\u62E9\u540E\u53EA\u4F1A\u5C06\u8BE5\u5DE5\u4F5C\u6D41\u5173\u8054\u5230\u5F53\u524D\u4F1A\u8BDD\u3002" })] }), _jsxs("span", { children: [items.length, " \u9879"] })] }), busy ? _jsx("p", { className: "dsh-wp-empty-card", children: "\u6B63\u5728\u8BFB\u53D6\u5F53\u524D\u4F1A\u8BDD\u7684\u5173\u8054\u4E0E\u5DE5\u4F5C\u533A\u2026" }) : items.length === 0
                            ? _jsx("p", { className: "dsh-wp-empty-card", children: "\u8FD8\u6CA1\u6709\u5DF2\u4FDD\u5B58\u7684\u5DE5\u4F5C\u6D41\u3002\u53EF\u4EE5\u65B0\u5EFA\u4E00\u4E2A\u624B\u52A8\u6D41\u7A0B\uFF0C\u518D\u4FDD\u5B58\u5230\u5F53\u524D\u4F1A\u8BDD\u3002" })
                            : _jsx("div", { className: "dsh-wp-workflow-list", children: items.map((item) => _jsxs("button", { className: "dsh-wp-workflow-row", onClick: () => void selectSaved(item.id), disabled: busy, children: [_jsxs("span", { children: [_jsx("b", { children: item.title }), _jsx("small", { children: item.objective || '尚未填写目标' })] }), _jsxs("span", { className: "dsh-wp-workflow-meta", children: [item.taskCount, " \u4E2A\u4EFB\u52A1 \u00B7 \u4FEE\u8BA2 ", item.revision, _jsx("b", { "aria-hidden": "true", children: "\u5173\u8054\u5E76\u6253\u5F00 \u2192" })] })] }, item.id)) })] })] });
    if (!editing)
        return _jsxs("main", { className: "dsh-wp-root dsh-wp-home", "data-theme": theme.active.colorScheme, children: [_jsxs("header", { className: "dsh-wp-header", children: [_jsxs("div", { children: [_jsx("h1", { children: "\u5DE5\u4F5C\u6D41" }), _jsx("p", { children: "\u628A\u76EE\u6807\u3001\u8D44\u6599\u548C\u4EFB\u52A1\u6574\u7406\u6210\u53EF\u7F16\u8F91\u7684\u6D41\u7A0B\uFF0C\u518D\u4EA4\u7ED9 DSH Agent \u6267\u884C\u3002" })] }), _jsxs("div", { className: "dsh-wp-home-actions", children: [themeControl, _jsx("button", { className: "is-primary", onClick: createNew, disabled: busy, children: "\uFF0B \u65B0\u5EFA\u5DE5\u4F5C\u6D41" })] })] }), error && _jsx("div", { className: "dsh-wp-alert is-error", role: "alert", children: error }), notice && _jsx("div", { className: "dsh-wp-alert", role: "status", children: notice }), pendingDrafts.length > 0 && _jsxs("section", { className: "dsh-wp-saved-list", "aria-label": "\u5F85\u5904\u7406\u547D\u4EE4\u8349\u7A3F\u6062\u590D\u5165\u53E3", children: [_jsxs("div", { className: "dsh-wp-section-heading", children: [_jsxs("div", { children: [_jsx("h2", { children: "\u5F85\u5904\u7406\u547D\u4EE4\u8349\u7A3F" }), _jsx("p", { children: "\u53EF\u4ECE\u8FD9\u91CC\u6062\u590D\u5C1A\u672A\u53D1\u9001\u666E\u901A\u804A\u5929\u6D88\u606F\u7684\u4F1A\u8BDD\u8349\u7A3F\uFF1B\u8349\u7A3F\u5185\u5BB9\u4ECD\u7531\u539F\u4F1A\u8BDD Host \u6821\u9A8C\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u5173\u8054\u6216\u8FD0\u884C\u3002" })] }), _jsxs("span", { children: [pendingDrafts.length, " \u9879"] })] }), _jsx("div", { className: "dsh-wp-workflow-list", children: pendingDrafts.map((draft) => _jsxs("button", { className: "dsh-wp-workflow-row", onClick: () => requestSessionPanel(ctx, draft.sessionId), children: [_jsxs("span", { children: [_jsx("b", { children: draft.workflowTitle }), _jsxs("small", { children: ["\u4F1A\u8BDD ", draft.sessionId, " \u00B7 \u547D\u4EE4 ", draft.commandId, " \u00B7 \u6A21\u578B ", draft.model] })] }), _jsxs("span", { className: "dsh-wp-workflow-meta", children: [draft.taskCount, " \u4E2A\u4EFB\u52A1 \u00B7 \u8349\u7A3F\u4FEE\u8BA2 ", draft.revision, _jsx("b", { "aria-hidden": "true", children: "\u67E5\u770B\u8349\u7A3F \u2192" })] })] }, draft.draftId)) })] }), pendingProposals.length > 0 && _jsxs("section", { className: "dsh-wp-saved-list", "aria-label": "\u5F85\u5904\u7406\u7F16\u8F91\u5EFA\u8BAE\u6062\u590D\u5165\u53E3", children: [_jsxs("div", { className: "dsh-wp-section-heading", children: [_jsxs("div", { children: [_jsx("h2", { children: "\u5F85\u5904\u7406\u7F16\u8F91\u5EFA\u8BAE" }), _jsx("p", { children: "\u6B64\u6062\u590D\u5217\u8868\u53EA\u663E\u793A\u63D0\u6848\u7D22\u5F15\uFF1B\u70B9\u51FB\u540E\u6309\u539F\u4F1A\u8BDD\u8BFB\u53D6\u63D0\u6848\uFF0C\u4E0D\u4F1A\u91CD\u65B0\u5173\u8054\u3001\u5E94\u7528\u6216\u4E22\u5F03\u6570\u636E\u3002" })] }), _jsxs("span", { children: [pendingProposals.length, " \u9879"] })] }), _jsx("div", { className: "dsh-wp-workflow-list", children: pendingProposals.map((proposal) => _jsxs("button", { className: "dsh-wp-workflow-row", onClick: () => requestSessionPanel(ctx, proposal.sessionId), children: [_jsxs("span", { children: [_jsx("b", { children: proposal.workflowTitle }), _jsxs("small", { children: ["\u4F1A\u8BDD ", proposal.sessionId, " \u00B7 \u6D41\u7A0B ", proposal.workflowId, " \u00B7 \u6A21\u578B ", proposal.model] })] }), _jsxs("span", { className: "dsh-wp-workflow-meta", children: ["\u57FA\u4E8E\u4FEE\u8BA2 ", proposal.baseWorkflowRevision, " \u00B7 \u63D0\u6848\u4FEE\u8BA2 ", proposal.revision, _jsx("b", { "aria-hidden": "true", children: "\u67E5\u770B\u5EFA\u8BAE \u2192" })] })] }, proposal.proposalId)) })] }), _jsxs("section", { className: "dsh-wp-onboarding", children: [_jsxs("div", { className: "dsh-wp-onboarding-copy", children: [_jsx("span", { className: "dsh-wp-eyebrow", children: "\u5FEB\u901F\u5F00\u59CB" }), _jsx("h2", { children: "\u4ECE\u76EE\u6807\u5F00\u59CB\uFF0C\u9010\u6B65\u642D\u597D\u5DE5\u4F5C\u6D41" }), _jsxs("ol", { children: [_jsxs("li", { children: [_jsx("b", { children: "\u586B\u5199\u76EE\u6807\u4E0E\u5DE5\u4F5C\u533A" }), _jsx("span", { children: "\u8BBE\u7F6E\u8981\u5B8C\u6210\u4EC0\u4E48\u3001\u53C2\u8003\u54EA\u4E2A\u9879\u76EE\u76EE\u5F55\u3001\u4EA7\u7269\u5199\u5230\u54EA\u91CC\u3002" })] }), _jsxs("li", { children: [_jsx("b", { children: "\u6DFB\u52A0\u8D44\u6599" }), _jsx("span", { children: "\u5728\u4EFB\u52A1\u8282\u70B9\u4E0A\u9009\u62E9\u53C2\u8003\u6587\u4EF6\uFF0C\u6216\u5199\u4E00\u6BB5\u4E13\u7528\u63D0\u793A\u8BCD\u3002" })] }), _jsxs("li", { children: [_jsx("b", { children: "\u751F\u6210\u6216\u624B\u52A8\u5EFA\u7ACB\u4EFB\u52A1" }), _jsx("span", { children: "\u53EF\u624B\u52A8\u65B0\u589E\u4EFB\u52A1\uFF1BAI \u8349\u7A3F\u9700\u8981\u5148\u5728 DSH \u8BBE\u7F6E \u2192 Models \u914D\u7F6E\u6A21\u578B\u3002" })] }), _jsxs("li", { children: [_jsx("b", { children: "\u7F16\u8F91\u8FDE\u7EBF" }), _jsx("span", { children: "\u4F9D\u8D56\u8FB9\u8868\u793A\u5148\u540E\u987A\u5E8F\uFF1B\u4E0A\u4E0B\u6587\u8FB9\u8868\u793A\u4EFB\u52A1\u8981\u8BFB\u53D6\u7684\u8D44\u6599\u3002" })] }), _jsxs("li", { children: [_jsx("b", { children: "\u4FDD\u5B58\u5DE5\u4F5C\u6D41" }), _jsx("span", { children: "\u4FDD\u5B58\u540E\u53EF\u4ECE\u5DF2\u4FDD\u5B58\u5217\u8868\u91CD\u65B0\u6253\u5F00\uFF0C\u8282\u70B9\u4F4D\u7F6E\u548C\u8FDE\u7EBF\u4F1A\u4FDD\u7559\u3002" })] }), _jsxs("li", { children: [_jsx("b", { children: "\u8FD0\u884C\u5E76\u67E5\u770B\u7ED3\u679C" }), _jsx("span", { children: "\u7531 DSH Agent \u6309\u4F9D\u8D56\u987A\u5E8F\u5904\u7406\uFF0C\u518D\u4ECE\u8FD0\u884C\u8BE6\u60C5\u67E5\u770B\u8FDB\u5EA6\u548C\u4EA7\u7269\u68C0\u67E5\u3002" })] })] }), _jsx("p", { className: "dsh-wp-manual-note", children: "\u6CA1\u6709\u6A21\u578B\u5BC6\u94A5\u65F6\uFF0C\u624B\u52A8\u7F16\u8F91\u3001\u8FDE\u7EBF\u548C\u4FDD\u5B58\u4ECD\u53EF\u4F7F\u7528\uFF1B\u53EA\u6709 AI \u751F\u6210\u4E0E Agent \u8FD0\u884C\u9700\u8981\u5DF2\u914D\u7F6E\u7684\u6A21\u578B\u3002" }), _jsx("button", { className: "is-primary", onClick: createNew, disabled: busy, children: "\u65B0\u5EFA\u624B\u52A8\u5DE5\u4F5C\u6D41" })] }), _jsxs("div", { className: "dsh-wp-node-guide", "aria-label": "\u5DE5\u4F5C\u6D41\u8282\u70B9\u548C\u8FDE\u7EBF\u8BF4\u660E", children: [_jsxs("article", { children: [_jsx("span", { className: "dsh-wp-guide-symbol is-task", children: "T" }), _jsxs("div", { children: [_jsx("b", { children: "Task \u00B7 \u6267\u884C\u4EFB\u52A1" }), _jsx("p", { children: "\u5199\u660E\u505A\u4EC0\u4E48\u3001\u6B65\u9AA4\u548C\u9A8C\u6536\u6761\u4EF6\u3002" })] })] }), _jsxs("article", { children: [_jsx("span", { className: "dsh-wp-guide-symbol is-file", children: "F" }), _jsxs("div", { children: [_jsx("b", { children: "\u53C2\u8003\u6587\u4EF6 \u00B7 \u5DE5\u4F5C\u533A\u6587\u4EF6" }), _jsx("p", { children: "\u5F15\u7528\u5DE5\u4F5C\u533A\u5185\u5DF2\u6709\u7684 UTF-8 \u6587\u4EF6\uFF0C\u8FD0\u884C\u524D\u7531 DSH Host \u8BFB\u53D6\u3002" })] })] }), _jsxs("article", { children: [_jsx("span", { className: "dsh-wp-guide-symbol is-prompt", children: "P" }), _jsxs("div", { children: [_jsx("b", { children: "\u63D0\u793A\u8BCD \u00B7 \u8865\u5145\u8981\u6C42" }), _jsx("p", { children: "\u4FDD\u5B58\u6587\u672C\u8BF4\u660E\uFF0C\u53EF\u9009\u62E9\u662F\u5426\u542F\u7528\u3002" })] })] }), _jsxs("div", { className: "dsh-wp-edge-guide", children: [_jsxs("span", { children: [_jsx("i", { className: "is-dependency" }), "\u4F9D\u8D56\u8FB9\uFF1A\u4EFB\u52A1\u5148\u540E\u987A\u5E8F"] }), _jsxs("span", { children: [_jsx("i", { className: "is-context" }), "\u4E0A\u4E0B\u6587\u8FB9\uFF1A\u8D44\u6599\u6D41\u5411\u4EFB\u52A1"] })] })] })] }), _jsxs("section", { className: "dsh-wp-saved-list", children: [_jsxs("div", { className: "dsh-wp-section-heading", children: [_jsxs("div", { children: [_jsx("h2", { children: "\u5DF2\u4FDD\u5B58\u7684\u5DE5\u4F5C\u6D41" }), _jsx("p", { children: "\u9009\u62E9\u8981\u7EE7\u7EED\u7F16\u8F91\u7684\u9879\u76EE\u3002\u5DF2\u6709\u5185\u5BB9\u548C\u9A8C\u6536\u6837\u4F8B\u4F1A\u4FDD\u7559\u5728\u8FD9\u91CC\u3002" })] }), _jsxs("span", { children: [items.length, " \u9879"] })] }), items.length === 0 ? _jsx("p", { className: "dsh-wp-empty-card", children: "\u8FD8\u6CA1\u6709\u5DF2\u4FDD\u5B58\u7684\u5DE5\u4F5C\u6D41\u3002\u65B0\u5EFA\u540E\u4FDD\u5B58\u5373\u53EF\u5728\u8FD9\u91CC\u91CD\u65B0\u6253\u5F00\u3002" }) : _jsx("div", { className: "dsh-wp-workflow-list", children: items.map((item) => _jsxs("button", { className: "dsh-wp-workflow-row", onClick: () => void selectSaved(item.id), disabled: busy, children: [_jsxs("span", { children: [_jsx("b", { children: item.title }), _jsx("small", { children: item.objective || '尚未填写目标' })] }), _jsxs("span", { className: "dsh-wp-workflow-meta", children: [item.taskCount, " \u4E2A\u4EFB\u52A1 \u00B7 \u4FEE\u8BA2 ", item.revision, _jsx("b", { "aria-hidden": "true", children: "\u6253\u5F00 \u2192" })] })] }, item.id)) })] })] });
    return (_jsxs("main", { className: `dsh-wp-root${sessionId ? ' is-session-scope' : ''}`, "data-theme": theme.active.colorScheme, children: [sessionId && _jsxs("div", { className: "dsh-wp-session-nav", children: [_jsx("button", { className: "dsh-wp-back", onClick: returnToList, children: "\u2190 \u5F53\u524D\u4F1A\u8BDD" }), surface === 'main' && _jsx("button", { className: "dsh-wp-back", onClick: () => ctx.layout.selectPanel('conversation'), children: "\u8FD4\u56DE\u5BF9\u8BDD" }), hasParkedEditor && _jsx("button", { className: "dsh-wp-back", onClick: restoreParkedEditor, children: "\u8FD4\u56DE\u5148\u524D\u7F16\u8F91" })] }), _jsxs("header", { className: "dsh-wp-header", children: [_jsxs("div", { className: "dsh-wp-title-block", children: [_jsx("button", { className: "dsh-wp-back", onClick: returnToList, children: "\u2190 \u6240\u6709\u5DE5\u4F5C\u6D41" }), _jsx("h1", { children: workflow.title || '未命名工作流' }), _jsx("p", { children: "\u753B\u5E03\u4E0A\u62D6\u52A8\u8282\u70B9\u3001\u62D6\u52A8\u8FDE\u7EBF\uFF1B\u9009\u4E2D\u8282\u70B9\u540E\u5728\u4FA7\u680F\u7F16\u8F91\u3002" })] }), _jsxs("div", { className: "dsh-wp-toolbar", children: [_jsxs("select", { "aria-label": "\u6253\u5F00\u5DF2\u4FDD\u5B58\u7684\u5DE5\u4F5C\u6D41", value: savedWorkflowId, onChange: (event) => void selectSaved(event.target.value), disabled: busy || Boolean(editProposal) || hasUnsavedCanvasChanges, children: [_jsx("option", { value: "", children: "\u5F53\u524D\u8349\u7A3F" }), items.map((item) => _jsxs("option", { value: item.id, children: [item.title, "\uFF08", item.taskCount, " \u9879\uFF09"] }, item.id))] }), _jsx("button", { onClick: createNew, disabled: busy || Boolean(editProposal) || hasUnsavedCanvasChanges, children: "\u65B0\u5EFA" }), !sessionId && _jsxs("label", { className: "dsh-wp-file-button", children: ["\u5BFC\u5165 Markdown", _jsx("input", { type: "file", accept: ".md,.markdown,text/markdown,text/plain", onChange: (event) => { const file = event.target.files?.[0]; if (file)
                                            void importMarkdown(file); event.currentTarget.value = ''; } })] }), _jsx("button", { onClick: () => void generatePlan(), disabled: busy || Boolean(editProposal) || !workflow.workspaceDirectory.trim(), children: "AI \u751F\u6210\u6D41\u7A0B\u8349\u7A3F" }), _jsx("button", { className: "is-primary", onClick: () => void save(), disabled: busy, children: editProposal && activeEditProposalId === editProposal.proposalId ? '保存建议修改' : '保存' }), editProposal && activeEditProposalId === editProposal.proposalId && _jsxs(_Fragment, { children: [_jsx("button", { className: "is-primary", onClick: () => void applyEditProposal(), disabled: busy || JSON.stringify(workflow) !== JSON.stringify(editProposal.workflow), children: "\u5E94\u7528\u4FEE\u6539" }), _jsx("button", { className: "is-danger", onClick: () => void discardEditProposal(), disabled: busy, children: "\u653E\u5F03\u4FEE\u6539" })] }), themeControl] })] }), (error || notice) && _jsx("div", { className: `dsh-wp-alert${error ? ' is-error' : ''}`, role: error ? 'alert' : 'status', children: error || notice }), editProposal && _jsxs("section", { className: "dsh-wp-command-draft is-active", role: "status", children: [_jsxs("b", { children: ["\u7F16\u8F91\u5EFA\u8BAE \u00B7 \u57FA\u4E8E\u6D41\u7A0B\u4FEE\u8BA2 ", editProposal.baseWorkflowRevision, " \u00B7 \u63D0\u6848\u4FEE\u8BA2 ", editProposal.revision] }), _jsxs("span", { children: ["\u547D\u4EE4 ", editProposal.commandId, " \u00B7 \u6D41\u7A0B ", editProposal.workflowId, " \u00B7 \u6A21\u578B ", editProposal.model, "\u3002\u5E94\u7528\u524D\u539F\u6D41\u7A0B\u4FDD\u6301\u4E0D\u53D8\uFF1B\u6B64\u9636\u6BB5\u4E0D\u4F1A\u8FD0\u884C\u5DE5\u4F5C\u6D41\u3002"] }), editProposal.instruction
                        ? _jsxs("small", { children: ["\u672C\u6B21\u4FEE\u6539\u8981\u6C42\uFF1A", editProposal.instruction] })
                        : _jsx("small", { children: "\u8FD9\u662F Alpha.11 \u53CA\u66F4\u65E9\u7248\u672C\u4FDD\u5B58\u7684\u63D0\u6848\uFF0C\u672A\u4FDD\u7559\u539F\u59CB\u4FEE\u6539\u8BF4\u660E\u3002\u8BF7\u9010\u9879\u4EBA\u5DE5\u6838\u5BF9\u5DEE\u5F02\uFF1B\u6B64\u63D0\u6848\u4E0D\u4F1A\u81EA\u52A8\u5E94\u7528\u3002" }), proposalDiff && _jsx(EditProposalDiff, { base: editProposal.baseWorkflow, candidate: workflow, diff: proposalDiff }), JSON.stringify(workflow) !== JSON.stringify(editProposal.workflow) && _jsx("small", { children: "\u753B\u5E03\u5305\u542B\u5C1A\u672A\u4FDD\u5B58\u7684\u5EFA\u8BAE\u4FEE\u6539\u3002\u5148\u70B9\u201C\u4FDD\u5B58\u5EFA\u8BAE\u4FEE\u6539\u201D\uFF0C\u518D\u5E94\u7528\u3002" })] }), commandDraft && commandDraft.draftId !== activeCommandDraftId && _jsxs("section", { className: "dsh-wp-command-draft", role: "status", children: [_jsxs("div", { children: [_jsx("b", { children: "\u672C\u4F1A\u8BDD\u53E6\u6709\u547D\u4EE4\u8349\u7A3F\u5F85\u68C0\u67E5" }), _jsxs("p", { children: [commandDraft.workflow.title, " \u00B7 \u4FEE\u8BA2 ", commandDraft.revision, " \u00B7 ", commandDraft.model] }), _jsx("small", { children: "\u6253\u5F00\u8349\u7A3F\u4E0D\u4F1A\u8986\u76D6\u5F53\u524D\u7F16\u8F91\uFF1B\u8FD4\u56DE\u6309\u94AE\u53EF\u6062\u590D\u5F53\u524D\u9875\u9762\u7684\u7F16\u8F91\u5185\u5BB9\u3002" })] }), _jsx("button", { className: "is-primary", onClick: () => openCommandDraft(commandDraft), disabled: busy, children: "\u67E5\u770B\u547D\u4EE4\u8349\u7A3F" })] }), activeCommandDraftId && commandDraft?.draftId === activeCommandDraftId && _jsxs("div", { className: "dsh-wp-command-draft is-active", role: "status", children: [_jsx("b", { children: "\u547D\u4EE4\u8349\u7A3F \u00B7 \u5C1A\u672A\u4FDD\u5B58" }), _jsx("span", { children: "\u68C0\u67E5\u8282\u70B9\u548C\u8FDE\u7EBF\u540E\u70B9\u51FB\u201C\u4FDD\u5B58\u201D\u5EFA\u7ACB\u5F53\u524D\u4F1A\u8BDD\u5173\u8054\u3002\u6B64\u65F6\u6CA1\u6709\u5DE5\u4F5C\u6D41\u8FD0\u884C\u8BB0\u5F55\u3002" })] }), _jsxs("details", { className: "dsh-wp-settings", open: settingsOpen, onToggle: (event) => setSettingsOpen(event.currentTarget.open), children: [_jsxs("summary", { children: [_jsx("span", { children: "\u5DE5\u4F5C\u6D41\u8BBE\u7F6E" }), _jsx("small", { children: "\u76EE\u6807\u3001\u5DE5\u4F5C\u533A\u4E0E\u8F93\u51FA\u4F4D\u7F6E" })] }), _jsxs("div", { className: "dsh-wp-settings-grid", children: [_jsxs("label", { children: ["\u5DE5\u4F5C\u6D41\u540D\u79F0", _jsx("input", { value: workflow.title, disabled: !canEditSettings, onChange: (event) => setWorkflow({ ...workflow, title: event.target.value }) })] }), _jsxs("label", { className: "is-wide", children: ["\u6574\u4F53\u76EE\u6807", _jsx("textarea", { rows: 3, value: workflow.objective, disabled: !canEditSettings, onChange: (event) => setWorkflow({ ...workflow, objective: event.target.value }), placeholder: "\u8BF7\u63CF\u8FF0\u9879\u76EE\u76EE\u6807\u3001\u7EA6\u675F\u548C\u9A8C\u6536\u6761\u4EF6\u3002" })] }), _jsxs("div", { className: "dsh-wp-path-field is-wide", children: [_jsxs("label", { children: ["\u5DE5\u4F5C\u533A\u76EE\u5F55", _jsx("textarea", { "aria-label": "\u5DE5\u4F5C\u533A\u76EE\u5F55", rows: 2, spellCheck: false, value: workflow.workspaceDirectory, disabled: !canEditSettings, onBlur: (event) => { try {
                                                    const value = normalizeDirectoryInput(event.target.value);
                                                    setWorkflow((current) => ({ ...current, workspaceDirectory: value, outputDirectory: current.outputDirectory || value }));
                                                    setError('');
                                                }
                                                catch (cause) {
                                                    setError(errorMessage(cause));
                                                } }, onChange: (event) => setWorkflow({ ...workflow, workspaceDirectory: event.target.value, outputDirectory: workflow.outputDirectory || event.target.value }), placeholder: "\u586B\u5199\u73B0\u6709\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u6216\u9009\u62E9\u4E00\u4E2A\u6587\u4EF6\u5939" })] }), _jsx("button", { onClick: () => void pickDirectory('workspace'), disabled: !canEditSettings || busy || folderPickerBusy, children: "\u9009\u62E9\u6587\u4EF6\u5939" }), _jsx("button", { onClick: () => openFolderPicker('workspace'), disabled: !canEditSettings || busy || folderPickerBusy, children: "\u6D4F\u89C8\u76EE\u5F55" })] }), _jsxs("div", { className: "dsh-wp-path-field is-wide", children: [_jsxs("label", { children: ["\u8F93\u51FA\u76EE\u5F55", _jsx("textarea", { "aria-label": "\u8F93\u51FA\u76EE\u5F55", rows: 2, spellCheck: false, value: workflow.outputDirectory, disabled: !canEditSettings, onBlur: (event) => { try {
                                                    setWorkflow((current) => ({ ...current, outputDirectory: normalizeDirectoryInput(event.target.value) }));
                                                    setError('');
                                                }
                                                catch (cause) {
                                                    setError(errorMessage(cause));
                                                } }, onChange: (event) => setWorkflow({ ...workflow, outputDirectory: event.target.value }), placeholder: "\u9009\u62E9\u5DE5\u4F5C\u533A\u5185\u7684\u73B0\u6709\u76EE\u5F55" })] }), _jsx("button", { onClick: () => void pickDirectory('output'), disabled: !canEditSettings || busy || folderPickerBusy || !workflow.workspaceDirectory.trim(), children: "\u9009\u62E9\u6587\u4EF6\u5939" }), _jsx("button", { onClick: () => openFolderPicker('output'), disabled: !canEditSettings || busy || folderPickerBusy || !workflow.workspaceDirectory.trim(), children: "\u6D4F\u89C8\u76EE\u5F55" }), _jsx("button", { onClick: () => void createOutputDirectory(), disabled: !canEditSettings || busy || folderPickerBusy || !workflow.workspaceDirectory.trim() || !workflow.outputDirectory.trim(), children: "\u521B\u5EFA\u8F93\u51FA\u76EE\u5F55" })] })] })] }), folderPickerTarget && _jsx("div", { className: "dsh-wp-folder-backdrop", role: "presentation", children: _jsxs("section", { className: "dsh-wp-folder-dialog", role: "dialog", "aria-modal": "true", "aria-label": `选择${folderPickerTarget === 'workspace' ? '工作区' : '输出'}文件夹`, children: [_jsx("header", { children: _jsxs("div", { children: [_jsxs("h2", { children: ["\u9009\u62E9", folderPickerTarget === 'workspace' ? '工作区' : '输出', "\u6587\u4EF6\u5939"] }), _jsx("p", { children: "\u8FD9\u91CC\u53EA\u6D4F\u89C8\u6587\u4EF6\u5939\u540D\u79F0\uFF1B\u53D6\u6D88\u4E0D\u4F1A\u66F4\u6539\u5F53\u524D\u8BBE\u7F6E\u3002" })] }) }), _jsxs("div", { className: "dsh-wp-folder-path", children: [_jsx("input", { "aria-label": "\u5F53\u524D\u6587\u4EF6\u5939\u8DEF\u5F84", value: folderPickerPath, onChange: (event) => setFolderPickerPath(event.target.value), onKeyDown: (event) => { if (event.key === 'Enter')
                                        void browseFolder(folderPickerPath, folderPickerRoot); } }), _jsx("button", { onClick: () => void browseFolder(folderPickerPath, folderPickerRoot), disabled: folderPickerBusy, children: "\u8F6C\u5230" })] }), folderPickerError && _jsx("p", { className: "dsh-wp-folder-error", role: "alert", children: folderPickerError }), _jsxs("p", { className: "dsh-wp-folder-current", children: ["\u5F53\u524D\u4F4D\u7F6E\uFF1A", folderPickerPath || '尚未选择'] }), _jsx("div", { className: "dsh-wp-folder-list", "aria-label": "\u5B50\u6587\u4EF6\u5939", children: folderPickerBusy ? _jsx("p", { children: "\u6B63\u5728\u8BFB\u53D6\u6587\u4EF6\u5939\u2026" }) : folderPickerDirectories.length ? folderPickerDirectories.map((entry) => _jsxs("button", { onClick: () => void browseFolder(entry.path, folderPickerRoot), children: [_jsx("span", { "aria-hidden": "true", children: "\uD83D\uDCC1" }), entry.name, _jsx("small", { children: "\u6253\u5F00" })] }, entry.path)) : _jsx("p", { children: "\u6B64\u76EE\u5F55\u4E0B\u6CA1\u6709\u53EF\u663E\u793A\u7684\u5B50\u6587\u4EF6\u5939\u3002" }) }), _jsxs("footer", { children: [_jsx("button", { onClick: () => folderPickerParent && void browseFolder(folderPickerParent, folderPickerRoot), disabled: folderPickerBusy || !folderPickerParent, children: "\u4E0A\u4E00\u7EA7" }), _jsx("span", {}), _jsx("button", { onClick: () => { folderPickerSequence.current++; setFolderPickerTarget(undefined); }, children: "\u53D6\u6D88" }), _jsx("button", { className: "is-primary", onClick: chooseFolder, disabled: folderPickerBusy || !folderPickerPath, children: "\u9009\u62E9\u5F53\u524D\u6587\u4EF6\u5939" })] })] }) }), _jsxs("section", { className: "dsh-wp-actions", children: [_jsxs("span", { children: ["\u8282\u70B9 ", workflow.nodes.length, "\u3000\u4EFB\u52A1 ", taskNodes.length, "\u3000\u8D44\u6599 ", workflow.nodes.length - taskNodes.length, "\u3000\u4FEE\u8BA2 ", workflow.revision] }), _jsxs("div", { className: "dsh-wp-actions-group", children: [_jsx("button", { onClick: () => addNode('task'), disabled: !canEdit, children: "\uFF0B \u4EFB\u52A1" }), _jsxs("details", { className: "dsh-wp-add-menu", children: [_jsx("summary", { children: "\uFF0B \u6DFB\u52A0\u8D44\u6599" }), _jsxs("div", { children: [_jsxs("button", { onClick: () => selectedNode?.type === 'task' ? addContextToTask(selectedNode.id, 'file') : addNode('file'), disabled: !canEdit || Boolean(editProposal), children: ["\u53C2\u8003\u6587\u4EF6", selectedNode?.type === 'task' ? '并关联所选任务' : ''] }), _jsxs("button", { onClick: () => selectedNode?.type === 'task' ? addContextToTask(selectedNode.id, 'prompt') : addNode('prompt'), disabled: !canEdit || Boolean(editProposal), children: ["\u63D0\u793A\u8BCD", selectedNode?.type === 'task' ? '并关联所选任务' : ''] })] })] }), selectedNode && _jsx("button", { className: "is-danger", onClick: () => deleteNode(selectedNode.id), disabled: !canEdit, children: "\u5220\u9664\u6240\u9009" }), _jsxs("button", { onClick: () => setInspectorOpen((open) => !open), "aria-expanded": inspectorOpen, children: ["\u8BE6\u60C5 ", inspectorOpen ? '隐藏' : '显示'] }), revisionNeedsApply && _jsx("button", { className: "is-primary", onClick: () => void runAction('apply'), disabled: busy || Boolean(editProposal) || active && currentRun?.state !== 'paused', children: "\u5E94\u7528\u4FEE\u6539\u5E76\u8FD0\u884C" }), _jsx("button", { className: "is-primary", onClick: () => void startRun(), disabled: busy || runLocked || !savedWorkflowId || Boolean(editProposal), children: "\u8FD0\u884C" })] })] }), revisionNeedsApply && _jsxs("p", { className: "dsh-wp-revision-note", role: "status", children: ["\u5DF2\u4FDD\u5B58\u4FEE\u8BA2 ", workflow.revision, "\uFF0C\u5F53\u524D\u8FD0\u884C\u4ECD\u4F7F\u7528\u4FEE\u8BA2 ", currentRun?.workflow.revision, "\u3002\u5E94\u7528\u540E\uFF0C\u5185\u5BB9\u3001\u8D44\u6599\u6216\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u7684\u4EFB\u52A1\u53CA\u5176\u540E\u7EE7\u5C06\u91CD\u65B0\u6267\u884C\uFF1B\u8F93\u5165\u548C\u4EA7\u7269\u5747\u672A\u53D8\u5316\u3001\u4E14\u78C1\u76D8\u6587\u4EF6\u590D\u6838\u4E00\u81F4\u7684\u6210\u529F\u4EFB\u52A1\u4F1A\u660E\u786E\u6807\u8BB0\u4E3A\u590D\u7528\u3002\u65E7\u8FD0\u884C\u8BB0\u5F55\u7EE7\u7EED\u4FDD\u7559\u3002"] }), currentRun && _jsx(RunProgress, { run: currentRun, syncError: runSyncError, onTask: onTaskConversation, onStop: busy ? undefined : () => void runAction('cancel') }), _jsxs("div", { className: `dsh-wp-workarea${inspectorOpen ? ' has-inspector' : ''}`, children: [_jsxs("div", { className: "dsh-wp-canvas", "aria-label": "\u5DE5\u4F5C\u6D41\u753B\u5E03", children: [_jsxs(ReactFlow, { onInit: (instance) => setFlowInstance(instance), nodes: flowNodes, edges: flowEdges, nodeTypes: NODE_TYPES, onNodesChange: onNodesChange, onEdgesChange: onEdgesChange, onConnect: onConnect, onNodeClick: (_event, node) => { setSelectedNodeId(node.id); setInspectorOpen(true); setNodeMenu(undefined); setPreview(undefined); if (node.type === 'task' && currentRun)
                                    onTaskConversation(node.id); }, onNodeContextMenu: (event, node) => { event.preventDefault(); setSelectedNodeId(node.id); setInspectorOpen(true); setNodeMenu({ id: node.id, x: Math.min(event.clientX, window.innerWidth - 190), y: Math.min(event.clientY, window.innerHeight - 90) }); }, onPaneClick: () => setNodeMenu(undefined), isValidConnection: (connection) => canConnect(workflow, connection), fitView: true, fitViewOptions: { padding: 0.25 }, minZoom: 0.25, maxZoom: 1.8, deleteKeyCode: canEdit ? ['Backspace', 'Delete'] : null, nodesDraggable: true, nodesConnectable: canEdit, elementsSelectable: true, panOnDrag: true, panOnScroll: true, zoomOnScroll: true, children: [_jsx(Background, { gap: 24, size: 1, color: "var(--dsw-alias-border-l2)" }), _jsx(MiniMap, { pannable: true, zoomable: true, nodeColor: (node) => node.type === 'task' ? 'var(--dsw-alias-brand-primary)' : node.type === 'file' ? 'var(--dsw-alias-state-success-primary)' : 'var(--dsw-alias-label-tertiary)' }), _jsx(Controls, { showInteractive: true })] }), nodeMenu && _jsx("div", { className: "dsh-wp-context-menu", role: "menu", style: { left: nodeMenu.x, top: nodeMenu.y }, children: _jsx("button", { role: "menuitem", className: "is-danger", onClick: () => deleteNode(nodeMenu.id), children: "\u5220\u9664\u6B64\u8282\u70B9" }) })] }), inspectorOpen && _jsxs("aside", { className: "dsh-wp-inspector", children: [_jsxs("div", { className: "dsh-wp-inspector-top", children: [_jsx("strong", { children: selectedNode ? '节点详情' : '运行详情' }), _jsx("button", { "aria-label": "\u5173\u95ED\u8BE6\u60C5", onClick: () => setInspectorOpen(false), children: "\u6536\u8D77" })] }), selectedNode ? _jsx(NodeInspector, { node: selectedNode, canEdit: canEdit, taskNodes: workflow.nodes, links: linksToSelected, workflow: workflow, run: currentRun, preview: preview, onUpdate: (update) => updateNode(selectedNode.id, update), onPreview: () => selectedNode.type === 'file' && void previewFile(selectedNode), onLink: (contextId) => changeWorkflow((current) => {
                                    if (current.edges.some((edge) => edge.type === 'context' && edge.source === contextId && edge.target === selectedNode.id))
                                        return current;
                                    return { ...current, edges: [...current.edges, { type: 'context', id: newId(), source: contextId, target: selectedNode.id }] };
                                }), onUnlink: (contextId) => changeWorkflow((current) => ({ ...current, edges: current.edges.filter((edge) => !(edge.type === 'context' && edge.source === contextId && edge.target === selectedNode.id)) })) }) : _jsx("p", { className: "dsh-wp-empty", children: "\u9009\u4E2D\u753B\u5E03\u8282\u70B9\u540E\uFF0C\u5728\u8FD9\u91CC\u7F16\u8F91\u5185\u5BB9\u3001\u5173\u8054\u8D44\u6599\u5E76\u67E5\u770B\u8FD0\u884C\u8BB0\u5F55\u3002" }), currentRun && _jsx(RunInspector, { run: currentRun, busy: busy, onAction: (action, taskId) => void runAction(action, taskId) })] })] }), _jsx("footer", { className: "dsh-wp-footer", children: "\u6570\u636E\u4FDD\u5B58\u5728 DSH_HOME\u3002\u624B\u52A8\u7F16\u8F91\u65E0\u9700\u6A21\u578B\uFF1BAI \u8349\u7A3F\u4E0E Agent \u8FD0\u884C\u9700\u8981 DSH \u8BBE\u7F6E \u2192 Models \u4E2D\u5DF2\u914D\u7F6E\u7684\u6A21\u578B\u3002" })] }));
}
function NodeInspector(props) {
    const { node } = props;
    const currentRunTask = props.run?.tasks.find((task) => task.taskId === node.id);
    const contexts = props.taskNodes.filter((item) => item.type !== 'task');
    return (_jsxs("div", { className: "dsh-wp-inspector-section", children: [_jsx("div", { className: `dsh-wp-type-badge is-${node.type}`, children: node.type === 'task' ? '任务节点' : node.type === 'file' ? '文件节点' : '提示词节点' }), _jsxs("label", { children: ["\u6807\u9898", _jsx("input", { value: node.title, disabled: !props.canEdit, onChange: (event) => props.onUpdate((current) => ({ ...current, title: event.target.value })) })] }), node.type === 'task' && _jsxs(_Fragment, { children: [_jsxs("label", { children: ["\u4EFB\u52A1\u8981\u6C42", _jsx("textarea", { rows: 5, value: node.instructions, disabled: !props.canEdit, onChange: (event) => props.onUpdate((current) => current.type === 'task' ? { ...current, instructions: event.target.value } : current) })] }), _jsxs("label", { children: ["\u9A8C\u6536\u6761\u4EF6\uFF08\u6BCF\u884C\u4E00\u6761\uFF09", _jsx("textarea", { rows: 3, value: node.acceptanceCriteria.join('\n'), disabled: !props.canEdit, onChange: (event) => props.onUpdate((current) => current.type === 'task' ? { ...current, acceptanceCriteria: lines(event.target.value) } : current) })] }), _jsxs("label", { children: ["\u9884\u671F\u4EA7\u7269\uFF08\u76F8\u5BF9\u8F93\u51FA\u76EE\u5F55\uFF0C\u6BCF\u884C\u4E00\u4E2A\uFF09", _jsx("textarea", { rows: 2, value: node.expectedArtifacts.join('\n'), disabled: !props.canEdit, onChange: (event) => props.onUpdate((current) => current.type === 'task' ? { ...current, expectedArtifacts: lines(event.target.value) } : current) })] }), _jsxs("label", { children: ["\u6587\u4EF6\u5185\u5BB9\u68C0\u67E5\uFF08\u6BCF\u884C\u586B\u5199\u201C\u76F8\u5BF9\u8DEF\u5F84 + \u5236\u8868\u7B26 + \u5FC5\u987B\u5305\u542B\u7684\u6587\u672C\u201D\uFF09", _jsx("textarea", { rows: 2, value: node.expectedContents.map(({ path, text }) => `${path}\t${text}`).join('\n'), disabled: !props.canEdit, onChange: (event) => props.onUpdate((current) => current.type === 'task' ? { ...current, expectedContents: parseContentChecks(event.target.value) } : current) })] }), _jsxs("label", { className: "dsh-wp-checkbox", children: [_jsx("input", { type: "checkbox", checked: node.acceptanceMode === 'automatic', disabled: !props.canEdit, onChange: (event) => props.onUpdate((current) => current.type === 'task' ? { ...current, acceptanceMode: event.target.checked ? 'automatic' : 'manual' } : current) }), "\u81EA\u52A8\u6838\u9A8C\u9884\u671F\u4EA7\u7269\uFF1B\u672A\u52FE\u9009\u65F6\u7B49\u5F85\u4EBA\u5DE5\u9A8C\u6536"] })] }), node.type === 'file' && _jsxs(_Fragment, { children: [_jsxs("label", { children: ["\u5DE5\u4F5C\u533A\u5185\u7684\u7EDD\u5BF9\u6587\u4EF6\u8DEF\u5F84", _jsx("textarea", { rows: 2, spellCheck: false, value: node.path, disabled: !props.canEdit, onChange: (event) => props.onUpdate((current) => current.type === 'file' ? { ...current, path: event.target.value } : current), placeholder: `${props.workflow.workspaceDirectory}\inputs\需求.md` })] }), _jsx("button", { onClick: props.onPreview, disabled: !node.path.trim(), children: "\u9884\u89C8\u5E76\u6821\u9A8C\u6587\u4EF6" }), props.preview?.path === node.path && _jsxs("pre", { className: "dsh-wp-preview", children: [props.preview.content.slice(0, 12000), props.preview.content.length > 12000 ? '\n…（预览截断，运行快照保留完整文件）' : ''] })] }), node.type === 'prompt' && _jsxs(_Fragment, { children: [_jsxs("label", { children: ["\u8865\u5145\u8981\u6C42", _jsx("textarea", { rows: 7, value: node.text, disabled: !props.canEdit, onChange: (event) => props.onUpdate((current) => current.type === 'prompt' ? { ...current, text: event.target.value } : current) })] }), _jsxs("label", { className: "dsh-wp-checkbox", children: [_jsx("input", { type: "checkbox", checked: node.enabled, disabled: !props.canEdit, onChange: (event) => props.onUpdate((current) => current.type === 'prompt' ? { ...current, enabled: event.target.checked } : current) }), "\u542F\u7528\u6B64\u63D0\u793A\u8BCD"] })] }), node.type === 'task' && _jsxs(_Fragment, { children: [_jsx("h3", { children: "\u5173\u8054\u4E0A\u4E0B\u6587" }), _jsxs("div", { className: "dsh-wp-context-list", children: [props.links.map((edge) => _jsxs("div", { children: [_jsx("span", { children: props.workflow.nodes.find((item) => item.id === edge.source)?.title ?? edge.source }), _jsx("button", { onClick: () => props.onUnlink(edge.source), disabled: !props.canEdit, children: "\u89E3\u9664" })] }, edge.id)), contexts.filter((context) => !props.links.some((edge) => edge.source === context.id)).map((context) => _jsxs("button", { onClick: () => props.onLink(context.id), disabled: !props.canEdit, children: ["\uFF0B ", context.title] }, context.id)), contexts.length === 0 && _jsx("small", { children: "\u8FD8\u6CA1\u6709\u6587\u4EF6\u6216\u63D0\u793A\u8BCD\u8282\u70B9\u3002\u53EF\u4ECE\u4E0A\u65B9\u6DFB\u52A0\uFF0C\u6216\u62D6\u52A8\u4E0A\u4E0B\u6587\u8282\u70B9\u8FDE\u5230\u4EFB\u52A1\u3002" })] })] }), currentRunTask && _jsxs(_Fragment, { children: [_jsx("h3", { children: "\u6700\u8FD1\u8FD0\u884C" }), _jsxs("p", { children: ["\u72B6\u6001\uFF1A", taskStateLabel(currentRunTask.state), " \u00B7 \u672C\u6B21\u5C1D\u8BD5\uFF1A", currentRunTask.attempts.length] }), currentRunTask.reusedFromRunId && _jsxs("p", { className: "dsh-wp-reused-result", children: ["\u672C\u6B21\u590D\u7528\u4E86\u8FD0\u884C ", currentRunTask.reusedFromRunId, " \u7684\u7B2C ", currentRunTask.reusedFromAttemptNumber, " \u6B21\u6210\u529F\u7ED3\u679C\uFF1B\u8BE6\u7EC6 Agent \u8BB0\u5F55\u4ECD\u5728\u6E90\u8FD0\u884C\u4E2D\u3002"] }), currentRunTask.attempts.map((attempt) => _jsxs("article", { className: "dsh-wp-attempt", children: [_jsxs("strong", { children: ["\u7B2C ", attempt.number, " \u6B21 \u00B7 ", taskStateLabel(attempt.state)] }), attempt.agentId && _jsxs("p", { children: ["DSH \u4F1A\u8BDD\uFF1A", attempt.agentId] }), attempt.toolNames.length > 0 && _jsxs("p", { children: ["\u5DE5\u5177\uFF1A", attempt.toolNames.join('、')] }), attempt.error && _jsx("pre", { children: attempt.error }), attempt.result && _jsx("pre", { children: attempt.result.slice(0, 5000) })] }, attempt.number))] })] }));
}
function buildUiEditDiff(base, candidate) {
    const beforeNodes = new Map(base.nodes.map((node) => [node.id, node]));
    const afterNodes = new Map(candidate.nodes.map((node) => [node.id, node]));
    const beforeEdges = new Map(base.edges.map((edge) => [edge.id, edge]));
    const afterEdges = new Map(candidate.edges.map((edge) => [edge.id, edge]));
    return {
        addedNodes: candidate.nodes.filter((node) => !beforeNodes.has(node.id)),
        removedNodes: base.nodes.filter((node) => !afterNodes.has(node.id)),
        changedNodes: candidate.nodes.flatMap((node) => {
            const before = beforeNodes.get(node.id);
            return before && JSON.stringify(before) !== JSON.stringify(node) ? [{ before, after: node }] : [];
        }),
        addedEdges: candidate.edges.filter((edge) => !beforeEdges.has(edge.id)),
        removedEdges: base.edges.filter((edge) => !afterEdges.has(edge.id)),
    };
}
function EditProposalDiff({ base, candidate, diff }) {
    const name = (id) => candidate.nodes.find((node) => node.id === id)?.title ?? base.nodes.find((node) => node.id === id)?.title ?? id;
    const edgeText = (edge) => `${name(edge.source)} → ${name(edge.target)}（${edge.type === 'dependency' ? '依赖' : '资料上下文'}）`;
    return _jsxs("div", { className: "dsh-wp-edit-diff", children: [_jsx("strong", { children: "\u5F85\u5E94\u7528\u5DEE\u5F02\uFF08\u6309\u5F53\u524D\u5019\u9009\u753B\u5E03\u8BA1\u7B97\uFF09" }), !diff.addedNodes.length && !diff.removedNodes.length && !diff.changedNodes.length && !diff.addedEdges.length && !diff.removedEdges.length && _jsx("p", { children: "\u5F53\u524D\u6CA1\u6709\u5DEE\u5F02\u3002" }), diff.addedNodes.map((node) => _jsxs("p", { children: ["\uFF0B \u65B0\u589E", node.type === 'task' ? '任务' : node.type === 'file' ? '文件' : '提示词', "\uFF1A", node.title] }, `add-${node.id}`)), diff.removedNodes.map((node) => _jsxs("p", { children: ["\u2212 \u5220\u9664", node.type === 'task' ? '任务' : node.type === 'file' ? '文件' : '提示词', "\uFF1A", node.title, "\uFF08\u76F8\u5173\u8FDE\u7EBF\u4E5F\u4F1A\u79FB\u9664\uFF09"] }, `remove-${node.id}`)), diff.changedNodes.map(({ before, after }) => _jsxs("p", { children: ["\u270E \u4FEE\u6539\u201C", before.title, "\u201D\uFF1A", describeWorkflowNodeChanges(before, after).join('、') || '节点属性'] }, `change-${after.id}`)), diff.removedEdges.map((edge) => _jsxs("p", { children: ["\u2212 \u79FB\u9664\u8FDE\u7EBF\uFF1A", edgeText(edge)] }, `edge-remove-${edge.id}`)), diff.addedEdges.map((edge) => _jsxs("p", { children: ["\uFF0B \u65B0\u589E\u8FDE\u7EBF\uFF1A", edgeText(edge)] }, `edge-add-${edge.id}`))] });
}
function RunInspector({ run, busy, onAction }) {
    if (!run)
        return _jsxs("div", { className: "dsh-wp-inspector-section", children: [_jsx("h2", { children: "\u8FD0\u884C\u8BB0\u5F55" }), _jsx("p", { className: "dsh-wp-empty", children: "\u4FDD\u5B58\u540E\u53EF\u4EE5\u542F\u52A8\u4E32\u884C\u8FD0\u884C\u3002\u6BCF\u4E2A\u4EFB\u52A1\u4F7F\u7528\u72EC\u7ACB DSH \u4F1A\u8BDD\uFF0C\u5931\u8D25\u4EFB\u52A1\u4E0D\u4F1A\u81EA\u52A8\u91CD\u8BD5\u3002" })] });
    const inFlight = ['queued', 'running', 'pausing', 'paused', 'verifying', 'stopping'].includes(run.state);
    const failedTask = run.tasks.find((task) => task.state === 'failed');
    const reviewTask = run.tasks.find((task) => task.state === 'needs_review');
    return _jsxs("div", { className: "dsh-wp-inspector-section dsh-wp-run", children: [_jsx("h2", { children: "\u8FD0\u884C\u8BB0\u5F55" }), _jsx("div", { className: `dsh-wp-run-state is-${run.state}`, children: runStateLabel(run.state) }), _jsxs("p", { children: ["\u672C\u6B21\u5FEB\u7167\uFF1A\u4FEE\u8BA2 ", run.workflow.revision, " \u00B7 Run ", run.id] }), run.parentRunId && _jsxs("p", { children: ["\u6765\u6E90\u8FD0\u884C\uFF1A", run.parentRunId, "\uFF1B\u590D\u7528 ", run.tasks.filter((task) => task.reusedFromRunId).length, " \u9879\uFF0C\u9700\u91CD\u65B0\u6267\u884C ", run.invalidatedTaskIds?.length ?? 0, " \u9879\u3002"] }), run.error && _jsx("p", { className: "dsh-wp-run-error", children: run.error }), _jsxs("div", { className: "dsh-wp-run-actions", children: [run.state === 'running' && _jsx("button", { onClick: () => onAction('pause'), disabled: busy, children: "\u6682\u505C\uFF08\u5F53\u524D\u4EFB\u52A1\u7ED3\u675F\u540E\uFF09" }), run.state === 'paused' && !reviewTask && _jsx("button", { onClick: () => onAction('resume'), disabled: busy, children: "\u7EE7\u7EED" }), run.state === 'interrupted' && _jsx("button", { className: "is-primary", onClick: () => onAction('recover'), disabled: busy, children: "\u6062\u590D\u8FD0\u884C" }), run.state === 'paused' && reviewTask && _jsxs(_Fragment, { children: [_jsx("button", { className: "is-primary", onClick: () => onAction('accept', reviewTask.taskId), disabled: busy, children: "\u901A\u8FC7\u6B64\u4EFB\u52A1" }), _jsx("button", { className: "is-danger", onClick: () => onAction('reject', reviewTask.taskId), disabled: busy, children: "\u9A73\u56DE\u6B64\u4EFB\u52A1" })] }), inFlight && _jsx("button", { className: "is-danger", onClick: () => onAction('cancel'), disabled: busy || run.state === 'stopping', children: run.state === 'stopping' ? '正在停止…' : '停止' }), failedTask && !inFlight && _jsx("button", { onClick: () => onAction('retry', failedTask.taskId), disabled: busy, children: "\u91CD\u8BD5\u5931\u8D25\u4EFB\u52A1" }), run.state === 'needs_review' && run.tasks.every((task) => task.state === 'succeeded') && _jsxs(_Fragment, { children: [_jsx("button", { onClick: () => onAction('verify'), disabled: busy, children: "\u91CD\u65B0\u68C0\u67E5" }), _jsx("button", { className: "is-primary", onClick: () => onAction('accept'), disabled: busy, children: "\u4EBA\u5DE5\u9A8C\u6536\u5B8C\u6210" })] })] }), run.contextSnapshots.length > 0 && _jsxs("details", { children: [_jsxs("summary", { children: ["\u672C\u6B21\u4E0A\u4E0B\u6587\u5FEB\u7167\uFF08", run.contextSnapshots.length, "\uFF09"] }), run.contextSnapshots.map((item) => _jsxs("p", { children: [item.title, " \u00B7 ", item.sha256 || '提示词快照'] }, item.nodeId))] }), _jsxs("details", { children: [_jsxs("summary", { children: ["\u4E8B\u4EF6\u65E5\u5FD7\uFF08", run.events.length, "\uFF09"] }), _jsx("ol", { className: "dsh-wp-event-list", children: run.events.map((event) => _jsxs("li", { children: [_jsx("time", { children: new Date(event.at).toLocaleTimeString() }), _jsx("b", { children: event.type }), _jsx("span", { children: event.message })] }, event.seq)) })] }), run.verification.summary && _jsxs("div", { className: "dsh-wp-verification", children: [_jsxs("strong", { children: ["\u72EC\u7ACB\u68C0\u67E5\uFF1A", run.verification.status === 'passed' ? '通过' : run.verification.status === 'failed' ? '未通过' : '受阻'] }), _jsx("p", { children: run.verification.summary }), run.verification.toolNames.length > 0 && _jsxs("small", { children: ["\u5B9E\u9645\u68C0\u67E5\u5DE5\u5177\uFF1A", run.verification.toolNames.join('、')] })] })] });
}
function TaskCard({ data, selected }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const node = data.node;
    if (node.type !== 'task')
        return null;
    return _jsxs("div", { className: `dsh-wp-node dsh-wp-node-task is-${data.state ?? 'pending'}${selected ? ' is-selected' : ''}`, children: [_jsx(Handle, { type: "target", position: FlowPosition.Left, id: "in" }), _jsx("span", { className: "dsh-wp-node-kind", children: "\u4EFB\u52A1 \u00B7 \u6267\u884C" }), _jsx("strong", { children: node.title }), _jsx("span", { className: "dsh-wp-node-status", children: taskProgressLabel(data.state ?? 'pending') }), _jsx("p", { children: node.instructions }), _jsxs("div", { className: "dsh-wp-node-add-wrap nodrag nopan", onPointerDown: (event) => event.stopPropagation(), onClick: (event) => event.stopPropagation(), children: [_jsx("button", { className: "dsh-wp-node-add", "aria-expanded": menuOpen, onClick: () => setMenuOpen((open) => !open), children: "\uFF0B \u6DFB\u52A0\u8D44\u6599" }), menuOpen && _jsxs("div", { className: "dsh-wp-node-add-menu", role: "menu", children: [_jsx("button", { role: "menuitem", onClick: () => { data.onAddContext?.('file'); setMenuOpen(false); }, children: "\u53C2\u8003\u6587\u4EF6" }), _jsx("button", { role: "menuitem", onClick: () => { data.onAddContext?.('prompt'); setMenuOpen(false); }, children: "\u63D0\u793A\u8BCD" })] })] }), _jsx(Handle, { type: "source", position: FlowPosition.Right, id: "out" })] });
}
function FileCard({ data, selected }) {
    const node = data.node;
    if (node.type !== 'file')
        return null;
    return _jsxs("div", { className: `dsh-wp-node dsh-wp-node-file${selected ? ' is-selected' : ''}`, children: [_jsxs("strong", { children: ["\u25A4 ", node.title] }), _jsx("p", { children: node.path || '双击选中后填写工作区文件路径' }), _jsx(Handle, { type: "source", position: FlowPosition.Right, id: "out" })] });
}
function PromptCard({ data, selected }) {
    const node = data.node;
    if (node.type !== 'prompt')
        return null;
    return _jsxs("div", { className: `dsh-wp-node dsh-wp-node-prompt${selected ? ' is-selected' : ''}`, children: [_jsxs("strong", { children: ["\u270E ", node.title] }), _jsx("p", { children: node.text || '双击选中后填写补充要求' }), _jsx(Handle, { type: "source", position: FlowPosition.Right, id: "out" })] });
}
const NODE_TYPES = { task: TaskCard, file: FileCard, prompt: PromptCard };
function newWorkflow(workspaceDirectory = '') {
    const now = Date.now();
    const nodes = DEFAULT_TASKS.map((item, index) => ({
        type: 'task',
        id: `task-${index + 1}`,
        title: item.title,
        instructions: item.instructions,
        acceptanceCriteria: [`人工核对“${item.title}”的执行结果和关联产物。`],
        expectedArtifacts: [],
        expectedContents: [],
        acceptanceMode: 'manual',
        order: index,
        position: { x: 60 + index * 330, y: 120 },
    }));
    const edges = [];
    return {
        id: newId(),
        title: '新建工作流',
        objective: '',
        workspaceDirectory,
        outputDirectory: workspaceDirectory,
        schemaVersion: 1,
        revision: 0,
        nodes,
        edges,
        createdAt: now,
        updatedAt: now,
    };
}
function toFlowNodes(workflow) {
    return workflow.nodes.map((node) => ({ id: node.id, type: node.type, position: { ...node.position }, data: { node } }));
}
function toFlowEdges(workflow) {
    return workflow.edges.map((edge) => ({ id: edge.id, source: edge.source, target: edge.target, data: { kind: edge.type } }));
}
function fromFlowEdges(edges) {
    const result = [];
    for (const edge of edges) {
        if (edge.data?.kind === 'dependency')
            result.push({ type: 'dependency', id: edge.id, source: edge.source, target: edge.target });
        if (edge.data?.kind === 'context')
            result.push({ type: 'context', id: edge.id, source: edge.source, target: edge.target });
    }
    return result;
}
function canConnect(workflow, connection) {
    if (!connection.source || !connection.target || connection.source === connection.target)
        return false;
    const source = workflow.nodes.find((node) => node.id === connection.source);
    const target = workflow.nodes.find((node) => node.id === connection.target);
    if (!source || !target || target.type !== 'task')
        return false;
    if (source.type === 'task' && target.type !== 'task')
        return false;
    return !workflow.edges.some((edge) => edge.source === source.id && edge.target === target.id && edge.type === (source.type === 'task' ? 'dependency' : 'context'));
}
function unwrap(result) {
    if (!result.ok)
        throw new Error(result.error.message);
    return result.value;
}
function errorMessage(error) {
    if (error instanceof Error)
        return error.message;
    return String(error);
}
function newId() {
    return globalThis.crypto.randomUUID();
}
function actionLabel(action) {
    return { pause: '暂停', resume: '继续', cancel: '停止', recover: '恢复运行', retry: '重试', verify: '重新检查', accept: '人工验收', reject: '驳回', apply: '应用修订' }[action] ?? action;
}
function taskStateLabel(state) {
    return { pending: '等待中', running: '运行中', needs_review: '待人工验收', succeeded: '已完成', failed: '失败', skipped: '已跳过', cancelled: '已取消', interrupted: '已中断' }[state] ?? state;
}
function lines(value) {
    return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}
function parseContentChecks(value) {
    return value.split(/\r?\n/).map((line) => {
        const tab = line.indexOf('\t');
        return tab < 1 ? undefined : { path: line.slice(0, tab).trim(), text: line.slice(tab + 1).trim() };
    }).filter((check) => Boolean(check?.path && check.text));
}
function runStateLabel(state) {
    return { queued: '排队中', running: '运行中', pausing: '等待任务边界暂停', stopping: '正在停止并清理', paused: '已暂停', verifying: '产物检查中', completed: '检查通过', needs_review: '等待人工验收', failed: '运行失败', cancelled: '已停止', interrupted: '上次运行中断', accepted: '人工验收完成' }[state] ?? state;
}
//# sourceMappingURL=index.js.map