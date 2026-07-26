// 路由配置 — 所有页面懒加载
import React, { Suspense } from 'react';
import { createHashRouter, Navigate, useLocation, useNavigate, useRouteError } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

const CourseMap = React.lazy(() => import('./pages/CourseMap'));
const LearnPage = React.lazy(() => import('./pages/LearnPage'));
const ExamPage = React.lazy(() => import('./pages/ExamPage'));
const AccountPage = React.lazy(() => import('./pages/AccountPage'));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage'));
const ProjectIDE = React.lazy(() => import('./pages/ProjectIDE'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));

function Loading() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100%', background: '#1a1e2b', color: '#7a8296',
    }}>
      加载中...
    </div>
  );
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isLoading, isLoggedIn } = useAuth();
  const location = useLocation();

  if (isLoading) return <Loading />;
  if (!isLoggedIn) return <Navigate to="/account" replace state={{ from: location.pathname }} />;
  return <>{children}</>;
}

function RouteError() {
  const navigate = useNavigate();
  const error = useRouteError() as Error;

  return (
    <div style={{
      minHeight: '100%',
      background: 'radial-gradient(circle at 20% 10%, rgba(240,160,80,0.15), transparent 30%), #1a1e2b',
      color: '#d4d8e0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <section style={{
        width: 'min(560px, 100%)',
        background: '#252b3b',
        border: '1px solid #2e3440',
        borderRadius: 20,
        padding: 28,
        boxShadow: '0 6px 18px rgba(0,0,0,0.14)',
      }}>
        <div style={{ color: '#f0a050', fontSize: 12, letterSpacing: 2, fontWeight: 800 }}>页面加载失败</div>
        <h1 style={{ margin: '10px 0', color: '#fff', fontSize: 26 }}>这个页面刚刚没有成功打开</h1>
        <p style={{ color: '#7a8296', lineHeight: 1.8 }}>
          请先返回首页继续测试。如果你看到数据库或模块加载错误，把当前操作路径告诉我，我会继续修。
        </p>
        {error?.message && (
          <pre style={{
            marginTop: 14,
            padding: 12,
            borderRadius: 12,
            background: '#1e2233',
            color: '#ef5350',
            whiteSpace: 'pre-wrap',
            fontSize: 12,
          }}>
            {error.message}
          </pre>
        )}
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: 18,
            background: '#f0a050',
            color: '#1b1208',
            border: 'none',
            borderRadius: 999,
            padding: '10px 18px',
            cursor: 'pointer',
            fontWeight: 800,
          }}
        >
          返回首页
        </button>
      </section>
    </div>
  );
}

function Wrap({ children, auth = false }: { children: React.ReactNode; auth?: boolean }) {
  const content = <Suspense fallback={<Loading />}>{children}</Suspense>;
  return auth ? <RequireAuth>{content}</RequireAuth> : content;
}

export const router = createHashRouter([
  { path: '/',                             element: <Wrap auth><CourseMap /></Wrap>, errorElement: <RouteError /> },
  { path: '/learn/:courseId/:chapterId/:sectionId',  element: <Wrap auth><LearnPage /></Wrap>, errorElement: <RouteError /> },
  { path: '/learn/:chapterId/:sectionId',            element: <Navigate to="/" replace />, errorElement: <RouteError /> },
  { path: '/exam/:courseId/:chapterId',              element: <Wrap auth><ExamPage /></Wrap>, errorElement: <RouteError /> },
  { path: '/exam/:chapterId',                        element: <Navigate to="/" replace />, errorElement: <RouteError /> },
  { path: '/account',                      element: <Wrap><AccountPage /></Wrap>, errorElement: <RouteError /> },
  { path: '/projects',                     element: <Wrap auth><ProjectsPage /></Wrap>, errorElement: <RouteError /> },
  { path: '/projects/:courseId/:projectId', element: <Wrap auth><ProjectIDE /></Wrap>, errorElement: <RouteError /> },
  { path: '/settings',                     element: <Wrap auth><SettingsPage /></Wrap>, errorElement: <RouteError /> },
]);
