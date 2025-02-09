import { create } from 'zustand';
import { Junket } from '@/types';

type JunketStore = {
  selectedJunket: Junket | undefined;
  setSelectedJunket: (data: Junket | undefined) => void;
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

const useJunketStore = create<JunketStore>((set) => ({
  selectedJunket: undefined,
  setSelectedJunket: (data) => set({ selectedJunket: data }),
  sheetActions: { action: 'add', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions }),
  statusData: undefined,
  setStatusData: (data) => set({ statusData: data })
}));

export default useJunketStore;
