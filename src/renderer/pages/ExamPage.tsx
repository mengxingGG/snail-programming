// M10: 考试页
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChoiceQuestion } from '../components/exam/ChoiceQuestion';
import { FillQuestion } from '../components/exam/FillQuestion';
import { CodeQuestion } from '../components/exam/CodeQuestion';
import { theme } from '../theme';
import type { CourseId } from '../../shared/course-catalog';
import { getCourseBundle } from '../../shared/course-catalog';

interface Question {
  id: string;
  type: 'choice' | 'fill' | 'code';
  text: string;
  options?: string[];
  starterCode?: string;
}

export default function ExamPage() {
  const { courseId: routeCourseId, chapterId } = useParams();
  const courseId: CourseId = routeCourseId === 'python' ? 'python' : 'typescript';
  const course = getCourseBundle(courseId);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError('');
    (window as any).snailAPI.exam.getQuestions(courseId, chapterId ?? '')
      .then((items: Question[]) => {
        setQuestions(items);
        setAnswers(Object.fromEntries(
          items.filter(q => q.type === 'code' && q.starterCode).map(q => [q.id, q.starterCode || '']),
        ));
      })
      .catch(() => setError('加载考题失败'))
      .finally(() => setIsLoading(false));
  }, [chapterId, courseId]);

  const answeredCount = questions.filter(q => answers[q.id]?.trim()).length;

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setError('');
  };

  const handleSubmit = async () => {
    const unansweredCount = questions.length - answeredCount;
    if (unansweredCount > 0) {
      setError(`还有 ${unansweredCount} 道题未完成，请检查后再提交`);
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      const res = await (window as any).snailAPI.exam.submit({ courseId, answers, chapterId: chapterId ?? '' });
      setScore(res.score);
      setSubmitted(true);
    } catch {
      setError('提交失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: theme.colors.bg, color: theme.colors.textDim }}>
        正在准备测验...
      </div>
    );
  }

  return (
    <div style={{
      height: '100%',
      background: `radial-gradient(circle at 10% 0%, ${theme.colors.accent}18, transparent 30%), ${theme.colors.bg}`,
      color: theme.colors.text,
      overflowY: 'auto',
    }}>
      <header style={{
        height: 56,
        background: theme.colors.bgSidebar,
        borderBottom: '1px solid ' + theme.colors.border,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
      }}>
        <button onClick={() => navigate(-1)} style={{ background: 'transparent', border: '1px solid ' + theme.colors.border, color: theme.colors.text, borderRadius: 999, padding: '7px 12px', cursor: 'pointer' }}>
          返回学习
        </button>
        <span style={{ color: theme.colors.textDim, fontSize: 12 }}>已完成 {answeredCount} / {questions.length}</span>
      </header>

      <main style={{ maxWidth: 860, margin: '0 auto', padding: '34px 24px 48px' }}>
        <section style={{ background: theme.colors.bgCard, border: '1px solid ' + theme.colors.border, borderRadius: 24, padding: 28, boxShadow: '0 6px 18px rgba(0,0,0,0.14)' }}>
          <div style={{ color: theme.colors.accent, fontSize: 12, letterSpacing: 2, fontWeight: 800 }}>CHAPTER EXAM</div>
          <h1 style={{ color: theme.colors.textBright, margin: '10px 0 8px', fontSize: 30 }}>{course.label} 章节测验 · {chapterId}</h1>
          <p style={{ color: theme.colors.textDim, margin: 0, lineHeight: 1.8 }}>
            完成所有题目后提交，70 分及格。填空题不区分大小写，提交前可以随时修改答案。
          </p>
        </section>

        {error && (
          <div style={{ marginTop: 18, background: theme.colors.error + '14', border: '1px solid ' + theme.colors.error + '55', color: theme.colors.error, borderRadius: 14, padding: '12px 16px' }}>
            {error}
          </div>
        )}

        {submitted ? (
          <section style={{ textAlign: 'center', marginTop: 24, background: theme.colors.bgCard, border: '1px solid ' + theme.colors.border, borderRadius: 24, padding: 36 }}>
            <div style={{ fontSize: 56, fontWeight: 900, color: score !== null && score >= 70 ? theme.colors.success : theme.colors.error }}>
              {score}
            </div>
            <p style={{ color: theme.colors.textBright, fontSize: 20, fontWeight: 800 }}>
              {score !== null && score >= 70 ? '通过测验' : '还需练习，70 分及格'}
            </p>
            <button onClick={() => navigate(-1)} style={{ marginTop: 12, padding: '10px 22px', background: theme.colors.accent, color: '#1b1208', border: 'none', borderRadius: 999, cursor: 'pointer', fontWeight: 800 }}>
              返回学习
            </button>
          </section>
        ) : questions.length === 0 ? (
          <section style={{ marginTop: 24, background: theme.colors.bgCard, border: '1px solid ' + theme.colors.border, borderRadius: 24, padding: 32, textAlign: 'center' }}>
            <h2 style={{ color: theme.colors.textBright }}>当前章节暂无考题</h2>
            <p style={{ color: theme.colors.textDim }}>请继续学习课程内容，后续章节会提供测验。</p>
          </section>
        ) : (
          <>
            <div style={{ marginTop: 20, display: 'grid', gap: 16 }}>
              {questions.map((q, index) => (
                <section key={q.id} style={{ background: theme.colors.bgCard, border: '1px solid ' + theme.colors.border, borderRadius: 20, padding: 22 }}>
                  <div style={{ color: theme.colors.textDim, fontSize: 12, marginBottom: 10 }}>第 {index + 1} 题 · {q.type === 'choice' ? '选择题' : q.type === 'fill' ? '填空题' : '编程题'}</div>
                  {q.type === 'choice' && q.options ? (
                    <ChoiceQuestion question={{ ...q, options: q.options }} selected={answers[q.id] || ''} onChange={v => handleAnswerChange(q.id, v)} />
                  ) : q.type === 'fill' ? (
                    <FillQuestion question={q} value={answers[q.id] || ''} onChange={v => handleAnswerChange(q.id, v)} />
                  ) : (
                    <CodeQuestion question={{ ...q, starterCode: q.starterCode || '' }} value={answers[q.id] || ''} onChange={v => handleAnswerChange(q.id, v)} language={course.editorLanguage} />
                  )}
                </section>
              ))}
            </div>

            <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid ' + theme.colors.border, display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={handleSubmit} disabled={isSubmitting} style={{
                padding: '12px 28px',
                background: isSubmitting ? theme.colors.border : `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentHover})`,
                color: isSubmitting ? theme.colors.textDim : '#1b1208',
                border: 'none',
                borderRadius: 999,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                fontWeight: 900,
                boxShadow: `0 6px 14px ${theme.colors.accent}18`,
              }}>
                {isSubmitting ? '提交中...' : '提交答案'}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
