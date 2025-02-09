import { create } from 'zustand';
import { Cashier } from '@/types';

type ChipTypeStore = {
  selectedChip: Cashier | undefined;
  setSelectedChip: (data: Cashier | undefined) => void;
  sheetActions: { action: 'add' | 'update'; open: boolean };
  setSheetActions: (actions: {
    action: 'add' | 'update';
    open: boolean;
  }) => void;
};

const useChipStore = create<ChipTypeStore>((set) => ({
  selectedChip: undefined,
  setSelectedChip: (data) => set({ selectedChip: data }),
  sheetActions: { action: 'add', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions })
}));

export default useChipStore;
