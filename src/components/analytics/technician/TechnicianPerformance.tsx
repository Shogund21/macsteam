
import React from "react";
import { useTechnicianPerformanceData } from "./useTechnicianPerformanceData";
import BarChart from "@/components/charts/BarChart";

const TechnicianPerformance = () => {
  const { chartData, isLoading } = useTechnicianPerformanceData();

  if (isLoading && chartData.length === 0) {
    return <div className="flex items-center justify-center h-full min-h-[300px]">Loading chart data...</div>;
  }

  return (
    <div className="w-full h-[450px] overflow-visible">
      <BarChart 
        data={chartData}
        series={[
          {
            dataKey: "completed",
            name: "Completed",
            fill: "#4CAF50"  // Brighter green
          },
          {
            dataKey: "pending",
            name: "Pending",
            fill: "#FFC107"  // Brighter yellow
          },
          {
            dataKey: "issues",
            name: "Issues Found",
            fill: "#FF7043"  // Brighter orange
          }
        ]}
        layout="vertical"
        tooltipFormatter={(value, name) => [`${value} maintenance checks`, name]}
        height={450}
      />
    </div>
  );
};

export default TechnicianPerformance;
