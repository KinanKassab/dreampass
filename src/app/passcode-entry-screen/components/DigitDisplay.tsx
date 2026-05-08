'use client';

import React from 'react';

interface DigitDisplayProps {
  digits: string[];
  shaking: boolean;
  errorState: boolean;
  successState: boolean;
}

export default function DigitDisplay({ digits, shaking, errorState, successState }: DigitDisplayProps) {
  return (
    <div className={`flex gap-4 ${shaking ? 'shake' : ''}`}>
      {[0, 1, 2, 3].map(i => {
        const isFilled = digits[i] !== undefined;
        const isActive = i === digits.length && !errorState && !successState;

        let stateClass = '';
        if (errorState && isFilled) stateClass = 'error';
        else if (successState && isFilled) stateClass = 'success';
        else if (isFilled) stateClass = 'filled';
        else if (isActive) stateClass = 'active';

        return (
          <div key={`digit-box-${i}`} className={`digit-box ${stateClass}`}>
            {isFilled ? (
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                {errorState ? '✗' : successState ? '✓' : '●'}
              </span>
            ) : (
              <span style={{ opacity: 0.3, fontSize: 14 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
                </svg>
              </span>
            )}

            {/* Glass reflection */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)',
                borderRadius: 'inherit',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}