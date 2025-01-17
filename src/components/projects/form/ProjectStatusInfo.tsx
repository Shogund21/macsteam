import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { StatusSelect } from "../StatusSelect";
import { PrioritySelect } from "../PrioritySelect";
import { ProjectFormValues } from "../types";

interface ProjectStatusInfoProps {
  form: UseFormReturn<ProjectFormValues>;
}

export const ProjectStatusInfo = ({ form }: ProjectStatusInfoProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <FormControl>
              <StatusSelect
                value={field.value}
                onValueChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="priority"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Priority</FormLabel>
            <FormControl>
              <PrioritySelect
                value={field.value}
                onValueChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};