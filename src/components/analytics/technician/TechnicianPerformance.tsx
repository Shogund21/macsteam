
import React from "react";
import { useTechnicianPerformanceData } from "./useTechnicianPerformanceData";
import BarChart from "@/components/charts/BarChart";

const TechnicianPerformance = () => {
  const { chartData, isLoading } = useTechnicianPerformanceData();

  if (isLoading && chartData.length === 0) {
    return <div className="h-full flex items-center justify-center">Loading chart data...</div>;
  }

  if (chartData.length === 0) {
    return <div className="h-full flex items-center justify-center">No technician data available</div>;
  }

  return (
    <div className="h-full w-full">
      <BarChart 
        data={chartData}
        series={[
          {
            dataKey: "completed",
            name: "Completed",
            fill: "#4CAF50"
          },
          {
            dataKey: "pending",
            name: "Pending",
            fill: "#FFC107"
          },
          {
            dataKey: "issues",
            name: "Issues Found",
            fill: "#FF7043"
          }
        ]}
        layout="vertical"
        tooltipFormatter={(value, name) => [`${value} maintenance checks`, name]}
      />
    </div>
  );
};

export default TechnicianPerformance;
