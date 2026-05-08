'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';

// Backend integration point: fetch gallery photos and captions from API
const PHOTOS = [
{
  id: 'photo-gallery-001',
  src: "https://images.unsplash.com/photo-1695852280006-c475550bc17f",
  alt: 'Two people sharing a warm embrace outdoors with soft golden sunlight in the background',
  caption: 'the warmth of us',
  rotate: -3
},
{
  id: 'photo-gallery-002',
  src: "https://images.unsplash.com/photo-1633297754236-48f3eccf822b",
  alt: 'Couple holding hands walking along a tree-lined path in autumn light',
  caption: 'every walk together',
  rotate: 2
},
{
  id: 'photo-gallery-003',
  src: "https://images.unsplash.com/photo-1655759738595-418970010986",
  alt: 'Close-up of two people laughing together indoors in cozy warm lighting',
  caption: 'your laugh ♡',
  rotate: -1
},
{
  id: 'photo-gallery-004',
  src: "https://images.unsplash.com/photo-1601193709804-cee3c9669766",
  alt: 'Two silhouettes watching a sunset together on a hillside, warm orange sky',
  caption: 'sunsets with you',
  rotate: 3
}];


export default function PhotoGallery() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h3 className="text-white/80 text-lg font-semibold tracking-widest uppercase" style={{ letterSpacing: '0.15em' }}>
          ✦ our moments ✦
        </h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 justify-items-center">
        {PHOTOS?.map((photo, i) =>
        <div
          key={photo?.id}
          className="polaroid-frame cursor-pointer"
          style={{
            transform: hoveredId === photo?.id ?
            'rotate(0deg) scale(1.06) translateY(-8px)' :
            `rotate(${photo?.rotate}deg)`,
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease',
            animationDelay: `${i * 0.1}s`,
            width: 160
          }}
          onMouseEnter={() => setHoveredId(photo?.id)}
          onMouseLeave={() => setHoveredId(null)}>
          
            <div className="polaroid-shine" />

            <div
            className="relative overflow-hidden"
            style={{ width: '100%', height: 130, borderRadius: 2, background: '#e8f0f8' }}>
            
              <AppImage
              src={photo?.src}
              alt={photo?.alt}
              fill
              sizes="160px"
              className="object-cover" />
            
              <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)'
              }} />
            
            </div>

            <div className="flex items-center justify-center" style={{ height: 32 }}>
              <p
              className="text-center text-xs font-medium"
              style={{ color: '#aab8c8', fontFamily: 'cursive', fontSize: '0.7rem' }}>
              
                {photo?.caption}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>);

}