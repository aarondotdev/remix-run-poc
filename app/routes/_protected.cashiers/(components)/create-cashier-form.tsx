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
import { Fragment, useState } from "react";
import { LoaderIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import ErrorMessage from "@/components/shared/error-message";
import { ScrollArea } from "@/components/ui/scroll-area";
import useCashierStore from "@/stores/cashier-store";
import { useEnvironmentProvider } from "@/context/environment-provider";
import { useUserContext } from "@/context/user-provider";
import { useRevalidator } from "@remix-run/react";
import { User } from "@/lib/resource-types";
import SelectUser from "@/components/shared-lookups/select-user";

const formSchema = z.object({
  user_id: z.string(),
});

function CreateCashierForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      user_id: undefined,
    },
  });
  const { toast } = useToast();
  const setSheetActions = useCashierStore((state) => state.setSheetActions);
  const env = useEnvironmentProvider();
  const user = useUserContext();
  const revalidator = useRevalidator();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const url = `${env.API_BASE_URL}/admin/cashiers`;

    axios
      .post(
        url,
        {
          ...values,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )
      .then((response) => {
        form.reset();
        setSelectedUser(undefined);
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
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  return (
    <Fragment>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ScrollArea className="my-6 h-[calc(100vh-130px)] gap-4 space-y-2 rounded-lg">
            <div className="my-6 gap-4 space-y-4 rounded-lg p-4">
              <FormField
                control={form.control}
                name="user_id"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>User</FormLabel>
                    <SelectUser
                      selectedItem={selectedUser as User}
                      setSelectedItem={setSelectedUser}
                      value={field.value}
                      onChange={field.onChange}
                    />
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
}

export default CreateCashierForm;
