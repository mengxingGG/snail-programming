// M10: 编程题组件
import React from 'react';
import { CodeEditor } from '../learner/CodeEditor';

interface CodeQuestionProps {
  question: { id: string; text: string; starterCode: string };
  value: string;
  onChange: (code: string) => void;
  language?: 'typescript' | 'python';
}

export function CodeQuestion({ question, value, onChange, language = 'typescript' }: CodeQuestionProps) {
  const editorValue = value || question.starterCode || '';

  return (
    <div style={{ marginBottom: '16px' }}>
      <p style={{ color: '#d4d8e0' }}>{question.text}</p>
      <div style={{ height: 280 }}>
        <CodeEditor value={editorValue} onChange={onChange} language={language} />
      </div>
    </div>
  );
}
