import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { JOURNAL_CONTENT } from '../data/config';
import { journalPosts } from '../data/journal';

export default function Journal() {
  return (
    <div className="min-h-screen bg-brand-black">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <header className="mb-32 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif italic mb-8"
          >
            {JOURNAL_CONTENT.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[10px] uppercase tracking-[0.5em] text-white/40 leading-relaxed font-light"
          >
            {JOURNAL_CONTENT.subtitle}
          </motion.p>
        </header>

        {/* Journal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-12">
          {journalPosts.map((post, idx) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col group cursor-pointer"
            >
              {/* Image Container */}
              <div className="aspect-[16/10] overflow-hidden bg-white/5 border border-white/5 mb-8 relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-[2s] ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4">
                  <span className="text-[8px] uppercase tracking-[0.3em] font-medium px-3 py-1.5 border border-white/10 backdrop-blur-md text-white/60">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-6 mb-6">
                   <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">{post.date}</span>
                   <div className="flex-1 h-px bg-white/5" />
                </div>
                
                <h2 className="text-2xl font-serif italic mb-6 leading-tight group-hover:text-white/70 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-[12px] text-white/40 leading-relaxed uppercase tracking-widest font-light mb-8 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto">
                   <button className="text-[9px] uppercase tracking-[0.4em] font-medium border-b border-white/10 pb-1 group-hover:border-white transition-all">
                     Read Narrative
                   </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {journalPosts.length === 0 && (
          <div className="py-48 text-center border-t border-white/5">
            <p className="text-[11px] uppercase tracking-[0.4em] text-white/30 italic">
              {JOURNAL_CONTENT.emptyState}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
