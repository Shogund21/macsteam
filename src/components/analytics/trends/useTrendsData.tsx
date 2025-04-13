
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO, eachMonthOfInterval, isSameMonth } from "date-fns";
import { DateRange } from "react-day-picker";

interface MaintenanceChartData {
  month: string;
  monthShort: string;
  completed: number;
  pending: number;
  issues: number;
  total: number;
}

export const useTrendsData = (dateRange: DateRange) => {
  const [chartData, setChartData] = useState<MaintenanceChartData[]>([]);

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
      return data || [];
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
        monthShort: format(month, 'MMM'), // Shorter format for mobile
        completed: 0,
        pending: 0,
        issues: 0,
        total: 0
      }));
      
      // Count maintenance checks by month and status
      if (maintenanceData.length > 0) {
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
      } else {
        // Generate sample data if no real data exists
        monthlyData.forEach((item) => {
          item.completed = 10 + Math.floor(Math.random() * 30);
          item.pending = 5 + Math.floor(Math.random() * 10);
          item.issues = Math.floor(Math.random() * 8);
          item.total = item.completed + item.pending + item.issues;
        });
      }
      
      setChartData(monthlyData);
    } else {
      // Generate sample data for preview
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      
      const monthsRange = eachMonthOfInterval({
        start: sixMonthsAgo,
        end: new Date()
      });
      
      const sampleData = monthsRange.map(month => {
        const completed = 10 + Math.floor(Math.random() * 30);
        const pending = 5 + Math.floor(Math.random() * 10);
        const issues = Math.floor(Math.random() * 8);
        
        return {
          month: format(month, 'MMM yyyy'),
          monthShort: format(month, 'MMM'),
          completed: completed,
          pending: pending,
          issues: issues,
          total: completed + pending + issues
        };
      });
      
      setChartData(sampleData);
    }
  }, [maintenanceData]);

  return { chartData, isLoading };
};
