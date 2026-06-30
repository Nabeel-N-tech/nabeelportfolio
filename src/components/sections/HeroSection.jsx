"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, MapPin, Briefcase } from "lucide-react";
import TextReveal from "@/components/ui/TextReveal";
import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/ui/ErrorBoundary";


const ROLES = [
  "Full-Stack Developer",
  "Python & Django Developer",
  "React Frontend Developer",
];

const TECH_BADGES = ["Python", "Django", "React", "PostgreSQL", "Tailwind CSS", "Git"];

const STATS = [
  { value: "2025",  label: "B.Tech CSE" },
  { value: "3",     label: "Featured Projects" },
  { value: "1",     label: "Client Site" },
];

export default function HeroSection({ heroRef, scrollToProjects, scrollToContact, activePhase = 1, onPhaseTransition }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed,  setDisplayed]  = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef(null);

  // Scroll linked storytelling parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleValue = useTransform(scrollYProgress, [0, 1], [1, 0.98]);

  // Typewriter effect (deferred until activePhase >= 3)
  useEffect(() => {
    if (activePhase < 3) return;
    
    const current = ROLES[roleIndex];
    let timeout;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 50);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 30);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex, activePhase]);

  const containerVariants = {
    hidden: { 
      opacity: 0.15,
      scale: 1,
      filter: "blur(4px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={heroRef}
      className="min-h-screen lg:h-screen lg:min-h-0 bg-background relative flex flex-col items-center justify-center overflow-hidden pt-20 pb-16 lg:py-0 select-none"
    >


      
      {/* Styled Milky Way Nebula Keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes orbit-1 {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(6vw, 4vh) scale(1.15) rotate(180deg); }
          100% { transform: translate(0, 0) scale(1) rotate(360deg); }
        }
        @keyframes orbit-2 {
          0% { transform: translate(0, 0) scale(1.1) rotate(0deg); }
          50% { transform: translate(-8vw, -6vh) scale(0.9) rotate(-180deg); }
          100% { transform: translate(0, 0) scale(1.1) rotate(-360deg); }
        }
        @keyframes orbit-3 {
          0% { transform: translate(0, 0) scale(0.9) rotate(0deg); }
          50% { transform: translate(-5vw, 6vh) scale(1.1) rotate(180deg); }
          100% { transform: translate(0, 0) scale(0.9) rotate(360deg); }
        }
        @keyframes orbit-4 {
          0% { transform: translate(0, 0) scale(1.05) rotate(0deg); }
          50% { transform: translate(6vw, -4vh) scale(0.95) rotate(-180deg); }
          100% { transform: translate(0, 0) scale(1.05) rotate(-360deg); }
        }
      `}} />

      {/* Milky Way Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#060608]">
        {/* Subtle stardust / cosmic texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        {/* Swirling Nebula Blobs */}
        <div 
          className="absolute top-[-25%] left-[-15%] w-[80vw] h-[80vw] rounded-full blur-[140px] pointer-events-none opacity-[0.12]"
          style={{ 
            background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(99,102,241,0.15) 50%, transparent 100%)",
            animation: "orbit-1 45s infinite linear",
            willChange: "transform",
            transform: "translate3d(0, 0, 0)"
          }}
        />
        <div 
          className="absolute bottom-[-20%] right-[-15%] w-[75vw] h-[75vw] rounded-full blur-[140px] pointer-events-none opacity-[0.10]"
          style={{ 
            background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, rgba(236,72,153,0.12) 50%, transparent 100%)",
            animation: "orbit-2 50s infinite linear",
            willChange: "transform",
            transform: "translate3d(0, 0, 0)"
          }}
        />
        <div 
          className="absolute top-[15%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[130px] pointer-events-none opacity-[0.08]"
          style={{ 
            background: "radial-gradient(circle, rgba(236,72,153,0.2) 0%, rgba(6,182,212,0.1) 50%, transparent 100%)",
            animation: "orbit-3 40s infinite linear",
            willChange: "transform",
            transform: "translate3d(0, 0, 0)"
          }}
        />
        <div 
          className="absolute bottom-[5%] left-[0%] w-[65vw] h-[65vw] rounded-full blur-[135px] pointer-events-none opacity-[0.07]"
          style={{ 
            background: "radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(59,130,246,0.08) 50%, transparent 100%)",
            animation: "orbit-4 60s infinite linear",
            willChange: "transform",
            transform: "translate3d(0, 0, 0)"
          }}
        />
      </div>

      {/* Main content layer */}
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={activePhase >= 3 ? "visible" : "hidden"}
        style={{ y: textY, opacity: textOpacity, scale: scaleValue }}
        className="master-container relative z-10 flex flex-col items-center justify-center text-center w-full max-w-4xl pb-8 pt-4"
      >
        {/* Centered Hero Content */}
        <div className="flex flex-col items-center text-center w-full max-w-2xl mx-auto z-10">
          
          {/* Availability Status Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border-default bg-surface/50 backdrop-blur-md text-[9px] font-mono text-text-muted tracking-[0.15em] uppercase mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-accent shadow-[0_0_8px_#3B82F6] animate-pulse" />
            <MapPin className="w-3.5 h-3.5 text-text-dim" />
            <span className="hidden sm:inline">Available for work · Kollam, Kerala, India</span>
            <span className="inline sm:hidden">Available · Kollam, IN</span>
          </motion.div>

          {/* Dynamic Massive Editorial Title — fluid, no awkward single-letter wrapping */}
          <h1 className="text-hero-heading font-black tracking-[-0.05em] leading-[0.88] uppercase font-display mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
            <span className="inline-block overflow-hidden pb-2 mr-4 whitespace-nowrap">
              <motion.span
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="inline-block"
              >
                Nabeel
              </motion.span>
            </span>
            <span className="inline-block overflow-hidden pb-2">
              <motion.span
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 } }
                }}
                className="inline-block text-white/25"
              >
                N
              </motion.span>
            </span>
          </h1>

          {/* Dynamic Role Typewriter */}
          <motion.div 
            variants={itemVariants} 
            className="flex items-center justify-center gap-2 mb-6 min-h-[28px]"
          >
            <Briefcase className="w-3.5 h-3.5 text-text-muted shrink-0" />
            <span className="text-[13px] font-bold text-text-muted font-mono tracking-[0.15em] uppercase">
              {displayed}
            </span>
            <span className="inline-block w-[1.5px] h-[1.1em] bg-primary-accent rounded-sm animate-[blink_0.9s_step-end_infinite] align-middle" />
          </motion.div>

          {/* Biography */}
          <motion.div variants={itemVariants} className="max-w-xl text-center mx-auto mb-8">
            <p className="text-text-muted text-[14px] md:text-[15px] leading-relaxed font-sans font-light text-center">
              <TextReveal text="Full-Stack Developer specializing in Python, Django, and React. Experienced in building client websites like Immigration Hub NZ and deploying production-ready applications." />
            </p>
          </motion.div>

          {/* Tech badges */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-wrap justify-center gap-1.5 mb-8"
          >
            {TECH_BADGES.map((tech) => (
              <span 
                key={tech} 
                className="px-3 py-1 rounded bg-surface border border-white/[0.04] text-[9px] font-mono text-text-muted tracking-[0.15em] hover:border-primary-accent/25 hover:text-zinc-300 transition-all cursor-default"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTAs — Clear primary/secondary hierarchy */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-10 z-20">
            {/* Primary CTA — View Projects */}
            <button
              onClick={scrollToProjects}
              className="btn-glass-cosmic flex items-center gap-3 font-bold text-[10px] sm:text-xs font-mono uppercase tracking-[0.15em] px-6 py-4 sm:px-8 sm:py-5 shadow-2xl cursor-pointer relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-sweep pointer-events-none" />
              View Projects
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            {/* Secondary CTA — Download CV */}
            <a
              href="/nabeel_resume.pdf"
              download="Nabeel_Resume.pdf"
              className="btn-ghost-silver flex items-center gap-3 font-bold text-[10px] sm:text-xs font-mono uppercase tracking-[0.15em] px-6 py-4 sm:px-8 sm:py-5 cursor-pointer relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:animate-sweep pointer-events-none" />
              Download CV
            </a>
          </motion.div>

          {/* Premium Stats Row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-y-6 md:gap-y-3 px-6 py-5 border border-border-default rounded-[24px] bg-surface/40 backdrop-blur-xl max-w-xl w-full mx-auto"
          >
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex flex-col items-center px-4 relative flex-1 min-w-[100px]">
                <span className="text-[clamp(20px,2.5vw,26px)] font-black text-white tracking-[-0.02em] font-sans leading-none">
                  {stat.value}
                </span>
                <span className="text-[8px] text-text-muted font-mono uppercase tracking-[0.15em] mt-2">
                  {stat.label}
                </span>
                {i < STATS.length - 1 && (
                  <div className="absolute right-0 top-[20%] h-[60%] w-px bg-gradient-to-b from-transparent via-primary-accent/20 to-transparent hidden md:block" />
                )}
              </div>
            ))}
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}