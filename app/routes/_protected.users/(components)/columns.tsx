'use client';
import { Role, Users } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import RoleBadge from '@/components/ui/role-badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<Users>[] = [

  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader value="name" column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('name')}
          </span>
        </div>
      );
    },
    enableSorting: true
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader value="email" column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('email')}
          </span>
        </div>
      );
    },
    enableSorting: true
  },
  {
    accessorKey: 'roles',
    header: () => {
      const t = useTranslations('Translation');
      return t('header_roles');
    },
    cell: ({ row }) => {
      const roles: Role[] = row.getValue('roles');
      return (
        <div className="flex max-w-[500px] flex-wrap gap-2 truncate font-medium">
          {roles?.map((role: Role) => (
            <RoleBadge role={role.label} key={role.name + role.id} />
          ))}
        </div>
      );
    },
    enableSorting: false
  },
  {
    accessorKey: 'junketSites',
    header: 'Junket(s)',
    cell: ({ row }) => {
      return (
        <div className="flex max-w-[500px] flex-wrap gap-2 truncate font-medium">
          {row.original?.junketSites?.map((item) => (
            <Badge key={item.code} variant="junket">
              {item.name}
            </Badge>
          ))}
        </div>
      );
    },
    enableSorting: false
  },
  {
    id: 'actions',
    header: () => {
      const t = useTranslations('Translation');
      return t('label_actions');
    },
    cell: ({ row }) => <CellAction data={row.original} />
  }
];

//test build
