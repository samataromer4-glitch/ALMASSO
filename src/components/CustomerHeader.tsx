/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, ShoppingCart, Lock, Globe, Sparkles } from 'lucide-react';
import { Language, Category } from '../types';
import { TRANSLATIONS, CATEGORIES } from '../data/initialData';
import { Logo } from './Logo';

interface CustomerHeaderProps {
  lang: Language;
  setLang: (l: Language) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (catId: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onGotoAdmin: () => void;
}

export const CustomerHeader: React.FC<CustomerHeaderProps> = ({
  lang,
  setLang,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  cartCount,
  onOpenCart,
  onGotoAdmin,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top bar with quick merchant note */}
        <div className="flex justify-between items-center py-2 text-[10px] border-b border-slate-800 text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{t.headerMuted}</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'so' ? 'en' : 'so')}
              className="hover:text-amber-400 font-extrabold flex items-center gap-1 transition-colors pointer-events-auto"
              id="language-toggle-btn"
            >
              <Globe size={11} />
              <span>{t.changeLang}</span>
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={onGotoAdmin}
              className="hover:text-amber-400 font-bold flex items-center gap-1 transition-colors cursor-pointer"
              id="admin-direct-link"
            >
              <Lock size={11} />
              <span>{lang === 'so' ? 'Mulkile' : 'Merchant'}</span>
            </button>
          </div>
        </div>

        {/* Main Header body */}
        <div className="flex flex-col md:flex-row py-4 justify-between items-center gap-4">
          
          {/* Logo element */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3">
              <Logo size="md" variant="light" />
              <span className="bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider self-center mb-0.5">
                SO1
              </span>
            </div>

            {/* Mobile shopping cart trigger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={onOpenCart}
                className="relative p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl transition duration-200 text-white"
                id="mobile-cart-trigger"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center animate-bounce shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search bar inside header */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder={t.searchPlace}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700/60 placeholder-slate-400 text-white pl-10 pr-4 py-2.5 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
              id="header-search-bar"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Regular Desktop cart button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenCart}
              className="relative bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-white transition-all duration-300 font-extrabold text-xs px-4.5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm pointer-events-auto"
              id="desktop-cart-trigger"
            >
              <ShoppingCart size={15} />
              <span>{t.cartTitle}</span>
              {cartCount > 0 ? (
                <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow">
                  {cartCount}
                </span>
              ) : (
                <span className="text-slate-450 text-[10px] font-normal">0</span>
              )}
            </button>
          </div>

        </div>

        {/* Categories scrollable pill filter banner */}
        <div className="flex items-center gap-2 border-t border-slate-800/60 py-3 overflow-x-auto scrollbar-none scroll-smooth">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition duration-250 shrink-0 flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/10'
                  : 'bg-slate-800/50 hover:bg-slate-800 hover:text-amber-300 text-slate-300'
              }`}
            >
              <span className="text-sm shrink-0">{cat.icon}</span>
              <span>{cat.name[lang]}</span>
            </button>
          ))}
        </div>

      </div>
    </header>
  );
};
