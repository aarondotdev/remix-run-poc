'use client';
import { AlertModal } from '~/components/modal/alert-modal';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';
import { useFetchPermissions } from '~/stores/permission-store';
import useUserStore from '~/stores/user-store';
import { Users } from '~/types';
import { Edit, MoreHorizontal, Trash, UserPenIcon } from 'lucide-react';
import { useState } from 'react';

interface CellActionProps {
  data: Users;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const setSheetActions = useUserStore((state) => state.setSheetActions);
  const setSelectedUser = useUserStore((state) => state.setSelectedUser);
  const onConfirm = async () => { };

  const handleUpdate = async () => {
    setSelectedUser(data);
    setSheetActions({ action: 'update', open: true });
  };


  const { permissions } = useFetchPermissions();
  const hasPermissionToDelete = permissions?.data?.includes('DELETE_USER');
  const hasPermissionToUpdate = permissions?.data?.includes('UPDATE_USER');

  const handleAssignToCashier = () => {
    setSelectedUser(data);
    setSheetActions({ open: true, action: 'assign_to_cashier' });
  };

  const hasCashierRole = data?.roles
    ?.map((item) => item.name)
    ?.includes('cashier');

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">{t('label_open_menu')}</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel> {t('label_actions')}</DropdownMenuLabel>
          {!hasPermissionToDelete && !hasPermissionToUpdate && (
            <DropdownMenuItem disabled>
              {t('label_no_actions_available')}
            </DropdownMenuItem>
          )}
          {hasPermissionToUpdate && !hasCashierRole && (
            <DropdownMenuItem onClick={handleAssignToCashier}>
              <UserPenIcon className="mr-2 h-4 w-4" /> Assign as Cashier
            </DropdownMenuItem>
          )}
          {hasPermissionToUpdate && (
            <DropdownMenuItem onClick={handleUpdate}>
              <Edit className="mr-2 h-4 w-4" /> {t('button_update')}
            </DropdownMenuItem>
          )}
          {hasPermissionToDelete && (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash className="mr-2 h-4 w-4" /> {t('button_delete')}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
