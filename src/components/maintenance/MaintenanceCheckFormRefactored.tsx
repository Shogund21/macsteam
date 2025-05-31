
import React, { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { MaintenanceCheck, Equipment, Technician } from "@/types/maintenance";
import { useMaintenanceForm } from "./form/hooks/useMaintenanceForm";
import { useMaintenanceFormSubmit } from "./form/hooks/useMaintenanceFormSubmit";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMaintenanceData } from "./form/hooks/useMaintenanceData";
import { useToast } from "@/hooks/use-toast";
import MaintenanceFormHeader from "./form/layout/MaintenanceFormHeader";
import MaintenanceBasicInfo from "./form/MaintenanceBasicInfo";
import FormSection from "./form/FormSection";
import FormActions from "./form/FormActions";
import EquipmentFields from "./form/EquipmentFields";
import DocumentManager from "./documents/DocumentManager";

interface MaintenanceCheckFormProps {
  onComplete: () => void;
  initialData?: MaintenanceCheck;
}

const MaintenanceCheckForm = ({ onComplete, initialData }: MaintenanceCheckFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useMaintenanceForm(initialData);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const handleSubmit = useMaintenanceFormSubmit(onComplete, initialData);
  
  // Get form data
  const { equipment, technicians, isLoading, error } = useMaintenanceData();
  
  // Watch form values
  const equipmentId = form.watch('equipment_id');
  const locationId = form.watch('location_id');
  
  // Direct equipment type detection
  const selectedEquipment = equipment?.find(eq => eq.id === equipmentId);
  
  const getEquipmentType = (equipment: Equipment | undefined): string | null => {
    if (!equipment) return null;
    
    const name = equipment.name.toLowerCase();
    
    // Simple, direct equipment type detection
    if (name.includes('ahu') || name.includes('air handler')) return 'ahu';
    if (name.includes('chiller')) return 'chiller';
    if (name.includes('cooling tower')) return 'cooling_tower';
    if (name.includes('elevator')) return 'elevator';
    if (name.includes('restroom') || name.includes('bathroom')) return 'restroom';
    
    return 'general';
  };
  
  const equipmentType = getEquipmentType(selectedEquipment);
  
  // Debug logging for mobile
  useEffect(() => {
    console.log('MaintenanceCheckForm state:', {
      equipmentId,
      locationId,
      selectedEquipment: selectedEquipment?.name,
      equipmentType,
      shouldShowChecklist: !!equipmentId && equipmentId !== '',
      isMobile
    });
  }, [equipmentId, locationId, selectedEquipment, equipmentType, isMobile]);

  const onSubmitForm = async (values: any) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await handleSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit maintenance check. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
          <span>Loading form data...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
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

  // Determine if we should show the equipment checklist
  const shouldShowEquipmentChecklist = !!(equipmentId && equipmentId !== '' && equipmentType);

  return (
    <div 
      className={`w-full ${isMobile ? 'px-4' : 'max-w-4xl mx-auto px-6'}`}
      data-component="maintenance-form-container"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)} className="w-full space-y-6">
          <MaintenanceFormHeader initialData={initialData} isMobile={isMobile} />
          
          <FormSection title="Basic Information">
            <MaintenanceBasicInfo 
              form={form} 
              equipment={equipment} 
              technicians={technicians} 
            />
          </FormSection>
          
          {/* Equipment-specific checklist - simplified conditional rendering */}
          {shouldShowEquipmentChecklist && (
            <FormSection title="Equipment Maintenance Checklist">
              <EquipmentFields 
                form={form} 
                equipmentType={equipmentType}
              />
            </FormSection>
          )}

          <FormSection title="Documents">
            <DocumentManager equipmentId={equipmentId} />
          </FormSection>
          
          {/* Form actions */}
          <div className={isMobile ? 'sticky bottom-0 bg-white p-4 border-t shadow-lg' : ''}>
            <FormActions 
              onCancel={onComplete}
              isEditing={!!initialData}
              isSubmitting={isSubmitting}
              onSubmit={() => form.handleSubmit(onSubmitForm)()}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MaintenanceCheckForm;
