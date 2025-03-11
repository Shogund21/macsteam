
import { useQuery } from "@tanstack/react-query";
import { 
  LineChart, 
  Line, 
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
import { format, parseISO, startOfMonth, endOfMonth, eachMonthOfInterval, isSameMonth } from "date-fns";

const MaintenanceTrends = () => {
  const { dateRange } = useAnalyticsFilters();
  const [chartData, setChartData] = useState<any[]>([]);

  const { data: maintenanceData, isLoading } = useQuery({
    queryKey: ['maintenance_checks_trends', dateRange],
    queryFn: async () => {
      let query = supabase
        .from('hvac_maintenance_checks')
        .select('*');
      
      // If date range is provided, filter by it
      if (dateRange.from) {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        
        // Use the earlier of dateRange.from or sixMonthsAgo
        const startDate = dateRange.from < sixMonthsAgo ? dateRange.from : sixMonthsAgo;
        query = query.gte('check_date', startDate.toISOString());
      }
      
      if (dateRange.to) {
        query = query.lte('check_date', dateRange.to.toISOString());
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching maintenance checks:', error);
        throw error;
      }
      return data;
    },
  });

  useEffect(() => {
    if (maintenanceData) {
      // Generate a range of months from 6 months ago to now
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      
      const monthsRange = eachMonthOfInterval({
        start: sixMonthsAgo,
        end: new Date()
      });
      
      // Initialize data with all months
      const monthlyData = monthsRange.map(month => ({
        month: format(month, 'MMM yyyy'),
        completed: 0,
        pending: 0,
        issues: 0,
        total: 0
      }));
      
      // Count maintenance checks by month and status
      maintenanceData.forEach(check => {
        if (!check.check_date) return;
        
        const checkDate = parseISO(check.check_date);
        const monthIndex = monthsRange.findIndex(month => 
          isSameMonth(month, checkDate)
        );
        
        if (monthIndex >= 0) {
          monthlyData[monthIndex].total += 1;
          
          if (check.status === 'completed') {
            monthlyData[monthIndex].completed += 1;
          } else if (check.status === 'pending') {
            monthlyData[monthIndex].pending += 1;
          } else if (check.status === 'issue_found') {
            monthlyData[monthIndex].issues += 1;
          }
        }
      });
      
      setChartData(monthlyData);
    }
  }, [maintenanceData]);

  if (isLoading) {
    return <div className="h-80 flex items-center justify-center">Loading chart data...</div>;
  }

  if (chartData.length === 0) {
    return <div className="h-80 flex items-center justify-center">No maintenance trend data available</div>;
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="total" 
            name="Total Checks" 
            stroke="#8884d8" 
            activeDot={{ r: 8 }} 
          />
          <Line 
            type="monotone" 
            dataKey="completed" 
            name="Completed" 
            stroke="#00C49F" 
          />
          <Line 
            type="monotone" 
            dataKey="pending" 
            name="Pending" 
            stroke="#FFBB28" 
          />
          <Line 
            type="monotone" 
            dataKey="issues" 
            name="Issues Found" 
            stroke="#FF8042" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MaintenanceTrends;
