import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

const SHOWCASE_ITEMS = [
  {
    id: '1',
    title: 'Podcast Sessions',
    description: 'Sound-treated booths and pro gear for crisp recordings.',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Photoshoot & Video',
    description: 'Cyclo, backdrops, and full production support.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Events & Workshops',
    description: 'Intimate launches and team recordings.',
    image: 'https://images.unsplash.com/photo-1540575467063-711bf3a8d1e8?q=80&w=1200&auto=format&fit=crop',
  },
];

const ShowcaseCard: React.FC<{
  item: (typeof SHOWCASE_ITEMS)[0];
  index: number;
}> = ({ item, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shadow = useMotionTemplate`${x}px ${y}px 40px -12px rgba(0,0,0,0.15)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.03);
    y.set((e.clientY - cy) * 0.03);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -12 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ boxShadow: shadow } as React.CSSProperties}
      className="group relative rounded-sm bg-white overflow-hidden border border-stone-200/80"
    >
      {/* Image container */}
      <div className="relative overflow-hidden aspect-[4/5] md:aspect-[3/4]">
        <motion.img
          src={item.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.08 }}
        />
        {/* Gradient overlay - visible on card hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        {/* Index badge */}
        <motion.span
          className="absolute top-5 left-5 font-serif text-4xl md:text-5xl font-bold text-white/90 leading-none z-10"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.3 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
        {/* Title on image (visible on hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="font-serif text-2xl md:text-3xl tracking-tight mb-2">
            {item.title}
          </h3>
          <p className="text-stone-200 text-sm md:text-base font-medium max-w-xs translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            {item.description}
          </p>
        </div>
        {/* Accent line - draws on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-champagne-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 z-10" />
      </div>

      {/* Text below - always visible */}
      <div className="p-5 md:p-6 border-t border-stone-100">
        <h3 className="font-serif text-xl md:text-2xl text-charcoal-900 tracking-tight mb-1.5 group-hover:text-champagne-600 transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-stone-500 text-sm font-medium leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
};

const ImageTextGrid: React.FC = () => {
  return (
    <section className="pt-0 pb-24 md:pb-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 text-center"
        >
          <motion.span
            className="text-champagne-600 uppercase tracking-[0.2em] text-xs font-bold mb-4 block"
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            The Studio
          </motion.span>
          <motion.h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal-900 leading-tight"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Showcase
          </motion.h2>
          <motion.div
            className="mx-auto mt-4 h-px w-16 bg-champagne-500/60"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 w-full">
          {SHOWCASE_ITEMS.map((item, index) => (
            <ShowcaseCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageTextGrid;
