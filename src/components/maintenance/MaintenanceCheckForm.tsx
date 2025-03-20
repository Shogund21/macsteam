
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { MaintenanceCheck } from "@/types/maintenance";
import MaintenanceBasicInfo from "./form/MaintenanceBasicInfo";
import MaintenanceReadings from "./form/MaintenanceReadings";
import MaintenanceStatus from "./form/MaintenanceStatus";
import MaintenanceObservations from "./form/MaintenanceObservations";
import AHUMaintenanceFields from "./form/AHUMaintenanceFields";
import CoolingTowerFields from "./form/CoolingTowerFields";
import ElevatorMaintenanceFields from "./form/ElevatorMaintenanceFields";
import RestroomMaintenanceFields from "./form/RestroomMaintenanceFields";
import DocumentManager from "./documents/DocumentManager";
import { useMaintenanceForm } from "./form/hooks/useMaintenanceForm";
import { useMaintenanceFormSubmit } from "./form/hooks/useMaintenanceFormSubmit";
import FormSection from "./form/FormSection";
import FormActions from "./form/FormActions";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

interface MaintenanceCheckFormProps {
  onComplete: () => void;
  initialData?: MaintenanceCheck;
}

const MaintenanceCheckForm = ({ onComplete, initialData }: MaintenanceCheckFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useMaintenanceForm(initialData);
  const handleSubmit = useMaintenanceFormSubmit(onComplete, initialData);
  const isMobile = useIsMobile();

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
      
      console.log('Equipment fetched:', data);
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
    if (name.includes('elevator')) return 'elevator';
    if (name.includes('restroom')) return 'restroom';
    return 'general';
  };

  const equipmentType = getEquipmentType();

  const onSubmitForm = async (values: any) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await handleSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderMaintenanceFields = () => {
    switch (equipmentType) {
      case 'ahu':
        return <AHUMaintenanceFields form={form} />;
      case 'cooling_tower':
        return <CoolingTowerFields form={form} />;
      case 'elevator':
        return <ElevatorMaintenanceFields form={form} />;
      case 'restroom':
        return <RestroomMaintenanceFields form={form} />;
      case 'chiller':
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

  if (isLoadingEquipment || isLoadingTechnicians) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-6">
        <div className="grid gap-6">
          <div className={`${isMobile ? 'text-center mb-4' : ''}`}>
            <h2 className={`text-xl ${isMobile ? '' : 'text-2xl'} font-bold`}>
              {initialData ? 'Edit Maintenance Check' : 'New Maintenance Check'}
            </h2>
          </div>
          
          <FormSection>
            <MaintenanceBasicInfo 
              form={form} 
              equipment={equipment} 
              technicians={technicians} 
            />
          </FormSection>
          
          <FormSection>
            {renderMaintenanceFields()}
          </FormSection>

          <FormSection>
            <DocumentManager equipmentId={form.watch('equipment_id')} />
          </FormSection>

          <FormActions 
            onCancel={onComplete}
            isEditing={!!initialData}
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    </Form>
  );
};

export default MaintenanceCheckForm;
