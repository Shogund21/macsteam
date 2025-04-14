
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAnalyticsFilters } from "../AnalyticsFilterContext";
import { normalizeString } from "@/utils/locationMatching";

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

  // Process equipment data into health matrix format using only store numbers
  useEffect(() => {
    if (!equipmentData || !locationsData || equipmentData.length === 0) {
      return;
    }
    
    console.log('Processing equipment data:', equipmentData.length, 'items');
    console.log('Processing locations data:', locationsData.length, 'items');
    
    // Create a map of store numbers to EquipmentHealthItem
    const storeNumberMap = new Map<string, EquipmentHealthItem>();
    
    // Initialize map with store numbers from database
    locationsData.forEach(location => {
      if (!location.store_number) return;
      
      storeNumberMap.set(location.store_number, {
        location: location.store_number,
        operational: 0,
        needsMaintenance: 0,
        outOfService: 0,
        total: 0,
        riskScore: 0,
        riskLevel: "low"
      });
    });
    
    // Map equipment to store numbers using best match available
    equipmentData.forEach(equipment => {
      if (!equipment.location) return;
      
      // Try to find a matching store number
      let matchedStoreNumber: string | undefined;
      
      // First, direct match with location
      const normalizedEquipLocation = normalizeString(equipment.location);
      
      // Try to match with store number first (direct match)
      matchedStoreNumber = locationsData.find(loc => 
        normalizedEquipLocation === normalizeString(loc.store_number)
      )?.store_number;
      
      // If no match, try to find a location where equipment location contains the store number
      if (!matchedStoreNumber) {
        matchedStoreNumber = locationsData.find(loc => 
          loc.store_number && normalizedEquipLocation.includes(normalizeString(loc.store_number))
        )?.store_number;
      }
      
      // If still no match, try to match with location name
      if (!matchedStoreNumber) {
        matchedStoreNumber = locationsData.find(loc => 
          loc.name && normalizedEquipLocation.includes(normalizeString(loc.name))
        )?.store_number;
      }
      
      if (!matchedStoreNumber) return;
      console.log(`Matched equipment "${equipment.name}" to store number: ${matchedStoreNumber}`);
      
      // Get or create the health data entry for this store number
      if (!storeNumberMap.has(matchedStoreNumber)) {
        storeNumberMap.set(matchedStoreNumber, {
          location: matchedStoreNumber,
          operational: 0,
          needsMaintenance: 0,
          outOfService: 0,
          total: 0,
          riskScore: 0,
          riskLevel: "low"
        });
      }
      
      const locationData = storeNumberMap.get(matchedStoreNumber)!;
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
    
    console.log('Processed health data:', processedData);
    setHealthData(processedData);
  }, [equipmentData, locationsData]);

  const isLoading = equipmentLoading || locationsLoading;
  return { healthData, isLoading };
};
