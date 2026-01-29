// components/hero/HeroCanvas.tsx
'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useRAF } from '@/hooks/useRAF';
import { useScrollVelocity } from '@/hooks/useScrollVelocity';

interface HeroCanvasProps {
    // ⚠️ GANTI: Path ke gmbar hero kamu
    imageSrc?: string;
}

export function HeroCanvas({ imageSrc = '/images/hero/myphotos.png' }: HeroCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const { velocityRef } = useScrollVelocity();

    // Load image
    useEffect(() => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            imageRef.current = img;
        };
    }, [imageSrc]);

    // Resize handler
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Animation loop via global RAF
    const animate = useCallback((time: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const img = imageRef.current;

        if (!canvas || !ctx || !img) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Idle motion formula (time-based, no scroll needed)
        const baseScale = 1.1;
        const scaleOscillation = Math.sin(time * 0.001) * 0.02;
        const xOffset = Math.sin(time * 0.0008) * 20;
        const yOffset = Math.cos(time * 0.0006) * 15;

        // Velocity amplification (scroll makes motion more intense)
        const velocity = velocityRef.current;
        const velocityMultiplier = 1 + Math.abs(velocity) * 0.3;

        const scale = baseScale + (scaleOscillation * velocityMultiplier);
        const x = xOffset * velocityMultiplier;
        const y = yOffset * velocityMultiplier;

        // Calculate scaled dimensions
        const scaledWidth = canvas.width * scale;
        const scaledHeight = canvas.height * scale;
        const drawX = (canvas.width - scaledWidth) / 2 + x;
        const drawY = (canvas.height - scaledHeight) / 2 + y;

        // Draw image with transforms
        ctx.save();
        ctx.drawImage(img, drawX, drawY, scaledWidth, scaledHeight);
        ctx.restore();
    }, [velocityRef]);

    useRAF(animate);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 0 }}
            aria-hidden="true"
        />
    );
}
