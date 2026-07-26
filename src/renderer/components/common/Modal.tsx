// 共享弹窗组件
import React from 'react';
import { theme } from '../../theme';

interface ModalProps {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export function Modal({ visible, title, children, onClose }: ModalProps) {
  if (!visible) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }}>
      <div style={{
        background: theme.colors.bgCard, borderRadius: theme.radius,
        padding: theme.spacing(3), minWidth: 400, maxWidth: 600,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ color: theme.colors.accent, margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: theme.colors.text, cursor: 'pointer', fontSize: 20 }}>×</button>
        </div>
        <div style={{ marginTop: theme.spacing(2) }}>{children}</div>
      </div>
    </div>
  );
}
