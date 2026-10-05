const TERMINAL_RUN_STATES = new Set(['completed', 'failed', 'cancelled', 'accepted']);
export function hasWorkflowChangesSinceSnapshot(workflow, snapshot) {
    return Boolean(snapshot && snapshot.id === workflow.id && JSON.stringify(workflow) !== JSON.stringify(snapshot));
}
export function canGenerateFromInitialPrompt(workflow, snapshot, savedWorkflowId) {
    return Boolean(!savedWorkflowId
        && snapshot
        && snapshot.id === workflow.id
        && JSON.stringify(workflow.nodes) === JSON.stringify(snapshot.nodes)
        && JSON.stringify(workflow.edges) === JSON.stringify(snapshot.edges));
}
export function isWorkflowRunUnfinished(runState) {
    return runState !== undefined && !TERMINAL_RUN_STATES.has(runState);
}
export function getWorkflowProtectionMessage(action, input) {
    if ((action === 'generate' || action === 'import-markdown') && isWorkflowRunUnfinished(input.runState)) {
        return action === 'generate'
            ? '当前运行尚未结束，不能重新生成并替换当前工作流或清空运行展示。请先完成或停止当前运行。'
            : '当前运行尚未结束，不能导入并替换当前工作流或清空运行展示。请先完成或停止当前运行。';
    }
    if (input.hasUnsavedChanges && !(action === 'generate' && input.initialPromptOnlyDraft)) {
        if (action === 'start-run' || action === 'apply-run')
            return '有未保存修改，请先保存。';
        return action === 'generate'
            ? '有未保存修改，请先保存或撤销后再生成流程草稿。'
            : '有未保存修改，请先保存或撤销后再导入 Markdown。';
    }
    if (action === 'generate' && !input.objective?.trim()) {
        return '请先填写整体目标，再生成流程草稿。';
    }
    return undefined;
}
//# sourceMappingURL=workflow-safety.js.map