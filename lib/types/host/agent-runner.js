import { randomUUID } from 'node:crypto';
import { createUserMessage } from '@deepseek-ai/dsh-llm';
import { installModelSelection } from '@deepseek-ai/dsh-agent';
import { applyWorkflowPermissions, captureWorkflowPermissions } from './workflow-permissions.js';
export class AgentRunError extends Error {
    code;
    agentId;
    constructor(code, message, agentId) {
        super(message);
        this.code = code;
        this.agentId = agentId;
        this.name = 'AgentRunError';
    }
}
/** Keep the run lock until cleanup finishes: an old Agent may still write files. */
export class AgentCleanupPendingError extends AgentRunError {
    originalError;
    cleanup;
    constructor(originalError, agentId, cleanup) {
        super('agent.cleanup-pending', 'Agent 尚未完成停止和资源清理；已阻止后续任务与重试，等待清理完成。', agentId);
        this.originalError = originalError;
        this.cleanup = cleanup;
    }
}
export function agentRunLimits() {
    const milliseconds = (key, fallback) => {
        const value = Number(process.env[key]);
        return Number.isFinite(value) && value >= 1000 && value <= 4 * 60 * 60_000 ? value : fallback;
    };
    return {
        initializationMs: milliseconds('DSH_WORKFLOW_INITIALIZATION_MS', 60_000),
        inactivityWarningMs: milliseconds('DSH_WORKFLOW_WARNING_MS', 60_000),
        inactivityMs: milliseconds('DSH_WORKFLOW_INACTIVITY_MS', 10 * 60_000),
        approvalMs: milliseconds('DSH_WORKFLOW_APPROVAL_MS', 10 * 60_000),
        totalMs: milliseconds('DSH_WORKFLOW_TASK_TIMEOUT_MS', 30 * 60_000),
        cleanupMs: milliseconds('DSH_WORKFLOW_CLEANUP_MS', 15_000),
    };
}
export async function runAgentPrompt(ctx, options) {
    if (options.signal.aborted)
        throw new DOMException('操作已取消。', 'AbortError');
    const permissions = captureWorkflowPermissions(options.parentAgent);
    const sessionId = `dsh-workflow-${randomUUID()}`;
    const limits = { ...agentRunLimits(), ...options.limits };
    const controller = new AbortController();
    let handle;
    let creating;
    let registering;
    let assistantText = '';
    let failure;
    let failed = false;
    const toolNames = new Set();
    const pendingApprovals = new Map();
    const planningOnly = options.capabilityMode === 'planning';
    const planningPresetId = planningOnly ? `dsh-workflow-planning-${randomUUID()}` : undefined;
    const modelSelection = { current: ctx.agentDefaultModel.currentSelection(), assembled: undefined };
    let activity = { phase: 'starting', at: Date.now(), message: `正在创建任务会话：${options.title}` };
    let lastActivityAt = activity.at;
    let lastPublicationAt = 0;
    let progressQueue = Promise.resolve();
    let rejectAbort;
    const aborted = new Promise((_, reject) => { rejectAbort = reject; });
    void aborted.catch(() => undefined);
    const abort = (error) => {
        if (controller.signal.aborted)
            return;
        controller.abort(error);
        try {
            handle?.agent.cancel({ kind: 'user' });
        }
        catch { /* Disposal remains authoritative. */ }
        rejectAbort(error);
    };
    const onUserAbort = () => abort(new DOMException('操作已取消。', 'AbortError'));
    options.signal.addEventListener('abort', onUserAbort, { once: true });
    if (options.signal.aborted)
        onUserAbort();
    // Session observers are post-commit and not awaited by DSH. Serialize their
    // persistence ourselves and drain before accepting the task's result.
    const publish = (next, message, toolName) => {
        activity = next;
        lastPublicationAt = Date.now();
        const progress = { agentId: sessionId, parentSessionId: null, activity: next, ...(message ? { message } : {}), ...(toolName ? { toolName } : {}) };
        progressQueue = progressQueue.then(() => options.onProgress?.(progress)).then(() => undefined).catch((error) => { abort(error); });
    };
    const active = (phase, message, extra = {}, text, toolName) => {
        lastActivityAt = Date.now();
        // Other tools may complete while an approval is still pending.
        if (pendingApprovals.size && phase !== 'waiting_permission') {
            publish({ ...activity, phase: 'waiting_permission', at: lastActivityAt }, text, toolName);
            return;
        }
        publish({ phase, at: lastActivityAt, message, ...extra }, text, toolName);
    };
    const fail = (code, message) => abort(new AgentRunError(code, message, sessionId));
    const off = ctx.on('session/event', (session, event) => {
        if (session.id !== sessionId || controller.signal.aborted)
            return;
        const type = event.type;
        const data = event.data;
        if (type === 'assistant/message') {
            assistantText = extractText(data.message?.content ?? []);
            active('thinking', '模型已提交回复，正在处理后续执行。', {}, assistantText.trim() ? { at: Date.now(), text: redactError(assistantText, 12_000) } : undefined);
        }
        else if (type === 'tool/call' && data.name) {
            toolNames.add(data.name);
            active('tool', `正在调用工具：${data.name}`, { toolName: data.name }, undefined, data.name);
        }
        else if (type === 'tool/result') {
            const detail = data.error?.reason ?? extractText(data.message?.content ?? []);
            if (data.message?.isError && /SetNamedSecurityInfoW|grantWrite/iu.test(detail)) {
                fail('tool.sandbox-initialization', `Windows 沙箱初始化失败：${redactError(detail)}。DSH 未能设置目录写权限，当前节点已停止，后续节点不会执行。请先在传统对话验证同一目录的写入；修复 DSH 沙箱或明确调整会话权限后，再重试。`);
            }
            else if (data.message?.isError && isPermissionError(`${data.error?.code ?? ''} ${detail}`)) {
                fail('tool.permission', `工具权限不足：${redactError(detail)}。请检查工作区权限或 DSH 工具设置后重试。`);
            }
            else
                active('thinking', data.message?.isError ? `工具返回错误：${redactError(detail)}` : '工具已返回，等待模型处理结果。');
        }
        else if (type === 'approval/asked' && data.id) {
            pendingApprovals.set(data.id, Date.now());
            active('waiting_permission', `等待授权：${data.toolName ?? '工具'}${typeof data.reason === 'string' ? `；${redactError(data.reason)}` : ''}`, { approvalId: data.id, ...(data.toolName ? { toolName: data.toolName } : {}) });
        }
        else if (type === 'approval/decided' && data.id) {
            pendingApprovals.delete(data.id);
            if (data.outcome === 'allowed-once') {
                if (!pendingApprovals.size)
                    active('tool', '授权已通过，工具继续执行。');
            }
            else
                fail(`approval.${data.outcome}`, data.outcome === 'rejected' ? '本次工具授权被拒绝；任务已停止，可调整权限后重试。' : '工具授权已取消或没有可用的授权界面；任务已停止。');
        }
        else if (type === 'turn/end' && typeof data.reason === 'object' && data.reason?.kind !== 'completed') {
            fail('agent.turn-ended', `Agent 未正常完成：${data.reason?.error?.message ?? data.reason?.kind ?? '未知原因'}。`);
        }
        else if (type === 'step/start' || type === 'request/header') {
            if (!pendingApprovals.size)
                active('thinking', '模型正在处理当前任务。');
        }
    }, { global: true });
    const offStream = ctx.on('agent/assistant-stream', ({ agent, frame }) => {
        if (agent.session.id !== sessionId || frame.type !== 'chunk' || controller.signal.aborted)
            return;
        lastActivityAt = Date.now();
        if (!pendingApprovals.size && lastActivityAt - lastPublicationAt >= 2000)
            publish({ phase: 'thinking', at: lastActivityAt, message: '正在接收模型输出。' });
    }, { global: true });
    const totalTimer = setTimeout(() => fail('agent.timeout', '任务已达到最长执行时间，正在停止。可检查执行记录后重试。'), limits.totalMs);
    const initializationTimer = setTimeout(() => fail('agent.initialization-timeout', 'Agent 初始化超时，请检查模型配置、工具服务和权限。'), limits.initializationMs);
    const watchdog = setInterval(() => {
        if (activity.phase === 'starting' || controller.signal.aborted)
            return;
        const now = Date.now();
        if (pendingApprovals.size) {
            if (now - Math.min(...pendingApprovals.values()) >= limits.approvalMs)
                fail('approval.timeout', '等待授权超时，任务已停止；可重新打开任务会话并检查授权设置。');
        }
        else if (now - lastActivityAt >= limits.inactivityMs)
            fail('agent.inactivity-timeout', '长时间未收到模型或工具活动，任务已停止。请检查网络、工具执行和模型配置后重试。');
        else if (now - lastActivityAt >= limits.inactivityWarningMs && activity.phase !== 'stalled')
            publish({ phase: 'stalled', at: lastActivityAt, message: '暂未收到新活动；可能仍在等待模型或工具，可查看任务会话或停止。' });
    }, Math.min(1000, Math.max(5, limits.inactivityWarningMs / 2)));
    try {
        active('starting', activity.message);
        await Promise.race([progressQueue, aborted]);
        if (planningPresetId) {
            registering = ctx.agentPresets.register({ id: planningPresetId, name: 'Workflow planning (isolated)', description: 'Temporary empty capability scope for structured workflow planning.', plugins: [] });
            await Promise.race([registering, aborted]);
        }
        const presetId = planningPresetId ?? (await Promise.race([ctx.agentPresets.resolve(), aborted])).id;
        creating = ctx.agents.create({
            sessionId: sessionId,
            ...(options.parentAgent ? { parentAgent: options.parentAgent } : {}),
            // Runtime ownership handles cancellation; the durable session is an
            // ordinary conversation. A native subagent additionally needs a provider
            // descriptor and parent catalog, which agents.create() does not create.
            meta: { cwd: options.cwd, agentPreset: presetId },
            agentOptions: options.model,
            signal: controller.signal,
            setup: async (agentCtx, agent) => {
                applyWorkflowPermissions(agent.session, permissions);
                installModelSelection(agentCtx, modelSelection);
                await ctx.agentPresets.mount(agentCtx, presetId);
            },
        });
        handle = await Promise.race([creating, aborted]);
        clearTimeout(initializationTimer);
        active('thinking', '任务会话已创建，正在等待模型输出。');
        await Promise.race([progressQueue, aborted]);
        handle.agent.followup(createUserMessage({ content: [{ type: 'text', text: options.prompt }], source: { kind: 'user' } }));
        await Promise.race([handle.agent.whenIdle(), aborted]);
        await Promise.race([progressQueue, aborted]);
        if (controller.signal.aborted)
            throw controller.signal.reason;
        if (!assistantText.trim())
            throw new AgentRunError('agent.empty-response', 'DSH Agent 未提交最终答复。请检查模型凭据和工作区工具权限。', sessionId);
        if (planningOnly && toolNames.size > 0)
            throw new AgentRunError('planner.tools', '规划 Agent 收到了执行工具调用；为保护工作区，本次草稿已拒绝保存。', sessionId);
    }
    catch (error) {
        failed = true;
        failure = error;
        abort(error);
    }
    finally {
        clearTimeout(totalTimer);
        clearTimeout(initializationTimer);
        clearInterval(watchdog);
        off();
        offStream();
        options.signal.removeEventListener('abort', onUserAbort);
        const cleanup = (async () => {
            // Dispose late creation results too; cancellation is not proof of exit.
            const created = creating ? await creating.catch(() => undefined) : handle;
            try {
                await created?.dispose();
            }
            finally {
                const disposePreset = registering ? await registering.catch(() => undefined) : undefined;
                await disposePreset?.();
                await progressQueue;
            }
        })();
        let cleanupTimer;
        try {
            await Promise.race([cleanup, new Promise((_, reject) => {
                    cleanupTimer = setTimeout(() => reject(new AgentCleanupPendingError(failed ? failure : new AgentRunError('agent.cleanup-timeout', 'Agent 清理超时，任务结果尚未验收。', sessionId), sessionId, cleanup)), limits.cleanupMs);
                })]);
        }
        catch (cleanupError) {
            if (cleanupError instanceof AgentCleanupPendingError)
                throw cleanupError;
            // A rejected disposal is also unconfirmed exit, not a completed cleanup.
            throw new AgentCleanupPendingError(failed ? failure : cleanupError, sessionId, cleanup);
        }
        finally {
            clearTimeout(cleanupTimer);
        }
    }
    if (failed)
        throw failure;
    return { agentId: sessionId, text: assistantText, toolNames: [...toolNames] };
}
function extractText(content) {
    return content.filter((block) => block.type === 'text' && typeof block.text === 'string').map((block) => block.text ?? '').join('');
}
function isPermissionError(message) {
    return /\b(?:EACCES|EPERM)\b|access.?denied|permission.?denied|SetNamedSecurityInfoW|grantWrite|权限不足|拒绝访问/iu.test(message);
}
export function redactError(error, maxLength = 1200) {
    const message = error instanceof Error ? error.message : String(error);
    return message.replace(/(api[_ -]?key|authorization|bearer|sk-)[=: ]+[^\s,"']+/gi, '$1=[REDACTED]')
        .replace(/\bsk-[A-Za-z0-9_-]{12,}\b/g, '[已隐藏的密钥]')
        .replace(/https?:\/\/[^\s]*[?&](?:key|token|api_key)=[^&\s]+/gi, '[已隐藏的请求地址]').slice(0, maxLength);
}
//# sourceMappingURL=agent-runner.js.map