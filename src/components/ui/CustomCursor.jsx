"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState("default"); // default, hover, text
  const [isMobile, setIsMobile] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 45, stiffness: 450, mass: 0.35 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(
        window.innerWidth < 768 || 
        ("ontouchstart" in window) || 
        navigator.maxTouchPoints > 0
      );
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    // Apply cursor: none to body and target elements
    document.body.style.cursor = "none";
    const sheet = document.createElement("style");
    sheet.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(sheet);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isHoverable = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a") || 
        target.classList.contains("cursor-pointer") ||
        target.getAttribute("role") === "button";
      
      const isText = 
        target.tagName === "INPUT" || 
        target.tagName === "TEXTAREA" || 
        target.closest("input") || 
        target.closest("textarea");

      if (isHoverable) {
        setCursorType("hover");
      } else if (isText) {
        setCursorType("text");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "";
      if (document.head.contains(sheet)) {
        document.head.removeChild(sheet);
      }
    };
  }, [isMobile]);

  if (isMobile) return null;

  const variants = {
    default: {
      width: 12,
      height: 12,
      borderRadius: "50%",
      backgroundColor: "#ffffff",
      border: "0px solid transparent",
      marginLeft: -6,
      marginTop: -6,
    },
    hover: {
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: "rgba(110, 231, 183, 0.15)",
      border: "1px solid rgba(110, 231, 183, 0.4)",
      marginLeft: -20,
      marginTop: -20,
    },
    text: {
      width: 2,
      height: 18,
      borderRadius: "1px",
      backgroundColor: "#6EE7B7",
      border: "0px solid transparent",
      marginLeft: -1,
      marginTop: -9,
    }
  };

  return (
    <motion.div
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 99999,
        pointerEvents: "none",
      }}
      animate={cursorType}
      variants={variants}
      transition={{ duration: 0.08 }}
    />
  );
}
