import { AlertModal } from "~/components/shared/alert-modal";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { MoreHorizontal, SquareUserIcon } from "lucide-react";
import { useState } from "react";
import { Guest, Users } from "~/lib/resource-types";
import { useUserContext } from "~/context/user-provider";
import axios from "axios";
import useGuestStore from "~/stores/guests-store";
import { useToast } from "~/components/ui/use-toast";
import { useEnvironmentProvider } from "~/context/environment-provider";
import { useRevalidator } from "@remix-run/react";

interface CellActionProps {
  data: Guest;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const setSheetActions = useGuestStore((state) => state.setSheetActions);
  const setSelectedGuest = useGuestStore((state) => state.setSelectedGuest);
  const { toast } = useToast();
  const env = useEnvironmentProvider();
  const revalidator = useRevalidator();
  const deleteUrl = `${env.API_BASE_URL}/admin/players/${data.id}`;

  const onConfirm = async () => {
    setLoading(true);

    axios
      .delete(deleteUrl, {
        data: {
          ...data,
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user?.access_token}`,
        },
      })
      .then((response) => {
        revalidator.revalidate();
        toast({
          title: "Success",
          description: response?.data?.message,
          variant: "default",
        });
        setOpen(false);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error?.message,
          // description: <ErrorMessage errors={error?.response?.data?.error} />,
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAssignAgent = async () => {
    setSelectedGuest(data);
    setSheetActions({ action: "assign-agent", open: true });
  };

  const handleUpdate = () => {
    setSelectedGuest(data);
    setSheetActions({ action: "update", open: true });
  };

  const user = useUserContext();
  const hasPermissionToDelete = user?.permissions?.includes("player.delete");
  const hasPermissionToUpdate = user?.permissions?.includes("player.update");

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
            <span className="sr-only">Open</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {/* <DropdownMenuItem onClick={handleUpdate}>
            <WalletCards className="mr-2 h-4 w-4" /> View Wallet
          </DropdownMenuItem> */}
          {!hasPermissionToDelete && !hasPermissionToUpdate && (
            <DropdownMenuItem disabled>No actions available</DropdownMenuItem>
          )}
          {hasPermissionToUpdate && (
            <DropdownMenuItem onClick={handleUpdate}>
              <SquareUserIcon className="mr-2 h-4 w-4" /> Update
            </DropdownMenuItem>
          )}
          {hasPermissionToUpdate && (
            <DropdownMenuItem onClick={handleAssignAgent}>
              <SquareUserIcon className="mr-2 h-4 w-4" /> Assign to Agent
            </DropdownMenuItem>
          )}
          {/* 
          {hasPermissionToDelete && (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash className="mr-2 h-4 w-4" /> {t('button_delete')}
            </DropdownMenuItem>
          )} */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
