import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_CONFIG, FOOTER_CONTENT, NAVIGATION } from '../data/config';

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-white/10 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h2 className="text-2xl tracking-[0.4em] uppercase font-light mb-8">{BRAND_CONFIG.name}</h2>
          <p className="text-[12px] text-white/50 leading-relaxed max-w-xs uppercase tracking-widest font-light">
            {FOOTER_CONTENT.description}
          </p>
        </div>

        <div>
          <h3 className="text-[11px] uppercase tracking-[0.3em] font-medium mb-8 text-white/40">Information</h3>
          <ul className="flex flex-col gap-4 text-[11px] uppercase tracking-widest font-light">
            <li><Link to="/sizing" className="hover:text-white/50 transition-colors">Sizing Guide</Link></li>
            <li><Link to="/shipping" className="hover:text-white/50 transition-colors">Shipping & Returns</Link></li>
            <li><Link to="/ethics" className="hover:text-white/50 transition-colors">Ethical Sourcing</Link></li>
            <li><Link to="/contact" className="hover:text-white/50 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] uppercase tracking-[0.3em] font-medium mb-8 text-white/40">Connect</h3>
          <ul className="flex flex-col gap-4 text-[11px] uppercase tracking-widest font-light">
            {NAVIGATION.social.map(link => (
              <li key={link.name}>
                <a href={link.url} className="hover:text-white/50 transition-colors">{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-24 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-12">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
          {FOOTER_CONTENT.copyright}
        </span>
        <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-white/30">
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
