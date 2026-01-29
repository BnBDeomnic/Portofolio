// components/contact/ContactCTA.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ContactCTAProps {
    headline?: string;
    subheadline?: string;
    email?: string;
}

export function ContactCTA({
    headline = "Let's Create Something Amazing",
    subheadline = "I'm currently available for freelance work and exciting collaborations. Let's turn your ideas into reality.",
    email = "baguswikan0603@gmail.com",
}: ContactCTAProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const content = contentRef.current;
        if (!section || !content) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        gsap.fromTo(
                            content.children,
                            { opacity: 0, y: 40 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.8,
                                stagger: 0.15,
                                ease: 'power3.out'
                            }
                        );
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="section"
        >
            <div className="container">
                <div
                    ref={contentRef}
                    className="relative bg-gradient-to-br from-[var(--color-accent)] to-[#8b5cf6] rounded-3xl p-12 md:p-16 lg:p-20 text-center overflow-hidden"
                >
                    {/* Background decoration */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/10 blur-3xl float-animation" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-white/10 blur-3xl float-animation" style={{ animationDelay: '1.5s' }} />
                    </div>

                    <div className="relative z-10" style={{ opacity: 0 }}>
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white/90 text-sm font-medium mb-6">
                            Available for Work
                        </span>
                    </div>

                    <h2
                        className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                        style={{ fontFamily: 'var(--font-display)', opacity: 0 }}
                    >
                        {headline}
                    </h2>

                    <p
                        className="relative z-10 text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
                        style={{ opacity: 0 }}
                    >
                        {subheadline}
                    </p>

                    <div className="relative z-10" style={{ opacity: 0 }}>
                        <a
                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email?.trim()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[var(--color-accent)] rounded-full hover:bg-white/90 transition-all font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Get In Touch
                        </a>

                        <p className="mt-6 text-white/60 text-sm">
                            or email me at{' '}
                            <a
                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email?.trim()}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white underline hover:no-underline"
                            >
                                {email}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
