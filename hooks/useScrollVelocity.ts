// hooks/useScrollVelocity.ts
'use client';

import { useState, useEffect, useRef } from 'react';
import { useLenis } from './useLenis';

export function useScrollVelocity() {
    const { lenis } = useLenis();
    const [velocity, setVelocity] = useState(0);
    const velocityRef = useRef(0);

    useEffect(() => {
        if (!lenis) return;

        const handleScroll = () => {
            velocityRef.current = lenis.velocity;
            setVelocity(lenis.velocity);
        };

        lenis.on('scroll', handleScroll);

        return () => {
            lenis.off('scroll', handleScroll);
        };
    }, [lenis]);

    return { velocity, velocityRef };
}
