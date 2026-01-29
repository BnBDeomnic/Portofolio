// components/navigation/Header.tsx
'use client';

import { useState, useEffect, useContext } from 'react';
import { LenisContext } from '@/components/providers/SmoothScrollProvider';

interface NavLink {
    label: string;
    href: string;
}

// ⚠️ GANTI: Navigation links kamu
const defaultNavLinks: NavLink[] = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
];

interface HeaderProps {
    name?: string;
    navLinks?: NavLink[];
}

export function Header({ name = 'Portfolio', navLinks = defaultNavLinks }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lenisContext = useContext(LenisContext);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        setIsMobileMenuOpen(false);
        if (href === '#') {
            lenisContext?.lenis?.scrollTo(0);
        } else {
            const element = document.querySelector(href);
            if (element) {
                lenisContext?.lenis?.scrollTo(element as HTMLElement);
            }
        }
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled
                        ? 'bg-white/80 backdrop-blur-lg shadow-sm py-4'
                        : 'bg-transparent py-6'
                    }`}
            >
                <div className="container flex items-center justify-between">
                    {/* Logo/Name */}
                    <button
                        onClick={() => scrollToSection('#')}
                        className="font-bold text-xl tracking-tight hover:text-[var(--color-accent)] transition-colors"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        {name}
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => scrollToSection(link.href)}
                                className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all group-hover:w-full" />
                            </button>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <button
                        onClick={() => scrollToSection('#contact')}
                        className={`hidden md:block px-5 py-2.5 rounded-full text-sm font-medium transition-all ${isScrolled
                                ? 'bg-[var(--color-fg)] text-[var(--color-bg)] hover:bg-[var(--color-accent)]'
                                : 'bg-[var(--color-fg)] text-[var(--color-bg)] hover:bg-[var(--color-accent)]'
                            }`}
                    >
                        Let&apos;s Talk
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`w-6 h-0.5 bg-[var(--color-fg)] transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                                }`}
                        />
                        <span
                            className={`w-6 h-0.5 bg-[var(--color-fg)] transition-all ${isMobileMenuOpen ? 'opacity-0' : ''
                                }`}
                        />
                        <span
                            className={`w-6 h-0.5 bg-[var(--color-fg)] transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                                }`}
                        />
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-30 bg-white/95 backdrop-blur-lg transition-all duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
            >
                <nav className="flex flex-col items-center justify-center h-full gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.href}
                            onClick={() => scrollToSection(link.href)}
                            className="text-2xl font-bold hover:text-[var(--color-accent)] transition-colors"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            {link.label}
                        </button>
                    ))}
                    <button
                        onClick={() => scrollToSection('#contact')}
                        className="mt-4 px-8 py-4 bg-[var(--color-fg)] text-[var(--color-bg)] rounded-full font-medium hover:bg-[var(--color-accent)] transition-colors"
                    >
                        Let&apos;s Talk
                    </button>
                </nav>
            </div>
        </>
    );
}
