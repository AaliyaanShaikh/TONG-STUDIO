import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const EPISODES = [
  { id: '1', title: 'Red Flags, Green Flags - Why Modern Dating is Failing?', host: 'Dr Ali Fenwick', views: '1.5M views', duration: '45:20', image: 'https://images.unsplash.com/photo-1611162617213-7d7a3e9c0b9f?q=80&w=1200&auto=format&fit=crop', shareUrl: '#' },
  { id: '2', title: 'The Growth Mindset - Building Habits That Stick', host: 'Sarah Chen', views: '2.1M views', duration: '38:12', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1200&auto=format&fit=crop', shareUrl: '#' },
  { id: '3', title: 'Behind the Mic - Stories from the Studio', host: 'Bassem Youssef', views: '7.2M views', duration: '52:45', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop', shareUrl: '#' },
  { id: '4', title: 'Creators Unfiltered - The Future of Content', host: 'Danae Mercer', views: '4.8M views', duration: '41:08', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1200&auto=format&fit=crop', shareUrl: '#' },
  { id: '5', title: 'Sound & Vision - Studio Production Tips', host: 'Kayla Itsines', views: '15.7M views', duration: '28:33', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop', shareUrl: '#' },
];

const INITIAL_EPISODE_INDEX = 2;

const PodcastShowcase: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('article');
    const target = cards[INITIAL_EPISODE_INDEX];
    if (!target) return;
    const gap = 24;
    const paddingLeft = window.innerWidth * 0.11;
    const cardWidth = target.getBoundingClientRect().width;
    const card2Left = paddingLeft + INITIAL_EPISODE_INDEX * (cardWidth + gap);
    const scrollLeft = card2Left - (el.clientWidth - cardWidth) / 2;
    el.scrollLeft = Math.max(0, scrollLeft);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.querySelector('article');
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width + 24 : scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <section className="bg-white pt-40 md:pt-48 pb-32 md:pb-40 overflow-hidden">
      <div className="relative w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal-900 mb-12 md:mb-16 tracking-tight px-4 md:px-6"
        >
          Created in our podcast studios
        </motion.h2>

        <div className="relative overflow-hidden">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white border border-stone-200 shadow-xl flex items-center justify-center text-charcoal-900 hover:bg-stone-50 transition-colors md:left-4"
            aria-label="Scroll left"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white border border-stone-200 shadow-xl flex items-center justify-center text-charcoal-900 hover:bg-stone-50 transition-colors md:right-4"
            aria-label="Scroll right"
          >
            <ChevronRight size={28} />
          </button>

          <div
            ref={scrollRef}
            className="flex items-center gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory scroll-smooth pl-[11vw] pr-[11vw] overscroll-x-contain"
          >
            {EPISODES.map((episode, index) => (
              <React.Fragment key={episode.id}>
                <EpisodeCard episode={episode} index={index} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function EpisodeCard({
  episode,
  index,
}: {
  episode: (typeof EPISODES)[0];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="flex-shrink-0 w-[78vw] min-w-[78vw] max-w-[1100px] group cursor-pointer snap-center"
    >
      <a href={episode.shareUrl} className="block">
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-stone-200 shadow-lg">
          <img
            src={episode.image}
            alt={episode.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 pt-20">
            <h3 className="font-sans font-bold text-white text-xl md:text-2xl lg:text-3xl line-clamp-2 mb-2">
              {episode.title}
            </h3>
            <p className="text-white/95 text-sm md:text-base font-medium">
              {episode.host}
            </p>
            <p className="text-white/80 text-sm mt-0.5">
              {episode.views}
            </p>
          </div>
          <span className="absolute top-3 right-3 md:top-4 md:right-4 px-2.5 py-1 rounded bg-black/80 text-white text-sm font-medium tabular-nums">
            {episode.duration}
          </span>
        </div>
      </a>
    </motion.article>
  );
}

export default PodcastShowcase;
