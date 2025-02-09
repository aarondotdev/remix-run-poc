import { create } from 'zustand';
import { Agent } from '@/types';

type AgentTypeStore = {
  selectedAgent: Agent | undefined;
  setSelectedAgent: (data: Agent | undefined) => void;
  sheetActions: { action: 'add' | 'update'; open: boolean };
  setSheetActions: (actions: {
    action: 'add' | 'update';
    open: boolean;
  }) => void;
  statusData:
    | {
        id: string | number;
        open: boolean;
        is_active: boolean;
      }
    | undefined;
  setStatusData: (data: {
    id: string | number;
    open: boolean;
    is_active: boolean;
  }) => void;
};

const useAgentStore = create<AgentTypeStore>((set) => ({
  selectedAgent: undefined,
  setSelectedAgent: (data) => set({ selectedAgent: data }),
  sheetActions: { action: 'add', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions }),
  statusData: undefined,
  setStatusData: (data) => set({ statusData: data })
}));

export default useAgentStore;
