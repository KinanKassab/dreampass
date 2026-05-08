'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ParticleCanvas from './ParticleCanvas';
import PolaroidPhoto from './PolaroidPhoto';
import DigitDisplay from './DigitDisplay';
import NumericKeypad from './NumericKeypad';
import MusicToggle from './MusicToggle';
import MouseGlow from './MouseGlow';
import CustomCursor from './CustomCursor';

// Backend integration point: replace CORRECT_PASSCODE with value fetched from API/env
const CORRECT_PASSCODE = '1234';

export default function PasscodeEntryClient() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>([]);
  const [shaking, setShaking] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [successState, setSuccessState] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionOpacity, setTransitionOpacity] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDigitPress = useCallback((value: string) => {
    if (successState || transitioning || digits.length >= 4) return;

    if (value === '*') {
      setDigits(prev => prev.slice(0, -1));
      setErrorState(false);
      return;
    }

    if (value === '#') {
      setAttempts(prev => {
        const next = prev + 1;
        if (next >= 3 && digits.length === 0) {
          setEasterEggActive(true);
          setTimeout(() => setEasterEggActive(false), 4000);
        }
        return next;
      });
      return;
    }

    const newDigits = [...digits, value];
    setDigits(newDigits);
    setErrorState(false);

    if (newDigits.length === 4) {
      const entered = newDigits.join('');
      setTimeout(() => {
        if (entered === CORRECT_PASSCODE) {
          setSuccessState(true);
          setTimeout(() => {
            setTransitioning(true);
            setTransitionOpacity(1);
            setTimeout(() => {
              router.push('/success-unlock-screen');
            }, 800);
          }, 600);
        } else {
          setErrorState(true);
          setShaking(true);
          setTimeout(() => {
            setShaking(false);
            setDigits([]);
            setErrorState(false);
          }, 700);
        }
      }, 200);
    }
  }, [digits, successState, transitioning, router]);

  if (!mounted) {
    return (
      <div className="dreampass-bg w-full min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-white border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`dreampass-bg w-full min-h-screen relative flex items-center justify-center overflow-hidden ${easterEggActive ? 'easter-egg-active' : ''}`}
    >
      <ParticleCanvas />
      <MouseGlow />
      <CustomCursor />
      <MusicToggle />

      {/* Unice Logo — top left */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
        <Image
          src="/assets/unice-logo-r.svg"
          alt="Unice logo with letter R for Rama"
          width={40}
          height={40}
          className="unice-logo"
        />
        <span
          className="text-white/80 text-sm font-semibold tracking-widest uppercase hidden sm:inline"
          style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif', letterSpacing: '0.15em' }}
        >
          Unice
        </span>
      </div>

      {/* Page transition overlay */}
      {transitioning && (
        <div
          className="page-transition-overlay"
          style={{ opacity: transitionOpacity }}
        >
          <div className="text-center">
            <div className="text-6xl mb-4">✨</div>
            <p
              className="text-white text-3xl font-bold font-display"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Opening...
            </p>
          </div>
        </div>
      )}

      {/* Main layout */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-20 xl:gap-32 min-h-screen py-16 sm:py-12">

          {/* LEFT — Polaroid + Decorations */}
          <div className="fade-in-up delay-200 flex-shrink-0 flex flex-col items-center justify-center mt-8 sm:mt-0">
            <PolaroidPhoto />
          </div>

          {/* RIGHT — Passcode UI */}
          <div className="fade-in-up delay-400 flex flex-col items-center gap-6 sm:gap-8 w-full max-w-xs sm:max-w-sm">
            {/* Title */}
            <div className="text-center">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 font-display"
                style={{
                  fontFamily: 'Sualmate Love, Soulmate Love, cursive',
                  textShadow: '0 2px 24px rgba(139,92,246,0.5)',
                  letterSpacing: '0.02em',
                }}
              >
                Enter a passcode
              </h1>
              <p
                className="text-white/70 text-sm sm:text-base font-medium tracking-wide"
                style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif', fontStyle: 'italic' }}
              >
                ✦ a secret is waiting for you ✦
              </p>
            </div>

            {/* Digit display */}
            <DigitDisplay
              digits={digits}
              shaking={shaking}
              errorState={errorState}
              successState={successState}
            />

            {/* Keypad */}
            <NumericKeypad onPress={handleDigitPress} disabled={successState || transitioning} />

            {/* Hint text */}
            <p className="text-white/50 text-xs font-medium tracking-widest uppercase mt-1">
              {errorState ? '✗ Wrong passcode — try again' : digits.length > 0 ? `${digits.length} of 4 digits entered` : 'Type your secret code below'}
            </p>
          </div>
        </div>
      </div>

      {/* Floating sparkles */}
      <SparkleDecorations />
    </div>
  );
}

function SparkleDecorations() {
  const sparkles = [
    { top: '15%', left: '8%', size: 16, delay: 0 },
    { top: '25%', left: '15%', size: 10, delay: 0.5 },
    { top: '70%', left: '5%', size: 14, delay: 1 },
    { top: '80%', left: '18%', size: 8, delay: 1.5 },
    { top: '10%', right: '10%', size: 12, delay: 0.3 },
    { top: '40%', right: '6%', size: 16, delay: 0.8 },
    { top: '75%', right: '12%', size: 10, delay: 1.2 },
    { top: '88%', right: '20%', size: 8, delay: 0.6 },
    { top: '50%', left: '2%', size: 6, delay: 2 },
    { top: '35%', right: '3%', size: 6, delay: 1.8 },
  ];

  return (
    <>
      {sparkles.map((s, i) => (
        <div
          key={`sparkle-${i}`}
          className="sparkle"
          style={{
            top: s.top,
            left: s.left,
            right: (s as { right?: string }).right,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="rgba(221,214,254,0.85)" style={{ opacity: 0.8 }}>
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
          </svg>
        </div>
      ))}
    </>
  );
}