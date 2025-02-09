import { create } from 'zustand';
import { Cashier } from '@/types';

type CashierTypeStore = {
  selectedCashier: Cashier | undefined;
  setSelectedCashier: (data: Cashier | undefined) => void;
  sheetActions: { action: 'add' | 'update'; open: boolean };
  setSheetActions: (actions: {
    action: 'add' | 'update';
    open: boolean;
  }) => void;
};

const useCashierStore = create<CashierTypeStore>((set) => ({
  selectedCashier: undefined,
  setSelectedCashier: (data) => set({ selectedCashier: data }),
  sheetActions: { action: 'add', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions })
}));

export default useCashierStore;
