'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
}

const TRAIL_COLORS = [
  'rgba(221,214,254,0.9)',
  'rgba(196,181,253,0.85)',
  'rgba(167,139,250,0.8)',
  'rgba(255,200,240,0.75)',
  'rgba(255,255,255,0.9)',
  'rgba(237,233,254,0.85)',
];

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailIdRef = useRef(0);
  const lastTrailTime = useRef(0);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      // Spawn trail sparkles
      const now = Date.now();
      if (now - lastTrailTime.current > 60) {
        lastTrailTime.current = now;
        const id = trailIdRef.current++;
        const color = TRAIL_COLORS[id % TRAIL_COLORS.length];
        const size = 6 + Math.random() * 8;
        const angle = Math.random() * 360;
        setTrail(prev => [...prev.slice(-12), { id, x: e.clientX, y: e.clientY, size, color, angle }]);
        setTimeout(() => {
          setTrail(prev => prev.filter(t => t.id !== id));
        }, 700);
      }
    };

    const handleDown = () => {
      setClicked(true);
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(0.7)';
      }
    };

    const handleUp = () => {
      setClicked(false);
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };

    // Smooth cursor follow loop
    const loop = () => {
      const ease = 0.18;
      smoothRef.current.x += (posRef.current.x - smoothRef.current.x) * ease;
      smoothRef.current.y += (posRef.current.y - smoothRef.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.left = `${smoothRef.current.x}px`;
        dotRef.current.style.top = `${smoothRef.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  return (
    <>
      {/* Main crystal cursor */}
      <div
        ref={cursorRef}
        className="custom-cursor hidden md:block"
        aria-hidden="true"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
          left: 0,
          top: 0,
        }}
        id="cursor-main"
      >
        <CrystalCursorSVG clicked={clicked} />
      </div>

      {/* Smooth trailing orb */}
      <div
        ref={dotRef}
        className="hidden md:block"
        aria-hidden="true"
        style={{
          position: 'fixed',
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(221,214,254,0.18) 0%, rgba(167,139,250,0.08) 50%, transparent 100%)',
          border: '1px solid rgba(221,214,254,0.25)',
          pointerEvents: 'none',
          zIndex: 99996,
          transform: 'translate(-50%, -50%)',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Sparkle trail */}
      {trail.map(t => (
        <div
          key={t.id}
          className="hidden md:block"
          aria-hidden="true"
          style={{
            position: 'fixed',
            left: t.x,
            top: t.y,
            width: t.size,
            height: t.size,
            pointerEvents: 'none',
            zIndex: 99997,
            animation: 'cursorTrailFade 0.7s ease-out forwards',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width={t.size}
            height={t.size}
            style={{ transform: `rotate(${t.angle}deg)` }}
          >
            <path
              d="M12 2L13.2 8.8L20 10L13.2 11.2L12 18L10.8 11.2L4 10L10.8 8.8Z"
              fill={t.color}
            />
          </svg>
        </div>
      ))}
    </>
  );
}

function CrystalCursorSVG({ clicked }: { clicked: boolean }) {
  return (
    <svg
      width="36"
      height="44"
      viewBox="0 0 36 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 8px rgba(196,181,253,0.9)) drop-shadow(0 0 20px rgba(139,92,246,0.6))' }}
    >
      {/* Outer glow ring */}
      <ellipse cx="18" cy="22" rx="16" ry="20" fill="rgba(196,181,253,0.08)" />

      {/* Crystal gem body */}
      <polygon
        points="18,2 32,14 28,38 8,38 4,14"
        fill="url(#crystalGrad)"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="0.8"
      />

      {/* Crystal facets */}
      <polygon
        points="18,2 32,14 18,20"
        fill="rgba(255,255,255,0.35)"
      />
      <polygon
        points="18,2 4,14 18,20"
        fill="rgba(221,214,254,0.25)"
      />
      <polygon
        points="18,20 32,14 28,38"
        fill="rgba(167,139,250,0.3)"
      />
      <polygon
        points="18,20 4,14 8,38"
        fill="rgba(196,181,253,0.2)"
      />
      <polygon
        points="18,20 28,38 8,38"
        fill="rgba(139,92,246,0.25)"
      />

      {/* Inner highlight */}
      <polygon
        points="18,4 29,14 18,18"
        fill="rgba(255,255,255,0.5)"
      />

      {/* Center sparkle */}
      <circle
        cx="18"
        cy="20"
        r={clicked ? 2 : 3}
        fill="white"
        style={{ transition: 'r 0.1s ease' }}
      />

      {/* Top star burst */}
      <path
        d="M18 0 L18.8 3.2 L22 4 L18.8 4.8 L18 8 L17.2 4.8 L14 4 L17.2 3.2 Z"
        fill="white"
        opacity="0.9"
      />

      {/* Side sparkles */}
      <path
        d="M2 20 L3.2 22 L2 24 L0.8 22 Z"
        fill="rgba(221,214,254,0.8)"
      />
      <path
        d="M34 20 L35.2 22 L34 24 L32.8 22 Z"
        fill="rgba(221,214,254,0.8)"
      />

      {/* Gradient definition */}
      <defs>
        <linearGradient id="crystalGrad" x1="4" y1="2" x2="32" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(237,233,254,0.95)" />
          <stop offset="30%" stopColor="rgba(196,181,253,0.85)" />
          <stop offset="60%" stopColor="rgba(139,92,246,0.75)" />
          <stop offset="100%" stopColor="rgba(91,33,182,0.8)" />
        </linearGradient>
      </defs>
    </svg>
  );
}