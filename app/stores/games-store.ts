import { create } from 'zustand';
import { Agent, Game } from '@/types';

type GameTypeStore = {
  selectedAgent: Agent | undefined;
  setSelectedAgent: (data: Agent | undefined) => void;
  selectedGame: Game | undefined;
  setSelectedGame: (data: Game | undefined) => void;
  sheetActions: {
    action:
      | 'add'
      | 'update'
      | 'buy-in'
      | 'start-game'
      | 'settle'
      | 'additional-buy-in'
      | 'complete'
      | 'view-logs'
      | 'view-buyin'
      | 'update-settlement'
      | 'pay-out'
      | 'view-agent';
    open: boolean;
  };
  setSheetActions: (actions: {
    action:
      | 'add'
      | 'update'
      | 'buy-in'
      | 'start-game'
      | 'settle'
      | 'additional-buy-in'
      | 'complete'
      | 'view-logs'
      | 'view-buyin'
      | 'update-settlement'
      | 'pay-out'
      | 'view-agent';
    open: boolean;
  }) => void;
};

const useGameStore = create<GameTypeStore>((set) => ({
  selectedAgent: undefined,
  setSelectedAgent: (data) => set({ selectedAgent: data }),
  selectedGame: undefined,
  setSelectedGame: (data) => set({ selectedGame: data }),
  sheetActions: { action: 'add', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions })
}));

export default useGameStore;
