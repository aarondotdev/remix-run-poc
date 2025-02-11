"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Cashier } from "~/lib/resource-types";

export const columns: ColumnDef<Cashier>[] = [
  {
    id: "Cashier Code",
    accessorKey: "cashier_code",
    header: "Cashier Code",
  },
  {
    id: "Name",
    accessorKey: "user.name",
    header: "Name",
  },
  {
    id: "Email",
    accessorKey: "user.email",
    header: "Email",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
