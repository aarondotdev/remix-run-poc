import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Role, Users } from "@/lib/resource-types";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader value="name" column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader value="email" column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("email")}
          </span>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "roles",
    header: "Roles",
    cell: ({ row }) => {
      const roles: Role[] = row.getValue("roles");
      return (
        <div className="flex max-w-[500px] flex-wrap gap-2 truncate font-medium">
          {roles?.map((role: Role) => (
            <Badge role={role.label} key={role.name + role.id}>
              {role.label}
            </Badge>
          ))}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "junketSites",
    header: "Junket(s)",
    cell: ({ row }) => {
      return (
        <div className="flex max-w-[500px] flex-wrap gap-2 truncate font-medium">
          {row.original?.junketSites?.map((item) => (
            <Badge key={item.code}>{item.name}</Badge>
          ))}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
