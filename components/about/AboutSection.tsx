// components/about/AboutSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AboutSectionProps {
    // ⚠️ GANTI: Data personal kamu
    title?: string;
    bio?: string;
    skills?: string[];
}

export function AboutSection({
    title = "About Me", // ← GANTI jika mau
    bio = "Hi, I'm a Computer Science student focused on building modern web and mobile experiences with strong UI/UX design, using React, Next.js, and Vue.", // ← GANTI: bio kamu
    skills = ["React", "Next.js", "TypeScript", "GSAP", "Tailwind CSS", "Node.js"] // ← GANTI: skills kamu
}: AboutSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const content = contentRef.current;
        if (!section || !content) return;

        // Intersection Observer for reveal animation
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
            { threshold: 0.2 }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="section container"
        >
            <div ref={contentRef} className="max-w-3xl">
                <h2
                    className="text-3xl md:text-4xl font-bold mb-8"
                    style={{ fontFamily: 'var(--font-display)', opacity: 0 }}
                >
                    {title}
                </h2>

                <p
                    className="text-lg md:text-xl text-[var(--color-muted)] mb-8 leading-relaxed"
                    style={{ opacity: 0 }}
                >
                    {bio}
                </p>

                <div style={{ opacity: 0 }}>
                    <h3 className="text-sm uppercase tracking-wider text-[var(--color-muted)] mb-4">
                        Skills & Technologies
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {skills.map((skill) => (
                            <span
                                key={skill}
                                className="px-4 py-2 rounded-full border border-[var(--color-border)] text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
