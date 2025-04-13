
import React from "react";
import { useLocationBreakdownData } from "./useLocationBreakdownData";
import LocationBreakdownChart from "./LocationBreakdownChart";

const LocationBreakdown = () => {
  const { chartData, isLoading } = useLocationBreakdownData();

  if (isLoading && chartData.length === 0) {
    return <div className="h-full flex items-center justify-center">Loading chart data...</div>;
  }

  if (chartData.length === 0) {
    return <div className="h-full flex items-center justify-center">No location data available</div>;
  }

  return (
    <div className="h-full w-full">
      <LocationBreakdownChart data={chartData} />
    </div>
  );
};

export default LocationBreakdown;
