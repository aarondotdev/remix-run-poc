import { create } from 'zustand';
import { City, Country, Currency, MerchantRegisterPayload } from '@/types';

type RegistrationStore = {
  isCheckedPreview: boolean;
  setIsCheckedPreview: (data: boolean) => void;
  payload: MerchantRegisterPayload | undefined;
  setPayload: (data: MerchantRegisterPayload | undefined) => void;
  uploadedTins: any;
  setUploadedTins: any;
  uploadedPermits: any;
  setUploadedPermits: any;
  selectedCurrency: Currency | undefined;
  setSelectedCurrency: (data: Currency | undefined) => void;
  selectedCountry: Country | undefined;
  setSelectedCountry: (data: Country | undefined) => void;
  selectedCity: City | undefined;
  setSelectedCity: (data: City | undefined) => void;
  sheetActions: {
    action: 'add' | 'update';

    open: boolean;
  };
  setSheetActions: (actions: {
    action: 'add' | 'update';

    open: boolean;
  }) => void;
};

const useRegistrationStore = create<RegistrationStore>((set) => ({
  isCheckedPreview: false,
  setIsCheckedPreview: (data: boolean) => set({ isCheckedPreview: data }),
  uploadedTins: undefined,
  setUploadedTins: (data: any) => set({ uploadedTins: data }),
  uploadedPermits: undefined,
  setUploadedPermits: (data: any) => set({ uploadedPermits: data }),
  payload: undefined,
  setPayload: (data) => set({ payload: data }),
  selectedCurrency: undefined,
  setSelectedCurrency: (data) => set({ selectedCurrency: data }),
  selectedCountry: undefined,
  setSelectedCountry: (data) => set({ selectedCountry: data }),
  selectedCity: undefined,
  setSelectedCity: (data) => set({ selectedCity: data }),
  sheetActions: { action: 'add', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions })
}));

export default useRegistrationStore;
