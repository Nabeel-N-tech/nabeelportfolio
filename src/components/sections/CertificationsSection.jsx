"use client";
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Award } from "lucide-react";

export default function CertificationsSection({ certificationRef }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 1. Physical springs for interactive tilt
  const springConfig = { stiffness: 180, damping: 22, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-250, 250], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-250, 250], [-12, 12]), springConfig);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left - width / 2;
    const clientY = e.clientY - rect.top - height / 2;
    mouseX.set(clientX);
    mouseY.set(clientY);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section 
      ref={certificationRef} 
      className="relative z-10 py-section bg-background border-t border-white/[0.04] overflow-hidden select-none"
    >
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="master-container relative z-10">
        
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-[10px] font-mono tracking-[0.15em] text-text-muted uppercase mb-20"
        >
          <span>05 / Certifications</span>
          <span className="w-12 h-px bg-zinc-800" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Heading */}
          <div className="lg:col-span-5 text-left">
            <h2 className="text-section-heading font-black leading-[0.9] tracking-tighter text-white font-display uppercase">
              Certified <br />
              <span className="text-blue-400/70 italic font-light text-glow-blue">Skills.</span>
            </h2>
          </div>

          {/* 3D Interactive Holographic Card */}
          <div className="lg:col-span-7 flex justify-center lg:justify-start">
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ 
                rotateX, 
                rotateY, 
                transformStyle: "preserve-3d" 
              }}
              className="group relative w-full max-w-[420px] p-8 bg-surface rounded-3xl border border-white/[0.06] hover:border-white/[0.15] shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden gradient-border"
            >
              {/* Content Layer (3D pushed) */}
              <div style={{ transform: "translateZ(30px)" }} className="text-left relative z-20">
                <div className="flex justify-between items-center mb-10">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-500/[0.08] border border-blue-500/[0.15] text-blue-400 group-hover:text-primary-accent group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-300">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-[9px] font-mono tracking-[0.15em] text-primary-accent border border-primary-accent/25 px-4 py-1.5 rounded-full uppercase font-bold group-hover:bg-primary-accent/10 transition-colors duration-300">
                    Verified
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-primary-accent transition-colors duration-300">Python Full Stack Development</h3>
                  <p className="text-xs text-text-muted leading-relaxed font-sans font-light">
                    A verified training certificate covering Python, Django REST Framework, React, PostgreSQL, database design, and cloud hosting.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-8">
                  {["Python APIs", "React SPAs", "PostgreSQL Design", "JWT Security", "Git Workflow"].map((badge) => (
                    <span key={badge} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[8px] font-mono text-text-muted group-hover:border-primary-accent/20 group-hover:text-zinc-300 transition-all hover:shadow-[0_0_8px_rgba(59,130,246,0.1)]">
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/[0.04] grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[8px] font-mono text-text-dim uppercase tracking-[0.15em] mb-1">Issued By</p>
                    <p className="text-xs font-mono text-zinc-300 font-semibold">ARCITE School of Data Science</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-mono text-text-dim uppercase tracking-[0.15em] mb-1">Cert Date</p>
                    <p className="text-xs font-mono text-text-muted">February 2026</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}