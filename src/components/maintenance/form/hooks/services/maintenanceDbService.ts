
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
    
    const { data: result, error } = await supabase
      .from('hvac_maintenance_checks')
      .update(data)
      .eq('id', checkId)
      .select();
      
    if (error) {
      console.error('Error updating maintenance check:', error);
      throw new Error(`Failed to update maintenance check: ${error.message}`);
    }
    
    console.log('Update successful, affected rows:', result?.length || 0);
    return { data: result, error };
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
    
    const { data: result, error } = await supabase
      .from('hvac_maintenance_checks')
      .insert(data)
      .select();
      
    if (error) {
      console.error('Error creating maintenance check:', error);
      throw new Error(`Failed to create maintenance check: ${error.message}`);
    }
    
    console.log('Creation successful, new record:', result);
    return { data: result, error };
  }
};
