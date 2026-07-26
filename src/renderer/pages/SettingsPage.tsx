// 设置页 — AI 助教配置 + 开关
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../theme';

interface AiConfigPublic {
  baseUrl: string;
  model: string;
  contextLength: number;
  enabled: boolean;
  apiKeySet: boolean;
  apiKeyEncrypted: boolean;
}

const api = () => (window as any).snailAPI.ai;

// ─── 样式工具 ────────────────────────────────────────────

function inputStyle(disabled = false): React.CSSProperties {
  return {
    width: '100%',
    padding: '9px 12px',
    background: disabled ? theme.colors.bg : theme.colors.bgEditor,
    border: '1px solid ' + theme.colors.border,
    borderRadius: 4,
    color: disabled ? theme.colors.textDim : theme.colors.text,
    fontSize: theme.fontSize.body,
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  };
}

function labelStyle(): React.CSSProperties {
  return {
    display: 'block',
    color: theme.colors.textDim,
    fontSize: theme.fontSize.small,
    marginBottom: 4,
    marginTop: 16,
  };
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 44, height: 24, borderRadius: 12,
        background: checked ? theme.colors.accent : theme.colors.border,
        position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
        flexShrink: 0,
      }}>
      <div style={{
        width: 18, height: 18, borderRadius: '50%', background: '#fff',
        position: 'absolute', top: 3,
        left: checked ? 23 : 3,
        transition: 'left 0.2s',
      }} />
    </div>
  );
}

// ─── 主组件 ─────────────────────────────────────────────

export default function SettingsPage() {
  const navigate = useNavigate();

  const [cfg, setCfg] = useState<AiConfigPublic>({
    baseUrl: 'https://api.openai.com/v1',
    model: 'gpt-4o-mini',
    contextLength: 8192,
    enabled: false,
    apiKeySet: false,
    apiKeyEncrypted: false,
  });
  const [newApiKey, setNewApiKey] = useState('');
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api().getConfig().then((c: AiConfigPublic) => {
      setCfg(c);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await api().saveConfig({
        baseUrl: cfg.baseUrl,
        model: cfg.model,
        contextLength: cfg.contextLength,
        enabled: cfg.enabled,
        newApiKey,
      });
      setNewApiKey('');
      // 重新拉取确认
      const updated: AiConfigPublic = await api().getConfig();
      setCfg(updated);
      showToast('✅ 设置已保存');
    } catch (e: any) {
      showToast('❌ 保存失败：' + (e?.message || '未知错误'));
    } finally {
      setSaving(false);
    }
  }

  async function handleTest() {
    setTesting(true);
    try {
      const reply: string = await api().chat([
        { role: 'user', content: '请回复"连接正常"这四个字，不要回复其他内容。' },
      ]);
      showToast('✅ 连接成功：' + reply.slice(0, 30));
    } catch (e: any) {
      showToast('❌ 连接失败：' + (e?.message || '未知错误'));
    } finally {
      setTesting(false);
    }
  }

  if (loading) {
    return (
      <div style={{ background: theme.colors.bg, minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: theme.colors.textDim }}>加载中…</span>
      </div>
    );
  }

  return (
    <div style={{ background: theme.colors.bg, height: '100%', overflowY: 'auto', color: theme.colors.text }}>
      {/* 顶部导航 */}
      <header style={{
        height: 48, background: theme.colors.bgSidebar,
        borderBottom: '1px solid ' + theme.colors.border,
        display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16,
      }}>
        <button onClick={() => navigate(-1)} style={{
          background: 'none', border: 'none', color: theme.colors.textDim,
          cursor: 'pointer', fontSize: 18, padding: 0,
        }}>← </button>
        <span style={{ color: theme.colors.text, fontWeight: 600 }}>设置</span>
      </header>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 24px' }}>

        {/* ── AI 助教 ── */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <h2 style={{ color: theme.colors.accent, margin: 0, fontSize: 18 }}>🤖 AI 助教</h2>
            <Toggle checked={cfg.enabled} onChange={v => setCfg(c => ({ ...c, enabled: v }))} />
          </div>
          <p style={{ color: theme.colors.textDim, fontSize: theme.fontSize.small, margin: '0 0 24px' }}>
            开启后，学习页右侧出现 AI 助教面板。AI 会记住同一用户最近的提问和卡点，并按当前课程进度解释内容。
            它可以提供最小示例，并支持手动插入到编辑器，但不会直接替你完成当前作业。使用 OpenAI 兼容接口，支持 OpenAI、DeepSeek、Ollama 等服务。
          </p>

          {/* API 地址 */}
          <label style={labelStyle()}>API 地址</label>
          <input
            value={cfg.baseUrl}
            onChange={e => setCfg(c => ({ ...c, baseUrl: e.target.value }))}
            placeholder="https://api.openai.com/v1"
            style={inputStyle()}
          />
          <p style={{ color: theme.colors.textDim, fontSize: '11px', margin: '4px 0 0' }}>
            Ollama 本地：http://localhost:11434/v1 &nbsp;|&nbsp; DeepSeek：https://api.deepseek.com/v1
          </p>

          {/* API 密钥 */}
          <label style={labelStyle()}>
            API 密钥
            {cfg.apiKeySet && (
              <span style={{ color: theme.colors.success, marginLeft: 8 }}>已设置 ✓</span>
            )}
          </label>
          <input
            type="password"
            value={newApiKey}
            onChange={e => setNewApiKey(e.target.value)}
            placeholder={cfg.apiKeySet ? '留空保持现有密钥不变' : '输入你的 API 密钥'}
            style={inputStyle()}
          />
          <p style={{ color: theme.colors.textDim, fontSize: '11px', margin: '4px 0 0' }}>
            {cfg.apiKeyEncrypted
              ? '密钥由系统钥匙串加密后保存在本地 userData 目录，不上传任何服务器。'
              : '当前系统没有可用的钥匙串后端，密钥将以明文保存在本地 userData 目录，不上传任何服务器。'}
          </p>

          {/* 模型 */}
          <label style={labelStyle()}>模型 ID</label>
          <input
            value={cfg.model}
            onChange={e => setCfg(c => ({ ...c, model: e.target.value }))}
            placeholder="gpt-4o-mini"
            style={inputStyle()}
          />

          {/* 常用模型快速填表 */}
          <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
            {[
              { label: 'GPT-4o mini',    url: 'https://api.openai.com/v1',  model: 'gpt-4o-mini',    ctx: 128000 },
              { label: 'GPT-4o',         url: 'https://api.openai.com/v1',  model: 'gpt-4o',         ctx: 128000 },
              { label: 'DeepSeek V3',    url: 'https://api.deepseek.com/v1', model: 'deepseek-chat', ctx: 64000  },
              { label: 'Qwen2.5 7B',     url: 'http://localhost:11434/v1',  model: 'qwen2.5:7b',     ctx: 8192   },
              { label: 'Llama3.1 8B',    url: 'http://localhost:11434/v1',  model: 'llama3.1:8b',    ctx: 8192   },
            ].map(p => (
              <button key={p.label} onClick={() => setCfg(c => ({
                ...c, baseUrl: p.url, model: p.model, contextLength: p.ctx,
              }))} style={{
                background: 'transparent',
                border: '1px solid ' + theme.colors.border,
                color: theme.colors.textDim,
                borderRadius: 4, padding: '2px 8px',
                fontSize: '11px', cursor: 'pointer',
              }}>
                {p.label}
              </button>
            ))}
          </div>
          <p style={{ color: theme.colors.textDim, fontSize: '11px', margin: '4px 0 0' }}>
            点击快速填入常用模型配置，也可手动输入任意 OpenAI 兼容模型名
          </p>

          {/* 上下文长度 */}
          <label style={labelStyle()}>上下文长度（tokens）</label>
          <input
            type="number"
            min={512}
            max={2000000}
            step={1024}
            value={cfg.contextLength}
            onChange={e => setCfg(c => ({ ...c, contextLength: Number(e.target.value) || 8192 }))}
            style={inputStyle()}
          />
          <p style={{ color: theme.colors.textDim, fontSize: '11px', margin: '4px 0 0' }}>
            模型支持的最大 token 数（输入+输出合计）。
            超出时自动裁剪对话历史；响应 token 上限 = min(2000, 上下文 × 25%)。
          </p>

          {/* 按钮区 */}
          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            <button onClick={handleSave} disabled={saving} style={{
              background: theme.colors.accent, color: '#000',
              border: 'none', borderRadius: 4, padding: '9px 24px',
              cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 'bold',
              opacity: saving ? 0.7 : 1,
            }}>
              {saving ? '保存中…' : '保存设置'}
            </button>
            <button onClick={handleTest} disabled={testing || !cfg.enabled} style={{
              background: 'transparent',
              border: '1px solid ' + theme.colors.border,
              color: testing || !cfg.enabled ? theme.colors.textDim : theme.colors.text,
              borderRadius: 4, padding: '9px 20px',
              cursor: testing || !cfg.enabled ? 'not-allowed' : 'pointer',
            }}>
              {testing ? '测试中…' : '测试连接'}
            </button>
          </div>

          {!cfg.enabled && (
            <p style={{ color: theme.colors.textDim, fontSize: theme.fontSize.small, marginTop: 8 }}>
              请先开启 AI 助教才能测试连接
            </p>
          )}
        </section>

        {/* ── 应用信息 ── */}
        <section style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid ' + theme.colors.border }}>
          <h2 style={{ color: theme.colors.text, fontSize: 16, margin: '0 0 12px' }}>关于</h2>
          <p style={{ color: theme.colors.textDim, fontSize: theme.fontSize.small, lineHeight: 1.8, margin: 0 }}>
            🐌 蜗牛编程 — TypeScript 初级到全栈<br />
            22 章 · 96 节 · 66 道练习题<br />
          </p>
        </section>
      </div>

      {/* Toast 提示 */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: theme.colors.bgCard, border: '1px solid ' + theme.colors.border,
          borderRadius: 8, padding: '10px 20px', color: theme.colors.text,
          fontSize: theme.fontSize.body, boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          zIndex: 9999,
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}
