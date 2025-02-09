import { create } from 'zustand';
import { GameType } from '@/types';

type GameTypeStore = {
  selectedGameType: GameType | undefined;
  setSelectedGameType: (data: GameType | undefined) => void;
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

const useGameTypeStore = create<GameTypeStore>((set) => ({
  selectedGameType: undefined,
  setSelectedGameType: (data) => set({ selectedGameType: data }),
  sheetActions: { action: 'add', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions }),
  statusData: undefined,
  setStatusData: (data) => set({ statusData: data })
}));

export default useGameTypeStore;
