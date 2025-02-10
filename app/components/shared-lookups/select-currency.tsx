import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { FormControl } from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { Check, LoaderIcon } from "lucide-react";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";
import { useDebouncedCallback } from "use-debounce";
import { Currency } from "~/lib/resource-types";
import { useUserContext } from "~/context/user-provider";
import { useEnvironmentProvider } from "~/context/environment-provider";
import { useRevalidator } from "@remix-run/react";
import { fetchData, getHeaders } from "~/lib/fetch-data";
import normalizer from "~/lib/json-normalizer";
import { CurrencyItem } from "../shared/currency-item";
import { CaretSortIcon } from "@radix-ui/react-icons";
import qs from "qs";

interface IDynamicComboBox {
  disabled?: boolean;
  identifier?: "code" | "id";
  selectedItem: Currency;
  setSelectedItem: (value: Currency) => void;
  value: string;
  onChange: (value: string) => void;
  params?: string;
}

const SelectCurrency: FC<IDynamicComboBox> = ({
  disabled,
  params = "",
  value,
  onChange,
  selectedItem,
  setSelectedItem,
  identifier,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>();
  const user = useUserContext();
  const env = useEnvironmentProvider();
  const options = getHeaders(user?.access_token);

  const fetcher = useCallback(
    async (key: string) => {
      const data = await fetchData(key, options);
      return normalizer(data).data;
    },
    [options]
  );

  const queryString = qs.stringify({
    "page[size]": 15,
    "filter[is_active]": "1",
    "filter[q]": search,
  });
  const url = `${env.API_BASE_URL}/admin/currencies/${queryString}`;

  const { data, error, size, setSize, isValidating, mutate, isLoading } =
    useSWRInfinite((index) => `${url}&page[number]=${index + 1}`, fetcher);

  const dataOptions = data ? [].concat(...(data as [])) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && (data[data.length - 1]?.length as number) < 15);
  const debouncedSearch = useDebouncedCallback(setSearch, 500);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isLoadingMore && !isReachingEnd) {
      setSize(size + 1);
    }
  }, [inView, isLoadingMore]);

  return (
    <>
      <Popover
        open={isOpen}
        onOpenChange={(value) => {
          if (search) {
            setSearch("");
          }
          setIsOpen(value);
        }}
      >
        <PopoverTrigger asChild disabled={disabled}>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className="flex w-full items-center justify-between border-dashed px-3 font-normal"
            >
              {selectedItem ? (
                <CurrencyItem currency={selectedItem} />
              ) : (
                "Select Currency"
              )}
              <CaretSortIcon className="h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              className="w-full"
              placeholder="Search item..."
              onValueChange={debouncedSearch}
            />
            <CommandList>
              <>
                {isLoading ? (
                  <div className="bottom-0 flex h-10 w-full items-center justify-center bg-background">
                    <LoaderIcon className="animate-spin repeat-infinite" />
                  </div>
                ) : (
                  <>
                    {dataOptions?.length === 0 ? (
                      <div className="flex h-12 items-center justify-center text-center">
                        <p className="text-sm text-foreground/70">Search</p>
                      </div>
                    ) : (
                      <>
                        <CommandEmpty>No item found</CommandEmpty>
                        <CommandGroup className="relative">
                          {dataOptions?.map((item: Currency, index: number) => (
                            <CommandItem
                              value={
                                identifier == "code"
                                  ? item.code
                                  : item.id.toString()
                              }
                              key={item.id}
                              onSelect={(value) => {
                                setIsOpen(false);
                                onChange(value);
                                setSelectedItem(item);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  item.id == value || item.code == value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />

                              <CurrencyItem currency={item} />
                              {index === dataOptions?.length - 1 && (
                                <div ref={ref} style={{ height: "1px" }} />
                              )}
                            </CommandItem>
                          ))}
                          {isLoadingMore && (
                            <div className="bottom-0 flex h-10 w-full items-center justify-center bg-background">
                              <LoaderIcon className="animate-spin repeat-infinite" />
                            </div>
                          )}
                        </CommandGroup>
                      </>
                    )}
                  </>
                )}
              </>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default SelectCurrency;
