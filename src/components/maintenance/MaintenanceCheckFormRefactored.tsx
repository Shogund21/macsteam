
import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import { MaintenanceCheck } from "@/types/maintenance";
import { useMaintenanceForm } from "./form/hooks/useMaintenanceForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { MaintenanceFormProvider } from "./context/MaintenanceFormContext";
import MaintenanceFormHeader from "./form/layout/MaintenanceFormHeader";
import MaintenanceFormBody from "./form/layout/MaintenanceFormBody";
import FormActions from "./form/FormActions";
import { useMaintenanceData } from "./form/hooks/useMaintenanceData";
import MaintenanceFormLoader from "./form/layout/MaintenanceFormLoader";
import MaintenanceFormSubmissionHandler from "./form/layout/MaintenanceFormSubmissionHandler";
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
  const { equipment, technicians, isLoading, error } = useMaintenanceData();
  const { selectedEquipment, equipmentType } = useEquipmentTypeLogic(equipment, form);

  return (
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
        )}
      </MaintenanceFormSubmissionHandler>
    </MaintenanceFormLoader>
  );
};

export default MaintenanceCheckForm;
