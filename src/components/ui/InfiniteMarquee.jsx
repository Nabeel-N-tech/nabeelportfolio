"use client";
import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
  useScroll,
  useVelocity,
  useSpring,
} from "framer-motion";

export default function InfiniteMarquee({
  items = [],
  baseVelocity = -25,
  className = "",
}) {
  const baseX = useMotionValue(0);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth out the animation speed
  const smoothVelocity = useSpring(baseVelocity, {
    damping: 50,
    stiffness: 400,
  });

  useAnimationFrame((t, delta) => {
    let moveBy = smoothVelocity.get() * (delta / 1000);
    
    // Slow down on hover
    if (isHovered) moveBy *= 0.2;

    baseX.set(baseX.get() + moveBy);
  });

  // The seamless loop logic
  const x = useTransform(baseX, (v) => `${v % -50}%`);

  return (
    <div
      className={`relative flex w-full overflow-hidden whitespace-nowrap ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex gap-10 md:gap-20"
        style={{ x }}
      >
        {/* We map twice to ensure no gap during the loop */}
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="text-[clamp(40px,8vw,96px)] font-bold uppercase tracking-tighter text-white/20 hover:text-white/80 transition-all duration-300 select-none cursor-default hover:[text-shadow:0_0_30px_rgba(59,130,246,0.3)]"
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}