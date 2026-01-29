// components/hero/HeroSection.tsx
'use client';

import { useEffect, useRef, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { LenisContext } from '@/components/providers/SmoothScrollProvider';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
    // ⚠️ GANTI: Data personal kamu
    headline?: string;
    subheadline?: string;
}

export function HeroSection({
    headline = "Bagus Wikan Portofolio",
    subheadline = "Creative Developer & Designer — Bringing ideas to life through code and design",
}: HeroSectionProps) {
    const containerRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subheadlineRef = useRef<HTMLParagraphElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const decorRef = useRef<HTMLDivElement>(null);
    const parallaxBgRef = useRef<HTMLDivElement>(null);
    const lenisContext = useContext(LenisContext);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance animations
            const tl = gsap.timeline({ delay: 0.3 });

            // Headline animation
            tl.fromTo(
                headlineRef.current,
                { opacity: 0, y: 60, clipPath: 'inset(100% 0% 0% 0%)' },
                { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.out' }
            );

            // Subheadline animation
            tl.fromTo(
                subheadlineRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
                '-=0.6'
            );

            // Image animation
            tl.fromTo(
                imageRef.current,
                { opacity: 0, scale: 0.9, y: 40 },
                { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' },
                '-=0.5'
            );

            // Decorative elements
            tl.fromTo(
                decorRef.current?.children || [],
                { opacity: 0, scale: 0 },
                { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
                '-=0.4'
            );

            // Parallax effect on scroll
            if (parallaxBgRef.current) {
                gsap.to(parallaxBgRef.current, {
                    yPercent: 30,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 0.5,
                    },
                });
            }

            // Text parallax (slower than background)
            gsap.to(headlineRef.current, {
                yPercent: 50,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.3,
                },
            });

            gsap.to(subheadlineRef.current, {
                yPercent: 40,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.3,
                },
            });

            // Image parallax (faster)
            gsap.to(imageRef.current, {
                yPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.3,
                },
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const scrollToAbout = () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            lenisContext?.lenis?.scrollTo(aboutSection as HTMLElement);
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full overflow-hidden"
        >
            {/* Parallax Background */}
            <div
                ref={parallaxBgRef}
                className="absolute inset-0 -top-20 -bottom-20 hero-gradient"
            >
                {/* Subtle gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-200/30 to-purple-200/20 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-200/20 to-orange-200/20 blur-3xl" />
            </div>

            <div className="container relative z-10 flex flex-col items-center justify-center min-h-screen py-20 pt-32">
                {/* Text Content */}
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <h1
                        ref={headlineRef}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
                        style={{ fontFamily: 'var(--font-display)', opacity: 0 }}
                    >
                        <span className="gradient-text">{headline}</span>
                    </h1>
                    <p
                        ref={subheadlineRef}
                        className="text-lg sm:text-xl md:text-2xl text-[var(--color-muted)] max-w-2xl mx-auto"
                        style={{ opacity: 0 }}
                    >
                        {subheadline}
                    </p>
                </div>

                {/* Hero Image */}
                <div
                    ref={imageRef}
                    className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
                    style={{ opacity: 0 }}
                >
                    <div className="aspect-[16/9] relative bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-border)]">
                        <Image
                            src="/images/hero/myphotos.png"
                            alt="Creative workspace"
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Image overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/20 to-transparent" />
                    </div>

                    {/* Floating badges */}
                    <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium shadow-lg">
                        ✨ Available for work
                    </div>
                    <div className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium shadow-lg">
                        📍 Based in Indonesia
                    </div>
                </div>

                {/* Decorative Elements */}
                <div ref={decorRef} className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-[var(--color-accent)]/10 float-animation" />
                    <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-purple-500/10 float-animation" style={{ animationDelay: '1s' }} />
                    <div className="absolute bottom-40 left-20 w-24 h-24 rounded-full bg-pink-500/10 float-animation" style={{ animationDelay: '2s' }} />
                </div>

                {/* Scroll indicator */}
                <button
                    onClick={scrollToAbout}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer"
                >
                    <span className="text-sm text-[var(--color-muted)] group-hover:text-[var(--color-fg)] transition-colors">Scroll to explore</span>
                    <div className="w-6 h-10 border-2 border-[var(--color-muted)] rounded-full flex justify-center pt-2 group-hover:border-[var(--color-fg)] transition-colors">
                        <div className="w-1 h-2 bg-[var(--color-muted)] rounded-full animate-bounce group-hover:bg-[var(--color-fg)] transition-colors" />
                    </div>
                </button>
            </div>
        </section>
    );
}
