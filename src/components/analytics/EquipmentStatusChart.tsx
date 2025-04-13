
import { useQuery } from "@tanstack/react-query";
import PieChart, { PieChartDataItem } from "@/components/charts/PieChart";
import { supabase } from "@/integrations/supabase/client";
import { useAnalyticsFilters } from "./AnalyticsFilterContext";
import { useState, useEffect } from "react";
import { useCompanyFilter } from "@/hooks/useCompanyFilter";
import { useIsMobile } from "@/hooks/use-mobile";

// Updated colors for better contrast and visibility
const COLORS = ['#4299E1', '#48BB78', '#F6AD55', '#F56565', '#9B87F5', '#DD6B20', '#38B2AC'];

const EquipmentStatusChart = () => {
  const { dateRange } = useAnalyticsFilters();
  const { companyId } = useCompanyFilter();
  const [chartData, setChartData] = useState<PieChartDataItem[]>([]);
  const isMobile = useIsMobile();

  const { data: equipmentData, isLoading } = useQuery({
    queryKey: ['equipment', dateRange, companyId],
    queryFn: async () => {
      let query = supabase
        .from('equipment')
        .select('*');
      
      // Apply company filter if available
      if (companyId) {
        query = query.eq('company_id', companyId);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }
      return data || [];
    },
  });

  useEffect(() => {
    if (equipmentData && equipmentData.length > 0) {
      // Count equipment by status and ensure unique entries
      const statusMap = new Map<string, number>();
      
      equipmentData.forEach(eq => {
        const status = eq.status || 'Unknown';
        statusMap.set(status, (statusMap.get(status) || 0) + 1);
      });
      
      // Convert to chart data format
      const data = Array.from(statusMap.entries()).map(([name, value]) => ({
        name,
        value
      }));
      
      // Sort by value in descending order for better visualization
      data.sort((a, b) => b.value - a.value);
      
      // Limit to top statuses
      setChartData(isMobile ? data.slice(0, 4) : data.slice(0, 6));
    } else {
      // Sample data for preview when no data is available
      const sampleData = [
        { name: "Operational", value: 35 },
        { name: "Working", value: 25 },
        { name: "Offline", value: 15 },
        { name: "Unknown", value: 13 },
        { name: "Maintenance", value: 7 },
        { name: "Repair", value: 5 }
      ];
      setChartData(isMobile ? sampleData.slice(0, 4) : sampleData);
    }
  }, [equipmentData, isMobile]);

  if (isLoading && chartData.length === 0) {
    return <div className="flex items-center justify-center h-full min-h-[300px]">Loading chart data...</div>;
  }

  // Calculate total equipment count for percentage calculation
  const totalEquipment = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="chart-container">
      <PieChart 
        data={chartData}
        colors={COLORS}
        height={420}
        tooltipFormatter={(value, name) => [
          `${value} (${((value / totalEquipment) * 100).toFixed(1)}%)`, 
          name
        ]}
      />
    </div>
  );
};

export default EquipmentStatusChart;
