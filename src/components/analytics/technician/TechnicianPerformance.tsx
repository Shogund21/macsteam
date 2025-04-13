
import React from "react";
import { useTechnicianPerformanceData } from "./useTechnicianPerformanceData";
import BarChart from "@/components/charts/BarChart";

const TechnicianPerformance = () => {
  const { chartData, isLoading } = useTechnicianPerformanceData();

  if (isLoading && chartData.length === 0) {
    return <div className="flex items-center justify-center h-full min-h-[300px]">Loading chart data...</div>;
  }

  return (
    <div className="w-full h-[400px] md:h-[450px] overflow-visible">
      <BarChart 
        data={chartData}
        series={[
          {
            dataKey: "completed",
            name: "Completed",
            fill: "#00C49F"
          },
          {
            dataKey: "pending",
            name: "Pending",
            fill: "#FFBB28"
          },
          {
            dataKey: "issues",
            name: "Issues Found",
            fill: "#FF8042"
          }
        ]}
        layout="vertical"
        tooltipFormatter={(value, name) => [`${value} maintenance checks`, name]}
      />
    </div>
  );
};

export default TechnicianPerformance;
