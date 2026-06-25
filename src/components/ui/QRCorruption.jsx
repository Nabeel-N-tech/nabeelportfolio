"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function QRCorruption({ activePhase = 1 }) {
  const [glitchBars, setGlitchBars] = useState([]);

  useEffect(() => {
    if (activePhase !== 3 && activePhase !== 4) {
      setGlitchBars([]);
      return;
    }

    const interval = setInterval(() => {
      const bars = [];
      const barCount = Math.floor(Math.random() * 4) + 1;
      
      for (let i = 0; i < barCount; i++) {
        bars.push({
          id: Math.random(),
          top: Math.random() * 100,
          height: Math.random() * 8 + 2,
          offset: (Math.random() - 0.5) * 15,
          opacity: Math.random() * 0.35 + 0.1
        });
      }
      setGlitchBars(bars);
      
      // Clear bars quickly for flash effect
      setTimeout(() => setGlitchBars([]), Math.random() * 80 + 40);
    }, 250);

    return () => clearInterval(interval);
  }, [activePhase]);

  if (activePhase !== 3 && activePhase !== 4) return null;

  return (
    <>
      {/* 1. Symmetrical Analog CRT Scanline Filter Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[25] opacity-[0.05]"
        style={{
          backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
          backgroundSize: "100% 4px, 6px 100%"
        }}
      />

      {/* 2. Cyberpunk Terminal Glitch Line Bars */}
      {glitchBars.map((bar) => (
        <div
          key={bar.id}
          className="fixed left-0 w-full bg-red-500/20 border-y border-red-500/10 pointer-events-none z-[26]"
          style={{
            top: `${bar.top}%`,
            height: `${bar.height}px`,
            opacity: bar.opacity,
            transform: `translateX(${bar.offset}px)`
          }}
        />
      ))}

      {/* 3. Volumetric Screen-flash Aberrations (Phase 4 only) */}
      {activePhase === 4 && (
        <motion.div
          animate={{
            opacity: [0, 0.1, 0, 0.08, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="fixed inset-0 pointer-events-none z-[24] bg-emerald-500/[0.02] mix-blend-color-dodge"
        />
      )}
    </>
  );
}
