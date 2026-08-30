import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-ds-bg text-ds-text1">
      <Navbar />

      <div className="relative z-10 space-y-24 sm:space-y-32 pb-24 sm:pb-32">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <SkillsSection />
        <AchievementsSection />
        <ContactSection />
      </div>

      <Footer />
    </main>
  );
}

// Deep space theme trigger

// Trigger HMR for logo update

// Trigger HMR for BCE logo update

// Trigger HMR for SPM College logo update

// Trigger HMR for location update

// Trigger HMR for map embed
