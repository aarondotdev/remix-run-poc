import { create } from 'zustand';
import { Schedule } from '@/types';

type ScheduleTypeStore = {
  selectedSchedule: Schedule | undefined;
  setSelectedSchedule: (data: Schedule | undefined) => void;
  sheetActions: { action: 'add' | 'update'; open: boolean };
  setSheetActions: (actions: {
    action: 'add' | 'update';
    open: boolean;
  }) => void;
};

const useScheduleStore = create<ScheduleTypeStore>((set) => ({
  selectedSchedule: undefined,
  setSelectedSchedule: (data) => set({ selectedSchedule: data }),
  sheetActions: { action: 'add', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions })
}));

export default useScheduleStore;
