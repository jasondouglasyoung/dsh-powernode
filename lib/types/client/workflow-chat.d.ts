import type { Context } from '@deepseek-ai/cordis';
import type { ConversationViewsProps } from '@deepseek-ai/dsh-client-ui-conversation/client';
import type { SessionReference, SessionTarget } from '@deepseek-ai/dsh-api-session-controller/client';
import type { SessionId } from '@deepseek-ai/dsh-session/types';
import type { TaskAttempt, WorkflowRun } from '../shared/types.js';
declare module '@deepseek-ai/dsh-api-session-controller/client' {
    interface SessionReferenceSourceMap {
        dshWorkflow: unknown;
    }
}
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface SlotMap {
        'dsh.workflow.chat.body': {
            kind: 'single';
            scope: 'session';
        };
    }
    interface SlotFactoryMap {
        'dsh.workflow.chat': {
            scope: 'root';
            props: {
                reference: SessionReference;
            };
            children: {
                'dsh.workflow.chat.body': {
                    kind: 'single';
                    scope: 'session';
                };
            };
        };
    }
}
export type RenderWorkflowFactory = ConversationViewsProps['renderFactorySlot'];
export declare function registerWorkflowChat(ctx: Context): void;
export declare function taskSessionTarget(run: WorkflowRun | undefined, attempt: TaskAttempt | undefined): SessionTarget | undefined;
/** DSH removes disposed Agents from its live client catalog. Refresh the
 * durable catalog before retaining an ordinary execution history again. */
export declare function retainWorkflowSession(sessions: Pick<Context['sessions'], 'list' | 'refresh' | 'retain'>, target: SessionTarget, signal: AbortSignal): Promise<SessionReference>;
export declare function WorkflowConversation({ ctx, sessionId, run, taskId, taskSelection, onTask, renderFactorySlot, residentComposer }: {
    ctx: Context;
    sessionId: SessionId | undefined;
    run: WorkflowRun | undefined;
    taskId: string;
    taskSelection: number;
    onTask: (id: string) => void;
    renderFactorySlot: RenderWorkflowFactory | undefined;
    residentComposer: boolean;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=workflow-chat.d.ts.map