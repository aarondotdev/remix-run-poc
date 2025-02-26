import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Permission, Role } from "@/lib/resource-types";
import { Badge } from "@/components/ui/badge";
import { Link } from "@remix-run/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const columns: ColumnDef<Role>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const roleName: any = row.getValue("name");

      return (
        <Link
          key={row.original.id}
          className={cn(
            buttonVariants({ variant: "link" }),
            "m-0 h-auto p-0 font-semibold"
          )}
          to={`/roles/view/${row.original.id}`}
        >
          {roleName}
        </Link>
      );
    },
  },
  {
    id: "Label",
    accessorKey: "label",
    header: "Label",
  },
  {
    id: "Permissions",
    accessorKey: "permissions",
    header: "Permissions",
    cell: ({ row }) => {
      return (
        <div className="flex flex-wrap gap-1">
          {row.original?.permissions?.map((item: Permission) => (
            <Badge key={item?.id}>{item?.label}</Badge>
          ))}
        </div>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
