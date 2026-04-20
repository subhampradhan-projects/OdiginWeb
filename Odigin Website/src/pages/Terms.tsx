import React from 'react';
import { motion } from 'motion/react';
import { TERMS_CONTENT } from '../data/config';

export default function Terms() {
  return (
    <div className="min-h-screen bg-brand-black">
      <div className="max-w-3xl mx-auto px-6 py-32">
        <header className="mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-serif italic mb-6"
          >
            {TERMS_CONTENT.title}
          </motion.h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30">Last Updated: {TERMS_CONTENT.lastUpdated}</p>
        </header>

        <div className="space-y-16">
          {TERMS_CONTENT.sections.map((section, idx) => (
            <section key={idx} className="border-l border-white/10 pl-8">
              <h2 className="text-[11px] uppercase tracking-[0.4em] text-white/60 mb-6 font-medium">
                {idx + 1}. {section.title}
              </h2>
              <p className="text-[13px] text-white/40 leading-relaxed uppercase tracking-widest font-light">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
