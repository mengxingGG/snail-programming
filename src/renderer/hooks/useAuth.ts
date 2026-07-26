// 认证 hook
import { useState, useEffect, useCallback } from 'react';

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(() => localStorage.getItem('snail:userId'));
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('snail:token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('snail:token');
    if (!savedToken || !(window as any).snailAPI?.auth?.getSession) {
      setIsLoading(false);
      return;
    }

    (window as any).snailAPI.auth.getSession(savedToken)
      .then((session: { userId: string | null }) => {
        if (session?.userId) {
          localStorage.setItem('snail:userId', session.userId);
          setUserId(session.userId);
          setToken(savedToken);
        } else {
          localStorage.removeItem('snail:userId');
          localStorage.removeItem('snail:token');
          setUserId(null);
          setToken(null);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const persistSession = useCallback((res: { userId: string; token: string }) => {
    localStorage.setItem('snail:userId', res.userId);
    localStorage.setItem('snail:token', res.token);
    setUserId(res.userId);
    setToken(res.token);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const res = await (window as any).snailAPI.auth.login(username, password);
    persistSession(res);
  }, [persistSession]);

  const register = useCallback(async (username: string, password: string) => {
    const res = await (window as any).snailAPI.auth.register(username, password);
    persistSession(res);
  }, [persistSession]);

  const logout = useCallback(async () => {
    if (token) await (window as any).snailAPI.auth.logout(token);
    localStorage.removeItem('snail:userId');
    localStorage.removeItem('snail:token');
    setUserId(null);
    setToken(null);
  }, [token]);

  return { userId, token, isLoading, login, logout, register, isLoggedIn: !!userId };
}
