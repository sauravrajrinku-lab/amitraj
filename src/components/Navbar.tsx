"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { PROFILE } from "@/data/profile";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "GATE", href: "#achievements" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0D0D0D]/85 backdrop-blur-xl border-b border-ds-border shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#hero" className="flex items-center">
          <span className="font-semibold text-ds-text1 tracking-tighter text-lg">
            {PROFILE.name.split(" ")[0]}.
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-ds-text2 hover:text-ds-text1 hover:underline hover:decoration-ds-accent hover:underline-offset-4 transition-all tracking-tight"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-4 px-5 py-2 text-sm font-medium btn-primary tracking-tight"
          >
            Contact
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-ds-text1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-ds-bg border-b border-ds-border shadow-lg py-4 px-6 flex flex-col space-y-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-ds-text2 hover:text-ds-text1"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm font-medium btn-primary px-4 py-2 inline-block w-max"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
