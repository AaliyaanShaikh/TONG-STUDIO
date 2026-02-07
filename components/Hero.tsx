import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const SLIDES = [
  {
    bg: "/67c831063b63647b70a176ce_Nest%205.webp",
    label: "Established 1988",
    subtitle: "Record. Shine.",
    description:
      "Tong Studio is a creative space for podcast recording, photoshoots, and content creation.",
    footer: ["Podcast", "Photoshoot", "Events"],
  },
  {
    bg: "/67c831063b63647b70a176cd_Exec%202.webp",
    label: "The Space",
    title: "Designed",
    subtitle: "to perform.",
    description:
      "Professional setups, flexible booking, and a team that helps you bring your vision to life.",
    footer: ["Studios", "Equipment", "Support"],
  },
  {
    bg: "/67c831063b63647b70a176cc_Apex%201.webp",
    label: "Your Vision",
    title: "Capture.",
    subtitle: "Broadcast. Grow.",
    description:
      "From intimate recordings to full productions—one space, endless possibilities.",
    footer: ["Record", "Stream", "Publish"],
  },
  {
    bg: "/67c831063b63647b70a17704_Cove%203.webp",
    label: "Book Now",
    title: "Ready",
    subtitle: "when you are.",
    description: "Professional setups, flexible booking. Bring your vision to life.",
    footer: ["Explore", "Book a Session"],
  },
];

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scroll delay: lower stiffness + higher damping so animation lags behind scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: isMobile ? 30 : 50,
    damping: isMobile ? 35 : 45,
    restDelta: isMobile ? 0.01 : 0.001,
    mass: isMobile ? 1.5 : 1.8,
  });

  // Background: clip-path reveal from bottom to top (previous effect) – each slide clips over its 25% segment
  const clip0 = useTransform(smoothProgress, (p) => {
    if (p <= 0) return "inset(0 0 0% 0)";
    if (p >= 0.25) return "inset(0 0 100% 0)";
    return `inset(0 0 ${(p / 0.25) * 100}% 0)`;
  });
  const clip1 = useTransform(smoothProgress, (p) => {
    if (p <= 0.25) return "inset(0 0 0% 0)";
    if (p >= 0.5) return "inset(0 0 100% 0)";
    return `inset(0 0 ${((p - 0.25) / 0.25) * 100}% 0)`;
  });
  const clip2 = useTransform(smoothProgress, (p) => {
    if (p <= 0.5) return "inset(0 0 0% 0)";
    if (p >= 0.75) return "inset(0 0 100% 0)";
    return `inset(0 0 ${((p - 0.5) / 0.25) * 100}% 0)`;
  });
  const clip3 = useTransform(smoothProgress, (p) => {
    if (p <= 0.75) return "inset(0 0 0% 0)";
    if (p >= 1) return "inset(0 0 100% 0)";
    return `inset(0 0 ${((p - 0.75) / 0.25) * 100}% 0)`;
  });

  const clipPaths = [clip0, clip1, clip2, clip3];
  const SLIDE_COUNT = SLIDES.length;

  // Only the current segment's text is visible – prevents overlap (no clip boundary bleed)
  const visible0 = useTransform(smoothProgress, (p) => (Math.min(3, Math.floor(p * 4)) === 0 ? "visible" : "hidden"));
  const visible1 = useTransform(smoothProgress, (p) => (Math.min(3, Math.floor(p * 4)) === 1 ? "visible" : "hidden"));
  const visible2 = useTransform(smoothProgress, (p) => (Math.min(3, Math.floor(p * 4)) === 2 ? "visible" : "hidden"));
  const visible3 = useTransform(smoothProgress, (p) => (Math.min(3, Math.floor(p * 4)) === 3 ? "visible" : "hidden"));
  const textVisibility = [visible0, visible1, visible2, visible3];

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-alabaster">
      {/* Sticky frame: whole screen sticks; only backgrounds inside animate with scroll */}
      <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden">
        {/* Background layers: clip-path reveal + zoom in as you scroll through each segment */}
        {SLIDES.map((slide, i) => (
          <motion.div
            key={`bg-${i}`}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: SLIDE_COUNT - i,
              clipPath: clipPaths[i],
              willChange: isMobile ? "clip-path" : "clip-path",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            className="overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full">
              <img
                src={slide.bg}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  willChange: "transform",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                }}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          </motion.div>
        ))}

        {/* Text in original place – only current segment visible (visibility) so text never overlaps */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between px-6 md:px-20 pt-20 pb-12 pointer-events-none">
          <div className="relative flex-1 flex flex-col justify-center">
            {SLIDES.map((slide, i) => (
              <motion.div
                key={`content-${i}`}
                style={{
                  position: "absolute",
                  inset: 0,
                  visibility: textVisibility[i],
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  willChange: "visibility",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                }}
                className="pointer-events-none"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[2px] w-12 bg-champagne-400" />
                  <p className="text-champagne-300 tracking-[0.3em] uppercase text-xs font-bold">
                    {slide.label}
                  </p>
                </div>
                <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter mb-10">
                  <span className="block text-white">{slide.title}</span>
                  <span className="block italic text-stone-400">{slide.subtitle}</span>
                </h1>
                <p className="max-w-md text-white/95 text-sm md:text-lg font-medium leading-relaxed border-l-2 border-champagne-400 pl-6">
                  {slide.description}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="relative flex justify-between items-end text-[10px] uppercase tracking-widest min-h-[4rem] pointer-events-auto">
            {SLIDES.map((slide, i) => (
              <motion.div
                key={`footer-${i}`}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  visibility: textVisibility[i],
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  willChange: "visibility",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                }}
                className="pointer-events-none px-0"
              >
                <div className="flex gap-8 font-bold text-white">
                  {slide.footer.map((item, j) => (
                    <span key={j}>{item}</span>
                  ))}
                </div>
                <div className="font-bold text-champagne-200">Book a Session</div>
              </motion.div>
            ))}
            <div
              className="absolute left-1/2 flex flex-col items-center gap-2 text-champagne-300"
              style={{ transform: "translateX(-50%)", pointerEvents: "none" }}
            >
              <div className="w-[1px] h-12 bg-champagne-400" />
              <span>Scroll</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
