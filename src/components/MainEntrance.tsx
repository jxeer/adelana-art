import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { ARTWORKS } from "../data";

interface MainEntranceProps {
  onEnter: () => void;
}

export default function MainEntrance({ onEnter }: MainEntranceProps) {
  // Use Aethelgard as the centerpiece
  const centerpiece = ARTWORKS[0];

  return (
    <section className="relative min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden pt-20" id="main-entrance">
      {/* Background shadow & lighting mood */}
      <div className="absolute inset-0 bg-radial-gradient from-neutral-950 via-black to-black opacity-90 z-0" />

      {/* Subtle glowing backlight behind the art */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-amber-500/3 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Top Margin/Spacer */}
      <div className="h-4" />

      {/* Centered Masterpiece Hero Card */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 flex-grow justify-center py-8">
        {/* Frame Presentation of Piece */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative group cursor-pointer"
          onClick={onEnter}
          id="hero-artwork-frame"
        >
          {/* Shadow behind the float frame */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/10 to-transparent blur-xl opacity-40 group-hover:opacity-60 transition duration-1000" />
          
          {/* Wooden float frame */}
          <div className="relative bg-neutral-900 p-6 md:p-8 shadow-[0_30px_100px_rgba(0,0,0,0.9)] border border-neutral-800">
            {/* The actual canvas with drop shadow shadow-gap */}
            <div className="relative bg-black border border-black shadow-[inset_0_0_15px_rgba(0,0,0,0.9)] overflow-hidden">
              <img
                src={centerpiece.imageSrc}
                alt={centerpiece.title}
                referrerPolicy="no-referrer"
                className="w-72 h-96 md:w-96 md:h-[500px] object-cover filter brightness-[0.88] hover:brightness-100 transition-all duration-[2000ms] ease-out select-none"
              />
              
              {/* Overlay shadow gap */}
              <div className="absolute inset-0 pointer-events-none border border-black/80" />
            </div>
            
            {/* Little copper museum brass plaque plate below */}
            <div className="flex justify-center mt-4">
              <div className="bg-gradient-to-r from-amber-600/25 via-amber-500/20 to-amber-600/25 border border-amber-600/30 px-4 py-1 text-center shadow-inner rounded-[1px]">
                <p className="text-[9px] tracking-[0.2em] uppercase text-amber-200/90 font-mono">
                  Adelana • {centerpiece.title} • {centerpiece.year}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Branding & Opening Dialogue */}
        <div className="flex flex-col items-start max-w-md text-left" id="entrance-text-block">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <span className="text-amber-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-4 block">
              Now Exhibiting
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-4xl md:text-5xl font-light tracking-[0.15em] text-white leading-tight uppercase font-sans mb-6"
          >
            The Soul <br />
            <span className="font-serif italic text-amber-100/90 tracking-wide text-3xl md:text-4xl">
              of Mixed Media
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="text-neutral-400 text-sm leading-relaxed tracking-wide mb-8 font-light"
          >
            Adelana is not simply an art collection. It is a luxury fine art experience where deep neural-network conception fuses with physical sculpting, gesso brushwork, and 24k gold leaf gilding. 
            <br />
            <br />
            Walk into an intimate, quiet space of slow movement, deep charcoal canvases, and carefully controlled light.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onEnter}
            className="group flex items-center gap-4 bg-transparent border border-amber-500/40 hover:border-amber-400/95 py-3.5 px-8 text-xs uppercase tracking-[0.3em] text-amber-200 hover:text-white transition-all duration-500"
            id="enter-exhibition-btn"
          >
            Enter Exhibition
            <ArrowDown className="w-3.5 h-3.5 text-amber-500 group-hover:translate-y-1 transition-transform duration-300" />
          </motion.button>
        </div>
      </div>

      {/* Elegant Footer Details */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-8 flex flex-col md:flex-row items-center justify-between text-[10px] tracking-[0.25em] text-neutral-500 uppercase font-mono border-t border-white/5 bg-black/40">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mb-4 md:mb-0"
        >
          Curator Code: <span className="text-amber-500/80 font-semibold">Julian</span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
          className="text-center mb-4 md:mb-0"
        >
          [ Experience is best with sound enabled ]
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.9 }}
          className="text-right"
        >
          MUSEUM OPEN • EST. 2026
        </motion.div>
      </div>
    </section>
  );
}
