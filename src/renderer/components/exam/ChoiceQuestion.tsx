// M10: 选择题组件
import React from 'react';
import { theme } from '../../theme';

interface ChoiceQuestionProps {
  question: { id: string; text: string; options: string[] };
  selected: string;
  onChange: (value: string) => void;
}

export function ChoiceQuestion({ question, selected, onChange }: ChoiceQuestionProps) {
  return (
    <div style={{ marginBottom: theme.spacing(3) }}>
      <p style={{ color: theme.colors.text }}>{question.text}</p>
      {question.options.map((opt, i) => (
        <label key={i} style={{ display: 'block', margin: '4px 0', color: theme.colors.textDim, cursor: 'pointer' }}>
          <input
            type="radio"
            name={question.id}
            value={opt}
            checked={selected === opt}
            onChange={() => onChange(opt)}
          />
          {' '}{opt}
        </label>
      ))}
    </div>
  );
}
