
import React, { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { MaintenanceCheck } from "@/types/maintenance";
import { useMaintenanceForm } from "./form/hooks/useMaintenanceForm";
import { useMaintenanceFormSubmit } from "./form/hooks/useMaintenanceFormSubmit";
import { useIsMobile } from "@/hooks/use-mobile";
import useFormValidation from "./form/hooks/useFormValidation";
import { MaintenanceFormProvider } from "./context/MaintenanceFormContext";
import MaintenanceFormHeader from "./form/layout/MaintenanceFormHeader";
import MaintenanceFormBody from "./form/layout/MaintenanceFormBody";
import FormActions from "./form/FormActions";

interface MaintenanceCheckFormProps {
  onComplete: () => void;
  initialData?: MaintenanceCheck;
  isSubmitting?: boolean;
  setIsSubmitting?: (isSubmitting: boolean) => void;
}

const MaintenanceCheckForm = ({ 
  onComplete, 
  initialData,
  isSubmitting: externalIsSubmitting,
  setIsSubmitting: externalSetIsSubmitting
}: MaintenanceCheckFormProps) => {
  const [internalIsSubmitting, setInternalIsSubmitting] = useState(false);
  const isSubmitting = externalIsSubmitting !== undefined ? externalIsSubmitting : internalIsSubmitting;
  const setIsSubmitting = externalSetIsSubmitting || setInternalIsSubmitting;
  
  const form = useMaintenanceForm(initialData);
  const handleSubmit = useMaintenanceFormSubmit(onComplete, initialData);
  const validateForm = useFormValidation();
  const isMobile = useIsMobile();

  // Fetch equipment data
  const { data: equipment = [], isLoading: isLoadingEquipment, error: equipmentError } = useQuery({
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
      
      console.log('Equipment fetched:', data?.length, 'items');
      return data || [];
    },
  });

  // Fetch technicians data
  const { data: technicians = [], isLoading: isLoadingTechnicians, error: techniciansError } = useQuery({
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
      
      console.log('Technicians fetched:', data?.length, 'items');
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
    console.log('Form submission initiated with values:', values);
    
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
    } catch (error) {
      console.error('Error in form submission:', error);
    } finally {
      console.log('Form submission completed');
      setIsSubmitting(false);
    }
  };

  const manualSubmit = () => {
    console.log('Manual submit triggered');
    form.handleSubmit(onSubmitForm)();
  };

  // Show loading state
  if (isLoadingEquipment || isLoadingTechnicians) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
          <span>Loading form data...</span>
        </div>
      </div>
    );
  }

  // Show error state if data loading failed
  if (equipmentError || techniciansError) {
    return (
      <div className="p-4 text-center text-red-600">
        <p>Error loading form data. Please try again.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <MaintenanceFormProvider
      form={form}
      initialData={initialData}
      isSubmitting={isSubmitting}
      setIsSubmitting={setIsSubmitting}
      equipment={equipment}
      technicians={technicians}
      selectedEquipment={selectedEquipment}
      equipmentType={equipmentType}
      isMobile={isMobile}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-6">
          <MaintenanceFormHeader initialData={initialData} isMobile={isMobile} />
          <MaintenanceFormBody />
          
          {/* Form actions */}
          <div className={isMobile ? 'sticky bottom-0 bg-white p-4 border-t shadow-lg' : ''}>
            <FormActions 
              onCancel={onComplete}
              isEditing={!!initialData}
              isSubmitting={isSubmitting}
              onSubmit={manualSubmit}
            />
          </div>
        </form>
      </Form>
    </MaintenanceFormProvider>
  );
};

export default MaintenanceCheckForm;
