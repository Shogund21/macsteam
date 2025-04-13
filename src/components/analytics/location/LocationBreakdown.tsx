
import React from "react";
import { useLocationBreakdownData } from "./useLocationBreakdownData";
import BarChart from "@/components/charts/BarChart";

const LocationBreakdown = () => {
  const { chartData, isLoading } = useLocationBreakdownData();

  if (isLoading && chartData.length === 0) {
    return <div className="flex items-center justify-center h-full min-h-[300px]">Loading chart data...</div>;
  }

  return (
    <div className="w-full h-[450px] overflow-visible">
      <BarChart 
        data={chartData}
        series={[
          {
            dataKey: "value",
            name: "Equipment Count",
            fill: "#7E69AB",  // More vibrant purple
            showLabel: true
          }
        ]}
        layout="vertical"
        tooltipFormatter={(value) => [`${value} equipment`, 'Count']}
        height={450}
      />
    </div>
  );
};

export default LocationBreakdown;
