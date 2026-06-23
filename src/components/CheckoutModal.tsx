/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, RadioTower, Phone, MapPin, Coins, ArrowRight, ShieldCheck, MessageSquare } from 'lucide-react';
import { CartItem, Language, Order } from '../types';
import { TRANSLATIONS } from '../data/initialData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  cartItems: CartItem[];
  onOrderCompleted: (newOrder: Order) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  openUrlSafe: (url: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  lang,
  cartItems,
  onOrderCompleted,
  showToast,
  openUrlSafe,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[lang];

  // Form Fields State
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [gatewaySelected, setGatewaySelected] = useState<'evc' | 'zaad' | 'sahal' | 'mpesa'>('zaad');
  const [checkoutMethod, setCheckoutMethod] = useState<'whatsapp' | 'stk'>('whatsapp');

  // STK simulation sequence states
  const [stkStatus, setStkStatus] = useState<'idle' | 'push_sent' | 'processing' | 'success'>('idle');
  const [countdown, setCountdown] = useState(5);

  const totalSum = cartItems.reduce((acc, item) => {
    const finalPrice = item.discountPrice !== null ? item.discountPrice : item.price;
    return acc + (finalPrice * item.quantity);
  }, 0);

  // Generates a clean, professional, Somali formatted click-to-chat order invoice
  const generateProfessionalWaText = (randomId: number, nameVal: string, phoneVal: string) => {
    const origin = window.location.origin || '';
    
    // Construct simplified list of items showing only product, price, and link
    const itemsBlock = cartItems.map((item) => {
       const price = item.discountPrice !== null ? item.discountPrice : item.price;
       const productLink = `${origin}/?product=${item.id}`;
 
       return `🛍️ *Alaabta:* ${item.title[lang]} (x${item.quantity})\n` +
              `💰 *Qiimaha:* $${price.toFixed(2)}\n` +
              `🔗 *Link-ga:* ${productLink}`;
    }).join('\n\n');
 
    return `📦 *Dalab Cusub!*\n` +
           `*Macmiilka:* ${nameVal}\n` +
           `*Tel:* ${phoneVal}\n` +
           `*Dalabka ID:* #${randomId}\n` +
           `*Wadarta:* $${totalSum.toFixed(2)}\n\n` +
           `${itemsBlock}`;
  };

  // Trigger simulated STK push flow or WhatsApp click-to-chat redirect
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim() || !city.trim()) {
      showToast(
        lang === 'so' ? 'Fadlan ku qor magacaaga, taleefanka, iyo magaalada!' : 'Please fill in Name, Phone, and City!',
        'error'
      );
      return;
    }

    const randomId = Math.floor(1000 + Math.random() * 9000);
    const orderId = 'ALM-' + randomId;

    const orderProducts = cartItems.map(item => ({
      productId: item.id,
      title: item.title[lang],
      quantity: item.quantity,
      pricePaid: item.discountPrice !== null ? item.discountPrice : item.price,
    }));

    const newOrder: Order = {
      id: orderId,
      customerName: fullName,
      phoneNumber: phoneNumber,
      city: city,
      neighborhood: neighborhood || "N/A",
      paymentGateway: checkoutMethod === 'whatsapp' ? 'whatsapp' : gatewaySelected,
      products: orderProducts,
      totalAmount: totalSum,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    if (checkoutMethod === 'whatsapp') {
      // Append the order state to live DB so merchant knows about it
      onOrderCompleted(newOrder);

      // Construct WhatsApp clickable template as requested by customer
      const waText = generateProfessionalWaText(randomId, fullName, phoneNumber);

      // Redirect securely to +252636270866
      openUrlSafe(`https://wa.me/252636270866?text=${encodeURIComponent(waText)}`);
      onClose();
    } else {
      // Trigger simulated STK Sequence
      setStkStatus('push_sent');
    }
  };

  useEffect(() => {
    let timer: any;
    if (stkStatus === 'push_sent') {
      timer = setTimeout(() => {
        setStkStatus('processing');
      }, 1500);
    } else if (stkStatus === 'processing') {
      if (countdown > 0) {
        timer = setTimeout(() => {
          setCountdown(prev => prev - 1);
        }, 1000);
      } else {
        // Formulate order and resolve
        const orderId = 'ALM-' + Math.floor(1000 + Math.random() * 9000);
        const orderProducts = cartItems.map(item => ({
          productId: item.id,
          title: item.title[lang],
          quantity: item.quantity,
          pricePaid: item.discountPrice !== null ? item.discountPrice : item.price,
        }));

        const newOrder: Order = {
          id: orderId,
          customerName: fullName,
          phoneNumber: phoneNumber,
          city: city,
          neighborhood: neighborhood || "N/A",
          paymentGateway: gatewaySelected,
          products: orderProducts,
          totalAmount: totalSum,
          status: 'pending',
          createdAt: new Date().toISOString(),
        };

        setStkStatus('success');
        onOrderCompleted(newOrder);
      }
    }
    return () => clearTimeout(timer);
  }, [stkStatus, countdown]);

  const handleWhatsAppRedirectAll = () => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const waText = generateProfessionalWaText(randomId, fullName, phoneNumber);

    openUrlSafe(`https://wa.me/252636270866?text=${encodeURIComponent(waText)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Dim layer */}
      <div 
        onClick={stkStatus === 'idle' ? onClose : undefined}
        className="absolute inset-0 bg-slate-900/75 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Main Form container content */}
      <div className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-scale-up text-xs">
        
        {/* Header bar controls */}
        <div className="flex items-center justify-between border-b border-slate-100 p-5 shrink-0 bg-slate-50">
          <div className="space-y-0.5">
            <h3 className="text-sm font-black text-slate-950 flex items-center gap-1.5">
              <ShieldCheck className="text-amber-500" size={16} />
              <span>{t.checkoutTitle}</span>
            </h3>
            <p className="text-[10px] text-slate-400 font-medium">
              {lang === 'so' ? 'Bixi si aamin ah adoo adeegsanaya dhiibista degdega ah' : 'Express checkout matching secure regional routing'}
            </p>
          </div>
          {stkStatus === 'idle' && (
            <button 
              onClick={onClose} 
              className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200"
              id="checkout-modal-close"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {stkStatus === 'idle' && (
          <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-4">
            
            {/* Checkout Method Selector Tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl">
              <button
                type="button"
                onClick={() => setCheckoutMethod('whatsapp')}
                className={`py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
                  checkoutMethod === 'whatsapp'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <MessageSquare size={14} className="text-emerald-600" />
                <span>{lang === 'so' ? 'Ku Dalbo WhatsApp' : 'Order on WhatsApp'}</span>
              </button>
              <button
                type="button"
                onClick={() => setCheckoutMethod('stk')}
                className={`py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
                  checkoutMethod === 'stk'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Coins size={14} className="text-amber-500" />
                <span>{lang === 'so' ? 'Mobile Money STK' : 'Mobile Money STK'}</span>
              </button>
            </div>

            {/* Input fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="font-extrabold text-slate-500 block">{t.fullName} *</label>
                <input
                  type="text"
                  required
                  placeholder={t.fullNamePlace}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-slate-200/80 px-3.5 py-2.5 rounded-xl bg-slate-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-400 text-slate-900 font-medium text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-slate-500 block">{t.phone} *</label>
                <input
                  type="tel"
                  required
                  placeholder={t.phonePlace}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full border border-slate-200/80 px-3.5 py-2.5 rounded-xl bg-slate-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-400 text-slate-900 font-medium text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="font-extrabold text-slate-500 block">{t.city} *</label>
                <input
                  type="text"
                  required
                  placeholder={t.cityPlace}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border border-slate-200/80 px-3.5 py-2.5 rounded-xl bg-slate-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-400 text-slate-900 font-medium text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-slate-500 block">{t.neighborhood}</label>
                <input
                  type="text"
                  placeholder={t.neighborhoodPlace}
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full border border-slate-200/80 px-3.5 py-2.5 rounded-xl bg-slate-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-400 text-slate-900 font-medium text-xs"
                />
              </div>
            </div>

            {/* Gateway choices */}
            {checkoutMethod === 'stk' && (
              <div className="space-y-4">
                <div className="space-y-2 pt-1 animate-scale-up">
                  <label className="font-extrabold text-slate-500 block">{t.paymentGateway}</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { id: 'zaad', name: 'ZAAD Service', desc: 'Somaliland (Telesom)' },
                      { id: 'evc', name: 'EVC Plus', desc: 'Central/South (Hormuud)' },
                      { id: 'sahal', name: 'Sahal', desc: 'Puntland (Golis)' },
                      { id: 'mpesa', name: 'M-Pesa Pay', desc: 'Kenya (Safaricom)' },
                    ].map((gate) => (
                      <button
                        key={gate.id}
                        type="button"
                        onClick={() => setGatewaySelected(gate.id as any)}
                        className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center transition-all duration-200 ${
                          gatewaySelected === gate.id
                            ? 'border-amber-500 bg-amber-50/20 shadow-sm ring-1 ring-amber-500'
                            : 'border-slate-150 bg-slate-50 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span className="font-black text-slate-900 text-xs">{gate.name}</span>
                        <span className="text-[9px] text-slate-400 font-bold mt-0.5">{gate.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hint Box informational */}
                <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-2xl flex gap-2.5 items-start animate-scale-up">
                  <span className="text-base select-none">💡</span>
                  <p className="text-[10px] text-amber-900 font-bold leading-relaxed">
                    {t.paymentGatewayDesc}
                  </p>
                </div>
              </div>
            )}

            {/* Large checkout actions row */}
            <div className="pt-3">
              {checkoutMethod === 'whatsapp' ? (
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                  id="checkout-confirm-whatsapp-btn"
                >
                  <MessageSquare size={16} />
                  <span>{lang === 'so' ? 'Dalbo Gacanta (Order Now)' : 'Order Now'}</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2.5">
                  {/* Fallback secondary checkout over WhatsApp as prioritized in spec */}
                  <button
                    type="button"
                    onClick={handleWhatsAppRedirectAll}
                    className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-black py-3 rounded-2xl transition flex items-center justify-center gap-1.5"
                    id="checkout-wa-fallback-btn"
                  >
                    <MessageSquare size={13} />
                    <span>{lang === 'so' ? 'Ku dalbo WhatsApp' : 'Submit on WhatsApp'}</span>
                  </button>

                  <button
                    type="submit"
                    className="flex-1 bg-slate-950 hover:bg-amber-400 hover:text-slate-950 text-white font-black py-3 rounded-2xl shadow-lg transition-all"
                    id="checkout-confirm-stk-btn"
                  >
                    <span className="flex items-center justify-center gap-1">
                      <span>{t.completeOrder}</span>
                      <ArrowRight size={13} />
                    </span>
                  </button>
                </div>
              )}
            </div>
          </form>
        )}

        {/* ==================== ACTIVE STK DIALOG SEQUENCES ==================== */}
        {stkStatus !== 'idle' && (
          <div className="p-8 text-center space-y-6">
            
            {stkStatus === 'push_sent' && (
              <div className="space-y-4 animate-pulse">
                <div className="h-14 w-14 bg-amber-50 text-amber-500 border border-amber-100 rounded-full flex items-center justify-center text-2xl mx-auto">
                  <RadioTower className="animate-spin" size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-slate-900 text-sm">
                    {lang === 'so' ? 'Farriinta STK Push waa la soo diray...' : 'Initiating STK Session...'}
                  </h4>
                  <p className="text-slate-400 text-[10.5px] max-w-sm mx-auto leading-relaxed">
                    {lang === 'so' 
                      ? 'Nidaamka wuxuu isku xirayaa lambarkaada gacanta ee uu u soo dirayo dalabka dabiiciga ah.'
                      : 'Connecting securely to the selected telcom gateway to push confirmation window.'}
                  </p>
                </div>
              </div>
            )}

            {stkStatus === 'processing' && (
              <div className="space-y-4">
                <div className="h-16 w-16 bg-amber-100 text-slate-800 rounded-2xl flex items-center justify-center text-2xl mx-auto font-black shadow-inner">
                  {countdown}
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    {t.stkTitle}
                  </h4>
                  <p className="text-amber-700 font-extrabold text-[11px]">
                    {t.stkPrompt}
                  </p>
                  <p className="text-slate-400 text-[10px]">
                    {t.stkProgress}
                  </p>
                </div>
              </div>
            )}

            {stkStatus === 'success' && (
              <div className="space-y-5 animate-scale-up">
                <div className="h-14 w-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-2xl mx-auto shadow-sm">
                  ✓
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-slate-950 text-base">
                    {lang === 'so' ? 'Lacag-bixinta waa la Xaqiijiyay!' : 'Transaction Approved!'}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto">
                    {t.stkSuccess}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setStkStatus('idle');
                    setCountdown(5);
                    onClose();
                  }}
                  className="bg-slate-950 hover:bg-slate-800 text-white font-black px-6 py-2.5 rounded-xl transition shadow"
                  id="checkout-success-close-btn"
                >
                  {t.close}
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
