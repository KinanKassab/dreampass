'use client';

import React, { useEffect, useState } from 'react';

interface Heart {
  id: string;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const initial: Heart[] = Array.from({ length: 12 }, (_, i) => ({
      id: `heart-init-${i}`,
      x: 5 + (i / 12) * 90,
      size: 16 + (i % 4) * 8,
      duration: 3 + (i % 3),
      delay: i * 0.4,
      opacity: 0.4 + (i % 3) * 0.15,
    }));
    setHearts(initial);

    // Continuously add hearts
    const interval = setInterval(() => {
      const newHeart: Heart = {
        id: `heart-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        x: 5 + Math.floor(Math.random() * 90),
        size: 16 + Math.floor(Math.random() * 24),
        duration: 3 + Math.floor(Math.random() * 3),
        delay: 0,
        opacity: 0.3 + Math.random() * 0.4,
      };
      setHearts(prev => [...prev.slice(-20), newHeart]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 3 }}>
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute float-heart"
          style={{
            left: `${heart.x}%`,
            bottom: '-20px',
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
          }}
        >
          <HeartSVG size={heart.size} />
        </div>
      ))}
    </div>
  );
}

function HeartSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}