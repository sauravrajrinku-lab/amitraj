"use client";

import React from "react";
import { PROFILE } from "@/data/profile";

export default function AchievementsSection() {
  return (
    <section id="achievements" className="max-w-4xl mx-auto px-6">
      <h2 className="text-2xl font-bold tracking-tight text-ds-text1 mb-10">Standardized Test Scores</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROFILE.achievements.map((ach) => (
          <div 
            key={ach.id} 
            className={`glass-panel rounded-2xl p-8 flex flex-col justify-between group transition-all duration-500 hover:-translate-y-1 ${ach.highlight ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.15)]' : 'border-ds-border hover:border-cyan-500/30'}`}
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-sm font-bold tracking-tight text-cyan-400 uppercase">{ach.exam}</h3>
                  <p className="text-[10px] font-semibold text-ds-text2 mt-1 tracking-widest uppercase">{ach.discipline}</p>
                </div>
                <div className="px-2.5 py-1 bg-ds-surface/60 border border-ds-border rounded-md text-[10px] font-semibold text-ds-text1 shadow-sm">
                  {ach.year}
                </div>
              </div>
              
              <div className="my-8 flex items-baseline">
                <span className="text-5xl font-bold tracking-tighter text-ds-text1 group-hover:text-cyan-50 transition-colors">{ach.score}</span>
                {ach.maxScore !== "1000" && ach.score !== "Qualified" && (
                  <span className="text-sm font-medium text-ds-text2 ml-2">/ {ach.maxScore}</span>
                )}
                {ach.score === "530" && (
                  <span className="text-sm font-medium text-ds-text2 ml-2">/ 1000</span>
                )}
              </div>
            </div>

            <p className="text-sm text-ds-text2 leading-relaxed">
              {ach.details}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
