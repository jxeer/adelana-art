import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sliders, HelpCircle, Sun, Grid } from "lucide-react";
import { ARTWORKS } from "../data";
import { Artwork } from "../types";

interface WallViewProps {
  selectedArtworkId: string;
  onSelectArtwork: (artworkId: string) => void;
  setActiveSection: (section: string) => void;
}

export default function WallView({
  selectedArtworkId,
  onSelectArtwork,
  setActiveSection,
}: WallViewProps) {
  const [wallColor, setWallColor] = useState<"white" | "concrete" | "black">("concrete");
  const [lightAngle, setLightAngle] = useState<"left" | "center" | "right">("left");
  
  const activeArtwork = ARTWORKS.find((a) => a.id === selectedArtworkId) || ARTWORKS[0];

  const wallColors = {
    white: {
      bg: "bg-[#f4f3ef]", // Warm museum-gallery plaster off-white
      border: "border-neutral-200",
      text: "text-neutral-900",
      sub: "text-neutral-500",
      shadow: "shadow-black/35"
    },
    concrete: {
      bg: "bg-[#2c2c2e]", // Deep mineral concrete gray
      border: "border-neutral-800",
      text: "text-neutral-100",
      sub: "text-neutral-400",
      shadow: "shadow-black/75"
    },
    black: {
      bg: "bg-[#0c0c0d]", // Ultra-matte black basalt
      border: "border-neutral-900",
      text: "text-neutral-300",
      sub: "text-neutral-500",
      shadow: "shadow-black/90"
    }
  };

  // Define shadow styles based on light angle and active wall color
  const getShadowStyle = () => {
    const intensity = wallColor === "white" ? "0.25" : wallColor === "concrete" ? "0.6" : "0.85";
    switch (lightAngle) {
      case "left":
        return `18px 24px 45px rgba(0, 0, 0, ${intensity})`;
      case "right":
        return `-18px 24px 45px rgba(0, 0, 0, ${intensity})`;
      case "center":
      default:
        return `0px 30px 50px rgba(0, 0, 0, ${intensity})`;
    }
  };

  const getSofaShadow = () => {
    switch (lightAngle) {
      case "left":
        return "20px 10px 20px rgba(0,0,0,0.45)";
      case "right":
        return "-20px 10px 20px rgba(0,0,0,0.45)";
      case "center":
      default:
        return "0px 12px 15px rgba(0,0,0,0.4)";
    }
  };

  return (
    <section className="min-h-screen bg-black text-white pt-24 pb-16 flex flex-col justify-between" id="wall-view">
      
      {/* Top Controller Panel */}
      <div className="max-w-7xl mx-auto w-full px-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 z-10">
        <div>
          <span className="text-amber-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-1 block">
            Visualizer Studio
          </span>
          <h2 className="text-2xl md:text-3xl font-light tracking-[0.18em] uppercase font-sans">
            Virtual Wall Hanging
          </h2>
        </div>

        {/* Configuration Controllers */}
        <div className="flex flex-wrap items-center gap-6 bg-neutral-950/75 border border-white/5 p-4 rounded-[1px]" id="visualizer-controls">
          {/* Wall Color */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[8px] uppercase tracking-[0.25em] text-neutral-400 font-mono">Wall Medium</span>
            <div className="flex items-center space-x-2.5">
              <button
                onClick={() => setWallColor("white")}
                className={`w-5 h-5 rounded-full bg-[#f4f3ef] border ${wallColor === "white" ? "ring-1 ring-amber-500 ring-offset-2 ring-offset-black" : "border-neutral-700"}`}
                title="Warm Plaster"
              />
              <button
                onClick={() => setWallColor("concrete")}
                className={`w-5 h-5 rounded-full bg-[#2c2c2e] border ${wallColor === "concrete" ? "ring-1 ring-amber-500 ring-offset-2 ring-offset-black" : "border-neutral-700"}`}
                title="Mineral Concrete"
              />
              <button
                onClick={() => setWallColor("black")}
                className={`w-5 h-5 rounded-full bg-[#0c0c0d] border ${wallColor === "black" ? "ring-1 ring-amber-500 ring-offset-2 ring-offset-black" : "border-neutral-700"}`}
                title="Matte Basalt Black"
              />
            </div>
          </div>

          {/* Vertical divider */}
          <div className="h-8 w-[1px] bg-neutral-800 hidden sm:block" />

          {/* Spotlight Angle */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[8px] uppercase tracking-[0.25em] text-neutral-400 font-mono">Spotlight Angle</span>
            <div className="flex items-center bg-neutral-900 border border-white/5 p-0.5 rounded-[1px] text-[9px] tracking-widest font-mono">
              <button
                onClick={() => setLightAngle("left")}
                className={`px-2.5 py-1 uppercase rounded-[1px] ${lightAngle === "left" ? "bg-amber-500 text-black font-semibold" : "text-neutral-400 hover:text-white"}`}
              >
                Left
              </button>
              <button
                onClick={() => setLightAngle("center")}
                className={`px-2.5 py-1 uppercase rounded-[1px] ${lightAngle === "center" ? "bg-amber-500 text-black font-semibold" : "text-neutral-400 hover:text-white"}`}
              >
                Direct
              </button>
              <button
                onClick={() => setLightAngle("right")}
                className={`px-2.5 py-1 uppercase rounded-[1px] ${lightAngle === "right" ? "bg-amber-500 text-black font-semibold" : "text-neutral-400 hover:text-white"}`}
              >
                Right
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Hanging Stage Area */}
      <div className="max-w-7xl mx-auto w-full px-6 flex-grow flex flex-col lg:flex-row gap-8 items-stretch relative">
        
        {/* Interactive Wall Stage */}
        <div 
          className={`relative flex-grow lg:w-2/3 h-[450px] md:h-[550px] rounded-[1px] ${wallColors[wallColor].bg} transition-colors duration-1000 overflow-hidden flex flex-col justify-between border ${wallColors[wallColor].border} p-12`}
          id="hanging-wall-stage"
        >
          {/* Subtle concrete/plaster texture layer overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-300 via-neutral-950 to-neutral-950" />

          {/* Dynamic Light Casting Spotlights */}
          <div 
            className="absolute top-0 w-full h-full pointer-events-none transition-all duration-1000"
            style={{
              background: 
                lightAngle === "left"
                  ? "radial-gradient(circle 500px at 20% 10%, rgba(255,245,210,0.12) 0%, transparent 80%)"
                  : lightAngle === "right"
                    ? "radial-gradient(circle 500px at 80% 10%, rgba(255,245,210,0.12) 0%, transparent 80%)"
                    : "radial-gradient(circle 600px at 50% 10%, rgba(255,245,210,0.14) 0%, transparent 80%)"
            }}
          />

          {/* Centered Hanging Canvas Container */}
          <div className="flex-grow flex items-center justify-center relative z-10 pb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeArtwork.id}
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-neutral-950 p-3.5 shadow-2xl border border-neutral-900 group"
                style={{
                  boxShadow: getShadowStyle(),
                  transition: "box-shadow 0.8s ease"
                }}
              >
                {/* Float frame drop-gap overlay */}
                <div className="absolute inset-0 border border-neutral-800 pointer-events-none" />
                
                {/* Artwork canvas container */}
                <div className="relative bg-neutral-900 overflow-hidden shadow-inner">
                  <img
                    src={activeArtwork.imageSrc}
                    alt={activeArtwork.title}
                    referrerPolicy="no-referrer"
                    className="w-44 h-56 sm:w-56 sm:h-[280px] md:w-64 md:h-[320px] object-cover filter brightness-[0.9] select-none"
                  />
                  <div className="absolute inset-0 border border-black/80 pointer-events-none" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Minimalist Designer Credenza below */}
          <div className="relative w-full flex flex-col items-center z-10">
            {/* Simple ceramic vase on the side */}
            <div className="absolute bottom-[30px] left-[15%] w-6 h-12 bg-neutral-100 rounded-b-xl rounded-t-sm shadow-md border border-neutral-200/20 flex flex-col justify-start items-center">
              {/* Minimal dried grass branch */}
              <div className="w-[1px] h-14 bg-neutral-400 origin-bottom -rotate-12 transform -translate-y-12" />
            </div>

            {/* Low-profile solid timber credenza bar */}
            <div 
              className="w-[85%] h-[24px] bg-[#1a110a] border-t border-neutral-700/30 rounded-t-sm relative transition-all duration-1000"
              style={{ boxShadow: getSofaShadow() }}
            >
              {/* Wood grain highlight */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-neutral-600/20" />
            </div>
            
            {/* Small metal legs */}
            <div className="w-[85%] flex justify-between px-12">
              <div className="w-1.5 h-3.5 bg-neutral-800" />
              <div className="w-1.5 h-3.5 bg-neutral-800" />
              <div className="w-1.5 h-3.5 bg-neutral-800" />
            </div>
          </div>
        </div>

        {/* Right Info & Selector Panel */}
        <div className="lg:w-1/3 flex flex-col justify-between bg-neutral-950 border border-white/5 p-6 md:p-8" id="wall-details-panel">
          
          {/* Active Piece Info */}
          <div>
            <span className="text-amber-500/80 font-mono text-[9px] tracking-[0.3em] uppercase mb-1 block">
              Hanging Masterpiece
            </span>
            <h3 className="text-xl font-light tracking-widest uppercase font-sans text-white mb-2">
              {activeArtwork.title}
            </h3>
            
            <div className="flex space-x-3 text-[9px] tracking-widest text-neutral-400 font-mono uppercase mb-4">
              <span>{activeArtwork.year}</span>
              <span>•</span>
              <span>{activeArtwork.dimensions}</span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed font-light mb-6">
              {activeArtwork.story}
            </p>

            <div className="bg-neutral-900 border border-white/5 p-4 rounded-[1px] space-y-2 mb-6 text-xs text-neutral-300">
              <p className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">Medium Specs</p>
              <p className="font-serif italic text-neutral-400 text-[11px] leading-relaxed">
                {activeArtwork.materials}
              </p>
            </div>
          </div>

          {/* Collection Selector Carousel */}
          <div>
            <h4 className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-mono mb-3 uppercase">
              Select Another Piece
            </h4>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {ARTWORKS.map((art) => (
                <button
                  key={art.id}
                  onClick={() => onSelectArtwork(art.id)}
                  className={`relative p-2 rounded-[1px] border text-left flex items-center gap-2.5 transition-all duration-300 ${
                    selectedArtworkId === art.id
                      ? "bg-neutral-900 border-amber-500/80"
                      : "bg-neutral-950 border-white/5 hover:border-neutral-700"
                  }`}
                  id={`wall-selector-${art.id}`}
                >
                  <img
                    src={art.imageSrc}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-8 h-10 object-cover filter brightness-[0.8] rounded-[1px]"
                  />
                  <div className="overflow-hidden">
                    <p className="text-[10px] tracking-wider uppercase font-sans text-white truncate">
                      {art.title}
                    </p>
                    <p className="text-[8px] font-mono text-neutral-500 uppercase truncate">
                      {art.dimensions.split(" ")[0]} cm
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Inquire about active */}
            <button
              onClick={() => setActiveSection("concierge")}
              className="w-full text-center bg-transparent hover:bg-white text-neutral-300 hover:text-black border border-white/10 hover:border-white py-3 px-4 text-[10px] uppercase tracking-[0.25em] font-medium transition-all duration-300"
              id="wall-inquire-btn"
            >
              Inquire About This Piece
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
