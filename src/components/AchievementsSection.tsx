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
            className={`card-minimal p-6 flex flex-col justify-between ${ach.highlight ? 'border-ds-accent' : 'border-ds-border'}`}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-sm font-bold tracking-tight text-ds-text1 uppercase">{ach.exam}</h3>
                  <p className="text-[10px] font-medium text-ds-text2 mt-1 tracking-widest uppercase">{ach.discipline}</p>
                </div>
                <div className="px-2 py-1 bg-ds-bg border border-ds-border rounded text-[10px] font-medium text-ds-text1">
                  {ach.year}
                </div>
              </div>
              
              <div className="my-6 flex items-baseline">
                <span className="text-4xl font-bold tracking-tighter text-ds-text1">{ach.score}</span>
                {ach.maxScore !== "1000" && ach.score !== "Qualified" && (
                  <span className="text-sm text-ds-text2 ml-1">/ {ach.maxScore}</span>
                )}
                {ach.score === "530" && (
                  <span className="text-sm text-ds-text2 ml-1">/ 1000</span>
                )}
              </div>
            </div>

            <p className="text-xs text-ds-text2 leading-relaxed">
              {ach.details}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
