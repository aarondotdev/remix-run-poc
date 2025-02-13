import { DataTableSearch } from "~/components/ui/data-table/search";
import { useTableFilter } from "./table-filters";
import { Plus } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "~/components/ui/data-table/data-table-view-options";
import { useUserContext } from "~/context/user-provider";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Link } from "@remix-run/react";

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

  const user = useUserContext();
  const hasPermissionToAdd = user?.permissions?.includes("CREATE_ROLE");

  return (
    <div className="flex w-full justify-between">
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
      {hasPermissionToAdd && (
        <Link
          to="/manage-roles/create"
          className={cn(buttonVariants({ variant: "default" }), "ml-2")}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Link>
      )}
    </div>
  );
}

export default TableToolBar;
