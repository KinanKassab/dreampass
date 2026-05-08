import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond } from 'next/font/google';
import '../styles/tailwind.css';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'DreamPass — A Secret Just for You',
  description: 'Enter the passcode to unlock a magical, personal surprise made just for you. A dreamy digital love letter.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cormorantGaramond.variable}>
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/soulmate-love"
          rel="stylesheet"
        />

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fdreampass7385back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.18" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></head>
      <body className={cormorantGaramond.className}>
        {children}
      </body>
    </html>
  );
}