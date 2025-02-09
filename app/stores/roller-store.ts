import { create } from 'zustand';
import { Roller } from '@/types';

type RollerTypeStore = {
  selectedRoller: Roller | undefined;
  setSelectedRoller: (data: Roller | undefined) => void;
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

const useRollerStore = create<RollerTypeStore>((set) => ({
  selectedRoller: undefined,
  setSelectedRoller: (data) => set({ selectedRoller: data }),
  sheetActions: { action: 'add', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions }),
  statusData: undefined,
  setStatusData: (data) => set({ statusData: data })
}));

export default useRollerStore;
