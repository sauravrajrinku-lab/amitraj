"use client";

import React from "react";
import { PROFILE } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-ds-border py-12 px-6" style={{ backgroundColor: "#0D0D0D" }}>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm font-medium tracking-tighter" style={{ color: "#475569" }}>
          Amit Raj.
        </div>
        
        <div className="text-xs font-mono uppercase tracking-widest" style={{ color: "#334155" }}>
          © {new Date().getFullYear()} Amit Raj. All Rights Reserved.
        </div>

        <div className="flex items-center space-x-4">
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:text-ds-text1 transition-colors"
            style={{ color: "#475569" }}
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="text-xs hover:text-ds-text1 transition-colors"
            style={{ color: "#475569" }}
          >
            Email
          </a>
          <a
            href="/admin"
            className="text-xs hover:text-cyan-400 transition-colors opacity-60 hover:opacity-100"
            style={{ color: "#475569" }}
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
