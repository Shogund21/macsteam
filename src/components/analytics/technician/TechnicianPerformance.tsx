
import React from "react";
import { useTechnicianPerformanceData } from "./useTechnicianPerformanceData";
import TechnicianPerformanceChart from "./TechnicianPerformanceChart";

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
      <TechnicianPerformanceChart data={chartData} />
    </div>
  );
};

export default TechnicianPerformance;
