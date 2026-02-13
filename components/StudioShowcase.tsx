import React, { useRef } from 'react';
import { FEATURED_STUDIOS } from '../constants/FeaturedConstants';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface StudioShowcaseProps {
  onOpenBooking?: () => void;
}

const StudioShowcase: React.FC<StudioShowcaseProps> = ({ onOpenBooking }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section id="spaces" ref={targetRef} className="relative h-[250vh] sm:h-[320vh] md:h-[400vh] bg-white text-charcoal-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-28 sm:top-32 md:top-28 left-4 sm:left-6 md:left-24 z-10 pointer-events-none">
          <span className="text-champagne-600 uppercase tracking-[0.2em] text-[10px] sm:text-xs font-bold mb-1 sm:mb-2 block">Our Spaces</span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal-900">Studio & Sets</h2>
        </div>

        <motion.div style={{ x }} className="flex gap-8 sm:gap-12 md:gap-20 px-4 sm:px-6 md:px-24 items-center pt-16 sm:pt-24 md:pt-24">
          <div className="flex-shrink-0 w-[65vw] sm:w-[75vw] md:w-[25vw] flex flex-col justify-center">
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[0.9] mb-4 sm:mb-8 md:mb-12 text-charcoal-900">
              Built <br /> for <span className="italic text-stone-400">Creators</span>
            </h3>
            <p className="text-stone-500 font-medium text-sm sm:text-base mb-4 sm:mb-8 md:mb-12 max-w-sm leading-relaxed">
              Podcast booths, photo sets, and versatile spaces for every kind of project. Professional gear, flexible booking, and a team that helps you get the best result.
            </p>
            <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs uppercase tracking-widest text-champagne-600 font-bold">
              <div className="h-[2px] w-8 sm:w-12 bg-champagne-600" />
              <span>Swipe to View</span>
            </div>
          </div>

          {FEATURED_STUDIOS.map((studio, index) => (
            <div
              key={studio.id}
              className="group relative flex-shrink-0 w-[72vw] sm:w-[78vw] md:w-[42vw] h-[45vh] sm:h-[52vh] md:h-[58vh] cursor-pointer"
            >
              <div className="w-full h-full overflow-hidden relative bg-stone-100 shadow-xl">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  src={studio.imageUrl}
                  alt={studio.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-0 right-0 p-4 sm:p-6 md:p-8 text-3xl sm:text-4xl md:text-5xl font-serif text-white/40 font-bold z-10">
                  0{index + 1}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-3 sm:p-6 md:p-8 lg:p-12 bg-white/90 backdrop-blur-sm transform translate-y-1/2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-1 sm:gap-2">
                  <div className="min-w-0">
                    <h4 className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl text-charcoal-900 mb-1 sm:mb-2">
                      {studio.title}
                    </h4>
                    <p className="text-[10px] sm:text-sm uppercase tracking-widest text-stone-500 mb-2 sm:mb-4 font-bold">{studio.location}</p>
                    <div className="flex gap-4 text-charcoal-800 text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      <span>Capacity {studio.capacity}</span>
                      <span className="w-px h-3 bg-stone-300" />
                      <span>{studio.sqft.toLocaleString()} Sq Ft</span>
                    </div>
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-serif italic text-champagne-600 shrink-0">
                    {studio.price}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => onOpenBooking?.()}
            className="flex-shrink-0 w-[65vw] sm:w-[75vw] md:w-[30vw] flex flex-col justify-center items-center text-center group cursor-pointer touch-manipulation"
          >
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border border-stone-200 flex items-center justify-center hover:bg-charcoal-900 hover:text-white transition-all duration-500 shadow-lg">
              <ArrowUpRight className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-charcoal-900 group-hover:text-white group-hover:rotate-45 transition-all duration-500" />
            </div>
            <p className="mt-4 sm:mt-6 md:mt-8 font-serif text-base sm:text-lg md:text-xl text-charcoal-900">Book a session</p>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default StudioShowcase;
