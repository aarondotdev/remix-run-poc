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
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Check, LoaderIcon } from "lucide-react";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";
import { useDebouncedCallback } from "use-debounce";
import { Agent } from "~/lib/resource-types";
import { useUserContext } from "~/context/user-provider";
import { fetchData, getHeaders } from "~/lib/fetch-data";
import normalizer from "~/lib/json-normalizer";
import { useEnvironmentProvider } from "~/context/environment-provider";
import qs from "qs";
import { cn } from "~/lib/utils";

interface IDynamicComboBox {
  identifier?: "code" | "id";
  setSelectedItem: (value: Agent) => void;
  selectedItem: Agent;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const SelectAgent: FC<IDynamicComboBox> = ({
  identifier,
  value,
  onChange,
  selectedItem,
  setSelectedItem,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = useUserContext();
  const [search, setSearch] = useState<string>();
  const options = getHeaders(user.access_token);
  const env = useEnvironmentProvider();

  const fetcher = useCallback(
    async (key: string) => {
      const data = await fetchData(key, options);
      return normalizer(data).data;
    },
    [options]
  );

  const queryString = qs.stringify({
    "page[size]": 15,
    "filter[q]": search,
    "filter[is_active]": "1",
  });

  const url = `${env.API_BASE_URL}/admin/agents/?${queryString}`;

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
              {selectedItem ? selectedItem?.name : "Select Agent"}
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
                        <CommandEmpty>No items found</CommandEmpty>
                        <CommandGroup className="relative">
                          {dataOptions?.map((item: Agent, index: number) => (
                            <CommandItem
                              value={
                                identifier == "code"
                                  ? item.agent_code
                                  : item.id.toString()
                              }
                              key={item.agent_code + index}
                              onSelect={(value) => {
                                setIsOpen(false);
                                onChange(value);
                                setSelectedItem(item);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  item.id == value ||
                                    item.agent_code == value ||
                                    selectedItem?.id == item.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {item.name}

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

export default SelectAgent;
