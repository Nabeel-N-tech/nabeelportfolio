"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const GLOWS = [
  "from-blue-600/15 to-indigo-600/15",     // Home
  "from-indigo-600/15 to-purple-600/15",    // About
  "from-purple-600/15 to-cyan-600/15",      // Skills
  "from-cyan-600/15 to-emerald-600/15",     // Projects
  "from-emerald-600/15 to-blue-600/15",     // Timeline
  "from-blue-600/15 to-fuchsia-600/15",     // Contact
];

export function BottomNavBar({
  className,
  defaultIndex = 0,
  position = "top", // "top" or "bottom"
  items = [],
  activeIndex,
  onChange,
  onLogoClick,
}) {
  const [localIndex, setLocalIndex] = useState(defaultIndex);
  const active = activeIndex !== undefined ? activeIndex : localIndex;
  const setActive = onChange !== undefined ? onChange : setLocalIndex;
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track scroll for enhanced glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav
      initial={{ scale: 0.95, opacity: 0, y: position === "top" ? -20 : 20, height: 54 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: 0,
        height: isOpen ? 420 : 54,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      layout
      role="navigation"
      aria-label="Main Navigation"
      style={{ borderRadius: isOpen ? "28px" : "9999px" }}
      className={cn(
        "backdrop-blur-2xl border shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col justify-start overflow-hidden z-50 select-none relative transition-colors duration-500",
        scrolled
          ? "bg-[#0a0a0a]/70 border-white/[0.08]"
          : "bg-[#0a0a0a]/40 border-white/[0.06]",
        // Position
        position === "bottom" && "fixed inset-x-0 bottom-6 mx-auto w-[92vw] md:w-[85vw] md:max-w-5xl",
        position === "top" && "fixed inset-x-0 top-6 mx-auto w-[92vw] md:w-[85vw] md:max-w-5xl",
        className
      )}
    >
      {/* Dynamic Ambient Background Shifting Glow (Desktop Only) */}
      <div 
        className={cn(
          "absolute inset-0 -z-20 rounded-full blur-xl opacity-50 transition-all duration-1000 bg-gradient-to-r hidden md:block",
          GLOWS[active] || "from-blue-600/15 to-cyan-600/15"
        )}
      />

      {/* Top Header Row (Logo + Desktop Links + CTA / Hamburger) */}
      <div className="flex items-center justify-between h-[54px] w-full px-6 shrink-0 relative z-10">
        
        {/* Left Side Area (Logo + Brand Name) */}
        <div className="flex items-center flex-1 justify-start">
          <motion.button
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (onLogoClick) onLogoClick();
              setIsOpen(false);
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-surface-elevated/50 border border-white/[0.06] hover:border-primary-accent/40 text-[#D7E2EA] font-sans font-black text-[11px] tracking-tighter transition-all cursor-pointer mr-1.5 active:scale-95 relative group overflow-hidden"
            title="Scroll to Top"
            type="button"
          >
            {/* Animated internal radial accent on hover */}
            <span className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <span className="relative z-10 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 32 32" fill="none" className="transition-transform duration-300 group-hover:scale-110">
                <path d="M6 23V9L16 23V9" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 23V9L26 23V9" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </motion.button>
          
          {/* Brand Name (Desktop Only) */}
          <span className="hidden lg:block text-[9px] font-mono tracking-widest text-[#D7E2EA] ml-3 uppercase">Nabeel N</span>
          
          {/* Vertical Divider (Desktop Only) */}
          <div className="hidden md:block h-6 w-px bg-white/[0.08] ml-4" />
        </div>

        {/* Center: Desktop Horizontal Navigation Links */}
        <div className="hidden md:flex items-center justify-center space-x-1 relative h-full">
          {items.map((item, idx) => {
            const Icon = item.icon;
            const isActive = active === idx;

            return (
              <button
                key={item.label}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={cn(
                  "flex items-center justify-center gap-2 px-4 py-1.5 rounded-full transition-colors duration-300 relative h-9 min-h-[36px] max-h-[36px] z-10 cursor-pointer select-none font-mono text-[9px] tracking-[0.15em] uppercase",
                  isActive ? "text-white font-bold" : "text-zinc-400 hover:text-white"
                )}
                onClick={() => {
                  setActive(idx);
                  if (item.onClick) item.onClick();
                }}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                type="button"
              >
                {/* 1. Active Pill Background — accent gradient */}
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full z-0 shadow-[0_4px_20px_rgba(59,130,246,0.3)]"
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 24,
                    }}
                  />
                )}

                {/* 2. Active Glow Aura */}
                {isActive && (
                  <motion.div
                    layoutId="activePillGlow"
                    className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/25 to-purple-500/25 blur-md z-[-1] opacity-80"
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 22,
                    }}
                  />
                )}

                {/* 3. Hover Pill Trail */}
                {hoveredIdx === idx && !isActive && (
                  <motion.div
                    layoutId="hoverPill"
                    className="absolute inset-0 bg-white/[0.04] border border-white/[0.06] rounded-full z-0"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 26,
                    }}
                  />
                )}

                {/* Icon and label container */}
                <div className="relative z-10 flex items-center justify-center gap-1.5">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.08 : hoveredIdx === idx ? 1.05 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Icon
                      size={13}
                      strokeWidth={2.2}
                      aria-hidden
                      className="transition-transform duration-300"
                    />
                  </motion.div>
                  <span className="relative z-10 leading-none">{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side Area (Mobile Hamburger) */}
        <div className="flex items-center justify-end flex-1 gap-3">

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden w-11 h-11 rounded-xl flex items-center justify-center bg-white/[0.02] border border-white/[0.05] hover:border-white/15 text-zinc-300 transition-all cursor-pointer"
            aria-label="Toggle Menu"
            type="button"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" className="text-zinc-300">
              <motion.path
                fill="transparent"
                strokeWidth="2.2"
                stroke="currentColor"
                strokeLinecap="round"
                variants={{
                  closed: { d: "M 3 5 L 17 5" },
                  open: { d: "M 4.5 15.5 L 15.5 4.5" }
                }}
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 0.22 }}
              />
              <motion.path
                d="M 3 10 L 17 10"
                fill="transparent"
                strokeWidth="2.2"
                stroke="currentColor"
                strokeLinecap="round"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 0.15 }}
              />
              <motion.path
                fill="transparent"
                strokeWidth="2.2"
                stroke="currentColor"
                strokeLinecap="round"
                variants={{
                  closed: { d: "M 3 15 L 17 15" },
                  open: { d: "M 4.5 4.5 L 15.5 15.5" }
                }}
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 0.22 }}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer — Frosted glass slide-down overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex flex-col px-4 pb-6 space-y-2 mt-2 w-full md:hidden border-t border-white/[0.04] pt-4 relative z-10"
          >
            <div className="flex flex-col space-y-2">
              {items.map((item, idx) => {
                const Icon = item.icon;
                const isActive = active === idx;

                return (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className={cn(
                      "flex items-center justify-between w-full px-5 py-3 rounded-xl transition-all relative overflow-hidden cursor-pointer select-none",
                      isActive 
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-[0_4px_20px_rgba(59,130,246,0.2)]" 
                        : "bg-white/[0.01] hover:bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.02]"
                    )}
                    onClick={() => {
                      setActive(idx);
                      if (item.onClick) item.onClick();
                      setIsOpen(false);
                    }}
                    aria-current={isActive ? "page" : undefined}
                    type="button"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-wider">
                      {item.label}
                    </span>
                    <Icon size={14} className={isActive ? "text-white" : "text-zinc-400"} />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  );
}

export default BottomNavBar;
