/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  variant = 'light', 
  showText = true,
  size = 'md'
}) => {
  // Determine badge and text dimensions based on size prop
  const badgeClasses = {
    sm: 'h-10 w-14 rounded-lg p-0.5',
    md: 'h-12 w-18 rounded-xl p-1',
    lg: 'h-16 w-24 rounded-2xl p-1.5'
  }[size];

  const titleClasses = {
    sm: 'text-xs tracking-wider',
    md: 'text-sm sm:text-base tracking-widest',
    lg: 'text-xl tracking-widest'
  }[size];

  const subClasses = {
    sm: 'text-[6px] tracking-widest',
    md: 'text-[8px] sm:text-[9px] tracking-[0.2em]',
    lg: 'text-[11px] tracking-[0.25em]'
  }[size];

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Monogram Badge inspired directly by the user's uploaded logo */}
      <div className={`bg-slate-50 shadow-sm border border-slate-200/60 shrink-0 flex items-center justify-center transition-all ${badgeClasses}`}>
        <svg 
          viewBox="0 0 120 70" 
          className="h-full w-full overflow-visible" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Crimson Red Left 'M' */}
          <text 
            x="12" 
            y="50" 
            fontFamily="'Playfair Display', Georgia, serif" 
            fontSize="45" 
            fontWeight="bold" 
            fill="#A91D22"
          >
            M
          </text>

          {/* Red Horizontal bar with serif on the left leg of the first M */}
          {/* Main bar */}
          <rect 
            x="0" 
            y="35" 
            width="17" 
            height="3" 
            fill="#A91D22" 
          />
          {/* Vertical serif at the left end of the bar */}
          <rect 
            x="0" 
            y="30" 
            width="3" 
            height="13" 
            fill="#A91D22" 
          />
          
          {/* Crimson Red Right 'M' */}
          <text 
            x="68" 
            y="50" 
            fontFamily="'Playfair Display', Georgia, serif" 
            fontSize="45" 
            fontWeight="bold" 
            fill="#A91D22"
          >
            M
          </text>
          
          {/* Stylized Overlapping Serif Letter 'B' (Gold / Orange) */}
          {/* Skewed/italicized and positioned to perfectly overlay both M's */}
          <text 
            x="40" 
            y="51" 
            fontFamily="'Playfair Display', Georgia, serif" 
            fontSize="51" 
            fontStyle="italic"
            fontWeight="900" 
            fill="#F39C12"
            style={{ 
              filter: 'drop-shadow(1px 2px 2px rgba(0,0,0,0.25))',
            }}
          >
            B
          </text>
        </svg>
      </div>

      {/* Typography block */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span 
            className={`font-black uppercase leading-none tracking-wider ${titleClasses} ${
              variant === 'light' ? 'text-white' : 'text-slate-950'
            }`}
            style={{ fontFamily: '"Montserrat", sans-serif' }}
          >
            MANSHA ALLAH
          </span>
          <span 
            className={`font-bold text-amber-500 uppercase mt-1 leading-none whitespace-nowrap opacity-95 ${subClasses}`}
            style={{ fontFamily: '"Montserrat", sans-serif' }}
          >
            BUILDING MATERIAL
          </span>
        </div>
      )}
    </div>
  );
};
