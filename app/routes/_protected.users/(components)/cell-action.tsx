"use client";
import { AlertModal } from "~/components/shared/alert-modal";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useFetchPermissions } from "~/stores/permission-store";
import useUserStore from "~/stores/user-store";
import { Edit, MoreHorizontal, Trash, UserPenIcon } from "lucide-react";
import { useState } from "react";
import { Users } from "~/lib/resource-types";
import { useUserContext } from "~/context/user-provider";

interface CellActionProps {
  data: Users;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const setSheetActions = useUserStore((state) => state.setSheetActions);
  const setSelectedUser = useUserStore((state) => state.setSelectedUser);
  const onConfirm = async () => {};

  const handleUpdate = async () => {
    setSelectedUser(data);
    setSheetActions({ action: "update", open: true });
  };

  const user = useUserContext();

  const hasPermissionToDelete = user?.permissions?.includes("user.delete");
  const hasPermissionToUpdate = user?.permissions?.includes("user.update");

  const handleAssignToCashier = () => {
    setSelectedUser(data);
    setSheetActions({ open: true, action: "assign_to_cashier" });
  };

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
            <span className="sr-only">open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {!hasPermissionToDelete && !hasPermissionToUpdate && (
            <DropdownMenuItem disabled>No actions available</DropdownMenuItem>
          )}
          {hasPermissionToUpdate && (
            <DropdownMenuItem onClick={handleAssignToCashier}>
              <UserPenIcon className="mr-2 h-4 w-4" /> Assign as Cashier
            </DropdownMenuItem>
          )}
          {hasPermissionToUpdate && (
            <DropdownMenuItem onClick={handleUpdate}>
              <Edit className="mr-2 h-4 w-4" /> Update
            </DropdownMenuItem>
          )}
          {hasPermissionToDelete && (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
