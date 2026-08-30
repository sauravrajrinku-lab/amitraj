"use client";

import React, { useState } from "react";
import { Mail, Linkedin, MapPin, Send, Loader2 } from "lucide-react";
import { PROFILE } from "@/data/profile";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setFeedbackMsg("");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus("success");
        setFeedbackMsg(result.message || "Thank you! Your message has been sent.");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setStatus("idle");
          setFeedbackMsg("");
        }, 5000);
      } else {
        setStatus("error");
        setFeedbackMsg(result.error || "Failed to send message. Please try again.");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setFeedbackMsg("Network error. Please try again later.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="max-w-4xl mx-auto px-6">
      <h2 className="text-2xl font-bold tracking-tight text-ds-text1 mb-10">Get in Touch</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        <div>
          <p className="text-sm text-ds-text2 mb-8 leading-relaxed">
            I am currently open to collaborative research opportunities, industry projects, and discussions related to electric vehicle architectures, smart grids, and power electronics. Feel free to reach out.
          </p>

          <div className="space-y-6">
            <div className="flex items-center group cursor-pointer">
              <div className="w-10 h-10 rounded border border-ds-border bg-ds-bg flex items-center justify-center text-ds-text1 group-hover:bg-ds-surface transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <div className="ml-4">
                <p className="text-xs font-semibold text-ds-text1 tracking-wide uppercase">Email</p>
                <a href={`mailto:${PROFILE.email}`} className="text-sm font-medium text-ds-text2 hover:text-ds-accent transition-colors">
                  {PROFILE.email}
                </a>
              </div>
            </div>

            <div className="flex items-center group cursor-pointer">
              <div className="w-10 h-10 rounded border border-ds-border bg-ds-bg flex items-center justify-center text-ds-text1 group-hover:bg-ds-surface transition-colors">
                <Linkedin className="w-4 h-4" />
              </div>
              <div className="ml-4">
                <p className="text-xs font-semibold text-ds-text1 tracking-wide uppercase">LinkedIn</p>
                <a 
                  href={PROFILE.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-ds-text2 hover:text-ds-accent transition-colors"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            <div className="group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded border border-ds-border bg-ds-bg flex items-center justify-center text-ds-text1">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="ml-4">
                  <p className="text-xs font-semibold text-ds-text1 tracking-wide uppercase">Location</p>
                  <p className="text-sm font-medium text-ds-text2">
                    {PROFILE.location}
                  </p>
                </div>
              </div>
              <div className="w-full h-48 rounded-lg overflow-hidden border border-ds-border shadow-sm">
                <iframe 
                  src="https://maps.google.com/maps?q=Nalanda,+Bihar+803111&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <input
                type="text"
                placeholder="Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-ds-surface border border-ds-border text-ds-text1 placeholder-ds-text2/50 text-sm focus:outline-none focus:border-ds-accent focus:ring-4 focus:ring-ds-accent/20 transition-all rounded-md shadow-sm"
              />
            </div>
            <div className="space-y-1">
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-ds-surface border border-ds-border text-ds-text1 placeholder-ds-text2/50 text-sm focus:outline-none focus:border-ds-accent focus:ring-4 focus:ring-ds-accent/20 transition-all rounded-md shadow-sm"
              />
            </div>
            <div className="space-y-1">
              <textarea
                placeholder="Message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-ds-surface border border-ds-border text-ds-text1 placeholder-ds-text2/50 text-sm focus:outline-none focus:border-ds-accent focus:ring-4 focus:ring-ds-accent/20 transition-all rounded-md resize-none shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="w-full py-3 btn-primary flex items-center justify-center text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
              ) : status === "success" ? (
                "Message Sent ✓"
              ) : (
                <><Send className="w-4 h-4 mr-2" /> Send Message</>
              )}
            </button>

            {feedbackMsg && (
              <div
                className={`p-3 rounded-lg text-xs font-medium text-center animate-fade-in ${
                  status === "success"
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                    : "bg-red-500/10 border border-red-500/30 text-red-400"
                }`}
              >
                {feedbackMsg}
              </div>
            )}
          </form>
        </div>
        
      </div>
    </section>
  );
}
