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
  backgroundColor?: string;
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
    img: "https://images.unsplash.com/photo-1560518883-3d1312f9c1be?q=80&w=2574&auto=format&fit=crop",
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
  backgroundColor = "#ffffff",
  descriptionTemplate = "An immersive exploration into the depths of {title} aesthetics.",
  buttonText = "Explore Collection",
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="services" className="bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-12 md:pt-16 pb-4">
        <span className="text-champagne-600 uppercase tracking-[0.2em] text-xs font-bold mb-2 block">
          What We Offer
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900 tracking-tight">
          Services
        </h2>
      </div>
      <div
        className="h-[90vh] min-h-[500px] flex flex-col md:flex-row overflow-hidden"
        style={{ backgroundColor }}
      >
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.32, 0.72, 0, 1] }}
          className="relative h-full border-r border-white/20 group overflow-hidden cursor-pointer min-w-0"
          style={{
            flex: activeIndex === i ? 3 : 1,
            transition: "flex 0.6s cubic-bezier(0.32, 0.72, 0, 1)",
          }}
          onHoverStart={() => setActiveIndex(i)}
          onHoverEnd={() => setActiveIndex(null)}
        >
          <div className="absolute inset-0 bg-black">
            <img
              src={item.img}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]"
              alt={item.title}
            />
          </div>

          {/* Shine overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] pointer-events-none" />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Index badge */}
          <motion.span
            className="absolute top-6 left-6 text-white/40 text-sm font-mono tabular-nums"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 + 0.2 }}
          >
            {String(i + 1).padStart(2, "0")}
          </motion.span>

          {/* Vertical Text (Default) */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
            <h3 className="text-white text-2xl font-bold tracking-widest rotate-[-90deg] whitespace-nowrap drop-shadow-lg">
              {item.title}
            </h3>
          </div>

          {/* Expanded Content */}
          <motion.div
            className="absolute bottom-0 left-0 p-8 md:p-12 w-full"
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 md:mb-4 drop-shadow-md">
              {item.title}
            </h2>
            <p className="text-white/80 max-w-sm text-sm md:text-base leading-relaxed">
              {item.description ??
                descriptionTemplate.replace("{title}", item.title.toLowerCase())}
            </p>
            <motion.button
              className="group/btn mt-5 md:mt-6 flex items-center gap-2 text-white border-b-2 border-white/80 pb-1 font-medium hover:border-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
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
    </section>
  );
};

export default ServicesSection;
