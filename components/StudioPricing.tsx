import React, { useState } from 'react';
import { motion } from 'framer-motion';

const slots = [
  {
    id: '2h',
    hours: 2,
    rate: 6000,
    tag: 'Quick session',
    details: 'Our minimum booking. Perfect for single podcast episodes, headshots, or short content shoots. Includes full access to sound-treated booths, professional mics, and basic lighting.',
  },
  {
    id: '4h',
    hours: 4,
    rate: 10000,
    tag: 'Half day',
    details: 'Ideal for multi-episode recordings, product photoshoots, or interview series. Extended access to cyclorama, backdrops, and full production support.',
  },
  {
    id: '12h',
    hours: 12,
    rate: 30000,
    tag: 'Full day',
    details: 'Best for brand campaigns, full-day shoots, and workshops. Dedicated studio space with priority equipment, crew support, and flexible setup changes.',
  },
  {
    id: '24h',
    hours: 24,
    rate: 60000,
    tag: 'Extended',
    details: 'Unlimited access for multi-day projects, events, or intensive production. Full studio takeover with 24/7 access, all equipment, and dedicated support.',
  },
];

const StudioPricing: React.FC = () => {
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);

  return (
    <section id="pricing" className="bg-alabaster py-16 sm:py-24 md:py-32 border-t border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-20">
          <div>
            <span className="font-sans text-champagne-600 uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Booking Options</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal-900 mb-4 sm:mb-6 leading-tight">Studio Timings. <br/> Flexible Rates.</h2>
            <p className="font-sans text-stone-500 font-medium leading-relaxed max-w-md text-base">
              Book our studio for the duration that works for you. Minimum 2 hours to get started.
            </p>
          </div>

          <div className="flex flex-col">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className="group border-b border-stone-200 py-8 cursor-pointer relative"
                onMouseEnter={() => setHoveredSlot(slot.id)}
                onMouseLeave={() => setHoveredSlot(null)}
              >
                <div className="flex justify-between items-baseline z-10 relative">
                  <h3 className="font-serif text-xl md:text-2xl text-stone-400 group-hover:text-charcoal-900 transition-colors duration-300">
                    {slot.hours} hours
                  </h3>
                  <span className="font-sans text-xs md:text-sm text-stone-500 group-hover:text-champagne-600 transition-colors uppercase tracking-widest font-bold">
                    {slot.tag}
                  </span>
                </div>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: hoveredSlot === slot.id ? 'auto' : 0,
                    opacity: hoveredSlot === slot.id ? 1 : 0
                  }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 text-charcoal-700 font-medium space-y-3">
                    <p className="font-serif text-lg md:text-xl text-charcoal-900">₹{slot.rate.toLocaleString('en-IN')}</p>
                    <p className="font-sans text-sm md:text-base leading-relaxed">{slot.details}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioPricing;
