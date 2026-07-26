// Zustand UI 状态
import { create } from 'zustand';

interface UIState {
  sidebarCollapsed: boolean;
  aiPanelOpen: boolean;
  toggleSidebar: () => void;
  toggleAiPanel: () => void;
  setAiPanelOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  aiPanelOpen: false,
  toggleSidebar: () => set(s => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  toggleAiPanel: () => set(s => ({ aiPanelOpen: !s.aiPanelOpen })),
  setAiPanelOpen: (open) => set({ aiPanelOpen: open }),
}));
