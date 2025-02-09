import { create } from 'zustand';
import { BankAccount } from '@/types';

type BankAccountStore = {
  selectedBankAccount: BankAccount | undefined;
  setSelectedBankAccount: (data: BankAccount | undefined) => void;
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

const useBankAccountStore = create<BankAccountStore>((set) => ({
  selectedBankAccount: undefined,
  setSelectedBankAccount: (data) => set({ selectedBankAccount: data }),
  sheetActions: { action: 'add', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions }),
  statusData: undefined,
  setStatusData: (data) => set({ statusData: data })
}));

export default useBankAccountStore;
