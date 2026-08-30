"use client";

import React from "react";
import { BookOpen, Cpu, School } from "lucide-react";
import Image from "next/image";
import { PROFILE } from "@/data/profile";

const iconMap = {
  Cpu,
  BookOpen,
  School,
};

export default function EducationSection() {
  return (
    <section id="education" className="max-w-4xl mx-auto px-6">
      <h2 className="text-2xl font-bold tracking-tight text-ds-text1 mb-10">Education</h2>
      
      <div className="space-y-6">
        {PROFILE.education.map((edu, idx) => {
          const IconComponent = iconMap[edu.icon as keyof typeof iconMap] || BookOpen;
          return (
            <div key={edu.id} className="relative pl-8 md:pl-0">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-[8.5rem] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-ds-border to-transparent" />
              
              {/* Timeline Node / Icon */}
              <div className="absolute left-0 md:left-[8.5rem] top-8 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] z-10 flex items-center justify-center overflow-hidden">
                {edu.id === 'iit-delhi' ? (
                  <Image src="/images/iit-delhi-logo.jpeg" alt="IIT Delhi Logo" fill className="object-contain p-1.5" />
                ) : edu.id === 'bce-bhagalpur' ? (
                  <Image src="/images/bce-logo.webp" alt="BCE Logo" fill className="object-contain p-1.5" />
                ) : edu.id === 'spm-college' ? (
                  <Image src="/images/spm.jpeg" alt="SPM College Logo" fill className="object-contain p-1.5" />
                ) : (
                  <div className="w-full h-full bg-cyan-900 flex items-center justify-center text-cyan-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                )}
              </div>

              <div className="md:ml-[12rem] glass-panel rounded-2xl p-6 sm:p-8 hover:border-cyan-500/40 transition-all duration-300 group">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-ds-text1 group-hover:text-cyan-50 transition-colors">{edu.degree}</h3>
                    <p className="text-sm font-medium text-ds-text2 mt-1">{edu.institution}</p>
                  </div>
                  <div className="flex flex-col md:items-end md:absolute md:left-0 md:top-8 md:w-28 md:text-right">
                    <span className="text-xs font-semibold px-2.5 py-1 bg-ds-surface/80 text-cyan-400 rounded-md border border-cyan-500/20 mb-1 w-max md:w-auto shadow-sm">
                      {edu.period}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-ds-text2 mt-1 hidden md:block">
                      {edu.location}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-5 border-t border-ds-border/50">
                  <ul className="space-y-3">
                    {edu.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="text-sm text-ds-text2 flex items-start leading-relaxed">
                        <span className="text-cyan-500 mr-3 mt-1.5 text-[10px]">♦</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
