"use client";
import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import Lenis from "lenis";

// Safely handle SSR environments like Next.js App Router
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Create the Context API for app-wide scroll control
const LenisContext = createContext(null);

// Hook for any component to pause, resume, or hijack the scroll
export const useLenis = () => {
  const context = useContext(LenisContext);
  if (context === undefined) {
    throw new Error("useLenis must be used within a LenisScrollProvider");
  }
  return context;
};

export default function LenisScrollProvider({ children }) {
  const [lenisInstance, setLenisInstance] = useState(null);

  useIsomorphicLayoutEffect(() => {
    // 1. Initialize Premium Lenis Physics
    const lenis = new Lenis({
      duration: 1.2, // Tuned for a heavy, cinematic momentum without feeling sluggish
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0, // 1:1 wheel mapping for predictable inertia
      touchMultiplier: 1.5,
      infinite: false,
    });

    setLenisInstance(lenis);

    // 2. Bind Lenis RAF to the native browser render loop
    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // 3. Memory Management
    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      setLenisInstance(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
}