import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface AHUNotesProps {
  form: UseFormReturn<any>;
}

const AHUNotes = ({ form }: AHUNotesProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="troubleshooting_notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Troubleshooting Notes</FormLabel>
            <FormControl>
              <Textarea {...field} className="bg-white" placeholder="Document any troubleshooting performed..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="corrective_actions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Corrective Actions Taken</FormLabel>
            <FormControl>
              <Textarea {...field} className="bg-white" placeholder="List any corrective actions taken..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="maintenance_recommendations"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Maintenance Recommendations</FormLabel>
            <FormControl>
              <Textarea {...field} className="bg-white" placeholder="Provide recommendations for future maintenance..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AHUNotes;