import type { WorkflowNode } from '../shared/types.js'

const GRID_ORIGIN_X = 72
const GRID_ORIGIN_Y = 72
const COLUMN_STEP = 280
const TASK_ROW_STEP = 210
const CONTEXT_ROW_STEP = 190
const CONTEXT_LANE_GAP = 54
const COLUMN_COUNT = 4

/** Arrange generated tasks and their reference nodes in separate, readable lanes. */
export function layoutGeneratedDraft(nodes: readonly WorkflowNode[]): WorkflowNode[] {
  const tasks = nodes.filter((node) => node.type === 'task')
  const references = nodes.filter((node) => node.type !== 'task')
  const taskRows = Math.ceil(tasks.length / COLUMN_COUNT)
  const contextStartY = GRID_ORIGIN_Y + taskRows * TASK_ROW_STEP + CONTEXT_LANE_GAP

  const positionedTasks = tasks.map((node, index) => ({
    ...node,
    position: {
      x: GRID_ORIGIN_X + (index % COLUMN_COUNT) * COLUMN_STEP,
      y: GRID_ORIGIN_Y + Math.floor(index / COLUMN_COUNT) * TASK_ROW_STEP,
    },
  }))
  const positionedReferences = references.map((node, index) => ({
    ...node,
    position: {
      x: GRID_ORIGIN_X + (index % COLUMN_COUNT) * COLUMN_STEP,
      y: contextStartY + Math.floor(index / COLUMN_COUNT) * CONTEXT_ROW_STEP,
    },
  }))

  return [...positionedTasks, ...positionedReferences]
}
