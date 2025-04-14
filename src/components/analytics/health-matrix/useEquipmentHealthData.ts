
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
  
  // Query equipment data with proper filtering
  const { data: equipmentData, isLoading: equipmentLoading } = useQuery({
    queryKey: ['equipment_health_matrix', dateRange],
    queryFn: async () => {
      console.log('Fetching equipment data with date range:', dateRange);
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
        console.error('Error fetching equipment data:', error);
        throw error;
      }
      
      console.log('Fetched equipment data:', data?.length || 0, 'items');
      if (data && data.length > 0) {
        console.log('Sample equipment data:', data[0]);
      }
      return data || [];
    },
  });

  // Fetch all locations to get accurate store numbers
  const { data: locationsData, isLoading: locationsLoading } = useQuery({
    queryKey: ['locations_for_matrix'],
    queryFn: async () => {
      console.log('Fetching locations data');
      const { data, error } = await supabase
        .from('locations')
        .select('id, store_number, name')
        .eq('is_active', true);
      
      if (error) {
        console.error('Error fetching locations:', error);
        throw error;
      }
      
      console.log('Fetched locations:', data?.length || 0, 'items');
      if (data && data.length > 0) {
        console.log('Sample location data:', data[0]);
      }
      return data || [];
    },
  });

  // Process equipment data into health matrix format whenever data changes
  useEffect(() => {
    if (!equipmentData || !locationsData) {
      console.log('Missing data for processing:', {
        hasEquipment: !!equipmentData,
        hasLocations: !!locationsData
      });
      return;
    }
    
    console.log('Processing data for health matrix:',
      equipmentData.length, 'equipment items,',
      locationsData.length, 'locations'
    );
    
    const processedData = processEquipmentHealthData(equipmentData, locationsData);
    console.log('Processed health data:', processedData);
    setHealthData(processedData);
  }, [equipmentData, locationsData]);

  const isLoading = equipmentLoading || locationsLoading;
  return { healthData, isLoading };
};
