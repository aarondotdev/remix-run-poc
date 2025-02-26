"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
// import IsActiveBadge from "@/components/is-active-badge";
// import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";
import { GameType } from "@/lib/resource-types";
import { useFetchPermissions } from "@/stores/permission-store";
import useGameTypeStore from "@/stores/game-type-store";

export const columns: ColumnDef<GameType>[] = [
  {
    id: "Code",
    accessorKey: "code",
    header: () => {
      const { t } = useTranslation();
      return t("label_code");
    },
  },
  {
    id: "Name",
    accessorKey: "name",
    header: () => {
      const { t } = useTranslation();
      return t("label_name");
    },
  },
  {
    id: "Description",
    accessorKey: "description",
    header: () => {
      const { t } = useTranslation();
      return t("label_description");
    },
  },
  {
    id: "Status",
    accessorKey: "is_active",
    header: () => {
      const { t } = useTranslation();
      return t("label_status");
    },
    cell: ({ row }) => {
      const setStatusData = useGameTypeStore((state) => state.setStatusData);
      const handleCheckChange = (id: string | number, is_active: boolean) => {
        setStatusData({ id: id, open: true, is_active: is_active });
      };
      const statusText = row.original.is_active ? "active" : "inactive";
      const isActive = row.original.is_active;

      const { permissions } = useFetchPermissions();

      const hasPermissionToUpdate =
        permissions?.data?.includes("UPDATE_GAMETYPE");

      return (
        <div className="flex items-center gap-2">
          {/* <IsActiveBadge status={statusText}>{statusText}</IsActiveBadge> */}
          {/* {hasPermissionToUpdate && (
            <Switch
              checked={isActive}
              onCheckedChange={() =>
                handleCheckChange(row.original.code, row.original.is_active)
              }
            />
          )} */}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => {
      const { t } = useTranslation();
      return t("label_actions");
    },
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
