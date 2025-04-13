
import React from "react";
import LineChart from "@/components/charts/LineChart";
import { useIsMobile } from "@/hooks/use-mobile";
import MaintenanceChartHelp from "./MaintenanceChartHelp";

interface MaintenanceChartProps {
  chartData: any[];
}

const MaintenanceChart = ({ chartData }: MaintenanceChartProps) => {
  const isMobile = useIsMobile();
  
  // Format the data to ensure consistent naming
  const formattedData = chartData.map(item => ({
    ...item,
    name: isMobile && item.monthShort ? item.monthShort : item.month
  }));
  
  return (
    <div className="h-full w-full">
      <div className="flex justify-end mb-2">
        <MaintenanceChartHelp />
      </div>
      <LineChart 
        data={formattedData}
        series={[
          {
            dataKey: "total",
            name: "Total Checks",
            stroke: "#8884d8",
            strokeWidth: 3,
            activeDot: { r: 8 },
            type: "monotone"
          },
          {
            dataKey: "completed",
            name: "Completed",
            stroke: "#4CAF50",
            strokeWidth: 2,
            type: "monotone"
          },
          {
            dataKey: "pending",
            name: "Pending",
            stroke: "#FFC107",
            strokeWidth: 2,
            hiddenOnMobile: true,
            type: "monotone"
          },
          {
            dataKey: "issues",
            name: "Issues Found",
            stroke: "#FF7043",
            strokeWidth: 2,
            hiddenOnMobile: true,
            type: "monotone"
          }
        ]}
        yAxisLabel="Checks"
        tooltipFormatter={(value, name) => [`${value} checks`, name]}
      />
    </div>
  );
};

export default MaintenanceChart;
