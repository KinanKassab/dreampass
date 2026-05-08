'use client';

import dynamic from 'next/dynamic';

const SuccessUnlockClient = dynamic(
  () => import('./SuccessUnlockClient'),
  { ssr: false }
);

export default function SuccessUnlockScreen() {
  return <SuccessUnlockClient />;
}