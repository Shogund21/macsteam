
import React from "react";
import { useTechnicianPerformanceData } from "./useTechnicianPerformanceData";
import TechnicianPerformanceChart from "./TechnicianPerformanceChart";

const TechnicianPerformance = () => {
  const { chartData, isLoading } = useTechnicianPerformanceData();

  if (isLoading && chartData.length === 0) {
    return <div className="flex items-center justify-center h-full min-h-[300px]">Loading chart data...</div>;
  }

  return (
    <div className="w-full h-[400px] md:h-[450px]">
      <TechnicianPerformanceChart data={chartData} />
    </div>
  );
};

export default TechnicianPerformance;
