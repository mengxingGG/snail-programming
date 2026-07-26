// 用户数据类型
export interface User {
  id: string;
  username: string;
  passwordHash: string;
  createdAt: number;
}
export interface UserSession {
  userId: string;
  token: string;
  expiresAt: number;
}
