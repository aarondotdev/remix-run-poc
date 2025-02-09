import { create } from 'zustand';
import { HouseBalance } from '@/types';

type HouseBalanceStore = {
  selectedHouseBalance: HouseBalance | undefined;
  setSelectedHouseBalance: (data: HouseBalance | undefined) => void;
  sheetActions: {
    action:
      | 'update'
      | 'junket-junket'
      | 'junket-wallet'
      | 'wallet-junket'
      | 'add_wallet'
      | 'add-house-balance'
      | 'add-fund'
      | 'deduct-fund';
    open: boolean;
  };
  setSheetActions: (actions: {
    action:
      | 'update'
      | 'junket-junket'
      | 'junket-wallet'
      | 'wallet-junket'
      | 'add_wallet'
      | 'add-house-balance'
      | 'add-fund'
      | 'deduct-fund';
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

const useHouseBalanceStore = create<HouseBalanceStore>((set) => ({
  selectedHouseBalance: undefined,
  setSelectedHouseBalance: (data) => set({ selectedHouseBalance: data }),
  sheetActions: { action: 'junket-junket', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions }),
  statusData: undefined,
  setStatusData: (data) => set({ statusData: data })
}));

export default useHouseBalanceStore;
