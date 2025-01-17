import React from "react";
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
import { MaintenanceCheckStatus } from "@/types/maintenance";

const baseSchema = z.object({
  equipment_id: z.string().min(1, "Equipment is required"),
  technician_id: z.string().min(1, "Technician is required"),
  equipment_type: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  unusual_noise: z.boolean().optional().nullable(),
  unusual_noise_description: z.string().optional().nullable(),
  vibration_observed: z.boolean().optional().nullable(),
  vibration_description: z.string().optional().nullable(),
  images: z.array(z.string()).optional().nullable(),
});

const standardHVACSchema = baseSchema.extend({
  chiller_pressure_reading: z.string().optional().nullable(),
  chiller_temperature_reading: z.string().optional().nullable(),
  air_filter_status: z.string().optional().nullable(),
  belt_condition: z.string().optional().nullable(),
  refrigerant_level: z.string().optional().nullable(),
  oil_level_status: z.string().optional().nullable(),
  condenser_condition: z.string().optional().nullable(),
});

const ahuSchema = baseSchema.extend({
  air_filter_cleaned: z.boolean().optional().nullable(),
  fan_belt_condition: z.string().optional().nullable(),
  fan_bearings_lubricated: z.boolean().optional().nullable(),
  fan_noise_level: z.string().optional().nullable(),
  dampers_operation: z.string().optional().nullable(),
  coils_condition: z.string().optional().nullable(),
  sensors_operation: z.string().optional().nullable(),
  motor_condition: z.string().optional().nullable(),
  drain_pan_status: z.string().optional().nullable(),
  airflow_reading: z.string().optional().nullable(),
  airflow_unit: z.string().optional().nullable(),
  troubleshooting_notes: z.string().optional().nullable(),
  corrective_actions: z.string().optional().nullable(),
  maintenance_recommendations: z.string().optional().nullable(),
});

type FormValues = z.infer<typeof standardHVACSchema> & z.infer<typeof ahuSchema>;

interface MaintenanceCheckFormProps {
  onComplete: () => void;
}

const MaintenanceCheckForm = ({ onComplete }: MaintenanceCheckFormProps) => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(standardHVACSchema),
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
    (eq) => eq.id === form.getValues('equipment_id')
  );

  const isAHU = selectedEquipment?.name.toLowerCase().includes('ahu');

  React.useEffect(() => {
    if (isAHU) {
      form.clearErrors();
      form.reset({}, { keepDefaultValues: true });
    }
  }, [isAHU, form]);

  const onSubmit = async (values: FormValues) => {
    try {
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
          >
            Submit Check
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MaintenanceCheckForm;