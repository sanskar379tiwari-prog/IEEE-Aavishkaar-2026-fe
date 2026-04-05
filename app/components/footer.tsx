"use client";

import { useState } from "react";

const quickLinks = ["Events", "Schedule", "Team"];

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const CyberLogo = () => (
  <div className="flex flex-col leading-none">
    <span
      className="text-orange-400 font-black text-sm tracking-[0.2em]"
      style={{ textShadow: "0 0 8px #f97316" }}
    >
      RIT-B
    </span>
    <span className="text-orange-600 font-medium text-[9px] tracking-[0.3em]">TECHFEST</span>
  </div>
);

export default function Footer() {
  const [activeQuick, setActiveQuick] = useState("");
  const [activeSocial, setActiveSocial] = useState("");

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socials = [
    { name: "Twitter", icon: <TwitterIcon /> },
    { name: "Instagram", icon: <InstagramIcon /> },
    { name: "LinkedIn", icon: <LinkedInIcon /> },
    { name: "YouTube", icon: <YouTubeIcon /> },
  ];

  return (
    <footer className="relative mt-auto" style={{ borderTop: "1px solid rgba(194,65,12,0.3)" }}>
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(to right, transparent, #f97316, transparent)",
          boxShadow: "0 0 12px #f97316",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,115,22,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.025) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative" style={{ background: "linear-gradient(to bottom, #070d1a, #030609)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* LEFT: Brand */}
            <div className="space-y-4">
              <CyberLogo />
              <h3 className="text-orange-400 font-black text-lg tracking-widest uppercase mt-2" style={{ textShadow: "0 0 8px rgba(249,115,22,0.6)" }}>
                RIT-B Techfest 2026
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed tracking-wide max-w-xs">
                The premier technology festival of RIT Bangalore — a convergence of innovation, creativity, and cutting-edge engineering. Join us for a journey into the future of technology.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="h-px flex-1" style={{ background: "linear-gradient(to right, rgba(194,65,12,0.6), transparent)" }} />
                <span className="text-orange-700 text-[10px] tracking-widest">2026</span>
                <div className="h-px flex-1" style={{ background: "linear-gradient(to left, rgba(194,65,12,0.6), transparent)" }} />
              </div>
            </div>

            {/* MIDDLE: Quick Links */}
            <div className="space-y-4">
              <h4 className="text-orange-500 font-bold text-xs tracking-[0.3em] uppercase flex items-center gap-2" style={{ textShadow: "0 0 6px rgba(249,115,22,0.5)" }}>
                <span className="w-3 h-[1px] inline-block" style={{ background: "#f97316", boxShadow: "0 0 6px #f97316" }} />
                Quick Links
                <span className="w-3 h-[1px] inline-block" style={{ background: "#f97316", boxShadow: "0 0 6px #f97316" }} />
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => setActiveQuick(activeQuick === link ? "" : link)}
                      className="flex items-center gap-2 text-xs tracking-widest uppercase transition-all duration-200 w-full text-left"
                      style={{
                        color: activeQuick === link ? "#fb923c" : "#64748b",
                        textShadow: activeQuick === link ? "0 0 6px rgba(249,115,22,0.6)" : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (activeQuick !== link) (e.currentTarget as HTMLButtonElement).style.color = "#fdba74";
                      }}
                      onMouseLeave={(e) => {
                        if (activeQuick !== link) (e.currentTarget as HTMLButtonElement).style.color = "#64748b";
                      }}
                    >
                      <span style={{ color: activeQuick === link ? "#fb923c" : "#7c2d12" }}>›</span>
                      {link}
                      {activeQuick === link && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "#f97316", boxShadow: "0 0 6px #f97316" }} />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT: Social + Contact */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-orange-500 font-bold text-xs tracking-[0.3em] uppercase flex items-center gap-2" style={{ textShadow: "0 0 6px rgba(249,115,22,0.5)" }}>
                  <span className="w-3 h-[1px] inline-block" style={{ background: "#f97316", boxShadow: "0 0 6px #f97316" }} />
                  Follow Us
                  <span className="w-3 h-[1px] inline-block" style={{ background: "#f97316", boxShadow: "0 0 6px #f97316" }} />
                </h4>
                <div className="flex gap-3">
                  {socials.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => setActiveSocial(activeSocial === s.name ? "" : s.name)}
                      aria-label={s.name}
                      className="w-9 h-9 flex items-center justify-center rounded-sm transition-all duration-200"
                      style={{
                        color: activeSocial === s.name ? "#fb923c" : "#475569",
                        border: activeSocial === s.name ? "1px solid #f97316" : "1px solid #1e293b",
                        background: activeSocial === s.name ? "rgba(67,20,7,0.5)" : "transparent",
                        boxShadow: activeSocial === s.name ? "0 0 12px rgba(249,115,22,0.4), inset 0 0 8px rgba(249,115,22,0.1)" : "none",
                      }}
                      onMouseEnter={(e) => {
                        const btn = e.currentTarget as HTMLButtonElement;
                        if (activeSocial !== s.name) {
                          btn.style.color = "#fb923c";
                          btn.style.border = "1px solid rgba(194,65,12,0.6)";
                          btn.style.background = "rgba(67,20,7,0.3)";
                          btn.style.boxShadow = "0 0 8px rgba(249,115,22,0.2)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        const btn = e.currentTarget as HTMLButtonElement;
                        if (activeSocial !== s.name) {
                          btn.style.color = "#475569";
                          btn.style.border = "1px solid #1e293b";
                          btn.style.background = "transparent";
                          btn.style.boxShadow = "none";
                        }
                      }}
                    >
                      {s.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-3">
                <h4 className="text-orange-500 font-bold text-xs tracking-[0.3em] uppercase flex items-center gap-2" style={{ textShadow: "0 0 6px rgba(249,115,22,0.5)" }}>
                  <span className="w-3 h-[1px] inline-block" style={{ background: "#f97316", boxShadow: "0 0 6px #f97316" }} />
                  Contact
                  <span className="w-3 h-[1px] inline-block" style={{ background: "#f97316", boxShadow: "0 0 6px #f97316" }} />
                </h4>
                <ul className="space-y-2 text-slate-500 text-[11px] tracking-wider">
                  <li className="flex items-center gap-2">
                    <span className="text-orange-700">◈</span>
                    <a href="mailto:techfest@ritb.edu.in" className="transition-colors duration-200 hover:text-orange-400">techfest@ritb.edu.in</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-700">◈</span>
                    <span>+91 98765 43210</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-700 mt-0.5">◈</span>
                    <span>RIT Bangalore, Karnataka 560054</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative">
            <div className="h-[1px] w-full mb-5" style={{ background: "linear-gradient(to right, transparent, rgba(194,65,12,0.5), transparent)" }} />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-slate-700 text-[10px] tracking-[0.2em] uppercase">
                © 2026 RIT-B Techfest. All rights reserved.
              </p>
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase rounded-sm px-3 py-1.5 transition-all duration-200"
                style={{ color: "#475569", border: "1px solid #1e293b" }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.color = "#fb923c";
                  btn.style.border = "1px solid rgba(194,65,12,0.6)";
                  btn.style.background = "rgba(67,20,7,0.2)";
                  btn.style.boxShadow = "0 0 10px rgba(249,115,22,0.2)";
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.color = "#475569";
                  btn.style.border = "1px solid #1e293b";
                  btn.style.background = "transparent";
                  btn.style.boxShadow = "none";
                }}
              >
                <svg className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}