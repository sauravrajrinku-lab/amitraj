"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, X } from "lucide-react";
import Image from "next/image";
import { PROFILE } from "@/data/profile";

export default function HeroSection() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const handleDownloadResume = () => {
    const resumeText = `Amit Raj
M.Tech Electric Mobility | IIT Delhi '28
GATE 2026 Qualified (EE & IN)

Email: ${PROFILE.email}
LinkedIn: ${PROFILE.linkedin}
Location: ${PROFILE.location}

Summary:
${PROFILE.hero.summary}

Education:
- M.Tech Electric Mobility, IIT Delhi (2026-2028)
- B.Tech Electrical Engineering, BCE Bhagalpur (2022-2026)

Experience:
- Student Intern, SBPDCL (Dec 2025 - Jan 2026)`;

    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Amit_Raj_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden px-6"
      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.15) 0%, #0D0D0D 70%)" }}
    >
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">

        {/* Profile Avatar with Glowing Halo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-6 group cursor-pointer"
        >
          <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl bg-ds-surface">
            <Image
              src={PROFILE.avatar}
              alt={PROFILE.name}
              fill
              sizes="(max-width: 640px) 112px, 144px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#141820]/95 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-[11px] font-semibold px-3 py-0.5 rounded-full flex items-center gap-1.5 shadow-lg whitespace-nowrap">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>IIT Delhi &apos;28</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 skill-badge text-xs font-medium mb-6 tracking-tight"
        >
          <span>{PROFILE.hero.badge}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-ds-text1 mb-6"
        >
          {PROFILE.hero.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg sm:text-xl text-ds-text2 max-w-2xl font-medium tracking-tight mb-4"
        >
          {PROFILE.hero.subtitle}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm sm:text-base text-ds-text2/80 max-w-xl leading-relaxed mb-10"
        >
          {PROFILE.hero.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="#experience"
            className="w-full sm:w-auto px-6 py-3 btn-primary flex items-center justify-center text-sm"
          >
            View Work <ArrowRight className="w-4 h-4 ml-2" />
          </a>
          <button
            onClick={() => setResumeModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3 btn-secondary flex items-center justify-center text-sm"
          >
            <Download className="w-4 h-4 mr-2" /> Resume
          </button>
        </motion.div>
      </div>

      {/* Resume Modal */}
      {resumeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ds-bg/80 backdrop-blur-sm">
          <div className="bg-ds-surface rounded-xl max-w-md w-full border border-ds-border shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="flex justify-between items-center p-4 border-b border-ds-border">
              <h3 className="font-semibold text-ds-text1 text-sm tracking-tight">Resume Available</h3>
              <button 
                onClick={() => setResumeModalOpen(false)}
                className="text-ds-text2 hover:text-ds-text1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 text-sm text-ds-text2">
              <p className="mb-4">
                A simple text-based version of my resume is available for download.
              </p>
              <button
                onClick={handleDownloadResume}
                className="w-full py-3 btn-primary text-sm flex items-center justify-center"
              >
                <Download className="w-4 h-4 mr-2" /> Download TXT
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
