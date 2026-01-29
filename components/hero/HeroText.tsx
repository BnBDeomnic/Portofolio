// components/hero/HeroText.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroTextProps {
    // ⚠️ GANTI: Data personal kamu
    headline?: string;
    subheadline?: string;
}

export function HeroText({
    headline = "Bagus Wikan Portofolio", 
    subheadline = "Creative Developer & Designer" 
}: HeroTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subheadlineRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance animation
            const tl = gsap.timeline({ delay: 0.5 });

            // Headline animation
            tl.fromTo(
                headlineRef.current,
                {
                    opacity: 0,
                    y: 60,
                    clipPath: 'inset(100% 0% 0% 0%)'
                },
                {
                    opacity: 1,
                    y: 0,
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.2,
                    ease: 'power4.out'
                }
            );

            // Subheadline animation
            tl.fromTo(
                subheadlineRef.current,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                },
                '-=0.6' // Overlap with headline
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
        >
            <h1
                ref={headlineRef}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6"
                style={{
                    fontFamily: 'var(--font-display)',
                    opacity: 0 // Initial state before GSAP
                }}
            >
                {headline}
            </h1>
            <p
                ref={subheadlineRef}
                className="text-lg sm:text-xl md:text-2xl text-[var(--color-muted)] max-w-md md:max-w-lg"
                style={{ opacity: 0 }}
            >
                {subheadline}
            </p>
        </div>
    );
}
