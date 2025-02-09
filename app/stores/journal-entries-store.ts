import { create } from 'zustand';
import { Currency } from '@/types';

type JournalEntriesStore = {
  selectedJournalEntries: Currency | undefined;
  setSelectedJournalEntries: (data: Currency | undefined) => void;
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

const useJournalEntriesStore = create<JournalEntriesStore>((set) => ({
  selectedJournalEntries: undefined,
  setSelectedJournalEntries: (data) => set({ selectedJournalEntries: data }),
  sheetActions: { action: 'add', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions }),
  statusData: undefined,
  setStatusData: (data) => set({ statusData: data })
}));

export default useJournalEntriesStore;
