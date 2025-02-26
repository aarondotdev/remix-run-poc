import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { LoaderIcon } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Options } from 'nuqs';

interface DataTableSearchProps {
  searchKey: string;
  searchQuery: string;
  setStatusQuery?: (
    value: string | ((old: string) => string | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
  setSearchQuery: (
    value: string | ((old: string) => string | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
  setSearchFilterId?: (
    value: string | ((old: string) => string | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
  setSearchFilterDate?: (
    value: string | ((old: string) => string | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
  setColorQuery?: (
    value: string | ((old: string) => string | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
  setPage: <Shallow>(
    value: number | ((old: number) => number | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
}

export function DataTableSearch({
  setStatusQuery,
  searchKey,
  setSearchFilterId,
  searchQuery,
  setSearchQuery,
  setPage,
  setSearchFilterDate,
  setColorQuery
}: DataTableSearchProps) {
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    setLocalSearchQuery(searchQuery ?? '');
  }, [searchQuery]);

  const handleSearch = (value: string) => {
    setSearchQuery(value, { startTransition });
    setPage(1); // Reset page to 1 when search changes

    if (setColorQuery) {
      setColorQuery('');
    }
    if (setSearchFilterDate) {
      setSearchFilterDate('');
    }
    if (setSearchFilterId) {
      setSearchFilterId('');
    }
    if (setStatusQuery) {
      setStatusQuery('');
    }
  };

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery ?? '');

  const debouncedSearch = useDebouncedCallback(handleSearch, 500)

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    debouncedSearch(value);
  };


  return (
    <div className="relative w-full md:max-w-[16rem]">
      <Input
        placeholder={`Search...`}
        value={localSearchQuery ?? ''}
        onChange={onChangeHandler}
        isLoading={isLoading}
        className={cn('w-full')}
      />
      {isLoading && (
        <LoaderIcon className="absolute right-3 top-[7px] animate-spin repeat-infinite" />
      )}
    </div>
  );
}
