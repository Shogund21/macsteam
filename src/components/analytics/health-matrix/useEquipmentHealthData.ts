
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAnalyticsFilters } from "../AnalyticsFilterContext";

export interface EquipmentHealthItem {
  location: string;
  operational: number;
  needsMaintenance: number;
  outOfService: number;
  total: number;
  riskScore: number;
  riskLevel: "low" | "medium" | "high";
}

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

  // Query for locations to get store numbers only
  const { data: locationsData, isLoading: locationsLoading } = useQuery({
    queryKey: ['locations_for_matrix'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('id, store_number')
        .eq('is_active', true);
      
      if (error) {
        console.error('Error fetching locations:', error);
        throw error;
      }
      
      return data || [];
    },
  });

  // Process equipment data into health matrix format using only store numbers
  useEffect(() => {
    if (!equipmentData || !locationsData || equipmentData.length === 0) {
      return;
    }
    
    // Create a map of store numbers to EquipmentHealthItem
    const storeNumberMap = new Map<string, EquipmentHealthItem>();
    
    // Initialize map with store numbers from database
    locationsData.forEach(location => {
      const storeNumber = location.store_number;
      
      storeNumberMap.set(storeNumber, {
        location: storeNumber,
        operational: 0,
        needsMaintenance: 0,
        outOfService: 0,
        total: 0,
        riskScore: 0,
        riskLevel: "low"
      });
    });
    
    // Process equipment data and map to store numbers
    equipmentData.forEach(equipment => {
      if (!equipment.location) return;
      
      // Find a matching store number for this equipment
      const matchingLocation = locationsData.find(location => {
        // Exact match with store number
        return equipment.location.includes(location.store_number);
      });
      
      if (!matchingLocation) return;
      
      const storeNumber = matchingLocation.store_number;
      
      // Get or create the health data entry for this store number
      if (!storeNumberMap.has(storeNumber)) {
        storeNumberMap.set(storeNumber, {
          location: storeNumber,
          operational: 0,
          needsMaintenance: 0,
          outOfService: 0,
          total: 0,
          riskScore: 0,
          riskLevel: "low"
        });
      }
      
      const locationData = storeNumberMap.get(storeNumber)!;
      locationData.total += 1;
      
      // Count by status
      if (equipment.status === "Operational") {
        locationData.operational += 1;
      } else if (equipment.status === "Needs Maintenance") {
        locationData.needsMaintenance += 1;
      } else if (equipment.status === "Out of Service") {
        locationData.outOfService += 1;
      }
    });
    
    // Calculate risk scores and levels for each location
    storeNumberMap.forEach(location => {
      if (location.total > 0) {
        // Calculate risk score (percentage of equipment that is operational)
        location.riskScore = Math.round((location.operational / location.total) * 100);
        
        // Determine risk level
        if (location.riskScore >= 80) {
          location.riskLevel = "low";
        } else if (location.riskScore >= 60) {
          location.riskLevel = "medium";
        } else {
          location.riskLevel = "high";
        }
      }
    });
    
    // Convert map to array and sort by risk score (descending)
    const processedData = Array.from(storeNumberMap.values())
      .filter(item => item.total > 0) // Only show store numbers with equipment
      .sort((a, b) => b.riskScore - a.riskScore);
      
    setHealthData(processedData);
  }, [equipmentData, locationsData]);

  const isLoading = equipmentLoading || locationsLoading;
  return { healthData, isLoading };
};
