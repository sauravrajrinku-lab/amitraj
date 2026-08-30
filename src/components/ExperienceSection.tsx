"use client";

import React from "react";
import { PROFILE } from "@/data/profile";

export default function ExperienceSection() {
  return (
    <section id="experience" className="max-w-4xl mx-auto px-6">
      <h2 className="text-2xl font-bold tracking-tight text-ds-text1 mb-10">Experience</h2>

      <div className="space-y-6">
        {PROFILE.experience.map((exp, idx) => (
          <div key={exp.id} className="relative pl-8 md:pl-0">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-[8.5rem] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-ds-border to-transparent" />
            
            {/* Timeline Node */}
            <div className="absolute left-0 md:left-[8.5rem] top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-ds-bg border-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] z-10" />

            <div className="md:ml-[11rem] glass-panel rounded-2xl p-6 sm:p-8 hover:border-cyan-500/40 transition-all duration-300 group">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-ds-text1 group-hover:text-cyan-50 transition-colors">{exp.role}</h3>
                  <p className="text-sm font-medium text-ds-text2 mt-1">{exp.company}</p>
                </div>
                <div className="flex flex-col md:items-end md:absolute md:left-0 md:top-8 md:w-28 md:text-right">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-ds-surface/80 text-cyan-400 rounded-md border border-cyan-500/20 mb-1 w-max md:w-auto shadow-sm">
                    {exp.period}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-ds-text2 mt-1 hidden md:block">
                    {exp.duration}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {exp.description.map((item, idx) => (
                  <li key={idx} className="text-sm text-ds-text2 flex items-start leading-relaxed">
                    <span className="text-cyan-500 mr-3 mt-1.5 text-[10px]">♦</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-5 border-t border-ds-border/50">
                {exp.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase text-cyan-100 bg-cyan-950/30 border border-cyan-800/50 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
