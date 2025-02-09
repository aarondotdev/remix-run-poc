import { create } from 'zustand';
import { Guest } from '@/types';

type GuestTypeStore = {
  selectedGuest: Guest | undefined;
  setSelectedGuest: (data: Guest | undefined) => void;
  sheetActions: {
    action: 'add' | 'update' | 'add_wallet' | 'assign-agent';
    open: boolean;
  };
  setSheetActions: (actions: {
    action: 'add' | 'update' | 'add_wallet' | 'assign-agent';
    open: boolean;
  }) => void;
};

const useGuestStore = create<GuestTypeStore>((set) => ({
  selectedGuest: undefined,
  setSelectedGuest: (data) => set({ selectedGuest: data }),
  sheetActions: { action: 'add', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions })
}));

export default useGuestStore;
