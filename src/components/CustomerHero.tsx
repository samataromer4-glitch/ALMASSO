/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Smartphone, ShieldCheck, MapPin, Sparkles, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/initialData';

interface CustomerHeroProps {
  lang: Language;
}

export const CustomerHero: React.FC<CustomerHeroProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-xl">
      {/* Background abstract gradient accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 -ml-20 -mb-20 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl space-y-5">
        <div className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-440/20 text-amber-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
          <Sparkles size={11} className="animate-spin" />
          <span>{t.heroBadge}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
          {t.heroTitle}
        </h1>

        <p className="text-slate-350 text-xs sm:text-sm leading-relaxed max-w-xl font-medium">
          {t.heroSubtitle}
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 text-[11px] font-bold text-slate-300">
          <div className="flex items-center gap-2 bg-slate-800/40 border border-slate-800/80 p-3 rounded-2xl">
            <Smartphone className="text-amber-400 shrink-0" size={16} />
            <div>
              <p className="text-white text-xs">{lang === 'so' ? 'Telesom & Hormuud' : 'Express Mobiles'}</p>
              <p className="text-slate-400 text-[10px] font-normal">{lang === 'so' ? '1-Gujiye ku bixi ZAAD/EVC' : 'ZAAD & EVC Direct push'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/40 border border-slate-800/80 p-3 rounded-2xl">
            <MapPin className="text-amber-400 shrink-0" size={16} />
            <div>
              <p className="text-white text-xs">{lang === 'so' ? 'Keenis Toos Ah' : 'Instant Shipping'}</p>
              <p className="text-slate-400 text-[10px] font-normal">{lang === 'so' ? 'Guri-guri gudihiisa Hargeisa/Xamar' : 'Doorstep deliver within hours'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/40 border border-slate-800/80 p-3 rounded-2xl">
            <ShieldCheck className="text-amber-400 shrink-0" size={16} />
            <div>
              <p className="text-white text-xs">{lang === 'so' ? 'Ganacsi Sugan' : 'Secure Vault'}</p>
              <p className="text-slate-400 text-[10px] font-normal">{lang === 'so' ? 'Waa dammaanad buuxda' : 'Authorized Single Merchant'}</p>
            </div>
          </div>
        </div>

        {/* Action Button Link for WhatsApp */}
        <div className="pt-2">
          <a
            href="https://wa.me/252634000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold px-6 py-2.8 rounded-xl shadow-lg shadow-emerald-900/20 transition-all duration-200"
          >
            <MessageCircle size={15} />
            <span>{lang === 'so' ? 'Sii dalbo si degdeg ah (WhatsApp)' : 'Immediate WhatsApp Support'}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
