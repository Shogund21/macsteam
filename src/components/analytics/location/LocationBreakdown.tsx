
import React from "react";
import { useLocationBreakdownData } from "./useLocationBreakdownData";
import LocationBreakdownChart from "./LocationBreakdownChart";

const LocationBreakdown = () => {
  const { chartData, isLoading } = useLocationBreakdownData();

  if (isLoading && chartData.length === 0) {
    return <div className="flex items-center justify-center h-full min-h-[300px]">Loading chart data...</div>;
  }

  return (
    <div className="w-full h-[400px] md:h-[450px] overflow-visible">
      <LocationBreakdownChart data={chartData} />
    </div>
  );
};

export default LocationBreakdown;
