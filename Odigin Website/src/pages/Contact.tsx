import React from 'react';
import { motion } from 'motion/react';
import { CONTACT_CONTENT, BRAND_CONFIG } from '../data/config';
import { Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-brand-black">
      <div className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        
        <div>
          <header className="mb-24">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl font-serif italic mb-6"
            >
              Contact
            </motion.h1>
            <p className="text-[11px] uppercase tracking-[0.4em] text-white/40 leading-relaxed font-light max-w-sm">
              Connect with our atelier for partnerships, orders, or inquiries regarding our household manufacturing.
            </p>
          </header>

          <div className="space-y-16">
            <div className="flex items-start gap-8">
              <Mail size={18} strokeWidth={1} className="text-white/30" />
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-3">Email</h3>
                <a href={`mailto:${CONTACT_CONTENT.email}`} className="text-lg font-light tracking-widest hover:text-white/60 transition-colors">{CONTACT_CONTENT.email}</a>
              </div>
            </div>

            <div className="flex items-start gap-8">
              <MapPin size={18} strokeWidth={1} className="text-white/30" />
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-3">Location</h3>
                <p className="text-lg font-light tracking-widest">{CONTACT_CONTENT.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-8">
              <Clock size={18} strokeWidth={1} className="text-white/30" />
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-3">Atelier Hours</h3>
                <p className="text-lg font-light tracking-widest">{CONTACT_CONTENT.hours}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-12 bg-white/[0.02] border border-white/5 relative overflow-hidden group">
           <div className="relative z-10">
              <MessageSquare size={32} strokeWidth={0.5} className="text-white/20 mb-12" />
              <h2 className="text-3xl font-serif italic mb-8">Send a Message</h2>
              <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="text" 
                  placeholder="NAME"
                  className="w-full bg-transparent border-b border-white/10 py-4 text-[11px] uppercase tracking-widest focus:border-white transition-colors outline-none"
                />
                <input 
                  type="email" 
                  placeholder="EMAIL"
                  className="w-full bg-transparent border-b border-white/10 py-4 text-[11px] uppercase tracking-widest focus:border-white transition-colors outline-none"
                />
                <textarea 
                  placeholder="MESSAGE" 
                  rows={4}
                  className="w-full bg-transparent border-b border-white/10 py-4 text-[11px] uppercase tracking-widest focus:border-white transition-colors outline-none resize-none"
                />
                <button className="bg-white text-black px-12 py-4 text-[10px] uppercase tracking-[0.4em] font-medium rounded-full hover:bg-opacity-80 transition-all">
                  Send Inquiry
                </button>
              </form>
           </div>
           {/* Decorative background element */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
