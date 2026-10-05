import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { taskProgressLabel, workflowProgress } from '../domain/run-progress.js';
export function RunProgress({ run, syncError = '', onTask, onStop }) {
    const [now, setNow] = useState(Date.now());
    const progress = workflowProgress(run);
    const live = ['queued', 'running', 'pausing', 'paused', 'verifying', 'stopping'].includes(run.state);
    useEffect(() => {
        setNow(Date.now());
        if (!live)
            return;
        const timer = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(timer);
    }, [live, run.id]);
    const age = Math.max(0, Math.floor(((live ? now : run.endedAt || now) - progress.latestActivityAt) / 1000));
    const status = { queued: '等待调度', running: '运行中', pausing: '等待任务边界暂停', paused: '已暂停', verifying: '检查结果', stopping: '正在停止',
        failed: '运行失败', cancelled: '已停止', interrupted: '已中断', needs_review: '等待验收', accepted: '验收通过', completed: '已完成' }[run.state] ?? run.state;
    return _jsxs("section", { className: `dsh-wp-progress is-${run.state}`, "aria-label": "\u771F\u5B9E\u8FD0\u884C\u8FDB\u5EA6", "aria-live": "polite", children: [_jsxs("div", { className: "dsh-wp-progress-heading", children: [_jsxs("strong", { children: ["\u5DF2\u5B8C\u6210 ", progress.completed, "/", progress.total, " \u4E2A\u4EFB\u52A1"] }), _jsx("span", { children: status }), live && onStop && _jsx("button", { disabled: run.state === 'stopping', onClick: onStop, children: run.state === 'stopping' ? '正在停止…' : '停止' })] }), _jsx("div", { className: "dsh-wp-progress-track", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": progress.total, "aria-valuenow": progress.completed, "aria-label": "\u5DF2\u901A\u8FC7\u4EFB\u52A1\u9A8C\u6536\u7684\u6570\u91CF", children: _jsx("i", { style: { width: `${progress.total ? progress.completed / progress.total * 100 : 0}%` } }) }), progress.currentTask && _jsxs("button", { className: "dsh-wp-progress-current", onClick: () => onTask(progress.currentTask.id), children: ["\u7B2C ", progress.currentIndex, " \u4E2A\u4EFB\u52A1\uFF1A", progress.currentTask.title, " \u2192 \u67E5\u770B\u5BF9\u5E94\u5BF9\u8BDD"] }), _jsx("p", { children: syncError || (run.state === 'stopping' ? run.error || '正在等待 Agent 退出；后续任务与重试已锁定。' : progress.currentState === 'needs_review' ? '当前任务已结束，等待人工验收；请核对产物后点击“通过此任务”。' : progress.activity && live ? progress.activity.message : run.error || status) }), live && _jsx("small", { children: syncError ? '当前显示的是最后一次已同步的状态。' : `最近真实活动：${age} 秒前${progress.activity ? ` · ${taskProgressLabel(progress.activity.phase)}` : ''}` }), _jsxs("div", { className: "dsh-wp-progress-legend", children: [_jsx("span", { children: "\u7070\uFF1A\u5F85\u6267\u884C" }), _jsx("span", { children: "\u84DD\uFF1A\u6267\u884C\u4E2D" }), _jsx("span", { children: "\u9EC4\uFF1A\u7B49\u5F85\u6216\u9A8C\u6536" }), _jsx("span", { children: "\u7EFF\uFF1A\u901A\u8FC7" }), _jsx("span", { children: "\u7EA2\uFF1A\u5931\u8D25" })] })] });
}
//# sourceMappingURL=run-progress.js.map