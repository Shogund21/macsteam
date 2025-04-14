import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { BarChartDataItem } from "@/components/charts/BarChart";
import { useAnalyticsFilters } from "../AnalyticsFilterContext";

export interface LocationBreakdownData extends BarChartDataItem {
  name: string;
  value: number;
  region?: string; // Optional region field for grouping
  floor?: string;  // Optional floor field for grouping
}

export const useLocationBreakdownData = () => {
  const [chartData, setChartData] = useState<LocationBreakdownData[]>([]);
  const isMobile = useIsMobile();
  const { dateRange } = useAnalyticsFilters();

  const { data: equipmentData, isLoading } = useQuery({
    queryKey: ['equipment_by_location', dateRange],
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

  const extractLocationInfo = (location: string): { 
    displayName: string, 
    region?: string,
    floor?: string 
  } => {
    // Check if location contains building/region information
    // Format examples: "Building A - Floor 1", "Region North - Site 123", etc.
    
    // Extract Building/Region
    let region: string | undefined;
    let floor: string | undefined;
    let displayName = location;
    
    // Look for building pattern
    const buildingMatch = location.match(/Building\s+([A-Za-z])\s*-?\s*(.*)/i);
    if (buildingMatch) {
      region = `Building ${buildingMatch[1]}`;
      displayName = buildingMatch[2] ? buildingMatch[2].trim() : location;
    }
    
    // Look for floor pattern
    const floorMatch = location.match(/Floor\s+(\d+)/i) || 
                      displayName.match(/(\d+)(st|nd|rd|th)\s+Floor/i);
    if (floorMatch) {
      floor = `Floor ${floorMatch[1]}`;
    }
    
    return { displayName, region, floor };
  };

  useEffect(() => {
    // Sample data that will be used when no data is available
    const sampleData = [
      { name: "Dadeland Home", value: 8, region: "North" },
      { name: "777", value: 7, region: "East" },
      { name: "778", value: 6, region: "East" },
      { name: "776A", value: 5, region: "West" },
      { name: "776B", value: 3, region: "West" },
      { name: "Dadeland", value: 3, region: "North" },
      { name: "806", value: 2, region: "South" }
    ].slice(0, isMobile ? 7 : 9);
    
    if (equipmentData && equipmentData.length > 0) {
      // Filter out equipment from removed locations
      const filteredEquipmentData = equipmentData.filter(eq => 
        !['Building A - Basement', 'Building B - Basement'].includes(eq.location)
      );

      // Group equipment by location including region/floor info if available
      const locationDataMap = new Map<string, LocationBreakdownData>();
      
      filteredEquipmentData.forEach(eq => {
        if (!eq.location) return;
        
        const locationInfo = extractLocationInfo(eq.location);
        const locationKey = eq.location;
        
        if (!locationDataMap.has(locationKey)) {
          locationDataMap.set(locationKey, { 
            name: eq.location,
            value: 1,
            region: locationInfo.region,
            floor: locationInfo.floor
          });
        } else {
          const existing = locationDataMap.get(locationKey)!;
          existing.value += 1;
        }
      });
      
      // Convert to array and sort by count (descending)
      let data = Array.from(locationDataMap.values())
        .sort((a, b) => b.value - a.value);
        
      // Group by region if we have regions
      const hasRegions = data.some(item => item.region);
      
      if (hasRegions) {
        // Aggregate by region
        const regionMap = new Map<string, number>();
        
        data.forEach(item => {
          const regionKey = item.region || 'Other';
          regionMap.set(regionKey, (regionMap.get(regionKey) || 0) + item.value);
        });
        
        // Add region information to the display name if it exists
        data = data.map(item => ({
          ...item,
          name: item.region ? `${item.region} - ${item.name}` : item.name
        }));
      }
      
      // Limit to top locations
      data = data.slice(0, isMobile ? 7 : 9);
      
      if (data.length > 0) {
        setChartData(data);
      } else {
        setChartData(sampleData);
      }
    } else {
      // Always use sample data if no real data is available
      setChartData(sampleData);
    }
  }, [equipmentData, isMobile]);

  return { chartData, isLoading };
};
