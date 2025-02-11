import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { useToast } from "~/components/ui/use-toast";
import axios from "axios";
import { Cashier } from "~/lib/resource-types";
import { useEnvironmentProvider } from "~/context/environment-provider";
import useCashierStore from "~/stores/cashier-store";
import { useUserContext } from "~/context/user-provider";
import { ErrorMessage } from "~/components/shared/error-message";
import { AlertModal } from "~/components/shared/alert-modal";
import { useRevalidator } from "@remix-run/react";

interface CellActionProps {
  data: Cashier;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const setSelectedCashier = useCashierStore(
    (state) => state.setSelectedCashier
  );
  const setSheetActions = useCashierStore((state) => state.setSheetActions);

  const { toast } = useToast();
  const handleUpdate = async () => {
    setSelectedCashier(data);
    setSheetActions({ action: "update", open: true });
  };

  const env = useEnvironmentProvider();
  const user = useUserContext();
  const revalidator = useRevalidator();

  const deleteEndpoint = `${env.API_BASE_URL}/admin/cashiers/${data.id}`;

  const onConfirm = async () => {
    setLoading(true);

    axios
      .delete(deleteEndpoint, {
        data: {
          ...data,
        },

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then((response) => {
        revalidator.revalidate();
        setOpen(false);
        toast({
          variant: "default",
          title: "Success",
          description: response?.data?.message,
        });
      })
      .catch((error) => {
        console.error("Form submission error", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: <ErrorMessage errors={error?.response?.data?.error} />,
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
          {/* 
          <DropdownMenuItem asChild>
            <Link href={`/schedule-calendar/${data.user.id}`}>
              <Calendar className="mr-2 h-4 w-4" /> {t('button_view_schedule')}
            </Link>
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem onClick={handleUpdate}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem> */}

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
