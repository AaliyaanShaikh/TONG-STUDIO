import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const articles = [
  {
    category: 'Recording',
    title: 'Getting Broadcast-Quality Sound',
    excerpt: 'Mic placement & booth tips for crisp, clear vocals.',
    date: 'Oct 12, 2024',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1200&auto=format&fit=crop',
    size: 'large' as const,
  },
  {
    category: 'Photoshoot',
    title: 'Cyclo Setup for Product & Portrait',
    excerpt: 'Behind our cyclorama and lighting for editorial shoots.',
    date: 'Sep 28, 2024',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop',
    size: 'medium' as const,
  },
  {
    category: 'Creators',
    title: 'Studio Rentals vs Location Shoots',
    excerpt: 'Why brands are choosing controlled studio spaces.',
    date: 'Sep 15, 2024',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1200&auto=format&fit=crop',
    size: 'medium' as const,
  },
  {
    category: 'Behind the Scenes',
    title: 'A Day in the Studio',
    excerpt: 'From setup to wrap—how we run a typical shoot day.',
    date: 'Aug 30, 2024',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
    size: 'small' as const,
  },
  {
    category: 'Gear',
    title: 'Essential Kit for Podcasters',
    excerpt: 'Our go-to mics, interfaces, and accessories.',
    date: 'Aug 18, 2024',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1560518883-3d1312f9c1be?q=80&w=1200&auto=format&fit=crop',
    size: 'small' as const,
  },
];

const StudioNotes: React.FC = () => {
  return (
    <section id="journal" className="bg-[#0d0d0d] py-16 sm:py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="mb-16 md:mb-20">
          <div className="h-px w-full bg-white/25 mb-8 md:mb-10" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl text-white tracking-tight font-semibold">
              Studio Notes
            </h3>
            <p className="font-sans mt-3 text-stone-400 font-medium max-w-md">
              Insights from our podcast booths, photo sets, and creator sessions.
            </p>
          </motion.div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-5">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`group cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden bg-stone-800 ${
                article.size === 'large'
                  ? 'md:col-span-7 md:row-span-2'
                  : article.size === 'medium'
                    ? 'md:col-span-5'
                    : 'md:col-span-6'
              }`}
            >
              <a href="#" className="block h-full">
                <div
                  className={`relative overflow-hidden ${
                    article.size === 'large'
                      ? 'h-[200px] sm:h-[240px] md:h-full min-h-[260px] md:min-h-[320px]'
                      : article.size === 'medium'
                        ? 'h-[160px] sm:h-[180px] md:h-[240px]'
                        : 'h-[140px] sm:h-[160px] md:h-[200px]'
                  }`}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover object-top transition-transform duration-600 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div
                    className={`absolute bottom-0 left-0 right-0 p-3 sm:p-5 md:p-6 ${
                      article.size === 'large' ? 'md:p-8' : ''
                    }`}
                  >
                    <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/70 font-medium">
                      {article.category}
                    </span>
                    <h3
                      className={`font-sans text-white mt-0.5 sm:mt-1 font-semibold leading-tight ${
                        article.size === 'large'
                          ? 'text-base sm:text-lg md:text-xl lg:text-2xl'
                          : article.size === 'medium'
                            ? 'text-sm sm:text-base md:text-lg'
                            : 'text-sm sm:text-base md:text-lg'
                      }`}
                    >
                      {article.title}
                    </h3>
                    {article.size === 'large' && (
                      <p className="text-stone-300 text-sm md:text-base mt-2 max-w-lg line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}
                    <span
                      className={`inline-flex items-center gap-1.5 mt-3 text-white/80 ${
                        article.size === 'large' ? 'text-sm' : 'text-xs'
                      }`}
                    >
                      <span>{article.date}</span>
                      <span className="text-white/40">·</span>
                      <span>{article.readTime}</span>
                    </span>
                  </div>
                </div>
                {article.size !== 'large' && (
                  <div className="p-3 sm:p-4 md:p-5">
                    <p className="text-stone-400 text-sm line-clamp-2">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 mt-3 text-white/90 text-xs font-medium group-hover:text-white transition-colors">
                      Read <ArrowUpRight size={12} strokeWidth={2} />
                    </span>
                  </div>
                )}
              </a>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-600 text-stone-300 hover:text-white hover:border-white/50 text-sm font-medium transition-colors"
          >
            View All Articles <ArrowUpRight size={14} strokeWidth={2} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default StudioNotes;
