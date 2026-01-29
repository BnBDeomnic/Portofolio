// components/portfolio/ProjectShowcase.tsx
'use client';

import { useState, useRef, useEffect, useContext } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { LenisContext } from '@/components/providers/SmoothScrollProvider';

export interface Project {
    id: string;
    title: string;
    description: string;
    category: 'ui-design' | 'web' | 'asset-design';
    tags: string[];
    link?: string;
    image: string;
    // Extended info for expanded view
    longDescription?: string;
    features?: string[];
    year?: string;
}

const defaultProjects: Project[] = [
    // UI Design
    {
        id: 'Asetra',
        title: 'Asetra',
        description: 'Clean and intuitive mobile RWA Market Place with focus on user experience',
        longDescription: 'A comprehensive mobile banking application designed to simplify financial management. The interface prioritizes clarity and ease of use, allowing users to manage accounts, transfer funds, and track expenses with minimal friction. Every interaction was carefully crafted to reduce cognitive load while maintaining security.',
        category: 'ui-design',
        tags: ['Figma', 'UI/UX', 'Mobile', 'Banking'],
        features: ['Biometric Authentication', 'Real-time Notifications', 'Expense Tracking', 'Bill Payments'],
        year: '2024',
        image: '/images/projects/Asetra.png',
        link: '#',
    },
    {
        id: 'ui-2',
        title: 'E-commerce Dashboard',
        description: 'Comprehensive dashboard design for online store management',
        longDescription: 'An analytics-driven dashboard for e-commerce business owners. This project focuses on presenting complex data in digestible visualizations, enabling quick decision-making. The design system includes customizable widgets, dark/light modes, and responsive layouts for both desktop and tablet use.',
        category: 'ui-design',
        tags: ['Figma', 'Dashboard', 'Analytics', 'E-commerce'],
        features: ['Sales Analytics', 'Inventory Management', 'Customer Insights', 'Order Tracking'],
        year: '2024',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        link: '#',
    },
    // Web Development
    {
        id: 'web-1',
        title: 'SaaS Landing Page',
        description: 'High-converting landing page with smooth animations and modern design',
        longDescription: 'A performance-optimized landing page built for a SaaS startup. Features include scroll-triggered animations, lazy-loaded content, and a fully responsive design. The page achieved a 40% improvement in conversion rate compared to the previous version through strategic UX improvements.',
        category: 'web',
        tags: ['Next.js', 'Tailwind', 'GSAP', 'TypeScript'],
        features: ['Scroll Animations', 'Form Validation', 'SEO Optimized', 'Analytics Integration'],
        year: '2024',
        image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
        link: '#',
    },
    {
        id: 'web-2',
        title: 'Portfolio Website',
        description: 'Creative portfolio showcasing work with interactive elements',
        longDescription: 'A personal portfolio website featuring WebGL backgrounds, custom cursor interactions, and smooth page transitions. Built with performance in mind, achieving perfect Lighthouse scores while maintaining rich visual effects.',
        category: 'web',
        tags: ['React', 'Three.js', 'Motion', 'WebGL'],
        features: ['3D Elements', 'Custom Animations', 'Dark Mode', 'Contact Form'],
        year: '2023',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop',
        link: '#',
    },
    // Asset Design
    {
        id: 'asset-1',
        title: 'Brand Identity Kit',
        description: 'Complete brand identity including logo, colors, and typography',
        longDescription: 'A full brand identity system created for a tech startup. The project included primary and secondary logos, color palette with accessibility considerations, typography hierarchy, iconography, and comprehensive brand guidelines documentation.',
        category: 'asset-design',
        tags: ['Illustrator', 'Branding', 'Logo', 'Identity'],
        features: ['Logo Variations', 'Color System', 'Typography Guide', 'Brand Guidelines'],
        year: '2024',
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop',
        link: '#',
    },
    {
        id: 'asset-2',
        title: '3D Icon Pack',
        description: 'Custom 3D icons for mobile and web applications',
        longDescription: 'A collection of 50+ 3D icons designed for modern applications. Each icon was modeled in Blender and rendered with carefully crafted lighting to ensure consistency. The pack includes various categories and is available in multiple formats.',
        category: 'asset-design',
        tags: ['Blender', '3D', 'Icons', 'Assets'],
        features: ['50+ Icons', 'Multiple Formats', 'Customizable Colors', 'High Resolution'],
        year: '2023',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
        link: '#',
    },
];

const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'ui-design', label: 'UI Design' },
    { id: 'web', label: 'Web Development' },
    { id: 'asset-design', label: 'Asset Design' },
];

interface ProjectShowcaseProps {
    projects?: Project[];
}

export function ProjectShowcase({ projects = defaultProjects }: ProjectShowcaseProps) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showAllProjects, setShowAllProjects] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    // Get Lenis stop/start functions
    const lenisContext = useContext(LenisContext);

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    // Duplicate for carousel
    const carouselProjects = [...filteredProjects, ...filteredProjects];

    const openProject = (project: Project) => {
        setSelectedProject(project);
        setIsExpanded(true);
        // Stop Lenis and prevent body scroll
        lenisContext?.stop();
        document.body.style.overflow = 'hidden';
    };

    const closeProject = () => {
        if (modalRef.current && overlayRef.current) {
            gsap.to(modalRef.current, { scale: 0.95, opacity: 0, duration: 0.3, ease: 'power2.in' });
            gsap.to(overlayRef.current, {
                opacity: 0, duration: 0.3, onComplete: () => {
                    setIsExpanded(false);
                    setSelectedProject(null);
                    document.body.style.overflow = '';
                    lenisContext?.start();
                }
            });
        } else {
            setIsExpanded(false);
            setSelectedProject(null);
            document.body.style.overflow = '';
            lenisContext?.start();
        }
    };

    const openViewAll = () => {
        setShowAllProjects(true);
        lenisContext?.stop();
        document.body.style.overflow = 'hidden';
    };

    const closeViewAll = () => {
        setShowAllProjects(false);
        document.body.style.overflow = '';
        lenisContext?.start();
    };

    useEffect(() => {
        if (isExpanded && modalRef.current && overlayRef.current) {
            gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
            gsap.fromTo(modalRef.current, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' });
        }
    }, [isExpanded]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isExpanded) closeProject();
                if (showAllProjects) closeViewAll();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isExpanded, showAllProjects]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            document.body.style.overflow = '';
            lenisContext?.start();
        };
    }, []);

    return (
        <section id="work" className="section overflow-hidden bg-[var(--color-surface)]">
            {/* Marquee Header */}
            <div className="overflow-hidden py-8 mb-12 border-y border-[var(--color-border)]">
                <div ref={marqueeRef} className="flex whitespace-nowrap marquee-track" style={{ width: '200%' }}>
                    {[...Array(8)].map((_, i) => (
                        <span
                            key={i}
                            className="text-5xl md:text-7xl font-bold text-[var(--color-border)] mx-8 select-none"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Selected Projects •
                        </span>
                    ))}
                </div>
            </div>

            {/* Category Filter */}
            <div className="container mb-16 pb-4">
                <div className="flex flex-wrap gap-3 justify-center">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === cat.id
                                ? 'bg-[var(--color-fg)] text-[var(--color-bg)] scale-105 shadow-lg'
                                : 'bg-[var(--color-bg)] text-[var(--color-fg)] border border-[var(--color-border)] hover:border-[var(--color-fg)] hover:bg-[var(--color-surface)] hover:scale-105 hover:shadow-md'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Project Carousel */}
            <div className="relative mb-12">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--color-surface)] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--color-surface)] to-transparent z-10 pointer-events-none" />

                <div className="flex carousel-track" style={{ width: 'fit-content' }}>
                    {carouselProjects.map((project, index) => (
                        <div
                            key={`${project.id}-${index}`}
                            className="flex-shrink-0 w-[320px] md:w-[400px] mx-4 group"
                        >
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--color-bg)] border border-[var(--color-border)] shadow-sm hover:shadow-xl transition-all duration-300">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <h3 className="text-white font-bold text-lg mb-1">{project.title}</h3>
                                    <p className="text-white/70 text-sm mb-3 line-clamp-2">{project.description}</p>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold">{project.title}</h3>
                                    <span className="text-sm text-[var(--color-muted)]">
                                        {categories.find(c => c.id === project.category)?.label}
                                    </span>
                                </div>
                                <button
                                    onClick={() => openProject(project)}
                                    className="px-4 py-2 rounded-full bg-[var(--color-fg)] text-[var(--color-bg)] text-sm font-medium hover:bg-[var(--color-accent)] transition-colors"
                                >
                                    Expand
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* View All Button */}
            <div className="text-center">
                <button
                    onClick={openViewAll}
                    className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[var(--color-fg)] text-[var(--color-fg)] rounded-full font-semibold hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] transition-all"
                >
                    View All Projects ({filteredProjects.length})
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>

            {/* View All Projects Modal */}
            {showAllProjects && (
                <div
                    className="fixed inset-0 z-50 bg-[var(--color-bg)] overflow-y-scroll"
                    data-lenis-prevent
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    <div className="container py-12">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                                All Projects
                            </h2>
                            <button
                                onClick={closeViewAll}
                                className="p-3 rounded-full hover:bg-[var(--color-surface)] transition-colors"
                                aria-label="Close"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-3 mb-12">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-5 py-2 rounded-full font-medium transition-all duration-300 text-sm ${activeCategory === cat.id
                                        ? 'bg-[var(--color-fg)] text-[var(--color-bg)] scale-105 shadow-md'
                                        : 'bg-[var(--color-surface)] text-[var(--color-fg)] hover:bg-[var(--color-border)] hover:scale-105 hover:shadow-sm'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="group cursor-pointer"
                                    onClick={() => {
                                        setShowAllProjects(false);
                                        openProject(project);
                                    }}
                                >
                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-[var(--color-surface)]">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-[var(--color-muted)] text-sm line-clamp-2">{project.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Expanded Project Modal - Split Layout */}
            {isExpanded && selectedProject && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    onClick={closeProject}
                >
                    <div
                        ref={modalRef}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-5xl h-[85vh] bg-[var(--color-bg)] rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Left Side - Image (35%) */}
                        <div className="lg:w-[35%] h-[200px] lg:h-auto flex-shrink-0 relative bg-[var(--color-surface)]">
                            <Image
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                fill
                                className="object-cover"
                            />
                            {/* Close button */}
                            <button
                                onClick={closeProject}
                                className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-colors z-10"
                                aria-label="Close"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            {/* Year badge */}
                            {selectedProject.year && (
                                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/90 text-sm font-medium">
                                    {selectedProject.year}
                                </div>
                            )}
                        </div>

                        {/* Right Side - Content (65%) - Scrollable with data-lenis-prevent */}
                        <div
                            className="lg:w-[65%] flex-1 overflow-y-scroll p-8 lg:p-12"
                            data-lenis-prevent
                            style={{ WebkitOverflowScrolling: 'touch' }}
                        >
                            {/* Category Badge */}
                            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-surface)] text-sm font-medium mb-6">
                                {categories.find(c => c.id === selectedProject.category)?.label}
                            </span>

                            {/* Title */}
                            <h2
                                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                {selectedProject.title}
                            </h2>

                            {/* Description */}
                            <p className="text-[var(--color-muted)] text-lg mb-8 leading-relaxed">
                                {selectedProject.longDescription || selectedProject.description}
                            </p>

                            {/* Tags */}
                            <div className="mb-8">
                                <h4 className="text-sm uppercase tracking-wider text-[var(--color-muted)] mb-3">Technologies</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-4 py-2 rounded-full bg-[var(--color-surface)] text-sm font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            {selectedProject.features && (
                                <div className="mb-8">
                                    <h4 className="text-sm uppercase tracking-wider text-[var(--color-muted)] mb-3">Key Features</h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {selectedProject.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* CTA Button */}
                            {selectedProject.link && (
                                <a
                                    href={selectedProject.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-accent)] text-white rounded-full hover:bg-[var(--color-accent-hover)] transition-colors font-semibold text-lg"
                                >
                                    View Live Project
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}

                            {/* Spacer for scroll */}
                            <div className="h-16" />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
