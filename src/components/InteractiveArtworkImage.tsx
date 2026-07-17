import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Sparkles, Sun } from "lucide-react";

interface InteractiveArtworkImageProps {
  imageSrc: string;
  title: string;
  className?: string;
}

export default function InteractiveArtworkImage({ imageSrc, title, className = "" }: InteractiveArtworkImageProps) {
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-neutral-950 overflow-hidden shadow-2xl border border-neutral-900 group cursor-crosshair select-none ${className}`}
      id={`interactive-canvas-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {/* Base Artwork Image */}
      <img
        src={imageSrc}
        alt={title}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-[1.03] filter brightness-[0.9] group-hover:brightness-[0.96]"
      />

      {/* Layer 1: Gold-Leaf color dodge highlights (Spotlight) */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-color-dodge transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle 220px at ${coords.x}% ${coords.y}%, rgba(245, 190, 80, 0.45) 0%, rgba(212, 175, 55, 0.12) 30%, rgba(0, 0, 0, 0) 70%)`,
          opacity: isHovered ? 1 : 0.15, // Has a subtle default highlight
        }}
      />

      {/* Layer 2: White specular glare (High contrast overlay) */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 350px at ${coords.x}% ${coords.y}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(0, 0, 0, 0) 100%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Subtle copper museum style framing gap shadow */}
      <div className="absolute inset-0 border border-black/80 pointer-events-none" />

      {/* Interactive indicator badge */}
      <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md border border-white/10 px-3 py-1 flex items-center gap-1.5 rounded-[1px] opacity-70 group-hover:opacity-100 transition-opacity duration-300">
        <Sun className="w-3 h-3 text-amber-400 animate-spin-slow" />
        <span className="text-[8px] uppercase tracking-[0.2em] text-neutral-300 font-mono">
          Interactive Light
        </span>
      </div>
    </div>
  );
}
