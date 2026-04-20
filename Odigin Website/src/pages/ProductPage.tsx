import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowLeft, Star, ShieldCheck, Truck } from 'lucide-react';
import { products } from '../data/products';
import { Product } from '../types';
import { cn } from '../lib/utils';
import { SIZES } from '../components/FilterSidebar';

interface ProductPageProps {
  onAddToCart: (product: Product) => void;
}

export default function ProductPage({ onAddToCart }: ProductPageProps) {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-widest text-white/40 mb-8">Product not found</p>
          <Link to="/" className="text-[11px] uppercase tracking-[0.3em] border-b border-white/20 pb-1">Back to Gallery</Link>
        </div>
      </div>
    );
  }

  // Multi-image simulation using seed variations
  const productImages = [
    product.image,
    `${product.image}?v=1`,
    `${product.image}?v=2`
  ];

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Mobile Back Button */}
      <div className="lg:hidden px-6 py-4">
        <Link to="/" className="text-white/40 flex items-center gap-2">
          <ArrowLeft size={16} />
          <span className="text-[9px] uppercase tracking-[0.2em]">Gallery</span>
        </Link>
      </div>

      <main className="max-w-[1600px] mx-auto lg:min-h-[calc(100vh-100px)] lg:flex lg:items-center px-6 lg:px-12 py-12 lg:py-24">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left: Gallery (6 Columns) */}
          <div className="lg:col-span-7 relative group">
             {/* Desktop Navigation Helper */}
             <div className="absolute inset-y-0 left-0 w-1/2 z-10 cursor-alias" onClick={() => setActiveImageIndex(prev => (prev > 0 ? prev - 1 : productImages.length - 1))} />
             <div className="absolute inset-y-0 right-0 w-1/2 z-10 cursor-alias" onClick={() => setActiveImageIndex(prev => (prev < productImages.length - 1 ? prev + 1 : 0))} />

             <div className="aspect-[4/5] overflow-hidden bg-[#0a0a0a] relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    src={productImages[activeImageIndex]}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    className="w-full h-full object-cover grayscale brightness-90"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                {/* Image Navigation Indicators */}
                <div className="absolute bottom-10 left-10 flex gap-3 z-20">
                  {productImages.map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "h-[1px] transition-all duration-500",
                        activeImageIndex === i ? "w-12 bg-white" : "w-4 bg-white/20"
                      )} 
                    />
                  ))}
                </div>

                {/* Category Badge */}
                <div className="absolute top-10 right-10 z-20">
                  <span className="text-[8px] uppercase tracking-[0.4em] text-white/30 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                    {product.id} / {product.category}
                  </span>
                </div>
             </div>
          </div>

          {/* Right: Details (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Breadcrumb (Desktop) */}
            <nav className="hidden lg:flex items-center gap-4 text-[9px] uppercase tracking-[0.3em] text-white/30 mb-12">
              <Link to="/store" className="hover:text-white transition-colors">Store</Link>
              <span>/</span>
              <span className="text-white/60">{product.category}</span>
            </nav>

            <header className="mb-10 lg:mb-16">
              <div className="flex items-center gap-4 mb-4">
                 <div className="flex gap-1 text-white/60">
                    {[1,2,3,4,5].map(s => <Star key={s} size={10} fill="currentColor" stroke="none" />)}
                 </div>
                 <span className="text-[9px] uppercase tracking-widest text-white/30">(48 Reviews)</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-serif italic mb-6 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-6">
                 <span className="text-2xl font-light">${product.price}</span>
                 <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 line-through">${product.price + 150}</span>
              </div>
            </header>

            <div className="space-y-12 mb-16">
              {/* Product Info */}
              <p className="text-[13px] text-white/50 leading-relaxed uppercase tracking-[0.15em] font-light max-w-md">
                {product.description} Crafted with focus on architectural silhouette and thermal efficiency.
              </p>

              {/* Size Selection */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[10px] uppercase tracking-[0.4em] font-medium text-white/40">Select Size</h3>
                  <button className="text-[9px] uppercase tracking-widest text-white/20 border-b border-white/10 underline-offset-4 hover:text-white/40">Size Guide</button>
                </div>
                <div className="grid grid-cols-6 gap-2">
                   {SIZES.map(size => (
                     <button
                       key={size}
                       onClick={() => setSelectedSize(size)}
                       className={cn(
                         "h-12 text-[11px] font-light border transition-all duration-300",
                         selectedSize === size ? "bg-white text-black border-white" : "border-white/10 text-white/50 hover:border-white/30"
                       )}
                     >
                       {size}
                     </button>
                   ))}
                </div>
              </div>

              {/* Action */}
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => onAddToCart(product)}
                  disabled={!selectedSize}
                  className={cn(
                    "w-full py-6 text-[12px] uppercase tracking-[0.4em] font-medium rounded-full flex items-center justify-center gap-3 transition-all duration-500",
                    selectedSize 
                      ? "bg-white text-black hover:bg-opacity-90" 
                      : "bg-white/5 text-white/20 cursor-not-allowed border border-white/5"
                  )}
                >
                  <ShoppingBag size={16} strokeWidth={1.5} />
                  {selectedSize ? 'Add to Bag' : 'Select a size'}
                </button>
              </div>

              {/* Trust Features */}
              <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30">
                    <Truck size={14} />
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-white/40">Complimentary <br/> Shipping</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30">
                    <ShieldCheck size={14} />
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-white/40">24 Month <br/> Warranty</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
