
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
  
  // Query equipment data and locations
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

  // Query for locations
  const { data: locationsData, isLoading: locationsLoading } = useQuery({
    queryKey: ['locations_for_matrix'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('*');
      
      if (error) {
        console.error('Error fetching locations:', error);
        throw error;
      }
      
      return data || [];
    },
  });

  // Process equipment data into health matrix format
  useEffect(() => {
    if (!equipmentData) {
      // Sample data if no real data is available
      const sampleData: EquipmentHealthItem[] = [
        {
          location: "Building A - North Wing",
          operational: 12,
          needsMaintenance: 3,
          outOfService: 1,
          total: 16,
          riskScore: 87.5,
          riskLevel: "low"
        },
        {
          location: "Building B - Maintenance Floor",
          operational: 8,
          needsMaintenance: 5,
          outOfService: 2,
          total: 15,
          riskScore: 73.3,
          riskLevel: "medium"
        },
        {
          location: "Central Utility Plant",
          operational: 5,
          needsMaintenance: 7,
          outOfService: 4,
          total: 16,
          riskScore: 56.3,
          riskLevel: "high"
        },
        {
          location: "Building C - Main Floor",
          operational: 14,
          needsMaintenance: 2,
          outOfService: 0,
          total: 16,
          riskScore: 93.8,
          riskLevel: "low"
        },
        {
          location: "Dadeland Office",
          operational: 7,
          needsMaintenance: 4,
          outOfService: 1,
          total: 12,
          riskScore: 75.0,
          riskLevel: "medium"
        }
      ];
      
      setHealthData(sampleData);
      return;
    }
    
    // Create a map based on locations from the database
    const locationMap = new Map<string, EquipmentHealthItem>();
    
    // Initialize with real locations from the database
    if (locationsData && locationsData.length > 0) {
      locationsData.forEach(location => {
        const locationName = location.name || location.store_number;
        if (locationName) {
          locationMap.set(locationName, {
            location: locationName,
            operational: 0,
            needsMaintenance: 0,
            outOfService: 0,
            total: 0,
            riskScore: 0,
            riskLevel: "low"
          });
        }
      });
    }
    
    // Process equipment data and group by location
    equipmentData.forEach(equipment => {
      if (!equipment.location) return;
      
      // Check if this location exists in our map
      if (!locationMap.has(equipment.location)) {
        locationMap.set(equipment.location, {
          location: equipment.location,
          operational: 0,
          needsMaintenance: 0,
          outOfService: 0,
          total: 0,
          riskScore: 0,
          riskLevel: "low"
        });
      }
      
      const locationData = locationMap.get(equipment.location)!;
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
    locationMap.forEach(location => {
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
    const processedData = Array.from(locationMap.values())
      .filter(item => item.total > 0) // Only show locations with equipment
      .sort((a, b) => b.riskScore - a.riskScore);
      
    if (processedData.length > 0) {
      setHealthData(processedData);
    }
  }, [equipmentData, locationsData]);

  const isLoading = equipmentLoading || locationsLoading;
  return { healthData, isLoading };
};
