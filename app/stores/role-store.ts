import { create } from 'zustand';
import { Roles } from '~/lib/resource-types';

type RoleType = {
  name: string;
  label: string;
  description?: string;
};

type FormModeType = {
  create?: boolean;
  edit?: boolean;
};

interface Permissions {
  permissions: string[];
}

export type CreateRolePayload = RoleType & Permissions;

type RoleStore = {
  roleFormData: RoleType | null;
  setRoleFormData: (data: RoleType | null) => void;
  //   TODO: VIEW ALL PERMISSIONS modal
  updateRoleFormData: RoleType | null;
  setUpdateRoleFormData: (data: RoleType | null) => void;
  checkedPermissions: Record<string, boolean>;
  setCheckedPermissions: (permissions: Record<string, boolean>) => void;
  updateCheckedPermissions: Record<string, boolean>;
  setUpdateCheckedPermissions: (permissions: Record<string, boolean>) => void;
  selectedRole: Roles | null;
  setSelectedRole: (role: Roles | null) => void;
  sheetActions: { action: 'add' | 'update'; open: boolean };
  setSheetActions: (actions: {
    action: 'add' | 'update';
    open: boolean;
  }) => void;
  formMode: FormModeType;
  setFormMode: (mode: FormModeType) => void;
};

const useRoleStore = create<RoleStore>((set) => ({

  roleFormData: null,
  setRoleFormData: (data) => set({ roleFormData: data }),

  updateRoleFormData: null,
  setUpdateRoleFormData: (data) => set({ updateRoleFormData: data }),

  checkedPermissions: {},
  setCheckedPermissions: (permissions) =>
    set({ checkedPermissions: permissions }),

  updateCheckedPermissions: {},
  setUpdateCheckedPermissions: (permissions) =>
    set({ updateCheckedPermissions: permissions }),

  selectedRole: null,
  setSelectedRole: (role) => set({ selectedRole: role }),

  sheetActions: { action: 'add', open: false },
  setSheetActions: (actions) => set({ sheetActions: actions }),

  formMode: { create: true, edit: false },
  setFormMode: (mode) => set({ formMode: mode })
}));

export default useRoleStore;
