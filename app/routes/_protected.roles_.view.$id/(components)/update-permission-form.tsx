import { Button } from '~/components/ui/button'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem } from '~/components/ui/form'
import axios from 'axios'
import { useToast } from '~/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { LoaderIcon } from 'lucide-react'
import { Permission, PermissionsGroup, Role } from '~/lib/resource-types'
import { permissionSchema, roleSchema } from '~/routes/_protected.roles_.create/(components)/create-role-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEnvironmentProvider } from '~/context/environment-provider'
import { useUserContext } from '~/context/user-provider'
import ErrorMessage from '~/components/shared/error-message'
import { CreateRolePayload } from '~/stores/role-store'
import RoleForm from '~/routes/_protected.roles_.create/(components)/role-form'
import PermissionCard from '~/routes/_protected.roles_.create/(components)/permission-card'
import { getCheckedKeys } from '~/lib/data-helpers'
import { Card } from '~/components/ui/card'

interface IUpdatePermissionForm {
    selectedRole: Role
    data: PermissionsGroup[],
}

type RoleDetails = Omit<CreateRolePayload, "permissions">

const UpdatePermissionForm: FC<IUpdatePermissionForm> = (props) => {

    const { selectedRole, data } = props
    const [isEditingDetails, setIsEditingDetails] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>()

    const defaultValues = {
        name: selectedRole?.name,
        label: selectedRole?.label,
        description: selectedRole?.description,
    }

    const permissionDefaultValues = {
        permissions: selectedRole.permissions?.map((item) => item.name)
    }

    const form = useForm<z.infer<typeof roleSchema>>({
        resolver: zodResolver(roleSchema),
        defaultValues: defaultValues
    });

    const permissionForm = useForm<z.infer<typeof permissionSchema>>({
        resolver: zodResolver(permissionSchema),
        defaultValues: { ...permissionDefaultValues }
    });


    const env = useEnvironmentProvider()
    const user = useUserContext()
    const url = `${env.API_BASE_URL}/admin/roles/${selectedRole?.id}`;
    const { toast } = useToast()
    const router = useRouter()
    const [payload, setPayload] = useState<RoleDetails | undefined>(defaultValues)
    const checkedPermissions = selectedRole?.permissions?.map((item) => item.name)
    const defaultCheckedItems = data.reduce((acc, group) => {
        group.permissions.forEach((permission: Permission) => {
            acc[permission.name] = checkedPermissions?.includes(permission.name) ? true : false;
        });
        return acc;
    }, {} as Record<string, boolean>);

    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(defaultCheckedItems);

    const onSubmit = (values: z.infer<typeof permissionSchema>) => {
        setIsLoading(true);
        const updatePayload = {
            ...payload, ...values
        }

        axios
            .put(
                url,
                {
                    ...updatePayload
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
                form.reset({}, { keepDefaultValues: true })
                permissionForm.reset({}, { keepDefaultValues: true })
                toast({
                    title: 'Success',
                    variant: 'default',
                    description: 'Role successfully updated.'
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
    }

    const handleSave = (values: z.infer<typeof roleSchema>) => {
        setIsEditingDetails(false)
        setPayload({ ...payload, ...values as CreateRolePayload })
    }

    const isRoleDetailsDirty = form.formState.isDirty
    const isPermissionsDirty = permissionForm.formState.isDirty
    const isDisabledSave = !isRoleDetailsDirty && !isPermissionsDirty

    return (
        <div className='space-y-4'>
            <Card className="relative p-4 rounded-sm">
                {!isEditingDetails ? (
                    <>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4">
                            <div className="flex flex-col">
                                <span className="text-xs">Label</span>
                                <p className="font-semibold">
                                    {payload?.label || selectedRole?.label}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs">Name</span>
                                <p className="font-semibold">
                                    {payload?.name || selectedRole?.name}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs">Description</span>
                                <p className="font-semibold">
                                    {payload?.description || selectedRole?.description}
                                </p>
                            </div>
                        </div>

                        <Button
                            className="absolute right-4 top-4"
                            variant="link"
                            onClick={() => setIsEditingDetails(true)}
                        >
                            Edit
                        </Button>
                    </>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSave)} className='space-y-6'>
                            <div className="grid w-full grid-cols-12 gap-4">
                                <RoleForm form={form as any} />
                            </div>
                            <div className="col-span-12 flex justify-end gap-4">
                                <Button>
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
            </Card>
            <Form {...permissionForm}>
                <form onSubmit={permissionForm.handleSubmit(onSubmit)} className='space-y-6'>
                    <div className="col-span-12 grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4">
                        {data?.map((item: PermissionsGroup, index) =>
                        (<FormField
                            key={item.id.toString() + index}
                            control={permissionForm.control}
                            name="permissions"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <PermissionCard
                                            setCheckedItems={(value) => {
                                                setCheckedItems(value);
                                                const permissionArray = getCheckedKeys(value);
                                                permissionForm.setValue('permissions', permissionArray, { shouldDirty: true });
                                            }}
                                            checkedItems={checkedItems as any}
                                            data={item}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />)

                        )}
                    </div>
                    <div className="col-span-12 flex justify-end gap-4">
                        <Button disabled={isEditingDetails || isDisabledSave}>
                            {isLoading ? <LoaderIcon className='animate-spin repeat-infinite' /> : "Save"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>


    )
}

export default UpdatePermissionForm