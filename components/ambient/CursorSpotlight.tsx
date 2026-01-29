// components/ambient/CursorSpotlight.tsx
'use client';

import { useEffect, useRef } from 'react';
import throttle from 'lodash.throttle';

export function CursorSpotlight() {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // Check for touch device
        const isTouchDevice = window.matchMedia('(hover: none)').matches;
        if (isTouchDevice) return;

        const updateSpotlight = throttle((e: PointerEvent) => {
            document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
        }, 16); // ~60fps

        window.addEventListener('pointermove', updateSpotlight);

        return () => {
            window.removeEventListener('pointermove', updateSpotlight);
            updateSpotlight.cancel();
        };
    }, []);

    return (
        <div
            ref={overlayRef}
            className="pointer-events-none fixed inset-0 z-50 hidden md:block"
            style={{
                background: `radial-gradient(
          600px circle at var(--cursor-x) var(--cursor-y),
          rgba(37, 99, 235, 0.03),
          transparent 40%
        )`,
            }}
            aria-hidden="true"
        />
    );
}
