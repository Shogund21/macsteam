
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
      // Log complete form values for debugging
      console.log('Submitting form with values:', JSON.stringify(values, null, 2));
      console.log('Update mode:', !!initialData);
      console.log('Location ID in form values:', values.location_id);
      
      // CRITICAL FIX: Create a stable copy of the form values to prevent any reference issues
      const formValues = { ...values };
      
      // IMPORTANT: Validate location is present
      if (!formValues.location_id) {
        console.error('No location_id provided in form values');
        toast({
          variant: "destructive",
          title: "Missing Location",
          description: "Please select a location before submitting.",
        });
        throw new Error('Location is required');
      }
      
      // Store the original location_id for verification later
      const originalLocationId = formValues.location_id;
      console.log('Original selected location_id:', originalLocationId);
      
      // Validate that equipment is selected
      if (!formValues.equipment_id) {
        console.error('No equipment_id provided in form values');
        toast({
          variant: "destructive",
          title: "Missing Equipment",
          description: "Please select equipment before submitting.",
        });
        throw new Error('Equipment is required');
      }
      
      // Validate that technician is selected
      if (!formValues.technician_id) {
        console.error('No technician_id provided in form values');
        toast({
          variant: "destructive",
          title: "Missing Technician",
          description: "Please select a technician before submitting.",
        });
        throw new Error('Technician is required');
      }
      
      // Get equipment details to determine type
      const equipment = await maintenanceDbService.getEquipment(formValues.equipment_id);
      console.log('Retrieved equipment details:', equipment);
      
      if (!equipment) {
        console.error('Equipment not found with ID:', formValues.equipment_id);
        toast({
          variant: "destructive",
          title: "Equipment Not Found",
          description: "The selected equipment could not be found. Please try again.",
        });
        throw new Error('Equipment not found');
      }
      
      // Log equipment's stored location vs user-selected location
      console.log('Equipment database location:', equipment.location);
      console.log('User-selected location ID:', formValues.location_id);
      
      // Determine equipment type from name
      const equipmentType = detectEquipmentType(equipment.name);
      console.log('Detected equipment type:', equipmentType);
      
      // Validate equipment type
      if (!isValidEquipmentType(equipmentType)) {
        console.error('Invalid equipment type detected:', equipmentType);
        throw new Error('Invalid equipment type');
      }
      
      // CRITICAL FIX: Ensure we're using the original selected location_id
      // This prevents any equipment location from overriding the user selection
      console.log('Ensuring location_id is preserved:', originalLocationId);
      formValues.location_id = originalLocationId;
      
      // Map form data to database schema - using our protected location_id
      const submissionData = mapMaintenanceData(formValues, equipmentType, !!initialData);
      
      // CRITICAL FIX: Verify location_id was not changed during mapping
      console.log('Final submission data location_id:', submissionData.location_id);
      console.log('Original location_id:', originalLocationId);
      
      if (submissionData.location_id !== originalLocationId) {
        console.error('Location ID was changed during mapping! Restoring original value.');
        submissionData.location_id = originalLocationId;
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
