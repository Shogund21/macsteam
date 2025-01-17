import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import MaintenanceBasicInfo from "./form/MaintenanceBasicInfo";
import MaintenanceReadings from "./form/MaintenanceReadings";
import MaintenanceStatus from "./form/MaintenanceStatus";
import MaintenanceObservations from "./form/MaintenanceObservations";
import AHUMaintenanceFields from "./form/AHUMaintenanceFields";
import DocumentManager from "./documents/DocumentManager";

const formSchema = z.object({
  equipment_id: z.string().min(1, "Equipment is required"),
  technician_id: z.string().min(1, "Technician is required"),
  equipment_type: z.string().optional(),
  chiller_pressure_reading: z.string().min(1, "Pressure reading is required"),
  chiller_temperature_reading: z.string().min(1, "Temperature reading is required"),
  air_filter_status: z.string().min(1, "Air filter status is required"),
  belt_condition: z.string().min(1, "Belt condition is required"),
  refrigerant_level: z.string().min(1, "Refrigerant level is required"),
  unusual_noise: z.boolean().default(false),
  unusual_noise_description: z.string().optional(),
  vibration_observed: z.boolean().default(false),
  vibration_description: z.string().optional(),
  oil_level_status: z.string().min(1, "Oil level status is required"),
  condenser_condition: z.string().min(1, "Condenser condition is required"),
  notes: z.string().optional(),
  // AHU specific fields
  air_filter_cleaned: z.boolean().optional(),
  fan_belt_condition: z.string().optional(),
  fan_bearings_lubricated: z.boolean().optional(),
  fan_noise_level: z.string().optional(),
  dampers_operation: z.string().optional(),
  coils_condition: z.string().optional(),
  sensors_operation: z.string().optional(),
  motor_condition: z.string().optional(),
  drain_pan_status: z.string().optional(),
  airflow_reading: z.string().optional(),
  airflow_unit: z.string().optional(),
  troubleshooting_notes: z.string().optional(),
  corrective_actions: z.string().optional(),
  maintenance_recommendations: z.string().optional(),
  images: z.array(z.string()).optional(),
});

interface MaintenanceCheckFormProps {
  onComplete: () => void;
}

const MaintenanceCheckForm = ({ onComplete }: MaintenanceCheckFormProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unusual_noise: false,
      vibration_observed: false,
      air_filter_cleaned: false,
      fan_bearings_lubricated: false,
    },
  });

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const submissionData = {
        ...values,
        equipment_type: isAHU ? 'ahu' : 'general',
        chiller_pressure_reading: parseFloat(values.chiller_pressure_reading),
        chiller_temperature_reading: parseFloat(values.chiller_temperature_reading),
        airflow_reading: values.airflow_reading ? parseFloat(values.airflow_reading) : null,
      };

      const { data, error } = await supabase
        .from('hvac_maintenance_checks')
        .insert(submissionData)
        .select()
        .single();

      if (error) throw error;

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
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

        <DocumentManager equipmentId={form.watch('equipment_id')} />

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
          >
            Submit Check
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MaintenanceCheckForm;
