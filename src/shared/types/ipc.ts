// IPC 通道类型定义
export const IPC_CHANNELS = {
  AUTH_REGISTER: 'auth:register',
  AUTH_LOGIN: 'auth:login',
  AUTH_LOGOUT: 'auth:logout',
  AUTH_GET_SESSION: 'auth:get-session',
  PROFILE_GET: 'profile:get',
  PROFILE_SAVE: 'profile:save',
  PROGRESS_SAVE: 'progress:save',
  PROGRESS_LOAD: 'progress:load',
  PROGRESS_COMPLETE_SECTION: 'progress:complete-section',
  PLAN_GET: 'plan:get',
  PLAN_SAVE: 'plan:save',
  CODE_RUN: 'code:run',
  CODE_SAVE: 'code:save',
  CODE_LOAD: 'code:load',
  CODE_LIST: 'code:list',
  EXAM_SUBMIT: 'exam:submit',
  EXAM_GET_QUESTIONS: 'exam:get-questions',
  AI_GET_CONFIG: 'ai:get-config',
  AI_SAVE_CONFIG: 'ai:save-config',
  AI_CHAT: 'ai:chat',
  AI_REVIEW_CODE: 'ai:review-code',
  AI_GET_HINT: 'ai:get-hint',
  AI_EXPLAIN: 'ai:explain',
  // 窗口控制
  WIN_MINIMIZE: 'win:minimize',
  WIN_MAXIMIZE: 'win:maximize',
  WIN_CLOSE: 'win:close',
  WIN_IS_MAXIMIZED: 'win:is-maximized',
  // 系统
  SYSTEM_OPEN_EXTERNAL: 'system:open-external',
  // 项目操作
  PROJECT_LIST_FILES: 'project:list-files',
  PROJECT_READ_FILE: 'project:read-file',
  PROJECT_WRITE_FILE: 'project:write-file',
  PROJECT_EXEC: 'project:exec',
  PROJECT_GET_PATH: 'project:get-path',
} as const;

export interface IpcRequest {
  channel: string;
  data?: unknown;
}
export interface IpcResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
