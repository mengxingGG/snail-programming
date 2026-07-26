// M12: AI 助教服务 — OpenAI 兼容 HTTP 客户端
// 只读学生数据，不写编辑器。未来版本可扩展编辑权限。

import fs from 'fs';
import path from 'path';
import { app, ipcMain } from 'electron';
import { buildTutorSystemPrompt, type AiLessonContext, type AiMemorySnapshot } from './prompts';
import { isSafeExternalUrl } from '../../shared/url-safety';
import { getActiveUserId } from '../auth/session';
import {
  decodeApiKey,
  encodeApiKey,
  hasLegacyPlaintext,
  isEncryptionAvailable,
  type StoredKeyFields,
} from './key-store';

// ─── 类型 ────────────────────────────────────────────────

export interface AiConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
  contextLength: number;  // 模型最大 token 数（含输入+输出）
  enabled: boolean;
}

export interface AiMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export type { AiLessonContext } from './prompts';

// 渲染层看到的安全配置（不含明文 key）
export interface AiConfigPublic extends Omit<AiConfig, 'apiKey'> {
  apiKeySet: boolean;
  /** 密钥是否由系统钥匙串加密保存，用于在设置页如实告知用户 */
  apiKeyEncrypted: boolean;
}

// ─── 配置 ────────────────────────────────────────────────

const DEFAULT_CONFIG: AiConfig = {
  baseUrl: 'https://api.openai.com/v1',
  apiKey: '',
  model: 'gpt-4o-mini',
  contextLength: 8192,
  enabled: false,
};

let currentConfig: AiConfig = { ...DEFAULT_CONFIG };
let lastRequestTime = 0;

/** 校验并规范化 API 地址：只允许 http/https，去掉结尾斜杠 */
export function normalizeBaseUrl(baseUrl: unknown): string {
  const value = typeof baseUrl === 'string' ? baseUrl.trim() : '';
  if (!value) return DEFAULT_CONFIG.baseUrl;
  if (!isSafeExternalUrl(value)) {
    throw new Error('API 地址必须以 http:// 或 https:// 开头');
  }
  return value.replace(/\/+$/, '');
}

/** 拼接 chat/completions 端点，容忍 baseUrl 结尾多余的斜杠 */
export function buildChatEndpoint(baseUrl: string): string {
  return `${baseUrl.replace(/\/+$/, '')}/chat/completions`;
}

interface MemoryEntry {
  text: string;
  updatedAt: string;
}

interface SectionMemory {
  title: string;
  lastQuestion: string;
  lastAssistantTip: string;
  updatedAt: string;
}

interface UserMemory {
  recentQuestions: MemoryEntry[];
  recentSections: string[];
  sectionNotes: Record<string, SectionMemory>;
  updatedAt: string;
}

interface MemoryStore {
  users: Record<string, UserMemory>;
}

function getConfigPath(): string {
  return path.join(app.getPath('userData'), 'ai-config.json');
}

function getMemoryPath(): string {
  return path.join(app.getPath('userData'), 'ai-memory.json');
}

function createEmptyUserMemory(): UserMemory {
  return {
    recentQuestions: [],
    recentSections: [],
    sectionNotes: {},
    updatedAt: new Date().toISOString(),
  };
}

function loadMemoryStore(): MemoryStore {
  try {
    const raw = fs.readFileSync(getMemoryPath(), 'utf-8');
    const parsed = JSON.parse(raw) as MemoryStore;
    return parsed?.users ? parsed : { users: {} };
  } catch {
    return { users: {} };
  }
}

function persistMemoryStore(store: MemoryStore): void {
  fs.writeFileSync(getMemoryPath(), JSON.stringify(store, null, 2), 'utf-8');
}

export function loadConfig(): void {
  try {
    const raw = fs.readFileSync(getConfigPath(), 'utf-8');
    const parsed = JSON.parse(raw) as Partial<AiConfig> & StoredKeyFields;
    const merged: AiConfig = {
      ...DEFAULT_CONFIG,
      ...parsed,
      apiKey: decodeApiKey(parsed),
    };
    // 配置文件可能被手工改过，这里再兜一次协议校验
    merged.baseUrl = normalizeBaseUrl(merged.baseUrl);
    currentConfig = merged;

    // 发现旧版明文密钥，立刻重写为密文
    if (hasLegacyPlaintext(parsed) && isEncryptionAvailable()) {
      persistConfig(merged);
    }
  } catch {
    currentConfig = { ...DEFAULT_CONFIG };
  }
}

export function getConfig(): AiConfig {
  return currentConfig;
}

function persistConfig(config: AiConfig): void {
  currentConfig = config;

  // apiKey 不直接落盘，改存 safeStorage 密文
  const { apiKey, ...rest } = config;
  const payload = { ...rest, ...encodeApiKey(apiKey) };
  fs.writeFileSync(getConfigPath(), JSON.stringify(payload, null, 2), 'utf-8');
}

function getMemoryUserKey(userId?: string | null): string {
  return userId?.trim() || 'anonymous';
}

/**
 * AI 记忆按用户分桶，桶名必须来自主进程会话。
 * 否则渲染层传一个别人的 userId 就能读到他人的提问历史。
 */
function withSessionUser<T extends AiLessonContext>(context: T): T {
  return { ...context, userId: getActiveUserId() ?? undefined };
}

function getSectionMemoryKey(context: AiLessonContext): string {
  return `${context.chapterId ?? 'unknown'}:${context.sectionId ?? 'unknown'}`;
}

function sanitizeMemoryText(text: string, maxLength = 120): string {
  return text
    .replace(/```[\s\S]*?```/g, '[代码示例]')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function buildMemorySnapshot(context: AiLessonContext): AiMemorySnapshot {
  const store = loadMemoryStore();
  const userMemory = store.users[getMemoryUserKey(context.userId)] ?? createEmptyUserMemory();
  const section = userMemory.sectionNotes[getSectionMemoryKey(context)];
  return {
    recentQuestions: userMemory.recentQuestions.slice(-4).map(entry => entry.text),
    recentSections: userMemory.recentSections.slice(-4),
    currentSectionNote: section
      ? `${section.title}，上次学生问的是：${section.lastQuestion}；你上次给出的方向是：${section.lastAssistantTip}`
      : undefined,
  };
}

function rememberInteraction(context: AiLessonContext, userText: string, assistantText: string): void {
  if (!userText.trim() || !assistantText.trim()) return;

  const store = loadMemoryStore();
  const userKey = getMemoryUserKey(context.userId);
  const now = new Date().toISOString();
  const userMemory = store.users[userKey] ?? createEmptyUserMemory();
  const sectionKey = getSectionMemoryKey(context);
  const sectionTitle = context.sectionTitle || '当前练习';

  userMemory.recentQuestions.push({
    text: sanitizeMemoryText(userText),
    updatedAt: now,
  });
  userMemory.recentQuestions = userMemory.recentQuestions.slice(-12);

  userMemory.recentSections = [
    ...userMemory.recentSections.filter(item => item !== sectionTitle),
    sectionTitle,
  ].slice(-8);

  userMemory.sectionNotes[sectionKey] = {
    title: sectionTitle,
    lastQuestion: sanitizeMemoryText(userText),
    lastAssistantTip: sanitizeMemoryText(assistantText),
    updatedAt: now,
  };
  userMemory.updatedAt = now;
  store.users[userKey] = userMemory;
  persistMemoryStore(store);
}

function withTutorContext(
  messages: AiMessage[],
  context: AiLessonContext,
  mode: 'chat' | 'review' | 'hint' | 'explain',
): AiMessage[] {
  const history = messages.filter(message => message.role !== 'system');
  const prompt = buildTutorSystemPrompt(mode, context, buildMemorySnapshot(context));
  return [{ role: 'system', content: prompt }, ...history];
}

// ─── HTTP 核心 ───────────────────────────────────────────

// 粗略估算 token 数（4字符 ≈ 1 token，中文约 1.5字符/token）
function roughTokens(messages: AiMessage[]): number {
  return Math.ceil(messages.reduce((s, m) => s + m.content.length, 0) / 3);
}

// 按 contextLength 裁剪历史消息，保留系统消息 + 最近 N 条
function trimToContext(messages: AiMessage[], contextLength: number): AiMessage[] {
  // 为输出预留 25% token，其余用于输入
  const inputBudget = Math.floor(contextLength * 0.75);
  const system = messages.filter(m => m.role === 'system');
  const conversation = messages.filter(m => m.role !== 'system');

  // 从最新消息往前取，直到超预算
  const kept: AiMessage[] = [];
  let used = roughTokens(system);
  for (let i = conversation.length - 1; i >= 0; i--) {
    const t = Math.ceil(conversation[i].content.length / 3);
    if (used + t > inputBudget) break;
    kept.unshift(conversation[i]);
    used += t;
  }
  return [...system, ...kept];
}

async function chat(messages: AiMessage[]): Promise<string> {
  if (!currentConfig.enabled) {
    throw new Error('AI 助教未启用，请先在设置中开启');
  }
  if (!currentConfig.apiKey) {
    throw new Error('请先在设置中填写 API 密钥');
  }

  // 限流：主进程全局每秒最多 1 次
  const now = Date.now();
  const wait = 1000 - (now - lastRequestTime);
  if (wait > 0) await new Promise(r => setTimeout(r, wait));
  lastRequestTime = Date.now();

  // 裁剪历史，确保不超出上下文窗口
  const trimmed = trimToContext(messages, currentConfig.contextLength);
  // 输出最多使用 25% 的 token，上限 2000
  const maxTokens = Math.min(2000, Math.floor(currentConfig.contextLength * 0.25));

  const endpoint = buildChatEndpoint(currentConfig.baseUrl);

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentConfig.apiKey}`,
      },
      body: JSON.stringify({
        model: currentConfig.model,
        messages: trimmed,
        temperature: 0.7,
        max_tokens: maxTokens,
      }),
      signal: AbortSignal.timeout(30_000),
    });
  } catch (err: any) {
    if (err?.name === 'TimeoutError') throw new Error('AI 服务连接超时，请检查网络', { cause: err });
    throw new Error('无法连接 AI 服务，请检查网络或 API 地址', { cause: err });
  }

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    if (response.status === 401) throw new Error('API 密钥无效，请重新检查');
    if (response.status === 429) throw new Error('请求太频繁，请稍候再试');
    if (response.status === 404) throw new Error('模型不存在，请检查模型名称');
    throw new Error(`API 错误 ${response.status}：${text.slice(0, 120)}`);
  }

  const data = (await response.json()) as any;
  const content: string | undefined = data?.choices?.[0]?.message?.content;
  return content?.trim() || 'AI 未能生成回复，请重试';
}

// ─── 对外能力（只读数据，输出文本）────────────────────────

export async function askAi(messages: AiMessage[]): Promise<string> {
  return chat(messages);
}

export async function askLessonAi(messages: AiMessage[], context: AiLessonContext): Promise<string> {
  const reply = await chat(withTutorContext(messages, context, 'chat'));
  const lastUserMessage = [...messages].reverse().find(message => message.role === 'user');
  if (lastUserMessage) {
    rememberInteraction(context, lastUserMessage.content, reply);
  }
  return reply;
}

export async function reviewCode(code: string, sectionTitle: string, context: AiLessonContext): Promise<string> {
  const codeLanguage = context.codeLanguage === 'python' ? 'python' : 'typescript';
  const messages: AiMessage[] = [
    {
      role: 'user',
      content: `请帮我审查当前练习的代码，不要直接给完整答案。\n练习题目：${sectionTitle}\n\n我的代码：\n\`\`\`${codeLanguage}\n${code}\n\`\`\``,
    },
  ];
  const reply = await chat(withTutorContext(messages, context, 'review'));
  rememberInteraction(context, `代码审查：${sectionTitle}`, reply);
  return reply;
}

export async function explainConcept(concept: string, context: AiLessonContext): Promise<string> {
  const messages: AiMessage[] = [
    {
      role: 'user',
      content: `请解释当前概念「${concept}」，用简单的话说明，并给一个最小示例。`,
    },
  ];
  const reply = await chat(withTutorContext(messages, context, 'explain'));
  rememberInteraction(context, `解释概念：${concept}`, reply);
  return reply;
}

export async function getHint(sectionTitle: string, courseHint: string | undefined, context: AiLessonContext): Promise<string> {
  const extra = courseHint ? `\n课程提示：${courseHint}` : '';
  const messages: AiMessage[] = [
    {
      role: 'user',
      content: `我卡在当前练习了，请给我一个提示，不要直接给答案。\n练习题目：${sectionTitle}${extra}`,
    },
  ];
  const reply = await chat(withTutorContext(messages, context, 'hint'));
  rememberInteraction(context, `请求提示：${sectionTitle}`, reply);
  return reply;
}

// ─── IPC 注册 ────────────────────────────────────────────

export function registerIpcHandlers(): void {
  loadConfig();

  // 返回安全配置（不含明文 key）
  ipcMain.handle('ai:get-config', (): AiConfigPublic => ({
    baseUrl: currentConfig.baseUrl,
    model: currentConfig.model,
    contextLength: currentConfig.contextLength,
    enabled: currentConfig.enabled,
    apiKeySet: currentConfig.apiKey.length > 0,
    apiKeyEncrypted: isEncryptionAvailable(),
  }));

  // 保存配置；newApiKey 留空表示不修改密钥
  ipcMain.handle('ai:save-config', (
    _e,
    { baseUrl, model, contextLength, enabled, newApiKey }: {
      baseUrl: string; model: string; contextLength: number;
      enabled: boolean; newApiKey: string;
    },
  ) => {
    persistConfig({
      baseUrl: normalizeBaseUrl(baseUrl),
      model: model.trim() || DEFAULT_CONFIG.model,
      contextLength: Number.isFinite(contextLength) && contextLength >= 512
        ? contextLength
        : DEFAULT_CONFIG.contextLength,
      enabled,
      apiKey: newApiKey.trim() !== '' ? newApiKey.trim() : currentConfig.apiKey,
    });
    return { success: true };
  });

  // 通用对话（渲染层传完整 messages 数组）
  ipcMain.handle('ai:chat', async (
    _e, { messages, context }: { messages: AiMessage[]; context?: AiLessonContext },
  ) => (context ? askLessonAi(messages, withSessionUser(context)) : askAi(messages)));

  // 代码审查——只接收代码字符串，不返回可写内容
  ipcMain.handle('ai:review-code', async (
    _e, { code, sectionTitle, context }: { code: string; sectionTitle: string; context: AiLessonContext },
  ) => reviewCode(code, sectionTitle, withSessionUser(context)));

  // 获取提示
  ipcMain.handle('ai:get-hint', async (
    _e, { sectionTitle, courseHint, context }: { sectionTitle: string; courseHint?: string; context: AiLessonContext },
  ) => getHint(sectionTitle, courseHint, withSessionUser(context)));

  // 解释概念
  ipcMain.handle('ai:explain', async (
    _e, { concept, context }: { concept: string; context: AiLessonContext },
  ) => explainConcept(concept, withSessionUser(context)));
}
