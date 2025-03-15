import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MaintenanceFormValues } from "./useMaintenanceForm";
import { Database } from "@/integrations/supabase/types";
import { MaintenanceCheck } from "@/types/maintenance";

export const useMaintenanceFormSubmit = (onComplete: () => void, initialData?: MaintenanceCheck) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateNumericField = (value: string | undefined, fieldName: string): number | null => {
    if (!value || value === "NA") return null;
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      console.warn(`Invalid numeric value for ${fieldName}:`, value);
      return null;
    }
    return numValue;
  };

  const handleSubmit = async (values: MaintenanceFormValues) => {
    console.log('Form submission started with values:', values);
    
    if (isSubmitting) {
      console.log('Preventing double submission');
      return;
    }
    
    if (!values.equipment_id || !values.technician_id) {
      console.error('Missing required fields:', { 
        equipment_id: values.equipment_id, 
        technician_id: values.technician_id 
      });
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please select both equipment and technician",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { selected_location, ...formData } = values;
      
      const submissionData: Database['public']['Tables']['hvac_maintenance_checks']['Insert'] = {
        ...formData,
        equipment_type: formData.equipment_type || 'general',
        check_date: new Date().toISOString(),
        status: initialData ? initialData.status : 'completed' as const,
        chiller_pressure_reading: validateNumericField(formData.chiller_pressure_reading, 'chiller_pressure_reading'),
        chiller_temperature_reading: validateNumericField(formData.chiller_temperature_reading, 'chiller_temperature_reading'),
        airflow_reading: validateNumericField(formData.airflow_reading, 'airflow_reading'),
      };

      console.log('Submitting maintenance check data:', submissionData);

      // If we have initialData, we're updating
      if (initialData?.id) {
        const { data, error } = await supabase
          .from('hvac_maintenance_checks')
          .update(submissionData)
          .eq('id', initialData.id);

        if (error) throw error;
      } else {
        // Otherwise we're inserting
        const { data, error } = await supabase
          .from('hvac_maintenance_checks')
          .insert(submissionData);

        if (error) throw error;
      }

      console.log('Maintenance check submitted successfully');
      toast({
        title: "Success",
        description: initialData 
          ? "Maintenance check updated successfully" 
          : "Maintenance check recorded successfully",
      });
      
      onComplete();
    } catch (error: any) {
      console.error('Error submitting maintenance check:', {
        error,
        message: error.message,
        details: error.details,
      });
      
      let errorMessage = "Failed to submit maintenance check. ";
      if (error.code) {
        errorMessage += `(Error code: ${error.code}) `;
      }
      errorMessage += error.message || "Please try again.";
      
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      console.log('Form submission completed');
      setIsSubmitting(false);
    }
  };

  return handleSubmit;
};
