"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LoaderIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import ErrorMessage from "@/components/shared/error-message";
import { useUserContext } from "@/context/user-provider";
import { useEnvironmentProvider } from "@/context/environment-provider";
import { Agent } from "@/lib/resource-types";
import { useRevalidator } from "@remix-run/react";
import useGuestStore from "@/stores/guests-store";
import SelectAgent from "@/components/shared-lookups/select-agent";

const formSchema = z.object({
  internal_ref_code: z.string().optional(),
  agent_id: z.coerce.string(),
});

function UpdateGuestForm() {
  const selectedGuest = useGuestStore((state) => state.selectedGuest);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      internal_ref_code: selectedGuest?.internal_ref_code || "",
      agent_id: selectedGuest?.agent?.id as string,
    },
  });
  const user = useUserContext();
  const env = useEnvironmentProvider();
  const revalidator = useRevalidator();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const updateUrl = `${env.API_BASE_URL}/admin/players/${selectedGuest?.player_code}`;
  const setSheetActions = useGuestStore((state) => state.setSheetActions);
  const sheetActions = useGuestStore((state) => state.sheetActions);
  const [selectedAgent, setSelectedAgent] = useState<Agent | undefined>();
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    axios
      .patch(
        updateUrl,
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
        setSheetActions({ ...sheetActions, open: false });
        setSelectedAgent(undefined);
        revalidator.revalidate();
        form.reset();
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="my-6 gap-4 space-y-4 rounded-lg p-4">
          <FormField
            control={form.control}
            name="agent_id"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel>Agent</FormLabel>
                <SelectAgent
                  identifier="id"
                  value={field.value as string}
                  selectedItem={
                    (selectedAgent as Agent) || selectedGuest?.agent
                  }
                  setSelectedItem={setSelectedAgent}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="internal_ref_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="absolute bottom-[1rem] right-[1rem]">
          {isLoading ? (
            <LoaderIcon className="animate-spin repeat-infinite" />
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default UpdateGuestForm;
