
import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import MaintenanceBasicInfo from "./MaintenanceBasicInfo";
import { useMaintenanceForm } from "./hooks/useMaintenanceForm";
import { useMaintenanceFormSubmit } from "./hooks/useMaintenanceFormSubmit";
import { MaintenanceFormValues } from "./hooks/useMaintenanceForm";
import EquipmentFields from "./EquipmentFields";
import FormSubmitButtons from "./FormSubmitButtons";
import LoadingState from "./LoadingState";
import useFormValidation from "./hooks/useFormValidation";

interface MaintenanceCheckFormProps {
  onComplete: () => void;
}

const MaintenanceCheckForm = ({ onComplete }: MaintenanceCheckFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useMaintenanceForm();
  const handleSubmit = useMaintenanceFormSubmit(onComplete);
  const validateForm = useFormValidation();

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

  const onSubmit = async (values: MaintenanceFormValues) => {
    console.log('Form submission started with values:', values);
    
    if (isSubmitting) {
      console.log('Preventing double submission');
      return;
    }
    
    if (!validateForm(values)) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      await handleSubmit(values);
    } finally {
      console.log('Form submission completed');
      setIsSubmitting(false);
    }
  };

  const selectedEquipment = equipment?.find(
    (eq) => eq.id === form.watch('equipment_id')
  );

  // Determine equipment type directly in this component
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
  const isLoading = isLoadingEquipment || isLoadingTechnicians;

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <Form {...form}>
      <form 
        className="space-y-6 bg-white p-6 rounded-lg shadow"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form.getValues());
        }}
      >
        <MaintenanceBasicInfo 
          form={form} 
          equipment={equipment || []} 
          technicians={technicians || []} 
        />
        
        <EquipmentFields form={form} equipmentType={equipmentType} />

        <FormSubmitButtons onCancel={onComplete} isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};

export default MaintenanceCheckForm;
