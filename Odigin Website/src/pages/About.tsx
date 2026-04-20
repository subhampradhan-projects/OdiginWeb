import React from 'react';
import { motion } from 'motion/react';
import { ABOUT_CONTENT, IMAGES, BRAND_CONFIG } from '../data/config';

export default function About() {
  return (
    <div className="min-h-screen bg-brand-black">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.philosophy} 
            alt="Atelier" 
            className="w-full h-full object-cover scale-110 opacity-30 grayscale blur-sm"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/50 to-brand-black" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="text-6xl md:text-8xl font-serif italic mb-6"
          >
            {ABOUT_CONTENT.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[10px] uppercase tracking-[0.6em] text-white/40"
          >
            {BRAND_CONFIG.location} / {BRAND_CONFIG.motto}
          </motion.p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-5xl font-serif italic mb-12">
              {ABOUT_CONTENT.mission.title}
            </h2>
            <div className="space-y-8 text-[14px] text-white/50 leading-relaxed font-light uppercase tracking-widest">
              <p>{ABOUT_CONTENT.mission.paragraph1}</p>
              <p>{ABOUT_CONTENT.mission.paragraph2}</p>
              <p>{ABOUT_CONTENT.mission.paragraph3}</p>
            </div>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-[4/5] bg-white/5 border border-white/5 overflow-hidden group">
               <img 
                 src="https://picsum.photos/seed/fabric/800/1000?grayscale"
                 alt="Fabric texture"
                 className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[3s]"
                 referrerPolicy="no-referrer"
               />
            </div>
            <div className="aspect-[4/5] bg-white/5 border border-white/5 overflow-hidden group mt-12 md:mt-24">
               <img 
                 src="https://picsum.photos/seed/hand/800/1000?grayscale"
                 alt="Craftsmanship"
                 className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[3s]"
                 referrerPolicy="no-referrer"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-32 bg-[#080808] border-y border-white/5 mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24">
             <h3 className="text-[10px] uppercase tracking-[0.4em] font-medium text-white/40 mb-4">The Pillars</h3>
             <h4 className="text-3xl font-light">How we operate differently.</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {ABOUT_CONTENT.values.map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="p-12 border border-white/5 bg-brand-black/30 hover:border-white/20 transition-all group"
              >
                <span className="block text-2xl font-serif italic mb-8 text-white/20 group-hover:text-white transition-colors">0{idx + 1}.</span>
                <h5 className="text-[12px] uppercase tracking-[0.2em] font-medium mb-4">{value.title}</h5>
                <p className="text-[11px] text-white/40 leading-relaxed uppercase tracking-widest font-light">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Segment */}
      <section className="py-48 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12">
             <div className="w-24 h-24 bg-white/10 rounded-full mx-auto mb-8 overflow-hidden grayscale">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${BRAND_CONFIG.ceo}`} alt={BRAND_CONFIG.ceo} />
             </div>
             <p className="text-[12px] text-white/60 uppercase tracking-[0.4em] font-light mb-2">CEO & Founder</p>
             <h2 className="text-3xl font-serif italic">{BRAND_CONFIG.ceo}</h2>
          </div>
          <p className="text-[14px] text-white/40 leading-relaxed italic max-w-lg mx-auto">
            "We aren't just making clothes; we are building a decentralized future for craftsmanship where every household in Odisha can produce luxury that respects the earth."
          </p>
        </div>
      </section>
    </div>
  );
}
