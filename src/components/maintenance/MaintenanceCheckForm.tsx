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
import CoolingTowerFields from "./form/CoolingTowerFields";
import DocumentManager from "./documents/DocumentManager";
import { useMaintenanceForm } from "./form/hooks/useMaintenanceForm";
import { MaintenanceCheck } from "@/types/maintenance";

interface MaintenanceCheckFormProps {
  onComplete: () => void;
  initialData?: MaintenanceCheck;
}

const MaintenanceCheckForm = ({ onComplete, initialData }: MaintenanceCheckFormProps) => {
  const { toast } = useToast();
  const form = useMaintenanceForm(initialData);

  const { data: equipment = [], isLoading: isLoadingEquipment } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      console.log('Starting equipment fetch...');
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }
      
      return data || [];
    },
  });

  const { data: technicians = [], isLoading: isLoadingTechnicians } = useQuery({
    queryKey: ['technicians'],
    queryFn: async () => {
      console.log('Starting technicians fetch...');
      const { data, error } = await supabase
        .from('technicians')
        .select('*')
        .eq('isAvailable', true)
        .order('firstName');
      
      if (error) {
        console.error('Error fetching technicians:', error);
        throw error;
      }
      
      return data || [];
    },
  });

  const selectedEquipment = equipment?.find(
    (eq) => eq.id === form.watch('equipment_id')
  );

  const getEquipmentType = () => {
    if (!selectedEquipment) return null;
    const name = selectedEquipment.name.toLowerCase();
    if (name.includes('ahu') || name.includes('air handler')) return 'ahu';
    if (name.includes('chiller')) return 'chiller';
    if (name.includes('cooling tower')) return 'cooling_tower';
    return 'general';
  };

  const equipmentType = getEquipmentType();

  const onSubmit = async (values: any) => {
    try {
      console.log('Submitting form with values:', values);
      const submissionData = {
        ...values,
        equipment_type: equipmentType,
        chiller_pressure_reading: values.chiller_pressure_reading === "NA" ? null : parseFloat(values.chiller_pressure_reading),
        chiller_temperature_reading: values.chiller_temperature_reading === "NA" ? null : parseFloat(values.chiller_temperature_reading),
        airflow_reading: values.airflow_reading === "NA" ? null : parseFloat(values.airflow_reading),
      };

      const { error } = initialData 
        ? await supabase
            .from('hvac_maintenance_checks')
            .update(submissionData)
            .eq('id', initialData.id)
        : await supabase
            .from('hvac_maintenance_checks')
            .insert(submissionData);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Maintenance check ${initialData ? 'updated' : 'recorded'} successfully`,
      });
      onComplete();
    } catch (error) {
      console.error('Error submitting maintenance check:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${initialData ? 'update' : 'submit'} maintenance check. Please try again.`,
      });
    }
  };

  if (isLoadingEquipment || isLoadingTechnicians) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  const renderMaintenanceFields = () => {
    switch (equipmentType) {
      case 'ahu':
        return <AHUMaintenanceFields form={form} />;
      case 'cooling_tower':
        return <CoolingTowerFields form={form} />;
      case 'chiller':
        return (
          <>
            <MaintenanceReadings form={form} />
            <MaintenanceStatus form={form} />
            <MaintenanceObservations form={form} />
          </>
        );
      default:
        return (
          <>
            <MaintenanceReadings form={form} />
            <MaintenanceStatus form={form} />
            <MaintenanceObservations form={form} />
          </>
        );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6">
          <MaintenanceBasicInfo 
            form={form} 
            equipment={equipment} 
            technicians={technicians} 
          />
          
          <div className="bg-gray-50 p-6 rounded-lg">
            {renderMaintenanceFields()}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <DocumentManager equipmentId={form.watch('equipment_id')} />
          </div>

          <div className="flex justify-end space-x-4 sticky bottom-0 bg-white p-4 border-t">
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
              {initialData ? 'Update Check' : 'Submit Check'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default MaintenanceCheckForm;