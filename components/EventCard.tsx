import React from "react";
import { motion } from "framer-motion";
import { Calendar, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Contact {
  name: string;
  phone: string;
}

interface EventCardProps {
  slug: string;
  title: string;
  date: string;
  venue: string;
  description: string;
  contacts: Contact[];
  variant?: "purple" | "orange" | "teal";
  index: number;
}

const VARIANTS = {
  purple: {
    glow: "rgba(168, 85, 247, 0.6)",
    border: "border-purple-500/30",
    text: "text-purple-400",
    bg: "from-purple-900/20 to-transparent",
    btn: "bg-purple-600/20 border-purple-500/40 text-purple-300 hover:bg-purple-600/40",
    matrix: "text-purple-500/20"
  },
  orange: {
    glow: "rgba(249, 115, 22, 0.6)",
    border: "border-orange-500/30",
    text: "text-orange-400",
    bg: "from-orange-900/20 to-transparent",
    btn: "bg-orange-600/20 border-orange-500/40 text-orange-300 hover:bg-orange-600/40",
    matrix: "text-orange-500/20"
  },
  teal: {
    glow: "rgba(20, 184, 166, 0.6)",
    border: "border-teal-500/30",
    text: "text-teal-400",
    bg: "from-teal-900/20 to-transparent",
    btn: "bg-teal-600/20 border-teal-500/40 text-teal-300 hover:bg-teal-600/40",
    matrix: "text-teal-500/20"
  }
};

export const EventCard = ({
  slug,
  title,
  date,
  venue,
  description,
  contacts,
  variant = "orange",
    index,
  }: EventCardProps) => {
    const v = VARIANTS[variant];
  
    // Generate stable matrix content based on slug to maintain purity
    const matrixLines = React.useMemo(() => 
      [...Array(20)].map((_, i) => 
        (slug + i).split('').reverse().join('').toUpperCase().padEnd(50, 'X').substring(0, 48) + " " +
        (title + i).split('').reverse().join('').toUpperCase().padEnd(50, 'Y').substring(0, 48)
      ), [slug, title]);
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        style={{ perspective: "1000px" }}
        whileHover={{
          y: -10,
          rotateX: 4,
          rotateY: 4,
          transition: { duration: 0.4 }
        }}
        className={cn(
          "relative flex flex-col w-full max-w-[380px] bg-[#0a0a0c] border rounded-sm overflow-hidden",
          v.border,
          "shadow-[0_0_30px_rgba(0,0,0,1)] group"
        )}
      >
        {/* Moving Border Glow (The Rotating Outline) */}
        <div className={cn(
          "absolute -inset-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-sm overflow-hidden z-0",
          "before:absolute before:inset-[-200%] before:bg-[conic-gradient(from_0deg,transparent_60%,var(--glow-color)_85%,transparent_100%)] before:animate-[spin_4s_linear_infinite]"
        )} style={{ '--glow-color': v.glow } as React.CSSProperties} />
  
        {/* Internal Background Depth Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none z-0" />
  
        {/* Top Section: Scrolling Matrix/Code Effect */}
        <div className="relative h-48 overflow-hidden bg-black border-b border-white/10 z-10">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10" />
  
          <div className={cn("absolute inset-0 font-mono text-[8px] leading-tight select-none opacity-[0.15] transition-all duration-700 group-hover:opacity-30 group-hover:scale-110", v.matrix)}>
            {matrixLines.map((line, i) => (
              <div key={i} className="whitespace-nowrap animate-matrix-scroll" style={{ animationDelay: `${i * 0.5}s` }}>
                {line}
              </div>
            ))}
          </div>

        <div className={cn("absolute top-2 left-2 w-4 h-4 border-t border-l opacity-40 group-hover:opacity-100 transition-all", v.border)} />
        <div className={cn("absolute bottom-2 right-2 w-4 h-4 border-b border-r opacity-40 group-hover:opacity-100 transition-all", v.border)} />

        <div className="absolute inset-0 flex items-center justify-center transform group-hover:translate-z-20 transition-transform">
          <div className={cn(
            "px-8 py-2 border-2 bg-black/95 backdrop-blur-md relative overflow-hidden",
            v.border,
            "shadow-[0_20px_40px_rgba(0,0,0,0.8)] filter drop-shadow-[0_0_15px_var(--glow-color)]"
          )} style={{ '--glow-color': v.glow } as React.CSSProperties}>
            <h3 className={cn("font-pixel text-xl tracking-[0.3em] uppercase", v.text)}>
              {title}
            </h3>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1 w-full animate-scan-vertical" />
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="relative z-10 flex-1 flex flex-col bg-[#0a0a0c]">
        {/* Info Strip */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-black/40 text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {date}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {venue}
            </span>
          </div>
        </div>

        {/* Contacts Section */}
        <div className={cn("px-4 py-3 border-b border-white/5 bg-gradient-to-r", v.bg)}>
          <div className="grid grid-cols-2 text-[8px] font-mono gap-2">
            {contacts.map((c, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className={cn("uppercase", v.text)}>{c.name.toUpperCase()}</span>
                <span className="text-muted-foreground flex items-center gap-1 opacity-80">
                  <Phone className="w-2.5 h-2.5" /> {c.phone}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 p-5 flex flex-col gap-5">
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <h4 className={cn("font-pixel text-[11px] uppercase tracking-wider", v.text)}>
                {title}
              </h4>
              <span className="font-mono text-[9px] text-muted-foreground tracking-[0.3em]">SECURE_DATEDATA: {date}</span>
            </div>
            <p className="text-[11px] text-muted-foreground/80 leading-[1.6] font-sans line-clamp-4">
              {description}
            </p>
          </div>

          <Link
            href={`/events/${slug}`}
            className={cn(
              "mt-auto px-4 py-3 border font-pixel text-[10px] tracking-[0.2em] uppercase transition-all duration-500",
              "hover:scale-[1.02] shadow-[0_10px_20px_rgba(0,0,0,0.4)] text-center",
              v.btn
            )}
          >
            INITIATE Uplink →
          </Link>
        </div>
      </div>

      {/* Inner hover shadow */}
      <div className={cn(
        "absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm border-2 z-20",
        v.border
      )} />
    </motion.div>
  );
};
