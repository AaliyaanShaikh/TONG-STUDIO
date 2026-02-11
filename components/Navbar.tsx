import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onNavigateHome: () => void;
  onNavigateToSection?: (sectionId: string) => void;
  onOpenContact?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onNavigateHome,
  onNavigateToSection,
  onOpenContact,
}) => {
  const openContact = onOpenContact ?? (() => {});

  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverDarkBackground, setIsOverDarkBackground] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const DARK_SECTION_IDS = ['hero', 'creators', 'contact'];

  const handleNavClick = (sectionId: string) => {
    onNavigateToSection?.(sectionId);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // Navbar sits in top ~100px; check if any dark section overlaps that area
      const navbarBottom = 100;
      let overDark = false;
      for (const id of DARK_SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top < navbarBottom && rect.bottom > 0) {
          overDark = true;
          break;
        }
      }
      setIsOverDarkBackground(overDark);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-[10000] py-6 px-6 md:px-12 pointer-events-none">
      <div className="flex justify-between items-center min-h-[48px]">
        {/* Logo: white over dark sections, charcoal over light */}
        <div className="pointer-events-auto">
          <div
            className={`font-serif text-2xl font-bold tracking-wide cursor-pointer transition-colors ${isOverDarkBackground ? 'text-white hover:text-white/90' : 'text-charcoal-900 hover:text-charcoal-800'}`}
            onClick={onNavigateHome}
          >
            TONG STUDIO
          </div>
        </div>

        {/* Desktop Menu - Floating Pill */}
        <motion.div
          initial={false}
          animate={{
            opacity: isScrolled ? 1 : 0,
            y: isScrolled ? 0 : -8,
            pointerEvents: isScrolled ? 'auto' : 'none',
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="hidden md:flex items-center gap-8 px-8 py-4 rounded-full border bg-white border-stone-200 shadow-sm"
        >
          <button type="button" onClick={() => handleNavClick('spaces')} className="text-xs uppercase tracking-widest text-charcoal-900 hover:text-champagne-600 transition-colors font-medium">Spaces</button>
          <button type="button" onClick={() => handleNavClick('about')} className="text-xs uppercase tracking-widest text-charcoal-900 hover:text-champagne-600 transition-colors font-medium">About</button>
          <button type="button" onClick={() => handleNavClick('journal')} className="text-xs uppercase tracking-widest text-charcoal-900 hover:text-champagne-600 transition-colors font-medium">Journal</button>
          <button type="button" onClick={() => openContact()} className="text-xs uppercase tracking-widest text-charcoal-900 hover:text-champagne-600 transition-colors font-medium">Contact</button>
        </motion.div>

        {/* Right Actions: white over dark, charcoal over light */}
        <div className={`hidden md:flex pointer-events-auto items-center gap-6 transition-colors ${isOverDarkBackground ? 'text-white hover:text-white/90' : 'text-charcoal-900 hover:text-charcoal-800'}`}>
          <button type="button" className={`flex items-center gap-2 text-xs uppercase tracking-widest font-medium transition-colors ${isOverDarkBackground ? 'hover:text-champagne-300' : 'hover:text-champagne-600'}`}>
            <Globe size={14} /> EN
          </button>
          <button
            type="button"
            onClick={() => openContact()}
            className={`transition-colors ${isOverDarkBackground ? 'hover:text-champagne-300' : 'hover:text-champagne-600'}`}
            aria-label="Open contact form"
          >
            <MessageCircle size={18} />
          </button>
        </div>

        {/* Mobile Toggle: white over dark, charcoal over light */}
        <div className={`md:hidden pointer-events-auto transition-colors ${isOverDarkBackground ? 'text-white' : 'text-charcoal-900'}`}>
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
};

export default Navbar;
