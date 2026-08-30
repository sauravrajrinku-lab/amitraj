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
            <div key={edu.id} className="card-minimal p-6 flex flex-col md:flex-row gap-6 relative">
              
              <div className="flex-shrink-0 pt-1 hidden md:block">
                {edu.id === 'iit-delhi' ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-ds-accent bg-white flex items-center justify-center relative shadow-[0_0_8px_rgba(37,99,235,0.6)]">
                    <Image
                      src="/images/iit-delhi-logo.jpeg"
                      alt="IIT Delhi Logo"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                ) : edu.id === 'bce-bhagalpur' ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-ds-accent bg-white flex items-center justify-center relative shadow-[0_0_8px_rgba(37,99,235,0.6)]">
                    <Image
                      src="/images/bce-logo.webp"
                      alt="BCE Logo"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                ) : edu.id === 'spm-college' ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-ds-accent bg-white flex items-center justify-center relative shadow-[0_0_8px_rgba(37,99,235,0.6)]">
                    <Image
                      src="/images/spm.jpeg"
                      alt="SPM College Logo"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                ) : (
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-ds-accent"
                    style={{ boxShadow: "0 0 8px rgba(37,99,235,0.6)" }}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-ds-text1">{edu.degree}</h3>
                    <p className="text-sm font-medium text-ds-text2 mt-1">{edu.institution}</p>
                  </div>
                  <div className="flex flex-col md:items-end">
                    <span className="text-xs font-medium px-2 py-1 bg-ds-bg text-ds-accent2 rounded border border-ds-border mb-1 w-max md:w-auto">
                      {edu.period}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-ds-text2">
                      {edu.location}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-ds-border">
                  <ul className="space-y-2">
                    {edu.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="text-sm text-ds-text2 flex items-start">
                        <span className="text-ds-accent mr-2 mt-0.5">▪</span>
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
