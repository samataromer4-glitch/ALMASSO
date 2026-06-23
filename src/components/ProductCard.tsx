/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, MessageSquareCode, ShoppingCart, ShoppingBag, Eye, Phone } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../data/initialData';

interface ProductCardProps {
  product: Product;
  lang: Language;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
  onWhatsAppOrder: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang,
  onAddToCart,
  onViewDetails,
  onWhatsAppOrder,
}) => {
  const t = TRANSLATIONS[lang];
  const hasDiscount = product.discountPrice !== null;
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:border-slate-200/80 transition-all duration-300 flex flex-col justify-between relative">
      
      {/* Sale / Flash Discount badge */}
      {product.isFlash && !isOutOfStock && (
        <span className="absolute top-3.5 left-3.5 bg-rose-600 text-white font-black text-[9px] uppercase px-2.5 py-1 rounded-full z-10 shadow tracking-wider animate-pulse">
          {t.flashSale}
        </span>
      )}

      {/* Stock warning badge */}
      {isOutOfStock ? (
        <span className="absolute top-3.5 right-3.5 bg-slate-500/90 text-white font-black text-[9px] uppercase px-2 py-0.5 rounded-full z-10">
          {t.stockOut}
        </span>
      ) : product.stock <= 4 ? (
        <span className="absolute top-3.5 right-3.5 bg-amber-500 text-slate-950 font-black text-[8px] uppercase px-2 py-0.5 rounded-full z-10">
          {product.stock} {t.stock}
        </span>
      ) : null}

      {/* Interactive Illustration representation */}
      <div 
        onClick={() => onViewDetails(product)}
        className="bg-slate-50 border-b border-slate-100 relative aspect-square w-full flex items-center justify-center select-none group-hover:scale-102 transition-transform duration-350 cursor-pointer overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 z-10">
          <span className="bg-white text-slate-900 p-2 text-xs rounded-full shadow-lg font-bold flex items-center gap-1 scale-90 group-hover:scale-100 transition-all duration-300">
            <Eye size={14} />
            <span>{lang === 'so' ? 'Eeg' : 'View'}</span>
          </span>
        </div>
        
        {product.image && (product.image.startsWith('http://') || product.image.startsWith('https://') || product.image.startsWith('data:image/') || product.image.includes('.') || product.image.includes('/')) ? (
          <img 
            src={product.image} 
            alt={product.title[lang]} 
            className="w-full h-full object-contain p-2 bg-white"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="text-6xl">{product.image}</span>
        )}
      </div>

      {/* Text Copy Description info */}
      <div className="p-4.5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-1.5">
          {/* Category designation */}
          <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-widest">
            {product.category}
          </span>
          
          <h4 
            onClick={() => onViewDetails(product)}
            className="font-bold text-slate-900 text-sm hover:text-amber-500 cursor-pointer line-clamp-2 leading-snug tracking-tight"
          >
            {product.title[lang]}
          </h4>

          {/* Peer reviews rating */}
          <div className="flex items-center gap-1 text-amber-500 text-[11px] font-bold">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={11} 
                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                  className={i < Math.floor(product.rating) ? "text-amber-400" : "text-slate-200"}
                />
              ))}
            </div>
            <span className="ml-[2px] font-extrabold text-slate-800">{product.rating}</span>
            <span className="text-slate-400 font-normal">({product.reviewsCount} {t.reviews})</span>
          </div>
        </div>

        {/* Pricing tag & trigger line */}
        <div className="pt-3 border-t border-slate-100/80 flex items-center justify-between gap-2">
          
          <div>
            {hasDiscount ? (
              <div className="space-y-0.5">
                <span className="text-xs line-through text-slate-400 block font-medium">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-base font-black text-slate-900">
                  ${product.discountPrice?.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-base font-black text-slate-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick Fast WhatsApp Order Checkout Integration */}
            <button
              onClick={() => onWhatsAppOrder(product)}
              className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl transition duration-200 flex items-center justify-center"
              title={t.whatsappOrder}
              id={`prod-card-wa-btn-${product.id}`}
            >
              <Phone size={13} />
            </button>

            {/* Main Add to Basket action */}
            <button
              disabled={isOutOfStock}
              onClick={() => onAddToCart(product)}
              className={`font-black text-xs px-4 py-2.5 rounded-xl transition duration-250 ${
                isOutOfStock 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-white shadow-md'
              }`}
              id={`prod-card-add-btn-${product.id}`}
            >
              <span className="flex items-center gap-1">
                <ShoppingCart size={12} />
                <span>{t.addToCart}</span>
              </span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
