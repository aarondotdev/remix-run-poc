import { create } from 'zustand';
import { KYC } from '@/types';

type KYCRequestStore = {
  selectedKycRequest: KYC | undefined;
  setSelectedKycRequest: (data: KYC | undefined) => void;
  sheetActions: {
    action: 'approve' | 'confirm' | 'reject' | 'reupload_require';
    open: boolean;
  };
  setSheetActions: (actions: {
    action: 'approve' | 'confirm' | 'reject' | 'reupload_require';
    open: boolean;
  }) => void;
};

const useKycRequestStore = create<KYCRequestStore>((set) => ({
  selectedKycRequest: undefined,
  setSelectedKycRequest: (data) => set({ selectedKycRequest: data }),
  sheetActions: { action: 'approve', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions })
}));

export default useKycRequestStore;
