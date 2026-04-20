import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, X, ChevronDown, Check } from 'lucide-react';
import { cn } from '../lib/utils';

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const CATEGORIES = ['Outerwear', 'Knitwear', 'Trousers', 'Footwear', 'Accessories', 'Shirts'];
export const GENDERS = ['Male', 'Female', 'Unisex'];
export const COLORS = ['Black', 'White', 'Gray', 'Beige', 'Olive', 'Navy'];
export const PRICE_RANGES = [
  { label: 'Under $300', value: '0-300' },
  { label: '$300 - $600', value: '300-600' },
  { label: 'Over $600', value: '600-9999' }
];

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
  activeFilters: any;
}

export default function FilterSidebar({ onFilterChange, activeFilters }: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = (type: string, value: string) => {
    const current = activeFilters[type] || [];
    const updated = current.includes(value) 
      ? current.filter((v: string) => v !== value)
      : [...current, value];
    onFilterChange({ ...activeFilters, [type]: updated });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] hover:text-white transition-colors"
        >
          <Filter size={14} strokeWidth={1} />
          Filter & Sort
        </button>
        
        <div className="hidden sm:flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-white/40">
          <span>Sort By: Featured</span>
          <ChevronDown size={12} />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed top-0 left-0 h-full w-full max-w-sm bg-brand-black border-r border-white/10 z-[201] p-12 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-16">
                <h2 className="text-xl font-serif italic">Filter</h2>
                <button onClick={() => setIsOpen(false)} className="hover:opacity-50 transition-opacity">
                  <X size={20} strokeWidth={1} />
                </button>
              </div>

              <div className="space-y-12">
                {/* Gender */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.4em] font-medium text-white/40 mb-6">Gender</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {GENDERS.map(gender => {
                      const isActive = activeFilters.gender?.includes(gender);
                      return (
                        <button
                          key={gender}
                          onClick={() => toggleFilter('gender', gender)}
                          className={cn(
                            "h-12 text-[10px] uppercase tracking-widest font-light border transition-all duration-300",
                            isActive ? "bg-white text-black border-white" : "border-white/10 text-white/50 hover:border-white/30"
                          )}
                        >
                          {gender}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.4em] font-medium text-white/40 mb-6">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => {
                      const isActive = activeFilters.category?.includes(cat);
                      return (
                        <button
                          key={cat}
                          onClick={() => toggleFilter('category', cat)}
                          className={cn(
                            "px-5 py-2 text-[10px] uppercase tracking-widest rounded-full border transition-all duration-300",
                            isActive ? "bg-white text-black border-white" : "border-white/10 text-white/50 hover:border-white/30"
                          )}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.4em] font-medium text-white/40 mb-6">Color</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {COLORS.map(color => {
                      const isActive = activeFilters.color?.includes(color);
                      return (
                        <button
                          key={color}
                          onClick={() => toggleFilter('color', color)}
                          className="flex items-center gap-3 group transition-colors"
                        >
                          <div className={cn(
                            "w-4 h-4 rounded-full border border-white/20 transition-transform group-hover:scale-110",
                            color.toLowerCase() === 'white' ? 'bg-white' : 
                            color.toLowerCase() === 'black' ? 'bg-black' :
                            color.toLowerCase() === 'gray' ? 'bg-gray-500' :
                            color.toLowerCase() === 'beige' ? 'bg-[#F5F5DC]' :
                            color.toLowerCase() === 'olive' ? 'bg-[#556B2F]' :
                            color.toLowerCase() === 'navy' ? 'bg-[#000080]' : 'bg-transparent',
                            isActive && "ring-2 ring-white ring-offset-4 ring-offset-black"
                          )} />
                          <span className={cn(
                            "text-[10px] uppercase tracking-widest font-light transition-colors",
                            isActive ? "text-white" : "text-white/40 group-hover:text-white"
                          )}>
                            {color}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.4em] font-medium text-white/40 mb-6">Size</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {SIZES.map(size => {
                      const isActive = activeFilters.size?.includes(size);
                      return (
                        <button
                          key={size}
                          onClick={() => toggleFilter('size', size)}
                          className={cn(
                            "h-12 text-[11px] font-light border transition-all duration-300",
                            isActive ? "bg-white text-black border-white" : "border-white/10 text-white/50 hover:border-white/30"
                          )}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.4em] font-medium text-white/40 mb-6">Price</h3>
                  <div className="space-y-4">
                    {PRICE_RANGES.map(range => {
                      const isActive = activeFilters.price?.includes(range.value);
                      return (
                        <button
                          key={range.value}
                          onClick={() => toggleFilter('price', range.value)}
                          className="flex items-center justify-between w-full group py-1"
                        >
                          <span className={cn(
                            "text-[11px] uppercase tracking-widest font-light transition-colors",
                            isActive ? "text-white" : "text-white/40 group-hover:text-white/60"
                          )}>
                            {range.label}
                          </span>
                          {isActive && <Check size={14} className="text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-24 pt-12 border-t border-white/5">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-white text-black py-4 text-[11px] uppercase tracking-[0.3em] font-medium rounded-full"
                >
                  View Items
                </button>
                <button 
                  onClick={() => onFilterChange({})}
                  className="w-full mt-4 text-[9px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-colors"
                >
                  Clear All
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
