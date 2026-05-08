'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  opacityDelta: number;
  color: string;
  shape: 'circle' | 'star';
}

export default function SuccessParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = [
      'rgba(255, 255, 255, 0.7)',
      'rgba(168, 216, 240, 0.8)',
      'rgba(197, 232, 255, 0.6)',
      'rgba(255, 179, 198, 0.5)',
      'rgba(255, 214, 224, 0.4)',
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const count = 80;
    particlesRef.current = Array.from({ length: count }, (_, i) => ({
      x: (i / count) * window.innerWidth,
      y: Math.sin(i * 0.5) * window.innerHeight * 0.8 + window.innerHeight * 0.1,
      vx: Math.cos(i * 1.1) * 0.35,
      vy: -(0.15 + Math.abs(Math.sin(i * 0.8)) * 0.4),
      radius: 1 + Math.abs(Math.sin(i * 2.3)) * 3,
      opacity: 0.2 + Math.abs(Math.cos(i * 1.9)) * 0.6,
      opacityDelta: (Math.cos(i) > 0 ? 1 : -1) * 0.003,
      color: colors[i % colors.length],
      shape: i % 5 === 0 ? 'star' : 'circle',
    }));

    const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) => {
      ctx.beginPath();
      for (let j = 0; j < 5; j++) {
        const angle = (j * 4 * Math.PI) / 5 - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += p.opacityDelta;

        if (p.opacity <= 0.1 || p.opacity >= 0.9) p.opacityDelta *= -1;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        const colorWithOpacity = p.color.replace(/[\d.]+\)$/, `${p.opacity})`);
        ctx.fillStyle = colorWithOpacity;

        if (p.shape === 'star') {
          drawStar(ctx, p.x, p.y, p.radius * 1.5);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}