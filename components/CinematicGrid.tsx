import { useEffect, useState, useRef } from 'react';
import './CinematicGrid.css';

const ITEMS = [
  { src: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800&auto=format&fit=crop', type: 'square' as const },
  { src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop', type: 'tall' as const },
  { src: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=800&auto=format&fit=crop', type: 'square' as const },
  { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop', type: 'wide' as const },
  { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop', type: 'square' as const },
  { src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop', type: 'square' as const },
  { src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop', type: 'wide' as const },
];

function GridContent({ loaded }: { loaded: boolean }) {
  return (
    <div className={`cinematic-grid ${loaded ? 'show' : ''}`}>
      {ITEMS.map((item, index) => (
        <div
          key={index}
          className={`grid-item ${item.type}`}
          style={{ animationDelay: `${index * 0.08}s` }}
        >
          <img src={item.src} alt="" />
        </div>
      ))}
    </div>
  );
}

export default function CinematicGrid() {
  const [loaded, setLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      if (rect.top > viewportHeight) {
        setScrollProgress(0);
        return;
      }

      const scrollable = sectionHeight - viewportHeight;
      if (scrollable <= 0) {
        setScrollProgress(1);
        return;
      }

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / scrollable));
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="cinematic-scroll-section">
      <div className="cinematic-sticky">
        <div className="cinematic-split-wrapper">
          <div
            className="cinematic-grid-half left"
            style={{
              transform: `translate(-50%, -50%) translateX(${-scrollProgress * 50}%) scale(${1 - scrollProgress * 0.15})`,
            }}
          >
            <GridContent loaded={loaded} />
          </div>
          <div
            className="cinematic-grid-half right"
            style={{
              transform: `translate(-50%, -50%) translateX(${scrollProgress * 50}%) scale(${1 - scrollProgress * 0.15})`,
            }}
          >
            <GridContent loaded={loaded} />
          </div>
          <div
            className="cinematic-center-text"
            style={{
              opacity: scrollProgress,
              transform: `translate(-50%, -50%) scale(${0.85 + scrollProgress * 0.15}) translateY(${(1 - scrollProgress) * 24}px)`,
              pointerEvents: scrollProgress > 0.5 ? 'auto' : 'none',
            }}
          >
            <h3 className="cinematic-cta-title">Ready to get started?</h3>
            <p className="cinematic-cta-price">Starting from INR 5,000</p>
            <a href="#contact" className="cinematic-cta">
              Book a studio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
