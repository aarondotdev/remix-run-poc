import React, { FC, useState } from 'react';
import { permissionValues } from './create-role-form';
import { UseFormReturn } from 'react-hook-form';
import PermissionCard from './permission-card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { PermissionsGroup } from '@/lib/resource-types';
import { getCheckedKeys } from '@/lib/data-helpers';

interface IPermissionForm {
  data: PermissionsGroup[];
  form: UseFormReturn<permissionValues>;
}

const PermissionForm: FC<IPermissionForm> = (props) => {
  const { data, form } = props;
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  return (
    <div className="col-span-12 grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4">
      {data?.map((item: PermissionsGroup, index) => (
        <FormField
          key={item.id.toString() + index}
          control={form.control}
          name="permissions"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PermissionCard
                  setCheckedItems={(value) => {
                    setCheckedItems(value);
                    const permissionArray = getCheckedKeys(value);
                    form.setValue('permissions', permissionArray);
                  }}
                  checkedItems={checkedItems as any}
                  data={item}
                />
              </FormControl>
            </FormItem>
          )}
        />
      ))}
    </div>
  );
};

export default PermissionForm;
