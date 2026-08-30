"use client";

import React, { useEffect, useRef } from "react";

export default function TechGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Configuration
    const connectionDistance = 130;
    const particleCount = Math.floor((width * height) / 10000);
    const maxSparks = 15; // Limit sparks for performance and subtleness

    const particles: Particle[] = [];
    const sparks: Spark[] = [];
    const mouse = { x: width / 2, y: height / 2, radius: 180 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4; // Very slow and smooth
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls smoothly
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Base opacity 15-20% for nodes
        ctx.fillStyle = "rgba(6, 182, 212, 0.2)"; 
        ctx.fill();
      }
    }

    class Spark {
      start: Particle;
      end: Particle;
      progress: number;
      speed: number;

      constructor(start: Particle, end: Particle) {
        this.start = start;
        this.end = end;
        this.progress = 0;
        this.speed = Math.random() * 0.01 + 0.005; // Spark travel speed
      }

      update() {
        this.progress += this.speed;
        return this.progress >= 1; // Returns true when spark reaches destination
      }

      draw() {
        if (!ctx) return;
        // Calculate current position along the line
        const x = this.start.x + (this.end.x - this.start.x) * this.progress;
        const y = this.start.y + (this.end.y - this.start.y) * this.progress;

        // Draw spark glow (cyan)
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6, 182, 212, 0.6)";
        ctx.fill();

        // Draw spark core (white/bright cyan)
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles & lines
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            // Draw connecting line
            ctx.beginPath();
            const opacity = 0.15 - (distance / connectionDistance) * 0.15;
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();

            // Randomly spawn a spark along this connection
            if (sparks.length < maxSparks && Math.random() < 0.0005) {
              // 50% chance to go from i->j or j->i
              if (Math.random() > 0.5) {
                sparks.push(new Spark(particles[i], particles[j]));
              } else {
                sparks.push(new Spark(particles[j], particles[i]));
              }
            }
          }
        }

        // Connection to mouse (creates an interactive feel without breaking the low-opacity requirement)
        const dxMouse = particles[i].x - mouse.x;
        const dyMouse = particles[i].y - mouse.y;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distanceMouse < mouse.radius) {
          ctx.beginPath();
          const opacity = 0.2 - (distanceMouse / mouse.radius) * 0.2;
          ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`; // Electric blue interaction
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Update and draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        const isFinished = spark.update();
        if (isFinished) {
          sparks.splice(i, 1); // Remove spark when it reaches end
        } else {
          spark.draw();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-50 bg-[#060B19]" 
      // Deep navy/black background (#060B19) as requested
    />
  );
}
