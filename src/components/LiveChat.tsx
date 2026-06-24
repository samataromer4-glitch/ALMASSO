/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageSquare, X, Send, User } from 'lucide-react';
import { Language, Message } from '../types';
import { TRANSLATIONS } from '../data/initialData';

interface LiveChatProps {
  lang: Language;
}

export const LiveChat: React.FC<LiveChatProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'owner',
      text: lang === 'so' 
        ? "Asc! Soo dhowow. Waxaan nahay MAASH. Sideen maanta kuu caawin karnaa? (Ku qor meelaha aad joogto sida Hargeisa ama Muqdisho si aan kuu siino macluumaadka dhiibista)"
        : "Asc! Welcome to MAASH Direct Shopping support. How can we help you today? Leave us a message or ask about cities (Hargeisa, Mogadishu) for instant delivery answers.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: 'm-' + Date.now(),
      sender: 'customer',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText.toLowerCase();
    setInputText('');

    // Trigger instant merchant simulation response
    setTimeout(() => {
      let responseText = "";

      if (currentInput.includes('hargeisa') || currentInput.includes('hargeysa') || currentInput.includes('somaliland')) {
        responseText = lang === 'so'
          ? "Hargeisa dhiibista waa bilaash! Waxay kugu soo gaadhaysaa 2 sacadood gudihiis adoo ku bixinaya ZAAD Service."
          : "Hargeisa orders are delivered within 2 hours maximum! Fully zero-cost shipping, convenient payment via ZAAD.";
      } else if (currentInput.includes('mogadishu') || currentInput.includes('muqdisho') || currentInput.includes('xamar')) {
        responseText = lang === 'so'
          ? "Mogadishu dhiibista waa 3 saacadood. Waxaad ku bixin kartaa EVC Plus si fudud, rukunna waan kuu diyaarinaynaa."
          : "Mogadishu orders are processed instantly. Delivery takes about 3 hours. Easy payments accepted via EVC Plus.";
      } else if (currentInput.includes('garowe') || currentInput.includes('puntland') || currentInput.includes('boosaaso')) {
        responseText = lang === 'so'
          ? "Garowe iyo Boosaaso dhiibista adoo jooga waxaa nnoo fududeynaya Sahal Service. Waxay kugu soo gaaraysaa isla maanta."
          : "Puntland deliveries (Garowe, Bosaso) are dispatched on the same day. Safe payments processed via Sahal.";
      } else if (currentInput.includes('dhimis') || currentInput.includes('discount') || currentInput.includes('qiimo')) {
        responseText = lang === 'so'
          ? "Dhammaan alaabo dukaankeena yaala waa qiimo aad u jaban oo dhimis lagu sameeyay! Haddii aad wax badan dalbato dhiibista gabi ahaanba waa bilaash."
          : "All items listed are pre-discounted at their lowest cost! If you order multiple items, delivery is completely free!";
      } else {
        responseText = lang === 'so'
          ? "Mahadsanid macmiil! Farriintaada waa la duubay. Mulkiilaha dukaanku wuu kula soo xiriiri doonaa muddo 5 daqiiqo ah gudihiis si uu kuugu dhiibo dalabka."
          : "Thank you for reaching out! Your query is forwarded directly to the store owner. We will contact you or update your order status shortly.";
      }

      setMessages(prev => [...prev, {
        id: 'm-reply-' + Date.now(),
        sender: 'owner',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 text-xs">
      {isOpen ? (
        <div className="bg-white rounded-3xl w-80 sm:w-96 h-100 shadow-2xl border border-slate-150 flex flex-col justify-between overflow-hidden animate-scale-up">
          
          {/* Support Header */}
          <div className="bg-slate-950 text-white p-4.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <span className="block h-2.5 w-2.5 rounded-full bg-emerald-500 absolute -bottom-0.5 -right-0.5 border border-slate-950"></span>
                <div className="h-8 w-8 bg-amber-400 text-slate-950 rounded-xl flex items-center justify-center font-black">
                  A
                </div>
              </div>
              <div>
                <h4 className="font-extrabold text-white text-xs">{t.chatHeading}</h4>
                <p className="text-[10px] text-amber-400 font-bold">{t.chatStatus}</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-900"
              id="live-chat-close-btn"
            >
              <X size={16} />
            </button>
          </div>

          {/* Interactive Logs */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col max-w-[85%] ${
                  m.sender === 'customer' ? 'ml-auto' : 'mr-auto'
                }`}
              >
                <div
                  className={`p-3 rounded-2xl leading-relaxed text-xs shadow-sm font-medium ${
                    m.sender === 'customer'
                      ? 'bg-amber-400 text-slate-950 rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-150/60 rounded-bl-none'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                <span className={`text-[8px] text-slate-400 mt-1 block ${
                  m.sender === 'customer' ? 'text-right' : 'text-left'
                }`}>
                  {m.timestamp}
                </span>
              </div>
            ))}
          </div>

          {/* Message Dispatch triggers */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2 shrink-0">
            <input
              type="text"
              placeholder={t.chatPrompt}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs text-slate-800 font-medium"
              id="live-chat-input-field"
            />
            <button
              type="submit"
              className="bg-slate-950 hover:bg-amber-400 hover:text-slate-950 text-white font-black px-4.5 rounded-xl transition-all"
              id="live-chat-send-btn"
            >
              <Send size={13} />
            </button>
          </form>

        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-slate-950 hover:bg-slate-800 text-white border border-slate-850 px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-2 font-extrabold hover:scale-105 transition-all text-xs scroll-smooth tracking-tight"
          id="live-chat-trigger-icon"
        >
          <MessageSquare size={16} className="text-amber-450 animate-bounce" />
          <span>{lang === 'so' ? 'Wada-hadal' : 'Live Support'}</span>
        </button>
      )}
    </div>
  );
};
