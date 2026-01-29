import { Header } from "@/components/navigation/Header";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { ProjectShowcase } from "@/components/portfolio/ProjectShowcase";
import { ContactCTA } from "@/components/contact/ContactCTA";
import { Footer } from "@/components/footer/Footer";
import { CursorSpotlight } from "@/components/ambient/CursorSpotlight";

/*
 * ⚠️ HIGHLIGHT — KONTEN YANG HARUS KAMU GANTI:
 * 
 * 1. Header:
 *    - name: Nama/logo kamu
 * 
 * 2. HeroSection:
 *    - headline: Nama/title utama kamu
 *    - subheadline: Tagline kamu
 * 
 * 3. AboutSection:
 *    - bio: Cerita tentang diri kamu
 *    - skills: Array skill kamu
 * 
 * 4. ProjectShowcase:
 *    - projects: Edit di components/portfolio/ProjectShowcase.tsx
 *    - Categories: UI Design, Web, Asset Design
 * 
 * 5. ContactCTA:
 *    - email: Email kontak kamu
 * 
 * 6. Footer:
 *    - Update social links & nama di components/footer/Footer.tsx
 * 
 * 7. Metadata (di layout.tsx):
 *    - title & description
 */

export default function Home() {
  return (
    <>
      {/* Ambient cursor spotlight effect */}
      <CursorSpotlight />

      {/* Navigation Header - Seamless */}
      <Header
        name="BagusWikan."
      />

      <main>
        {/* Hero Section with Parallax */}
        <HeroSection
          headline="Bagus Wikan Portofolio"
          subheadline="Creative Developer & Designer — Bringing ideas to life through code and design"
        />

        {/* About Section */}
        <AboutSection
          bio="Hi, I'm a Computer Science student focused on building modern web and mobile experiences with strong UI/UX design, using React, Next.js, and Vue."
          skills={["React", "Next.js", "TypeScript", "GSAP", "Tailwind CSS", "Figma", "UI/UX Design"]}
        />

        {/* Project Showcase — Infinite Carousel with Categories */}
        <ProjectShowcase />

        {/* Contact CTA */}
        <ContactCTA
          email="Baguswikan0603@gmail.com"
        />
        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
