
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
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .eq('id', equipmentId)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching equipment:', error);
      throw new Error('Failed to fetch equipment details');
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
    const response = await supabase
      .from('hvac_maintenance_checks')
      .update(data)
      .eq('id', checkId);
      
    return response;
  },

  /**
   * Creates a new maintenance check
   */
  async createMaintenanceCheck(data: any) {
    console.log('Creating new record');
    const response = await supabase
      .from('hvac_maintenance_checks')
      .insert(data);
      
    return response;
  }
};
