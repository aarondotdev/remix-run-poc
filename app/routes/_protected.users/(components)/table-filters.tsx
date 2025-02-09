'use client';

import { searchParams } from '@/lib/search-params';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';

// export const GENDER_OPTIONS = [
//   { value: 'male', label: 'Male' },
//   { value: 'female', label: 'Female' }
// ];

export function useTableFilter() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'filter[q]',
    searchParams['filter[q]']
      .withOptions({ shallow: false, history: 'push' })
      .withDefault('')
  );

  //   const [genderFilter, setGenderFilter] = useQueryState(
  //     'gender',
  //     searchParams.gender.withOptions({ shallow: false }).withDefault('')
  //   );

  const [page, setPage] = useQueryState(
    'page[number]',
    searchParams['page[number]'].withDefault(1)
  );

  const resetFilters = useCallback(() => {
    setSearchQuery(null);

    setPage(1);
  }, [setSearchQuery, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery;
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive
  };
}
