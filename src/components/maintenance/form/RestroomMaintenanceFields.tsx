
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import FormSection from "./FormSection";

interface RestroomMaintenanceFieldsProps {
  form: UseFormReturn<any>;
}

const RestroomMaintenanceFields = ({ form }: RestroomMaintenanceFieldsProps) => {
  return (
    <>
      <h3 className="text-lg font-semibold mb-4">Restroom Maintenance Check</h3>
      
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

      <FormSection title="Cleanliness">
        <FormField
          control={form.control}
          name="floor_cleaned"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Floor Cleaned</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="surfaces_cleaned"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Surfaces Cleaned</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>
      
      <FormSection title="Additional Observations">
        <FormField
          control={form.control}
          name="restroom_notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter any additional notes or observations" 
                  {...field} 
                  className="h-20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>
    </>
  );
};

export default RestroomMaintenanceFields;
