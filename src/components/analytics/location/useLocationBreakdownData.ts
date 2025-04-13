
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { BarChartDataItem } from "@/components/charts/BarChart";

export interface LocationBreakdownData extends BarChartDataItem {
  name: string;
  value: number;
}

export const useLocationBreakdownData = () => {
  const [chartData, setChartData] = useState<LocationBreakdownData[]>([]);
  const isMobile = useIsMobile();

  const { data: equipmentData, isLoading } = useQuery({
    queryKey: ['equipment_by_location'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('equipment')
        .select('*');
      
      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }
      return data || [];
    },
  });

  useEffect(() => {
    // Get location data, regardless of whether equipment data exists
    const sampleData = [
      { name: "Dadeland Home", value: 8 },
      { name: "777", value: 7 },
      { name: "778", value: 6 },
      { name: "776A", value: 5 },
      { name: "776B", value: 3 },
      { name: "Dadeland", value: 3 },
      { name: "806", value: 2 },
      { name: "Building A - Basement", value: 1 },
      { name: "Building B - Basement", value: 1 }
    ].slice(0, isMobile ? 7 : 9);
    
    if (equipmentData && equipmentData.length > 0) {
      // Group equipment by location
      const locationCounts: Record<string, number> = {};
      
      equipmentData.forEach(eq => {
        const location = eq.location || 'Unknown';
        locationCounts[location] = (locationCounts[location] || 0) + 1;
      });
      
      // Convert to chart data format and sort by count (descending)
      const data = Object.entries(locationCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, isMobile ? 7 : 9); // Limit to top locations
      
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
