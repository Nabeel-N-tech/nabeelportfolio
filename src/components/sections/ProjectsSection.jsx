"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowUpRight, Lock, AlertTriangle } from "lucide-react";
import { GitHub } from "@/components/icons/BrandIcons";
import Image from "next/image";

const PROJECTS = [
  {
    id: "immigration-hub",
    title: "Immigration Hub NZ",
    type: "Production Website · Real Client Project",
    problem: "A licensed New Zealand immigration consultancy needed an authoritative, performant, and search-optimized web presence to replace offline lead channels and capture highly qualified visa/student inquiries.",
    solution: "Built a production React client application using semantic HTML5, highly optimized responsive layouts with Tailwind CSS, custom metadata injections for SEO indexing, and a structured multi-field inquiry intake system.",
    outcome: "Achieved 100% organic indexing on Google for primary target terms, capturing active client leads daily with sub-second page load times.",
    verification: "Verified by live production deployment at www.immigrationhub.nz. Tested with real clients.",
    responsibilities: [
      "Frontend system architecture & fluid responsive layouts",
      "SEO engineering, meta data injection & search console indexing",
      "Structured lead-capture inquiry form validation",
      "Production release, Vercel deployments, & domain DNS mapping"
    ],
    tech: ["React", "JavaScript", "Tailwind CSS", "Vercel", "SEO"],
    links: {
      live: "https://www.immigrationhub.nz",
      privateRepo: true
    },
    image: "/images/immigration_hub_nz_mockup.webp",
    accentColor: "#06b6d4",
  },
  {
    id: "doctor-booking",
    title: "Doctor Appointment Booking System",
    type: "Full-Stack Project",
    problem: "Healthcare clinics experience scheduling inefficiencies, double-bookings, and patient record leaks when using manual or legacy appointment lists.",
    solution: "Engineered a secure Django REST Framework API with PostgreSQL databases, paired with a React frontend using state-driven calendar grids and JSON Web Token (JWT) request authorization.",
    outcome: "Eliminated appointment slot collisions programmatically through database-level transaction concurrency controls and secured patient data access routes.",
    verification: "Verified by comprehensive automated API test suites and public codebase on GitHub.",
    responsibilities: [
      "Relational database design & PostgreSQL transaction locking",
      "RESTful API endpoint design & request validation in Django REST",
      "JWT security authentication middleware & frontend states",
      "Responsive calendar slot selection views in React"
    ],
    tech: ["Python", "Django REST", "React", "PostgreSQL", "JWT"],
    links: {
      github: "https://github.com/Nabeel-N-tech/Doctor-appointment-system",
      maintenance: true
    },
    image: "/images/doctor_booking_mockup.webp",
    accentColor: "#10b981",
  },
  {
    id: "ecommerce-app",
    title: "E-Commerce Web Application",
    type: "Frontend Project",
    problem: "Modern shopping cart interactions often suffer from high latency, lack of persistence across page reloads, and poor layout fluidity on mobile viewports.",
    solution: "Built a React catalog single-page application using React Context API for global state management and localStorage sync for persistent shopping session data.",
    outcome: "Achieved instantaneous (0ms UI latency) cart additions with persistent caching, tested across high-velocity product filters.",
    verification: "Verified by interactive demo deployment on Vercel and public code repository on GitHub.",
    responsibilities: [
      "Cart state synchronization via React Context & React Hooks",
      "Session caching logic via browser LocalStorage API",
      "Modular UI product cards & grid layouts via Tailwind CSS",
      "Micro-interaction indicators for add-to-cart operations"
    ],
    tech: ["React", "JavaScript", "Tailwind CSS", "Context API"],
    links: {
      github: "https://github.com/Nabeel-N-tech/E-Commerce-Application"
    },
    image: "/images/ecommerce_app_mockup.webp",
    accentColor: "#8B5CF6",
  }
];

export default function ProjectsSection({ projectsRef }) {
  return (
    <section
      ref={projectsRef}
      className="relative z-10 py-section border-t border-border-default overflow-hidden bg-background rounded-[60px] select-none shadow-[0_-30px_60px_rgba(0,0,0,0.8)]"
    >

      <div className="master-container">
        
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-[10px] font-mono tracking-[0.15em] text-text-muted uppercase mb-20"
        >
          <span>03 / Works</span>
          <span className="w-12 h-px bg-zinc-800" />
        </motion.div>

        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start text-left mb-24 max-w-[500px]"
        >
          <h2 className="text-section-heading font-black leading-[0.95] tracking-[-0.03em] font-display text-white uppercase">
            Featured <br />
            <span className="text-blue-400/70 italic font-light text-glow-blue">Projects.</span>
          </h2>
          <p className="text-text-muted text-[14px] md:text-[15px] leading-relaxed font-sans font-normal mt-6">
            Explore verified applications built with focus on system architecture, database optimization, and performance.
          </p>
        </motion.div>

        {/* Projects Cards Arena */}
        <div className="space-y-16 lg:space-y-24">
          {PROJECTS.map((proj, idx) => (
            <motion.div 
              key={proj.id}
              whileHover={{ y: -4 }}
              className="sticky top-28 group relative rounded-[32px] bg-surface/80 backdrop-blur-md border border-white/[0.08] hover:border-white/[0.15] transition-all duration-500 overflow-hidden w-full p-8 md:p-12 lg:p-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              {/* Subtle Accent Glow Ring */}
              <div 
                className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle_at_20%_20%, ${proj.accentColor}08 0%, transparent 60%)` }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12 items-start">
                
                {/* Left 40%: Info Details (lg:col-span-4) */}
                <div className="lg:col-span-4 flex flex-col justify-between text-left relative z-10">
                  {/* Background Order Index Watermark */}
                  <div className="absolute -top-12 -left-12 text-[160px] font-black text-white/[0.012] font-mono pointer-events-none select-none z-0">
                    {`0${idx + 1}`}
                  </div>

                  <div className="relative z-10 space-y-6">
                    <div>
                      <span className="text-[9px] font-mono tracking-[0.15em] text-primary-accent mb-2 uppercase block">
                        {proj.type}
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight font-display leading-tight">
                        {proj.title}
                      </h3>
                    </div>

                    {/* Problem, Solution, Outcome, Verification */}
                    <div className="space-y-3.5 text-[11px] leading-relaxed text-text-muted">
                      <p>
                        <strong className="text-zinc-200 uppercase tracking-[0.15em] text-[8px] font-mono block mb-0.5">Problem:</strong> 
                        {proj.problem}
                      </p>
                      <p>
                        <strong className="text-zinc-200 uppercase tracking-[0.15em] text-[8px] font-mono block mb-0.5">Solution:</strong> 
                        {proj.solution}
                      </p>
                      <p>
                        <strong className="text-zinc-200 uppercase tracking-[0.15em] text-[8px] font-mono block mb-0.5">Outcome:</strong> 
                        {proj.outcome}
                      </p>
                      <p>
                        <strong className="text-zinc-200 uppercase tracking-[0.15em] text-[8px] font-mono block mb-0.5">Verification:</strong> 
                        <span className="text-emerald-400 font-medium">{proj.verification}</span>
                      </p>
                    </div>

                    {/* Key Responsibilities */}
                    <div className="space-y-2.5 pt-2">
                      <strong className="text-zinc-200 uppercase tracking-wider text-[8px] font-mono block">Responsibilities:</strong>
                      <ul className="text-text-muted text-[10.5px] space-y-1.5 font-sans list-none">
                        {proj.responsibilities.map((resp, ridx) => (
                          <li key={ridx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-primary-accent shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="relative z-10 pt-6">
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {proj.tech.map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded bg-surface border border-white/[0.06] text-[9px] font-mono text-zinc-300">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons — PROMINENT */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-3">
                        {proj.links.live && (
                          <a
                            href={proj.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-[10px] font-mono font-bold uppercase tracking-[0.15em] transition-all cursor-pointer shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] min-h-[44px]"
                          >
                            <span>Live Website</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}

                        {proj.links.github && (
                          <a
                            href={proj.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-transparent border border-white/[0.12] hover:border-white/[0.25] text-white text-[10px] font-mono font-bold uppercase tracking-[0.15em] transition-all cursor-pointer hover:bg-white/[0.04] min-h-[44px]"
                          >
                            <span>View Code</span>
                            <GitHub className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      {/* Verification notices */}
                      {proj.links.privateRepo && (
                        <div className="flex items-center gap-2 text-[9px] font-mono text-text-dim">
                          <Lock className="w-3 h-3 text-text-dim" />
                          <span>Private Client Repository · Code Not Public</span>
                        </div>
                      )}

                      {proj.links.maintenance && (
                        <div className="flex items-center gap-2 text-[9px] font-mono text-text-dim">
                          <AlertTriangle className="w-3 h-3 text-text-dim" />
                          <span>Demo Currently Under Maintenance</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right 60%: Visual Showcase — Browser Frame (lg:col-span-6) */}
                <div className="lg:col-span-6 flex items-start justify-center w-full relative z-10">
                  <div className="w-full rounded-2xl border border-white/[0.08] bg-[#0d0d0d] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.6)] group/img">
                    {/* Browser chrome bar */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#0f0f0f]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      </div>
                      <div className="flex-1 mx-3">
                        <div className="bg-white/[0.04] rounded-md px-3 py-1 text-[9px] font-mono text-text-dim text-center truncate max-w-[240px] mx-auto">
                          {proj.links.live ? proj.links.live.replace("https://", "") : proj.links.github ? "github.com/..." : proj.title.toLowerCase().replace(/\s+/g, "-")}
                        </div>
                      </div>
                    </div>
                    {/* Image container — preserves aspect ratio */}
                    <div className="relative w-full overflow-hidden bg-[#0a0a0a]">
                      <Image 
                        src={proj.image} 
                        alt={`${proj.title} — Application Screenshot`}
                        width={1200}
                        height={800}
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="w-full h-auto object-contain transition-transform duration-[1.5s] ease-out group-hover/img:scale-[1.03]"
                        style={{ display: "block" }}
                      />
                      {/* Subtle gradient overlay at bottom edge */}
                      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0d0d0d]/50 to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}