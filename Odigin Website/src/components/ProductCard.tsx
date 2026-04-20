import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  key?: React.Key;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="group cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#111]">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        
        {/* Quick Add Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-6 right-6 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:scale-110 active:scale-95 z-20"
        >
          <Plus size={20} strokeWidth={1} />
        </button>

        {/* Categories / Meta Tags */}
        <div className="absolute top-6 left-6 flex gap-2">
          <span className="text-[9px] uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1 text-white/70 border border-white/10 rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-start">
        <div>
          <h3 className="text-[12px] uppercase tracking-widest font-medium mb-1 group-hover:opacity-60 transition-opacity">
            {product.name}
          </h3>
          <p className="text-[11px] text-white/40 uppercase tracking-widest font-light">
            Essential Series
          </p>
        </div>
        <span className="text-[13px] font-light text-white/80">
          ${product.price}
        </span>
      </div>
    </motion.div>
  );
}
