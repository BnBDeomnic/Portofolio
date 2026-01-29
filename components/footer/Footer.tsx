// components/footer/Footer.tsx
'use client';

import { useEffect, useRef } from 'react';

interface SocialLink {
    name: string;
    url: string;
    icon: React.ReactNode;
}

// ⚠️ GANTI: Social links kamu
const defaultSocialLinks: SocialLink[] = [
    {
        name: 'GitHub',
        url: 'https://github.com/BnBDeomnic', // ← GANTI
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
        ),
    },
    {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/yourusername', // ← GANTI
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        name: 'Twitter',
        url: 'https://twitter.com/yourusername', // ← GANTI
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
];

interface FooterProps {
    socialLinks?: SocialLink[];
}

export function Footer({ socialLinks = defaultSocialLinks }: FooterProps) {
    const currentYear = new Date().getFullYear();
    const marqueeRef = useRef<HTMLDivElement>(null);

    // Animate marquee text
    useEffect(() => {
        const marquee = marqueeRef.current;
        if (!marquee) return;

        let animationId: number;
        let position = 0;

        const animate = () => {
            position -= 0.5;
            if (position <= -50) position = 0;
            marquee.style.transform = `translateX(${position}%)`;
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'About', href: '#about' },
        { name: 'Work', href: '#work' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)]">
            {/* Animated Marquee */}
            <div className="overflow-hidden py-8 border-b border-[var(--color-border)]">
                <div ref={marqueeRef} className="flex whitespace-nowrap" style={{ width: '200%' }}>
                    {[...Array(8)].map((_, i) => (
                        <span
                            key={i}
                            className="text-6xl md:text-8xl font-bold text-[var(--color-border)] mx-8 select-none"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Let's Connect
                        </span>
                    ))}
                </div>
            </div>

            {/* Footer Content */}
            <div className="container py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div>
                        <h3
                            className="text-2xl font-bold mb-4 gradient-text"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            {/* ⚠️ GANTI: nama kamu */}
                            Bagus Wikan Yogasartono
                        </h3>
                        <p className="text-[var(--color-muted)] max-w-xs">
                            {/* ⚠️ GANTI: tagline kamu */}
                            Building and Learning digital experiences that make a difference.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-sm uppercase tracking-wider text-[var(--color-muted)] mb-4">
                            Navigation
                        </h4>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors relative group"
                                    >
                                        {link.name}
                                        <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-[var(--color-accent)] group-hover:w-full transition-all duration-300" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="text-sm uppercase tracking-wider text-[var(--color-muted)] mb-4">
                            Connect
                        </h4>
                        <div className="flex gap-3 flex-wrap">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group p-3 rounded-xl bg-[var(--color-bg)] text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-all duration-300 hover:-translate-y-1"
                                    aria-label={link.name}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-[var(--color-border)]">
                <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--color-muted)]">
                    <p className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Available for new projects
                    </p>
                    <p>
                        © {currentYear} All rights reserved.
                    </p>
                    <p className="text-xs">
                        Built with Next.js, GSAP & Lenis
                    </p>
                </div>
            </div>
        </footer>
    );
}
