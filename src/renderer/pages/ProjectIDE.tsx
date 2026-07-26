// 实战项目 IDE — 三栏教学环境（v2：真实文件系统 + Agent）
// 左：Agent 聊天 + 提示 | 中：编辑器↑ + 控制台↓ | 右：文件树
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { theme } from '../theme';
import { useAuth } from '../hooks/useAuth';
import { getProject, getProjectsByCourse } from '../../shared/projects-data';
import type { ProjectDef } from '../../shared/projects-data';
import type { CourseId } from '../../shared/course-catalog';

// ─── API ──────────────────────────────────────────────

interface ProjectAPI {
  listFiles: (projectId: string) => Promise<{ success: boolean; data?: FileEntry[]; error?: string }>;
  readFile: (projectId: string, filePath: string) => Promise<{ success: boolean; data?: string; error?: string }>;
  writeFile: (projectId: string, filePath: string, content: string) => Promise<{ success: boolean; error?: string }>;
  exec: (projectId: string, command: string) => Promise<{ success: boolean; data?: string; error?: string; exitCode?: number }>;
  agent: {
    chat: (payload: any) => Promise<{ success: boolean; data?: string; error?: string }>;
    tool: (payload: any) => Promise<{ success: boolean; data?: string; error?: string }>;
  };
}

function api(): ProjectAPI | null {
  return (window as any).snailAPI?.project ?? null;
}

interface FileEntry { name: string; path: string; language: string; size: number; }

// ─── 文件树 ─────────────────────────────────────────

function FileTree({ files, activeFile, onSelectFile, onRun }: {
  files: FileEntry[];
  activeFile: string;
  onSelectFile: (path: string) => void;
  onRun: () => void;
}) {
  const tree = buildTree(files);

  return (
    <div style={{
      width: 220, background: 'var(--bg-sidebar)',
      borderLeft: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden',
    }}>
      <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: theme.colors.textDim, fontSize: 11, fontWeight: 800, letterSpacing: 1.5 }}>
        📁 项目文件
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }}>
        {Object.entries(tree).map(([dir, entries]) => (
          <div key={dir}>
            {dir !== '.' && <div style={{ padding: '4px 14px 2px', color: theme.colors.textDim, fontSize: 11, fontWeight: 700 }}>📂 {dir}</div>}
            {entries.map(f => (
              <button key={f.path} onClick={() => onSelectFile(f.path)} style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '4px 14px 4px ' + (dir === '.' ? 18 : 28) + 'px',
                border: 'none', background: activeFile === f.path ? 'var(--glass-strong)' : 'transparent',
                color: activeFile === f.path ? theme.colors.accent : theme.colors.text,
                cursor: 'pointer', fontSize: 12.5, fontFamily: 'system-ui, sans-serif',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {icon(f.language)} {f.name}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div style={{ padding: '8px', borderTop: '1px solid var(--border)' }}>
        <button onClick={onRun} style={{
          width: '100%', padding: '8px', borderRadius: 8,
          border: '1px solid ' + theme.colors.accent,
          background: theme.colors.accent + '14', color: theme.colors.accent,
          cursor: 'pointer', fontWeight: 700, fontSize: 13,
        }}>▶ 运行</button>
      </div>
    </div>
  );
}

function icon(lang: string): string {
  const m: Record<string, string> = { typescript: '🔷', python: '🐍', html: '🌐', css: '🎨', json: '📋', markdown: '📝' };
  return m[lang] || '📄';
}

function buildTree(files: FileEntry[]): Record<string, FileEntry[]> {
  const t: Record<string, FileEntry[]> = {};
  for (const f of files) {
    const parts = f.path.split('/');
    const dir = parts.length > 1 ? parts.slice(0, -1).join('/') : '.';
    (t[dir] ??= []).push({ ...f, name: parts[parts.length - 1] });
  }
  for (const d of Object.keys(t)) t[d].sort((a, b) => a.name.localeCompare(b.name));
  return t;
}

// ─── Agent 聊天面板 ──────────────────────────────────

function AgentChat({ project, activeFile, activeContent, onRefreshFiles }: {
  project: ProjectDef;
  activeFile: string;
  activeContent: string;
  onRefreshFiles: () => void;
}) {
  const storageKey = `snail:agent-chat:${project.id}`;

  const [messages, setMessages] = useState<{ role: string; content: string }[]>(() => {
    // 从 localStorage 恢复会话
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 会话变更时持久化
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, storageKey]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setLoading(true);

    const userMsg = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);

    try {
      const res = await api()?.agent.chat({
        messages: updated,
        context: {
          projectId: project.id,
          projectTitle: project.title,
          projectDescription: project.description,
          activeFile,
          activeContent,
        },
      });
      const reply = res?.data || '（Agent 无响应）';
      setMessages([...updated, { role: 'assistant', content: reply }]);
      onRefreshFiles(); // 可能修改了文件
    } catch (e: any) {
      setMessages([...updated, { role: 'assistant', content: '❌ ' + e.message }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, activeFile, activeContent, project, onRefreshFiles]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const quickActions = [
    { label: '🔍 评审代码', text: '请评审当前文件' },
    { label: '💡 给个提示', text: '这里的下一步应该怎么做？给我一个提示就好' },
    { label: '🐛 找Bug', text: '检查当前代码有没有bug' },
    { label: '📖 解释代码', text: '解释当前文件的关键代码逻辑' },
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: theme.colors.accent, fontSize: 11, fontWeight: 800, letterSpacing: 1 }}>
        🐌 项目导师
      </div>

      {/* 快捷操作 */}
      <div style={{ padding: '6px 10px', borderBottom: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {quickActions.map(a => (
          <button key={a.label} onClick={() => { setInput(a.text); }}
            disabled={loading}
            style={{
              padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border)',
              background: 'var(--glass)', color: theme.colors.textDim,
              cursor: 'pointer', fontSize: 10.5, fontWeight: 600,
            }}>{a.label}</button>
        ))}
      </div>

      {/* 消息列表 */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '8px 10px' }}>
        {messages.length === 0 && (
          <div style={{ color: theme.colors.textDim, fontSize: 12, lineHeight: 1.8, padding: '8px 4px' }}>
            <p>👋 我是你的项目导师！</p>
            <p style={{ marginTop: 8 }}>我会引导你完成 <strong>{project.title}</strong>。</p>
            <p style={{ marginTop: 8 }}>试试点击上面的快捷按钮，或直接问我问题。</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{
            marginBottom: 10,
            padding: '8px 10px',
            borderRadius: 10,
            background: m.role === 'user' ? 'var(--glass-strong)' : 'var(--glass)',
            fontSize: 12,
            color: theme.colors.text,
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
          }}>
            <div style={{ fontSize: 10, color: theme.colors.textDim, marginBottom: 4 }}>
              {m.role === 'user' ? '👤 你' : '🐌 导师'}
            </div>
            {m.content}
          </div>
        ))}
        {loading && <div style={{ color: theme.colors.textDim, fontSize: 11, padding: 8 }}>🐌 思考中...</div>}
      </div>

      {/* 输入框 */}
      <div style={{ padding: '6px 8px', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="问导师..."
            disabled={loading}
            style={{
              flex: 1, padding: '6px 10px', borderRadius: 8,
              border: '1px solid var(--border)', background: 'var(--bg-editor)',
              color: theme.colors.text, fontSize: 12, outline: 'none',
            }}
          />
          <button onClick={send} disabled={loading || !input.trim()} style={{
            padding: '6px 12px', borderRadius: 8, border: 'none',
            background: theme.colors.accent, color: '#03131D',
            cursor: 'pointer', fontWeight: 700, fontSize: 12, opacity: loading ? 0.5 : 1,
          }}>发送</button>
        </div>
      </div>
    </div>
  );
}

// ─── 提示面板 ───────────────────────────────────────

function HintsPanel({ project }: { project: ProjectDef }) {
  const [idx, setIdx] = useState(0);
  return (
    <div style={{ borderTop: '1px solid var(--border)', padding: '8px 10px', background: 'var(--bg-sidebar)', flexShrink: 0 }}>
      <div style={{ color: theme.colors.textDim, fontSize: 10, fontWeight: 800, marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
        💡 里程碑 <span style={{ color: theme.colors.accent }}>{idx + 1}/{project.milestones.length}</span>
      </div>
      <div style={{ padding: '6px 8px', borderRadius: 6, background: 'var(--glass)', fontSize: 11.5, color: theme.colors.text, lineHeight: 1.6, marginBottom: 6 }}>
        <strong style={{ color: theme.colors.accent }}>{project.milestones[idx].label}</strong>
        <div style={{ marginTop: 4 }}>{project.milestones[idx].description}</div>
        {project.milestones[idx].hint && <div style={{ marginTop: 6, padding: '4px 6px', borderRadius: 4, background: 'rgba(100,210,255,0.08)', color: theme.colors.accent, fontSize: 11 }}>💬 {project.milestones[idx].hint}</div>}
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        <button onClick={() => setIdx(h => Math.max(0, h - 1))} disabled={idx === 0} style={smallBtn(idx === 0)}>←</button>
        <button onClick={() => setIdx(h => Math.min(project.milestones.length - 1, h + 1))} disabled={idx === project.milestones.length - 1} style={smallBtn(idx === project.milestones.length - 1)}>→</button>
      </div>
    </div>
  );
}

function smallBtn(disabled: boolean): React.CSSProperties {
  return { flex: 1, padding: '5px 8px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--glass)', color: disabled ? theme.colors.textDim : theme.colors.text, cursor: disabled ? 'default' : 'pointer', fontSize: 11, fontWeight: 600, opacity: disabled ? 0.4 : 1 };
}

// ─── 主页面 ─────────────────────────────────────────

export default function ProjectIDE() {
  const { courseId, projectId } = useParams<{ courseId: string; projectId: string }>();
  const navigate = useNavigate();
  const project = getProject(projectId ?? '');

  const [files, setFiles] = useState<FileEntry[]>([]);
  const [activeFile, setActiveFile] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [output, setOutput] = useState('控制台输出...\n');
  const [running, setRunning] = useState(false);
  const [dirty, setDirty] = useState(false); // 是否有未保存修改

  // 加载文件列表（Electron 用真实文件系统，浏览器用 project-data 定义）
  const loadFiles = useCallback(async () => {
    if (!project) return;

    // 尝试真实文件系统
    try {
      const res = await api()?.listFiles(project.id);
      if (res?.success && res.data && res.data.length > 0) {
        setFiles(res.data);
        const main = res.data.find(f => f.path === project.mainFile || f.name === project.mainFile);
        if (main) setActiveFile(prev => prev || main.path);
        return;
      }
    } catch {}

    // 回退：从 project-data 定义生成文件列表
    const fallbackFiles: FileEntry[] = project.files.map(f => ({
      name: f.name.includes('/') ? f.name.split('/').pop()! : f.name,
      path: f.name,
      language: f.language,
      size: f.content.length,
    }));
    setFiles(fallbackFiles);
    const main = fallbackFiles.find(f => f.path === project.mainFile || f.name === project.mainFile);
    if (main) setActiveFile(prev => prev || main.path);
  }, [project]);

  useEffect(() => { loadFiles(); }, [project?.id]);

  // 加载文件内容
  const loadContent = useCallback(async (filePath: string) => {
    if (!project || !filePath) return;
    if (dirty && activeFile && fileContent) {
      try { await api()?.writeFile(project.id, activeFile, fileContent); } catch {}
    }
    setDirty(false);

    try {
      const res = await api()?.readFile(project.id, filePath);
      if (res?.success && res.data !== undefined) { setFileContent(res.data); return; }
    } catch {}

    const def = project.files.find(f => f.name === filePath);
    if (def) setFileContent(def.content);
    else setFileContent(`// 文件 ${filePath} 为空或不存在`);
  }, [project, dirty, activeFile, fileContent]);

  useEffect(() => {
    if (activeFile) loadContent(activeFile);
  }, [activeFile]);

  const handleSelectFile = useCallback((path: string) => {
    setActiveFile(path);
  }, []);

  const handleSave = useCallback(async () => {
    if (!project || !activeFile) return;
    await api()?.writeFile(project.id, activeFile, fileContent);
    setDirty(false);
    setOutput(prev => prev + `\n✅ 已保存 ${activeFile}`);
  }, [project, activeFile, fileContent]);

  const handleRun = useCallback(async () => {
    if (!project) return;
    if (dirty) await handleSave();
    setRunning(true);
    setOutput('⏳ 运行中...\n');

    // 尝试 project:exec（Electron 真实终端）
    const cmd = project.courseId === 'python'
      ? `run-python ${project.mainFile}`
      : `run-typescript ${project.mainFile}`;

    const res = await api()?.exec(project.id, cmd);
    if (res) {
      if (res.success) setOutput(res.data || '(无输出)');
      else setOutput(`❌ 运行失败 (exit ${res.exitCode ?? '?'})\n${res.error || ''}`);
      setRunning(false);
      return;
    }

    // 浏览器回退：用 snailAPI.runner.run 执行主文件代码
    const runnerApi = (window as any).snailAPI?.runner;
    if (runnerApi?.run) {
      const mainFile = project.files.find(f => f.name === project.mainFile);
      const lang = mainFile?.language ?? (project.courseId === 'python' ? 'python' : 'typescript');
      try {
        const result = await runnerApi.run(fileContent, lang);
        setOutput(typeof result === 'string' ? result : result?.output ?? JSON.stringify(result));
      } catch (e: any) {
        setOutput(`❌ ${e.message}`);
      }
    } else {
      setOutput('⚠️ 运行环境不可用（需要 Electron 桌面端）');
    }
    setRunning(false);
  }, [project, dirty, handleSave, fileContent]);

  const fileLang = files.find(f => f.path === activeFile)?.language || 'python';

  if (!project) {
    return <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme.colors.bg, color: theme.colors.textDim, flexDirection: 'column', gap: 12 }}>
      <span>项目未找到</span>
      <button onClick={() => navigate('/projects')} style={smallBtn(false)}>返回</button>
    </div>;
  }

  const siblings = getProjectsByCourse((courseId ?? 'typescript') as CourseId);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: theme.colors.bg }}>
      {/* 顶部导航 */}
      <div style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', borderBottom: '1px solid var(--border)', background: 'var(--bg-sidebar)', flexShrink: 0, gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => navigate('/projects')} style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 10px', color: theme.colors.textDim, cursor: 'pointer', fontSize: 12 }}>← 项目列表</button>
          <span style={{ color: theme.colors.textDim, fontSize: 12 }}>{project.icon}</span>
          <strong style={{ color: theme.colors.textBright, fontSize: 13 }}>{project.title}</strong>
          {dirty && <span style={{ color: theme.colors.accent, fontSize: 11 }}>● 未保存</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button onClick={handleSave} style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 10px', color: theme.colors.text, cursor: 'pointer', fontSize: 12 }}>💾 保存</button>
          <select value={projectId} onChange={e => navigate(`/projects/${courseId}/${e.target.value}`)}
            style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 6, color: theme.colors.text, padding: '4px 8px', fontSize: 12, cursor: 'pointer' }}>
            {siblings.map(p => <option key={p.id} value={p.id}>{p.icon} {p.title}</option>)}
          </select>
        </div>
      </div>

      {/* 三栏 */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {/* 左栏：Agent + 提示 */}
        <div style={{ width: 280, display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border)', background: 'var(--bg-sidebar)', flexShrink: 0 }}>
          <AgentChat project={project} activeFile={activeFile} activeContent={fileContent} onRefreshFiles={loadFiles} />
          <HintsPanel project={project} />
        </div>

        {/* 中栏：编辑器 + 控制台 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ height: 30, display: 'flex', alignItems: 'center', padding: '0 12px', borderBottom: '1px solid var(--border)', background: 'var(--bg-editor)', fontSize: 12, color: theme.colors.textDim, gap: 8 }}>
            <span>{icon(fileLang)}</span>
            <span style={{ color: theme.colors.text }}>{activeFile || '选择文件'}</span>
          </div>
          <div style={{ flex: 1, minHeight: 0, background: '#0D111A' }}>
            <textarea value={fileContent} onChange={e => { setFileContent(e.target.value); setDirty(true); }}
              spellCheck={false}
              style={{ width: '100%', height: '100%', border: 'none', background: '#0D111A', color: '#C9D1D9', fontFamily: "'Consolas','Monaco',monospace", fontSize: 13, lineHeight: 1.6, padding: '12px 14px', resize: 'none', outline: 'none', tabSize: 4, whiteSpace: 'pre' }}
              onKeyDown={e => { if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); handleSave(); } }} />
          </div>
          <div style={{ height: 180, borderTop: '1px solid var(--border)', background: '#080C14', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
            <div style={{ padding: '6px 12px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: theme.colors.textDim, fontSize: 11 }}>控制台</span>
              <button onClick={() => setOutput('')} style={{ background: 'transparent', border: 'none', color: theme.colors.textDim, cursor: 'pointer', fontSize: 11 }}>清除</button>
            </div>
            <pre style={{ flex: 1, margin: 0, padding: '8px 12px', color: '#C9D1D9', fontSize: 12, fontFamily: "'Consolas','Monaco',monospace", whiteSpace: 'pre-wrap', wordBreak: 'break-all', overflow: 'auto', lineHeight: 1.5 }}>{running ? '⏳ 运行中...' : output}</pre>
          </div>
        </div>

        {/* 右栏：文件树 */}
        <FileTree files={files} activeFile={activeFile} onSelectFile={handleSelectFile} onRun={handleRun} />
      </div>
    </div>
  );
}
