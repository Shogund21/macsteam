import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useMaintenanceForm } from "./form/hooks/useMaintenanceForm";
import MaintenanceFormContent from "./form/MaintenanceFormContent";
import { useToast } from "@/hooks/use-toast";

interface MaintenanceCheckFormProps {
  onComplete: () => void;
}

const MaintenanceCheckForm = ({ onComplete }: MaintenanceCheckFormProps) => {
  const form = useMaintenanceForm();
  const { toast } = useToast();

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
    (eq) => eq.id === form.watch('equipment_id')
  );

  const isAHU = selectedEquipment?.name.toLowerCase().includes('ahu');
  const isCoolingTower = selectedEquipment?.name.toLowerCase().includes('cooling tower');

  const onSubmit = async (values: any) => {
    try {
      console.log('Form values before submission:', values);

      // Basic validation for required fields
      if (!values.equipment_id || !values.technician_id) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Equipment and Technician are required fields",
        });
        return;
      }

      // Equipment-specific validation
      if (isAHU) {
        if (!values.air_filter_status || !values.fan_belt_condition) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Please complete all required AHU fields",
          });
          return;
        }
      } else if (isCoolingTower) {
        if (!values.water_system_status || !values.fill_media_condition) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Please complete all required Cooling Tower fields",
          });
          return;
        }
      } else {
        if (!values.chiller_pressure_reading || !values.chiller_temperature_reading) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Please complete all required readings",
          });
          return;
        }
      }

      const submissionData = {
        ...values,
        equipment_type: isAHU ? 'ahu' : isCoolingTower ? 'cooling_tower' : 'general',
        check_date: new Date().toISOString(),
        chiller_pressure_reading: values.chiller_pressure_reading ? parseFloat(values.chiller_pressure_reading) : null,
        chiller_temperature_reading: values.chiller_temperature_reading ? parseFloat(values.chiller_temperature_reading) : null,
        airflow_reading: values.airflow_reading ? parseFloat(values.airflow_reading) : null,
      };

      console.log('Submitting maintenance check:', submissionData);

      const { error } = await supabase
        .from('hvac_maintenance_checks')
        .insert(submissionData);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      toast({
        title: "Success",
        description: "Maintenance check submitted successfully",
      });
      
      form.reset();
      onComplete();
    } catch (error: any) {
      console.error('Error submitting maintenance check:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit maintenance check: " + error.message,
      });
    }
  };

  // Calculate form validity based on required fields
  const isFormValid = () => {
    const values = form.getValues();
    const hasBasicFields = values.equipment_id && values.technician_id;
    
    if (!hasBasicFields) return false;

    if (isAHU) {
      return values.air_filter_status && values.fan_belt_condition;
    } else if (isCoolingTower) {
      return values.water_system_status && values.fill_media_condition;
    } else {
      return values.chiller_pressure_reading && values.chiller_temperature_reading;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <MaintenanceFormContent
          form={form}
          equipment={equipment || []}
          technicians={technicians || []}
          isAHU={!!isAHU}
          isCoolingTower={!!isCoolingTower}
        />

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
            disabled={!isFormValid()}
          >
            Submit Check
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MaintenanceCheckForm;