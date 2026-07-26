// M10: 填空题组件
import React from 'react';
import { theme } from '../../theme';

interface FillQuestionProps {
  question: { id: string; text: string };
  value: string;
  onChange: (value: string) => void;
}

export function FillQuestion({ question, value, onChange }: FillQuestionProps) {
  return (
    <div style={{ marginBottom: theme.spacing(3) }}>
      <p style={{ color: theme.colors.text }}>{question.text}</p>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          background: theme.colors.bgEditor,
          border: '1px solid ' + theme.colors.border,
          borderRadius: 4,
          color: theme.colors.text,
          padding: '8px 12px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}
