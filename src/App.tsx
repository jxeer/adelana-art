import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import MainEntrance from "./components/MainEntrance";
import MainGallery from "./components/MainGallery";
import WallView from "./components/WallView";
import ProcessAtelier from "./components/ProcessAtelier";
import Concierge from "./components/Concierge";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("entrance");
  const [selectedArtworkId, setSelectedArtworkId] = useState<string>("i-am");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "entrance":
        return (
          <MainEntrance 
            onEnter={() => setActiveSection("gallery")} 
          />
        );
      case "gallery":
        return (
          <MainGallery
            onSelectArtworkForWall={setSelectedArtworkId}
            onSelectArtworkForChat={setSelectedArtworkId}
            setActiveSection={setActiveSection}
          />
        );
      case "process":
        return <ProcessAtelier />;
      case "wall-view":
        return (
          <WallView
            selectedArtworkId={selectedArtworkId}
            onSelectArtwork={setSelectedArtworkId}
            setActiveSection={setActiveSection}
          />
        );
      case "concierge":
        return (
          <Concierge 
            selectedArtworkId={selectedArtworkId} 
          />
        );
      default:
        return (
          <MainEntrance 
            onEnter={() => setActiveSection("gallery")} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-200 overflow-x-hidden selection:bg-amber-500 selection:text-black">
      {/* Absolute Ambient Background Lights */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] bg-neutral-900/40 blur-[130px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[40vw] h-[40vw] bg-amber-950/10 blur-[150px] rounded-full" />
      </div>

      {/* Global Navigation Header (Renders on all views, handles audio) */}
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Exhibition Transition wrapper using Framer Motion */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Elegant minimalist museum footer */}
      <footer className="relative z-10 border-t border-white/5 bg-black py-12 text-center text-neutral-600">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-sans font-medium">
              ADELANA.ART
            </p>
            <p className="text-[9px] tracking-wider text-neutral-600 mt-1">
              A bespoke contemporary fine art brand. All rights reserved © 2026.
            </p>
          </div>
          <div className="flex space-x-6 text-[9px] tracking-widest font-mono uppercase">
            <button 
              onClick={() => { setActiveSection("gallery"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-amber-300 transition-colors"
            >
              Exhibitions
            </button>
            <button 
              onClick={() => { setActiveSection("process"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-amber-300 transition-colors"
            >
              Process Atelier
            </button>
            <button 
              onClick={() => { setActiveSection("concierge"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-amber-300 transition-colors"
            >
              Collector Inquiry
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
