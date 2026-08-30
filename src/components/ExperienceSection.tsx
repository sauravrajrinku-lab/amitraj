"use client";

import React from "react";
import { PROFILE } from "@/data/profile";

export default function ExperienceSection() {
  return (
    <section id="experience" className="max-w-4xl mx-auto px-6">
      <h2 className="text-2xl font-bold tracking-tight text-ds-text1 mb-10">Experience</h2>

      <div className="space-y-6">
        {PROFILE.experience.map((exp) => (
          <div key={exp.id} className="card-minimal p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-ds-text1">{exp.role}</h3>
                <p className="text-sm font-medium text-ds-text2 mt-1">{exp.company}</p>
              </div>
              <div className="flex flex-col md:items-end">
                <span className="text-xs font-medium px-2 py-1 bg-ds-bg text-ds-accent2 rounded border border-ds-border mb-1 w-max md:w-auto">
                  {exp.period}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-ds-text2">
                  {exp.location} • {exp.type}
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {exp.description.map((item, idx) => (
                <li key={idx} className="text-sm text-ds-text2 flex items-start leading-relaxed">
                  <span className="text-ds-accent mr-2 mt-1">▪</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-ds-border">
              {exp.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-[10px] font-medium tracking-wide uppercase text-ds-accent2 bg-ds-bg border border-ds-border rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
