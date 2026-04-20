import React from 'react';
import { motion } from 'motion/react';
import { SHIPPING_CONTENT } from '../data/config';

export default function Shipping() {
  return (
    <div className="min-h-screen bg-brand-black">
      <div className="max-w-4xl mx-auto px-6 py-32">
        <header className="mb-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-serif italic mb-6"
          >
            {SHIPPING_CONTENT.title}
          </motion.h1>
        </header>

        <div className="space-y-32">
          <section>
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-white/20"></span>
              {SHIPPING_CONTENT.shipping.title}
            </h2>
            <p className="text-xl font-light text-white/70 leading-relaxed uppercase tracking-widest max-w-2xl">
              {SHIPPING_CONTENT.shipping.text}
            </p>
          </section>

          <section>
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-white/20"></span>
              {SHIPPING_CONTENT.returns.title}
            </h2>
            <div className="space-y-8 max-w-2xl">
              <p className="text-xl font-light text-white/70 leading-relaxed uppercase tracking-widest">
                {SHIPPING_CONTENT.returns.text}
              </p>
              <ul className="space-y-4 text-[11px] uppercase tracking-[0.2em] text-white/40 font-light">
                <li>• Items must be in original condition</li>
                <li>• Accompanied by original tags</li>
                <li>• Return shipping label provided upon request</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
