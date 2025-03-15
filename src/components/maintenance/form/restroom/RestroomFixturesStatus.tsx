
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormSection from "../FormSection";

interface RestroomFixturesStatusProps {
  form: UseFormReturn<any>;
}

const RestroomFixturesStatus = ({ form }: RestroomFixturesStatusProps) => {
  return (
    <FormSection title="Fixtures Status">
      <FormField
        control={form.control}
        name="sinks_status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sinks Status</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              value={field.value || ""}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select sinks status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="operational">All Operational</SelectItem>
                <SelectItem value="partial_issues">Partial Issues</SelectItem>
                <SelectItem value="major_issues">Major Issues</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="toilets_status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Toilets Status</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              value={field.value || ""}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select toilets status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="operational">All Operational</SelectItem>
                <SelectItem value="partial_issues">Partial Issues</SelectItem>
                <SelectItem value="major_issues">Major Issues</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="faucets_status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Faucets Status</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              value={field.value || ""}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select faucets status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="operational">All Operational</SelectItem>
                <SelectItem value="partial_leaks">Partial Leaks</SelectItem>
                <SelectItem value="major_leaks">Major Leaks</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSection>
  );
};

export default RestroomFixturesStatus;
