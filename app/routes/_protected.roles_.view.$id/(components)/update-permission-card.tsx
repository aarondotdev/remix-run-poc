import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { PermissionsGroup, Roles } from '@/types';
import useRoleStore from '@/stores/role-store';

interface PermissionAccordionProps {
  data: PermissionsGroup;
  currentRole: Roles;
}

export default function PermissionCard({
  data,
  currentRole
}: PermissionAccordionProps) {
  const updateCheckedPermissions = useRoleStore(
    (state) => state.updateCheckedPermissions
  );
  const setUpdateCheckedPermissions = useRoleStore(
    (state) => state.setUpdateCheckedPermissions
  );
  const [selectAll, setSelectAll] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (Object.keys(updateCheckedPermissions).length === 0) {
      const defaultPermissions = currentRole.permissions.reduce(
        (acc, permission) => ({
          ...acc,
          [permission.name]: true
        }),
        {}
      );
      setUpdateCheckedPermissions(defaultPermissions);
    }
  }, [
    currentRole.permissions,
    setUpdateCheckedPermissions,
    updateCheckedPermissions
  ]);

  React.useEffect(() => {
    const allChecked = data.permissions.every(
      (permission) => updateCheckedPermissions[permission.name]
    );
    setSelectAll(allChecked);
  }, [updateCheckedPermissions, data.permissions]);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    const newupdateCheckedPermissions: Record<string, boolean> = {};
    data.permissions.forEach((permission) => {
      newupdateCheckedPermissions[permission.name] = checked;
    });
    setUpdateCheckedPermissions({
      ...updateCheckedPermissions,
      ...newupdateCheckedPermissions
    });
  };

  const handlePermissionChange = (permissionName: string, checked: boolean) => {
    const newupdateCheckedPermissions = {
      ...updateCheckedPermissions,
      [permissionName]: checked
    };
    setUpdateCheckedPermissions(newupdateCheckedPermissions);

    const allChecked = data.permissions.every(
      (permission) => newupdateCheckedPermissions[permission.name]
    );
    setSelectAll(allChecked);
  };

  return (
    <Card className="w-full rounded-sm p-6">
      <CardHeader className="p-0 font-semibold">{data?.title}</CardHeader>
      <CardContent className="p-0">
        <p className="mb-4 text-sm text-muted-foreground">
          {data?.description}
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={selectAll}
              id={data?.id + data?.title}
              onCheckedChange={handleSelectAll}
            />
            <label
              htmlFor="select-all"
              className="text-sm font-medium leading-none text-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Select all
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {data?.permissions?.map((permission) => (
              <div
                key={permission?.name}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id={permission?.name}
                  checked={updateCheckedPermissions[permission?.name] || false}
                  onCheckedChange={(checked) =>
                    handlePermissionChange(permission.name, checked as boolean)
                  }
                />
                <label
                  htmlFor={permission?.name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {permission?.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
