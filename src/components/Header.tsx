import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import { ambientSoundscape } from "../utils/ambient-tone";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.5);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: "entrance", label: "Entrance" },
    { id: "gallery", label: "Exhibition" },
    { id: "process", label: "Creation Atelier" },
    { id: "wall-view", label: "Virtual Wall" },
    { id: "concierge", label: "Collector Concierge" }
  ];

  const handleAudioToggle = () => {
    if (isAudioPlaying) {
      ambientSoundscape.stop();
      setIsAudioPlaying(false);
    } else {
      ambientSoundscape.start();
      ambientSoundscape.setVolume(audioVolume);
      setIsAudioPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setAudioVolume(vol);
    if (isAudioPlaying) {
      ambientSoundscape.setVolume(vol);
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      ambientSoundscape.stop();
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/65 backdrop-blur-md border-b border-white/5 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Gallery Title */}
        <div 
          onClick={() => setActiveSection("entrance")}
          className="cursor-pointer group flex flex-col items-start"
          id="branding-logo"
        >
          <span className="text-xl md:text-2xl font-light tracking-[0.35em] text-white group-hover:text-amber-100 transition-colors duration-500 font-sans uppercase">
            Adelana
          </span>
          <span className="text-[9px] tracking-[0.4em] text-amber-500/80 uppercase font-mono mt-1">
            Fine Art Museum
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8" id="desktop-nav">
          {sections.map((sect) => {
            const isActive = activeSection === sect.id;
            return (
              <button
                key={sect.id}
                onClick={() => setActiveSection(sect.id)}
                className={`relative py-2 text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-500 hover:text-white ${
                  isActive ? "text-amber-200" : "text-neutral-400"
                }`}
                id={`nav-btn-${sect.id}`}
              >
                {sect.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Audio controls and Mobile menu toggle */}
        <div className="flex items-center space-x-6">
          {/* Procedural Audio Toggle */}
          <div className="flex items-center space-x-3 bg-neutral-900/60 border border-white/5 py-1.5 px-3 rounded-full" id="audio-control-container">
            <button
              onClick={handleAudioToggle}
              className="text-neutral-400 hover:text-amber-200 transition-colors duration-300 flex items-center justify-center p-1"
              title={isAudioPlaying ? "Mute Ambient Room Tone" : "Activate Museum Room Tone"}
              id="audio-toggle-btn"
            >
              {isAudioPlaying ? (
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 text-neutral-500" />
              )}
            </button>
            
            {/* Soft wave indicator & Volume slider */}
            <div className="flex items-center space-x-2">
              <span className="text-[9px] tracking-widest text-neutral-500 font-mono hidden sm:inline uppercase">
                {isAudioPlaying ? "Sound ON" : "Sound OFF"}
              </span>
              {isAudioPlaying && (
                <div className="flex items-end space-x-0.5 h-3 w-4">
                  <span className="bg-amber-400/80 w-[2px] h-1 animate-[bounce_1s_infinite_100ms]" />
                  <span className="bg-amber-400/80 w-[2px] h-3 animate-[bounce_1s_infinite_300ms]" />
                  <span className="bg-amber-400/80 w-[2px] h-2 animate-[bounce_1s_infinite_500ms]" />
                </div>
              )}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={audioVolume}
                onChange={handleVolumeChange}
                className="w-12 sm:w-16 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
                title="Volume"
              />
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-neutral-400 hover:text-white transition-colors"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden w-full bg-neutral-950 border-b border-white/5 overflow-hidden"
            id="mobile-nav-drawer"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">
              {sections.map((sect) => (
                <button
                  key={sect.id}
                  onClick={() => {
                    setActiveSection(sect.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-sm uppercase tracking-[0.2em] py-2 border-l-2 pl-3 transition-colors ${
                    activeSection === sect.id
                      ? "border-amber-500 text-amber-200 font-semibold"
                      : "border-transparent text-neutral-400"
                  }`}
                  id={`mobile-nav-btn-${sect.id}`}
                >
                  {sect.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
