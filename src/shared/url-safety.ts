// 外部链接安全校验 — 主进程与渲染进程共用
// 只允许 http/https 交给系统浏览器打开，阻止 file://、javascript:、
// ms-msdt: 等可以在本机启动程序的协议。

const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);

export function isSafeExternalUrl(url: unknown): url is string {
  if (typeof url !== 'string' || url.trim() === '') return false;

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }

  return ALLOWED_PROTOCOLS.has(parsed.protocol);
}
