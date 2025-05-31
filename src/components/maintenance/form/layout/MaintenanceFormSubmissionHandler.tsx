
import React from "react";
import { MaintenanceCheck } from "@/types/maintenance";
import { useMaintenanceFormSubmit } from "../hooks/useMaintenanceFormSubmit";
import useFormValidation from "../hooks/useFormValidation";

interface MaintenanceFormSubmissionHandlerProps {
  onComplete: () => void;
  initialData?: MaintenanceCheck;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  children: (onSubmitForm: (values: any) => Promise<void>, manualSubmit: () => void) => React.ReactNode;
  form: any;
}

const MaintenanceFormSubmissionHandler = ({ 
  onComplete, 
  initialData, 
  isSubmitting, 
  setIsSubmitting, 
  children,
  form 
}: MaintenanceFormSubmissionHandlerProps) => {
  const handleSubmit = useMaintenanceFormSubmit(onComplete, initialData);
  const validateForm = useFormValidation();

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

  return <>{children(onSubmitForm, manualSubmit)}</>;
};

export default MaintenanceFormSubmissionHandler;
