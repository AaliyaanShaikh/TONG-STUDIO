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
      <div className="relative overflow-hidden rounded-2xl bg-stone-100">
        {/* Image */}
        <div className="aspect-[4/5] overflow-hidden rounded-2xl">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${item.image})` }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          {/* Large number */}
          <span className="absolute bottom-4 right-4 font-serif text-7xl md:text-8xl font-bold text-white/20 leading-none select-none">
            {item.number}
          </span>
        </div>

        {/* Content overlay (bottom of image) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <span className="text-champagne-400 text-[10px] uppercase tracking-[0.3em] font-medium">
            {item.number}
          </span>
          <h3 className="font-serif text-2xl md:text-3xl text-white mt-1 tracking-tight">
            {item.title}
          </h3>
        </div>
      </div>

      {/* Text below card */}
      <div className="mt-4 px-1">
        <p className="text-stone-500 text-sm md:text-base leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}

export default function ImageTextGrid() {
  return (
    <section className="pt-12 pb-28 md:pt-16 md:pb-40 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 md:mb-20"
        >
          <p className="text-champagne-600 uppercase tracking-[0.2em] text-xs font-bold mb-2">
            The Studio
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900 tracking-tight">
            Showcase
          </h2>
        </motion.header>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
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
