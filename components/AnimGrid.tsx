import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TILT_MAX = 10;
const SCALE_MAX = 0.04; // subtle zoom toward center (1 → 1.04)
const TILT_EASE = 0.6;
const RESET_EASE = 0.9;

export default function AnimGrid() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ——— SCROLL: Parallax lines ———
    gsap.from("#anim-grid-line-one", {
      x: -120,
      scrollTrigger: {
        trigger: ".anim-grid-section",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });
    gsap.from("#anim-grid-line-center", {
      x: 120,
      scrollTrigger: {
        trigger: ".anim-grid-section",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });
    gsap.from("#anim-grid-line-two", {
      x: -120,
      scrollTrigger: {
        trigger: ".anim-grid-section",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    // ——— SCROLL: Depth / spread (desktop) ———
    const mm = gsap.matchMedia();
    mm.add("(min-width: 992px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".anim-grid-section",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
      tl.to(".anim-grid__main", { width: "1200px", ease: "power2.out" })
        .from(
          ".anim-grid__wrap",
          {
            rotationX: 45,
            scale: 0.6,
            y: 200,
            z: -140,
            transformPerspective: 1200,
            ease: "power2.out",
          },
          0
        )
        .to("#anim-grid-line-one", { y: -40 }, 0)
        .to("#anim-grid-line-two", { y: 40 }, 0)
        .to('[data-move="left"]', { x: -64 }, 0)
        .to('[data-move="left-medium"]', { x: -40 }, 0)
        .to('[data-move="left-small"]', { x: -24 }, 0)
        .to('[data-move="right"]', { x: 64 }, 0)
        .to('[data-move="right-medium"]', { x: 40 }, 0)
        .to('[data-move="right-small"]', { x: 24 }, 0)
        .to(".anim-grid__line .re-image", { scale: 1.3 }, 0);
    });

    // ——— MOUSE: Center CTA 3D tilt (perspective + rotationX/Y), smooth reset on leave ———
    const card = cardRef.current;
    let removeMouse: (() => void) | undefined;

    if (card) {
      const tilt = { x: 0, y: 0, scale: 1 };
      const setTilt = () => {
        gsap.to(card, {
          rotationY: tilt.x,
          rotationX: tilt.y,
          scale: tilt.scale,
          duration: TILT_EASE,
          ease: "power2.out",
          overwrite: true,
        });
      };

      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const nx = (e.clientX - cx) / (rect.width / 2);
        const ny = (e.clientY - cy) / (rect.height / 2);
        tilt.x = gsap.utils.clamp(-TILT_MAX, TILT_MAX, nx * TILT_MAX);
        tilt.y = gsap.utils.clamp(-TILT_MAX, TILT_MAX, -ny * TILT_MAX);
        const dist = Math.min(1, (Math.abs(nx) + Math.abs(ny)) / 2);
        tilt.scale = 1 + (1 - dist) * SCALE_MAX;
        setTilt();
      };

      const onLeave = () => {
        tilt.x = 0;
        tilt.y = 0;
        tilt.scale = 1;
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          duration: RESET_EASE,
          ease: "power2.out",
        });
      };

      const section = document.querySelector(".anim-grid-section");
      section?.addEventListener("mousemove", onMove);
      section?.addEventListener("mouseleave", onLeave);
      removeMouse = () => {
        section?.removeEventListener("mousemove", onMove);
        section?.removeEventListener("mouseleave", onLeave);
      };
    }

    return () => {
      removeMouse?.();
      if (cardRef.current) gsap.set(cardRef.current, { rotationX: 0, rotationY: 0, scale: 1 });
      mm.revert();
    };
  }, []);

  return (
    <section className="anim-grid-section min-h-[150vh] py-24 bg-white overflow-hidden">
      <div className="anim-grid__container flex flex-col gap-8">
        <div id="anim-grid-line-one" className="anim-grid__line flex flex-nowrap gap-4 items-center min-h-[120px]">
          {/* items */}
        </div>

        <div id="anim-grid-line-center" className="anim-grid__line has-padding flex flex-nowrap gap-4 items-center justify-center min-h-[220px] py-8">
          <div className="anim-grid__main min-w-[280px] w-full max-w-[90vw] flex items-center justify-center">
            <div
              ref={cardRef}
              className="anim-grid__card w-full max-w-md mx-auto flex items-center justify-center px-8 py-14 bg-champagne-100 rounded-2xl border border-champagne-200/80 shadow-lg"
              style={{ transformPerspective: 1200, transformStyle: "preserve-3d" }}
            >
              <div className="anim-grid__wrap text-center" style={{ transform: "translateZ(0)" }}>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal-900 mb-2 tracking-tight">
                  Book a studio
                </h2>
                <p className="text-stone-600 font-medium text-lg">Starting from ₹—</p>
              </div>
            </div>
          </div>
        </div>

        <div id="anim-grid-line-two" className="anim-grid__line flex flex-nowrap gap-4 items-center min-h-[120px]">
          {/* items */}
        </div>
      </div>
    </section>
  );
}
