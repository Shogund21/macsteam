
import { useQuery } from "@tanstack/react-query";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useAnalyticsFilters } from "./AnalyticsFilterContext";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const TechnicianPerformance = () => {
  const { dateRange } = useAnalyticsFilters();
  const [chartData, setChartData] = useState<any[]>([]);
  const isMobile = useIsMobile();

  // Fetch technicians for names
  const { data: technicians } = useQuery({
    queryKey: ['technicians'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('technicians')
        .select('*');
      
      if (error) {
        console.error('Error fetching technicians:', error);
        throw error;
      }
      return data || [];
    },
  });

  // Fetch maintenance checks
  const { data: maintenanceData, isLoading } = useQuery({
    queryKey: ['maintenance_checks_by_technician', dateRange],
    queryFn: async () => {
      let query = supabase
        .from('hvac_maintenance_checks')
        .select('*');
      
      if (dateRange.from) {
        query = query.gte('check_date', dateRange.from.toISOString());
      }
      
      if (dateRange.to) {
        query = query.lte('check_date', dateRange.to.toISOString());
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching maintenance checks:', error);
        throw error;
      }
      return data || [];
    },
  });

  useEffect(() => {
    if (maintenanceData && technicians) {
      // Create a lookup map for technician names
      const technicianMap = new Map();
      technicians.forEach(tech => {
        technicianMap.set(tech.id, `${tech.firstName} ${tech.lastName}`);
      });
      
      // Group maintenance checks by technician
      const techPerformance: Record<string, { completed: number; pending: number; issues: number }> = {};
      
      maintenanceData.forEach(check => {
        if (!check.technician_id) return;
        
        const techId = check.technician_id;
        if (!techPerformance[techId]) {
          techPerformance[techId] = { completed: 0, pending: 0, issues: 0 };
        }
        
        if (check.status === 'completed') {
          techPerformance[techId].completed += 1;
        } else if (check.status === 'pending') {
          techPerformance[techId].pending += 1;
        } else if (check.status === 'issue_found') {
          techPerformance[techId].issues += 1;
        }
      });
      
      // Format for chart - convert to array, add names, and sort by completed checks
      const formattedData = Object.entries(techPerformance)
        .map(([techId, stats]) => ({
          name: technicianMap.get(techId) || 'Unknown Technician',
          ...stats,
          total: stats.completed + stats.pending + stats.issues
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, isMobile ? 3 : 5); // Show fewer technicians on mobile
      
      // If no data, add sample data for preview
      if (formattedData.length === 0) {
        formattedData.push(
          { name: "Filip Carter", completed: 28, pending: 5, issues: 2, total: 35 },
          { name: "Emma Johnson", completed: 22, pending: 3, issues: 1, total: 26 },
          { name: "David Smith", completed: 18, pending: 7, issues: 3, total: 28 }
        );
        
        if (!isMobile) {
          formattedData.push(
            { name: "Sarah Brown", completed: 15, pending: 2, issues: 0, total: 17 },
            { name: "Michael Davis", completed: 12, pending: 4, issues: 1, total: 17 }
          );
        }
      }
      
      setChartData(formattedData);
    } else {
      // Add sample data for preview when no data is available
      const sampleData = [
        { name: "Filip Carter", completed: 28, pending: 5, issues: 2, total: 35 },
        { name: "Emma Johnson", completed: 22, pending: 3, issues: 1, total: 26 },
        { name: "David Smith", completed: 18, pending: 7, issues: 3, total: 28 }
      ];
      
      if (!isMobile) {
        sampleData.push(
          { name: "Sarah Brown", completed: 15, pending: 2, issues: 0, total: 17 },
          { name: "Michael Davis", completed: 12, pending: 4, issues: 1, total: 17 }
        );
      }
      
      setChartData(sampleData);
    }
  }, [maintenanceData, technicians, isMobile]);

  if (isLoading && chartData.length === 0) {
    return <div className="flex items-center justify-center h-full min-h-[250px]">Loading chart data...</div>;
  }

  return (
    <div className="h-[300px] md:h-[350px] w-full chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 10,
            right: isMobile ? 30 : 60,
            left: isMobile ? 80 : 120,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            tick={{ fontSize: isMobile ? 10 : 12, fontWeight: 600 }}
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            tick={{ fontSize: isMobile ? 10 : 12, fontWeight: 600, fill: '#333' }} 
            width={isMobile ? 80 : 120}
            tickFormatter={(value) => {
              // Truncate long names on mobile
              if (isMobile && value.length > 8) {
                return `${value.slice(0, 8)}...`;
              }
              return value;
            }}
          />
          <Tooltip 
            contentStyle={{ 
              fontSize: isMobile ? '12px' : '14px', 
              fontWeight: 'medium', 
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }} 
          />
          <Legend 
            wrapperStyle={{ 
              fontSize: isMobile ? '10px' : '12px', 
              fontWeight: 'medium',
              paddingTop: '10px'
            }}
            verticalAlign="bottom"
            align="center"
            layout={isMobile ? "vertical" : "horizontal"}
          />
          <Bar dataKey="completed" name="Completed" fill="#00C49F" />
          <Bar dataKey="pending" name="Pending" fill="#FFBB28" />
          <Bar dataKey="issues" name="Issues Found" fill="#FF8042" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TechnicianPerformance;
