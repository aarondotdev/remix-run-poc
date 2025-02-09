import { create } from 'zustand';
import { WithdrawalLimit } from '@/types';

type WithdrawalLimitStore = {
  selectedWithdrawalLimit: WithdrawalLimit | undefined;
  setSelectedWithdrawalLimit: (data: WithdrawalLimit | undefined) => void;
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

const useWithdrawalLimitStore = create<WithdrawalLimitStore>((set) => ({
  selectedWithdrawalLimit: undefined,
  setSelectedWithdrawalLimit: (data) => set({ selectedWithdrawalLimit: data }),
  sheetActions: { action: 'add', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions }),
  statusData: undefined,
  setStatusData: (data) => set({ statusData: data })
}));

export default useWithdrawalLimitStore;
