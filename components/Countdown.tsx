import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimeUnit {
  value: string;
  label: string;
}

const Countdown = () => {
  const [time, setTime] = useState<TimeUnit[]>([]);

  useEffect(() => {
    // Set target to 10 days from now for demo
    const target = new Date();
    target.setDate(target.getDate() + 10);
    target.setHours(0, 0, 0, 0);

    const update = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTime([
          { value: "00", label: "DAYS" },
          { value: "00", label: "HOURS" },
          { value: "00", label: "MINUTES" },
          { value: "00", label: "SECONDS" },
        ]);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime([
        { value: String(days).padStart(2, "0"), label: "DAYS" },
        { value: String(hours).padStart(2, "0"), label: "HOURS" },
        { value: String(minutes).padStart(2, "0"), label: "MINUTES" },
        { value: String(seconds).padStart(2, "0"), label: "SECONDS" },
      ]);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="pixel-border rounded-sm bg-card/80 backdrop-blur-sm px-4 py-5 sm:px-10 sm:py-6 w-full max-w-[min(100%,450px)] sm:max-w-fit mx-auto"
    >
      <p className="text-center font-pixel text-[10px] sm:text-xs tracking-[0.2em] text-primary neon-text mb-6 font-bold flex items-center justify-center gap-2">
        <span className="w-2 h-2 bg-primary animate-pulse" />
        COUNTDOWN
        <span className="w-2 h-2 bg-primary animate-pulse" />
      </p>
      
      <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-y-8 gap-x-4 sm:gap-6 uppercase">
        {time.length > 0 ? time.map((unit, i) => (
          <div key={unit.label} className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <span className="font-pixel text-3xl sm:text-5xl text-primary neon-text tabular-nums elite-heading-letter font-bold tracking-tight">
                  {unit.value}
                </span>
                {/* Glowing bar below number */}
                <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary/30 blur-[2px]" />
              </div>
              <span className="font-pixel text-[7px] sm:text-[10px] text-muted-foreground mt-3 tracking-widest opacity-80">
                {unit.label}
              </span>
            </div>
            
            {/* Show colon only between items in the same row, or on desktop */}
            {i % 2 === 0 && i < time.length - 1 && (
              <span className="hidden sm:inline font-pixel text-xl sm:text-4xl text-primary/30 mt-[-1rem] sm:mt-[-1.5rem]">:</span>
            )}
            {/* On desktop, show colon between 2nd and 3rd too */}
            {i === 1 && (
              <span className="hidden sm:inline font-pixel text-xl sm:text-4xl text-primary/30 mt-[-1rem] sm:mt-[-1.5rem]">:</span>
            )}
            {/* Mobile specific colon (only between first two if in a row) */}
            {i === 0 && (
              <span className="inline sm:hidden font-pixel text-xl text-primary/20 mt-[-1rem]">:</span>
            )}
            {i === 2 && (
              <span className="inline sm:hidden font-pixel text-xl text-primary/20 mt-[-1rem]">:</span>
            )}
          </div>
        )) : (
          <div className="col-span-2 text-center animate-pulse font-pixel text-[8px] text-muted-foreground tracking-widest">
            SYNCHRONIZING_WITH_STATION...
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Countdown;
