import { create } from 'zustand';
import { Withdrawal, WithdrawalDetail } from '@/types';

type WithdrawalRequestStore = {
  selectedWithdrawalRequest: Withdrawal | WithdrawalDetail | undefined;
  setSelectedWithdrawalRequest: (
    data: Withdrawal | WithdrawalDetail | undefined
  ) => void;
  sheetActions: {
    action:
      | 'assign_to_house_balance'
      | 'approve'
      | 'confirm'
      | 'reject'
      | 'for_approval'
      | 'release'
      | 'add';
    open: boolean;
  };
  setSheetActions: (actions: {
    action:
      | 'assign_to_house_balance'
      | 'approve'
      | 'confirm'
      | 'reject'
      | 'for_approval'
      | 'release'
      | 'add';
    open: boolean;
  }) => void;
};

const useWithdrawalRequestStore = create<WithdrawalRequestStore>((set) => ({
  selectedWithdrawalRequest: undefined,
  setSelectedWithdrawalRequest: (data) =>
    set({ selectedWithdrawalRequest: data }),
  sheetActions: { action: 'for_approval', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions })
}));

export default useWithdrawalRequestStore;
