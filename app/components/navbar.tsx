"use client";

import { useState, useEffect } from "react";

const navLinks = ["Home", "Events", "Schedule", "Team", "Contact"];

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

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Navbar Background Scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent Background Scrolling when Mobile Menu is Open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(2,5,9,0.97)"
          : "linear-gradient(to bottom, #020509, rgba(2,5,9,0.85))",
        boxShadow: scrolled ? "0 2px 20px rgba(249,115,22,0.15)" : "none",
      }}
    >
      {/* Top neon line */}
      <div
        className="h-[1px] w-full"
        style={{
          background: "linear-gradient(to right, transparent, #f97316, transparent)",
          boxShadow: "0 0 8px #f97316",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo (Far Left) */}
          <CyberLogo />

          {/* Desktop Nav - Split into Center and Far Right */}
          <nav className="hidden md:flex flex-1 items-center justify-end h-full">
            {/* Main Links (Perfectly Centered Group) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 lg:gap-6">
              {navLinks.slice(0, -1).map((link) => (
                <button
                  key={link}
                  onClick={() => setActiveLink(link)}
                  className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-[#050a14] shadow-[0_0_10px_rgba(249,115,22,0.2)] transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] group"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#431407_0%,#f97316_50%,#431407_100%)]" />
                  <span
                    className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#050a14] px-5 py-1 text-xs font-semibold backdrop-blur-3xl tracking-[0.15em] uppercase transition-colors duration-300"
                    style={{ color: activeLink === link ? "#fb923c" : "#94a3b8" }}
                    onMouseEnter={(e) => {
                      if (activeLink !== link) (e.currentTarget as HTMLSpanElement).style.color = "#fdba74";
                    }}
                    onMouseLeave={(e) => {
                      if (activeLink !== link) (e.currentTarget as HTMLSpanElement).style.color = "#94a3b8";
                    }}
                  >
                    {link}
                  </span>
                </button>
              ))}
            </div>

            {/* Contact Link (Far Right) */}
            {navLinks.slice(-1).map((link) => (
              <button
                key={link}
                onClick={() => setActiveLink(link)}
                className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-[#050a14] shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] group"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#431407_0%,#f97316_50%,#431407_100%)]" />
                <span
                  className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#050a14] px-6 py-1 text-xs font-semibold backdrop-blur-3xl tracking-[0.15em] uppercase transition-colors duration-300"
                  style={{ color: activeLink === link ? "#fb923c" : "#94a3b8" }}
                  onMouseEnter={(e) => {
                    if (activeLink !== link) (e.currentTarget as HTMLSpanElement).style.color = "#fdba74";
                  }}
                  onMouseLeave={(e) => {
                    if (activeLink !== link) (e.currentTarget as HTMLSpanElement).style.color = "#94a3b8";
                  }}
                >
                  {link}
                </span>
              </button>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 relative z-50"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className="block h-[2px] bg-orange-500 transition-all duration-300"
              style={{ width: "24px", boxShadow: "0 0 5px #f97316" }}
            />
            <span
              className="block h-[2px] bg-orange-500 transition-all duration-300"
              style={{ width: "16px", boxShadow: "0 0 5px #f97316" }}
            />
            <span
              className="block h-[2px] bg-orange-500 transition-all duration-300"
              style={{ width: "24px", boxShadow: "0 0 5px #f97316" }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: mobileOpen ? "400px" : "0px",
          opacity: mobileOpen ? 1 : 0,
        }}
      >
        <div
          className="px-4 py-3 flex flex-col gap-1 backdrop-blur-sm"
          style={{
            borderTop: "1px solid rgba(194,65,12,0.3)",
            background: "rgba(2,5,9,0.98)",
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => {
                setActiveLink(link);
                setMobileOpen(false);
              }}
              className="text-left px-4 py-3 text-xs font-semibold tracking-[0.15em] uppercase rounded-sm transition-all duration-200"
              style={{
                color: activeLink === link ? "#fb923c" : "#94a3b8",
                border: activeLink === link ? "1px solid rgba(249,115,22,0.4)" : "1px solid transparent",
                background: activeLink === link ? "rgba(67,20,7,0.4)" : "transparent",
                boxShadow: activeLink === link ? "0 0 10px rgba(249,115,22,0.15)" : "none",
              }}
            >
              <span className="mr-2 text-orange-700">›</span>
              {link}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom neon line */}
      <div
        className="h-[1px] w-full"
        style={{ background: "linear-gradient(to right, transparent, rgba(194,65,12,0.6), transparent)" }}
      />
    </header>
  );
}