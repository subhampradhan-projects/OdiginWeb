import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import Logo from './Logo';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden bg-brand-black flex flex-col items-center justify-center py-20 px-6">
      {/* Background with a subtle ambient glow from the logo center */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08)_0%,transparent_70%)]" />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 3 }}
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-20"
        />
      </div>

      {/* Centered Logo Experience */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
           initial={{ scale: 0.7, opacity: 0, rotate: -15 }}
           animate={{ scale: 1, opacity: 1, rotate: 0 }}
           transition={{ 
             duration: 3, 
             ease: [0.19, 1, 0.22, 1],
             delay: 0.2
           }}
           className="relative group"
        >
          {/* Subtle Outer Glow */}
          <div className="absolute inset-0 rounded-full bg-white/5 blur-[120px] scale-150 group-hover:bg-white/10 transition-all duration-1000" />
          
          {/* Detailed SVG Logo */}
          <Logo 
            size={window.innerWidth < 768 ? 320 : 500} 
            className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]" 
          />
        </motion.div>
      </div>
    </section>
  );
}
