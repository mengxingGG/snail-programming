// AI 助教面板 — 只读学生数据，输出文本，不写编辑器
import React, { useState, useRef, useEffect } from 'react';
import { theme } from '../../theme';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AiPanelProps {
  // 只读上下文：AI 只能读这些，无法修改
  userId?: string | null;
  chapterId?: string;
  sectionId?: string;
  currentCode: string;
  codeLanguage?: 'typescript' | 'python';
  sectionTitle: string;
  courseHint?: string;
  aiEnabled: boolean;
  onInsertExample?: (code: string) => void;
  onClose: () => void;
}

const api = () => (window as any).snailAPI.ai;

// ─── 样式工具 ────────────────────────────────────────────

const S = {
  panel: {
    width: 320,
    background: theme.colors.bgSidebar,
    borderLeft: '1px solid ' + theme.colors.border,
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
  },
  header: {
    padding: '10px 12px',
    borderBottom: '1px solid ' + theme.colors.border,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  },
  messages: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '12px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 10,
  },
  quickRow: {
    padding: '8px 12px',
    display: 'flex',
    gap: 6,
    borderTop: '1px solid ' + theme.colors.border,
    flexWrap: 'wrap' as const,
    flexShrink: 0,
  },
  inputRow: {
    padding: '8px 12px',
    display: 'flex',
    gap: 6,
    borderTop: '1px solid ' + theme.colors.border,
    flexShrink: 0,
  },
};

function msgBubble(role: string) {
  const isUser = role === 'user';
  return {
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    background: isUser ? 'color-mix(in srgb, var(--accent) 18%, var(--bg-card))' : theme.colors.bgCard,
    color: theme.colors.textBright,
    border: '1px solid ' + (isUser ? 'color-mix(in srgb, var(--accent) 34%, var(--border))' : theme.colors.border),
    borderRadius: 14,
    padding: '8px 12px',
    maxWidth: '90%',
    fontSize: theme.fontSize.small,
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap' as const,
  } as React.CSSProperties;
}

function extractCodeBlock(content: string): string | null {
  const match = content.match(/```(?:[\w-]+)?\n([\s\S]*?)```/);
  return match?.[1]?.trim() || null;
}

function QuickBtn({ label, onClick, disabled }: { label: string; onClick: () => void; disabled: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: 'transparent',
      border: '1px solid ' + theme.colors.border,
      color: disabled ? theme.colors.textDim : theme.colors.text,
      borderRadius: 4,
      padding: '3px 8px',
      fontSize: '11px',
      cursor: disabled ? 'not-allowed' : 'pointer',
    }}>
      {label}
    </button>
  );
}

// ─── 主组件 ─────────────────────────────────────────────

export function AiPanel({
  userId,
  chapterId,
  sectionId,
  currentCode,
  codeLanguage = 'typescript',
  sectionTitle,
  courseHint,
  aiEnabled,
  onInsertExample,
  onClose,
}: AiPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const lessonContext = {
    userId,
    chapterId,
    sectionId,
    sectionTitle,
    courseHint,
    currentCode,
    codeLanguage,
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 初始欢迎语
  useEffect(() => {
    if (aiEnabled) {
      setMessages([{
        role: 'assistant',
        content: `你好！我是你的 AI 助教 🤖\n当前练习：「${sectionTitle}」\n\n我会按当前课程进度讲解，用更简单的例子帮助你理解。可以让我看看代码、解释概念、给个提示，必要时我也能给你一个最小示例并插入编辑器。`,
      }]);
    }
  }, [sectionTitle, aiEnabled]);

  function addMsg(role: ChatMessage['role'], content: string) {
    setMessages(prev => [...prev, { role, content }]);
  }

  async function sendMessage(userText: string, overrideMessages?: ChatMessage[]) {
    if (!userText.trim() || isLoading) return;
    setInput('');
    addMsg('user', userText);
    setIsLoading(true);

    try {
      const history = (overrideMessages ?? messages).slice(-8);
      const allMessages = [...history, { role: 'user' as const, content: userText }];

      const reply: string = await api().chat(allMessages, lessonContext);
      addMsg('assistant', reply);
    } catch (e: any) {
      addMsg('assistant', `⚠️ ${e?.message || '请求失败，请稍后再试'}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleReviewCode() {
    addMsg('user', '帮我看看我的代码 👀');
    setIsLoading(true);
    try {
      const reply: string = await api().reviewCode(currentCode, sectionTitle, lessonContext);
      addMsg('assistant', reply);
    } catch (e: any) {
      addMsg('assistant', `⚠️ ${e?.message || '代码审查失败'}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetHint() {
    addMsg('user', '给我一个提示');
    setIsLoading(true);
    try {
      const reply: string = await api().getHint(sectionTitle, courseHint, lessonContext);
      addMsg('assistant', reply);
    } catch (e: any) {
      addMsg('assistant', `⚠️ ${e?.message || '获取提示失败'}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExplain() {
    setIsLoading(true);
    addMsg('user', `解释一下「${sectionTitle}」这个概念`);
    try {
      const reply: string = await api().explain(sectionTitle, lessonContext);
      addMsg('assistant', reply);
    } catch (e: any) {
      addMsg('assistant', `⚠️ ${e?.message || '解释失败，请稍后再试'}`);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  // ─── 未启用状态 ──────────────────────────────────────

  if (!aiEnabled) {
    return (
      <div style={S.panel}>
        <div style={S.header}>
          <span style={{ color: theme.colors.accent, fontWeight: 600 }}>🤖 AI 助教</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: theme.colors.textDim, cursor: 'pointer', fontSize: 16 }}>✕</button>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, padding: 24 }}>
          <span style={{ fontSize: 32 }}>🔒</span>
          <p style={{ color: theme.colors.textDim, textAlign: 'center', fontSize: theme.fontSize.small, margin: 0 }}>
            AI 助教未启用
          </p>
          <p style={{ color: theme.colors.textDim, textAlign: 'center', fontSize: theme.fontSize.small, margin: 0 }}>
            前往 <strong style={{ color: theme.colors.text }}>设置 → AI 助教</strong> 配置 API 密钥后开启
          </p>
        </div>
      </div>
    );
  }

  // ─── 正常状态 ────────────────────────────────────────

  return (
    <div style={S.panel}>
      {/* 标题栏 */}
      <div style={S.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: theme.colors.accent, fontWeight: 600 }}>🤖 AI 助教</span>
          {isLoading && <span style={{ color: theme.colors.textDim, fontSize: '11px' }}>思考中…</span>}
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: theme.colors.textDim, cursor: 'pointer', fontSize: 16 }}>✕</button>
      </div>

      {/* 消息列表 */}
      <div style={S.messages}>
        {messages.map((m, i) => (
          <div key={i} style={msgBubble(m.role)}>
            <div>{m.content}</div>
            {m.role === 'assistant' && onInsertExample && (() => {
              const codeBlock = extractCodeBlock(m.content);
              if (!codeBlock) return null;
              return (
                <button
                  onClick={() => onInsertExample(codeBlock)}
                  style={{
                    marginTop: 8,
                    background: 'transparent',
                    border: '1px solid ' + theme.colors.border,
                    color: theme.colors.text,
                    borderRadius: 999,
                    padding: '4px 10px',
                    fontSize: 11,
                    cursor: 'pointer',
                  }}
                >
                  插入示例到编辑器
                </button>
              );
            })()}
          </div>
        ))}
        {isLoading && (
          <div style={{ ...msgBubble('assistant'), opacity: 0.6 }}>…</div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* 快捷操作 */}
      <div style={S.quickRow}>
        <QuickBtn label="看看代码" onClick={handleReviewCode} disabled={isLoading} />
        <QuickBtn label="给个提示" onClick={handleGetHint} disabled={isLoading} />
        <QuickBtn label="解释概念" onClick={handleExplain} disabled={isLoading} />
      </div>

      {/* 输入框 */}
      <div style={S.inputRow}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="问点什么… (Enter 发送)"
          rows={2}
          disabled={isLoading}
          style={{
            flex: 1,
            background: theme.colors.bgEditor,
            border: '1px solid ' + theme.colors.border,
            borderRadius: 4,
            color: theme.colors.text,
            padding: '6px 8px',
            fontSize: theme.fontSize.small,
            resize: 'none',
            fontFamily: 'inherit',
          }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={isLoading || !input.trim()}
          style={{
            background: theme.colors.accent,
            color: '#000',
            border: 'none',
            borderRadius: 4,
            padding: '0 12px',
            cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            opacity: isLoading || !input.trim() ? 0.5 : 1,
            alignSelf: 'stretch',
          }}>
          发送
        </button>
      </div>
    </div>
  );
}
