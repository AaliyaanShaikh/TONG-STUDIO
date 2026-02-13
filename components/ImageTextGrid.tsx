import React from "react";
import { motion } from "framer-motion";

const SHOWCASE_ITEMS = [
  {
    id: "1",
    number: "01",
    title: "Podcast Sessions",
    description: "Sound-treated booths and pro gear for crisp recordings.",
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "2",
    number: "02",
    title: "Photoshoot & Video",
    description: "Cyclo, backdrops, and full production support.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "3",
    number: "03",
    title: "Events & Workshops",
    description: "Intimate launches and team recordings.",
    image:
      "https://images.unsplash.com/photo-1540575467063-711bf3a8d1e8?q=80&w=1200&auto=format&fit=crop",
  },
];

const stagger = {
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  hidden: {},
};

const cardReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function Card({
  item,
  index,
}: {
  item: (typeof SHOWCASE_ITEMS)[0];
  index: number;
}) {
  return (
    <motion.article
      variants={cardReveal}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-stone-100">
        {/* Image - 3:4 aspect for good height while fitting 3-up */}
        <div className="aspect-[3/4] overflow-hidden rounded-xl sm:rounded-2xl">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${item.image})` }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/20 to-transparent" />
          {/* Large number */}
          <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4 font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white/25 leading-none select-none">
            {item.number}
          </span>
        </div>

        {/* Content overlay (bottom of image) */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 lg:p-8">
          <span className="text-champagne-400 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-medium hidden sm:inline">
            {item.number}
          </span>
          <h3 className="font-serif text-sm sm:text-xl md:text-2xl lg:text-3xl text-white mt-0.5 sm:mt-1 font-semibold tracking-tight leading-tight line-clamp-2 sm:line-clamp-none">
            {item.title}
          </h3>
        </div>
      </div>

      {/* Text below card */}
      <div className="mt-3 sm:mt-4 px-0">
          <p className="font-sans text-stone-500 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 sm:line-clamp-none">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}

export default function ImageTextGrid() {
  return (
    <section className="pt-8 sm:pt-12 pb-16 sm:pb-28 md:pt-16 md:pb-40 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-14 md:mb-20"
        >
          <p className="text-champagne-600 uppercase tracking-[0.2em] text-xs font-bold mb-2">
            The Studio
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal-900 tracking-tight">
            Showcase
          </h2>
        </motion.header>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-10"
        >
          {SHOWCASE_ITEMS.map((item, index) => (
            <React.Fragment key={item.id}>
              <Card item={item} index={index} />
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
