import { randomUUID } from 'node:crypto'
import { createUserMessage } from '@deepseek-ai/dsh-llm'
import { installModelSelection, type Agent, type AgentHandle, type AgentOptions, type ModelSelectionRef } from '@deepseek-ai/dsh-agent'
import type { Session, SessionEvent, SessionId } from '@deepseek-ai/dsh-session'
import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-agent-default-model'
import type {} from '@deepseek-ai/dsh-agent-preset-registry'

export interface AgentPromptResult {
  readonly agentId: string
  readonly text: string
  readonly toolNames: readonly string[]
}

export async function runAgentPrompt(
  ctx: Context,
  options: {
    readonly prompt: string
    readonly cwd: string
    readonly signal: AbortSignal
    readonly model: AgentOptions
    readonly title: string
    readonly capabilityMode?: 'default' | 'planning'
    /** Attach a task or planner to the exact Session that initiated it. */
    readonly parentAgent?: Agent
  },
): Promise<AgentPromptResult> {
  if (options.signal.aborted) throw new DOMException('操作已取消。', 'AbortError')
  const sessionId = `dsh-workflow-${randomUUID()}`
  let assistantText = ''
  const toolNames = new Set<string>()
  let handle: AgentHandle | undefined
  const selection = ctx.agentDefaultModel.currentSelection()
  const planningOnly = options.capabilityMode === 'planning'
  const planningPresetId = planningOnly ? `dsh-workflow-planning-${randomUUID()}` : undefined
  let disposePlanningPreset: (() => Promise<void>) | undefined
  const modelSelection: ModelSelectionRef = { current: selection, assembled: undefined }
  const off = ctx.on('session/event', (session: Session, event: SessionEvent) => {
    if (session.id !== sessionId) return
    const payload = event.data as unknown as {
      readonly message?: { readonly content?: readonly { readonly type?: string; readonly text?: string }[] }
      readonly name?: string
    }
    if (event.type === 'assistant/message') {
      assistantText = extractText(payload.message?.content ?? [])
    } else if (event.type === 'tool/call' && payload.name) {
      toolNames.add(payload.name)
    }
  }, { global: true })

  let rejectAbort!: (error: DOMException) => void
  const aborted = new Promise<never>((_, reject) => { rejectAbort = reject })
  void aborted.catch(() => undefined)
  const abort = () => {
    handle?.agent.cancel({ kind: 'user' })
    rejectAbort(new DOMException('操作已取消。', 'AbortError'))
  }
  options.signal.addEventListener('abort', abort, { once: true })
  try {
    // A configured DSH preset roster requires every Agent reaching model
    // assembly to join a preset. Use a temporary empty composition for planning
    // so it has a native scope without inheriting execution tools or prompts.
    if (planningPresetId) {
      disposePlanningPreset = await ctx.agentPresets.register({
        id: planningPresetId,
        name: 'Workflow planning (isolated)',
        description: 'Temporary empty capability scope for structured workflow planning.',
        plugins: [],
      })
    }
    const presetId = planningPresetId ?? (await ctx.agentPresets.resolve()).id
    handle = await ctx.agents.create({
      sessionId: sessionId as SessionId,
      ...(options.parentAgent ? { parentAgent: options.parentAgent } : {}),
      meta: {
        cwd: options.cwd,
        agentPreset: presetId,
        ...(options.parentAgent ? {
          parentSession: options.parentAgent.session.id,
          origin: 'subagent' as const,
          delegationDepth: 1,
        } : {}),
      },
      agentOptions: options.model,
      signal: options.signal,
      setup: async (agentCtx) => {
        installModelSelection(agentCtx, modelSelection)
        // Normal Agents use the selected default preset. Planning Agents join
        // their private empty composition, never the execution composition.
        await ctx.agentPresets.mount(agentCtx, presetId)
      },
    })
    if (options.signal.aborted) throw new DOMException('操作已取消。', 'AbortError')
    handle.agent.followup(createUserMessage({
      content: [{ type: 'text', text: options.prompt }],
      source: { kind: 'user' },
    }))
    await Promise.race([handle.agent.whenIdle(), aborted])
    if (options.signal.aborted) throw new DOMException('操作已取消。', 'AbortError')
    if (!assistantText.trim()) {
      throw new Error('DSH Agent 未提交最终答复。请检查 Settings → Models 中的模型凭据和工作区工具权限。')
    }
    if (planningOnly && toolNames.size > 0) {
      throw new Error('规划 Agent 收到了执行工具调用；为保护工作区，本次草稿已拒绝保存。')
    }
    return { agentId: sessionId, text: assistantText, toolNames: [...toolNames] }
  } finally {
    off()
    options.signal.removeEventListener('abort', abort)
    await handle?.dispose()
    await disposePlanningPreset?.()
  }
}

function extractText(content: readonly { readonly type?: string; readonly text?: string }[]): string {
  return content
    .filter((block) => block.type === 'text' && typeof block.text === 'string')
    .map((block) => block.text ?? '')
    .join('')
}

export function redactError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error)
  return message
    .replace(/(api[_ -]?key|authorization|bearer|sk-)[=: ]+[^\s,"']+/gi, '$1=[REDACTED]')
    .replace(/https?:\/\/[^\s]*[?&](?:key|token|api_key)=[^&\s]+/gi, '[已隐藏的请求地址]')
    .slice(0, 1200)
}
