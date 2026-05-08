'use client';

import React, { useState } from 'react';

// Backend integration point: fetch love letter content from API or CMS
const LOVE_LETTER = {
  greeting: 'To the one who found this,',
  body: [
    'You just entered a little code, but what you really unlocked is everything I wanted to say to you — all the quiet moments, the laughs, the warmth of being next to you.',
    'I made this because you deserve something that feels as magical as you make everything feel. Something small, something dreamy, something that says: I was thinking of you.',
    'Every sparkle on this page, every floating heart — that\'s all for you. You\'ve always been worth the extra effort.',
  ],
  closing: 'With all my love, always.',
  signature: '— yours 💙',
};

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className="glass-card relative overflow-hidden"
      style={{ padding: '40px 44px' }}
    >
      {/* Decorative corner elements */}
      <div className="absolute top-4 left-4 opacity-30">
        <CornerFloral />
      </div>
      <div className="absolute top-4 right-4 opacity-30" style={{ transform: 'scaleX(-1)' }}>
        <CornerFloral />
      </div>
      <div className="absolute bottom-4 left-4 opacity-30" style={{ transform: 'scaleY(-1)' }}>
        <CornerFloral />
      </div>
      <div className="absolute bottom-4 right-4 opacity-30" style={{ transform: 'scale(-1)' }}>
        <CornerFloral />
      </div>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="heartbeat inline-block mb-3">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="white" opacity="0.9">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <h2
          className="text-2xl font-bold text-white"
          style={{ fontFamily: 'cursive', textShadow: '0 2px 12px rgba(0,80,160,0.3)' }}
        >
          A letter for you
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          {[0, 1, 2, 3, 4]?.map(i => (
            <div
              key={`dot-${i}`}
              className="rounded-full"
              style={{
                width: i === 2 ? 8 : 4,
                height: i === 2 ? 8 : 4,
                background: 'rgba(255,255,255,0.6)',
              }}
            />
          ))}
        </div>
      </div>
      {/* Letter content */}
      <div className="space-y-5">
        <p
          className="text-white/90 font-semibold text-base"
          style={{ fontFamily: 'cursive', fontSize: '1.05rem' }}
        >
          {LOVE_LETTER?.greeting}
        </p>

        {LOVE_LETTER?.body?.map((para, i) => (
          <p
            key={`para-${i}`}
            className="text-white/80 leading-relaxed"
            style={{ fontSize: '0.95rem', lineHeight: 1.75 }}
          >
            {para}
          </p>
        ))}

        <div className="pt-4 border-t border-white/20">
          <p
            className="text-white/90 font-medium mb-1"
            style={{ fontFamily: 'cursive', fontSize: '1rem' }}
          >
            {LOVE_LETTER?.closing}
          </p>
          <p
            className="text-white font-bold text-lg shimmer-text"
            style={{ fontFamily: 'cursive' }}
          >
            {LOVE_LETTER?.signature}
          </p>
        </div>
      </div>
      {/* Glass shimmer overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)',
        }}
      />
    </div>
  );
}

function CornerFloral() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M5 35 Q5 5 35 5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="8" cy="32" r="3" fill="white" />
      <circle cx="15" cy="18" r="2" fill="white" />
      <circle cx="22" cy="10" r="2.5" fill="white" />
      <circle cx="32" cy="8" r="2" fill="white" />
    </svg>
  );
}