import { CreateRolePayload } from '~/stores/role-store';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Form } from '~/components/ui/form';
import RoleForm from './role-form';
import PermissionForm from './permission-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon, LoaderIcon } from 'lucide-react';
import { PermissionsGroup } from '~/lib/resource-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEnvironmentProvider } from '~/context/environment-provider';
import { useUserContext } from '~/context/user-provider';
import { useToast } from '~/components/ui/use-toast';
import ErrorMessage from '~/components/shared/error-message';
import { defineStepper } from '@stepperize/react';

interface IRoleForm {
  data: PermissionsGroup[];
}

export const roleSchema = z.object({
  name: z.string().min(1, {
    message: 'Required'
  }),
  label: z.string().min(1, {
    message: 'Required'
  }),
  description: z.string().optional()
});

export const permissionSchema = z
  .object({
    permissions: z.string().array()
  })
  .refine((input) => !(input.permissions.length === 0), {
    message: 'Required',
    path: ['remarks']
  });

export type roleValues = z.infer<typeof roleSchema>;
export type permissionValues = z.infer<typeof permissionSchema>;

const { useStepper, steps, utils } = defineStepper(
  {
    id: 'role',
    label: 'Role',
    schema: roleSchema
  },
  {
    id: 'permissions',
    label: 'Permissions',
    schema: permissionSchema
  }
);

const defaultValues = {
  name: '',
  label: '',
  description: '',
  permissions: []
};

const CreateRoleForm2: FC<IRoleForm> = (props) => {
  const { data } = props;
  const stepper = useStepper();

  const form = useForm<z.infer<typeof stepper.current.schema>>({
    resolver: zodResolver(stepper.current.schema),
    mode: 'onChange',
    defaultValues: { ...defaultValues }
  });

  const env = useEnvironmentProvider()
  const user = useUserContext()
  const url = `${env.API_BASE_URL}/admin/roles`;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const createAction = (payload: CreateRolePayload) => {
    setIsLoading(true);

    axios
      .post(
        url,
        {
          ...payload
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${user?.access_token}`,
          }
        }
      )
      .then((response) => {
        form.reset();
        stepper.reset();
        setPayload(undefined);
        toast({
          title: 'Success',
          variant: 'default',
          description: 'Role successfully added.'
        });
        router.refresh();
      })
      .catch((error) => {
        toast({
          title: 'Error',
          variant: 'destructive',
          description: <ErrorMessage errors={error.response.data.error} />
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [payload, setPayload] = useState<CreateRolePayload | undefined>();

  const onSubmit = (values: z.infer<typeof stepper.current.schema>) => {
    // biome-ignore lint/suspicious/noConsoleLog: <We want to log the form values>
    setPayload({ ...payload, ...(values as any) });
    stepper.next();
    console.log(`Form values for step ${stepper.current.id}:`, values);
    if (!stepper.isLast) return;
    createAction({ ...payload, ...(values as CreateRolePayload) });
  };

  const currentIndex = utils.getIndex(stepper.current.id);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 rounded-lg border p-6"
      >
        <div className="flex justify-between">
          {!stepper.isFirst ? (
            <Button
              onClick={stepper.prev}
              type="button"
              className="flex items-center gap-2 p-0"
              variant="link"
            >
              <ChevronLeftIcon className="h-4 w-4" /> Back
            </Button>
          ) : (
            <span></span>
          )}

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Step {currentIndex + 1} of {steps.length}
            </span>
          </div>
        </div>
        <div className="grid w-full grid-cols-12 gap-4">
          {stepper.switch({
            role: () => <RoleForm form={form as any} />,
            permissions: () => <PermissionForm data={data} form={form as any} />
            //  complete: () => <CompleteComponent />
          })}
          <div className="col-span-12 flex justify-end gap-4">
            <>
              <Button
                type="button"
                variant="secondary"
                onClick={stepper.prev}
                disabled={stepper.isFirst}
                className={cn(stepper.isFirst ? 'hidden' : 'block')}
              >
                Back
              </Button>
              {stepper.current.id === 'permissions' ? (
                <Button type="submit">
                  {isLoading ? (
                    <LoaderIcon className="animate-spin repeat-infinite" />
                  ) : (
                    'Save'
                  )}
                </Button>
              ) : (
                <Button type="submit">Next</Button>
              )}
            </>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateRoleForm2;
