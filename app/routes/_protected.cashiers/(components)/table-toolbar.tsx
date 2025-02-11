import { DataTableSearch } from "~/components/ui/data-table/search";
import { useTableFilter } from "./table-filters";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "~/components/ui/data-table/data-table-view-options";
import useCashierStore from "~/stores/cashier-store";
import CashierSheet from "./cashier-sheet";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

function TableToolBar<TData>({ table }: DataTableToolbarProps<TData>) {
  const {
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
  } = useTableFilter();

  const setSheetActions = useCashierStore((state) => state.setSheetActions);

  const handleAdd = () => {
    setSheetActions({ action: "add", open: true });
  };

  return (
    <div className="mb-2 flex w-full items-center justify-between">
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
      <Button onClick={handleAdd} className="ml-2">
        <Plus className="mr-2 h-4 w-4" /> Add New
      </Button>
      <CashierSheet />
    </div>
  );
}

export default TableToolBar;
