"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
// import { Switch } from "@/components/ui/switch";

// import IsActiveBadge from "@/components/is-active-badge";
import { useTranslation } from "react-i18next";
import { Roller } from "~/lib/resource-types";
import useRollerStore from "~/stores/roller-store";
import { useFetchPermissions } from "~/stores/permission-store";

export const columns: ColumnDef<Roller>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: true,
  //   enableHiding: false
  // },
  {
    id: "Roller Code",
    accessorKey: "roller_code",
    header: "Roller Code",
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
    id: "Email",
    accessorKey: "email",
    header: () => {
      const { t } = useTranslation();
      return t("label_email");
    },
  },
  {
    id: "Contact",
    accessorKey: "contact",
    header: () => {
      const { t } = useTranslation();
      return t("label_contact");
    },
  },
  {
    id: "Nationality",
    accessorKey: "nationality",
    header: () => {
      const { t } = useTranslation();
      return t("label_nationality");
    },
  },
  {
    id: "Commission",
    accessorKey: "default_commission",
    header: () => {
      const { t } = useTranslation();
      return t("label_commission");
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
      const setStatusData = useRollerStore((state) => state.setStatusData);
      const handleCheckChange = (id: string | number, is_active: boolean) => {
        setStatusData({ id: id, open: true, is_active: is_active });
      };
      const statusText = row.original.is_active ? "active" : "inactive";
      const isActive = row.original.is_active;

      const { permissions } = useFetchPermissions();
      const hasPermissionToUpdate =
        permissions?.data?.includes("UPDATE_ROLLER");

      return (
        <div className="flex items-center gap-2">
          {/* <IsActiveBadge status={statusText}>{statusText}</IsActiveBadge> */}
          {/* {hasPermissionToUpdate && (
            <Switch
              checked={isActive}
              onCheckedChange={() =>
                handleCheckChange(
                  row.original.roller_code,
                  row.original.is_active
                )
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
