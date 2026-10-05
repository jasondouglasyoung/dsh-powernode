/** Sequential polling with bounded requests and guards against late cross-view replies. */
export function watchRun(options) {
    let disposed = false;
    let timer;
    let requestTimer;
    let abandon;
    const poll = async () => {
        try {
            const value = await Promise.race([
                Promise.resolve().then(options.read),
                new Promise((_, reject) => {
                    abandon = () => reject(new Error('状态同步已结束。'));
                    requestTimer = setTimeout(() => reject(new Error('运行状态同步超时；正在重新连接。')), options.timeoutMs ?? 8000);
                }),
            ]);
            if (!disposed)
                options.onData(value);
        }
        catch (error) {
            if (!disposed)
                options.onError(error);
        }
        finally {
            clearTimeout(requestTimer);
            abandon = undefined;
            if (!disposed)
                timer = setTimeout(() => void poll(), options.intervalMs ?? 1000);
        }
    };
    void poll();
    return () => { disposed = true; clearTimeout(timer); clearTimeout(requestTimer); abandon?.(); };
}
//# sourceMappingURL=run-sync.js.map