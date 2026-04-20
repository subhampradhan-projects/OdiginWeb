import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { User } from 'firebase/auth';
import { BRAND_CONFIG, NAVIGATION } from '../data/config';

export default function Navbar({ 
  cartCount, 
  onOpenBag, 
  user, 
  onSignIn, 
  onSignOut 
}: { 
  cartCount: number, 
  onOpenBag: () => void,
  user: User | null,
  onSignIn: () => void,
  onSignOut: () => void
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav 
      className="relative w-full z-50 bg-brand-black border-b border-white/10 py-6"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-brand-offwhite hover:opacity-60 transition-opacity"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={20} strokeWidth={1} />
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-white/50">
          {NAVIGATION.links.map(link => (
            <Link key={link.name} to={link.path} className="hover:text-white transition-colors">{link.name}</Link>
          ))}
        </div>

        {/* Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-xl tracking-[0.5em] font-light uppercase">{BRAND_CONFIG.name}</span>
          <span className="text-[7px] tracking-[0.3em] uppercase opacity-40 mt-1">{BRAND_CONFIG.tagline}</span>
        </Link>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <Link to="/store" className="text-brand-offwhite hover:opacity-60 transition-opacity hidden md:block">
            <Search size={20} strokeWidth={1} />
          </Link>
          
          <div className="relative">
            <button 
              onClick={() => user ? setIsUserMenuOpen(!isUserMenuOpen) : onSignIn()}
              className="text-brand-offwhite hover:opacity-60 transition-opacity flex items-center gap-2"
            >
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || ''} className="w-5 h-5 rounded-full grayscale" />
              ) : (
                <UserIcon size={20} strokeWidth={1} />
              )}
            </button>
            <AnimatePresence>
              {isUserMenuOpen && user && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-4 w-48 bg-brand-black border border-white/10 p-4 shadow-2xl z-[60]"
                >
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-3 truncate">{user.email}</p>
                  
                  <Link 
                    to="/account" 
                    className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white hover:opacity-60 transition-opacity w-full mb-3"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Your Account
                  </Link>

                  {user.email === 'subhampradhancollective@gmail.com' && (
                    <Link 
                      to="/seller-dashboard" 
                      className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white hover:opacity-60 transition-opacity w-full mb-3"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={() => { onSignOut(); setIsUserMenuOpen(false); }}
                    className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white hover:opacity-60 transition-opacity w-full pt-3 border-t border-white/5"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={onOpenBag}
            className="relative text-brand-offwhite hover:opacity-60 transition-opacity flex items-center gap-2"
          >
            <ShoppingBag size={20} strokeWidth={1} />
            <span className="text-[10px] uppercase tracking-widest font-light hidden sm:inline">Bag ({cartCount})</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full sm:hidden" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-black z-[100] lg:hidden flex flex-col items-center justify-center"
          >
            <button 
              className="absolute top-8 right-6 text-brand-offwhite"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={24} strokeWidth={1} />
            </button>
            
            <div className="flex flex-col gap-8 text-center">
              {NAVIGATION.links.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link 
                    to={item.path} 
                    className="text-2xl font-light uppercase tracking-[0.3em] hover:opacity-50 transition-opacity"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
