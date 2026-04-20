import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2, Loader2, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) {
  const { user, setCart } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!user) {
      alert('Please sign in to complete your order.');
      return;
    }

    setIsCheckingOut(true);
    try {
      // Create order in Firestore
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        userEmail: user.email,
        items,
        total: subtotal,
        status: 'Pending',
        createdAt: new Date().toISOString()
      });

      // Clear local and remote cart
      await setCart([]);
      setOrderComplete(true);
      
      setTimeout(() => {
        setOrderComplete(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an issue processing your order. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-black border-l border-white/10 z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-[14px] uppercase tracking-[0.3em] font-light">Your Bag ({items.length})</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:opacity-50 transition-opacity"
              >
                <X size={20} strokeWidth={1} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {orderComplete ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <CheckCircle2 size={64} className="text-white mb-8 mx-auto stroke-1" />
                    <h3 className="text-2xl font-serif italic mb-4">Order Received</h3>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-light">
                      Your object is being architected.<br />A narrative will follow in your inbox.
                    </p>
                  </motion.div>
                </div>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="text-[12px] uppercase tracking-widest text-white/30 mb-8">Your bag is empty</p>
                  <button 
                    onClick={onClose}
                    className="border border-white/30 px-8 py-3 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-full"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-6">
                    <div className="w-24 aspect-[3/4] bg-[#111] overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-[11px] uppercase tracking-widest font-medium max-w-[150px]">{item.name}</h3>
                          <span className="text-[12px] font-light">${item.price * item.quantity}</span>
                        </div>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-4">{item.category}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-white/10 rounded-full px-2 py-1 gap-4">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:text-white/50 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-[12px] font-light w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:text-white/50 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-white/30 hover:text-white transition-colors p-2"
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && !orderComplete && (
              <div className="p-8 border-t border-white/10 bg-black/40 backdrop-blur-xl">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-[11px] uppercase tracking-widest text-white/50">Subtotal</span>
                  <span className="text-[18px] font-light">${subtotal}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-white text-black py-5 text-[12px] uppercase tracking-[0.4em] font-medium hover:bg-opacity-90 disabled:opacity-50 transition-all rounded-full flex items-center justify-center gap-3"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Processing
                    </>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </button>
                <p className="text-center text-[9px] text-white/30 uppercase tracking-widest mt-6">
                  Shipping and taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
