// 主进程持有的活动会话
//
// 此前每个 IPC handler 都直接采用渲染进程传来的 userId，
// 渲染层任意代码（含 AI 返回内容诱导下的调用）都能读写他人的进度、代码和考试记录。
// 现在 userId 一律由主进程根据会话令牌解析，渲染层传什么都不作数。

let activeUserId: string | null = null;
let activeToken: string | null = null;

export function setActiveSession(userId: string, token: string): void {
  activeUserId = userId;
  activeToken = token;
}

export function clearActiveSession(): void {
  activeUserId = null;
  activeToken = null;
}

/** 令牌失效时（例如另一处登出）只清理匹配的会话 */
export function clearActiveSessionByToken(token: string): void {
  if (activeToken === token) clearActiveSession();
}

export function getActiveUserId(): string | null {
  return activeUserId;
}

/** 需要登录态的操作统一走这里，未登录直接抛出 */
export function requireUserId(): string {
  if (!activeUserId) throw new Error('请先登录');
  return activeUserId;
}
