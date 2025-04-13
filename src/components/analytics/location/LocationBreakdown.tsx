
import React from "react";
import { useLocationBreakdownData } from "./useLocationBreakdownData";
import BarChart from "@/components/charts/BarChart";

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
      <BarChart 
        data={chartData}
        series={[
          {
            dataKey: "value",
            name: "Equipment Count",
            fill: "#7E69AB",
            showLabel: true
          }
        ]}
        layout="vertical"
        tooltipFormatter={(value) => [`${value} equipment`, 'Count']}
      />
    </div>
  );
};

export default LocationBreakdown;
