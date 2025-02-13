"use client";
import React from "react";

import { useTableFilter } from "./table-filters";
import { Button, buttonVariants } from "~/components/ui/button";
import { Plus, Router } from "lucide-react";

import { Table } from "@tanstack/react-table";
import UpdateStatusAlert from "./update-status-alert";
import { useFetchPermissions } from "~/stores/permission-store";
import GameTypeSheet from "./game-type-sheet";
import { DataTableSearch } from "~/components/ui/data-table/search";
import { DataTableViewOptions } from "~/components/ui/data-table/data-table-view-options";
import useGameTypeStore from "~/stores/game-type-store";

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

  const setSheetActions = useGameTypeStore((state) => state.setSheetActions);

  const handleAdd = () => {
    setSheetActions({ action: "add", open: true });
  };

  const { permissions } = useFetchPermissions();
  const hasPermissionToCreate = permissions?.data?.includes("CREATE_GAMETYPE");

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
      {hasPermissionToCreate && (
        <Button onClick={handleAdd} className="ml-2">
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      )}
      <UpdateStatusAlert />
      <GameTypeSheet />
    </div>
  );
}

export default TableToolBar;
