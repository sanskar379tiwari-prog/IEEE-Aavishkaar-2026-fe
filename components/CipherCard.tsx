"use client";

export default function CipherCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative group p-[2px] bg-gradient-to-br from-cyan/30 via-transparent to-orange/30 overflow-hidden dark">
      <div className="relative bg-panel h-full w-full border border-panel-border p-8 z-10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 dotted-grid opacity-20 pointer-events-none mix-blend-overlay" />
        <div className="absolute -inset-[50px] opacity-0 group-hover:opacity-10 transition-opacity duration-1000 bg-gradient-radial from-cyan to-transparent blur-3xl pointer-events-none" />
        {children}
      </div>
    </div>
  );
}
