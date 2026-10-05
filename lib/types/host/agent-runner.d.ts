import { type Agent, type AgentOptions } from '@deepseek-ai/dsh-agent';
import type { Context } from '@deepseek-ai/cordis';
import type { TaskActivity, TaskMessage } from '../shared/types.js';
export interface AgentPromptResult {
    readonly agentId: string;
    readonly text: string;
    readonly toolNames: readonly string[];
}
export interface AgentProgress {
    readonly agentId: string;
    readonly parentSessionId?: string | null;
    readonly activity: TaskActivity;
    readonly message?: TaskMessage;
    readonly toolName?: string;
}
export interface AgentRunLimits {
    readonly initializationMs: number;
    readonly inactivityWarningMs: number;
    readonly inactivityMs: number;
    readonly approvalMs: number;
    readonly totalMs: number;
    readonly cleanupMs: number;
}
export declare class AgentRunError extends Error {
    readonly code: string;
    readonly agentId: string;
    constructor(code: string, message: string, agentId: string);
}
/** Keep the run lock until cleanup finishes: an old Agent may still write files. */
export declare class AgentCleanupPendingError extends AgentRunError {
    readonly originalError: unknown;
    readonly cleanup: Promise<void>;
    constructor(originalError: unknown, agentId: string, cleanup: Promise<void>);
}
export declare function agentRunLimits(): AgentRunLimits;
export declare function runAgentPrompt(ctx: Context, options: {
    readonly prompt: string;
    readonly cwd: string;
    readonly signal: AbortSignal;
    readonly model: AgentOptions;
    readonly title: string;
    readonly capabilityMode?: 'default' | 'planning';
    readonly parentAgent?: Agent;
    readonly onProgress?: (progress: AgentProgress) => Promise<void> | void;
    readonly limits?: Partial<AgentRunLimits>;
}): Promise<AgentPromptResult>;
export declare function redactError(error: unknown, maxLength?: number): string;
//# sourceMappingURL=agent-runner.d.ts.map