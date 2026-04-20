import React from 'react';
import { motion } from 'motion/react';
import { BRAND_CONFIG, ABOUT_CONTENT } from '../data/config';

export default function Ethics() {
  return (
    <div className="min-h-screen bg-brand-black">
      <div className="max-w-4xl mx-auto px-6 py-32">
        <header className="mb-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-serif italic mb-6"
          >
            Ethical Sourcing
          </motion.h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">Our radical transparency report.</p>
        </header>

        <div className="space-y-24">
          <section className="p-12 border border-white/5 bg-white/[0.01]">
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-8">Families Over Factories</h2>
            <p className="text-lg font-light text-white/70 leading-relaxed uppercase tracking-widest mb-12">
              {ABOUT_CONTENT.mission.paragraph3}
            </p>
            <div className="grid grid-cols-2 gap-12 border-t border-white/10 pt-12">
               <div>
                 <span className="block text-2xl font-serif italic mb-2 text-white">100%</span>
                 <span className="text-[9px] uppercase tracking-widest text-white/30">Home Manufactured</span>
               </div>
               <div>
                  <span className="block text-2xl font-serif italic mb-2 text-white">Fair Wage</span>
                  <span className="text-[9px] uppercase tracking-widest text-white/30">Direct to Artisans</span>
               </div>
            </div>
          </section>

          <section>
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-12">Sustainable Materials</h2>
            <ul className="space-y-12">
              {[
                { name: 'Organic Fibers', desc: 'Sourced from certified growers, ensuring no pesticides enter the soil of Odisha.' },
                { name: 'Biodegradable Dyes', desc: 'Our coloring processes use zero hazardous chemicals, returning clean water to the community.' },
                { name: 'Deadstock Revival', desc: 'Integrating high-quality archival fabrics into new silhouettes to reduce waste.' }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-12 items-start">
                   <span className="text-xl font-serif italic text-white/20">0{idx + 1}</span>
                   <div>
                     <h3 className="text-[12px] uppercase tracking-[0.2em] font-medium mb-4 text-white/80">{item.name}</h3>
                     <p className="text-[11px] uppercase tracking-widest text-white/40 leading-relaxed font-light">{item.desc}</p>
                   </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
