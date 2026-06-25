"use client";
import React from "react";
import { motion } from "framer-motion";
import { Code2, Server, Layers, Cloud } from "lucide-react";
import TextReveal from "@/components/ui/TextReveal";

const CHIPS = [
  "B.Tech CSE (2021-2025)",
  "Full Stack Developer",
  "Python & Django",
  "React",
  "Client Web Experience",
  "Open to Work ✦",
];

export default function AboutSection({ aboutRef }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const services = [
    {
      icon: <Server className="w-5 h-5" />,
      iconCls: "bg-emerald-500/10 text-emerald-400",
      glowColor: "rgba(110,231,183,0.15)",
      borderHover: "hover:border-emerald-500/25",
      title: "Backend (Server & Databases)",
      desc: "Building secure servers, managing databases, and writing the logic that makes websites run behind the scenes.",
    },
    {
      icon: <Code2 className="w-5 h-5" />,
      iconCls: "bg-blue-500/10 text-blue-400",
      glowColor: "rgba(59,130,246,0.15)",
      borderHover: "hover:border-blue-500/25",
      title: "Frontend (Design & Layout)",
      desc: "Designing clean, modern web pages that look professional and automatically resize to fit any mobile phone or screen.",
    },
    {
      icon: <Layers className="w-5 h-5" />,
      iconCls: "bg-purple-500/10 text-purple-400",
      glowColor: "rgba(139,92,246,0.15)",
      borderHover: "hover:border-purple-500/25",
      title: "Full-Stack Development",
      desc: "Handling the complete process of building an app from the initial idea, to the database, design, and launch.",
    },
    {
      icon: <Cloud className="w-5 h-5" />,
      iconCls: "bg-cyan-500/10 text-cyan-400",
      glowColor: "rgba(6,182,212,0.15)",
      borderHover: "hover:border-cyan-500/25",
      title: "Hosting & Cloud",
      desc: "Setting up websites on cloud platforms so they are always online, safe, and load quickly for users.",
    },
  ];

  return (
    <section
      ref={aboutRef}
      className="relative z-10 py-section border-t border-white/[0.04] overflow-hidden select-none bg-background"
    >
      <div className="master-container relative z-10">
        
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-[10px] font-mono tracking-[0.15em] text-text-muted uppercase mb-20"
        >
          <span>01 / About Me</span>
          <span className="w-12 h-px bg-zinc-800" />
        </motion.div>

        {/* Editorial Split Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-28"
        >
          
          {/* Sticky Side Heading Column */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 lg:sticky lg:top-28 h-fit text-left z-10"
          >
            <h2 className="text-section-heading font-black leading-[0.95] tracking-[-0.03em] font-display">
              <span className="text-white block uppercase">Building</span>
              <span className="italic text-blue-400/80 block text-glow-blue">websites</span>
              <span className="text-white block uppercase">that work</span>
              <span className="italic block text-purple-400/60 text-glow-purple">
                beautifully.
              </span>
            </h2>

            {/* Decorative metadata rule */}
            <div className="mt-8 flex items-center gap-3">
              <span className="w-8 h-px bg-zinc-800" />
              <span className="text-[10px] font-mono text-text-muted tracking-[0.15em] uppercase">
                Nabeel N · {new Date().getFullYear()}
              </span>
            </div>
          </motion.div>

          {/* Biography Narrative Column */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 flex flex-col gap-6 text-left z-10"
          >
            {/* Biography Glass Card */}
            <div className="space-y-6">
              <div 
                className="glass-card rounded-2xl p-8 transition-all duration-300 max-w-text"
              >
                <div className="text-[16px] md:text-[18px] text-text-secondary leading-[1.85] font-sans font-normal space-y-4">
                  <p>
                    <TextReveal text="I am a Computer Science & Engineering B.Tech candidate (2021-2025) from MES Institute of Technology and Management, Kerala, with a strong focus on full-stack web development. I hold a Python Full Stack Development certification from ARCITE School of Data Science." />
                  </p>
                  <p>
                    <TextReveal text="My technical experience includes designing backend REST APIs using Django, database management with PostgreSQL/MySQL, and crafting responsive user interfaces with React. I have practical client project experience, having developed and optimized the live website for Immigration Hub NZ." />
                  </p>
                  <p>
                    <TextReveal text="I am now seeking an entry-level Software Developer position where I can apply my skills and build reliable software in a collaborative environment." />
                  </p>
                  
                  {/* Stylized Handwritten Signature of Nabeel N */}
                  <div className="pt-4 flex justify-end opacity-40 hover:opacity-100 transition-opacity duration-500">
                    <svg width="110" height="36" viewBox="0 0 110 36" fill="none" className="text-zinc-500 hover:text-white transition-colors duration-300">
                      <path d="M12 28 C12 28, 14 10, 18 10 C22 10, 20 28, 25 28 C30 28, 35 15, 38 15 C41 15, 42 22, 45 22 C48 22, 50 18, 52 18 C54 18, 55 22, 58 22 C62 22, 65 10, 68 10 C70 10, 72 25, 75 25 L85 25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 23 L80 23" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-1.5 pt-4">
              {CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="px-4 py-2 rounded-full border border-white/[0.06] bg-surface text-[9px] font-mono text-text-muted tracking-[0.15em] hover:border-primary-accent/25 hover:text-zinc-300 transition-all cursor-default"
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Core Expertise — Bento Box Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch relative z-10"
        >
          {services.map((card, idx) => (
            <motion.div
              key={card.title}
              variants={itemVariants}
              whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.15)" }}
              className={`group relative flex flex-col items-center justify-center text-center gap-5 px-6 py-10 h-full rounded-2xl border border-white/[0.06] bg-surface/50 backdrop-blur-md transition-all duration-300 cursor-default overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.03),0_10px_30px_rgba(0,0,0,0.4)] ${card.borderHover}`}
            >
              {/* Hover glow reflection overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${card.glowColor} 0%, transparent 65%)` }}
              />

              {/* Icon container with glow ring */}
              <div
                className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${card.iconCls} border border-white/[0.03] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-shadow duration-300`}
              >
                {card.icon}
              </div>

              {/* Title */}
              <p className="relative z-10 text-[12px] font-mono uppercase tracking-[0.15em] text-zinc-200 font-bold leading-tight">
                {card.title}
              </p>

              {/* Description — bumped for legibility */}
              <p className="relative z-10 text-[13px] text-text-muted leading-relaxed font-sans group-hover:text-zinc-300 transition-colors duration-300">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}