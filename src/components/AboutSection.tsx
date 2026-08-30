"use client";

import React from "react";
import { MapPin, Award, GraduationCap, Zap } from "lucide-react";
import Image from "next/image";
import { PROFILE } from "@/data/profile";

const iconMap = {
  MapPin,
  Award,
  GraduationCap,
  Zap,
};

export default function AboutSection() {
  return (
    <section id="about" className="max-w-4xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="md:col-span-2 card-minimal p-8 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-ds-text1 tracking-tight mb-4">About</h2>
          <p className="text-sm text-ds-text2 leading-relaxed">
            {PROFILE.about.bio}
          </p>
        </div>

        <div className="card-minimal p-8 flex flex-col justify-between">
          <h2 className="text-xl font-semibold text-ds-text1 tracking-tight mb-4">By the Numbers</h2>
          <div className="space-y-4">
            {PROFILE.about.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-2xl font-bold tracking-tighter text-ds-accent">{stat.number}</span>
                <span className="text-xs font-medium text-ds-text2 tracking-wide uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-3 card-minimal p-8">
          <h2 className="text-xl font-semibold text-ds-text1 tracking-tight mb-6">Quick Facts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PROFILE.about.chips.map((chip, i) => {
              const IconComponent = iconMap[chip.icon as keyof typeof iconMap];
              return (
                <div key={i} className="flex flex-col space-y-2 p-4 bg-ds-bg rounded-md border border-ds-border">
                  <div className="text-ds-accent2">
                    {chip.label === "Current Institution" ? (
                      <div className="w-5 h-5 relative rounded-sm overflow-hidden bg-white">
                        <Image src="/images/iit-delhi-logo.jpeg" alt="IIT Delhi" fill className="object-contain" />
                      </div>
                    ) : (
                      IconComponent && <IconComponent className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold text-ds-accent2 uppercase tracking-wider">{chip.label}</div>
                    <div className="text-sm font-medium text-ds-text1">{chip.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
