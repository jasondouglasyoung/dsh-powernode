import { topologicalTasks } from './graph.js';
export function taskProgressState(task) {
    if (!task)
        return 'pending';
    const attempt = task.attempts.at(-1);
    if (task.state === 'running')
        return attempt?.activity?.phase ?? 'running';
    if (task.state === 'pending' && attempt && ['cancelled', 'interrupted'].includes(attempt.state))
        return attempt.state;
    return task.state;
}
export function taskProgressLabel(state) {
    return { pending: '待执行', running: '执行中', starting: '正在启动', thinking: '模型处理中', tool: '工具执行中', waiting_permission: '等待授权',
        checking: '检查产物', stalled: '暂未收到新活动', stopping: '正在停止', needs_review: '待人工验收', succeeded: '已完成',
        failed: '失败', skipped: '依赖未满足', cancelled: '已取消', interrupted: '已中断', outdated: '旧修订结果' }[state] ?? state;
}
/** Counts come from the immutable execution graph, never from canvas order. */
export function workflowProgress(run) {
    const ordered = topologicalTasks(run.workflow);
    const currentTask = ordered.find((node) => run.tasks.find((task) => task.taskId === node.id)?.state === 'running')
        ?? ordered.find((node) => run.tasks.find((task) => task.taskId === node.id)?.state === 'needs_review')
        ?? ordered.find((node) => run.tasks.find((task) => task.taskId === node.id)?.state === 'failed');
    const recorded = currentTask ? run.tasks.find((task) => task.taskId === currentTask.id) : undefined;
    const attempt = recorded?.attempts.at(-1);
    return {
        total: ordered.length,
        completed: run.tasks.filter((task) => task.state === 'succeeded').length,
        currentTask,
        currentIndex: currentTask ? ordered.findIndex((task) => task.id === currentTask.id) + 1 : 0,
        currentState: recorded?.state,
        activity: recorded?.state === 'running' ? attempt?.activity : undefined,
        latestActivityAt: Math.max(run.startedAt, ...run.events.map((event) => event.at), ...run.tasks.map((task) => task.attempts.at(-1)?.activity?.at ?? 0)),
    };
}
//# sourceMappingURL=run-progress.js.map