import React from 'react';
import { motion } from 'motion/react';
import { SIZING_CONTENT, BRAND_CONFIG } from '../data/config';

export default function Sizing() {
  return (
    <div className="min-h-screen bg-brand-black">
      <div className="max-w-4xl mx-auto px-6 py-32">
        <header className="mb-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-serif italic mb-6"
          >
            {SIZING_CONTENT.title}
          </motion.h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">{SIZING_CONTENT.description}</p>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-6 text-[10px] uppercase tracking-widest font-medium text-white/40">Size</th>
                <th className="py-6 text-[10px] uppercase tracking-widest font-medium text-white/40">Chest</th>
                <th className="py-6 text-[10px] uppercase tracking-widest font-medium text-white/40">Waist</th>
                <th className="py-6 text-[10px] uppercase tracking-widest font-medium text-white/40">Hips</th>
              </tr>
            </thead>
            <tbody>
              {SIZING_CONTENT.chart.map((row, idx) => (
                <tr key={row.size} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-8 text-[11px] uppercase tracking-widest text-white">{row.size}</td>
                  <td className="py-8 text-[11px] tracking-widest text-white/50">{row.chest}</td>
                  <td className="py-8 text-[11px] tracking-widest text-white/50">{row.waist}</td>
                  <td className="py-8 text-[11px] tracking-widest text-white/50">{row.hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-24 p-12 border border-white/5 bg-white/[0.01]">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-6">How to Measure</h2>
          <div className="space-y-6 text-[11px] uppercase tracking-[0.2em] text-white/30 leading-relaxed font-light">
            <p><span className="text-white/60">Chest:</span> Measure around the fullest part of your chest, keeping the tape horizontal.</p>
            <p><span className="text-white/60">Waist:</span> Measure around the narrowest part (typically where your body bends side to side).</p>
            <p><span className="text-white/60">Hips:</span> Measure around the fullest part of your hips, keeping the tape horizontal.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
