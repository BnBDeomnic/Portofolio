// lib/raf-manager.ts
// Singleton RAF loop - ALL components subscribe here

type RAFCallback = (time: number, delta: number) => void;

class RAFManager {
    private callbacks: Set<RAFCallback> = new Set();
    private lastTime = 0;
    private isRunning = false;
    private rafId: number | null = null;

    subscribe(cb: RAFCallback) {
        this.callbacks.add(cb);
        if (!this.isRunning && typeof window !== 'undefined') {
            this.start();
        }
        return () => {
            this.callbacks.delete(cb);
            if (this.callbacks.size === 0 && this.rafId !== null) {
                cancelAnimationFrame(this.rafId);
                this.isRunning = false;
                this.rafId = null;
            }
        };
    }

    private loop = (time: number) => {
        const delta = time - this.lastTime;
        this.lastTime = time;
        this.callbacks.forEach(cb => cb(time, delta));
        if (this.callbacks.size > 0) {
            this.rafId = requestAnimationFrame(this.loop);
        } else {
            this.isRunning = false;
            this.rafId = null;
        }
    };

    private start() {
        if (typeof window === 'undefined') return;
        this.isRunning = true;
        this.lastTime = performance.now();
        this.rafId = requestAnimationFrame(this.loop);
    }
}

export const rafManager = typeof window !== 'undefined' ? new RAFManager() : ({
    subscribe: () => () => { },
} as unknown as RAFManager);
