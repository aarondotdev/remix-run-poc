"use client";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useToast } from "~/components/ui/use-toast";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import useGuestStore from "~/stores/guests-store";
import { useEnvironmentProvider } from "~/context/environment-provider";
import ErrorMessage from "~/components/shared/error-message";
import { Agent } from "~/lib/resource-types";
import SelectAgent from "~/components/shared-lookups/select-agent";
import { useUserContext } from "~/context/user-provider";
import { useRevalidator } from "@remix-run/react";

type DialogContentType = {
  [key: string]: any;
};

export function AssignAgentModal() {
  const setSheetActions = useGuestStore((state) => state.setSheetActions);
  const setSelectedGuest = useGuestStore((state) => state.setSelectedGuest);
  const sheetActions = useGuestStore((state) => state.sheetActions);
  const selectedGuest = useGuestStore((state) => state.selectedGuest);

  const dialogContent: DialogContentType = {
    "assign-agent": {
      title: "Assign Agent",
      header: "",
      description: `Select agent to assign to this guest.`,
      content: "",
    },
  };

  const isActionAssignAgent = sheetActions.action === "assign-agent";

  const formSchema = z
    .object({
      agent_id: z.string().optional(),
    })
    .refine((input) => !(isActionAssignAgent && !input.agent_id), {
      message: "Agent is required.",
      path: ["agent_id"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agent_id: undefined,
    },
    mode: "onChange",
  });

  const env = useEnvironmentProvider();
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
  const { toast } = useToast();
  const updateUrl = `${env.API_BASE_URL}/admin/players/${selectedGuest?.player_code}`; // replace by assign to agent endpoint
  const revalidator = useRevalidator();
  const user = useUserContext();

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
        setSelectedGuest(undefined);
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

  const handleCancel = async () => {
    setSelectedAgent(undefined);
    setSheetActions({ ...sheetActions, open: false });
    if (!!form.getValues("agent_id")) {
      form.reset();
    }
  };

  const isModalOpen = sheetActions.open && isActionAssignAgent;
  const [selectedAgent, setSelectedAgent] = useState<Agent | undefined>(
    selectedGuest?.agent
  );

  return (
    <Dialog open={isModalOpen}>
      <DialogContent
        className="sm:max-w-[460px]"
        hideCloseButton
        onInteractOutside={handleCancel}
        onEscapeKeyDown={handleCancel}
      >
        <DialogHeader>
          <DialogTitle className="capitalize">
            {dialogContent[sheetActions.action]?.title}
          </DialogTitle>
          <DialogDescription>
            {dialogContent[sheetActions.action]?.header}
          </DialogDescription>
        </DialogHeader>
        {dialogContent[sheetActions.action]?.description}
        {dialogContent[sheetActions.action]?.content}
        <Form {...form}>
          <form>
            {isActionAssignAgent && (
              <>
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
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                      />
                      <FormMessage />
                      <FormDescription>
                        Please assign a agent for this guest.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </>
            )}
          </form>
        </Form>

        <DialogFooter>
          <Button
            type="button"
            disabled={isLoading}
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            {isLoading ? (
              <LoaderIcon className="animate-spin repeat-infinite" />
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
