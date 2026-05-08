'use client';

import dynamic from 'next/dynamic';

const PasscodeEntryClient = dynamic(
  () => import('./PasscodeEntryClient'),
  { ssr: false }
);

export default function PasscodeEntryScreen() {
  return <PasscodeEntryClient />;
}