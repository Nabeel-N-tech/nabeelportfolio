"use client";
import { useRef, useState, useEffect } from "react";
import { Home, User, Cpu, Briefcase, Calendar, Mail } from "lucide-react";

// Components
import BottomNavBar from "@/components/ui/bottom-nav-bar";
import { useLenis } from "@/components/LenisScrollProvider";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

// Sections
import HeroSection           from "@/components/sections/HeroSection";
import AboutSection          from "@/components/sections/AboutSection";
import SkillsSection         from "@/components/sections/SkillsSection";
import ProjectsSection       from "@/components/sections/ProjectsSection";
import TimelineSection       from "@/components/sections/TimelineSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection        from "@/components/sections/ContactSection";

export default function Portfolio() {
  const [introPhase, setIntroPhase] = useState(4);
  const lenis = useLenis();

  // Section refs for smooth-scroll navigation
  const heroRef       = useRef(null);
  const aboutRef      = useRef(null);
  const skillsRef     = useRef(null);
  const projectsRef   = useRef(null);
  const experienceRef = useRef(null);
  const contactRef    = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  // Force scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [lenis]);

  // Enable standard smooth scroll immediately on mount
  useEffect(() => {
    if (!lenis) return;
    lenis.start();
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }, [lenis]);

  // IntersectionObserver to sync active navigation link on scroll
  useEffect(() => {
    const sections = [
      { ref: heroRef, index: 0 },
      { ref: aboutRef, index: 1 },
      { ref: skillsRef, index: 2 },
      { ref: projectsRef, index: 3 },
      { ref: experienceRef, index: 4 },
      { ref: contactRef, index: 5 },
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = sections.find((s) => s.ref.current === entry.target);
          if (section) {
            setActiveIndex(section.index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((s) => {
      if (s.ref.current) observer.observe(s.ref.current);
    });

    return () => {
      sections.forEach((s) => {
        if (s.ref.current) observer.unobserve(s.ref.current);
      });
    };
  }, []);

  const scrollTo = (ref) => {
    if (lenis && ref.current) {
      lenis.scrollTo(ref.current, { duration: 1.2 });
    } else if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Home", icon: Home, onClick: () => scrollTo(heroRef) },
    { label: "About", icon: User, onClick: () => scrollTo(aboutRef) },
    { label: "Skills", icon: Cpu, onClick: () => scrollTo(skillsRef) },
    { label: "Projects", icon: Briefcase, onClick: () => scrollTo(projectsRef) },
    { label: "Timeline", icon: Calendar, onClick: () => scrollTo(experienceRef) },
    { label: "Contact", icon: Mail, onClick: () => scrollTo(contactRef) },
  ];

  return (
    <>
      {/* Navigation — always visible and accessible */}
      <BottomNavBar 
        items={navItems}
        position="top"
        onLogoClick={() => scrollTo(heroRef)}
        activeIndex={activeIndex}
        onChange={(idx) => {
          setActiveIndex(idx);
          navItems[idx].onClick();
        }}
      />

      <div className="flex-1 w-full bg-background text-white relative dot-grid">

        {/* ===================== SECTIONS ===================== */}
        <main>
          <HeroSection
            heroRef={heroRef}
            scrollToProjects={() => scrollTo(projectsRef)}
            scrollToContact={() => scrollTo(contactRef)}
            activePhase={introPhase}
            onPhaseTransition={setIntroPhase}
          />

          <ErrorBoundary>
            <AboutSection aboutRef={aboutRef} />
          </ErrorBoundary>
          <ErrorBoundary>
            <SkillsSection skillsRef={skillsRef} />
          </ErrorBoundary>
          <ErrorBoundary>
            <ProjectsSection projectsRef={projectsRef} />
          </ErrorBoundary>
          <ErrorBoundary>
            <TimelineSection experienceRef={experienceRef} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CertificationsSection />
          </ErrorBoundary>
          <ErrorBoundary>
            <ContactSection contactRef={contactRef} />
          </ErrorBoundary>
        </main>

        {/* ===================== FOOTER ===================== */}
        <footer className="border-t border-white/[0.06] py-16 z-10 relative bg-background pb-24 md:pb-28">
          <div className="master-container grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            
            {/* Brand Col */}
            <div className="md:col-span-5 space-y-3 text-left">
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="shrink-0">
                  <circle cx="16" cy="16" r="15" fill="#0A0A0A" stroke="#1a1a1a" strokeWidth="1.5"/>
                  <path d="M8 21V11L16 21V11" stroke="#3B82F6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 21V11L24 21V11" stroke="#8B5CF6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-lg font-bold text-white tracking-tight">Nabeel N</span>
              </div>
              <p className="text-[13px] text-text-muted font-mono uppercase tracking-[0.15em]">Full-Stack Developer</p>
              <p className="text-sm text-text-muted max-w-xs leading-relaxed font-sans pt-2">
                Building reliable web apps, securing databases, and deploying clean code.
              </p>
            </div>

            {/* Contact Col */}
            <div className="md:col-span-4 space-y-2.5 text-sm text-text-muted text-left">
              <span className="block text-[13px] font-mono text-text-muted uppercase tracking-[0.15em] mb-2">Info</span>
              <p className="font-sans flex items-center gap-2">
                <span className="text-text-dim font-mono">Mail:</span>
                <a href="mailto:nabeeln1230@gmail.com" className="hover:text-white transition-colors">nabeeln1230@gmail.com</a>
              </p>
              <p className="font-sans flex items-center gap-2">
                <span className="text-text-dim font-mono">Tel:</span>
                <a href="tel:+919567796191" className="hover:text-white transition-colors">+91 9567796191</a>
              </p>
              <p className="font-sans flex items-center gap-2">
                <span className="text-text-dim font-mono">Loc:</span>
                <span className="text-text-muted">Kollam, Kerala, India</span>
              </p>
            </div>

            {/* Socials Col */}
            <div className="md:col-span-3 space-y-2.5 text-sm text-text-muted text-left">
              <span className="block text-[13px] font-mono text-text-muted uppercase tracking-[0.15em] mb-2">Connect</span>
              <p className="font-sans">
                <a href="https://github.com/Nabeel-N-tech" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  GitHub <span className="text-[13px] font-mono text-text-dim">Nabeel-N-tech</span>
                </a>
              </p>
              <p className="font-sans">
                <a href="https://linkedin.com/in/nabeel-n-dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  LinkedIn <span className="text-[13px] font-mono text-text-dim">nabeel-n-dev</span>
                </a>
              </p>
            </div>
          </div>

          {/* Bottom Rights Bar */}
          <div className="master-container border-t border-white/[0.05] mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-text-dim text-[13px] font-mono uppercase tracking-[0.15em]">
              &copy; {new Date().getFullYear()} Nabeel N
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}