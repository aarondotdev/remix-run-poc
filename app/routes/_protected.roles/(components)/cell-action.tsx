import { AlertModal } from "@/components/shared/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { Link, useRevalidator } from "@remix-run/react";
import ErrorMessage from "@/components/shared/error-message";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Role } from "@/lib/resource-types";
import { useEnvironmentProvider } from "@/context/environment-provider";
import useRoleStore from "@/stores/role-store";
import { useUserContext } from "@/context/user-provider";

interface CellActionProps {
  data: Role;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const revalidator = useRevalidator();
  const setSelectedRole = useRoleStore((state) => state.setSelectedRole);
  const env = useEnvironmentProvider();
  const user = useUserContext();

  const deleteRoleEndpoint = `${env.API_BASE_URL}/admin/roles/${data.id}`;

  const { toast } = useToast();
  const handleUpdate = async () => {
    setSelectedRole(data);
  };

  const hasPermissionToDelete = user.permissions?.includes("role.delete");
  const hasPermissionToUpdate = user?.permissions?.includes("role.update");

  const onConfirm = async () => {
    setLoading(true);

    axios
      .delete(deleteRoleEndpoint, {
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
        toast({
          title: "Success",
          description: response?.data?.message,
          variant: "default",
        });
        revalidator.revalidate();
        setOpen(false);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: <ErrorMessage errors={error?.response?.data?.error} />,
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
      });
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
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {!hasPermissionToDelete && !hasPermissionToUpdate && (
            <DropdownMenuItem disabled>No actions available</DropdownMenuItem>
          )}
          {hasPermissionToUpdate && (
            <DropdownMenuItem asChild>
              <Link to={`/roles/view/${data.id}`} onClick={handleUpdate}>
                <Edit className="mr-2 h-4 w-4" /> Update
              </Link>
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
