import React, { useRef } from 'react';
import { FEATURED_STUDIOS } from '../constants/FeaturedConstants';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const StudioShowcase: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section id="spaces" ref={targetRef} className="relative h-[400vh] bg-white text-charcoal-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-24 left-6 md:left-24 z-10 pointer-events-none">
          <span className="text-champagne-600 uppercase tracking-[0.2em] text-xs font-bold mb-2 block">Our Spaces</span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900">Studio & Sets</h2>
        </div>

        <motion.div style={{ x }} className="flex gap-20 px-6 md:px-24 items-center pt-32">
          <div className="flex-shrink-0 w-[80vw] md:w-[25vw] flex flex-col justify-center">
            <h3 className="font-serif text-6xl md:text-8xl leading-[0.9] mb-12 text-charcoal-900">
              Built <br /> for <span className="italic text-stone-400">Creators</span>
            </h3>
            <p className="text-stone-500 font-medium text-lg mb-12 max-w-sm leading-relaxed">
              Podcast booths, photo sets, and versatile spaces for every kind of project. Professional gear, flexible booking, and a team that helps you get the best result.
            </p>
            <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-champagne-600 font-bold">
              <div className="h-[2px] w-12 bg-champagne-600" />
              <span>Swipe to View</span>
            </div>
          </div>

          {FEATURED_STUDIOS.map((studio, index) => (
            <div
              key={studio.id}
              className="group relative flex-shrink-0 w-[85vw] md:w-[50vw] h-[70vh] cursor-pointer"
            >
              <div className="w-full h-full overflow-hidden relative bg-stone-100 shadow-xl">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  src={studio.imageUrl}
                  alt={studio.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-0 right-0 p-8 text-8xl font-serif text-white/40 font-bold z-10">
                  0{index + 1}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 bg-white/90 backdrop-blur-sm transform translate-y-1/2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="font-serif text-4xl md:text-5xl text-charcoal-900 mb-2">
                      {studio.title}
                    </h4>
                    <p className="text-sm uppercase tracking-widest text-stone-500 mb-4 font-bold">{studio.location}</p>
                    <div className="flex gap-4 text-charcoal-800 text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      <span>Capacity {studio.capacity}</span>
                      <span className="w-px h-3 bg-stone-300" />
                      <span>{studio.sqft.toLocaleString()} Sq Ft</span>
                    </div>
                  </div>
                  <div className="text-2xl font-serif italic text-champagne-600">
                    {studio.price}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex-shrink-0 w-[80vw] md:w-[30vw] flex flex-col justify-center items-center text-center group cursor-pointer"
          >
            <div className="w-32 h-32 rounded-full border border-stone-200 flex items-center justify-center hover:bg-charcoal-900 hover:text-white transition-all duration-500 shadow-lg">
              <ArrowUpRight size={48} className="text-charcoal-900 group-hover:text-white group-hover:rotate-45 transition-all duration-500" />
            </div>
            <p className="mt-8 font-serif text-3xl text-charcoal-900">Book a session</p>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default StudioShowcase;
