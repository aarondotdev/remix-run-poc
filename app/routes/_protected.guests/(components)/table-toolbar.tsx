import { DataTableSearch } from "@/components/ui/data-table/search";
import { useTableFilter } from "./table-filters";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/user-provider";
import useGuestStore from "@/stores/guests-store";
import GuestSheet from "./guest-sheet";
import { AssignAgentModal } from "./assign-agent-modal";

function TableToolBar() {
  const setSheetActions = useGuestStore((state) => state.setSheetActions);
  const user = useUserContext();
  const hasPermissionToCreate = user?.permissions?.includes("player.create");

  const handleAdd = () => {
    setSheetActions({ action: "add", open: true });
  };

  const {
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
  } = useTableFilter();
  return (
    <div className="flex w-full justify-between">
      <DataTableSearch
        searchKey="name"
        searchQuery={searchQuery as string}
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

      <GuestSheet />
      <AssignAgentModal />
      {hasPermissionToCreate && <Button onClick={handleAdd}>Add Guest</Button>}
    </div>
  );
}

export default TableToolBar;
