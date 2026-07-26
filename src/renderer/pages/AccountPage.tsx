// M11: 账户页 — 登录 / 注册 / 账户信息
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { theme } from '../theme';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import { buildLearnPath, findSectionLocation, getPlanSectionIds, LEARNING_PLANS } from '../../shared/course-catalog';

export default function AccountPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, token, isLoggedIn, isLoading: authLoading, login, register, logout } = useAuth();
  const { progress: tsProgress } = useProgress(userId, 'typescript');
  const { progress: pythonProgress } = useProgress(userId, 'python');
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [profileStatus, setProfileStatus] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const hasAuthApi = !!(window as any).snailAPI?.auth;

  useEffect(() => {
    if (!userId || !(window as any).snailAPI?.profile) return;
    (window as any).snailAPI.profile.get().then((profile: { nickname: string }) => {
      setNickname(profile.nickname);
    });
  }, [userId]);

  const handleSubmit = async () => {
    if (!hasAuthApi) { setError('当前是浏览器预览环境，注册/登录需要在 Electron 桌面窗口中测试'); return; }
    if (!username.trim()) { setError('请输入用户名'); return; }
    if (username.trim().length < 2 || username.trim().length > 20) { setError('用户名2-20字符'); return; }
    if (!password) { setError('请输入密码'); return; }
    if (password.length < 6) { setError('密码至少6位'); return; }

    setError('');
    setIsLoading(true);
    try {
      if (isLogin) await login(username.trim(), password);
      else await register(username.trim(), password);
      const from = (location.state as { from?: string } | null)?.from;
      navigate(from && from !== '/account' ? from : '/');
    } catch (e: any) {
      setError(e.message || '操作失败');
    } finally {
      setIsLoading(false);
    }
  };

  async function saveNickname() {
    if (!userId) return;
    setProfileStatus('保存中...');
    try {
      const profile = await (window as any).snailAPI.profile.save(nickname);
      setNickname(profile.nickname);
      setProfileStatus('已保存');
    } catch (e: any) {
      setProfileStatus(e.message || '保存失败');
    }
  }

  const handleLogout = async () => {
    await logout();
    setUsername('');
    setPassword('');
    setNickname('');
    setIsLogin(true);
  };

  if (authLoading) {
    return <PageShell centered><p style={{ color: theme.colors.textDim }}>正在读取账户状态...</p></PageShell>;
  }

  if (isLoggedIn) {
    return (
      <PageShell>
        <main style={{ width: 'min(980px, 100%)' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
            <div>
              <div style={{ color: theme.colors.accent, fontSize: 11, letterSpacing: 3, fontWeight: 900 }}>ACCOUNT CENTER</div>
              <h1 style={{ color: theme.colors.textBright, marginTop: 10, fontSize: 34 }}>Hi，{nickname || '学习者'}</h1>
              <p style={{ color: theme.colors.textDim, marginTop: 8 }}>这里保存你的昵称、会话和所有学习路线进度。</p>
            </div>
            <button onClick={() => navigate('/')} style={ghostButtonStyle()}>返回首页</button>
          </header>

          <section style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 0.8fr) minmax(0, 1.2fr)', gap: 18 }}>
            <Card>
              <h2 style={{ color: theme.colors.textBright, fontSize: 18, marginBottom: 14 }}>个人资料</h2>
              <label style={{ color: theme.colors.textDim, fontSize: 12 }}>昵称</label>
              <input value={nickname} onChange={e => setNickname(e.target.value)} style={inputStyle()} placeholder="给自己起个名字" />
              <button onClick={saveNickname} style={primaryButtonStyle()}>保存昵称</button>
              {profileStatus && <p style={{ color: profileStatus === '已保存' ? theme.colors.success : theme.colors.textDim, marginTop: 10 }}>{profileStatus}</p>}

              <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid ' + theme.colors.border, color: theme.colors.textDim, fontSize: 12, lineHeight: 1.9 }}>
                <div>用户 ID：<span style={{ color: theme.colors.text }}>{userId}</span></div>
                <div>Token：<span style={{ color: theme.colors.text }}>{token?.slice(0, 8)}...</span></div>
              </div>
              <button onClick={handleLogout} style={{ ...secondaryButtonStyle(), marginTop: 16 }}>退出登录</button>
            </Card>

            <Card>
              <h2 style={{ color: theme.colors.textBright, fontSize: 18, marginBottom: 14 }}>学习进度</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 12 }}>
                {LEARNING_PLANS.map(card => {
                  const progress = card.courseId === 'python' ? pythonProgress : tsProgress;
                  const completed = progress?.completedSections ?? [];
                  const sectionIds = getPlanSectionIds(card.id);
                  const total = sectionIds.length;
                  const done = sectionIds.filter(id => completed.includes(id)).length;
                  const targetSectionId = (
                    progress?.currentSectionId && sectionIds.includes(progress.currentSectionId)
                      ? progress.currentSectionId
                      : [...completed].reverse().find(id => sectionIds.includes(id))
                  ) ?? card.startSectionId;
                  const targetLocation = findSectionLocation(card.courseId, targetSectionId) ?? {
                    chapterId: card.startChapterId,
                    sectionId: card.startSectionId,
                  };
                  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
                  const enabled = total > 0;
                  return (
                    <button
                      key={card.id}
                      onClick={() => enabled && navigate(buildLearnPath(card.courseId, targetLocation.chapterId, targetLocation.sectionId))}
                      disabled={!enabled}
                      style={{
                        textAlign: 'left',
                        background: theme.colors.glass,
                        border: '1px solid ' + theme.colors.border,
                        borderRadius: 18,
                        padding: 16,
                        cursor: enabled ? 'pointer' : 'not-allowed',
                        opacity: enabled ? 1 : 0.56,
                      }}
                    >
                      <strong style={{ color: theme.colors.textBright }}>{card.title}</strong>
                      <div style={{ color: theme.colors.textDim, marginTop: 12, fontSize: 12 }}>{total > 0 ? `${done} / ${total} 节` : '即将开放'}</div>
                      <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden', marginTop: 10 }}>
                        <div style={{ width: percent + '%', height: '100%', borderRadius: 999, background: `linear-gradient(90deg, ${theme.colors.accent}, ${theme.colors.accentHover})` }} />
                      </div>
                      <div style={{ color: theme.colors.accent, marginTop: 10, fontSize: 12 }}>{enabled ? `${percent}% · 点击继续` : '等待课程内容'}</div>
                    </button>
                  );
                })}
              </div>
            </Card>
          </section>
        </main>
      </PageShell>
    );
  }

  return (
    <PageShell centered>
      <Card narrow>
        <div style={{ color: theme.colors.accent, fontSize: 12, fontWeight: 800, letterSpacing: 2, textAlign: 'center' }}>SNAIL PROGRAMMING</div>
        <h2 style={{ color: theme.colors.textBright, textAlign: 'center', margin: '12px 0 6px' }}>{isLogin ? '登录后继续学习' : '创建你的学习档案'}</h2>
        <p style={{ color: theme.colors.textDim, textAlign: 'center', lineHeight: 1.7, margin: '0 0 22px' }}>注册后才能保存代码、学习进度和考试记录。</p>
        {!hasAuthApi && <div style={{ color: theme.colors.error, background: theme.colors.error + '14', border: '1px solid ' + theme.colors.error + '55', borderRadius: 12, padding: 10, marginBottom: 14, fontSize: 12, lineHeight: 1.6 }}>当前是浏览器预览环境。请使用 Electron 桌面窗口测试注册、数据库和代码运行。</div>}
        <input placeholder="用户名" value={username} onChange={e => setUsername(e.target.value)} style={inputStyle()} />
        <input type="password" placeholder="密码" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }} style={inputStyle()} />
        {error && <p style={{ color: theme.colors.error, fontSize: theme.fontSize.small, lineHeight: 1.6 }}>{error}</p>}
        <button onClick={handleSubmit} disabled={isLoading} style={primaryButtonStyle(isLoading)}>{isLoading ? '处理中...' : (isLogin ? '登录' : '注册并开始')}</button>
        <p style={{ textAlign: 'center', marginTop: 16, color: theme.colors.textDim, cursor: 'pointer' }} onClick={() => { setIsLogin(!isLogin); setError(''); }}>{isLogin ? '没有账号？创建学习档案' : '已有账号？去登录'}</p>
      </Card>
    </PageShell>
  );
}

function PageShell({ children, centered = false }: { children: React.ReactNode; centered?: boolean }) {
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: `radial-gradient(circle at 30% 10%, rgba(100,210,255,0.18), transparent 30%), radial-gradient(circle at 80% 0%, rgba(120,120,255,0.12), transparent 24%), ${theme.colors.bg}`, padding: 28, display: 'flex', alignItems: centered ? 'center' : 'flex-start', justifyContent: 'center' }}>
      {children}
    </div>
  );
}

function Card({ children, narrow = false }: { children: React.ReactNode; narrow?: boolean }) {
  return <div style={{ background: theme.colors.bgCard, border: '1px solid ' + theme.colors.border, borderRadius: 26, padding: 26, width: narrow ? 390 : '100%', boxShadow: '0 6px 18px rgba(0,0,0,0.14)' }}>{children}</div>;
}

function inputStyle(): React.CSSProperties {
  return { width: '100%', padding: '11px 12px', margin: '8px 0', background: theme.colors.bgEditor, border: '1px solid ' + theme.colors.border, borderRadius: 12, color: theme.colors.text, boxSizing: 'border-box' };
}

function primaryButtonStyle(disabled = false): React.CSSProperties {
  return { width: '100%', padding: '12px', marginTop: 12, background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentHover})`, color: '#03131D', border: 'none', borderRadius: 999, cursor: disabled ? 'not-allowed' : 'pointer', fontWeight: 900, opacity: disabled ? 0.7 : 1 };
}

function secondaryButtonStyle(): React.CSSProperties {
  return { width: '100%', padding: '12px', background: 'transparent', color: theme.colors.text, border: '1px solid ' + theme.colors.border, borderRadius: 999, cursor: 'pointer', fontWeight: 800 };
}

function ghostButtonStyle(): React.CSSProperties {
  return { background: 'rgba(255,255,255,0.045)', color: theme.colors.text, border: '1px solid ' + theme.colors.border, borderRadius: 999, padding: '10px 16px', fontWeight: 720, cursor: 'pointer' };
}
