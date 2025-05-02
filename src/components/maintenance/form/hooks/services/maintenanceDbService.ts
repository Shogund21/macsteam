
import { supabase } from "@/integrations/supabase/client";
import { MaintenanceCheck } from "@/types/maintenance";

/**
 * Handles database operations for maintenance checks
 */
export const maintenanceDbService = {
  /**
   * Fetches equipment details
   */
  async getEquipment(equipmentId: string) {
    console.log('Fetching equipment details for ID:', equipmentId);
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .eq('id', equipmentId)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching equipment:', error);
      throw new Error(`Failed to fetch equipment details: ${error.message}`);
    }
    
    if (!data) {
      console.error('Equipment not found for ID:', equipmentId);
      throw new Error('Equipment not found');
    }
    
    return data;
  },

  /**
   * Updates an existing maintenance check
   */
  async updateMaintenanceCheck(checkId: string, data: any) {
    console.log('Updating existing record with ID:', checkId);
    console.log('Update data:', JSON.stringify(data, null, 2));
    
    if (!checkId) {
      throw new Error('Missing maintenance check ID for update');
    }
    
    // Ensure we're not sending undefined values
    Object.keys(data).forEach(key => {
      if (data[key] === undefined) {
        console.log(`Removing undefined value for field: ${key}`);
        delete data[key];
      }
    });
    
    // Add updated_at timestamp
    data.updated_at = new Date().toISOString();
    
    // CRITICAL VERIFICATION: Log the exact location_id we're about to submit
    console.log('FINAL LOCATION ID FOR UPDATE:', data.location_id);
    
    try {
      const { data: result, error } = await supabase
        .from('hvac_maintenance_checks')
        .update(data)
        .eq('id', checkId)
        .select();
        
      if (error) {
        console.error('Error updating maintenance check:', error);
        throw error;
      }
      
      console.log('Update successful, affected rows:', result?.length || 0);
      console.log('Updated record:', result?.[0]);
      
      // Verify that the location_id was correctly saved
      if (result && result.length > 0 && result[0].location_id !== data.location_id) {
        console.error('CRITICAL ERROR: Location ID mismatch after update!', {
          expected: data.location_id,
          actual: result[0].location_id
        });
      } else {
        console.log('Location ID successfully saved as:', data.location_id);
      }
      
      return { data: result, error: null };
    } catch (error: any) {
      console.error('Exception during update operation:', error);
      return { data: null, error };
    }
  },

  /**
   * Creates a new maintenance check
   */
  async createMaintenanceCheck(data: any) {
    console.log('Creating new record');
    console.log('Creation data:', JSON.stringify(data, null, 2));
    
    // Ensure we're not sending undefined values
    Object.keys(data).forEach(key => {
      if (data[key] === undefined) {
        console.log(`Removing undefined value for field: ${key}`);
        delete data[key];
      }
    });
    
    // CRITICAL VERIFICATION: Log the exact location_id we're about to submit
    console.log('FINAL LOCATION ID FOR CREATION:', data.location_id);
    
    try {
      const { data: result, error } = await supabase
        .from('hvac_maintenance_checks')
        .insert(data)
        .select();
        
      if (error) {
        console.error('Error creating maintenance check:', error);
        throw error;
      }
      
      console.log('Creation successful, new record:', result);
      
      // Verify that the location_id was correctly saved
      if (result && result.length > 0 && result[0].location_id !== data.location_id) {
        console.error('CRITICAL ERROR: Location ID mismatch after creation!', {
          expected: data.location_id,
          actual: result[0].location_id
        });
      } else {
        console.log('Location ID successfully saved as:', data.location_id);
      }
      
      return { data: result, error: null };
    } catch (error: any) {
      console.error('Exception during create operation:', error);
      return { data: null, error };
    }
  }
};
