import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, Edit, EyeIcon, MoreHorizontal, Trash } from "lucide-react";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { AlertModal } from "@/components/shared/alert-modal";
import { GameType } from "@/lib/resource-types";
import { API_BASE_URL } from "@/services/authenticate";
import ErrorMessage from "@/components/shared/error-message";
import { useRevalidator } from "@remix-run/react";
import { useUserContext } from "@/context/user-provider";
import useGameTypeStore from "@/stores/game-type-store";
import { useFetchPermissions } from "@/stores/permission-store";
import { useLocale } from "remix-i18next/react";
import { useEnvironmentProvider } from "@/context/environment-provider";

interface CellActionProps {
  data: GameType;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const user = useUserContext();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const setSelectedGameType = useGameTypeStore(
    (state) => state.setSelectedGameType
  );
  const setSheetActions = useGameTypeStore((state) => state.setSheetActions);

  const { toast } = useToast();
  const locale = useLocale();
  const handleUpdate = async () => {
    setSelectedGameType(data);
    setSheetActions({ action: "update", open: true });
  };

  const { t } = useTranslation();

  const env = useEnvironmentProvider();

  const url = `${env.API_BASE_URL}/admin/game-types/${data.code}`;
  const revalidator = useRevalidator();

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
        navigate(0); // This refreshes the current route in Remix

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

  const { permissions } = useFetchPermissions();
  const hasPermissionToDelete = permissions?.data?.includes("DELETE_GAMETYPE");
  const hasPermissionToUpdate = permissions?.data?.includes("UPDATE_GAMETYPE");

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
          <DropdownMenuLabel> {t("label_actions")}</DropdownMenuLabel>
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
