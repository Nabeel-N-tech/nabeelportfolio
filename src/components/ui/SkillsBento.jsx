"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Terminal, 
  Server, 
  Cpu, 
  Globe, 
  Code2, 
  Layers, 
  Database, 
  GitBranch, 
  Cloud 
} from "lucide-react";
import { GitHub } from "@/components/icons/BrandIcons";

const ICON_MAP = {
  Terminal: Terminal,
  Server: Server,
  Cpu: Cpu,
  Globe: Globe,
  Code2: Code2,
  Layers: Layers,
  Database: Database,
  GitBranch: GitBranch,
  Github: GitHub,
  Cloud: Cloud
};

// Group skills by category for the standard grid
const SKILL_GROUPS = [
  {
    category: "Languages",
    skills: [
      { id: "python", name: "Python", icon: "Terminal", color: "#10b981" },
      { id: "javascript", name: "JavaScript (ES6+)", icon: "Code2", color: "#f59e0b" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { id: "django", name: "Django", icon: "Server", color: "#047857" },
      { id: "drf", name: "Django REST Framework", icon: "Cpu", color: "#3b82f6" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { id: "react", name: "React", icon: "Globe", color: "#06b6d4" },
      { id: "tailwind", name: "Tailwind CSS", icon: "Layers", color: "#06b6d4" },
    ],
  },
  {
    category: "Databases",
    skills: [
      { id: "postgresql", name: "PostgreSQL", icon: "Database", color: "#38bdf8" },
      { id: "mysql", name: "MySQL", icon: "Database", color: "#1d4ed8" },
    ],
  },
  {
    category: "Developer Tools",
    skills: [
      { id: "git", name: "Git", icon: "GitBranch", color: "#f97316" },
      { id: "github", name: "GitHub", icon: "Github", color: "#ffffff" },
    ],
  },
  {
    category: "DevOps & Hosting",
    skills: [
      { id: "vercel", name: "Vercel", icon: "Cloud", color: "#ffffff" },
      { id: "render", name: "Render", icon: "Cloud", color: "#a855f7" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SkillsBento() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-5%" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 select-none w-full max-w-6xl mx-auto"
    >
      {SKILL_GROUPS.map((group) => (
        <motion.div
          key={group.category}
          variants={itemVariants}
          className="glass-card rounded-2xl p-6 relative overflow-hidden group/card transition-all duration-300 hover:border-white/[0.12]"
        >
          {/* Category header */}
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-4 rounded-full bg-gradient-to-b from-primary-accent to-secondary-accent" />
            <span className="text-[10px] font-mono tracking-[0.15em] text-text-muted uppercase font-bold">
              {group.category}
            </span>
          </div>

          {/* Skills list */}
          <div className="space-y-3">
            {group.skills.map((skill) => {
              const TechIcon = ICON_MAP[skill.icon] || Code2;
              const isHovered = hoveredId === skill.id;

              return (
                <div
                  key={skill.id}
                  onMouseEnter={() => setHoveredId(skill.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-300 cursor-default ${
                    isHovered
                      ? "bg-surface-elevated/80 border-white/[0.10]"
                      : "bg-transparent border-transparent"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isHovered
                        ? "border-white/[0.08]"
                        : "border-white/[0.04]"
                    }`}
                    style={{
                      backgroundColor: isHovered ? `${skill.color}12` : "rgba(255,255,255,0.02)",
                    }}
                  >
                    <TechIcon
                      className="w-4 h-4 transition-colors duration-300"
                      style={{ color: isHovered ? skill.color : "#737373" }}
                    />
                  </div>

                  {/* Name */}
                  <span
                    className={`text-[13px] font-sans font-medium transition-colors duration-300 ${
                      isHovered ? "text-white" : "text-text-muted"
                    }`}
                  >
                    {skill.name}
                  </span>

                  {/* Accent dot on hover */}
                  {isHovered && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: skill.color, boxShadow: `0 0 8px ${skill.color}60` }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
