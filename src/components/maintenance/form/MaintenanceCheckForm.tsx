
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

  const handleSubmit = async (values: MaintenanceFormValues) => {
    if (isSubmitting) return; // Prevent double submission
    
    try {
      setIsSubmitting(true);
      const { selected_location, ...formData } = values;
      
      // Get equipment details to determine type
      const selectedEquipment = equipment?.find(eq => eq.id === values.equipment_id);
      const isAHU = selectedEquipment?.name.toLowerCase().includes('ahu');
      
      const submissionData = {
        ...formData,
        equipment_type: isAHU ? 'ahu' : 'general',
        check_date: new Date().toISOString(),
        status: 'completed',
        // Handle numeric fields with proper validation
        chiller_pressure_reading: formData.chiller_pressure_reading && formData.chiller_pressure_reading !== "NA" ? 
          parseFloat(formData.chiller_pressure_reading) : null,
        chiller_temperature_reading: formData.chiller_temperature_reading && formData.chiller_temperature_reading !== "NA" ? 
          parseFloat(formData.chiller_temperature_reading) : null,
        airflow_reading: formData.airflow_reading && formData.airflow_reading !== "NA" ? 
          parseFloat(formData.airflow_reading) : null,
      };

      const { error } = await supabase
        .from('hvac_maintenance_checks')
        .insert([submissionData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Maintenance check recorded successfully",
      });
      
      form.reset(); // Reset form after successful submission
      onComplete();
    } catch (error: any) {
      console.error('Error submitting maintenance check:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to submit maintenance check. Please try again.",
      });
    } finally {
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
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
            className="bg-blue-500 text-white hover:bg-blue-600"
            disabled={isSubmitting || !form.formState.isValid}
          >
            {isSubmitting ? "Submitting..." : "Submit Check"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MaintenanceCheckForm;
