// 共享按钮组件
import React from 'react';
import { theme } from '../../theme';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function Button({ children, onClick, variant = 'primary', disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: variant === 'primary' ? theme.colors.accent : 'transparent',
        color: variant === 'primary' ? '#000' : theme.colors.text,
        border: variant === 'primary' ? 'none' : '1px solid ' + theme.colors.border,
        borderRadius: 4,
        padding: '8px 20px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontWeight: 'bold',
        opacity: disabled ? 0.5 : 1,
      }}>
      {children}
    </button>
  );
}
