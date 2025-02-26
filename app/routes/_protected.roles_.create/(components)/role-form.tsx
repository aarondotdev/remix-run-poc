import React, { FC } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { roleValues } from './create-role-form';

interface IRoleForm {
  form: UseFormReturn<roleValues>;
}

const RoleForm: FC<IRoleForm> = (props) => {
  const { form } = props;

  return (
    <>
      <FormField
        control={form.control}
        name="label"
        render={({ field }) => (
          <FormItem className="col-span-4">
            <FormLabel>Label</FormLabel>
            <FormControl>
              <Input placeholder="Enter Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="col-span-4">
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter Value" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="col-span-4">
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input placeholder="Enter Description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default RoleForm;
