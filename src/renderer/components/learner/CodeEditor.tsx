// M09: Monaco 代码编辑器封装
import React, { useEffect, useRef } from 'react';
import { theme } from '../../theme';
import * as monaco from 'monaco-editor';

interface CodeEditorProps {
  value: string;
  onChange: (code: string) => void;
  language?: string;
  readOnly?: boolean;
}

export function CodeEditor({ value, onChange, language = 'typescript', readOnly = false }: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    editorRef.current = monaco.editor.create(containerRef.current, {
      value,
      language,
      theme: 'vs-dark',
      fontSize: 13,
      minimap: { enabled: false },
      lineNumbers: 'on',
      scrollBeyondLastLine: false,
      automaticLayout: true,
      smoothScrolling: false,
      cursorBlinking: 'solid',
      renderLineHighlightOnlyWhenFocus: true,
      disableLayerHinting: true,
      fixedOverflowWidgets: true,
      scrollbar: {
        useShadows: false,
        alwaysConsumeMouseWheel: false,
      },
      readOnly,
    });
    editorRef.current.onDidChangeModelContent(() => {
      onChange(editorRef.current?.getValue() || '');
    });
    return () => editorRef.current?.dispose();
  }, []);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.getValue()) {
      editorRef.current.setValue(value);
    }
  }, [value]);

  return <div ref={containerRef} style={{ height: '100%', minHeight: 200, overflow: 'hidden', background: theme.colors.bgEditor }} />;
}
