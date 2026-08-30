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
            <div key={idx} className="card-minimal p-8 flex flex-col">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded border border-ds-border bg-ds-bg flex items-center justify-center text-ds-accent2">
                  <IconComponent className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-ds-text1">{group.category}</h3>
              </div>
              
              <p className="text-xs text-ds-text2 mb-6">
                {group.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {group.skills.map((skill, sIdx) => (
                  <div 
                    key={sIdx} 
                    className="flex items-center px-3 py-1.5 skill-badge rounded-md"
                  >
                    <span className="text-sm font-medium">{skill.name}</span>
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
