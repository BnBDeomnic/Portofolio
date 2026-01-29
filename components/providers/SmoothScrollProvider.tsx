// components/providers/SmoothScrollProvider.tsx
'use client';

import { createContext, useEffect, useState, useRef, useCallback, type ReactNode } from 'react';
import Lenis from 'lenis';
import { rafManager } from '@/lib/raf-manager';

interface LenisContextValue {
    lenis: Lenis | null;
    stop: () => void;
    start: () => void;
}

export const LenisContext = createContext<LenisContextValue | null>(null);

interface SmoothScrollProviderProps {
    children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    const [lenis, setLenis] = useState<Lenis | null>(null);
    const lenisRef = useRef<Lenis | null>(null);

    const stop = useCallback(() => {
        lenisRef.current?.stop();
    }, []);

    const start = useCallback(() => {
        lenisRef.current?.start();
    }, []);

    useEffect(() => {
        // Create Lenis instance with autoRaf disabled (we control it)
        const lenisInstance = new Lenis({
            autoRaf: false,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            prevent: (node) => node.closest('[data-lenis-prevent]') !== null,
        });

        lenisRef.current = lenisInstance;
        setLenis(lenisInstance);

        // Subscribe to global RAF loop
        const unsubscribe = rafManager.subscribe((time) => {
            lenisRef.current?.raf(time);
        });

        return () => {
            unsubscribe();
            lenisInstance.destroy();
        };
    }, []);

    return (
        <LenisContext.Provider value={{ lenis, stop, start }}>
            {children}
        </LenisContext.Provider>
    );
}
