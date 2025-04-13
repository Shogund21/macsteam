
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
    if (equipmentData) {
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
        .slice(0, isMobile ? 6 : 8); // Show more locations
      
      setChartData(data);
    }
    
    // If no data or empty data, use sample data for preview
    if (!equipmentData || equipmentData.length === 0) {
      const sampleData = [
        { name: "Main Building", value: 24 },
        { name: "North Wing", value: 18 },
        { name: "South Wing", value: 15 },
        { name: "East Block", value: 12 },
        { name: "West Block", value: 9 },
        { name: "Data Center", value: 6 },
        { name: "Warehouse", value: 5 },
        { name: "Office Complex", value: 4 }
      ].slice(0, isMobile ? 6 : 8);
      setChartData(sampleData);
    }
  }, [equipmentData, isMobile]);

  return { chartData, isLoading };
};
