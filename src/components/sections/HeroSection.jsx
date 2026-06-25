"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, MapPin, Briefcase } from "lucide-react";
import TextReveal from "@/components/ui/TextReveal";
import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/ui/ErrorBoundary";


const GLOBE_LANDMARKS = [
  { name: "Kollam, IN (Local Node)", x: 0, y: 72, z: 0, color: "#3B82F6", size: 5, details: "Developer Core System" },
  { name: "Auckland, NZ (Client Node)", x: 50, y: -42, z: 35, color: "#8B5CF6", size: 5, details: "Immigration Hub NZ" },
  { name: "React Nexus Endpoint", x: 35, y: 50, z: -42, color: "#06B6D4", size: 5, details: "Frontend SPA CDN" },
  { name: "Python API Cluster", x: -50, y: 32, z: -35, color: "#10B981", size: 5, details: "Django REST Server" },
  { name: "PostgreSQL DB Node", x: -35, y: -50, z: 42, color: "#F59E0B", size: 5, details: "Primary Replica" },
  { name: "Celery Workers", x: -55, y: -18, z: -35, color: "#EC4899", size: 5, details: "Async Queue Agent" }
];

const nodeSpecDetails = (index) => {
  const specs = [
    "Dev Server · 127.0.0.1",
    "Production · Nginx Proxy",
    "Tailwind v4 · Next.js 16",
    "Django REST · Python 3.12",
    "Postgres · Latency 0.4ms",
    "Celery Worker · Redis Queue"
  ];
  return specs[index] || "Unknown node spec";
};

function DevGlobeVisualizer({ orbRef, handleOrbMouseMove, handleOrbMouseLeave, orbRotateX, orbRotateY }) {
  const canvasRef = useRef(null);
  const coordsSpanRef = useRef(null);
  const logsContainerRef = useRef(null);
  const particlesRef = useRef([]);
  const activeNodeRef = useRef(null);
  
  const [logs, setLogs] = useState([
    { time: "--:--:--", text: "Global nexus telemetry initialized. Scanning satellites...", type: "sys" }
  ]);
  const [activeNode, setActiveNode] = useState(null);
  const [latency, setLatency] = useState(14.2);
  const [activeConnections, setActiveConnections] = useState(6);

  const logCallbackRef = useRef(null);
  const activeNodeCallbackRef = useRef(null);

  logCallbackRef.current = (log) => {
    setLogs(prev => [...prev.slice(-9), log]);
  };
  activeNodeCallbackRef.current = (node) => {
    if (activeNodeRef.current !== node) {
      activeNodeRef.current = node;
      setActiveNode(node);
    }
  };

  // Log container auto scroll (inner scroll only - fixes viewport bug)
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Fluctuating metric stats & time initialization
  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs([
      { time: timestamp, text: "Global nexus telemetry initialized. Satellite grid online.", type: "sys" }
    ]);

    const timer = setInterval(() => {
      setLatency(prev => {
        const change = (Math.random() - 0.5) * 3;
        return parseFloat(Math.max(5, Math.min(250, prev + change)).toFixed(1));
      });
      setActiveConnections(prev => {
        const choices = [5, 6, 7, 8];
        return choices[Math.floor(Math.random() * choices.length)];
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const triggerPing = () => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [...prev.slice(-9), {
      time: timestamp,
      text: "[Local Node] Broadcasting pings to all global endpoints...",
      type: "get"
    }]);

    // Send particles from India (Node 0) to all other nodes (Nodes 1-5)
    const fromNode = GLOBE_LANDMARKS[0];
    for (let i = 1; i < GLOBE_LANDMARKS.length; i++) {
      const toNode = GLOBE_LANDMARKS[i];
      particlesRef.current.push({
        id: Math.random().toString(),
        from: { x: fromNode.x, y: fromNode.y, z: fromNode.z },
        to: { x: toNode.x, y: toNode.y, z: toNode.z },
        progress: 0,
        speed: 0.015 + Math.random() * 0.01,
        color: toNode.color,
        size: 3.5,
        type: 'PING',
        targetName: toNode.name
      });
    }
  };

  const triggerSync = () => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [...prev.slice(-9), {
      time: timestamp,
      text: "[Github webhook] Repository sync request received. Fetching diff...",
      type: "post"
    }]);

    // Spawn 15 random descending sync packets hitting different sphere heights
    for (let i = 0; i < 15; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const destX = Math.sin(phi) * Math.cos(theta) * 72;
      const destY = Math.sin(phi) * Math.sin(theta) * 72;
      const destZ = Math.cos(phi) * 72;

      particlesRef.current.push({
        id: Math.random().toString(),
        from: { x: destX * 2, y: destY * 2, z: destZ * 2 },
        to: { x: destX, y: destY, z: destZ },
        progress: 0,
        speed: 0.02 + Math.random() * 0.015,
        color: '#10B981', // Green sync
        size: 2.5,
        type: 'SYNC'
      });
    }
  };

  // Main Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate sphere points
    const spherePoints = [];
    const numPoints = 140;
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      const theta = i * 2 * Math.PI / goldenRatio;
      
      spherePoints.push({
        x: Math.cos(theta) * radius * 72,
        y: y * 72,
        z: Math.sin(theta) * radius * 72
      });
    }

    let angleX = 0.22;
    let angleY = -0.45;
    let targetAngleX = 0.22;
    let targetAngleY = -0.45;
    let idleTime = 0;
    const mouse = { x: null, y: null };
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const project = (x, y, z, width, height, aX, aY) => {
      const cx = width / 2;
      const cy = height / 2;

      const cosY = Math.cos(aY);
      const sinY = Math.sin(aY);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;

      const cosX = Math.cos(aX);
      const sinX = Math.sin(aX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      const fov = 350;
      const scale = fov / (fov + z2);

      return {
        x: cx + x1 * scale,
        y: cy + y2 * scale,
        z: z2
      };
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseMoveLocal = (e) => {
      const rect = canvas.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;
      mouse.x = localX;
      mouse.y = localY;

      if (isDragging) {
        const dx = e.clientX - prevMouseX;
        const dy = e.clientY - prevMouseY;
        angleY += dx * 0.008;
        angleX += dy * 0.008;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
        // override target
        targetAngleX = angleX;
        targetAngleY = angleY;
      } else {
        const mx = (localX - rect.width / 2) / (rect.width / 2);
        const my = (localY - rect.height / 2) / (rect.height / 2);
        targetAngleX = 0.22 + my * 0.35;
        targetAngleY = -0.45 + mx * 0.5;
      }

      if (coordsSpanRef.current) {
        coordsSpanRef.current.textContent = `X: ${Math.round(localX)}, Y: ${Math.round(localY)}`;
      }
    };

    const handleMouseLeaveLocal = () => {
      mouse.x = null;
      mouse.y = null;
      isDragging = false;
      if (coordsSpanRef.current) {
        coordsSpanRef.current.textContent = "X: 0, Y: 0";
      }
    };

    const handleMouseUpGlobal = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMoveLocal);
    canvas.addEventListener("mouseleave", handleMouseLeaveLocal);
    window.addEventListener("mouseup", handleMouseUpGlobal);

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;

      // 1. BG Clear
      ctx.fillStyle = "rgba(10, 10, 10, 0.35)";
      ctx.fillRect(0, 0, w, h);

      // 2. Camera Wobble / Spin
      if (!isDragging) {
        idleTime += 0.0025;
        if (mouse.x === null) {
          targetAngleX = 0.22 + Math.sin(idleTime) * 0.04;
          targetAngleY = -0.45 + Math.cos(idleTime * 0.8) * 0.07;
        }
        angleX += (targetAngleX - angleX) * 0.05;
        angleY += (targetAngleY - angleY) * 0.05;
      }

      // 3. Draw Sphere Grid dots
      spherePoints.forEach(pt => {
        const proj = project(pt.x, pt.y, pt.z, w, h, angleX, angleY);
        const alpha = Math.max(0.04, Math.min(0.28, (350 - proj.z) / 700));
        
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      });

      // 4. Draw Core Aura
      const coreProj = project(0, 0, 0, w, h, angleX, angleY);
      const radGrd = ctx.createRadialGradient(coreProj.x, coreProj.y, 0, coreProj.x, coreProj.y, 82);
      radGrd.addColorStop(0, 'rgba(59, 130, 246, 0.06)');
      radGrd.addColorStop(0.5, 'rgba(139, 92, 246, 0.02)');
      radGrd.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.beginPath();
      ctx.arc(coreProj.x, coreProj.y, 82, 0, Math.PI * 2);
      ctx.fillStyle = radGrd;
      ctx.fill();

      // 5. Project Landmarks
      const landmarks = GLOBE_LANDMARKS.map((lm, idx) => {
        const proj = project(lm.x, lm.y, lm.z, w, h, angleX, angleY);
        return {
          ...lm,
          screenX: proj.x,
          screenY: proj.y,
          depth: proj.z,
          index: idx
        };
      });

      // 6. Draw internal Chord connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < landmarks.length; i++) {
        for (let j = i + 1; j < landmarks.length; j++) {
          const l1 = landmarks[i];
          const l2 = landmarks[j];
          const avgZ = (l1.depth + l2.depth) / 2;
          const alpha = Math.max(0.02, Math.min(0.15, (350 - avgZ) / 700));

          ctx.beginPath();
          ctx.moveTo(l1.screenX, l1.screenY);
          ctx.lineTo(l2.screenX, l2.screenY);
          ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.7})`;
          ctx.stroke();
        }
      }

      // 7. Hover Node Check
      let hoveredNode = null;
      if (mouse.x !== null && mouse.y !== null) {
        let minDist = 18;
        landmarks.forEach(node => {
          const dx = mouse.x - node.screenX;
          const dy = mouse.y - node.screenY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDist) {
            hoveredNode = node;
          }
        });
      }

      if (activeNodeCallbackRef.current) {
        activeNodeCallbackRef.current(hoveredNode);
      }

      // Sort landmarks by depth before drawing
      const sortedLandmarks = [...landmarks].sort((a, b) => b.depth - a.depth);

      // 8. Draw Landmarks
      sortedLandmarks.forEach(node => {
        const isHovered = hoveredNode && hoveredNode.index === node.index;
        const alpha = Math.max(0.2, Math.min(1.0, (350 - node.depth) / 380));

        ctx.beginPath();
        ctx.arc(node.screenX, node.screenY, node.size + (isHovered ? 4 : 2) + Math.sin(Date.now() / 200) * 1.5, 0, Math.PI * 2);
        ctx.strokeStyle = node.color;
        ctx.lineWidth = isHovered ? 1.5 : 0.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(node.screenX, node.screenY, node.size - 2, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowBlur = isHovered ? 10 : 3;
        ctx.shadowColor = node.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.font = isHovered ? "bold 8px monospace" : "8px monospace";
        ctx.fillStyle = isHovered ? "#ffffff" : `rgba(255, 255, 255, ${0.45 * alpha})`;
        ctx.textAlign = "center";
        ctx.fillText(node.name.split(" (")[0], node.screenX, node.screenY - 9);
      });

      // 9. Update & Draw Particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.progress += p.speed;

        if (p.progress >= 1.0) {
          if (p.type === 'PING') {
            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            if (logCallbackRef.current) {
              logCallbackRef.current({
                time: timestamp,
                text: `[Ping Success] ${p.targetName} connected. Latency: ${Math.round(15 + Math.random() * 95)}ms`,
                type: 'response'
              });
            }
          } else if (p.type === 'SYNC') {
            if (Math.random() < 0.08 && logCallbackRef.current) {
              const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
              logCallbackRef.current({
                time: timestamp,
                text: `[Repository] Replicated sync payload chunk #${Math.floor(Math.random() * 100)}`,
                type: 'response'
              });
            }
          }
          particles.splice(i, 1);
          continue;
        }

        const px = p.from.x + (p.to.x - p.from.x) * p.progress;
        const py = p.from.y + (p.to.y - p.from.y) * p.progress;
        const pz = p.from.z + (p.to.z - p.from.z) * p.progress;

        const proj = project(px, py, pz, w, h, angleX, angleY);

        ctx.beginPath();
        ctx.arc(proj.x, proj.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMoveLocal);
      canvas.removeEventListener("mouseleave", handleMouseLeaveLocal);
      window.removeEventListener("mouseup", handleMouseUpGlobal);
    };
  }, []);

  return (
    <motion.div
      ref={orbRef}
      onMouseMove={handleOrbMouseMove}
      onMouseLeave={handleOrbMouseLeave}
      style={{
        rotateX: orbRotateX,
        rotateY: orbRotateY,
        transformStyle: "preserve-3d"
      }}
      className="relative w-full max-w-[460px] cursor-grab active:cursor-grabbing group select-none"
    >
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-600/15 via-purple-600/10 to-cyan-500/15 blur-2xl opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none" />
      <div className="relative w-full rounded-2xl bg-[#0c0c0c]/85 border border-white/[0.06] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden backdrop-blur-xl group-hover:border-primary-accent/30 transition-all duration-500">
        <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.02] border-b border-white/[0.04]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(239,68,68,0.2)]" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.2)]" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.2)]" />
          </div>
          <div className="text-[10px] font-mono tracking-wider text-zinc-500">global-nexus-v1.0</div>
          <div className="text-[10px] font-mono text-emerald-500/90 font-bold"><span ref={coordsSpanRef}>X: 0, Y: 0</span></div>
        </div>
        <canvas ref={canvasRef} className="w-full h-[230px] bg-[#090909]/60 block border-b border-white/[0.04] cursor-move" />
        <div className="flex items-center justify-between px-4 py-2 bg-[#060606] border-b border-white/[0.04] text-[9px] font-mono">
          <div className="flex items-center gap-2">
            <button onClick={triggerPing} className="px-2.5 py-1 rounded border border-blue-500/20 bg-blue-500/5 text-blue-400 hover:bg-blue-500/10 transition-colors">[PING_ALL]</button>
            <button onClick={triggerSync} className="px-2.5 py-1 rounded border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10 transition-colors">[SYNC_DEPO]</button>
          </div>
          <button onClick={() => setLogs([{ time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), text: "Logs cleared.", type: "sys" }])} className="px-2 py-1 text-zinc-500 hover:text-white transition-colors">[CLR]</button>
        </div>
        <div className="bg-[#050505]/95 p-4 font-mono text-[9px] flex h-[140px]">
          <div className="w-[70%] pr-4 border-r border-white/[0.04] overflow-hidden">
            <div className="uppercase tracking-widest text-zinc-600 font-bold mb-1.5 border-b border-white/[0.03]">Pipeline Logs</div>
            <div ref={logsContainerRef} className="h-[105px] overflow-y-auto pr-1 space-y-1">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-1.5 items-start">
                  <span className="text-zinc-700">[{log.time}]</span>
                  <span className={`${log.type === 'sys' ? 'text-amber-500' : 'text-blue-500'}`}>❯</span>
                  <span className="text-zinc-400 break-all">{log.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[30%] pl-4 flex flex-col justify-center">
            {activeNode ? (
              <div className="text-[8px] space-y-0.5">
                <div className="text-white font-bold uppercase">{activeNode.name}</div>
                <div className="text-zinc-500">{activeNode.details}</div>
                <div className="text-emerald-400 pt-1">STATUS: ONLINE</div>
              </div>
            ) : (
              <div className="text-[8px] space-y-1 text-zinc-500">
                <div>LATENCY: <span className="text-zinc-300">{latency}ms</span></div>
                <div>SOCKETS: <span className="text-zinc-300">{activeConnections}</span></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}


const ROLES = [
  "Full-Stack Developer",
  "Python & Django Developer",
  "React Frontend Developer",
];

const TECH_BADGES = ["Python", "Django", "React", "PostgreSQL", "Tailwind CSS", "Git"];

const STATS = [
  { value: "2025",  label: "B.Tech CSE" },
  { value: "3",     label: "Featured Projects" },
  { value: "1",     label: "Client Site" },
];

export default function HeroSection({ heroRef, scrollToProjects, scrollToContact, activePhase = 1, onPhaseTransition }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed,  setDisplayed]  = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef(null);

  // Scroll linked storytelling parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleValue = useTransform(scrollYProgress, [0, 1], [1, 0.98]);

  // Typewriter effect (deferred until activePhase >= 3)
  useEffect(() => {
    if (activePhase < 3) return;
    
    const current = ROLES[roleIndex];
    let timeout;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 50);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 30);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex, activePhase]);

  // Interactive 3D Orb Proximity Tilt States
  const orbRef = useRef(null);
  const orbX = useMotionValue(0);
  const orbY = useMotionValue(0);
  const orbSpringConfig = { damping: 35, stiffness: 220, mass: 0.8 };
  const orbRotateX = useSpring(useTransform(orbY, [-0.5, 0.5], [20, -20]), orbSpringConfig);
  const orbRotateY = useSpring(useTransform(orbX, [-0.5, 0.5], [-20, 20]), orbSpringConfig);

  const handleOrbMouseMove = (e) => {
    if (!orbRef.current) return;
    const rect = orbRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates from -0.5 to 0.5
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    orbX.set(mouseX / width);
    orbY.set(mouseY / height);
  };

  const handleOrbMouseLeave = () => {
    orbX.set(0);
    orbY.set(0);
  };

  const containerVariants = {
    hidden: { 
      opacity: 0.15,
      scale: 1,
      filter: "blur(4px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={heroRef}
      className="min-h-screen lg:h-screen lg:min-h-0 bg-background relative flex flex-col items-center justify-center overflow-hidden pt-20 pb-16 lg:py-0 select-none"
    >


      {/* Ambient Background Glows */}
      <div 
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full pointer-events-none opacity-[0.07] blur-[120px] z-0"
        style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 75%)" }}
      />
      <div 
        className="absolute bottom-[-10%] left-[25%] w-[500px] h-[400px] rounded-full pointer-events-none opacity-[0.05] blur-[125px] z-0"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, transparent 75%)" }}
      />

      {/* Main content layer */}
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={activePhase >= 3 ? "visible" : "hidden"}
        style={{ y: textY, opacity: textOpacity, scale: scaleValue }}
        className="master-container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full pb-8 pt-4"
      >
        {/* Left Column (Content Details) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left w-full">
          
          {/* Availability Status Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border-default bg-surface/50 backdrop-blur-md text-[9px] font-mono text-text-muted tracking-[0.15em] uppercase mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-accent shadow-[0_0_8px_#3B82F6] animate-pulse" />
            <MapPin className="w-3.5 h-3.5 text-text-dim" />
            <span className="hidden sm:inline">Available for work · Kollam, Kerala, India</span>
            <span className="inline sm:hidden">Available · Kollam, IN</span>
          </motion.div>

          {/* Dynamic Massive Editorial Title — fluid, no awkward single-letter wrapping */}
          <h1 className="text-hero-heading font-black tracking-[-0.05em] leading-[0.88] uppercase font-display mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
            <span className="inline-block overflow-hidden pb-2 mr-4 whitespace-nowrap">
              <motion.span
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="inline-block"
              >
                Nabeel
              </motion.span>
            </span>
            <span className="inline-block overflow-hidden pb-2">
              <motion.span
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 } }
                }}
                className="inline-block text-white/25"
              >
                N
              </motion.span>
            </span>
          </h1>

          {/* Dynamic Role Typewriter */}
          <motion.div 
            variants={itemVariants} 
            className="flex items-center justify-start gap-2 mb-6 min-h-[28px]"
          >
            <Briefcase className="w-3.5 h-3.5 text-text-muted shrink-0" />
            <span className="text-[13px] font-bold text-text-muted font-mono tracking-[0.15em] uppercase">
              {displayed}
            </span>
            <span className="inline-block w-[1.5px] h-[1.1em] bg-primary-accent rounded-sm animate-[blink_0.9s_step-end_infinite] align-middle" />
          </motion.div>

          {/* Biography */}
          <motion.div variants={itemVariants} className="max-w-[540px] mb-8">
            <p className="text-text-muted text-[14px] md:text-[15px] leading-relaxed font-sans font-light text-left">
              <TextReveal text="Full-Stack Developer specializing in Python, Django, and React. Experienced in building client websites like Immigration Hub NZ and deploying production-ready applications." />
            </p>
          </motion.div>

          {/* Tech badges */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-wrap justify-start gap-1.5 mb-8"
          >
            {TECH_BADGES.map((tech) => (
              <span 
                key={tech} 
                className="px-3 py-1 rounded bg-surface border border-white/[0.04] text-[9px] font-mono text-text-muted tracking-[0.15em] hover:border-primary-accent/25 hover:text-zinc-300 transition-all cursor-default"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTAs — Clear primary/secondary hierarchy */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-start gap-3 mb-10 z-20">
            {/* Primary CTA — View Projects */}
            <button
              onClick={scrollToProjects}
              className="btn-glass-cosmic flex items-center gap-3 font-bold text-[10px] sm:text-xs font-mono uppercase tracking-[0.15em] px-6 py-4 sm:px-8 sm:py-5 shadow-2xl cursor-pointer relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-sweep pointer-events-none" />
              View Projects
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            {/* Secondary CTA — Download CV */}
            <a
              href="/nabeel_resume.pdf"
              download="Nabeel_Resume.pdf"
              className="btn-ghost-silver flex items-center gap-3 font-bold text-[10px] sm:text-xs font-mono uppercase tracking-[0.15em] px-6 py-4 sm:px-8 sm:py-5 cursor-pointer relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:animate-sweep pointer-events-none" />
              Download CV
            </a>
          </motion.div>

          {/* Premium Stats Row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-start gap-y-6 md:gap-y-3 px-6 py-5 border border-border-default rounded-[24px] bg-surface/40 backdrop-blur-xl max-w-xl w-full"
          >
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex flex-col items-start px-4 relative flex-1 min-w-[100px]">
                <span className="text-[clamp(20px,2.5vw,26px)] font-black text-white tracking-[-0.02em] font-sans leading-none">
                  {stat.value}
                </span>
                <span className="text-[8px] text-text-muted font-mono uppercase tracking-[0.15em] mt-2">
                  {stat.label}
                </span>
                {i < STATS.length - 1 && (
                  <div className="absolute right-0 top-[20%] h-[60%] w-px bg-gradient-to-b from-transparent via-primary-accent/20 to-transparent hidden md:block" />
                )}
              </div>
            ))}
          </motion.div>

        </div>

        {/* Right Column (Interactive Git Flow Visualizer) */}
        <div className="lg:col-span-5 hidden lg:flex items-center justify-center relative w-full">
          <DevGlobeVisualizer
            orbRef={orbRef}
            handleOrbMouseMove={handleOrbMouseMove}
            handleOrbMouseLeave={handleOrbMouseLeave}
            orbRotateX={orbRotateX}
            orbRotateY={orbRotateY}
          />
        </div>
      </motion.div>
    </section>
  );
}