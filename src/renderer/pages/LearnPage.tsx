// M09: 主学习页 — 概念卡片 + 编辑器 + 控制台 + AI助教面板
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { getCourseBundle, getPlanById } from '../../shared/course-catalog';
import { TopBar } from '../components/layout/TopBar';
import { ConceptCard } from '../components/learner/ConceptCard';
import { CodeEditor } from '../components/learner/CodeEditor';
import { Console } from '../components/learner/Console';
import { AiPanel } from '../components/learner/AiPanel';
import { theme } from '../theme';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import { useUIStore } from '../stores/uiStore';
import { validateLessonOutput, type LessonValidationResult } from '../utils/lessonValidation';
import { buildLessonCodeFilename } from '../utils/codeState';
import type { CourseId } from '../../shared/course-catalog';
import { buildLearnPath } from '../../shared/course-catalog';

function displayCodeFilename(courseId: CourseId, sectionId?: string): string {
  const extension = courseId === 'python' ? 'py' : 'ts';
  return sectionId ? `${courseId}-section-${sectionId}.${extension}` : `untitled.${extension}`;
}

function buildExampleInsertion(example: string, language: 'typescript' | 'python'): string {
  const commentPrefix = language === 'python' ? '#' : '//';
  return `${commentPrefix} AI 助教示例：请先理解思路，再自己改写，不要直接当作作业答案提交\n${example.trim()}\n`;
}

export default function LearnPage() {
  const { courseId: routeCourseId, chapterId, sectionId } = useParams();
  const navigate = useNavigate();
  const courseId: CourseId = routeCourseId === 'python' ? 'python' : 'typescript';
  const course = getCourseBundle(courseId);
  const { userId } = useAuth();
  const { progress, completeSection } = useProgress(userId, courseId);
  const { aiPanelOpen, setAiPanelOpen } = useUIStore();
  const [aiEnabled, setAiEnabled] = useState(false);
  const [savedPlanId, setSavedPlanId] = useState<string | null>(null);
  const hasRunner = !!(window as any).snailAPI?.runner?.run;

  useEffect(() => {
    (window as any).snailAPI?.ai?.getConfig()
      .then((cfg: { enabled: boolean }) => setAiEnabled(cfg.enabled))
      .catch(() => {});
  }, []);

  // 加载用户保存的学习路线
  useEffect(() => {
    if (!userId) return;
    (window as any).snailAPI?.plan?.get()
      .then((plan: any) => { if (plan?.planId) setSavedPlanId(plan.planId); })
      .catch(() => {});
  }, [userId]);

  // 根据学习路线过滤章节
  const sidebarChapters = useMemo(() => {
    const plan = getPlanById(savedPlanId ?? undefined);
    if (plan && plan.courseId === courseId) {
      return course.data.chapters.slice(plan.chapterRange[0], plan.chapterRange[1] + 1);
    }
    return course.data.chapters; // 无计划时显示全部
  }, [course.data.chapters, savedPlanId, courseId]);

  const chapter = useMemo(
    () => course.data.chapters.find(c => c.id === chapterId),
    [chapterId, course],
  );
  const section = useMemo(
    () => chapter?.sections.find(s => s.id === sectionId),
    [chapter, sectionId],
  );

  const flatSections = useMemo(() => sidebarChapters.flatMap(c =>
    c.sections.map(s => ({ chapterId: c.id, sectionId: s.id })),
  ), [sidebarChapters]);

  // 前置小节由 course-metadata 生成（默认是上一节）。
  // 只在学生确实跳着学时提示，已完成或未登录都不打扰。
  const unmetPrerequisites = useMemo(() => {
    if (!section?.prerequisites?.length || !progress) return [];
    const completedSet = new Set(progress.completedSections);
    return section.prerequisites
      .filter(id => !completedSet.has(id))
      .map(id => {
        const owner = course.data.chapters.find(c => c.sections.some(item => item.id === id));
        const target = owner?.sections.find(item => item.id === id);
        return target && owner
          ? { sectionId: target.id, chapterId: owner.id, title: target.title }
          : null;
      })
      .filter((item): item is { sectionId: string; chapterId: string; title: string } => item !== null);
  }, [section, progress, course.data.chapters]);
  const currentIndex = flatSections.findIndex(
    s => s.chapterId === chapterId && s.sectionId === sectionId,
  );
  const prevSection = currentIndex > 0 ? flatSections[currentIndex - 1] : null;
  const nextSection = currentIndex < flatSections.length - 1 ? flatSections[currentIndex + 1] : null;
  const codeLanguage = course.editorLanguage;
  const defaultStarterCode = codeLanguage === 'python' ? '# 在这里写代码' : '// 在这里写代码';

  const [code, setCode] = useState(section?.starterCode || defaultStarterCode);
  const [result, setResult] = useState<any>(null);
  const [validation, setValidation] = useState<LessonValidationResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [saveState, setSaveState] = useState('');

  useEffect(() => {
    let cancelled = false;
    setResult(null);
    setValidation(null);
    setCompleted(false);
    setSaveState('');

    async function loadCode() {
      const starter = section?.starterCode || defaultStarterCode;
      if (!userId || !sectionId || !(window as any).snailAPI?.runner?.load) {
        setCode(starter);
        return;
      }

      try {
        const saved = await (window as any).snailAPI.runner.load(
          buildLessonCodeFilename(courseId, sectionId, section?.starterCode),
        );
        if (!cancelled) setCode(saved?.content ?? starter);
      } catch {
        if (!cancelled) setCode(starter);
      }
    }

    loadCode();
    return () => { cancelled = true; };
  }, [courseId, defaultStarterCode, userId, sectionId, section?.starterCode]);

  useEffect(() => {
    if (sectionId && progress?.completedSections.includes(sectionId)) {
      setCompleted(true);
    }
  }, [sectionId, progress]);

  useEffect(() => {
    if (!userId || !sectionId || !(window as any).snailAPI?.runner?.save) return;
    const timer = window.setTimeout(() => {
      (window as any).snailAPI.runner.save(
        buildLessonCodeFilename(courseId, sectionId, section?.starterCode),
        code,
      )
        .then(() => setSaveState('已保存'))
        .catch(() => setSaveState('保存失败'));
    }, 700);
    return () => window.clearTimeout(timer);
  }, [code, courseId, section?.starterCode, sectionId, userId]);

  const handleRun = useCallback(async () => {
    if (!hasRunner) {
      setResult({
        success: false,
        output: '',
        error: `当前是在浏览器预览环境，不能执行本地${course.label}代码。请使用 Electron 桌面窗口测试运行功能。`,
        executionTimeMs: 0,
      });
      return;
    }

    setIsRunning(true);
    setValidation(null);
    try {
      if (userId && sectionId) {
        await (window as any).snailAPI.runner.save(
          buildLessonCodeFilename(courseId, sectionId, section?.starterCode),
          code,
        ).catch(() => {});
      }
      const res = await (window as any).snailAPI.runner.run(code, codeLanguage);
      setResult(res);
      if (res.success && section) {
        const checked = validateLessonOutput(section, res.output ?? '', code);
        setValidation(checked);
        if (checked.passed) {
          setCompleted(true);
          if (sectionId && userId) {
            await completeSection(sectionId).catch(e => console.error('进度保存失败:', e));
          }
        }
      }
    } finally {
      setIsRunning(false);
    }
  }, [hasRunner, course, courseId, code, codeLanguage, sectionId, section, userId, completeSection]);

  const handlePrev = () => prevSection && navigate(buildLearnPath(courseId, prevSection.chapterId, prevSection.sectionId));
  const handleNext = () => nextSection && navigate(buildLearnPath(courseId, nextSection.chapterId, nextSection.sectionId));
  const handleInsertExample = useCallback((example: string) => {
    setCode(prev => `${prev.trimEnd()}\n\n${buildExampleInsertion(example, codeLanguage)}`);
    setSaveState('已插入示例');
  }, [codeLanguage]);

  if (!chapter || !section) {
    return (
      <div style={{ padding: 40, background: theme.colors.bg, color: theme.colors.text }}>
        课程数据加载失败{' '}
        <span
          style={{ color: theme.colors.accent, cursor: 'pointer' }}
          onClick={() => navigate('/')}>
          返回首页
        </span>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      background: `radial-gradient(circle at 38% 0%, rgba(100,210,255,0.12), transparent 28%), ${theme.colors.bg}`,
    }}>
      <Sidebar courseId={courseId} chapters={sidebarChapters} progress={progress} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar courseId={courseId} />

        {!hasRunner && (
          <div style={{ background: theme.colors.error + '14', color: theme.colors.error, borderBottom: '1px solid ' + theme.colors.error + '55', padding: '8px 16px', fontSize: 12 }}>
            当前是浏览器预览环境，只能看界面；运行代码请在 Electron 桌面窗口中测试。
          </div>
        )}

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <div style={{ flex: 1, overflow: 'auto', padding: theme.spacing(2), minWidth: 0 }}>
            <ConceptCard
              title={section.title}
              content={section.content}
              hasPrev={!!prevSection}
              hasNext={!!nextSection}
              completed={completed}
              difficulty={section.difficulty}
              estimatedMinutes={section.estimatedMinutes}
              unmetPrerequisites={unmetPrerequisites}
              onJumpToPrerequisite={(chId, sId) => navigate(buildLearnPath(courseId, chId, sId))}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          </div>

          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            borderLeft: '1px solid ' + theme.colors.border, minWidth: 0,
          }}>
            <div style={{ height: 34, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', color: theme.colors.textDim, fontSize: 12, borderBottom: '1px solid ' + theme.colors.border }}>
              <span>{displayCodeFilename(courseId, sectionId)}</span>
              <span>{saveState}</span>
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <CodeEditor value={code} onChange={setCode} language={codeLanguage} />
            </div>
            <Console
              result={result}
              isRunning={isRunning}
              onRun={handleRun}
              expectedOutput={validation?.expectedHint ?? section.expectedOutput}
              completed={completed}
              validationMessage={validation?.message}
              validationPassed={validation?.passed}
              validationStatus={validation?.status}
              validationDetails={validation?.details}
            />
          </div>

          {aiPanelOpen && (
            <AiPanel
              userId={userId}
              chapterId={chapterId}
              sectionId={sectionId}
              currentCode={code}
              codeLanguage={codeLanguage}
              sectionTitle={section.title}
              courseHint={section.hint}
              aiEnabled={aiEnabled}
              onInsertExample={handleInsertExample}
              onClose={() => setAiPanelOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
