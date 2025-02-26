"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Fragment, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CrossCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Check, InfoIcon, LoaderIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import useUserStore from "@/stores/user-store";
import axios from "axios";
import ErrorMessage from "@/components/shared/error-message";
import SelectedRoles from "./selected-roles";
import SelectedJunkets from "./selected-junkets";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useUserContext } from "@/context/user-provider";
import { useEnvironmentProvider } from "@/context/environment-provider";
import { useLookupFetcher } from "@/lib/lookup-fetcher";
import { Junket, Role } from "@/lib/resource-types";
import { useRevalidator } from "@remix-run/react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(4, { message: "Email is required." })
    .email("Invalid Email"),
  role_ids: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
        name: z.string(),
      })
    )
    .min(1, "At least one role is required."),
  junket_site_ids: z
    .array(
      z.object({
        id: z.coerce.string(),
        code: z.string(),
        name: z.string(),
      })
    )
    .min(1, "At least one junket is required."),
});

function UpdateUserForm() {
  const selectedUser = useUserStore((state) => state.selectedUser);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: selectedUser?.name,
      email: selectedUser?.email,
      role_ids: selectedUser?.roles,
      junket_site_ids: (selectedUser?.junketSites as any) || [],
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { isDirty } = form.formState;
  const setSheetActions = useUserStore((state) => state.setSheetActions);
  const user = useUserContext();
  const env = useEnvironmentProvider();
  const revalidator = useRevalidator();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const url = `${env.API_BASE_URL}/admin/users/${selectedUser?.id}`;
    setIsLoading(true);

    const payload = {
      ...values,
      role_ids: roleIds?.map((item) => item?.id),
      junket_site_ids: junketSiteIds?.map((item) => item?.id),
    };

    axios
      .put(
        url,
        {
          ...payload,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      )
      .then((response) => {
        form.reset({}, { keepValues: true });
        revalidator.revalidate();
        toast({
          title: "Success",
          description: response?.data?.message,
          variant: "default",
        });
        setSheetActions({ action: "update", open: false });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: <ErrorMessage errors={error?.response?.data?.error} />,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleRemoveRole = (roleId: string) => {
    form.setValue(
      "role_ids",
      form.getValues("role_ids").filter((r: any) => r.id != roleId),
      { shouldDirty: true }
    );
  };
  const handleRemoveJunket = (junketId: string) => {
    form.setValue(
      "junket_site_ids",
      form.getValues("junket_site_ids").filter((j: any) => j.id != junketId),
      { shouldDirty: true }
    );
  };

  const junketSiteEndpoint = `${env.API_BASE_URL}/admin/junket-sites/?filter[is_active]=1`;
  const rolesEndpoint = `${env.API_BASE_URL}/admin/roles`;
  const { lookupData, isLookupLoading, fetchLookup } = useLookupFetcher();
  const roleIds = form.watch("role_ids");
  const junketSiteIds = form.watch("junket_site_ids");

  return (
    <Fragment>
      <Form {...form}>
        <form>
          <ScrollArea className="my-6 h-[calc(100vh-130px)] gap-4 space-y-2 rounded-lg">
            <div className="my-6 gap-4 space-y-4 rounded-lg p-4">
              <Alert variant="info" className="flex gap-2">
                <InfoIcon className="h-4 w-4 flex-shrink-0" />
                <AlertDescription className="text-xs">
                  To ensure the updated user data is reflected in the session,
                  please notify the user to log out and log back in.
                </AlertDescription>
              </Alert>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input required placeholder="Enter Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input required placeholder="Enter Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role_ids"
                render={({ field: { onChange, value } }) => (
                  <FormItem className="col-span-6">
                    <FormLabel>Roles</FormLabel>
                    {roleIds?.length !== 0 && (
                      <div className="flex flex-wrap gap-2 rounded-sm border border-dashed border-muted px-4 py-2">
                        <SelectedRoles
                          onRemove={handleRemoveRole}
                          roles={roleIds}
                        />
                      </div>
                    )}
                    <Popover
                      onOpenChange={() => {
                        fetchLookup(rolesEndpoint, "roles");
                      }}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="w-full border-dashed"
                          >
                            <PlusCircledIcon className="mr-2 h-4 w-4" />
                            Add Roles
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput
                            className="w-full"
                            placeholder="Search"
                          />
                          <CommandList>
                            {isLookupLoading["roles"] ? (
                              <div className="flex h-10 w-full items-center justify-center">
                                <LoaderIcon className="animate-spin repeat-infinite" />
                              </div>
                            ) : (
                              <>
                                <CommandEmpty>No items found</CommandEmpty>
                                <CommandGroup>
                                  {lookupData["roles"]?.data?.map(
                                    (option: Role) => (
                                      <CommandItem
                                        key={option.id}
                                        onSelect={() => {
                                          const newValue = roleIds.some(
                                            (v) => v.name === option.name
                                          )
                                            ? value.filter(
                                                (v) => v.name !== option.name
                                              )
                                            : [...value, option];
                                          form.setValue("role_ids", newValue, {
                                            shouldDirty: true,
                                          });
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            roleIds.some(
                                              (v) => v.id === option.id
                                            )
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {option.label}
                                      </CommandItem>
                                    )
                                  )}
                                </CommandGroup>
                              </>
                            )}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="junket_site_ids"
                render={({ field: { value } }) => (
                  <FormItem className="col-span-7">
                    <FormLabel>Junket</FormLabel>
                    {junketSiteIds?.length !== 0 && (
                      <div className="flex flex-wrap gap-2 rounded-sm border border-dashed border-muted px-4 py-2">
                        <SelectedJunkets
                          onRemove={handleRemoveJunket}
                          junkets={junketSiteIds}
                        />
                      </div>
                    )}
                    <Popover
                      onOpenChange={() => {
                        fetchLookup(junketSiteEndpoint, "junkets");
                      }}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full border-dashed"
                          >
                            <PlusCircledIcon className="mr-2 h-4 w-4" />
                            Select Junkets
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput
                            className="w-full"
                            placeholder="Search junket..."
                          />
                          <CommandList>
                            {isLookupLoading["junkets"] ? (
                              <div className="flex h-10 w-full items-center justify-center">
                                <LoaderIcon className="animate-spin repeat-infinite" />
                              </div>
                            ) : (
                              <>
                                <CommandEmpty>No junket found.</CommandEmpty>
                                <CommandGroup>
                                  {lookupData["junkets"]?.data?.map(
                                    (junket: Junket) => (
                                      <CommandItem
                                        value={junket.name}
                                        key={junket.id}
                                        onSelect={() => {
                                          const newValue = junketSiteIds?.some(
                                            (v) => v.id === junket.id
                                          )
                                            ? value.filter(
                                                (v) => v.id !== junket.id
                                              )
                                            : [...value, junket];
                                          form.setValue(
                                            "junket_site_ids",
                                            newValue as any,
                                            { shouldDirty: true }
                                          );
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            junketSiteIds?.some(
                                              (v) => v.id === junket?.id
                                            )
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {junket.name}
                                      </CommandItem>
                                    )
                                  )}
                                </CommandGroup>
                              </>
                            )}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </ScrollArea>
        </form>
      </Form>

      <div className="absolute bottom-0 left-0 flex w-full justify-end border border-t-muted bg-background p-3">
        <Button
          onClick={form.handleSubmit(onSubmit)}
          type="button"
          disabled={!isDirty}
        >
          {isLoading ? (
            <LoaderIcon className="animate-spin repeat-infinite" />
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </Fragment>
  );
}

export default UpdateUserForm;
