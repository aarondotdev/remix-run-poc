import { create } from 'zustand';
import { Users } from "~/lib/resource-types"

type UserStore = {
  selectedUser: Users | undefined;
  setSelectedUser: (data: Users | undefined) => void;
  sheetActions: {
    action: 'add' | 'update' | 'assign_to_cashier';
    open: boolean;
  };
  setSheetActions: (actions: {
    action: 'add' | 'update' | 'assign_to_cashier';
    open: boolean;
  }) => void;
};

const useUserStore = create<UserStore>((set) => ({
  selectedUser: undefined,
  setSelectedUser: (data) => set({ selectedUser: data }),
  sheetActions: { action: 'add', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions })
}));

export default useUserStore;
