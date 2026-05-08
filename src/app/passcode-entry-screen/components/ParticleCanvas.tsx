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
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Detect mobile for performance tuning
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4;
    const particleCount = isMobile ? (isLowEnd ? 20 : 30) : 60;

    const colors = [
      'rgba(255, 255, 255, 0.6)',
      'rgba(196, 181, 253, 0.7)',
      'rgba(221, 214, 254, 0.5)',
      'rgba(255, 255, 255, 0.4)',
      'rgba(167, 139, 250, 0.5)',
    ];

    const resize = () => {
      // Use logical pixels (no DPR scaling) for performance
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(document.documentElement);

    // Init particles
    particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
      x: (i / particleCount) * window.innerWidth + Math.sin(i) * 80,
      y: Math.cos(i * 0.7) * window.innerHeight * 0.8 + window.innerHeight * 0.1,
      vx: Math.sin(i * 1.3) * (isMobile ? 0.25 : 0.4),
      vy: -(0.15 + Math.abs(Math.cos(i * 0.9)) * (isMobile ? 0.35 : 0.5)),
      radius: 1 + Math.abs(Math.sin(i * 2.1)) * (isMobile ? 1.8 : 2.5),
      opacity: 0.2 + Math.abs(Math.cos(i * 1.7)) * 0.6,
      opacityDelta: (Math.sin(i) > 0 ? 1 : -1) * 0.003,
      color: colors[i % colors.length],
    }));

    // Frame throttle for mobile
    let lastFrame = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (timestamp: number) => {
      if (timestamp - lastFrame < frameInterval) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrame = timestamp;

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

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${p.opacity})`);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
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