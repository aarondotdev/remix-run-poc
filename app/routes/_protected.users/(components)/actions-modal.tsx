import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { API_BASE_URL } from "@/services/authenticate";
import { useToast } from "@/components/ui/use-toast";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import ErrorMessage from "@/components/shared/error-message";
import useUserStore from "@/stores/user-store";
import { useRevalidator } from "@remix-run/react";
import { useUserContext } from "@/context/user-provider";

type DialogContentType = {
  [key: string]: any;
};

export function ActionModal() {
  const user = useUserContext();
  const setSheetActions = useUserStore((state) => state.setSheetActions);
  const setSelectedUser = useUserStore((state) => state.setSelectedUser);
  const sheetActions = useUserStore((state) => state.sheetActions);
  const selectedUser = useUserStore((state) => state.selectedUser);

  const dialogContent: DialogContentType = {
    assign_to_cashier: {
      title: "Assign Cashier",
      header: "",
      description: `Are you sure you want to assign ${selectedUser?.name} as cashier?`,
      content: "",
    },
  };

  const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
  const { toast } = useToast();
  const url = `${API_BASE_URL}/admin/cashiers`;
  const revalidator = useRevalidator();

  async function handleConfirm() {
    setIsLoading(true);
    axios
      .post(
        url,
        {
          user_id: selectedUser?.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      )
      .then((response) => {
        setSelectedUser(undefined);
        setSheetActions({ ...sheetActions, open: false });
        revalidator.revalidate();

        toast({
          variant: "default",
          title: "Success",
          description: response?.data?.message,
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: <ErrorMessage errors={error?.response?.data?.error} />,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleCancel = () => {
    setSheetActions({ ...sheetActions, open: false });
    setTimeout(() => {
      setSelectedUser(undefined);
    }, 1000);
  };

  const isOpen =
    sheetActions.open && sheetActions.action === "assign_to_cashier";

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="sm:max-w-[460px]"
        hideCloseButton
        onInteractOutside={handleCancel}
        onEscapeKeyDown={handleCancel}
      >
        <DialogHeader>
          <DialogTitle className="capitalize">
            {dialogContent[sheetActions.action]?.title}
          </DialogTitle>
          <DialogDescription>
            {dialogContent[sheetActions.action]?.header}
          </DialogDescription>
        </DialogHeader>
        {dialogContent[sheetActions.action]?.description}
        <DialogFooter>
          <Button
            type="button"
            disabled={isLoading}
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleConfirm}>
            {isLoading ? (
              <LoaderIcon className="animate-spin repeat-infinite" />
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
