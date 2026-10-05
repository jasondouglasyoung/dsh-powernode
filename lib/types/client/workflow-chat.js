import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { taskProgressLabel, taskProgressState } from '../domain/run-progress.js';
import { topologicalTasks } from '../domain/graph.js';
// Force Chat within the embedded occurrence. Following the selected parent
// View here would render Workflow again and recurse indefinitely.
function NativeChatView({ renderSlot }) {
    return renderSlot('conversation.session', { view: 'chat' });
}
function WorkflowChatScope({ reference, SessionProvider, renderSlot }) {
    return _jsx(SessionProvider, { session: reference, children: renderSlot('dsh.workflow.chat.body', {}) });
}
export function registerWorkflowChat(ctx) {
    ctx.slots.registerFactory({ name: 'dsh.workflow.chat', scope: 'root', children: { 'dsh.workflow.chat.body': { kind: 'single', scope: 'session' } } }, WorkflowChatScope);
    ctx.slots.inject('dsh.workflow.chat.body', () => ctx.slots.register({ name: 'dsh.workflow.chat.body', registrant: 'dsh-workflow-plugin' }, ({ renderFactorySlot }) => renderFactorySlot('conversation.content', { variant: 'embedded', phase: 'active', hero: false }, { slots: { views: NativeChatView } })));
}
export function taskSessionTarget(run, attempt) {
    if (!attempt?.agentId || attempt.activity?.phase === 'starting')
        return undefined;
    const parent = attempt.agentParentSessionId === undefined ? run?.sessionId : attempt.agentParentSessionId;
    return parent ? { parentSessionId: parent, childSessionId: attempt.agentId, mode: 'unknown' } : attempt.agentId;
}
/** DSH removes disposed Agents from its live client catalog. Refresh the
 * durable catalog before retaining an ordinary execution history again. */
export async function retainWorkflowSession(sessions, target, signal) {
    signal.throwIfAborted();
    if (typeof target === 'string' && !sessions.list.getSnapshot().byId[target])
        await sessions.refresh();
    signal.throwIfAborted();
    return sessions.retain(target, { source: 'dshWorkflow', signal });
}
function NativeSessionChat({ ctx, target, renderFactorySlot }) {
    const sessionId = typeof target === 'string' ? target : target.childSessionId;
    const parentSessionId = typeof target === 'string' ? undefined : target.parentSessionId;
    const [reference, setReference] = useState();
    const [error, setError] = useState('');
    const [retry, setRetry] = useState(0);
    useEffect(() => {
        let current = true;
        let retained;
        const controller = new AbortController();
        setReference(undefined);
        setError('');
        void (async () => {
            const exactReference = await retainWorkflowSession(ctx.sessions, parentSessionId ? { parentSessionId, childSessionId: sessionId, mode: 'unknown' } : sessionId, controller.signal);
            if (!current) {
                exactReference.release();
                return;
            }
            retained = exactReference;
            await exactReference.ready;
            if (current)
                setReference(exactReference);
        })().catch((cause) => { if (current)
            setError(cause instanceof Error ? cause.message : String(cause)); });
        return () => { current = false; controller.abort(); retained?.release(); };
    }, [ctx, sessionId, parentSessionId, retry]);
    if (error)
        return _jsxs("div", { className: "dsh-wp-chat-error", role: "alert", children: [_jsxs("p", { children: ["\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528\uFF1A", error, "\u3002\u5DF2\u4FDD\u5B58\u7684\u8282\u70B9\u56DE\u590D\u4ECD\u663E\u793A\u5728\u6267\u884C\u8BB0\u5F55\u4E2D\u3002"] }), _jsx("button", { onClick: () => setRetry((value) => value + 1), children: "\u91CD\u65B0\u8FDE\u63A5" })] });
    if (!reference || reference.sessionId !== sessionId)
        return _jsx("p", { role: "status", children: "\u6B63\u5728\u8FDE\u63A5\u5BF9\u8BDD\u2026" });
    return _jsx(_Fragment, { children: renderFactorySlot('dsh.workflow.chat', { reference }) });
}
export function WorkflowConversation({ ctx, sessionId, run, taskId, taskSelection, onTask, renderFactorySlot, residentComposer }) {
    const [tab, setTab] = useState('main');
    const task = run?.tasks.find((entry) => entry.taskId === taskId);
    const attempt = task?.attempts.at(-1);
    const node = run?.workflow.nodes.find((entry) => entry.id === taskId);
    useEffect(() => { if (taskId)
        setTab('task'); }, [taskId, taskSelection]);
    const target = tab === 'main' ? sessionId : taskSessionTarget(run, attempt);
    const targetKey = typeof target === 'string' ? target : target ? `${target.parentSessionId}:${target.childSessionId}` : '';
    return _jsxs("aside", { className: "dsh-wp-conversation", "aria-label": "\u5DE5\u4F5C\u6D41\u5BF9\u5E94\u7684\u5B9E\u9645\u5BF9\u8BDD", children: [_jsxs("header", { children: [_jsx("strong", { children: "\u5BF9\u8BDD\u4E0E\u6267\u884C" }), _jsxs("div", { className: "dsh-wp-chat-tabs", children: [_jsx("button", { "aria-pressed": tab === 'main', onClick: () => setTab('main'), children: "\u4E3B\u5BF9\u8BDD" }), _jsx("button", { "aria-pressed": tab === 'task', disabled: !run, onClick: () => setTab('task'), children: "\u8282\u70B9\u6267\u884C" })] })] }), run && _jsx("div", { className: "dsh-wp-task-timeline", "aria-label": "\u8282\u70B9\u6267\u884C\u987A\u5E8F", children: topologicalTasks(run.workflow).map((entry) => {
                    const recorded = run.tasks.find((item) => item.taskId === entry.id);
                    const state = taskProgressState(recorded);
                    return _jsxs("button", { className: `is-${state}${taskId === entry.id && tab === 'task' ? ' is-selected' : ''}`, onClick: () => { onTask(entry.id); setTab('task'); }, children: [_jsx("span", { children: entry.title }), _jsx("small", { children: taskProgressLabel(state) })] }, entry.id);
                }) }), tab === 'task' && _jsxs("div", { className: "dsh-wp-task-conversation-summary", children: [_jsx("strong", { children: node?.title ?? '选择一个节点查看执行过程' }), attempt && _jsxs("p", { children: ["\u7B2C ", attempt.number, " \u6B21\u5C1D\u8BD5 \u00B7 ", taskProgressLabel(taskProgressState(task))] }), task?.reusedFromRunId && _jsx("p", { children: "\u6B64\u8282\u70B9\u590D\u7528\u4E86\u5DF2\u6838\u9A8C\u7684\u5386\u53F2\u7ED3\u679C\uFF0C\u6CA1\u6709\u521B\u5EFA\u65B0\u7684\u6267\u884C\u4F1A\u8BDD\u3002" }), attempt?.activity && task?.state === 'running' && _jsx("p", { role: "status", children: attempt.activity.message }), attempt?.error && _jsx("p", { role: "alert", children: attempt.error }), attempt?.messages?.length ? _jsxs("details", { open: !target, children: [_jsxs("summary", { children: ["\u5DF2\u4FDD\u5B58\u7684\u8282\u70B9\u56DE\u590D\uFF08", attempt.messages.length, "\uFF09"] }), attempt.messages.map((message, index) => _jsx("p", { className: "dsh-wp-saved-message", children: message.text }, `${message.at}-${index}`))] })
                        : task?.result ? _jsx("p", { className: "dsh-wp-saved-message", children: task.result }) : null] }), _jsx("div", { className: `dsh-wp-native-chat${tab === 'task' && target ? ' is-task-chat' : ''}`, "data-resident-composer": residentComposer && tab === 'main', children: target && renderFactorySlot ? _jsx(NativeSessionChat, { ctx: ctx, target: target, renderFactorySlot: renderFactorySlot }, targetKey)
                    : _jsx("p", { className: "dsh-wp-empty", children: tab === 'main' ? '在会话的“工作流”入口打开，可在这里查看原有聊天。' : '任务开始后，这里显示该节点的真实回复、工具调用和授权请求。' }) })] });
}
//# sourceMappingURL=workflow-chat.js.map