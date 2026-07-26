import React from 'react';
import { theme } from '../../theme';

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  value: T;
  options: SegmentedOption<T>[];
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({ value, options, onChange }: SegmentedControlProps<T>) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: 5,
      borderRadius: 999,
      border: '1px solid ' + theme.colors.border,
      background: 'color-mix(in srgb, var(--glass-strong) 94%, transparent)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
    }}>
      {options.map(option => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            style={{
              border: 'none',
              borderRadius: 999,
              padding: '8px 14px',
              cursor: 'pointer',
              background: active
                ? 'linear-gradient(180deg, color-mix(in srgb, var(--bg-card) 92%, transparent), color-mix(in srgb, var(--glass) 92%, transparent))'
                : 'transparent',
              color: active ? theme.colors.textBright : theme.colors.textDim,
              fontSize: 12,
              fontWeight: active ? 800 : 700,
              letterSpacing: 0.2,
              boxShadow: active ? 'inset 0 1px 0 rgba(255,255,255,0.08)' : 'none',
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
