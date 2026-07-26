// 代码运行 hook
import { useState, useCallback } from 'react';
import { RunResult } from '../../services/runner/service';

export function useRunner() {
  const [result, setResult] = useState<RunResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const run = useCallback(async (code: string, language: 'typescript' | 'python' = 'typescript') => {
    setIsRunning(true);
    try {
      const res = await (window as any).snailAPI.runner.run(code, language);
      setResult(res);
      return res;
    } finally {
      setIsRunning(false);
    }
  }, []);

  return { result, isRunning, run };
}
