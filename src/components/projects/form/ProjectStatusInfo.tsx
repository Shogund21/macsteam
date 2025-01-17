import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectStatusInfoProps {
  form: UseFormReturn<any>;
}

export const ProjectStatusInfo = ({ form }: ProjectStatusInfoProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white shadow-md z-50">
                <SelectItem value="Not Started" className="cursor-pointer hover:bg-gray-100">Not Started</SelectItem>
                <SelectItem value="In Progress" className="cursor-pointer hover:bg-gray-100">In Progress</SelectItem>
                <SelectItem value="Completed" className="cursor-pointer hover:bg-gray-100">Completed</SelectItem>
                <SelectItem value="On Hold" className="cursor-pointer hover:bg-gray-100">On Hold</SelectItem>
              </SelectContent>
            </Select>
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
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white shadow-md z-50">
                <SelectItem value="Low" className="cursor-pointer hover:bg-gray-100">Low</SelectItem>
                <SelectItem value="Medium" className="cursor-pointer hover:bg-gray-100">Medium</SelectItem>
                <SelectItem value="High" className="cursor-pointer hover:bg-gray-100">High</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};