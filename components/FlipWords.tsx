import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = ['Podcasts', 'Viral Videos', 'Masterclasses'];
const ROTATE_INTERVAL_MS = 1600;

const FlipWords: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="pt-36 pb-0 md:pt-52 bg-white overflow-hidden">
      <div className="container mx-auto px-6 w-full flex justify-center">
        <div className="font-serif text-4xl md:text-6xl lg:text-7xl text-charcoal-900 leading-tight tracking-tight flex flex-wrap items-center justify-start gap-x-2 text-left">
          {/* Fixed text – never moves */}
          <span className="inline-block shrink-0">We help you create</span>
          {/* Scroll word container – word scrolls up into view, left-aligned */}
          <span className="relative inline-flex overflow-hidden align-middle h-[1.15em] min-w-[240px] md:min-w-[320px] lg:min-w-[400px] justify-start items-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={index}
                initial={{ y: '50%', opacity: 0.6 }}
                animate={{ y: '-50%', opacity: 1 }}
                exit={{ y: '-150%', opacity: 0.6 }}
                transition={{
                  duration: 0.5,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="inline-block text-champagne-600 font-semibold whitespace-nowrap absolute left-0 top-1/2"
              >
                {WORDS[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
      </div>
    </section>
  );
};

export default FlipWords;
