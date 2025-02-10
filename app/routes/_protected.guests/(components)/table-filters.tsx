import { useCallback, useMemo } from "react";
import { useSearchParams } from "@remix-run/react";

export function useTableFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("filter[q]");
  const pageNumber = searchParams.get("page[number]");
  const params = new URLSearchParams();

  const setPageNumber = (value: string) => {
    params.set("page[number]", value);
    setSearchParams(params, {
      preventScrollReset: true,
    });
  };

  const setSearchQuery = (value: string) => {
    params.set("filter[q]", value);
    setSearchParams(params, {
      preventScrollReset: true,
    });
  };

  const resetFilters = useCallback(() => {
    setPageNumber("");
    setSearchQuery("");
  }, [searchQuery, pageNumber]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery;
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    pageNumber,
    setPageNumber,
    resetFilters,
    isAnyFilterActive,
  };
}
