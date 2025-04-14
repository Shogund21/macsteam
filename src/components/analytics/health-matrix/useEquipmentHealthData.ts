
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAnalyticsFilters } from "../AnalyticsFilterContext";
import { EquipmentHealthItem } from "./types";
import { processEquipmentHealthData } from "./utils/equipmentHealthDataProcessor";

export type { EquipmentHealthItem } from "./types";

export const useEquipmentHealthData = () => {
  const [healthData, setHealthData] = useState<EquipmentHealthItem[]>([]);
  const { dateRange } = useAnalyticsFilters();
  
  // Query equipment data
  const { data: equipmentData, isLoading: equipmentLoading } = useQuery({
    queryKey: ['equipment_health_matrix', dateRange],
    queryFn: async () => {
      let query = supabase
        .from('equipment')
        .select('*');
      
      // Apply date filters if available
      if (dateRange.from) {
        query = query.gte('lastMaintenance', dateRange.from.toISOString());
      }
      
      if (dateRange.to) {
        query = query.lte('lastMaintenance', dateRange.to.toISOString());
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }
      
      return data || [];
    },
  });

  // Query for locations to get store numbers
  const { data: locationsData, isLoading: locationsLoading } = useQuery({
    queryKey: ['locations_for_matrix'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('id, store_number, name')
        .eq('is_active', true);
      
      if (error) {
        console.error('Error fetching locations:', error);
        throw error;
      }
      
      console.log('Fetched locations:', data);
      return data || [];
    },
  });

  // Process equipment data into health matrix format
  useEffect(() => {
    if (!equipmentData || !locationsData) {
      return;
    }
    
    const processedData = processEquipmentHealthData(equipmentData, locationsData);
    setHealthData(processedData);
  }, [equipmentData, locationsData]);

  const isLoading = equipmentLoading || locationsLoading;
  return { healthData, isLoading };
};
