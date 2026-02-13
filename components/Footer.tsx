import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Instagram, Linkedin, Twitter, MapPin, Mail, ArrowUpRight } from 'lucide-react';

const FOOTER_PADDING = 'px-4 sm:px-6 md:px-12';
const SECTION_LABEL = 'text-[10px] uppercase tracking-[0.2em] text-black/50 font-bold';
const LINK_STYLE = 'text-black/70 hover:text-black text-sm font-medium transition-colors';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <footer className="bg-white text-black overflow-hidden">
      <div ref={ref} className={`max-w-6xl mx-auto ${FOOTER_PADDING} py-10 sm:py-14 md:py-20`}>
        {/* Brand + CTA row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-12 pb-6 sm:pb-8 md:pb-12 border-b border-black/10">
          <div className="flex flex-col min-w-0 gap-2 flex-1 overflow-hidden">
            <div className="flex flex-row items-center justify-between gap-3 sm:gap-4">
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[0.92] text-black min-w-0">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={isInView ? { y: 0 } : { y: '100%' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  TONG STUDIO
                </motion.span>
              </h2>
              <motion.a
                href="mailto:contact@tongstudio.com"
                initial={{ opacity: 0, x: 16 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="group shrink-0 md:hidden inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-black/80 py-2.5 sm:py-3 px-3 sm:px-4 border border-black/20 rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-200 whitespace-nowrap"
              >
                Get in touch
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.a>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="text-black/55 text-xs sm:text-sm leading-relaxed max-w-sm"
            >
              Podcast, photoshoot & content studio. Professional spaces for creators and brands.
            </motion.p>
          </div>
          <motion.a
            href="mailto:contact@tongstudio.com"
            initial={{ opacity: 0, x: 16 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="hidden md:inline-flex group shrink-0 items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-black/80 py-3.5 px-5 border border-black/20 rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-200"
          >
            Get in touch
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.a>
        </div>

        {/* Links grid - responsive layout */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10 md:gap-x-12 md:gap-y-0 md:gap-12 pt-6 sm:pt-10 md:pt-14">
          {/* Mobile: full width | Tablet: full width | Desktop: 4 cols */}
          <div className="col-span-2 md:col-span-4">
            <div className="h-px w-8 sm:w-10 bg-black/30 mb-3 sm:mb-4" />
            <p className={`${SECTION_LABEL} mb-3 sm:mb-4`}>Headquarters</p>
            <address className="not-italic text-xs sm:text-sm text-black/70 space-y-2 sm:space-y-3 break-words">
              <p className="flex items-start gap-2 sm:gap-2.5">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-black/40 flex-shrink-0" />
                <span className="min-w-0">575 Madison Avenue, New York, NY 10022</span>
              </p>
              <p className="flex items-start gap-2 sm:gap-2.5">
                <Mail className="w-3.5 h-3.5 mt-0.5 shrink-0 text-black/40" />
                <a href="mailto:contact@tongstudio.com" className={`${LINK_STYLE} break-words min-w-0 text-xs sm:text-sm`}>
                  contact@tongstudio.com
                </a>
              </p>
              <p>
                <a href="tel:+12125550199" className={`${LINK_STYLE} text-xs sm:text-sm`}>
                  +1 212 555 0199
                </a>
              </p>
            </address>
          </div>

          {/* Mobile: left col | Tablet: left | Desktop: 2 cols */}
          <div className="col-span-1 md:col-span-2">
            <div className="h-px w-8 sm:w-10 bg-black/30 mb-3 sm:mb-4" />
            <p className={`${SECTION_LABEL} mb-3 sm:mb-4`}>Company</p>
            <ul className="space-y-2 sm:space-y-3">
              {['Our Team', 'Careers', 'Press', 'Portfolio'].map((item) => (
                <li key={item}>
                  <a href="#" className={`block ${LINK_STYLE} text-xs sm:text-sm`}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile: right col | Tablet: right | Desktop: 2 cols */}
          <div className="col-span-1 md:col-span-2">
            <div className="h-px w-8 sm:w-10 bg-black/30 mb-3 sm:mb-4" />
            <p className={`${SECTION_LABEL} mb-3 sm:mb-4`}>Legal</p>
            <ul className="space-y-2 sm:space-y-3">
              {['Terms of Use', 'Privacy Policy', 'Accessibility'].map((item) => (
                <li key={item}>
                  <a href="#" className={`block ${LINK_STYLE} text-xs sm:text-sm`}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile: full width, new row | Tablet: full | Desktop: 4 cols */}
          <div className="col-span-2 md:col-span-4 flex flex-col sm:flex-row sm:items-end md:flex-col md:items-start gap-4 sm:gap-6">
            <div className="flex-1 md:flex-initial">
              <div className="h-px w-8 sm:w-10 bg-black/30 mb-3 sm:mb-4" />
              <p className={`${SECTION_LABEL} mb-3 sm:mb-4`}>Connect</p>
              <div className="flex gap-2 sm:gap-3 flex-wrap">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-black/20 flex items-center justify-center text-black/60 hover:bg-black hover:text-white hover:border-black transition-all duration-200 shrink-0"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-black/20 flex items-center justify-center text-black/60 hover:bg-black hover:text-white hover:border-black transition-all duration-200 shrink-0"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-black/20 flex items-center justify-center text-black/60 hover:bg-black hover:text-white hover:border-black transition-all duration-200 shrink-0"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black/10">
        <div className={`max-w-6xl mx-auto ${FOOTER_PADDING} py-3 sm:py-4`}>
          <p className="text-center sm:text-left text-[10px] uppercase tracking-widest text-black/45 font-bold break-words leading-relaxed">
            © {currentYear} Tong Studio. ALL RIGHTS RESERVED. DESIGNED BY EZOR.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
