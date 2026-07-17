import { motion } from "motion/react";
import { ArrowRight, Eye, MessageSquare, ShieldCheck, Layers } from "lucide-react";
import { ARTWORKS } from "../data";
import { Artwork } from "../types";
import InteractiveArtworkImage from "./InteractiveArtworkImage";

interface MainGalleryProps {
  onSelectArtworkForWall: (artworkId: string) => void;
  onSelectArtworkForChat: (artworkId: string) => void;
  setActiveSection: (section: string) => void;
}

export default function MainGallery({
  onSelectArtworkForWall,
  onSelectArtworkForChat,
  setActiveSection,
}: MainGalleryProps) {
  
  const handleWallView = (id: string) => {
    onSelectArtworkForWall(id);
    setActiveSection("wall-view");
  };

  const handleConciergeChat = (id: string) => {
    onSelectArtworkForChat(id);
    setActiveSection("concierge");
  };

  return (
    <section className="min-h-screen bg-black text-white pt-24 pb-20" id="main-gallery">
      {/* Gallery Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="inline-block"
        >
          <span className="text-amber-500 font-mono text-xs tracking-[0.45em] uppercase mb-3 block">
            Exhibition I
          </span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="text-3xl md:text-5xl font-light tracking-[0.2em] uppercase font-sans mb-6"
        >
          Selected Masterpieces
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="max-w-2xl text-neutral-400 text-xs md:text-sm leading-relaxed tracking-wider font-light"
        >
          Move your pointer across each canvas to focus the gallery spotlight. Observe how the sculpted plaster shadows shift and how the hand-laid metal leaf activates, catching layers of light.
        </motion.p>
      </div>

      {/* Artwork Iterative Sections */}
      <div className="space-y-32 md:space-y-48">
        {ARTWORKS.map((art, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={art.id} 
              className="max-w-7xl mx-auto px-6"
              id={`gallery-block-${art.id}`}
            >
              <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20`}>
                
                {/* Visual Canvas (Framed in floating shadow) */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full lg:w-1/2 flex justify-center"
                >
                  <div className="relative bg-neutral-900 p-5 md:p-7 border border-neutral-800 shadow-[0_25px_70px_rgba(0,0,0,0.85)] max-w-md md:max-w-lg w-full">
                    <InteractiveArtworkImage 
                      imageSrc={art.imageSrc} 
                      title={art.title} 
                      className="w-full aspect-[3/4]"
                    />
                  </div>
                </motion.div>

                {/* Narrative Description & Meaning */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center text-left" id={`narrative-block-${art.id}`}>
                  {/* Artwork Index Number */}
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-amber-500/40 font-mono text-3xl tracking-widest font-extralight block mb-2"
                  >
                    0{index + 1}
                  </motion.span>

                  {/* Title and Meta */}
                  <motion.h3
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="text-2xl md:text-3xl font-light tracking-[0.18em] uppercase font-sans text-white mb-2"
                  >
                    {art.title}
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="flex flex-wrap gap-x-4 gap-y-1 text-[9px] tracking-widest text-neutral-400 font-mono uppercase mb-6"
                  >
                    <span>{art.dimensions}</span>
                    <span className="text-neutral-700">•</span>
                    <span>Series of {art.seriesSize}</span>
                    <span className="text-neutral-700">•</span>
                    <span className={art.status === "Available" ? "text-amber-400" : art.status === "Collected" ? "text-neutral-500" : "text-amber-200"}>
                      {art.status}
                    </span>
                  </motion.div>

                  {/* Story & Meaning */}
                  <div className="space-y-6 text-sm leading-relaxed text-neutral-300 font-light tracking-wide mb-8">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    >
                      <h4 className="text-[10px] uppercase tracking-[0.25em] text-amber-500 font-mono mb-2">The Story</h4>
                      <p className="text-neutral-300">{art.story}</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.6 }}
                    >
                      <h4 className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-mono mb-2">Philosophical Meaning</h4>
                      <p className="text-neutral-400">{art.meaning}</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.7 }}
                    >
                      <h4 className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-mono mb-2">Medium Details</h4>
                      <p className="text-neutral-400 font-serif italic text-xs">{art.materials}</p>
                    </motion.div>
                  </div>

                  {/* Action Navigation triggers */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    className="flex flex-wrap gap-4 pt-4 border-t border-white/5"
                    id={`actions-${art.id}`}
                  >
                    {/* Hang on wall */}
                    <button
                      onClick={() => handleWallView(art.id)}
                      className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-850 text-neutral-300 hover:text-white border border-white/5 hover:border-amber-500/30 py-2.5 px-5 text-[10px] uppercase tracking-[0.2em] transition-all duration-300"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-500" />
                      View on Wall
                    </button>

                    {/* Dialogue with concierge */}
                    <button
                      onClick={() => handleConciergeChat(art.id)}
                      className="flex items-center gap-2 bg-neutral-950 hover:bg-neutral-900 text-neutral-300 hover:text-amber-200 border border-neutral-800 hover:border-amber-500/20 py-2.5 px-5 text-[10px] uppercase tracking-[0.2em] transition-all duration-300"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                      Inquire / Dialog
                    </button>
                  </motion.div>

                  {/* Certificate authenticity signet */}
                  <div className="flex items-center gap-2 mt-6 text-[9px] tracking-widest text-neutral-500 font-mono uppercase">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500/40" />
                    <span>Includes Registered Certificate of Authenticity</span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
