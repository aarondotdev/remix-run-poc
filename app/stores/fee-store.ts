import { create } from 'zustand';
import { Fee } from '@/types';

type FeeStore = {
  selectedFee: Fee | undefined;
  setSelectedFee: (data: Fee | undefined) => void;
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

const useFeeStore = create<FeeStore>((set) => ({
  selectedFee: undefined,
  setSelectedFee: (data) => set({ selectedFee: data }),
  sheetActions: { action: 'add', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions }),
  statusData: undefined,
  setStatusData: (data) => set({ statusData: data })
}));

export default useFeeStore;
