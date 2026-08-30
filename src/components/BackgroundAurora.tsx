"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BackgroundAurora() {
  return (
    <div className="fixed inset-0 overflow-hidden -z-50 bg-[#0D0D0D] pointer-events-none">
      {/* Orb 1: Cyan/Blue */}
      <motion.div
        animate={{
          x: ["0vw", "20vw", "-10vw", "0vw"],
          y: ["0vh", "10vh", "30vh", "0vh"],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[10%] left-[20%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[120px] opacity-70"
      />

      {/* Orb 2: Deep Blue/Indigo */}
      <motion.div
        animate={{
          x: ["0vw", "-25vw", "15vw", "0vw"],
          y: ["0vh", "40vh", "-10vh", "0vh"],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] right-[10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] bg-blue-600/10 rounded-full mix-blend-screen filter blur-[100px] opacity-60"
      />

      {/* Orb 3: Emerald/Teal */}
      <motion.div
        animate={{
          x: ["0vw", "10vw", "-20vw", "0vw"],
          y: ["0vh", "-30vh", "20vh", "0vh"],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] left-[40%] w-[40vw] h-[40vw] max-w-[450px] max-h-[450px] bg-emerald-500/5 rounded-full mix-blend-screen filter blur-[90px] opacity-50"
      />
    </div>
  );
}
