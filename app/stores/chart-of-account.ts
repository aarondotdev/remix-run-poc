import { create } from 'zustand';
import { ChartOfAccount } from '@/types';

type ChartOfAccountStore = {
  selectedChartOfAccount: ChartOfAccount | undefined;
  setSelectedChartOfAccount: (data: ChartOfAccount | undefined) => void;
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

const useChartOfAccountStore = create<ChartOfAccountStore>((set) => ({
  selectedChartOfAccount: undefined,
  setSelectedChartOfAccount: (data) => set({ selectedChartOfAccount: data }),
  sheetActions: { action: 'add', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions }),
  statusData: undefined,
  setStatusData: (data) => set({ statusData: data })
}));

export default useChartOfAccountStore;
