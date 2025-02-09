import { create } from 'zustand';
import { ShiftType } from '@/types';

type ShiftTypeStore = {
  selectedShiftType: ShiftType | undefined;
  setSelectedShiftType: (data: ShiftType | undefined) => void;
  sheetActions: { action: 'add' | 'update'; open: boolean };
  setSheetActions: (actions: {
    action: 'add' | 'update';
    open: boolean;
  }) => void;
};

const useShiftTypeStore = create<ShiftTypeStore>((set) => ({
  selectedShiftType: undefined,
  setSelectedShiftType: (data) => set({ selectedShiftType: data }),
  sheetActions: { action: 'add', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions })
}));

export default useShiftTypeStore;
