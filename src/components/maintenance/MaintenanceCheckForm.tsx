import React from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import MaintenanceBasicInfo from "./form/MaintenanceBasicInfo";
import MaintenanceReadings from "./form/MaintenanceReadings";
import MaintenanceStatus from "./form/MaintenanceStatus";
import MaintenanceObservations from "./form/MaintenanceObservations";
import AHUMaintenanceFields from "./form/AHUMaintenanceFields";
import DocumentManager from "./documents/DocumentManager";
import { useMaintenanceForm, MaintenanceFormValues } from "./form/hooks/useMaintenanceForm";
import { MaintenanceCheckStatus } from "@/types/maintenance";

interface MaintenanceCheckFormProps {
  onComplete: () => void;
}

const MaintenanceCheckForm = ({ onComplete }: MaintenanceCheckFormProps) => {
  const { toast } = useToast();
  const form = useMaintenanceForm();

  const { data: equipment } = useQuery({
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

  const { data: technicians } = useQuery({
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

  const selectedEquipment = equipment?.find(
    (eq) => eq.id === form.getValues('equipment_id')
  );

  const isAHU = selectedEquipment?.name.toLowerCase().includes('ahu');

  React.useEffect(() => {
    if (isAHU) {
      form.clearErrors();
      form.reset({}, { keepDefaultValues: true });
    }
  }, [isAHU, form]);

  const onSubmit = async (values: MaintenanceFormValues) => {
    try {
      if (!values.equipment_id || !values.technician_id) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Equipment and Technician selection are required.",
        });
        return;
      }

      const submissionData = {
        ...values,
        equipment_type: isAHU ? 'ahu' : 'general',
        check_date: new Date().toISOString(),
        chiller_pressure_reading: values.chiller_pressure_reading ? parseFloat(values.chiller_pressure_reading) : null,
        chiller_temperature_reading: values.chiller_temperature_reading ? parseFloat(values.chiller_temperature_reading) : null,
        airflow_reading: values.airflow_reading ? parseFloat(values.airflow_reading) : null,
        status: 'pending' as MaintenanceCheckStatus
      };

      const { error } = await supabase
        .from('hvac_maintenance_checks')
        .insert(submissionData);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      toast({
        title: "Success",
        description: "Maintenance check recorded successfully",
      });
      onComplete();
    } catch (error) {
      console.error('Error submitting maintenance check:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit maintenance check. Please try again.",
      });
    }
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-6 bg-white p-6 rounded-lg shadow"
      >
        <MaintenanceBasicInfo form={form} equipment={equipment || []} technicians={technicians || []} />
        
        {isAHU ? (
          <AHUMaintenanceFields form={form} />
        ) : (
          <>
            <MaintenanceReadings form={form} />
            <MaintenanceStatus form={form} />
            <MaintenanceObservations form={form} />
          </>
        )}

        <DocumentManager equipmentId={form.getValues('equipment_id')} />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onComplete}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit Check"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MaintenanceCheckForm;