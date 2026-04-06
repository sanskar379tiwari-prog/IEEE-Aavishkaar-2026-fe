import { motion } from "framer-motion";
import { EventCard } from "./EventCard";
import type { TechfestEvent } from "@/types/event";

interface PremiumEventsSectionProps {
  events: TechfestEvent[];
}

const variants = ["purple", "orange", "teal"] as const;

function formatDate(dateTime: string): string {
  const date = new Date(dateTime);
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'long' }).toUpperCase();
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export const PremiumEventsSection = ({ events }: PremiumEventsSectionProps) => {
  const headingText = "EVENTS";

  const mappedEvents = events.map((event, index) => ({
    slug: event.slug,
    title: event.title,
    date: formatDate(event.dateTime),
    venue: event.venue,
    description: event.description,
    contacts: event.coordinators.map(c => ({ name: c.name.toUpperCase(), phone: c.contactNumber })),
    variant: variants[index % variants.length],
    index,
  }));

  return (
    <section id="events-section" className="relative w-full py-24 px-4 sm:px-6 flex flex-col items-center overflow-hidden">
      {/* Top Transition Fade Overlay (Deep Blend) */}
      {/* <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#05070d] via-[#05070d]/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-32 z-0 pointer-events-none" /> */}

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      {/* Elite Heading Section */}
      <div className="relative text-center mb-16 sm:mb-24 px-4 z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-pixel text-[8px] sm:text-[10px] tracking-[0.4em] text-muted-foreground uppercase mb-8"
        >
          IEEE STUDENT BRANCH ·<br /> <br /> RIT CAMPUS
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.03 }}
          className="relative inline-flex group cursor-default"
        >
          {headingText.split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: [20, -15, 0],
              }}
              animate={{
                y: [0, -18, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                opacity: { delay: 0.3 + i * 0.1, duration: 0.6 },
                y: {
                  delay: 0.3 + i * 0.1,
                  duration: 1.8,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                },
                scale: {
                  delay: 0.3 + i * 0.1,
                  duration: 1.8,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }
              }}
              className="elite-heading-letter font-pixel text-4xl sm:text-6xl md:text-8xl font-bold tracking-[0.1em] px-1"
              style={{
                background: "linear-gradient(to right, #FF8C00, #FFD700, #FF4500)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              {letter}
            </motion.span>
          ))}

          {/* Looping scanglow effect (CSS) */}
          <div className="absolute -inset-12 bg-primary/10 blur-[100px] rounded-full opacity-40 animate-glow-pulse -z-10" />
        </motion.div>
      </div>

      {/* Cards Grid - 2 columns */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 px-4 justify-items-center">
        {mappedEvents.map((event) => (
          <EventCard key={event.slug} {...event} />
        ))}
      </div>
    </section>
  );
};
