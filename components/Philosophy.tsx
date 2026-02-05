import React from 'react';
import { motion } from 'framer-motion';

const Philosophy: React.FC = () => {
  return (
    <section className="bg-alabaster py-40">
       <div className="container mx-auto px-6">
         <div className="flex flex-col lg:flex-row gap-24">
           {/* Sticky Image */}
           <div className="w-full lg:w-5/12 h-[70vh] sticky top-32">
             <div className="w-full h-full overflow-hidden relative">
               <motion.img 
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop"
                  className="w-full h-full object-cover"
                  alt="Philosophy"
               />
               {/* Light border frame */}
               <div className="absolute inset-4 border border-white/50 z-10" />
             </div>
           </div>

           {/* Scrolling Text */}
           <div className="w-full lg:w-6/12 flex flex-col justify-center py-10">
             <div className="mb-24">
                <span className="text-champagne-600 uppercase tracking-[0.2em] text-xs font-bold mb-6 block">Our Approach</span>
                <h2 className="font-serif text-5xl md:text-7xl text-charcoal-900 mb-10 leading-[1.1]">
                  Quality, <br/> <span className="italic text-stone-500">Creativity, & Care.</span>
                </h2>
                <p className="text-xl font-light leading-relaxed text-charcoal-800 mb-12">
                  At Tong Studio, we believe every project deserves a space that elevates it. Whether you're recording a podcast, shooting a campaign, or hosting an intimate event, we provide the setup, support, and flexibility to make it happen.
                </p>
             </div>

             <div className="space-y-24 border-l border-stone-200 pl-12">
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ margin: "-100px" }}
                 transition={{ duration: 0.8 }}
               >
                 <span className="text-xs font-bold text-champagne-600 mb-2 block">01</span>
                 <h3 className="font-serif text-3xl mb-4 text-charcoal-900">Professional Setup</h3>
                 <p className="text-stone-500 font-medium leading-relaxed">
                    Fully equipped podcast booths, cyclorama walls, and versatile backdrops. We handle the tech so you can focus on content and creativity.
                 </p>
               </motion.div>
               
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ margin: "-100px" }}
                 transition={{ duration: 0.8 }}
               >
                 <span className="text-xs font-bold text-champagne-600 mb-2 block">02</span>
                 <h3 className="font-serif text-3xl mb-4 text-charcoal-900">Flexible Booking</h3>
                 <p className="text-stone-500 font-medium leading-relaxed">
                    Hourly, half-day, or full-day sessions. We work around your schedule and scale up for larger productions or intimate recordings.
                 </p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ margin: "-100px" }}
                 transition={{ duration: 0.8 }}
               >
                 <span className="text-xs font-bold text-champagne-600 mb-2 block">03</span>
                 <h3 className="font-serif text-3xl mb-4 text-charcoal-900">End-to-End Support</h3>
                 <p className="text-stone-500 font-medium leading-relaxed">
                    From pre-production planning to on-the-day assistance, our team is here to ensure your podcast, shoot, or event runs smoothly.
                 </p>
               </motion.div>
             </div>
           </div>
         </div>
       </div>
    </section>
  );
};

export default Philosophy;