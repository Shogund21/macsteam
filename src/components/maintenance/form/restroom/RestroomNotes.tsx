
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { MaintenanceFormValues } from "../hooks/useMaintenanceForm";
import FormSection from "../FormSection";

interface RestroomNotesProps {
  form: UseFormReturn<MaintenanceFormValues>;
}

const RestroomNotes = ({ form }: RestroomNotesProps) => {
  return (
    <FormSection title="Notes">
      <FormField
        control={form.control}
        name="restroom_notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Notes</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter any additional notes or observations about the restroom condition (optional)"
                className="min-h-[100px]"
                {...field}
                value={field.value || ""}
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
