import React, { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface IPermissionForm {
  data: PermissionsGroup[];
  form: UseFormReturn<permissionValues>;
  checkedItems: Record<string, boolean>;
  setCheckedItems: (value: Record<string, boolean>) => void;
}

export const getCheckedPermissions = (permissions: {
  [key: string]: boolean;
}): string[] => {
  return Object.keys(permissions).filter((key) => permissions[key]);
};

const PermissionForm: FC<IPermissionForm> = (props) => {
  const { data, form, checkedItems, setCheckedItems } = props;

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
                    const permissionArray = getCheckedPermissions(value);
                    form.setValue("permissions", permissionArray);
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
