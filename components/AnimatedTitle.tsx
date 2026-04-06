"use client";

import React from "react";

interface AnimatedTitleProps {
  text: string;
  className?: string;
  delayOffset?: number;
}

export default function AnimatedTitle({ text, className = "", delayOffset = 0 }: AnimatedTitleProps) {
  const glowColors = ["#00ded4", "#ff5f34", "#f1f5f9"];

  return (
    <span className={className}>
      {text.split("").map((char, index) => {
        if (char === " ") {
          return <span key={index}>&nbsp;</span>;
        }
        return (
          <span
            key={index}
            className="inline-block"
            style={{
              animation: `sequenceGlow 3s infinite ${delayOffset + index * 0.15}s`,
              "--glow-color": glowColors[index % glowColors.length]
            } as React.CSSProperties}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
