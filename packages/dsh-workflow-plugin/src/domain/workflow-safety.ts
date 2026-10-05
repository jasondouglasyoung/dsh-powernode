import type { WorkflowDefinition, WorkflowRunState } from '../shared/types.js'

export type WorkflowProtectionAction = 'start-run' | 'apply-run' | 'generate' | 'import-markdown'

export interface WorkflowProtectionInput {
  readonly hasUnsavedChanges: boolean
  readonly initialPromptOnlyDraft?: boolean | undefined
  readonly runState?: WorkflowRunState | undefined
  readonly objective?: string | undefined
}

const TERMINAL_RUN_STATES = new Set<WorkflowRunState>(['completed', 'failed', 'cancelled', 'accepted'])

export function hasWorkflowChangesSinceSnapshot(
  workflow: WorkflowDefinition,
  snapshot: WorkflowDefinition | undefined,
): boolean {
  return Boolean(snapshot && snapshot.id === workflow.id && JSON.stringify(workflow) !== JSON.stringify(snapshot))
}

export function canGenerateFromInitialPrompt(
  workflow: WorkflowDefinition,
  snapshot: WorkflowDefinition | undefined,
  savedWorkflowId: string,
): boolean {
  return Boolean(
    !savedWorkflowId
    && snapshot
    && snapshot.id === workflow.id
    && JSON.stringify(workflow.nodes) === JSON.stringify(snapshot.nodes)
    && JSON.stringify(workflow.edges) === JSON.stringify(snapshot.edges),
  )
}

export function isWorkflowRunUnfinished(runState: WorkflowRunState | undefined): boolean {
  return runState !== undefined && !TERMINAL_RUN_STATES.has(runState)
}

export function getWorkflowProtectionMessage(
  action: WorkflowProtectionAction,
  input: WorkflowProtectionInput,
): string | undefined {
  if ((action === 'generate' || action === 'import-markdown') && isWorkflowRunUnfinished(input.runState)) {
    return action === 'generate'
      ? '当前运行尚未结束，不能重新生成并替换当前工作流或清空运行展示。请先完成或停止当前运行。'
      : '当前运行尚未结束，不能导入并替换当前工作流或清空运行展示。请先完成或停止当前运行。'
  }

  if (input.hasUnsavedChanges && !(action === 'generate' && input.initialPromptOnlyDraft)) {
    if (action === 'start-run' || action === 'apply-run') return '有未保存修改，请先保存。'
    return action === 'generate'
      ? '有未保存修改，请先保存或撤销后再生成流程草稿。'
      : '有未保存修改，请先保存或撤销后再导入 Markdown。'
  }

  if (action === 'generate' && !input.objective?.trim()) {
    return '请先填写整体目标，再生成流程草稿。'
  }

  return undefined
}
