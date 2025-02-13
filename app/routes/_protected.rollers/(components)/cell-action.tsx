"use client";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Calendar, Edit, EyeIcon, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "~/components/ui/use-toast";

import axios from "axios";

import { useTranslation } from "react-i18next";
import { useLocale } from "remix-i18next/react";
import { useFetchPermissions } from "~/stores/permission-store";
import { Roller } from "~/lib/resource-types";
import ErrorMessage from "~/components/shared/error-message";
import { useUserContext } from "~/context/user-provider";
import useRollerStore from "~/stores/roller-store";
import { useRevalidator } from "@remix-run/react";
import { useEnvironmentProvider } from "~/context/environment-provider";
import { AlertModal } from "~/components/shared/alert-modal";

interface CellActionProps {
  data: Roller;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const user = useUserContext();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const setSelectedRoller = useRollerStore((state) => state.setSelectedRoller);
  const setSheetActions = useRollerStore((state) => state.setSheetActions);

  const { t } = useTranslation();

  const { toast } = useToast();
  const handleUpdate = async () => {
    setSelectedRoller(data);
    setSheetActions({ action: "update", open: true });
  };

  const env = useEnvironmentProvider();

  const url = `${env.API_BASE_URL}/admin/rollers/${data.roller_code}`;
  const revalidator = useRevalidator();

  const { permissions } = useFetchPermissions();
  const hasPermissionToDelete = permissions?.data?.includes("DELETE_ROLLER");
  const hasPermissionToUpdate = permissions?.data?.includes("UPDATE_ROLLER");

  const onConfirm = async () => {
    setLoading(true);

    axios
      .delete(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user?.access_token}`,
          "Accept-Language": locale,
        },
      })
      .then((response) => {
        console.log(response);
        setOpen(false);
        revalidator.revalidate();

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
            <span className="sr-only">{t("label_open_menu")}</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t("label_actions")}</DropdownMenuLabel>
          {!hasPermissionToDelete && !hasPermissionToUpdate && (
            <DropdownMenuItem disabled>
              {t("label_no_actions_available")}
            </DropdownMenuItem>
          )}
          {hasPermissionToUpdate && (
            <DropdownMenuItem onClick={handleUpdate}>
              <Edit className="mr-2 h-4 w-4" /> {t("button_update")}
            </DropdownMenuItem>
          )}
          {hasPermissionToDelete && (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash className="mr-2 h-4 w-4" /> {t("button_delete")}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
