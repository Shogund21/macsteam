
import React from "react";
import LineChart from "@/components/charts/LineChart";
import { useIsMobile } from "@/hooks/use-mobile";

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
    <div className="h-96 md:h-[450px] w-full overflow-visible">
      <LineChart 
        data={formattedData}
        series={[
          {
            dataKey: "total",
            name: "Total Checks",
            stroke: "#8884d8",
            activeDot: { r: 8 }
          },
          {
            dataKey: "completed",
            name: "Completed",
            stroke: "#00C49F"
          },
          {
            dataKey: "pending",
            name: "Pending",
            stroke: "#FFBB28",
            hiddenOnMobile: true
          },
          {
            dataKey: "issues",
            name: "Issues Found",
            stroke: "#FF8042",
            hiddenOnMobile: true
          }
        ]}
        yAxisLabel="Checks"
        tooltipFormatter={(value, name) => [`${value} checks`, name]}
      />
    </div>
  );
};

export default MaintenanceChart;
