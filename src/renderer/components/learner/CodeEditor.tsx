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

  // 编辑器只创建一次，但回调必须始终指向最新的 onChange，
  // 否则内容变更会一直调用首次渲染时捕获的旧闭包
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!containerRef.current) return;
    const editor = monaco.editor.create(containerRef.current, {
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
    editorRef.current = editor;

    const subscription = editor.onDidChangeModelContent(() => {
      onChangeRef.current(editor.getValue());
    });

    return () => {
      subscription.dispose();
      editor.dispose();
      editorRef.current = null;
    };
    // 仅在挂载时创建；language / readOnly / value 的后续变化由下面的 effect 同步
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.getValue()) {
      editorRef.current.setValue(value);
    }
  }, [value]);

  // 切换课程语言（TypeScript ↔ Python）或切换项目文件时，
  // 必须同步模型语言，否则高亮会一直停留在首次创建时的语言
  useEffect(() => {
    const model = editorRef.current?.getModel();
    if (model) {
      monaco.editor.setModelLanguage(model, language);
    }
  }, [language]);

  useEffect(() => {
    editorRef.current?.updateOptions({ readOnly });
  }, [readOnly]);

  return <div ref={containerRef} style={{ height: '100%', minHeight: 200, overflow: 'hidden', background: theme.colors.bgEditor }} />;
}
