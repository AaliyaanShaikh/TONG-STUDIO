import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Globe, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onNavigateHome: () => void;
  onNavigateToSection?: (sectionId: string) => void;
  isContactOpen?: boolean;
  onOpenContact?: () => void;
  onCloseContact?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onNavigateHome,
  onNavigateToSection,
  isContactOpen = false,
  onOpenContact,
  onCloseContact,
}) => {
  const [internalContactOpen, setInternalContactOpen] = useState(false);
  const isContactVisible = onOpenContact ? isContactOpen : internalContactOpen;
  const openContact = onOpenContact ?? (() => setInternalContactOpen(true));
  const closeContact = onCloseContact ?? (() => setInternalContactOpen(false));

  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateToSection?.(sectionId);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // White until we reach the stats section; switch to black as soon as it enters view
      const statsSection = document.getElementById('stats-section');
      const rect = statsSection?.getBoundingClientRect();
      setIsPastHero(rect ? rect.top <= 0 : window.scrollY >= window.innerHeight);
    };
    handleScroll(); // set initial state
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navContent = (
    <nav
      className="w-full py-6 px-6 md:px-12 pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10000,
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      <div className="relative flex justify-between items-center min-h-[48px]">
        {/* Logo: white on hero, black past hero */}
        <div className="pointer-events-auto flex items-center">
           <div
            className={`font-serif text-2xl font-bold tracking-wide cursor-pointer transition-colors ${isPastHero ? 'text-charcoal-900 hover:text-charcoal-800' : 'text-white hover:text-white/90'}`}
            onClick={onNavigateHome}
          >
            TONG STUDIO
          </div>
        </div>

        {/* Desktop Menu - Floating Pill: centered, same line as logo and icons */}
        <motion.div
          initial={false}
          animate={{
            opacity: isScrolled ? 1 : 0,
            pointerEvents: isScrolled ? 'auto' : 'none',
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="hidden md:flex items-center gap-8 px-8 py-4 rounded-full border bg-white/90 backdrop-blur-md border-stone-200 shadow-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <button type="button" onClick={() => handleNavClick('spaces')} className="text-xs uppercase tracking-widest text-charcoal-900 hover:text-champagne-600 transition-colors font-medium">Spaces</button>
          <button type="button" onClick={() => handleNavClick('about')} className="text-xs uppercase tracking-widest text-charcoal-900 hover:text-champagne-600 transition-colors font-medium">About</button>
          <button type="button" onClick={() => handleNavClick('journal')} className="text-xs uppercase tracking-widest text-charcoal-900 hover:text-champagne-600 transition-colors font-medium">Journal</button>
          <button type="button" onClick={() => openContact()} className="text-xs uppercase tracking-widest text-charcoal-900 hover:text-champagne-600 transition-colors font-medium">Contact</button>
        </motion.div>

        {/* Right Actions: white on hero, black past hero */}
        <div className={`hidden md:flex pointer-events-auto items-center gap-6 transition-colors shrink-0 ${isPastHero ? 'text-charcoal-900 hover:text-charcoal-800' : 'text-white hover:text-white/90'}`}>
           <button type="button" className={`flex items-center gap-2 text-xs uppercase tracking-widest font-medium transition-colors ${isPastHero ? 'hover:text-champagne-600' : 'hover:text-champagne-300'}`}>
              <Globe size={14} /> EN
           </button>
           <button
             type="button"
             onClick={() => openContact()}
             className={`transition-colors ${isPastHero ? 'hover:text-champagne-600' : 'hover:text-champagne-300'}`}
             aria-label="Open contact form"
           >
              <MessageCircle size={18} />
           </button>
        </div>

        {/* Mobile Toggle: white on hero, black past hero */}
        <div className={`md:hidden pointer-events-auto flex items-center transition-colors ${isPastHero ? 'text-charcoal-900' : 'text-white'}`}>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-40 pointer-events-auto flex items-center justify-center"
          >
            <div className="flex flex-col space-y-8 text-center">
              <button type="button" onClick={() => handleNavClick('spaces')} className="font-serif text-3xl text-charcoal-900 hover:text-champagne-500">Spaces</button>
              <button type="button" onClick={() => handleNavClick('about')} className="font-serif text-3xl text-charcoal-900 hover:text-champagne-500">About</button>
              <button type="button" onClick={() => handleNavClick('journal')} className="font-serif text-3xl text-charcoal-900 hover:text-champagne-500">Journal</button>
              <button type="button" onClick={() => { openContact(); setIsMobileMenuOpen(false); }} className="font-serif text-3xl text-charcoal-900 hover:text-champagne-500">Contact</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );

  const portalTarget = typeof document !== 'undefined' ? document.getElementById('navbar-portal') : null;
  return portalTarget ? createPortal(navContent, portalTarget) : null;
};

export default Navbar;