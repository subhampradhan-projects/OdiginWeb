import React, { useState, useMemo } from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/FilterSidebar';
import { products } from '../data/products';
import { Product } from '../types';
import { motion } from 'motion/react';
import { BRAND_CONFIG, HOME_CONTENT, IMAGES } from '../data/config';

export default function Home({ onAddToCart }: { onAddToCart: (product: Product) => void }) {
  const [activeFilters, setActiveFilters] = useState<any>({});

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (activeFilters.category?.length > 0 && !activeFilters.category.includes(product.category)) {
        return false;
      }
      
      // Price filter
      if (activeFilters.price?.length > 0) {
        const matchesPrice = activeFilters.price.some((range: string) => {
          const [min, max] = range.split('-').map(Number);
          return product.price >= min && product.price <= max;
        });
        if (!matchesPrice) return false;
      }

      // Note: Size filter is simulated as mock data doesn't have sizes, 
      // but the logic is ready for a real catalog.
      
      return true;
    });
  }, [activeFilters]);

  return (
    <main>
      <Hero />
      
      {/* Featured Collection Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <FilterSidebar 
          activeFilters={activeFilters} 
          onFilterChange={setActiveFilters} 
        />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif italic mb-6"
            >
              {HOME_CONTENT.featuredSection.title}
            </motion.h2>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} onAddToCart={onAddToCart} />
        ) : (
          <div className="py-32 text-center">
            <p className="text-[11px] uppercase tracking-[0.4em] text-white/30">No objects match your selection</p>
            <button 
              onClick={() => setActiveFilters({})}
              className="mt-8 text-[10px] uppercase tracking-widest border-b border-white/20 pb-1"
            >
              Clear Filters
            </button>
          </div>
        )}
        
        <div className="mt-32 text-center">
          <button className="text-[11px] uppercase tracking-[0.2em] font-light border-b border-white/30 pb-2 hover:border-white hover:text-white/60 transition-all">
            {HOME_CONTENT.featuredSection.subtitle}
          </button>
        </div>
      </section>

      {/* Brand Ethos Section */}
      <section className="py-32 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-square overflow-hidden group">
            <img 
              src={IMAGES.philosophy} 
              alt="Artisanal Craft" 
              className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 transition-transform duration-[3s] ease-linear"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl md:text-8xl font-serif italic text-white/10 select-none">Families</span>
            </div>
          </div>
          
          <div className="space-y-12">
            <div className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-medium text-white/40">Our Philosophy</h3>
              <h4 className="text-3xl font-light leading-snug">{BRAND_CONFIG.motto}. {BRAND_CONFIG.shortPhilosophy}</h4>
            </div>
            
            <p className="text-[14px] text-white/50 leading-relaxed font-light uppercase tracking-widest">
              {BRAND_CONFIG.detailedPhilosophy}
            </p>

            <div className="grid grid-cols-2 gap-12 pt-8">
              <div>
                <span className="block text-2xl font-serif italic mb-2">01.</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40">Ethical Sourcing</span>
              </div>
              <div>
                <span className="block text-2xl font-serif italic mb-2">02.</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40">Household Partners</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-48 text-center px-6">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-serif italic mb-8">{HOME_CONTENT.newsletter.title}</h2>
          <p className="text-[12px] text-white/50 uppercase tracking-[0.3em] font-light mb-12">
            {HOME_CONTENT.newsletter.description}
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder={HOME_CONTENT.newsletter.placeholder} 
              className="flex-1 bg-transparent border-b border-white/20 px-4 py-3 text-[11px] uppercase tracking-widest focus:border-white outline-none transition-colors"
            />
            <button className="bg-white text-black px-10 py-3 text-[11px] uppercase tracking-[0.2em] font-medium rounded-full hover:bg-opacity-80 transition-all">
              {HOME_CONTENT.newsletter.buttonText}
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
