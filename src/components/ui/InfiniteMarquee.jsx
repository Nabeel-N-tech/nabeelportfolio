"use client";
import React, { useState } from "react";

export default function InfiniteMarquee({
  items = [],
  className = "",
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex w-full overflow-hidden whitespace-nowrap ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 
        CSS Marquee Keyframes:
        Using translate3d to force hardware-accelerated compositor-thread execution.
        We translate to exactly -50% because the track contains a doubled list of items,
        making the loop perfectly seamless.
      */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-horizontal {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-track {
          display: flex;
          gap: 2.5rem; /* gap-10 */
          animation: marquee-horizontal 25s linear infinite;
          will-change: transform;
        }
        @media (min-width: 768px) {
          .marquee-track {
            gap: 5rem; /* gap-20 */
          }
        }
        /* Slow down to 20% speed on hover by modifying the animation-duration ratio */
        .marquee-track.slowed {
          animation-duration: 125s;
        }
      `}} />
      
      <div className={`marquee-track ${isHovered ? "slowed" : ""}`}>
        {/* Map items twice to create the seamless visual repeating loop */}
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="text-[clamp(40px,8vw,96px)] font-bold uppercase tracking-tighter text-white/20 hover:text-white/80 transition-all duration-300 select-none cursor-default hover:[text-shadow:0_0_30px_rgba(59,130,246,0.3)]"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}