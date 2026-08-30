"use client";

import React from "react";
import { Terminal, Zap } from "lucide-react";
import { PROFILE } from "@/data/profile";

const iconMap = {
  Terminal,
  Zap,
};

export default function SkillsSection() {
  return (
    <section id="skills" className="max-w-4xl mx-auto px-6">
      <h2 className="text-2xl font-bold tracking-tight text-ds-text1 mb-10">Skills & Technical Arsenal</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROFILE.skillGroups.map((group, idx) => {
          const IconComponent = iconMap[group.icon as keyof typeof iconMap] || Terminal;
          return (
            <div key={idx} className="glass-panel rounded-2xl p-8 flex flex-col group hover:border-cyan-500/50 transition-all duration-500">
              <div className="flex items-center space-x-4 mb-5">
                <div className="w-10 h-10 rounded-lg border border-ds-border/50 bg-ds-bg/50 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/10 transition-all duration-300">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-ds-text1 group-hover:text-cyan-50">{group.category}</h3>
              </div>
              
              <p className="text-sm text-ds-text2 mb-6 leading-relaxed">
                {group.description}
              </p>

              <div className="flex flex-wrap gap-2.5 mt-auto">
                {group.skills.map((skill, sIdx) => (
                  <div 
                    key={sIdx} 
                    className="flex items-center px-3 py-1.5 bg-ds-surface/60 border border-ds-border hover:border-cyan-500/30 rounded-md transition-colors"
                  >
                    <span className="text-sm font-medium text-ds-text1/90">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
