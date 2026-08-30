"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, FileText } from "lucide-react";
import Image from "next/image";
import { PROFILE } from "@/data/profile";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden px-6"
    >
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(37,99,235,0.15)_0%,rgba(13,13,13,1)_70%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-ds-accent/20 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">

        {/* Profile Avatar with Glowing Halo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
          className="relative mb-8 group cursor-pointer"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-500 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl bg-ds-surface z-10">
            <Image
              src={PROFILE.avatar}
              alt={PROFILE.name}
              fill
              sizes="(max-width: 640px) 128px, 160px"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
              priority
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-ds-surface/90 backdrop-blur-xl border border-cyan-500/40 text-cyan-300 text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xl whitespace-nowrap z-20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="tracking-wide">IIT Delhi &apos;28</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-ds-accent/10 border border-ds-accent/20 text-ds-accent2 text-xs font-medium mb-6 tracking-wide shadow-[0_0_15px_rgba(37,99,235,0.15)]"
        >
          <span className="animate-pulse">⚡</span>
          <span>{PROFILE.hero.badge.replace('⚡ ', '')}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-ds-text1 to-ds-text2 mb-6"
        >
          {PROFILE.hero.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-2xl text-ds-text2 max-w-2xl font-medium tracking-tight mb-6"
        >
          {PROFILE.hero.subtitle}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm sm:text-base text-ds-text2/70 max-w-xl leading-relaxed mb-10"
        >
          {PROFILE.hero.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="#experience"
            className="w-full sm:w-auto px-8 py-4 bg-ds-accent hover:bg-blue-600 text-white rounded-xl flex items-center justify-center text-sm font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] group"
          >
            Explore My Work 
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/Amit_Raj_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-ds-surface/50 hover:bg-ds-surface border border-ds-border hover:border-ds-accent/50 text-ds-text1 rounded-xl flex items-center justify-center text-sm font-semibold transition-all group backdrop-blur-sm"
          >
            <FileText className="w-4 h-4 mr-2 text-ds-accent2 group-hover:scale-110 transition-transform" /> 
            View Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
