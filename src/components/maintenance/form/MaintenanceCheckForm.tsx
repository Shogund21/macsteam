
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import MaintenanceBasicInfo from "./MaintenanceBasicInfo";
import MaintenanceReadings from "./MaintenanceReadings";
import MaintenanceStatus from "./MaintenanceStatus";
import MaintenanceObservations from "./MaintenanceObservations";
import AHUMaintenanceFields from "./AHUMaintenanceFields";
import { useMaintenanceForm } from "./hooks/useMaintenanceForm";
import { useState } from "react";
import { MaintenanceFormValues } from "./hooks/useMaintenanceForm";
import { Database } from "@/integrations/supabase/types";

interface MaintenanceCheckFormProps {
  onComplete: () => void;
}

const MaintenanceCheckForm = ({ onComplete }: MaintenanceCheckFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useMaintenanceForm();
  const { toast } = useToast();

  const { data: equipment, isLoading: isLoadingEquipment } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .eq('status', 'active');
      
      if (error) throw error;
      return data;
    },
  });

  const { data: technicians, isLoading: isLoadingTechnicians } = useQuery({
    queryKey: ['technicians'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('technicians')
        .select('*')
        .eq('isAvailable', true);
      
      if (error) throw error;
      return data;
    },
  });

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
      
      // Get equipment details to determine type
      const selectedEquipment = equipment?.find(eq => eq.id === values.equipment_id);
      if (!selectedEquipment) {
        throw new Error('Selected equipment not found');
      }
      
      const isAHU = selectedEquipment.name.toLowerCase().includes('ahu');
      console.log('Processing maintenance check for:', {
        equipmentName: selectedEquipment.name,
        isAHU,
      });
      
      const submissionData: Database['public']['Tables']['hvac_maintenance_checks']['Insert'] = {
        ...formData,
        equipment_type: isAHU ? 'ahu' : 'general',
        check_date: new Date().toISOString(),
        status: 'completed' as const,
        chiller_pressure_reading: validateNumericField(formData.chiller_pressure_reading, 'chiller_pressure_reading'),
        chiller_temperature_reading: validateNumericField(formData.chiller_temperature_reading, 'chiller_temperature_reading'),
        airflow_reading: validateNumericField(formData.airflow_reading, 'airflow_reading'),
      };

      console.log('Submitting maintenance check data:', submissionData);

      const { data, error } = await supabase
        .from('hvac_maintenance_checks')
        .insert(submissionData);

      if (error) {
        console.error('Supabase insertion error:', error);
        throw error;
      }

      console.log('Maintenance check submitted successfully:', data);
      toast({
        title: "Success",
        description: "Maintenance check recorded successfully",
      });
      
      form.reset();
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

  const selectedEquipment = equipment?.find(
    (eq) => eq.id === form.watch('equipment_id')
  );

  const isAHU = selectedEquipment?.name.toLowerCase().includes('ahu');
  const isLoading = isLoadingEquipment || isLoadingTechnicians;

  if (isLoading) {
    return <div className="p-6 text-center">Loading form data...</div>;
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(handleSubmit)(e);
        }} 
        className="space-y-6 bg-white p-6 rounded-lg shadow"
      >
        <MaintenanceBasicInfo 
          form={form} 
          equipment={equipment || []} 
          technicians={technicians || []} 
        />
        
        {isAHU ? (
          <AHUMaintenanceFields form={form} />
        ) : (
          <>
            <MaintenanceReadings form={form} />
            <MaintenanceStatus form={form} />
            <MaintenanceObservations form={form} />
          </>
        )}

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onComplete}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            variant="default"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Check"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MaintenanceCheckForm;
