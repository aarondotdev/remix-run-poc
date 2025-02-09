'use client';
import React from 'react';
import { DataTableSearch } from '@/components/ui/table/search';
import { useUserContext } from '@/contexts/user-context';
import { useTableFilter } from './table-filters';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import UserSheet from './user-sheet';
import { Role } from '@/types';
import useUserStore from '@/stores/user-store';
import { useFetchPermissions } from '@/stores/permission-store';
import { Table } from '@tanstack/react-table';
import { DataTableViewOptions } from '@/components/ui/table/data-table-view-options';
import { ActionModal } from './actions-modal';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

function TableToolBar<TData>({ table }: DataTableToolbarProps<TData>) {
  // const { sheetActions, setSheetActions } = useUserContext();
  const sheetActions = useUserStore((state) => state.sheetActions);
  const setSheetActions = useUserStore((state) => state.setSheetActions);
  const { permissions } = useFetchPermissions();
  const hasPermissionToCreate = permissions?.data?.includes('CREATE_USER');

  const handleAdd = () => {
    setSheetActions({ action: 'add', open: true });
  };

  const {
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useTableFilter();
  return (
    <div className="flex w-full justify-between gap-x-2">
      <DataTableSearch
        searchKey="name"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
      {/* <DataTableFilterBox
        filterKey="gender"
        title="Gender"
        options={GENDER_OPTIONS}
        setFilterValue={setGenderFilter}
        filterValue={genderFilter}
      />
      <DataTableResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      /> */}
      <DataTableViewOptions table={table} />
      {hasPermissionToCreate && (
        <Button variant="default" onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      )}

      <UserSheet />
      <ActionModal />
    </div>
  );
}

export default TableToolBar;
