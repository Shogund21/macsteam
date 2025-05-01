
import { useToast } from "@/hooks/use-toast";
import { MaintenanceCheck } from "@/types/maintenance";
import { MaintenanceFormValues } from "./schema/maintenanceFormSchema";
import { detectEquipmentType, isValidEquipmentType } from "./utils/equipmentTypeDetection";
import { mapMaintenanceData } from "./services/maintenanceDataMapper";
import { maintenanceDbService } from "./services/maintenanceDbService";

/**
 * Hook for handling maintenance form submission
 */
export const useMaintenanceFormSubmit = (
  onComplete: () => void,
  initialData?: MaintenanceCheck
) => {
  const { toast } = useToast();

  /**
   * Handle form submission
   */
  const handleSubmit = async (values: MaintenanceFormValues) => {
    try {
      console.log('Submitting form with values:', JSON.stringify(values, null, 2));
      console.log('Update mode:', !!initialData);
      console.log('Location ID in form values:', values.location_id);
      
      if (!values.location_id) {
        console.error('No location_id provided in form values');
        toast({
          variant: "destructive",
          title: "Missing Location",
          description: "Please select a location before submitting.",
        });
        throw new Error('Location is required');
      }
      
      if (initialData) {
        console.log('Initial data ID for update:', initialData.id);
        console.log('Initial data location_id:', initialData.location_id);
      }
      
      // Get equipment details to determine type
      const equipment = await maintenanceDbService.getEquipment(values.equipment_id);
      
      // Determine equipment type from name
      const equipmentType = detectEquipmentType(equipment.name);
      console.log('Detected equipment type:', equipmentType);
      console.log('Equipment associated with location:', equipment.location);
      console.log('Form location_id:', values.location_id);
      
      // Validate equipment type
      if (!isValidEquipmentType(equipmentType)) {
        console.error('Invalid equipment type detected:', equipmentType);
        throw new Error('Invalid equipment type');
      }
      
      // Map form data to database schema
      const submissionData = mapMaintenanceData(values, equipmentType, !!initialData);
      
      // Ensure location_id is in the submission data
      if (!submissionData.location_id) {
        console.error('No location_id in submission data after mapping');
        submissionData.location_id = values.location_id;
        console.log('Manually added location_id to submission data:', values.location_id);
      }
      
      console.log('Final submission data:', JSON.stringify(submissionData, null, 2));
      
      // Submit to database (update or create)
      let dbResponse;
      if (initialData && initialData.id) {
        console.log('Updating existing check with ID:', initialData.id);
        dbResponse = await maintenanceDbService.updateMaintenanceCheck(initialData.id, submissionData);
        console.log('Update response:', dbResponse);
      } else {
        dbResponse = await maintenanceDbService.createMaintenanceCheck(submissionData);
        console.log('Create response:', dbResponse);
      }
      
      // Handle errors
      if (dbResponse.error) {
        console.error('Submission error:', dbResponse.error);
        throw dbResponse.error;
      }

      console.log('Submission successful!', dbResponse);
      
      // Show success toast and complete
      toast({
        title: "Success",
        description: `Maintenance check ${initialData ? 'updated' : 'recorded'} successfully`,
      });
      
      onComplete();
    } catch (error: any) {
      console.error('Error submitting maintenance check:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || `Failed to ${initialData ? 'update' : 'submit'} maintenance check. Please try again.`,
      });
      throw error; // Re-throw to let the caller handle it
    }
  };

  return handleSubmit;
};
