'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FloatingHearts from './FloatingHearts';
import LoveLetter from './LoveLetter';
import PhotoGallery from './PhotoGallery';
import SuccessParticles from './SuccessParticles';
import MusicToggle from '../../passcode-entry-screen/components/MusicToggle';
import MouseGlow from '../../passcode-entry-screen/components/MouseGlow';
import CustomCursor from '../../passcode-entry-screen/components/CustomCursor';

// Google Calendar event: May 30 at 8:00 PM
const CALENDAR_URL = (() => {
  const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  const title = encodeURIComponent('💜 Our Special Reminder ✨');
  const details = encodeURIComponent('A magical reminder just for you 🌸');
  // May 30 2026 8:00 PM → 20260530T200000 / 21:00
  const start = '20260530T200000';
  const end = '20260530T210000';
  return `${base}&text=${title}&details=${details}&dates=${start}/${end}`;
})();

export default function SuccessUnlockClient() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const confettiTriggeredRef = useRef(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setShowContent(true), 600);
    const t3 = setTimeout(() => setShowGallery(true), 1100);
    const t4 = setTimeout(() => setShowCalendar(true), 1500);

    if (!confettiTriggeredRef.current) {
      confettiTriggeredRef.current = true;
      const t5 = setTimeout(() => {
        triggerConfetti();
      }, 400);
      return () => {
        clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
      };
    }

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  }, []);

  const triggerConfetti = async () => {
    try {
      const confetti = (await import('canvas-confetti')).default;
      const colors = ['#C4B5FD', '#ffffff', '#DDD6FE', '#A78BFA', '#FFB3C6', '#EDE9FE'];

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5, x: 0.5 },
        colors,
        startVelocity: 45,
        gravity: 0.8,
        scalar: 1.1,
        shapes: ['circle', 'square'],
      });

      setTimeout(() => {
        confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors });
        confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors });
      }, 300);

      setTimeout(() => {
        confetti({ particleCount: 40, spread: 100, origin: { y: 0.3 }, colors, gravity: 0.4, scalar: 0.8, drift: 1 });
      }, 700);
    } catch {
      // canvas-confetti not available
    }
  };

  return (
    <div
      className="success-bg w-full min-h-screen relative flex flex-col items-center justify-center overflow-hidden"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease' }}
    >
      <SuccessParticles />
      <FloatingHearts />
      <MouseGlow />
      <CustomCursor />
      <MusicToggle />

      {/* Unice Logo — top left */}
      <div className="fixed top-5 left-5 z-50 flex items-center gap-2">
        <Image
          src="/assets/unice-logo-r.svg"
          alt="Unice logo with letter R for Rama"
          width={44}
          height={44}
          className="unice-logo"
        />
        <span
          className="text-white/80 text-sm font-semibold tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif', letterSpacing: '0.15em' }}
        >
          Unice
        </span>
      </div>

      {/* Back button */}
      <button
        onClick={() => router.push('/')}
        className="glass-card fixed top-4 right-16 sm:right-20 z-50 px-3 sm:px-4 py-2 text-white text-sm font-medium flex items-center gap-2 hover:scale-105 transition-transform"
        aria-label="Go back to passcode entry"
        style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Back</span>
      </button>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24 py-16 sm:py-12">
        <div className="flex flex-col items-center gap-12">

          {/* Hero heading */}
          {showContent && (
            <div className="text-center fade-in-up">
              <div className="flex items-center justify-center gap-3 mb-4">
                <StarDecoration delay={0} />
                <h1
                  className="text-4xl md:text-6xl font-extrabold shimmer-text"
                  style={{
                    fontFamily: 'Sualmate Love, Soulmate Love, cursive',
                    lineHeight: 1.15,
                  }}
                >
                  You found it ✨
                </h1>
                <StarDecoration delay={0.5} />
              </div>
              <p
                className="text-white/80 text-lg md:text-xl font-medium tracking-wide"
                style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif', fontStyle: 'italic' }}
              >
                This was made with all my love, just for you 💜
              </p>
            </div>
          )}

          {/* Love letter card */}
          {showContent && (
            <div className="fade-in-up delay-200 w-full max-w-2xl">
              <LoveLetter />
            </div>
          )}

          {/* Photo gallery */}
          {showGallery && (
            <div className="fade-in-up delay-400 w-full">
              <PhotoGallery />
            </div>
          )}

          {/* Google Calendar Button */}
          {showCalendar && (
            <div className="fade-in-up delay-600 flex flex-col items-center gap-3 w-full px-4 sm:px-0">
              <p
                className="text-white/60 text-sm tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif', fontStyle: 'italic' }}
              >
                Don&apos;t forget our date 🌸
              </p>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="calendar-btn"
                aria-label="Add May 30 reminder to Google Calendar"
                style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
              >
                {/* Calendar icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <text x="12" y="18" textAnchor="middle" fontSize="7" fill="currentColor" stroke="none" fontWeight="bold">30</text>
                </svg>
                <span style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif', fontSize: '16px' }}>
                  Save May 30 · 8:00 PM ✨
                </span>
              </a>
              <p
                className="text-white/40 text-xs text-center"
                style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
              >
                Opens Google Calendar with a pre-filled reminder
              </p>
            </div>
          )}

          {/* Footer message */}
          {showGallery && (
            <div className="fade-in-up delay-600 text-center pb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                {['💜', '✨', '🌸', '✨', '💜'].map((emoji, i) => (
                  <span key={`footer-emoji-${i}`} className="text-xl" style={{ animationDelay: `${i * 0.2}s` }}>
                    {emoji}
                  </span>
                ))}
              </div>
              <p
                className="text-white/60 text-sm font-medium tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
              >
                made with love · dreampass · 2026
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Shimmer overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.07) 0%, transparent 60%)',
          zIndex: 2,
        }}
      />
    </div>
  );
}

function StarDecoration({ delay }: { delay: number }) {
  return (
    <div className="star-twinkle" style={{ animationDelay: `${delay}s` }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="rgba(221,214,254,0.9)" opacity="0.9">
        <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
      </svg>
    </div>
  );
}