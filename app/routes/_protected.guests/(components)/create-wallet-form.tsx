import { zodResolver } from "@hookform/resolvers/zod";
import { useRevalidator } from "@remix-run/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Fragment, useState } from "react";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useEnvironmentProvider } from "@/context/environment-provider";
import { useUserContext } from "@/context/user-provider";
import { Currency } from "@/lib/resource-types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import SelectCurrency from "@/components/shared-lookups/select-currency";
import { LoaderIcon } from "lucide-react";

interface WalletFormProps {
  player_id: string;
}

const formSchema = z.object({
  player_id: z.string(),
  currency_code: z.string(),
  name: z.string(),
  currency_alias: z.string(),
});

const CreateWalletForm: React.FC<WalletFormProps> = ({ player_id }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      player_id: player_id.toString(),
      currency_code: "",
      name: "",
      currency_alias: "",
    },
  });
  const { toast } = useToast();
  const user = useUserContext();
  const env = useEnvironmentProvider();
  const revalidator = useRevalidator();
  const createWalletEndpoint = `${env.API_BASE_URL}/admin/wallets`;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    axios
      .post(
        createWalletEndpoint,
        {
          ...values,
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
        form.reset();
        revalidator.revalidate();
        setSelectedCurrency(undefined);

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
          // description: <ErrorMessage errors={error?.response?.data?.error} />
          description: error?.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<
    Currency | undefined
  >();

  return (
    <Fragment>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ScrollArea className="my-6 h-[calc(100vh-130px)] gap-4 space-y-2 rounded-lg">
            <div className="my-6 gap-4 space-y-4 rounded-lg p-4">
              <FormField
                control={form.control}
                name="player_id"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="hidden"
                        placeholder="Enter Player Code"
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
                name="player_id"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SelectCurrency
                        value={field.value}
                        onChange={field.onChange}
                        selectedItem={selectedCurrency as Currency}
                        setSelectedItem={(value) => {
                          setSelectedCurrency(value);
                          form.setValue("currency_code", value.code);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
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
            "Save"
          )}
        </Button>
      </div>
    </Fragment>
  );
};

export default CreateWalletForm;
