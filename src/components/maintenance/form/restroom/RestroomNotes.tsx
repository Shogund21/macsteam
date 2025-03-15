
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import FormSection from "../FormSection";

interface RestroomNotesProps {
  form: UseFormReturn<any>;
}

const RestroomNotes = ({ form }: RestroomNotesProps) => {
  return (
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
  );
};

export default RestroomNotes;
