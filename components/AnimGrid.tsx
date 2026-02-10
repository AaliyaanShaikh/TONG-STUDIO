import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    id: "slide-1",
    title: "Create",
    subtitle: "Studio spaces built for makers",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1920&auto=format&fit=crop",
    zIndex: 1,
  },
  {
    id: "slide-2",
    title: "Record",
    subtitle: "Podcast, voice, and sound",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1920&auto=format&fit=crop",
    zIndex: 2,
  },
  {
    id: "slide-3",
    title: "Capture",
    subtitle: "Photography and film",
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1920&auto=format&fit=crop",
    zIndex: 3,
  },
  {
    id: "slide-4",
    title: "Book a studio",
    subtitle: "Starting from ₹—",
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1920&auto=format&fit=crop",
    zIndex: 4,
  },
];

const TOTAL_VH = SLIDES.length * 100;

export default function AnimGrid() {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrapper = scrollWrapperRef.current;
    const viewport = viewportRef.current;
    const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!wrapper || !viewport || slides.length !== SLIDES.length) return;

    // One timeline scrubbed by scroll: each slide’s clip-path goes from fully visible to clipped from bottom (inset 0 0 100% 0) over its segment
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: `+=${TOTAL_VH}vh`,
        scrub: true,
        pin: viewport,
      },
    });

    const segmentDuration = 1 / SLIDES.length;

    slides.forEach((slide, i) => {
      const start = i * segmentDuration;
      tl.fromTo(
        slide,
        { clipPath: "inset(0 0 0% 0)" },
        {
          clipPath: "inset(0 0 100% 0)",
          duration: segmentDuration,
          ease: "none",
        },
        start
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="anim-grid-section bg-charcoal-900">
      {/* Tall wrapper: N×100vh so each 100vh scroll drives one slide’s clip */}
      <div
        ref={scrollWrapperRef}
        className="relative"
        style={{ height: `${TOTAL_VH}vh` }}
      >
        {/* Pinned viewport: fullscreen frame that stays in view while we scroll */}
        <div
          ref={viewportRef}
          className="absolute inset-0 w-full h-screen overflow-hidden"
        >
          {/* Slides stacked absolutely, layered by z-index; only clip-path is animated */}
          {SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                zIndex: slide.zIndex,
                clipPath: "inset(0 0 0% 0)",
              }}
            >
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-28 text-center px-6">
                <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white tracking-tight mb-2">
                  {slide.title}
                </h2>
                <p className="text-stone-300 font-medium text-lg md:text-xl">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
