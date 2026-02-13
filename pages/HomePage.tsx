import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import ServicesSection from '../components/ServicesSection';
import StudioNotes from '../components/StudioNotes';
import StudioPricing from '../components/StudioPricing';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';
import Philosophy from '../components/Philosophy';
import { motion, AnimatePresence } from 'framer-motion';
import StudioShowcase from '../components/StudioShowcase';
import FlipWords from '../components/FlipWords';
import AppleScrollSection from '../components/AppleScrollSection';
import ImageTextGrid from '../components/ImageTextGrid';
import StudioCreators from '../components/StudioCreators';
import CinematicGrid from '../components/CinematicGrid';
import PodcastShowcase from '../components/PodcastShowcase';

function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [scrollToSectionId, setScrollToSectionId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigateToSection = (sectionId: string) => {
    setScrollToSectionId(sectionId);
  };

  const handleNavigateHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!scrollToSectionId) return;
    const t = setTimeout(() => {
      const el = document.getElementById(scrollToSectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setScrollToSectionId(null);
    }, 300);
    return () => clearTimeout(t);
  }, [scrollToSectionId]);

  const openBooking = () => navigate('/book');

  return (
    <div className="min-h-screen bg-alabaster text-charcoal-900 font-sans selection:bg-champagne-200 selection:text-black">
      <AnimatePresence>
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar
            onNavigateHome={handleNavigateHome}
            onNavigateToSection={handleNavigateToSection}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Hero onOpenBooking={openBooking} />
            <StatsSection />
            <Philosophy />
            <StudioShowcase onOpenBooking={openBooking} />
            <AppleScrollSection />
            <FlipWords />
            <ImageTextGrid />
            <StudioCreators onOpenBooking={openBooking} />
            <PodcastShowcase />
            <CinematicGrid onOpenBooking={openBooking} />
            <StudioNotes />
            <ServicesSection />
            <StudioPricing />
            <CallToAction onOpenBooking={openBooking} />
          </motion.div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default HomePage;
