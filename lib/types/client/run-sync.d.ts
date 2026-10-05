/** Sequential polling with bounded requests and guards against late cross-view replies. */
export declare function watchRun<T>(options: {
    readonly read: () => Promise<T>;
    readonly onData: (value: T) => void;
    readonly onError: (error: unknown) => void;
    readonly intervalMs?: number;
    readonly timeoutMs?: number;
}): () => void;
//# sourceMappingURL=run-sync.d.ts.map