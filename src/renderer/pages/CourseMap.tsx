// 极简主页 — 继续学习 + 首次选课 + 进阶项目推荐
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../theme';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import { useThemeMode } from '../hooks/useThemeMode';
import '../styles/course-map.css';
import { SegmentedControl } from '../components/common/SegmentedControl';
import { getGithubUrl, getRecommendationsByLanguage, getTrackCounts, levelMeta, recommendationTracks, type RecommendationLanguage } from '../utils/projectRecommendations';
import type { CourseId } from '../../shared/course-catalog';
import { buildLearnPath, getCourseBundle, getCourseDataById, LEARNING_PLANS } from '../../shared/course-catalog';

const themeLabel = {
  auto: '自动',
  light: '浅色',
  dark: '深色',
};

const promptOpeners = [
  '刚刚的节奏不错',
  '我帮你接上上次的位置',
  '今天适合推进一点点',
  '这里已经为你准备好了',
  '继续保持低速但稳定的推进',
];

interface SavedPlan {
  planId: string;
  courseId?: CourseId;
  startChapterId: string;
  startSectionId: string;
}

interface Profile {
  nickname: string;
}

interface ContinueTarget {
  courseId: CourseId;
  chapterId: string;
  sectionId: string;
  title: string;
}

function getPromptIndex(): number {
  const today = new Date().toDateString();
  const seed = `${today}:${localStorage.getItem('snail:userId') ?? 'guest'}`;
  return seed.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % promptOpeners.length;
}

export default function CourseMap() {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const { mode, setMode } = useThemeMode();
  const [projectLanguage, setProjectLanguage] = useState<RecommendationLanguage>('typescript');
  const [savedPlan, setSavedPlan] = useState<SavedPlan | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingPlan, setSavingPlan] = useState('');
  const [activeCourseId, setActiveCourseId] = useState<CourseId>('typescript');
  const { progress } = useProgress(userId, activeCourseId);

  useEffect(() => {
    if (savedPlan?.courseId) {
      setActiveCourseId(savedPlan.courseId);
    }
  }, [savedPlan]);

  useEffect(() => {
    if (!userId) return;
    Promise.all([
      (window as any).snailAPI.plan.get(userId),
      (window as any).snailAPI.profile.get(userId),
    ]).then(([plan, userProfile]) => {
      setSavedPlan(plan);
      setProfile(userProfile);
    }).finally(() => setLoading(false));
  }, [userId]);

  const savedPlanForActiveCourse = savedPlan && savedPlan.courseId === activeCourseId ? savedPlan : null;

  const continueTarget = useMemo<ContinueTarget | null>(() => {
    const currentCourseData = getCourseDataById(activeCourseId);
    if (progress?.currentSectionId) {
      const section = currentCourseData.chapters.flatMap(ch => ch.sections).find(s => s.id === progress.currentSectionId);
      if (section) return { courseId: activeCourseId, chapterId: section.chapterId, sectionId: section.id, title: section.title };
    }
    if (savedPlanForActiveCourse) {
      const section = currentCourseData.chapters.flatMap(ch => ch.sections).find(s => s.id === savedPlanForActiveCourse.startSectionId);
      return { courseId: activeCourseId, chapterId: savedPlanForActiveCourse.startChapterId, sectionId: savedPlanForActiveCourse.startSectionId, title: section?.title ?? '第一节' };
    }
    return null;
  }, [activeCourseId, progress, savedPlanForActiveCourse]);

  const smartMessage = useMemo(() => {
    const nickname = profile?.nickname ?? '学习者';
    const completed = progress?.completedSections?.length ?? 0;
    const total = getCourseDataById(activeCourseId).totalSections;
    if (completed > 0 && continueTarget) {
      return `${promptOpeners[getPromptIndex()]}。Hi，${nickname}，已完成 ${completed}/${total} 节，上次进行到「${continueTarget.title}」，要继续吗？`;
    }
    if (continueTarget) {
      return `${promptOpeners[getPromptIndex()]}。Hi，${nickname}，之前进行到了「${continueTarget.title}」的学习，要继续吗？`;
    }
    return `Hi，${nickname}，选择一条路线开始吧。`;
  }, [profile, continueTarget, progress, activeCourseId]);

  const trackCards = useMemo(() => (
    recommendationTracks.map(track => ({
      ...track,
      counts: getTrackCounts(track.language),
    }))
  ), []);

  const totalRecommendationCount = useMemo(() => (
    trackCards.reduce((sum, track) => sum + track.counts.total, 0)
  ), [trackCards]);

  const selectedTrack = useMemo(() => (
    trackCards.find(track => track.language === projectLanguage) ?? trackCards[0]
  ), [projectLanguage, trackCards]);

  const selectedRecommendations = useMemo(() => (
    getRecommendationsByLanguage(projectLanguage)
  ), [projectLanguage]);

  async function selectPlan(plan: typeof LEARNING_PLANS[number]) {
    if (!userId || plan.status !== 'available') return;
    setSavingPlan(plan.id);
    try {
      const saved = await (window as any).snailAPI.plan.save({ userId, planId: plan.id, startChapterId: plan.startChapterId, startSectionId: plan.startSectionId });
      setSavedPlan(saved);
      navigate(buildLearnPath(plan.courseId, plan.startChapterId, plan.startSectionId));
    } finally {
      setSavingPlan('');
    }
  }

  if (loading) {
    return <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme.colors.bg, color: theme.colors.textDim }}>正在唤醒你的学习空间...</div>;
  }

  return (
    <div className="course-map-shell" style={{ color: theme.colors.text, background: 'transparent' }}>
      <div className="course-map-grid" />
      <div className="course-map-orb course-map-orb-primary" />
      <div className="course-map-orb course-map-orb-secondary" />
      <div className="course-map-orb course-map-orb-tertiary" />

      <main style={{ position: 'relative', zIndex: 1, maxWidth: 1120, margin: '0 auto', padding: '56px 28px 72px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <div style={{ color: theme.colors.accent, fontSize: 11, letterSpacing: 3, fontWeight: 900 }}>SNAIL LEARNING</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <SegmentedControl
              value={mode}
              onChange={setMode}
              options={[
                { value: 'auto', label: '自动' },
                { value: 'light', label: '浅色' },
                { value: 'dark', label: '深色' },
              ]}
            />
            <button onClick={() => navigate('/projects')} style={ghostButtonStyle()}>🛠️ 实战</button>
            <button onClick={() => navigate('/account')} style={ghostButtonStyle()}>账户</button>
          </div>
        </header>

        <section style={{ marginTop: 72, display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(300px, 0.85fr)', gap: 18 }}>
          <div style={{ padding: '30px 0 12px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 12px', borderRadius: 999, background: theme.colors.glass, border: '1px solid ' + theme.colors.border, color: theme.colors.textDim, fontSize: 11 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: theme.colors.success, boxShadow: `0 0 6px ${theme.colors.success}` }} />
              Adaptive learning prompt
            </div>

            <h1 style={{ margin: '22px 0 0', fontSize: 38, lineHeight: 1.18, color: theme.colors.textBright, fontWeight: 760, letterSpacing: -0.8 }}>
              {smartMessage}
            </h1>

            <div style={{ marginTop: 26, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {continueTarget && <button onClick={() => navigate(buildLearnPath(continueTarget.courseId, continueTarget.chapterId, continueTarget.sectionId))} style={primaryButtonStyle()}>继续学习</button>}
              {!continueTarget && <button onClick={() => navigate('/account')} style={primaryButtonStyle()}>开始学习</button>}
              <button onClick={() => navigate('/account')} style={ghostButtonStyle()}>查看学习进度</button>
            </div>

            <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <StatChip label="推荐项目" value={`${totalRecommendationCount} 个`} />
              <StatChip label="当前课程" value={getCourseBundle(activeCourseId).label} />
              <StatChip label="当前主题" value={themeLabel[mode]} />
            </div>
          </div>

          <aside style={{
            background: 'color-mix(in srgb, var(--bg-card) 92%, transparent)',
            border: '1px solid ' + theme.colors.border,
            borderRadius: 28,
            padding: 22,
            boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
            alignSelf: 'start',
          }}>
            <div style={{ color: theme.colors.accent, fontSize: 11, letterSpacing: 2.5, fontWeight: 900 }}>NEXT STEP</div>
            <h2 style={{ marginTop: 12, color: theme.colors.textBright, fontSize: 24, lineHeight: 1.35 }}>
              {savedPlanForActiveCourse ? '你的路线已经就绪' : '先选学习路线，再接项目练手'}
            </h2>
            <p style={{ marginTop: 10, color: theme.colors.textDim, lineHeight: 1.8 }}>
              {savedPlanForActiveCourse
                ? `当前已保存 ${LEARNING_PLANS.find(plan => plan.id === savedPlanForActiveCourse.planId)?.title ?? '学习路线'}，可以先完成章节，再切到项目库做同步练习。`
                : `建议先锁定一条 ${getCourseBundle(activeCourseId).label} 主路线。首页保留最核心的下一步，其余进度和设置入口仍然放到账户与项目页。`}
            </p>

            <div style={{ marginTop: 18, display: 'grid', gap: 12 }}>
              {savedPlanForActiveCourse ? (
                <div style={featurePanelStyle()}>
                  <div style={{ color: theme.colors.textBright, fontWeight: 720 }}>已选路线</div>
                  <div style={{ marginTop: 8, color: theme.colors.textDim, lineHeight: 1.7 }}>
                    {LEARNING_PLANS.find(plan => plan.id === savedPlanForActiveCourse.planId)?.title ?? '学习路线'}
                  </div>
                  <button onClick={() => continueTarget && navigate(buildLearnPath(continueTarget.courseId, continueTarget.chapterId, continueTarget.sectionId))} style={{ ...ghostButtonStyle(), marginTop: 14, width: '100%' }}>
                    回到当前章节
                  </button>
                </div>
              ) : (
                <div style={featurePanelStyle()}>
                  <div style={{ color: theme.colors.textBright, fontWeight: 720 }}>推荐起步</div>
                  <div style={{ marginTop: 8, color: theme.colors.textDim, lineHeight: 1.7 }}>
                    如果你是第一次进入，可以直接选一条主语言路线开始。想做桌面与前端优先 TypeScript，想学脚本、自动化和 AI 工具优先 Python。
                  </div>
                </div>
              )}

              <div style={featurePanelStyle()}>
                <div style={{ color: theme.colors.textBright, fontWeight: 720 }}>项目节奏</div>
                <div style={{ marginTop: 8, color: theme.colors.textDim, lineHeight: 1.7 }}>
                  入门先做小体量，进阶做完整复刻，高手阶段开始研读大型仓库与架构设计。
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section style={{ marginTop: 72 }}>
          <div>
            <div style={{ color: theme.colors.accent, fontSize: 11, letterSpacing: 2.5, fontWeight: 900 }}>ADVANCED PROJECTS</div>
            <h2 style={{ marginTop: 10, color: theme.colors.textBright, fontSize: 30 }}>课后进阶项目推荐</h2>
            <button onClick={() => navigate('/projects')} style={{
              marginTop: 14,
              background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentHover})`,
              color: '#03131D', border: 'none', borderRadius: 999,
              padding: '10px 20px', fontWeight: 800, cursor: 'pointer',
              fontSize: 15,
              boxShadow: `0 8px 20px ${theme.colors.glow}`,
            }}>
              🛠️ 进入实战项目 IDE →
            </button>
          </div>

          <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {trackCards.map(track => (
              <article key={track.language}
                onClick={() => navigate('/projects')}
                style={{
                  cursor: 'pointer',
                background: 'color-mix(in srgb, var(--bg-card) 88%, transparent)',
                border: '1px solid ' + theme.colors.border,
                borderRadius: 24,
                padding: 22,
                boxShadow: '0 6px 16px rgba(0,0,0,0.09)',
              }}>
                <div style={{ color: theme.colors.accent, fontSize: 11, letterSpacing: 2, fontWeight: 900 }}>{track.label}</div>
                <h3 style={{ marginTop: 10, color: theme.colors.textBright, fontSize: 22 }}>{track.description}</h3>
                <p style={{ marginTop: 10, color: theme.colors.textDim, lineHeight: 1.8 }}>{track.guide}</p>
                <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <StatChip label="入门" value={`${track.counts.entry} 个`} />
                  <StatChip label="进阶" value={`${track.counts.intermediate} 个`} />
                  <StatChip label="高手" value={`${track.counts.expert} 个`} />
                </div>
                <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid ' + theme.colors.border, color: theme.colors.textDim, lineHeight: 1.75 }}>
                  {track.actionHint}
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ color: theme.colors.textBright, fontSize: 18, fontWeight: 760 }}>
                GitHub项目推荐
              </div>
              <div style={{ marginTop: 8, color: theme.colors.textDim, fontSize: 12 }}>
                当前查看：{selectedTrack.label} · {selectedTrack.counts.total} 个项目
              </div>
            </div>
            <SegmentedControl
              value={projectLanguage}
              onChange={setProjectLanguage}
              options={[
                { value: 'typescript', label: 'TypeScript' },
                { value: 'python', label: 'Python' },
              ]}
            />
          </div>

          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {(['entry', 'intermediate', 'expert'] as const).map(level => (
              <React.Fragment key={level}>
                <div style={{ gridColumn: '1 / -1', marginTop: level === 'entry' ? 0 : 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
                    <div>
                      <div style={{ color: theme.colors.textBright, fontSize: 18, fontWeight: 760 }}>{levelMeta[level].label}</div>
                      <div style={{ marginTop: 6, color: theme.colors.textDim, fontSize: 12 }}>{levelMeta[level].description}</div>
                    </div>
                    <StatChip label="项目数" value={`${selectedRecommendations.filter(item => item.level === level).length} 个`} />
                  </div>
                </div>
                {selectedRecommendations.filter(item => item.level === level).map(item => (
                  <article key={`${item.language}-${item.level}-${item.title}`} style={{
                    background: 'linear-gradient(180deg, color-mix(in srgb, var(--bg-card) 94%, transparent), color-mix(in srgb, var(--glass) 92%, transparent))',
                    border: '1px solid ' + theme.colors.border,
                    borderRadius: 22,
                    padding: 20,
                    boxShadow: '0 6px 16px rgba(0,0,0,0.09)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                      <span style={{ color: theme.colors.accent, fontSize: 11, fontWeight: 900, letterSpacing: 1.8 }}>
                        {item.language === 'typescript' ? 'TypeScript' : 'Python'}
                      </span>
                      <span style={{ color: theme.colors.textDim, fontSize: 11 }}>{levelMeta[item.level].label}</span>
                    </div>
                    <h3 style={{ marginTop: 14, color: theme.colors.textBright, fontSize: 18, lineHeight: 1.45 }}>{item.title}</h3>
                    <p style={{ marginTop: 10, color: theme.colors.textDim, lineHeight: 1.75, minHeight: 50 }}>{item.highlight}</p>
                    <div style={{ marginTop: 14, color: theme.colors.text, fontSize: 12 }}>{item.stack}</div>
                    <div style={{ marginTop: 6, color: theme.colors.textDim, fontSize: 12 }}>{item.scale}</div>
                    <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid ' + theme.colors.border, color: theme.colors.textDim, fontSize: 12, lineHeight: 1.65 }}>
                      GitHub：{item.repo}
                    </div>
                    <div style={{ marginTop: 'auto', paddingTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <button onClick={() => openGithubRepo(item.repo)} style={cardActionButtonStyle(true)}>打开 GitHub</button>
                    </div>
                  </article>
                ))}
              </React.Fragment>
            ))}
          </div>

          <div style={{ marginTop: 16, color: theme.colors.textDim, fontSize: 12, lineHeight: 1.8 }}>
            学习建议：先做 2 个入门项目建立速度，再挑 1 个进阶项目做完整闭环，最后开始读高手级源码，重点看模块拆分、测试策略和部署结构。
          </div>
        </section>
      </main>
    </div>
  );
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 12px',
      borderRadius: 999,
      border: '1px solid ' + theme.colors.border,
      background: theme.colors.glass,
      color: theme.colors.textDim,
      fontSize: 11,
      fontWeight: 700,
    }}>
      <span>{label}</span>
      <span style={{ color: theme.colors.textBright }}>{value}</span>
    </span>
  );
}

function primaryButtonStyle(): React.CSSProperties {
  return { background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentHover})`, color: '#03131D', border: '1px solid color-mix(in srgb, var(--accent) 22%, transparent)', borderRadius: 999, padding: '11px 20px', fontWeight: 820, cursor: 'pointer', boxShadow: `0 8px 20px ${theme.colors.glow}` };
}

function ghostButtonStyle(): React.CSSProperties {
  return { background: theme.colors.glass, color: theme.colors.text, border: '1px solid ' + theme.colors.border, borderRadius: 999, padding: '10px 16px', fontWeight: 720, cursor: 'pointer' };
}

function featurePanelStyle(): React.CSSProperties {
  return {
    background: 'color-mix(in srgb, var(--glass) 92%, transparent)',
    border: '1px solid ' + theme.colors.border,
    borderRadius: 18,
    padding: 16,
  };
}

function cardActionButtonStyle(primary: boolean): React.CSSProperties {
  return {
    background: primary
      ? `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentHover})`
      : theme.colors.glass,
    color: primary ? '#03131D' : theme.colors.text,
    border: '1px solid ' + (primary ? 'transparent' : theme.colors.border),
    borderRadius: 999,
    padding: '9px 14px',
    fontWeight: 760,
    cursor: 'pointer',
  };
}

function openGithubRepo(repo: string) {
  const url = getGithubUrl(repo);
  const api = (window as any).snailAPI;
  if (api?.system?.openExternal) {
    api.system.openExternal(url);
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}
