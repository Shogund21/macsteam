
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
      
      // Validate location is present
      if (!values.location_id) {
        console.error('No location_id provided in form values');
        toast({
          variant: "destructive",
          title: "Missing Location",
          description: "Please select a location before submitting.",
        });
        throw new Error('Location is required');
      }
      
      // Validate that equipment is selected
      if (!values.equipment_id) {
        console.error('No equipment_id provided in form values');
        toast({
          variant: "destructive",
          title: "Missing Equipment",
          description: "Please select equipment before submitting.",
        });
        throw new Error('Equipment is required');
      }
      
      // Validate that technician is selected
      if (!values.technician_id) {
        console.error('No technician_id provided in form values');
        toast({
          variant: "destructive",
          title: "Missing Technician",
          description: "Please select a technician before submitting.",
        });
        throw new Error('Technician is required');
      }
      
      if (initialData) {
        console.log('Initial data ID for update:', initialData.id);
        console.log('Initial data location_id:', initialData.location_id);
      }
      
      // Get equipment details to determine type
      const equipment = await maintenanceDbService.getEquipment(values.equipment_id);
      console.log('Retrieved equipment details:', equipment);
      
      // Verify equipment belongs to selected location
      if (equipment.location !== values.location_id) {
        console.warn('Equipment location mismatch:', {
          equipment_location: equipment.location,
          selected_location: values.location_id
        });
        
        // We'll allow this but log a warning - the form should prevent this situation
        console.warn('Proceeding with submission despite location mismatch');
      }
      
      // Determine equipment type from name
      const equipmentType = detectEquipmentType(equipment.name);
      console.log('Detected equipment type:', equipmentType);
      
      // Validate equipment type
      if (!isValidEquipmentType(equipmentType)) {
        console.error('Invalid equipment type detected:', equipmentType);
        throw new Error('Invalid equipment type');
      }
      
      // Map form data to database schema
      const submissionData = mapMaintenanceData(values, equipmentType, !!initialData);
      
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
