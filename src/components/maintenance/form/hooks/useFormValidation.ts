
import { useToast } from "@/hooks/use-toast";
import { MaintenanceFormValues } from "./schema/maintenanceFormSchema";

export const useFormValidation = () => {
  const { toast } = useToast();
  
  const validateForm = (values: MaintenanceFormValues): boolean => {
    // Check required fields
    if (!values.equipment_id || !values.technician_id) {
      console.error('Missing required fields:', { 
        equipment_id: values.equipment_id, 
        technician_id: values.technician_id 
      });
      
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please select both equipment and technician",
      });
      
      return false;
    }
    
    // Log form values for debugging
    console.log('Validating form with values:', {
      equipment_id: values.equipment_id,
      location_id: values.location_id || 'not set'
    });
    
    // Add additional validation as needed here
    
    return true;
  };
  
  return validateForm;
};

export default useFormValidation;
