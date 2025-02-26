import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Guest } from "@/lib/resource-types";
import { Badge } from "@/components/ui/badge";
import { Link } from "@remix-run/react";
import { cn, displayValueOrDash } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const columns: ColumnDef<Guest>[] = [
  {
    accessorKey: "ID",
    header: "ID",
    cell: ({ row }) => {
      return (
        <Link
          className={cn(
            buttonVariants({ variant: "link" }),
            "m-0 h-auto p-0 font-semibold"
          )}
          to={`/manage-guests/view/${row.original.player_code}`}
        >
          {row.original.player_code}
        </Link>
      );
    },
  },
  {
    id: "Code",
    accessorKey: "internal_ref_code",
    header: "Code",
  },
  {
    id: "Name",
    accessorKey: "user.name",
    header: "Name",
    cell: ({ row }) => {
      return <>{displayValueOrDash(row.original.user?.name)}</>;
    },
  },
  {
    accessorKey: "user.phone_number",
    header: "Phone Number",
    cell: ({ row }) => {
      return <>{displayValueOrDash(row.original.user?.phone_number)}</>;
    },
  },
  {
    accessorKey: "user.email",
    header: "Email",
  },
  {
    accessorKey: "agent.name",
    header: "Agent"
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
