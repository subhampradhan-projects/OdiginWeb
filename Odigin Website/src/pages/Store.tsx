import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, X } from 'lucide-react';
import { products } from '../data/products';
import { Product } from '../types';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/FilterSidebar';

import { BRAND_CONFIG, STORE_CONTENT } from '../data/config';

export default function Store({ onAddToCart }: { onAddToCart: (product: Product) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<any>({});

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Gender filter
      if (activeFilters.gender?.length > 0 && !activeFilters.gender.includes(product.gender)) {
        return false;
      }

      // Category filter
      if (activeFilters.category?.length > 0 && !activeFilters.category.includes(product.category)) {
        return false;
      }

      // Color filter
      if (activeFilters.color?.length > 0 && !activeFilters.color.includes(product.color)) {
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

      return true;
    });
  }, [searchQuery, activeFilters]);

  return (
    <div className="min-h-screen bg-brand-black">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <header className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-xl">
              <h1 className="text-5xl lg:text-7xl font-serif italic mb-8">{STORE_CONTENT.title}</h1>
              <p className="text-[12px] uppercase tracking-[0.3em] text-white/40 leading-relaxed font-light">
                {STORE_CONTENT.description}
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-80 group">
              <Search 
                size={18} 
                strokeWidth={1} 
                className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors" 
              />
              <input 
                type="text"
                placeholder="Search Collection"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-white/10 py-4 pl-8 text-[11px] uppercase tracking-[0.2em] focus:outline-none focus:border-white transition-all font-light"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </header>

        <section>
          <FilterSidebar 
            activeFilters={activeFilters} 
            onFilterChange={setActiveFilters} 
          />

          {filteredProducts.length > 0 ? (
            <div className="mt-12">
              <div className="mb-8">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                  Showing {filteredProducts.length} Results
                </span>
              </div>
              <ProductGrid products={filteredProducts} onAddToCart={onAddToCart} />
            </div>
          ) : (
            <div className="py-48 text-center bg-white/5 border border-white/5 rounded-2xl">
              <p className="text-[11px] uppercase tracking-[0.4em] text-white/40 mb-8 italic">{STORE_CONTENT.emptyState.title}</p>
              <button 
                onClick={() => {
                  setActiveFilters({});
                  setSearchQuery('');
                }}
                className="px-8 py-3 bg-white text-black text-[10px] uppercase tracking-[0.2em] font-medium rounded-full hover:bg-opacity-90 transition-all"
              >
                {STORE_CONTENT.emptyState.buttonText}
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
