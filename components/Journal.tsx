import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const articles = [
  {
    category: 'Recording',
    title: 'Getting Broadcast-Quality Sound: Mic Placement & Booth Tips',
    excerpt: 'How we set up our sound-treated booths for podcasters who need crisp, clear vocals without the room tone.',
    date: 'Oct 12, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    category: 'Photoshoot',
    title: 'Cyclo Setup for Product & Portrait: What We Use on Set',
    excerpt: 'Behind our cyclorama, backdrops, and lighting setup for editorial and commercial shoots.',
    date: 'Sep 28, 2024',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
  {
    category: 'Creators',
    title: 'Why Brands Are Choosing Studio Rentals Over Location Shoots',
    excerpt: 'Flexibility, control, and professional gear—how studio spaces are changing the game for creators.',
    date: 'Sep 15, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
];

const Journal: React.FC = () => {
  const featured = articles.find((a) => a.featured);
  const others = articles.filter((a) => !a.featured);

  return (
    <section id="journal" className="bg-alabaster py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <span className="text-champagne-600 uppercase tracking-[0.2em] text-xs font-bold mb-3 block">
            From the Studio
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900 tracking-tight">
            Studio Journal
          </h2>
          <p className="mt-4 text-stone-500 font-medium max-w-xl">
            Tips, behind-the-scenes, and insights from our podcast booths, photo sets, and creator sessions.
          </p>
        </motion.div>

        {/* Featured Article */}
        {featured && (
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group cursor-pointer mb-12 md:mb-16"
          >
            <div className="overflow-hidden border-l-2 border-champagne-400 pl-6 md:pl-8">
              <div className="overflow-hidden h-[280px] md:h-[400px] w-full bg-stone-200 mb-6">
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.8 }}
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-champagne-600 uppercase tracking-widest font-bold mb-3">
                <span>{featured.category}</span>
                <span className="text-stone-300">·</span>
                <span>{featured.date}</span>
                <span className="text-stone-300">·</span>
                <span>{featured.readTime}</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal-900 group-hover:text-champagne-600 transition-colors leading-snug mb-3">
                {featured.title}
              </h3>
              <p className="text-stone-500 font-medium leading-relaxed max-w-2xl mb-4">
                {featured.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-charcoal-900 font-bold group-hover:text-champagne-600 transition-colors">
                Read Article <ArrowUpRight size={14} strokeWidth={2} />
              </span>
            </div>
          </motion.article>
        )}

        {/* Grid: Two smaller articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {others.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden mb-4 h-[220px] md:h-[260px] w-full bg-stone-200">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500"
                />
              </div>
              <div className="flex justify-between items-center text-xs text-champagne-600 uppercase tracking-widest mb-2 font-bold">
                <span>{article.category}</span>
                <span>{article.date}</span>
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-charcoal-900 group-hover:text-champagne-600 transition-colors leading-snug mb-2">
                {article.title}
              </h3>
              <p className="text-stone-500 text-sm font-medium leading-relaxed mb-4 line-clamp-2">
                {article.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-charcoal-900 font-bold group-hover:text-champagne-600 transition-colors">
                Read <ArrowUpRight size={12} strokeWidth={2} />
              </span>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-stone-200"
        >
          <button
            type="button"
            className="text-stone-500 hover:text-charcoal-900 text-xs uppercase tracking-widest transition-colors pb-2 border-b border-stone-200 hover:border-charcoal-900 font-bold"
          >
            View All Articles
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Journal;
