
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { MaintenanceFormValues } from "../hooks/useMaintenanceForm";
import FormSection from "../FormSection";

interface ElevatorNotesProps {
  form: UseFormReturn<MaintenanceFormValues>;
}

const ElevatorNotes = ({ form }: ElevatorNotesProps) => {
  return (
    <FormSection title="Elevator Notes">
      <FormField
        control={form.control}
        name="elevator_notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Notes</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter any additional observations or notes about the elevator"
                className="min-h-[120px]"
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

export default ElevatorNotes;
