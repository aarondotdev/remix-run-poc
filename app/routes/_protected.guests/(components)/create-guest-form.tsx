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
import { Check, LoaderIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import ErrorMessage from "@/components/shared/error-message";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserContext } from "@/context/user-provider";
import { useLookupFetcher } from "@/lib/lookup-fetcher";
import { useRevalidator } from "@remix-run/react";
import { useEnvironmentProvider } from "@/context/environment-provider";
import { Agent, KYCDOcumentType, Membership } from "@/lib/resource-types";
import { fetchData, getHeaders } from "@/lib/fetch-data";
import normalizer from "@/lib/json-normalizer";
import { FileUploader } from "@/components/ui/file-upload";
import useSWR from "swr";
import Card1 from "@/assets/images/card-01.svg";
import Card2 from "@/assets/images/card-02.svg";
import Card3 from "@/assets/images/card-03.svg";
import Card4 from "@/assets/images/card-04.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "@/components/ui/phone-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SelectAgent from "@/components/shared-lookups/select-agent";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  internal_ref_code: z.string().min(1, { message: "Required." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email(),
  membership_id: z.string(),
  agent_id: z.string(),
  file_path: z.array(z.instanceof(File)).optional(),
  kyc_document_type_id: z.string(),
  phone_number: z.string().max(13, {
    message: "Phone number must be maximum of 10 characters only.",
  }),
});

function CreateGuestForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      internal_ref_code: "",
      name: "",
      email: "",
      membership_id: "",
      file_path: [],
      agent_id: "",
      phone_number: "",
      kyc_document_type_id: undefined,
    },
  });
  const { toast } = useToast();
  const revalidator = useRevalidator();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | undefined>();
  const [isSelectAgentOpen, setIsSelectAgentOpen] = useState<boolean>(false);
  const user = useUserContext();
  const env = useEnvironmentProvider();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const url = `${env.API_BASE_URL}/admin/players`;
    axios
      .post(
        url,
        { ...values, file_path: values.file_path },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      )
      .then((response) => {
        form.reset();
        revalidator.revalidate();
        setSelectedAgent(undefined);
        toast({
          variant: "default",
          title: "Success",
          description: response?.data?.message,
        });
      })
      .catch((error) => {
        console.error("Form submission error", error);
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

  const options = getHeaders(user?.access_token);
  const fetcher = async (url: string) => {
    const data = await fetchData(url, options);
    const normalizedData = normalizer(data);
    return normalizedData.data as Membership[];
  };

  const membershipEndpoint = `${env.API_BASE_URL}/admin/memberships`;
  const idDocumentTypeEndpoint = `${env.API_BASE_URL}/admin/kyc/document-type`;
  const { data: membershipsData, isLoading: membershipLoading } = useSWR(
    membershipEndpoint,
    fetcher
  );

  const membershipOptions = membershipsData?.map((membership: Membership) => {
    switch (membership.id) {
      case 1:
        return {
          ...membership,
          image: Card2,
        };
      case 2:
        return {
          ...membership,
          image: Card3,
        };
      case 3:
        return {
          ...membership,
          image: Card1,
        };
      case 4:
        return {
          ...membership,
          image: Card4,
        };
    }
  });

  const { fetchLookup, lookupData, isLookupLoading } = useLookupFetcher();

  if (membershipLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoaderIcon className="animate-spin repeat-infinite" />
      </div>
    );
  }

  return (
    <Fragment>
      <Form {...form}>
        <form>
          <ScrollArea className="my-6 h-[calc(100vh-130px)] gap-4 space-y-2 rounded-lg ">
            <div className="my-6 grid max-w-[800px] grid-cols-12 gap-4 rounded-lg p-4">
              <FormField
                control={form.control}
                name="internal_ref_code"
                render={({ field }) => (
                  <FormItem className="col-span-12">
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        disabled={isLoading}
                        placeholder="Enter Code"
                        {...field}
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
                  <FormItem className="col-span-6">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        disabled={isLoading}
                        placeholder="Enter Name"
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
                  <FormItem className="col-span-6">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        disabled={isLoading}
                        placeholder="Enter Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agent_id"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormLabel>Agent</FormLabel>
                    <SelectAgent
                      identifier="id"
                      value={field.value}
                      onChange={field.onChange}
                      selectedItem={selectedAgent as Agent}
                      setSelectedItem={setSelectedAgent}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="kyc_document_type_id"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormLabel>Document Type</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      onOpenChange={() => {
                        fetchLookup(idDocumentTypeEndpoint, "document_types");
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full border-dashed">
                          {field.value ? (
                            <SelectValue placeholder="Select Document Type" />
                          ) : (
                            "Select Document Type"
                          )}
                        </SelectTrigger>
                      </FormControl>
                      <ScrollArea className="max-h-[300px]">
                        <SelectContent>
                          {isLookupLoading["document_types"] ? (
                            <div className="flex h-10 w-full items-center justify-center">
                              <LoaderIcon className="animate-spin repeat-infinite" />
                            </div>
                          ) : (
                            <>
                              {lookupData["document_types"]?.data?.map(
                                (document: KYCDOcumentType) => (
                                  <SelectItem
                                    value={document.id.toString()}
                                    key={document.id}
                                  >
                                    {document.name}
                                  </SelectItem>
                                )
                              )}
                            </>
                          )}
                        </SelectContent>
                      </ScrollArea>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem className="col-span-12 flex flex-col items-start">
                    <FormLabel> Phone Numbe</FormLabel>
                    <FormControl className="w-full">
                      <PhoneInput
                        placeholder="Enter Phone number"
                        {...field}
                        defaultCountry="PH"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="membership_id"
                render={({ field }) => (
                  <FormItem className="col-span-12 space-y-3">
                    <FormLabel>Membership</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-wrap gap-4"
                      >
                        {membershipOptions?.map((membership) => (
                          <FormItem key={membership?.id} className="relative">
                            <FormLabel
                              className={cn(
                                "flex cursor-pointer flex-col rounded-md border border-muted p-6 hover:bg-muted"
                              )}
                            >
                              <span className="absolute left-2 top-2 text-xs">
                                {membership?.level_name}
                              </span>
                              <FormControl>
                                <RadioGroupItem
                                  className="absolute bottom-2 right-2"
                                  value={membership?.id.toString() as string}
                                />
                              </FormControl>
                              <div>
                                <img
                                  className="h-auto w-[70px]"
                                  src={membership?.image}
                                  alt="membership-image"
                                />
                              </div>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="file_path"
                render={({ field }) => (
                  <div className="col-span-12 space-y-6">
                    <FormItem className="w-full">
                      <FormLabel>
                        Please upload valid IDs (maximum of 3 images).
                      </FormLabel>
                      <FormControl>
                        <FileUploader
                          value={field.value}
                          onValueChange={field.onChange}
                          maxFileCount={3}
                          maxSize={4 * 1024 * 1024}
                        // pass the onUpload function here for direct upload
                        // onUpload={uploadFiles}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
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

export default CreateGuestForm;
