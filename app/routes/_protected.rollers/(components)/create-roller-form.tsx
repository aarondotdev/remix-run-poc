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

import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

import axios from "axios";

import { useTranslation } from "react-i18next";
// import { Switch } from '@/components/ui/switch';

import { useToast } from "@/components/ui/use-toast";
import ErrorMessage from "@/components/shared/error-message";
import { useLocale } from "remix-i18next/react";
import useRollerStore from "@/stores/roller-store";
import { useUserContext } from "@/context/user-provider";
import { SessionType } from "@/lib/resource-types";
import { useEnvironmentProvider } from "@/context/environment-provider";
import { useRevalidator } from "@remix-run/react";

const formSchema = z.object({
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

function CreateRollerForm() {
  const user = useUserContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      nationality: "",
      default_commission: "" as unknown as number,
      is_active: true,
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  const locale = useLocale();
  const setSheetActions = useRollerStore((state) => state.setSheetActions);
  const { t } = useTranslation();
  const revalidator = useRevalidator();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const env = useEnvironmentProvider();
    const agentEndpoint = `${env.API_BASE_URL}/admin/rollers`;

    axios
      .post(
        agentEndpoint,
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
        form.reset();
        router.refresh();
        setSheetActions({ open: false, action: "add" });
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

  return (
    <Fragment>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ScrollArea className="my-6 h-[calc(100vh-130px)] gap-4 space-y-2 rounded-lg">
            <div className="my-6 gap-4 space-y-4 rounded-lg p-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("label_name")}</FormLabel>
                    <FormControl>
                      <Input
                        autoFocus
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
                    <FormLabel> {t("label_contact")}</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder={t("label_contact")}
                        {...field}
                      />
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
                        {...field}
                        type="number"
                        required
                        min={1}
                        placeholder="Enter Commission"
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
        <Button onClick={form.handleSubmit(onSubmit)} type="submit">
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

export default CreateRollerForm;
