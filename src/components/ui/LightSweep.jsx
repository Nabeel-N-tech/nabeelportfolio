"use client";
import React from "react";
import { motion } from "framer-motion";

export default function LightSweep({ text, className, trigger = false, glowColor = "rgba(239, 68, 68, 0.8)" }) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Base Typography */}
      <span className="text-white relative z-10 block select-none">
        {text}
      </span>

      {/* Volumetric Glare Sweep Overlay */}
      {trigger && (
        <motion.span
          initial={{ clipPath: "polygon(-20% 0%, 0% 0%, -10% 100%, -30% 100%)" }}
          animate={{
            clipPath: [
              "polygon(-20% 0%, 0% 0%, -10% 100%, -30% 100%)", // Left side start
              "polygon(30% 0%, 60% 0%, 50% 100%, 20% 100%)",   // Middle sweep
              "polygon(100% 0%, 120% 0%, 110% 100%, 90% 100%)"  // Right side exit
            ]
          }}
          transition={{
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2
          }}
          className="absolute inset-0 z-20 select-none block bg-gradient-to-r from-transparent via-white to-transparent bg-clip-text text-transparent"
          style={{
            WebkitBackgroundClip: "text",
            filter: `drop-shadow(0 0 12px ${glowColor})`,
            mixBlendMode: "color-dodge"
          }}
        >
          {text}
        </motion.span>
      )}
    </div>
  );
}
