// 实战项目页 — 展示 12 个教学项目（6 TS + 6 Python）
// 点击进入 ProjectIDE 实战环境
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../theme';
import { SegmentedControl } from '../components/common/SegmentedControl';
import { useThemeMode } from '../hooks/useThemeMode';
import { getProjectsByCourse } from '../../shared/projects-data';
import type { CourseId } from '../../shared/course-catalog';
import type { ProjectLevel } from '../../shared/projects-data';

const levelLabel: Record<ProjectLevel, string> = { entry: '入门', intermediate: '进阶', expert: '高手' };
const levelColor: Record<ProjectLevel, string> = { entry: '#3FB950', intermediate: '#58A6FF', expert: '#F0A050' };

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { mode, setMode } = useThemeMode();
  const [language, setLanguage] = useState<CourseId>('typescript');

  const projects = getProjectsByCourse(language);

  return (
    <div style={{
      height: '100%',
      background: `radial-gradient(circle at 80% 10%, rgba(100,210,255,0.12), transparent 28%), radial-gradient(circle at 20% 0%, rgba(120,120,255,0.08), transparent 24%), ${theme.colors.bg}`,
      color: theme.colors.text,
      overflowY: 'auto',
    }}>
      <header style={{
        minHeight: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 14,
        padding: '10px 28px',
        borderBottom: '1px solid ' + theme.colors.border,
        background: theme.colors.bgSidebar,
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => navigate('/')} style={{
            background: 'transparent',
            border: '1px solid ' + theme.colors.border,
            color: theme.colors.text,
            borderRadius: 999,
            padding: '7px 12px',
            cursor: 'pointer',
          }}>
            返回首页
          </button>
          <strong style={{ color: theme.colors.textBright, fontSize: 16 }}>🛠️ 实战项目</strong>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SegmentedControl
            value={language}
            onChange={setLanguage as any}
            options={[
              { value: 'typescript', label: 'TypeScript' },
              { value: 'python', label: 'Python' },
            ]}
          />
          <SegmentedControl
            value={mode}
            onChange={setMode}
            options={[
              { value: 'auto', label: '自动' },
              { value: 'light', label: '浅色' },
              { value: 'dark', label: '深色' },
            ]}
          />
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '42px 28px 72px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ color: theme.colors.accent, letterSpacing: 2, fontSize: 12, fontWeight: 800 }}>
            HANDS-ON PROJECTS
          </div>
          <h1 style={{ color: theme.colors.textBright, fontSize: 32, margin: '10px 0 0' }}>
            把知识变成可运行的作品
          </h1>
          <p style={{ color: theme.colors.textDim, lineHeight: 1.8, marginTop: 10, maxWidth: 760 }}>
            每个项目都是独立的文件夹，包含多文件模板、里程碑提示和 AI 教学辅助。
            选择语言开始实战，在 IDE 环境中边学边写。
          </p>
        </div>

        {/* 项目卡片网格 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 16,
        }}>
          {projects.map(project => (
            <button
              key={project.id}
              onClick={() => navigate(`/projects/${project.courseId}/${project.id}`)}
              style={{
                textAlign: 'left',
                background: 'color-mix(in srgb, var(--bg-card) 92%, transparent)',
                border: '1px solid ' + theme.colors.border,
                borderRadius: 18,
                padding: 20,
                cursor: 'pointer',
                color: theme.colors.text,
                transition: 'border-color 0.15s, box-shadow 0.15s',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = theme.colors.accent;
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = theme.colors.border;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* 顶部标签行 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 22 }}>{project.icon}</span>
                <span style={{
                  padding: '3px 10px',
                  borderRadius: 999,
                  background: levelColor[project.level] + '18',
                  color: levelColor[project.level],
                  fontSize: 11,
                  fontWeight: 700,
                }}>
                  {levelLabel[project.level]}
                </span>
              </div>

              {/* 标题 */}
              <strong style={{ color: theme.colors.textBright, fontSize: 17, lineHeight: 1.35 }}>
                {project.title}
              </strong>
              <span style={{ color: theme.colors.textDim, fontSize: 12.5, lineHeight: 1.55 }}>
                {project.subtitle}
              </span>

              {/* 标签 */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '3px 8px',
                    borderRadius: 6,
                    background: 'var(--glass)',
                    color: theme.colors.textDim,
                    fontSize: 11,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* 文件数 */}
              <div style={{ color: theme.colors.textDim, fontSize: 11, marginTop: 'auto' }}>
                📁 {project.files.length} 个文件 · {project.milestones.length} 个里程碑
              </div>
            </button>
          ))}
        </div>

        {/* 教学说明 */}
        <div style={{
          marginTop: 36,
          padding: 20,
          borderRadius: 14,
          background: 'var(--glass)',
          border: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 18,
        }}>
          <div>
            <div style={{ color: theme.colors.accent, fontSize: 11, fontWeight: 800, marginBottom: 6 }}>📖 文件模板</div>
            <p style={{ color: theme.colors.textDim, fontSize: 12, lineHeight: 1.7 }}>
              每个项目预置多文件模板（代码、配置、说明），模拟真实的项目结构。
            </p>
          </div>
          <div>
            <div style={{ color: theme.colors.accent, fontSize: 11, fontWeight: 800, marginBottom: 6 }}>🎯 里程碑驱动</div>
            <p style={{ color: theme.colors.textDim, fontSize: 12, lineHeight: 1.7 }}>
              每个项目拆分为 3-4 个里程碑，逐步完成，进度清晰可见。
            </p>
          </div>
          <div>
            <div style={{ color: theme.colors.accent, fontSize: 11, fontWeight: 800, marginBottom: 6 }}>🐌 AI 教学</div>
            <p style={{ color: theme.colors.textDim, fontSize: 12, lineHeight: 1.7 }}>
              AI 助教以解释和提示为主，鼓励你自己写代码，而不是直接给出答案。
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
