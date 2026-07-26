// M08: 侧边栏章节导航
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { theme } from '../../theme';
import type { Chapter, CourseProgress } from '../../../shared/types/course';
import type { CourseId } from '../../../shared/course-catalog';
import { buildLearnPath, getCourseBundle } from '../../../shared/course-catalog';

type SectionStatus = 'pending' | 'completed' | 'current';

interface SidebarProps {
  courseId: CourseId;
  chapters: Chapter[];
  progress: CourseProgress | null;
  onSelectSection?: (chapterId: string, sectionId: string) => void;
}

export function Sidebar({ courseId, chapters, progress }: SidebarProps) {
  const navigate = useNavigate();
  const { chapterId, sectionId, courseId: routeCourseId } = useParams();
  const course = getCourseBundle(courseId);

  const handleSelect = (chId: string, sId: string) => {
    navigate(buildLearnPath(courseId, chId, sId));
  };

  return (
    <aside style={{
      width: 276,
      background: theme.colors.bgSidebar,
      overflowY: 'auto',
      borderRight: '1px solid ' + theme.colors.border,
      boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.03)',
    }}>
      <div style={{ padding: '22px 18px 16px' }}>
        <div style={{ color: theme.colors.accent, fontSize: 10.5, fontWeight: 900, letterSpacing: 2.4 }}>SNAIL</div>
        <h2 style={{ color: theme.colors.textBright, fontSize: 20, lineHeight: 1.2, marginTop: 6, fontWeight: 760 }}>蜗牛编程</h2>
        <p style={{ color: theme.colors.textDim, fontSize: 11.5, marginTop: 8 }}>{course.appLabel}</p>
      </div>
      {chapters.length === 0 ? (
        <div style={{ padding: theme.spacing(2), color: theme.colors.textDim, textAlign: 'center' }}>
          暂无课程数据
        </div>
      ) : (
        <nav style={{ padding: '0 10px 18px' }}>
          {chapters.map(ch => {
            const isActiveChapter = routeCourseId === courseId && chapterId === ch.id;
            const completedSections = progress?.completedSections || [];
            return (
              <ChapterItem
                key={ch.id}
                chapter={ch}
                activeChapter={isActiveChapter}
                activeSection={sectionId}
                completedSections={completedSections}
                onSelectSection={handleSelect}
              />
            );
          })}
        </nav>
      )}
    </aside>
  );
}

interface ChapterItemProps {
  chapter: Chapter;
  activeChapter: boolean;
  activeSection?: string;
  completedSections: string[];
  onSelectSection: (chapterId: string, sectionId: string) => void;
}

function ChapterItem({ chapter, activeChapter, activeSection, completedSections, onSelectSection }: ChapterItemProps) {
  const [expanded, setExpanded] = useState(activeChapter);

  return (
    <div style={{ marginBottom: 6 }}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '10px 10px',
          cursor: 'pointer',
          background: activeChapter ? theme.colors.glassStrong : 'transparent',
          border: '1px solid ' + (activeChapter ? 'rgba(100,210,255,0.22)' : 'transparent'),
          borderRadius: 14,
          color: activeChapter ? theme.colors.textBright : theme.colors.text,
          fontWeight: activeChapter ? 720 : 560,
          fontSize: 12.5,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        title={chapter.title}
      >
        <span style={{ color: activeChapter ? theme.colors.accent : theme.colors.textDim, marginRight: 8 }}>{expanded ? '⌄' : '›'}</span>
        {chapter.title}
      </div>
      {expanded && chapter.sections.map(s => {
        const status: SectionStatus = activeSection === s.id
          ? 'current'
          : completedSections.includes(s.id)
            ? 'completed'
            : 'pending';
        return (
          <SectionItem
            key={s.id}
            section={s}
            status={status}
            onClick={() => onSelectSection(chapter.id, s.id)}
          />
        );
      })}
    </div>
  );
}

interface SectionItemProps {
  section: { id: string; title: string };
  status: SectionStatus;
  onClick: () => void;
}

function SectionItem({ section, status, onClick }: SectionItemProps) {
  const isCurrent = status === 'current';
  const isCompleted = status === 'completed';

  return (
    <div
      onClick={onClick}
      style={{
        margin: '4px 0 4px 12px',
        padding: '7px 10px 7px 16px',
        cursor: 'pointer',
        fontSize: 11.5,
        color: isCurrent ? theme.colors.accent : theme.colors.textDim,
        background: isCurrent ? 'rgba(100,210,255,0.105)' : 'transparent',
        border: '1px solid ' + (isCurrent ? 'rgba(100,210,255,0.18)' : 'transparent'),
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
      title={section.title}
      onMouseEnter={e => { if (!isCurrent) (e.currentTarget.style.background = 'rgba(255,255,255,0.04)'); }}
      onMouseLeave={e => { if (!isCurrent) (e.currentTarget.style.background = 'transparent'); }}
    >
      <span style={{ color: isCurrent ? theme.colors.accent : isCompleted ? theme.colors.success : 'rgba(255,255,255,0.16)', width: 12 }}>
        {isCurrent ? '●' : isCompleted ? '✓' : '·'}
      </span>
      <span>{section.title}</span>
    </div>
  );
}
