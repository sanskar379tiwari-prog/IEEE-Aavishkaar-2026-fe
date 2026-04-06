import RegistrationForm from "@/components/RegistrationForm";
import MatrixBackground from "@/components/MatrixBackground";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IEEE Techfest 2026 Registration",
  description: "Register your team for IEEE Techfest 2026.",
};

export default function Home() {
  const glowColors = ["var(--color-cyan)", "var(--color-orange)", "#ffffff"];
  
  return (
    <div className="min-h-screen flex flex-col bg-bg-main text-white selection:bg-orange/30">
      {/* ── GLOBAL NAVBAR ── */}
      <Navbar />

      <main className="relative flex-grow flex flex-col items-center pt-32 pb-24 px-4 overflow-x-hidden">
        <MatrixBackground />
        
        <div className="relative z-10 w-full max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4 mb-8 md:mb-12">
            <h1
              className="text-5xl md:text-7xl font-space font-bold text-white uppercase tracking-widest flex justify-center flex-wrap md:flex-nowrap gap-x-4 md:gap-x-6"
            >
              {/* BRANDING: IEEE TECHFEST */}
              <div className="flex">
                {"IEEE".split("").map((char, index) => (
                  <span
                    key={`ieee-${index}`}
                    className="animate-letter-glow inline-block"
                    style={{
                      animationDelay: `${index * 0.15}s`,
                      "--glow-color": glowColors[index % glowColors.length]
                    } as React.CSSProperties}
                  >
                    {char}
                  </span>
                ))}
              </div>
              <div className="flex text-orange">
                {"2026".split("").map((char, index) => (
                  <span
                    key={`year-${index}`}
                    className="animate-letter-glow inline-block"
                    style={{
                      animationDelay: `${(4 + index) * 0.15}s`,
                      "--glow-color": glowColors[(4 + index) % glowColors.length]
                    } as React.CSSProperties}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </h1>
            <p className="text-sm md:text-base text-cyan tracking-[0.2em] max-w-2xl mx-auto px-4 font-tech uppercase">
              {"// Secure your spot in the ultimate tech event //"}
            </p>
          </div>

          <div className="relative z-10 w-full flex justify-center">
            <RegistrationForm />
          </div>
        </div>
      </main>

      {/* ── GLOBAL FOOTER ── */}
      <Footer />
    </div>
  );
}