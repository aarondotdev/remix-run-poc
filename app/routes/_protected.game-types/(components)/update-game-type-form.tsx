"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Fragment, useState } from "react";
import { LoaderIcon } from "lucide-react";

import axios from "axios";
import { useTranslation } from "react-i18next";
// import { Switch } from '@/components/ui/switch';
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import useGameTypeStore from "@/stores/game-type-store";
import { SessionType } from "@/lib/resource-types";
import { API_BASE_URL } from "@/services/authenticate";
import ErrorMessage from "@/components/shared/error-message";
import { useUserContext } from "@/context/user-provider";
import { useRevalidator } from "@remix-run/react";
import { useLocale } from "remix-i18next/react";
import { useEnvironmentProvider } from "@/context/environment-provider";

const formSchema = z.object({
  code: z.string(),
  name: z.string(),
  description: z.string(),
  is_active: z.boolean(),
});

function UpdateGameTypeForm() {
  const user = useUserContext();
  const selectedGameType = useGameTypeStore((state) => state.selectedGameType);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      code: selectedGameType?.code,
      name: selectedGameType?.name,
      description: selectedGameType?.description,
      is_active: selectedGameType?.is_active,
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  const locale = useLocale();
  const setSheetActions = useGameTypeStore((state) => state.setSheetActions);
  const { t } = useTranslation();
  const revalidator = useRevalidator();
  const env = useEnvironmentProvider();

  const updateEndpoint = `${env.API_BASE_URL}/admin/game-types/${selectedGameType?.code}`;

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
        setSheetActions({ open: false, action: "update" });
        router.refresh();
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
          <div className="my-6 gap-4 space-y-4 rounded-lg p-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("label_code")}</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder={t("placeholder_enter_code")}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("label_description")}</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder={t("placeholder_enter_description")}
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

export default UpdateGameTypeForm;
