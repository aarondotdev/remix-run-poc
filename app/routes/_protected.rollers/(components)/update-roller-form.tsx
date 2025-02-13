"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Fragment, useEffect, useState } from "react";
import { LoaderIcon } from "lucide-react";

import axios from "axios";
import { useTranslation } from "react-i18next";

// import { Switch } from '@/components/ui/switch';
import { useRouter } from "next/navigation";
import { useToast } from "~/components/ui/use-toast";
import { ScrollArea } from "~/components/ui/scroll-area";
import useRollerStore from "~/stores/roller-store";
import { SessionType } from "~/lib/resource-types";
import ErrorMessage from "~/components/shared/error-message";
import { useLocale } from "remix-i18next/react";
import { useRevalidator } from "@remix-run/react";
import { useEnvironmentProvider } from "~/context/environment-provider";
import { useUserContext } from "~/context/user-provider";

const formSchema = z.object({
  roller_code: z.string(),
  name: z.string().min(2, { message: "Name is required." }),
  email: z
    .string()
    .min(2, { message: "Email is required." })
    .email({ message: "Invalid Email." }),
  contact: z.string().min(1, { message: "Contact is required." }),
  nationality: z.string().min(2, { message: "Nationality is required." }),
  is_active: z.boolean(),
  default_commission: z.coerce.number().positive({
    message: "Commission is required and must be a positive number.",
  }),
});

function updateRollerForm() {
  const user = useUserContext();
  const selectedRoller = useRollerStore((state) => state.selectedRoller);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      roller_code: selectedRoller?.roller_code,
      name: selectedRoller?.name,
      email: selectedRoller?.email,
      contact: selectedRoller?.contact,
      nationality: selectedRoller?.nationality,
      default_commission: Number(selectedRoller?.default_commission),
      is_active: selectedRoller?.is_active,
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  const locale = useLocale();
  const { t } = useTranslation();
  const setSheetActions = useRollerStore((state) => state.setSheetActions);

  const revalidator = useRevalidator();
  const env = useEnvironmentProvider();
  const updateEndpoint = `${env.API_BASE_URL}/admin/rollers/${selectedRoller?.roller_code}`;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    axios
      .patch(
        updateEndpoint,
        {
          ...values,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user?.access_token}`,
            "Accept-Language": locale,
          },
        }
      )
      .then((response) => {
        form.reset({}, { keepValues: true });
        router.refresh();
        setSheetActions({ open: false, action: "update" });
        revalidator.revalidate();

        toast({
          variant: "default",
          title: "Success",
          description: response?.data?.message,
        });
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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isDisableSubmit = !form.formState.isDirty;

  return (
    <Fragment>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ScrollArea className="my-6 h-[calc(100vh-130px)] gap-4 space-y-2 rounded-lg">
            <div className="my-6 gap-4 space-y-4 rounded-lg p-4">
              <FormField
                control={form.control}
                name="roller_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roller Code</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="Enter Roller Code"
                        {...field}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("label_name")}</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder={t("placeholder_enter_name")}
                        {...field}
                      />
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
                      <Input
                        required
                        placeholder={t("placeholder_enter_email")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("label_contact")}</FormLabel>
                    <FormControl>
                      <Input required placeholder="Enter Contact" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="Enter Nationality"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="default_commission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commission</FormLabel>
                    <FormControl>
                      <Input
                        min={1}
                        type="number"
                        required
                        placeholder="Enter Commission"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-3 rounded-lg py-3">
                    <FormControl>
                      {/* <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      /> */}
                    </FormControl>
                    <FormLabel className="!mt-0 capitalize">
                      {!!field.value ? "active" : "inactive"}
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </ScrollArea>
        </form>
      </Form>
      <div className="absolute bottom-0 left-0 flex w-full justify-end border border-t-muted bg-background p-3">
        <Button
          disabled={isDisableSubmit}
          onClick={form.handleSubmit(onSubmit)}
          type="submit"
        >
          {isLoading ? (
            <LoaderIcon className="animate-spin repeat-infinite" />
          ) : (
            t("button_save")
          )}
        </Button>
      </div>
    </Fragment>
  );
}

export default updateRollerForm;
