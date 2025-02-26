import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { PermissionsGroup } from '@/lib/resource-types';
import { useTranslation } from 'react-i18next';

interface PermissionAccordionProps {
  data: PermissionsGroup;
  checkedItems: Record<string, boolean>;
  setCheckedItems: (value: Record<string, boolean>) => void;
}

export default function PermissionCard({
  data,
  checkedItems,
  setCheckedItems
}: PermissionAccordionProps) {
  const [selectAll, setSelectAll] = React.useState<boolean>(false);

  React.useEffect(() => {
    const allChecked = data.permissions.every(
      (permission) => checkedItems[permission.name]
    );
    setSelectAll(allChecked);
  }, [checkedItems, data.permissions]);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    const newCheckedPermissions: Record<string, boolean> = {};
    data.permissions.forEach((permission) => {
      newCheckedPermissions[permission.name] = checked;
    });
    setCheckedItems({ ...checkedItems, ...newCheckedPermissions });
  };

  const handlePermissionChange = (permissionName: string, checked: boolean) => {
    const newCheckedPermissions = {
      ...checkedItems,
      [permissionName]: checked
    };
    setCheckedItems(newCheckedPermissions);

    const allChecked = data.permissions.every(
      (permission) => newCheckedPermissions[permission.name]
    );
    setSelectAll(allChecked);
  };

  const { t } = useTranslation();

  return (
    <Card className="h-full w-full rounded-sm p-6">
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
              {t('label_select_all')}
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {data?.permissions?.map((permission, index) => (
              <div
                key={permission?.name + index}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id={permission?.name}
                  checked={checkedItems[permission?.name] || false}
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
