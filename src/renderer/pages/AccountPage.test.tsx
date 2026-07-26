/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AccountPage from './AccountPage';

const navigateMock = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
  useLocation: () => ({ state: null }),
}));

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    userId: 'user-1',
    token: 'token-1',
    isLoggedIn: true,
    isLoading: false,
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
  }),
}));

vi.mock('../hooks/useProgress', () => ({
  useProgress: (_userId: string | null, courseId: 'typescript' | 'python') => ({
    progress: courseId === 'typescript'
      ? {
          userId: 'user-1',
          courseId: 'typescript',
          completedSections: ['1.1', '1.2', '2.1'],
          completedChapters: [],
          currentSectionId: '2.1',
        }
      : {
          userId: 'user-1',
          courseId: 'python',
          completedSections: [],
          completedChapters: [],
          currentSectionId: '',
        },
    completeSection: vi.fn(),
  }),
}));

describe('AccountPage', () => {
  it('继续学习会跳到当前进度所在章节，而不是最早完成的小节', async () => {
    (window as any).snailAPI = {
      profile: {
        get: vi.fn().mockResolvedValue({ nickname: '测试学员' }),
      },
    };

    render(<AccountPage />);

    const button = await screen.findByRole('button', { name: /TypeScript 学习/i });
    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledWith('/learn/typescript/ch2/2.1');
  });
});
