import { DataTableSearch } from '@/components/ui/data-table/search';
import { useTableFilter } from './table-filters';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import UserSheet from './user-sheet';
import useUserStore from '@/stores/user-store';
import { Table } from '@tanstack/react-table';
import { DataTableViewOptions } from '@/components/ui/data-table/data-table-view-options';
import { useUserContext } from '@/context/user-provider';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

function TableToolBar<TData>({ table }: DataTableToolbarProps<TData>) {
  const sheetActions = useUserStore((state) => state.sheetActions);
  const setSheetActions = useUserStore((state) => state.setSheetActions);
  const data = useUserContext()

  const hasPermissionToCreate = data?.permissions?.includes('user.create');

  const handleAdd = () => {
    setSheetActions({ action: 'add', open: true });
  };

  const {
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setSearchQuery,
    setPageNumber
  } = useTableFilter();
  return (
    <div className="flex w-full justify-between gap-x-2">
      <DataTableSearch
        searchKey="name"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPageNumber}
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
      {/*
      <ActionModal /> */}
    </div>
  );
}

export default TableToolBar;
