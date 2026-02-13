import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AppleScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const sub = subRef.current;
    const line = lineRef.current;
    if (!section || !headline || !sub || !line) return;

    const ctx = gsap.context(() => {
      // Pin the section for the scroll-driven animation
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          scrub: 1.2,
        },
      });

      // Headline: scale up + fade in (Apple-style “reveal”)
      tl.fromTo(
        headline,
        { scale: 0.88, opacity: 0.3 },
        { scale: 1, opacity: 1, ease: "none" },
        0
      );
      // Decorative line: grow + fade
      tl.fromTo(
        line,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.6, ease: "none" },
        0.15
      );
      // Subtext: fade in slightly later
      tl.fromTo(
        sub,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 0.85, ease: "none" },
        0.25
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="apple-scroll-section relative h-screen w-full flex items-center justify-center bg-alabaster overflow-hidden"
    >
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h2
          ref={headlineRef}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-charcoal-900 leading-[1.05] tracking-tight will-change-transform"
        >
          Studio. <span className="italic text-stone-500">Refined.</span>
        </h2>
        <div
          ref={lineRef}
          className="h-px w-16 mx-auto my-8 bg-champagne-500 origin-center"
        />
        <p
          ref={subRef}
          className="font-sans text-charcoal-800 text-lg sm:text-xl md:text-2xl font-medium tracking-wide opacity-90"
        >
          Space to create. Room to record.
        </p>
      </div>
      {/* Subtle gradient for depth (Apple-style) */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(249,245,235,0.5) 0%, transparent 70%)",
        }}
      />
    </section>
  );
}
