/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem, Language } from '../types';
import { TRANSLATIONS } from '../data/initialData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  lang,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[lang];

  const subtotalSum = cartItems.reduce((acc, item) => {
    const finalPrice = item.discountPrice !== null ? item.discountPrice : item.price;
    return acc + (finalPrice * item.quantity);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Background Dim layer */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
      ></div>

      {/* Slide body */}
      <div className="relative bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl overflow-hidden animate-slide-left text-xs">
        
        {/* Drawer Header details */}
        <div className="flex items-center justify-between border-b border-slate-100 p-5 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-amber-500" size={18} />
            <h2 className="text-sm font-black text-slate-950">
              {t.cartTitle}
            </h2>
            <span className="bg-slate-100 text-slate-800 rounded-full h-5 px-1.8 font-extrabold text-[10px] flex items-center justify-center">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-650 p-1.5 rounded-full hover:bg-slate-100 transition duration-150"
            id="cart-drawer-close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content list block */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-8 select-none">
              <div className="h-16 w-16 bg-slate-50 text-slate-350 rounded-full flex items-center justify-center text-3xl">
                🛒
              </div>
              <div className="space-y-1">
                <p className="font-extrabold text-slate-800 text-sm">{t.cartEmpty}</p>
                <p className="text-slate-400 max-w-[200px] text-[10px]">
                  {lang === 'so' ? 'Ku laabo dukaanka si aad kariirada alaab ugu darto.' : 'Return to products list to find authentic items.'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-white font-extrabold px-5 py-2.5 rounded-xl transition duration-200"
              >
                {lang === 'so' ? 'Hadda Dukaamayso' : 'Browse Products Now'}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => {
                const itemPrice = item.discountPrice !== null ? item.discountPrice : item.price;
                return (
                  <div 
                    key={item.id} 
                    className="flex gap-4 p-3.5 bg-slate-50 border border-slate-100 rounded-2xl relative group hover:border-slate-250 transition duration-200"
                  >
                    {/* Item symbol illustration card */}
                    <div className="h-14 w-14 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center select-none shrink-0 overflow-hidden">
                      {item.image && (item.image.startsWith('http://') || item.image.startsWith('https://') || item.image.startsWith('data:image/') || item.image.includes('.') || item.image.includes('/')) ? (
                        <img 
                          src={item.image} 
                          alt={item.title[lang]} 
                          className="w-full h-full object-contain p-1"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="text-3xl">{item.image}</span>
                      )}
                    </div>

                    {/* Metadata summary copy */}
                    <div className="flex-1 space-y-1.5">
                      <h4 className="font-bold text-slate-900 pr-6 leading-tight line-clamp-1">
                        {item.title[lang]}
                      </h4>
                      <p className="font-black text-slate-950 text-xs">
                        ${itemPrice.toFixed(2)}
                      </p>

                      {/* Incrementor counters */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="bg-white hover:bg-slate-200/80 border border-slate-200 text-slate-700 h-5.5 w-5.5 rounded-lg flex items-center justify-center font-bold text-xs"
                          id={`cart-minus-item-${item.id}`}
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-black text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="bg-white hover:bg-slate-200/80 border border-slate-200 text-slate-700 h-5.5 w-5.5 rounded-lg flex items-center justify-center font-bold text-xs"
                          id={`cart-plus-item-${item.id}`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Permanent removal button */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="absolute top-4.5 right-4 text-slate-400 hover:text-rose-600 transition duration-150"
                      title={t.deleteItem}
                      id={`cart-remove-item-${item.id}`}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Totals & call actions footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-slate-150 p-5 bg-slate-50 shrink-0 space-y-4">
            <div className="space-y-1.5 font-bold text-slate-600">
              <div className="flex justify-between items-center text-slate-400 text-[10px]">
                <span>{lang === 'so' ? 'Kuhore dhiibista (Delivery)' : 'Local Express Delivery'}</span>
                <span className="text-emerald-600 uppercase font-black">{lang === 'so' ? 'Bilaash (Free)' : 'Free'}</span>
              </div>
              <div className="flex justify-between items-center text-slate-950 text-sm font-black border-t border-slate-100 pt-2">
                <span>{t.subtotal}:</span>
                <span className="text-lg text-slate-900">${subtotalSum.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-slate-950 hover:bg-amber-400 hover:text-slate-950 text-white transition-all duration-250 font-black py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-slate-950/10 pointer-events-auto"
              id="cart-drawer-checkout-btn"
            >
              <span>{t.checkoutBtn}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
