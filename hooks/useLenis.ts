// hooks/useLenis.ts
'use client';

import { useContext } from 'react';
import { LenisContext } from '@/components/providers/SmoothScrollProvider';

export function useLenis() {
    const context = useContext(LenisContext);
    if (!context) {
        throw new Error('useLenis must be used within SmoothScrollProvider');
    }
    return context;
}
