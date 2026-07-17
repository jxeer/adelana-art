import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Hammer, Sparkles, Paintbrush, ShieldAlert, ArrowRight, Eye } from "lucide-react";
import { CREATION_STEPS } from "../data";

export default function ProcessAtelier() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = CREATION_STEPS[activeStepIndex];

  // Specific visual indicators for each step
  const stepVisuals = [
    { label: "Concept drafting", detail: "Sketches, notes, and compositional studies prepared for the work." },
    { label: "Material exploration", detail: "Reference studies and surface tests to shape the piece's tone and texture." },
    { label: "Structure and layout", detail: "Planning the work's balance, rhythm, and spatial relationships." },
    { label: "Surface preparation", detail: "Preparing the support and foundational layers for the final composition." },
    { label: "Textural development", detail: "Layering and shaping tactile elements to build depth and presence." },
    { label: "Color and tone", detail: "Working with pigment, light, and atmosphere to guide the visual experience." },
    { label: "Finishing details", detail: "Refining the surface and adding the final accents that define the work." },
    { label: "Protective finishing", detail: "Applying a final seal or protective finish for longevity and stability." },
    { label: "Presentation", detail: "Preparing the work for display, framing, and installation." }
  ];

  const materialList = [
    { name: "Fine Gold Leaf", type: "Gilding", origin: "To be confirmed with the artist" },
    { name: "Fine Mineral Powder", type: "Sculptural Texture", origin: "To be confirmed with the artist" },
    { name: "Textural Mineral Aggregate", type: "Surface Texture", origin: "To be confirmed with the artist" },
    { name: "Fine Linen Support", type: "Canvas Base", origin: "To be confirmed with the artist" }
  ];

  return (
    <section className="min-h-screen bg-black text-white pt-24 pb-20" id="creation-process">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center lg:text-left mb-16">
          <span className="text-amber-500 font-mono text-xs tracking-[0.45em] uppercase mb-3 block">
            The Process
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-[0.2em] uppercase font-sans mb-6">
            Handcrafted Mastery
          </h2>
          <p className="max-w-2xl text-neutral-400 text-xs md:text-sm leading-relaxed tracking-wider font-light">
            We do not sell digital prints. Every piece represents a massive physical undertaking. Explore the 9-step sequence that translates generative concepts into tactile, textured, museum-grade fine art on canvas.
          </p>
        </div>

        {/* Dynamic Process Timeline layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="process-timeline-layout">
          
          {/* Left: 9-Step vertical stepper menu */}
          <div className="lg:col-span-5 flex flex-col space-y-3 pr-4 border-r border-white/5" id="stepper-menu">
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-mono mb-2 px-2 uppercase">
              Atelier Stages
            </span>
            {CREATION_STEPS.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              return (
                <button
                  key={step.phase}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`text-left p-4 rounded-[1px] border transition-all duration-500 group flex items-start gap-4 ${
                    isActive
                      ? "bg-neutral-900/60 border-amber-500 text-white"
                      : "bg-transparent border-transparent text-neutral-500 hover:text-neutral-300 hover:bg-neutral-950/40"
                  }`}
                  id={`stepper-btn-${idx}`}
                >
                  <span className={`font-mono text-xs tracking-widest ${isActive ? "text-amber-400" : "text-neutral-600 group-hover:text-neutral-400"}`}>
                    0{idx + 1}
                  </span>
                  <div className="overflow-hidden">
                    <p className={`text-[10px] tracking-widest font-mono uppercase mb-0.5 ${isActive ? "text-amber-500" : "text-neutral-500"}`}>
                      {step.phase}
                    </p>
                    <p className="text-[11px] md:text-xs tracking-wider uppercase font-sans font-light">
                      {step.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed active step card with animations */}
          <div className="lg:col-span-7 flex flex-col justify-between" id="active-step-card-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStepIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-neutral-950 border border-white/5 p-8 md:p-10 flex-grow flex flex-col justify-between"
                id="active-step-detail-card"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <span className="text-amber-400 font-mono text-[11px] tracking-[0.35em] uppercase">
                      {activeStep.phase}
                    </span>
                    <span className="text-neutral-600 font-mono text-[9px] tracking-widest uppercase">
                      Adelana Art Atelier
                    </span>
                  </div>

                  <h3 className="text-2xl font-light tracking-widest uppercase font-sans text-white mb-4">
                    {activeStep.title}
                  </h3>

                  <p className="text-sm text-neutral-300 leading-relaxed font-light tracking-wide mb-8">
                    {activeStep.description}
                  </p>
                </div>

                {/* Behind the Scenes technical specs */}
                <div className="border-t border-white/5 pt-6 space-y-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-mono block mb-1">
                      Physical Medium & Materials
                    </span>
                    <p className="text-xs text-neutral-400 leading-relaxed font-light font-serif italic">
                      {stepVisuals[activeStepIndex].detail}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] tracking-widest text-neutral-500 font-mono uppercase">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                    <span>In-Studio Practice</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Materials Table Panel */}
        <div className="mt-20 bg-neutral-950 border border-white/5 p-6 md:p-8" id="materials-atelier-panel">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-white/5 pb-6">
            <div>
              <h3 className="text-lg font-light tracking-widest uppercase text-white font-sans">
                Authentic Raw Materials
              </h3>
              <p className="text-xs text-neutral-500 font-light tracking-wider mt-1">
                Every material is hand-selected for its chemical longevity and light-refraction indexes.
              </p>
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-mono border border-amber-500/20 py-1.5 px-3">
              MUSEUM ARCHIVAL STATUS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {materialList.map((mat) => (
              <div key={mat.name} className="border border-white/5 p-4 bg-neutral-900/35">
                <span className="text-[8px] font-mono text-neutral-500 uppercase block mb-1">
                  {mat.type}
                </span>
                <h4 className="text-xs tracking-wider uppercase text-amber-100 font-sans mb-1">
                  {mat.name}
                </h4>
                <p className="text-[10px] text-neutral-400 leading-relaxed font-light">
                  {mat.origin}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
