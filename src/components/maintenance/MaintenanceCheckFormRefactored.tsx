
import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import { MaintenanceCheck, Equipment } from "@/types/maintenance";
import { useMaintenanceForm } from "./form/hooks/useMaintenanceForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { MaintenanceFormProvider } from "./context/MaintenanceFormContext";
import MaintenanceFormHeader from "./form/layout/MaintenanceFormHeader";
import MaintenanceFormBody from "./form/layout/MaintenanceFormBody";
import FormActions from "./form/FormActions";
import { useMaintenanceData } from "./form/hooks/useMaintenanceData";
import MaintenanceFormLoader from "./form/layout/MaintenanceFormLoader";
import MaintenanceFormSubmissionHandler from "./form/layout/MaintenanceFormSubmissionHandler";
import MaintenanceFormErrorBoundary from "./form/layout/MaintenanceFormErrorBoundary";
import { useEquipmentTypeLogic } from "./form/hooks/useEquipmentTypeLogic";

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
  const isMobile = useIsMobile();
  const { equipment: rawEquipment, technicians, isLoading, error } = useMaintenanceData();
  
  // Map database fields to Equipment interface (maintenance type)
  const equipment: Equipment[] = rawEquipment?.map(item => ({
    id: item.id,
    name: item.name,
    model: item.model || '',
    serialNumber: item.serial_number || '', // Map snake_case to camelCase
    location: item.location,
    lastMaintenance: item.lastMaintenance || null,
    nextMaintenance: item.nextMaintenance || null,
    status: item.status || ''
  })) || [];

  const { selectedEquipment, equipmentType } = useEquipmentTypeLogic(equipment, form);

  console.log('🚀 MaintenanceCheckForm render:', {
    isMobile,
    hasEquipment: equipment?.length > 0,
    hasTechnicians: technicians?.length > 0,
    isLoading,
    error: error?.message,
    selectedEquipment: selectedEquipment?.name,
    equipmentType,
    formValues: form.getValues()
  });

  return (
    <MaintenanceFormErrorBoundary>
      <MaintenanceFormLoader isLoading={isLoading} error={error}>
        <MaintenanceFormSubmissionHandler
          onComplete={onComplete}
          initialData={initialData}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          form={form}
        >
          {(onSubmitForm, manualSubmit) => (
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
              <div 
                className={`w-full ${isMobile ? 'h-screen flex flex-col bg-white' : 'max-w-4xl mx-auto px-6'}`}
                data-component="maintenance-form-container"
                style={isMobile ? { touchAction: 'pan-y' } : {}}
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitForm)} className="w-full h-full flex flex-col">
                    {isMobile ? (
                      <>
                        {/* Header - fixed */}
                        <div className="flex-shrink-0 px-4 py-3 bg-white border-b border-gray-200 relative z-10">
                          <MaintenanceFormHeader initialData={initialData} isMobile={isMobile} />
                        </div>
                        
                        {/* Form Body - scrollable */}
                        <div 
                          className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50 relative"
                          style={{ 
                            WebkitOverflowScrolling: 'touch',
                            overscrollBehavior: 'contain'
                          }}
                        >
                          <MaintenanceFormBody />
                        </div>
                        
                        {/* Form Actions - fixed bottom */}
                        <div className="flex-shrink-0 px-4 py-3 bg-white border-t border-gray-200 relative z-10">
                          <FormActions 
                            onCancel={onComplete}
                            isEditing={!!initialData}
                            isSubmitting={isSubmitting}
                            onSubmit={manualSubmit}
                          />
                        </div>
                      </>
                    ) : (
                      // Desktop layout
                      <>
                        <MaintenanceFormHeader initialData={initialData} isMobile={isMobile} />
                        <div className="pb-8">
                          <MaintenanceFormBody />
                        </div>
                        <div className="mt-6">
                          <FormActions 
                            onCancel={onComplete}
                            isEditing={!!initialData}
                            isSubmitting={isSubmitting}
                            onSubmit={manualSubmit}
                          />
                        </div>
                      </>
                    )}
                  </form>
                </Form>
              </div>
            </MaintenanceFormProvider>
          )}
        </MaintenanceFormSubmissionHandler>
      </MaintenanceFormLoader>
    </MaintenanceFormErrorBoundary>
  );
};

export default MaintenanceCheckForm;
