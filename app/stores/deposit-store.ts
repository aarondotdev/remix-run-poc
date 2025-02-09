import { create } from 'zustand';
import { Deposit } from '@/types';

type DepositTypeStore = {
  selectedDepositRequest: Deposit | undefined;
  setSelectedDepositRequest: (data: Deposit | undefined) => void;
  sheetActions: {
    action:
      | 'confirm'
      | 'verify_receipt'
      | 'approve'
      | 'reject'
      | 'add_deposit'
      | 'reversal';
    open: boolean;
  };
  setSheetActions: (actions: {
    action:
      | 'confirm'
      | 'verify_receipt'
      | 'approve'
      | 'reject'
      | 'add_deposit'
      | 'reversal';
    open: boolean;
  }) => void;
};

const useDepositStore = create<DepositTypeStore>((set) => ({
  selectedDepositRequest: undefined,
  setSelectedDepositRequest: (data) => set({ selectedDepositRequest: data }),
  sheetActions: { action: 'verify_receipt', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions })
}));

export default useDepositStore;
