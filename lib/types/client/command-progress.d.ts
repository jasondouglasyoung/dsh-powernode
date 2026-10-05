export type PowernodeCommandKind = 'draft' | 'proposal';
export type PowernodeCommandPhase = 'generating' | 'complete' | 'failed' | 'cancelled';
export interface PowernodeCommandStatus {
    readonly commandId: string;
    readonly kind: PowernodeCommandKind;
    readonly phase: PowernodeCommandPhase;
    readonly message?: string;
}
export interface PowernodeCommandStatusSnapshot {
    readonly sessionId: string;
    readonly status: PowernodeCommandStatus;
}
export declare function getPowernodeCommandStatus(sessionId: string): PowernodeCommandStatus | undefined;
export declare function getLatestPowernodeCommandStatus(): PowernodeCommandStatusSnapshot | undefined;
export declare function publishPowernodeCommandStatus(sessionId: string, status: PowernodeCommandStatus): void;
export declare function subscribePowernodeCommandStatus(sessionId: string, listener: () => void): () => void;
export declare function subscribeLatestPowernodeCommandStatus(listener: () => void): () => void;
export declare function clearPowernodeCommandStatuses(): void;
//# sourceMappingURL=command-progress.d.ts.map