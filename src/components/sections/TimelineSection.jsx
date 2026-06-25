"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const timelineItems = [
  { year: "2021", title: "Started B.Tech CSE Degree", desc: "Began B.Tech in Computer Science and Engineering at MES Institute of Technology and Management, Kerala." },
  { year: "2025", title: "B.Tech CSE (Course Completed)", desc: "Completed 4-year B.Tech CSE coursework at MES Institute of Technology and Management, Kerala (2021 - 2025)." },
  { year: "2026", title: "Full Stack Certification", desc: "Completed Python Full Stack Development certification from ARCITE School of Data Science (February 2026)." },
];

export default function TimelineSection({ experienceRef }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 35%"],
  });

  const scaleProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section 
      ref={experienceRef} 
      className="relative z-10 py-32 md:py-48 bg-background text-white border-t border-white/[0.04] overflow-hidden select-none"
    >
      <div className="master-container relative z-10">
        
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-[10px] font-mono tracking-[0.15em] text-text-muted uppercase mb-20"
        >
          <span>04 / Journey</span>
          <span className="w-12 h-px bg-zinc-800" />
        </motion.div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-left max-w-md"
        >
          <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] font-black leading-[0.9] tracking-[-0.04em] text-white uppercase font-display">
            Education &amp; <br />
            <span className="text-blue-400/70 italic font-light text-glow-blue">Timeline</span>
          </h2>
        </motion.div>

        {/* ===== Desktop: Horizontal Timeline ===== */}
        <div ref={containerRef} className="hidden md:block">
          {/* Horizontal line track */}
          <div className="relative w-full h-[2px] mb-16">
            {/* Base track */}
            <div className="absolute inset-0 bg-white/[0.04] rounded-full" />
            {/* Animated progress */}
            <motion.div 
              style={{ 
                scaleX: scaleProgress,
              }} 
              className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" 
            />
          </div>

          {/* Horizontal card grid */}
          <div className="grid grid-cols-3 gap-8">
            {timelineItems.map((item, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                className="relative"
              >
                {/* Node on the line — positioned above the card */}
                <div className="absolute -top-[calc(1rem+16px+2px)] left-8 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-background border-2 border-blue-500/50 z-20 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.4)]">
                    <motion.div 
                      whileInView={{ 
                        scale: [0.5, 1.3, 1], 
                        backgroundColor: ["#0A0A0A", "#3B82F6", "#0A0A0A"],
                        boxShadow: [
                          "0 0 0px rgba(59,130,246,0)", 
                          "0 0 12px rgba(59,130,246,0.8)", 
                          "0 0 4px rgba(59,130,246,0.3)"
                        ]
                      }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.1 }}
                      className="w-2 h-2 rounded-full bg-blue-500/30"
                    />
                  </div>
                  {/* Connector line from node to card */}
                  <div className="w-px h-4 bg-gradient-to-b from-blue-500/40 to-transparent" />
                </div>

                {/* Glass content card */}
                <motion.div
                  whileHover={{ borderColor: "rgba(59, 130, 246, 0.2)", y: -4 }}
                  className="group/card relative glass-card p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden"
                >
                  {/* Large Transparent Year Watermark */}
                  <div className="absolute -top-4 right-4 text-[72px] font-black text-white/[0.02] font-mono pointer-events-none select-none z-0">
                    {item.year}
                  </div>

                  <div className="relative z-10 space-y-3">
                    <span className="font-mono text-primary-accent text-[10px] tracking-[0.15em] block uppercase font-bold">
                      {item.year}
                    </span>
                    <h4 className="text-base md:text-lg font-bold text-white uppercase tracking-tight group-hover/card:text-primary-accent transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-text-muted text-xs leading-relaxed font-sans font-light">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ===== Mobile: Vertical Timeline ===== */}
        <div className="md:hidden relative">
          {/* Vertical Rail Line */}
          <div className="absolute left-[4px] top-2 bottom-2 w-px bg-white/[0.04]">
            <motion.div 
              style={{ 
                scaleY: scaleProgress, 
                background: "linear-gradient(to bottom, #3B82F6 0%, #8B5CF6 50%, #3B82F6 100%)" 
              }} 
              className="absolute top-0 left-0 w-full h-full origin-top" 
            />
          </div>

          <div className="flex flex-col gap-12">
            {timelineItems.map((item, idx) => (
              <motion.div 
                key={idx}
                custom={idx}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                className="relative flex flex-col w-full"
              >
                {/* Vertical central node with glow */}
                <div className="absolute left-0 top-[26px] -translate-x-[5px] w-3 h-3 rounded-full bg-background border border-blue-500/40 z-20 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                  <motion.div 
                    whileInView={{ 
                      scale: [0.5, 1.3, 1], 
                      backgroundColor: ["#0A0A0A", "#3B82F6", "#0A0A0A"],
                      boxShadow: [
                        "0 0 0px rgba(59,130,246,0)", 
                        "0 0 10px rgba(59,130,246,0.8)", 
                        "0 0 3px rgba(59,130,246,0.3)"
                      ]
                    }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.1 }}
                    className="w-1.5 h-1.5 rounded-full bg-blue-500/30"
                  />
                </div>
                
                {/* Glass content card */}
                <div className="pl-6 w-full">
                  <motion.div
                    whileHover={{ borderColor: "rgba(59, 130, 246, 0.2)" }}
                    className="group/card relative glass-card p-6 rounded-2xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Year watermark */}
                    <div className="absolute -top-4 right-4 text-[72px] font-black text-white/[0.02] font-mono pointer-events-none select-none z-0">
                      {item.year}
                    </div>

                    <div className="relative z-10 space-y-3">
                      <span className="font-mono text-primary-accent text-[10px] tracking-[0.15em] block uppercase font-bold">
                        {item.year}
                      </span>
                      <h4 className="text-base md:text-lg font-bold text-white uppercase tracking-tight group-hover/card:text-primary-accent transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-text-muted text-xs leading-relaxed font-sans font-light">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}