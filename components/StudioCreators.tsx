import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CREATORS = [
  {
    id: '1',
    name: 'Kayla Itsines',
    followers: '15.7M',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Bassem Youssef',
    followers: '7.2M',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Farhana Bodi',
    followers: '2.1M',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Danae Mercer',
    followers: '4.8M',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'DJ Bliss',
    followers: '3.5M',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '6',
    name: 'Sarah Chen',
    followers: '1.2M',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop',
  },
];

const StudioCreators: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 240;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="bg-charcoal-950 mt-0 mb-24 md:mb-32 py-12 md:py-16 overflow-hidden">
      <div className="w-full px-6 md:px-24">
        <div className="mb-12 md:mb-16">
          <div className="h-px w-full bg-white/25 mt-6 md:mt-8 mb-8 md:mb-10" />
          <div className="flex items-center justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-sans text-xl md:text-2xl lg:text-3xl font-semibold text-white tracking-tight max-w-2xl"
            >
              You've seen our studios everywhere
            </motion.h2>
            <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={28} />
            </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {CREATORS.map((creator, index) => (
            <React.Fragment key={creator.id}>
              <VideoCard creator={creator} index={index} />
            </React.Fragment>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 md:mt-24 mb-8 md:mb-12 rounded-2xl overflow-hidden border border-white/10 shadow-xl"
        >
          <div
            className="relative py-16 md:py-20 px-8 md:px-16 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1920&auto=format&fit=crop")',
            }}
          >
            <div className="absolute inset-0 bg-charcoal-950/70" />
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <h3 className="font-sans text-2xl md:text-3xl font-semibold text-white mb-6">
                Ready to get started?
              </h3>
              <button
                type="button"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-lg font-sans font-semibold text-white text-sm uppercase tracking-wider transition-transform hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(90deg, #e07c3c 0%, #d84315 100%)',
                }}
              >
                Check availability
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

function VideoCard({
  creator,
  index,
}: {
  creator: (typeof CREATORS)[0];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="flex-shrink-0 w-[180px] md:w-[220px] group cursor-pointer"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="rounded-2xl overflow-hidden bg-charcoal-900/50">
        <div className="aspect-[9/16] overflow-hidden relative">
          <video
            src={creator.video}
            poster={creator.thumbnail}
            muted
            loop
            playsInline
            autoPlay
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
        <div className="p-3 md:p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border-2 border-white/20">
            <img
              src={creator.thumbnail}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h3 className="font-sans font-semibold text-white text-sm md:text-base truncate">
              {creator.name}
            </h3>
            <p className="text-stone-400 text-xs md:text-sm">
              {creator.followers} Followers
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default StudioCreators;
