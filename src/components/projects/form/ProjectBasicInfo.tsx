import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "../types";
import { Textarea } from "@/components/ui/textarea";

interface ProjectBasicInfoProps {
  form: UseFormReturn<ProjectFormValues>;
}

export const ProjectBasicInfo = ({ form }: ProjectBasicInfoProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter project name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormDescription>
              Provide a detailed description of the project's scope and objectives
            </FormDescription>
            <FormControl>
              <Textarea placeholder="Enter project description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormDescription>
              Specify the physical location where the project will take place
            </FormDescription>
            <FormControl>
              <Input placeholder="Enter project location" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};