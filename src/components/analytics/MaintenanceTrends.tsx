
import { useQuery } from "@tanstack/react-query";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  TooltipProps
} from "recharts";
import { 
  NameType, 
  ValueType 
} from "recharts/types/component/DefaultTooltipContent";
import { supabase } from "@/integrations/supabase/client";
import { useAnalyticsFilters } from "./AnalyticsFilterContext";
import { useState, useEffect } from "react";
import { format, parseISO, eachMonthOfInterval, isSameMonth } from "date-fns";
import { HelpCircle } from "lucide-react";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded-md shadow-md">
        <p className="font-semibold text-gray-800">{label}</p>
        <div className="space-y-1 mt-2">
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value} checks
            </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const MaintenanceTrends = () => {
  const { dateRange } = useAnalyticsFilters();
  const [chartData, setChartData] = useState<any[]>([]);
  const isMobile = useIsMobile();

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
        monthShort: format(month, 'MMM'), // Shorter format for mobile
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
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <UITooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-md">
              <p>
                This graph displays the monthly trends of maintenance checks. It shows:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><span className="font-semibold text-[#8884d8]">Total Checks</span>: All maintenance activities performed each month</li>
                <li><span className="font-semibold text-[#00C49F]">Completed</span>: Successfully completed maintenance checks</li>
                <li><span className="font-semibold text-[#FFBB28]">Pending</span>: Scheduled but not yet completed checks</li>
                <li><span className="font-semibold text-[#FF8042]">Issues Found</span>: Checks that identified problems requiring attention</li>
              </ul>
            </TooltipContent>
          </UITooltip>
        </TooltipProvider>
        <span className="text-sm text-muted-foreground">Hover for explanation</span>
      </div>

      <div className="h-60 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: isMobile ? 10 : 30,
              left: isMobile ? 0 : 20,
              bottom: isMobile ? 60 : 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={isMobile ? "monthShort" : "month"} 
              height={60}
              angle={-45}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: isMobile ? 10 : 12 }}
            />
            <YAxis 
              width={isMobile ? 30 : 45}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              label={!isMobile ? { 
                value: "Checks", 
                angle: -90, 
                position: "insideLeft",
                style: { textAnchor: "middle", fontSize: 12 }
              } : undefined} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: 10 }}
              formatter={(value) => <span style={{ fontSize: isMobile ? 10 : 12 }}>{value}</span>}
            />
            <Line 
              type="monotone" 
              dataKey="total" 
              name="Total Checks" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
              strokeWidth={2}
              dot={!isMobile}
            />
            <Line 
              type="monotone" 
              dataKey="completed" 
              name="Completed" 
              stroke="#00C49F" 
              strokeWidth={2}
              dot={!isMobile}
            />
            {!isMobile && (
              <>
                <Line 
                  type="monotone" 
                  dataKey="pending" 
                  name="Pending" 
                  stroke="#FFBB28" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="issues" 
                  name="Issues Found" 
                  stroke="#FF8042" 
                  strokeWidth={2}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MaintenanceTrends;
