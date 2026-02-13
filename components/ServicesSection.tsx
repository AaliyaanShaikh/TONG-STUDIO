"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SlicedItem {
  title: string;
  img: string;
  description?: string;
}

interface ServicesSectionProps {
  items?: SlicedItem[];
  descriptionTemplate?: string;
  buttonText?: string;
}

const defaultItems: SlicedItem[] = [
  {
    title: "PODCAST STUDIO",
    img: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=2574&auto=format&fit=crop",
    description: "Sound-treated booths and pro mics for crisp, clear recordings.",
  },
  {
    title: "PHOTOSHOOT",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop",
    description: "Cyclorama, backdrops, and natural light for stills and video.",
  },
  {
    title: "VIDEO & CONTENT",
    img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2574&auto=format&fit=crop",
    description: "Full production support for reels, interviews, and campaigns.",
  },
  {
    title: "EVENTS & WORKSHOPS",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2669&auto=format&fit=crop",
    description: "Intimate launches, workshops, and team recordings.",
  },
];

const ServicesSection: React.FC<ServicesSectionProps> = ({
  items = defaultItems,
  descriptionTemplate = "An immersive exploration into the depths of {title} aesthetics.",
  buttonText = "Explore Collection",
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="services" className="bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pt-6 sm:pt-8 md:pt-12 pb-0">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-12"
        >
          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl text-white tracking-tight font-semibold">
            What We Offer
          </h2>
          <p className="font-sans mt-3 text-stone-400 font-medium max-w-md">
            Podcast studios, photoshoots, video production, and events — all under one roof.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-8">
        <div className="h-[70vh] min-h-[320px] sm:min-h-[420px] flex flex-col md:flex-row gap-3 overflow-hidden rounded-2xl">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.32, 0.72, 0, 1] }}
              className="relative h-full rounded-xl group cursor-pointer min-w-0 flex items-center justify-center"
              style={{
                flex: activeIndex === i ? 3 : 1,
                transition: "flex 0.6s cubic-bezier(0.32, 0.72, 0, 1)",
              }}
              onHoverStart={() => setActiveIndex(i)}
              onHoverEnd={() => setActiveIndex(null)}
            >
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-black">
                  <img
                    src={item.img}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    alt={item.title}
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] pointer-events-none" />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <motion.span
                  className="absolute top-5 left-5 text-white/30 text-sm font-mono tabular-nums"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.2 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>
              </div>

              {/* Mobile: horizontal text on left */}
              <div className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 z-10 pr-4 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none md:hidden">
                <h3 className="font-sans text-white/90 text-sm sm:text-base font-bold tracking-widest whitespace-nowrap">
                  {item.title}
                </h3>
              </div>
              {/* Desktop: original vertical text centered at bottom */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 px-2 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none hidden md:block">
                <h3
                  className="font-sans text-white/90 text-base md:text-xl font-bold tracking-widest"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                >
                  {item.title}
                </h3>
              </div>

              <motion.div
                className="absolute bottom-0 left-0 p-6 md:p-10 w-full z-20"
                initial={false}
                animate={{
                  y: activeIndex === i ? 0 : 12,
                  opacity: activeIndex === i ? 1 : 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: activeIndex === i ? 0.1 : 0,
                  ease: [0.32, 0.72, 0, 1],
                }}
              >
                <h2 className="font-sans text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3">
                  {item.title}
                </h2>
                <p className="font-sans text-stone-400 max-w-sm text-sm md:text-base leading-relaxed">
                  {item.description ??
                    descriptionTemplate.replace("{title}", item.title.toLowerCase())}
                </p>
                <motion.button
                  className="group/btn mt-4 md:mt-5 flex items-center gap-2 text-white border-b-2 border-white/60 pb-1 font-medium hover:border-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d]"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>{buttonText}</span>
                  <ArrowRight size={18} strokeWidth={2} className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1" />
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
