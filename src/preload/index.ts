// 预加载桥接 — 暴露安全 API 给渲染进程
import { contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNELS } from '../shared/types/ipc';
import type { AiLessonContext, AiMessage } from '../services/ai/client';
import type { CourseId } from '../shared/course-catalog';

const api = {
  auth: {
    register: (username: string, password: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.AUTH_REGISTER, { username, password }),
    login: (username: string, password: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.AUTH_LOGIN, { username, password }),
    logout: (token: string) => ipcRenderer.invoke(IPC_CHANNELS.AUTH_LOGOUT, { token }),
    getSession: (token: string) => ipcRenderer.invoke(IPC_CHANNELS.AUTH_GET_SESSION, { token }),
  },
  // 以下接口作用于「当前登录用户」，userId 由主进程按会话解析，渲染层无需也无法指定
  profile: {
    get: () => ipcRenderer.invoke(IPC_CHANNELS.PROFILE_GET),
    save: (nickname: string) => ipcRenderer.invoke(IPC_CHANNELS.PROFILE_SAVE, { nickname }),
  },
  plan: {
    get: () => ipcRenderer.invoke(IPC_CHANNELS.PLAN_GET),
    save: (payload: { planId: string; startChapterId: string; startSectionId: string }) =>
      ipcRenderer.invoke(IPC_CHANNELS.PLAN_SAVE, payload),
  },
  progress: {
    save: (data: unknown) => ipcRenderer.invoke(IPC_CHANNELS.PROGRESS_SAVE, data),
    load: (courseId: CourseId) => ipcRenderer.invoke(IPC_CHANNELS.PROGRESS_LOAD, { courseId }),
    completeSection: (sectionId: string, courseId: CourseId) =>
      ipcRenderer.invoke(IPC_CHANNELS.PROGRESS_COMPLETE_SECTION, { sectionId, courseId }),
  },
  runner: {
    run: (code: string, language?: 'typescript' | 'python') => ipcRenderer.invoke(IPC_CHANNELS.CODE_RUN, { code, language }),
    save: (filename: string, code: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.CODE_SAVE, { filename, code }),
    load: (filename: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.CODE_LOAD, { filename }),
    list: () => ipcRenderer.invoke(IPC_CHANNELS.CODE_LIST),
  },
  exam: {
    submit: (payload: { courseId: CourseId; chapterId: string; answers: Record<string, string> }) =>
      ipcRenderer.invoke(IPC_CHANNELS.EXAM_SUBMIT, payload),
    getQuestions: (courseId: CourseId, chapterId: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.EXAM_GET_QUESTIONS, { courseId, chapterId }),
  },
  ai: {
    getConfig: () =>
      ipcRenderer.invoke(IPC_CHANNELS.AI_GET_CONFIG),
    saveConfig: (cfg: { baseUrl: string; model: string; contextLength: number; enabled: boolean; newApiKey: string }) =>
      ipcRenderer.invoke(IPC_CHANNELS.AI_SAVE_CONFIG, cfg),
    chat: (messages: AiMessage[], context?: AiLessonContext) =>
      ipcRenderer.invoke(IPC_CHANNELS.AI_CHAT, { messages, context }),
    reviewCode: (code: string, sectionTitle: string, context: AiLessonContext) =>
      ipcRenderer.invoke(IPC_CHANNELS.AI_REVIEW_CODE, { code, sectionTitle, context }),
    getHint: (sectionTitle: string, courseHint: string | undefined, context: AiLessonContext) =>
      ipcRenderer.invoke(IPC_CHANNELS.AI_GET_HINT, { sectionTitle, courseHint, context }),
    explain: (concept: string, context: AiLessonContext) =>
      ipcRenderer.invoke(IPC_CHANNELS.AI_EXPLAIN, { concept, context }),
  },
  system: {
    // 交由主进程校验协议后再打开，避免 file:// 等协议被用来启动本地程序
    openExternal: (url: string) => ipcRenderer.invoke(IPC_CHANNELS.SYSTEM_OPEN_EXTERNAL, url),
  },
  window: {
    minimize: () => ipcRenderer.invoke(IPC_CHANNELS.WIN_MINIMIZE),
    maximize: () => ipcRenderer.invoke(IPC_CHANNELS.WIN_MAXIMIZE),
    close: () => ipcRenderer.invoke(IPC_CHANNELS.WIN_CLOSE),
    isMaximized: () => ipcRenderer.invoke(IPC_CHANNELS.WIN_IS_MAXIMIZED) as Promise<boolean>,
    onMaximizeChanged: (callback: (maximized: boolean) => void) => {
      const handler = (_event: unknown, maximized: boolean) => callback(maximized);
      ipcRenderer.on('win:maximize-changed', handler);
      return () => ipcRenderer.removeListener('win:maximize-changed', handler);
    },
  },
  project: {
    listFiles: (projectId: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.PROJECT_LIST_FILES, projectId),
    readFile: (projectId: string, filePath: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.PROJECT_READ_FILE, projectId, filePath),
    writeFile: (projectId: string, filePath: string, content: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.PROJECT_WRITE_FILE, projectId, filePath, content),
    exec: (projectId: string, command: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.PROJECT_EXEC, projectId, command),
    getPath: (projectId: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.PROJECT_GET_PATH, projectId),
    agent: {
      chat: (payload: {
        messages: { role: string; content: string }[];
        context: { projectId: string; projectTitle: string; projectDescription: string; activeFile: string; activeContent: string };
      }) => ipcRenderer.invoke('project-agent:chat', payload),
      tool: (payload: {
        projectId: string; projectTitle: string; projectDescription: string;
        activeFile: string; activeContent: string;
        toolCall: { id: string; type: string; function: { name: string; arguments: string } };
      }) => ipcRenderer.invoke('project-agent:tool', payload),
    },
  },
};

contextBridge.exposeInMainWorld('snailAPI', api);
