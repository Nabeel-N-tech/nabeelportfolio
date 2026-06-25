"use client";
import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

export default function Spotlight({
  className = "",
  coreColor = "rgba(255, 255, 255, 0.12)", // Aligned to Border+ token
  ambientColor = "rgba(255, 255, 255, 0.03)", 
  size = 400,
}) {
  const containerRef = useRef(null);

  // Motion values track the raw target
  const mouseX = useMotionValue(-size);
  const mouseY = useMotionValue(-size);
  const opacity = useMotionValue(0);

  // Springs create the luxurious, weighted trailing effect
  const springConfig = { damping: 40, stiffness: 300, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothOpacity = useSpring(opacity, { damping: 30, stiffness: 200 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => opacity.set(1);
  const handleMouseLeave = () => opacity.set(0);

  // Track on window to maintain smooth physics even if the cursor moves extremely fast
  // outside the bounds of the parent container before the spring finishes settling.
  useEffect(() => {
    const handleWindowMouseMove = (e) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only update if within a reasonable bleed margin to save calculations
      if (
        x >= -size &&
        x <= rect.width + size &&
        y >= -size &&
        y <= rect.height + size
      ) {
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    return () => window.removeEventListener("mousemove", handleWindowMouseMove);
  }, [mouseX, mouseY, size]);

  // Combine the smoothed coordinates into a cinematic multi-layered gradient
  const background = useMotionTemplate`
    radial-gradient(${size / 4}px circle at ${smoothX}px ${smoothY}px, ${coreColor}, transparent 100%),
    radial-gradient(${size}px circle at ${smoothX}px ${smoothY}px, ${ambientColor}, transparent 100%)
  `;

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`pointer-events-none absolute inset-0 z-30 mix-blend-screen overflow-hidden ${className}`}
      style={{
        opacity: smoothOpacity,
        background,
      }}
    >
      {/* Subtle noise overlay to mimic a physical camera lens / premium SaaS texture */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }} 
      />
    </motion.div>
  );
}