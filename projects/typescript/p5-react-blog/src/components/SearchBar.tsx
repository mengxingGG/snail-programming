/**
 * SearchBar.tsx — 搜索栏组件
 * 受控输入框，value 和 onChange 由父组件传入。
 * 相关：src/App.tsx (管理 search 状态)
 * 关键 API：React 受控组件模式, onChange
 */
import React from 'react';

interface Props { value: string; onChange: (value: string) => void; }

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="搜索文章..."
      />
    </div>
  );
}
