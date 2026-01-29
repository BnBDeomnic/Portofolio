// hooks/useRAF.ts
'use client';

import { useEffect, useRef } from 'react';
import { rafManager } from '@/lib/raf-manager';

type RAFCallback = (time: number, delta: number) => void;

export function useRAF(callback: RAFCallback) {
    const callbackRef = useRef<RAFCallback>(callback);

    // Keep callback ref up to date
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const unsubscribe = rafManager.subscribe((time, delta) => {
            callbackRef.current(time, delta);
        });

        return unsubscribe;
    }, []);
}
