"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { GitHub, LinkedIn } from "@/components/icons/BrandIcons";

export default function ContactSection({ contactRef }) {
  return (
    <section ref={contactRef} className="relative z-10 py-section bg-background border-t border-border-default overflow-hidden select-none">
      <div className="master-container relative z-10">
        
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-[10px] font-mono tracking-[0.15em] text-text-muted uppercase mb-20"
        >
          <span>06 / Connect</span>
          <span className="w-12 h-px bg-zinc-800" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Heading + Description */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <h2 className="text-[44px] sm:text-[60px] lg:text-[76px] font-black leading-[0.85] tracking-tighter text-white font-display uppercase">
              LET'S <br />
              WORK <br />
              <span className="text-primary-accent italic font-light text-glow-blue">TOGETHER.</span>
            </h2>
            <p className="text-text-muted text-[15px] leading-relaxed max-w-md font-light font-sans">
              I'm currently seeking entry-level software development opportunities and would be happy to connect regarding internships, full-time roles, collaborations, or technical discussions. Feel free to reach out directly through any of the channels.
            </p>

            {/* Social Icons row */}
            <div className="flex gap-3 pt-4">
              <SocialIcon Icon={LinkedIn} label="LinkedIn" href="https://linkedin.com/in/nabeel-n-dev" />
              <SocialIcon Icon={GitHub} label="GitHub" href="https://github.com/Nabeel-N-tech" />
            </div>
          </div>

          {/* Right Side: Clean Contact Cards */}
          <div className="lg:col-span-6 w-full space-y-4">
            <ContactCard 
              Icon={Mail} 
              label="Email Me" 
              value="nabeeln1230@gmail.com" 
              href="mailto:nabeeln1230@gmail.com" 
            />
            <ContactCard 
              Icon={Phone} 
              label="Call Me" 
              value="+91 9567796191" 
              href="tel:+919567796191" 
            />
            <ContactCard 
              Icon={MapPin} 
              label="Location" 
              value="Kollam, Kerala, India" 
              isStatic={true}
            />
          </div>

        </div>
      </div>
    </section>
  );
}

function ContactCard({ Icon, label, value, href, isStatic = false }) {
  const CardWrapper = isStatic ? "div" : "a";
  const linkProps = isStatic ? {} : { href, target: "_blank", rel: "noopener noreferrer" };

  return (
    <CardWrapper
      {...linkProps}
      className={`group relative flex items-center justify-between p-6 rounded-2xl bg-surface/50 border border-white/[0.04] transition-all duration-300 ${
        isStatic 
          ? "cursor-default" 
          : "hover:border-primary-accent/30 hover:bg-surface-elevated/70 hover:shadow-[0_0_24px_rgba(59,130,246,0.06)] cursor-pointer"
      }`}
    >
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-surface border border-white/[0.06] group-hover:border-primary-accent/20 group-hover:bg-surface-elevated transition-colors">
          <Icon className="w-5 h-5 text-text-dim group-hover:text-primary-accent transition-colors" />
        </div>
        <div className="text-left">
          <p className="text-[10px] font-mono uppercase tracking-wider text-text-dim group-hover:text-primary-accent/80 transition-colors">
            {label}
          </p>
          <p className="text-sm font-sans text-white font-medium mt-1">
            {value}
          </p>
        </div>
      </div>
      {!isStatic && (
        <ArrowUpRight className="w-5 h-5 text-text-dim opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white transition-all duration-300" />
      )}
    </CardWrapper>
  );
}

function SocialIcon({ Icon, href, label }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-11 h-11 flex items-center justify-center rounded-xl bg-surface border border-white/[0.06] hover:border-primary-accent/30 hover:bg-surface-elevated cursor-pointer transition-all hover:shadow-[0_0_12px_rgba(59,130,246,0.08)] group"
    >
      <Icon className="w-4 h-4 text-text-dim group-hover:text-white transition-colors" />
    </a>
  );
}