"use client";
import { motion } from "framer-motion";
import SkillsBento from "@/components/ui/SkillsBento";
import InfiniteMarquee from "@/components/ui/InfiniteMarquee";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

export default function SkillsSection({ skillsRef }) {
  return (
    <section
      ref={skillsRef}
      className="relative z-10 py-section border-t border-white/[0.04] overflow-hidden bg-background"
    >
      <div className="master-container">
        
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-[10px] font-mono tracking-[0.15em] text-text-muted uppercase mb-20"
        >
          <span>02 / Skills</span>
          <span className="w-12 h-px bg-zinc-800" />
        </motion.div>

        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-20 max-w-[480px]">
          <h2 className="text-section-heading font-black leading-[0.95] tracking-[-0.03em] font-display mb-6 text-white uppercase">
            Technical <br />
            <span className="text-blue-400/70 italic font-light text-glow-blue">Skills.</span>
          </h2>
          <p className="text-[14px] md:text-[15px] text-text-muted leading-relaxed font-sans font-light">
            Technologies and tools I have worked with through academic learning, certification training, and personal projects.
          </p>
        </div>

        {/* Bento Skills Grid */}
        <div className="w-full mb-20 relative z-20">
          <ErrorBoundary>
            <SkillsBento />
          </ErrorBoundary>
        </div>

        {/* Infinite Marquee */}
        <div className="border-y border-white/[0.04] py-5 overflow-hidden w-full relative z-10 bg-background">
          {/* Edge fade masks for seamless background blending */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <InfiniteMarquee
            items={[
              "PYTHON", "DJANGO", "JWT AUTHENTICATION",
              "REACT", "JAVASCRIPT", "HTML5", "CSS3", "TAILWIND CSS",
              "MYSQL",
              "GIT", "GITHUB", "POSTMAN",
              "VERCEL", "RENDER"
            ]}
            speed="medium"
            direction="left"
          />
        </div>
      </div>
    </section>
  );
}