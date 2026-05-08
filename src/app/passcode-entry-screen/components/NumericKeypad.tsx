'use client';

import React, { useState, useCallback, useRef } from 'react';

interface NumericKeypadProps {
  onPress: (value: string) => void;
  disabled: boolean;
}

const KEYPAD_LAYOUT = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['*', '0', '#'],
];

export default function NumericKeypad({ onPress, disabled }: NumericKeypadProps) {
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const handlePress = useCallback((value: string) => {
    if (disabled) return;
    setPressedKey(value);
    onPress(value);

    // Haptic feedback on supported mobile devices
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(12);
    }

    setTimeout(() => setPressedKey(null), 150);
  }, [disabled, onPress]);

  return (
    <div
      className="flex flex-col gap-3 sm:gap-4 items-center"
      style={{ touchAction: 'manipulation' }}
    >
      {KEYPAD_LAYOUT.map((row, rowIndex) => (
        <div key={`keypad-row-${rowIndex}`} className="flex gap-3 sm:gap-4">
          {row.map(key => (
            <KeypadButton
              key={`keypad-btn-${key}`}
              value={key}
              isPressed={pressedKey === key}
              disabled={disabled}
              onPress={handlePress}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

interface KeypadButtonProps {
  value: string;
  isPressed: boolean;
  disabled: boolean;
  onPress: (value: string) => void;
}

function KeypadButton({ value, isPressed, disabled, onPress }: KeypadButtonProps) {
  const isSpecial = value === '*' || value === '#';
  const touchStartRef = useRef<number>(0);

  const getLabel = () => {
    if (value === '*') return '⌫';
    if (value === '#') return '✦';
    return value;
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault(); // Prevent 300ms delay and double-tap zoom
    touchStartRef.current = Date.now();
    if (!disabled) onPress(value);
  }, [disabled, onPress, value]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    // Only fire on mouse (not touch — touch is handled above)
    if (e.detail === 0) return; // synthetic click from touch, skip
    if (!disabled) onPress(value);
  }, [disabled, onPress, value]);

  return (
    <button
      className={`keypad-btn ${isSpecial ? 'special' : ''} ${isPressed ? 'pressed' : ''}`}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      disabled={disabled}
      aria-label={value === '*' ? 'Backspace' : value === '#' ? 'Special' : `Digit ${value}`}
      style={{
        opacity: disabled ? 0.5 : 1,
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      <span style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
        {getLabel()}
      </span>

      {/* Press ripple */}
      {isPressed && (
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.45) 0%, transparent 70%)',
            animation: 'fadeIn 0.15s ease',
            pointerEvents: 'none',
          }}
        />
      )}
    </button>
  );
}