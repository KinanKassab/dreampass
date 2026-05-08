'use client';

import React from 'react';
import AppImage from '@/components/ui/AppImage';

export default function PolaroidPhoto() {
  return (
    <div className="relative flex items-end justify-center" style={{ width: 280, height: 340 }}>

      {/* Bow decoration on top-right corner of polaroid */}
      <div
        className="absolute ribbon-wave"
        style={{ top: 30, right: -10, zIndex: 20 }}>
        
        <BowSVG />
      </div>

      {/* Polaroid frame */}
      <div className="polaroid-frame floating" style={{ zIndex: 10, width: 240 }}>
        <div className="polaroid-shine" />

        {/* Photo area */}
        <div
          className="relative overflow-hidden"
          style={{ width: '100%', height: 200, borderRadius: 2, background: '#e8f0f8' }}>
          
          <AppImage
            src="https://img.rocket.new/generatedImages/rocket_gen_img_18c630dae-1770993257921.png"
            alt="Couple holding hands close together, romantic indoor setting with warm lighting"
            fill
            sizes="240px"
            className="object-cover"
            priority />
          
          {/* Glass reflection overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 40%, rgba(255,255,255,0.05) 100%)'
            }} />
          
        </div>

        {/* Polaroid bottom text area */}
        <div className="flex items-center justify-center" style={{ height: 36 }}>
          <p
            className="text-center text-xs font-medium"
            style={{ color: '#aab8c8', fontFamily: 'cursive', letterSpacing: '0.05em' }}>
            
            for you ♡
          </p>
        </div>
      </div>

      {/* Teddy bear sticker — bottom left */}
      <div
        className="absolute teddy-sticker"
        style={{ bottom: -40, left: -36, zIndex: 15 }}>
        
        <TeddySVG />
      </div>

      {/* Small star decorations around polaroid */}
      <div className="absolute" style={{ top: 20, left: -20, zIndex: 12 }}>
        <StarSVG size={14} opacity={0.7} delay={0} />
      </div>
      <div className="absolute" style={{ top: 60, right: -24, zIndex: 12 }}>
        <StarSVG size={10} opacity={0.5} delay={0.5} />
      </div>
      <div className="absolute" style={{ bottom: 80, left: -16, zIndex: 12 }}>
        <StarSVG size={8} opacity={0.6} delay={1} />
      </div>
      <div className="absolute" style={{ bottom: 40, right: -18, zIndex: 12 }}>
        <StarSVG size={12} opacity={0.4} delay={1.5} />
      </div>
    </div>);

}

function BowSVG() {
  return (
    <svg width="80" height="60" viewBox="0 0 80 60" fill="none" className="bow-decoration">
      {/* Left wing */}
      <ellipse cx="22" cy="25" rx="18" ry="12" fill="#A8D8F0" opacity="0.9" transform="rotate(-15 22 25)" />
      <ellipse cx="22" cy="25" rx="14" ry="8" fill="#C5E8FF" opacity="0.7" transform="rotate(-15 22 25)" />
      {/* Right wing */}
      <ellipse cx="58" cy="25" rx="18" ry="12" fill="#A8D8F0" opacity="0.9" transform="rotate(15 58 25)" />
      <ellipse cx="58" cy="25" rx="14" ry="8" fill="#C5E8FF" opacity="0.7" transform="rotate(15 58 25)" />
      {/* Center knot */}
      <circle cx="40" cy="25" r="8" fill="#7CC4E8" />
      <circle cx="40" cy="25" r="5" fill="#A8D8F0" />
      {/* Ribbons hanging down */}
      <path d="M34 30 Q28 45 22 52" stroke="#A8D8F0" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M46 30 Q52 45 58 52" stroke="#A8D8F0" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Highlight dots on wings */}
      <circle cx="16" cy="22" r="2.5" fill="white" opacity="0.6" />
      <circle cx="64" cy="22" r="2.5" fill="white" opacity="0.6" />
    </svg>);

}

function TeddySVG() {
  return (
    <svg width="120" height="145" viewBox="0 0 90 110" fill="none">
      {/* Shadow */}
      <ellipse cx="45" cy="108" rx="28" ry="6" fill="rgba(0,80,160,0.15)" />
      {/* Body */}
      <ellipse cx="45" cy="78" rx="26" ry="28" fill="#E8F4FF" />
      <ellipse cx="45" cy="78" rx="22" ry="24" fill="#F0F8FF" />
      {/* Tummy */}
      <ellipse cx="45" cy="82" rx="13" ry="14" fill="#D0E8F8" opacity="0.7" />
      {/* Left arm */}
      <ellipse cx="20" cy="74" rx="9" ry="7" fill="#E8F4FF" transform="rotate(-20 20 74)" />
      {/* Right arm */}
      <ellipse cx="70" cy="74" rx="9" ry="7" fill="#E8F4FF" transform="rotate(20 70 74)" />
      {/* Left leg */}
      <ellipse cx="32" cy="100" rx="9" ry="7" fill="#E8F4FF" transform="rotate(-10 32 100)" />
      {/* Right leg */}
      <ellipse cx="58" cy="100" rx="9" ry="7" fill="#E8F4FF" transform="rotate(10 58 100)" />
      {/* Head */}
      <circle cx="45" cy="42" r="24" fill="#E8F4FF" />
      <circle cx="45" cy="42" r="20" fill="#F0F8FF" />
      {/* Left ear */}
      <circle cx="25" cy="22" r="10" fill="#E8F4FF" />
      <circle cx="25" cy="22" r="6" fill="#D0E8F8" />
      {/* Right ear */}
      <circle cx="65" cy="22" r="10" fill="#E8F4FF" />
      <circle cx="65" cy="22" r="6" fill="#D0E8F8" />
      {/* Eyes */}
      <circle cx="37" cy="40" r="4" fill="#5BA4CF" />
      <circle cx="53" cy="40" r="4" fill="#5BA4CF" />
      <circle cx="38" cy="39" r="1.5" fill="white" />
      <circle cx="54" cy="39" r="1.5" fill="white" />
      {/* Nose */}
      <ellipse cx="45" cy="47" rx="4" ry="3" fill="#A8D8F0" />
      {/* Mouth */}
      <path d="M40 51 Q45 56 50 51" stroke="#7CC4E8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Cheeks */}
      <circle cx="30" cy="48" r="5" fill="#FFB3C6" opacity="0.5" />
      <circle cx="60" cy="48" r="5" fill="#FFB3C6" opacity="0.5" />
      {/* Tiny hat */}
      <rect x="34" y="16" width="22" height="14" rx="4" fill="#7CC4E8" />
      <rect x="28" y="27" width="34" height="5" rx="2.5" fill="#5BA4CF" />
      <rect x="38" y="10" width="14" height="8" rx="3" fill="#5BA4CF" />
      {/* Hat band */}
      <rect x="34" y="24" width="22" height="3" rx="1.5" fill="#A8D8F0" />
      {/* Scarf */}
      <path d="M24 68 Q45 72 66 68" stroke="#7CC4E8" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M24 68 Q22 75 26 80" stroke="#7CC4E8" strokeWidth="5" strokeLinecap="round" fill="none" />
    </svg>);

}

function StarSVG({ size, opacity, delay }: {size: number;opacity: number;delay: number;}) {
  return (
    <div className="sparkle" style={{ animationDelay: `${delay}s`, width: size, height: size }}>
      <svg viewBox="0 0 24 24" fill="white" style={{ opacity }}>
        <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
      </svg>
    </div>);

}