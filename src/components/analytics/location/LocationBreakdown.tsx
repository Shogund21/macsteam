
import React from "react";
import { useLocationBreakdownData } from "./useLocationBreakdownData";
import LocationBreakdownChart from "./LocationBreakdownChart";
import { Skeleton } from "@/components/ui/skeleton";

const LocationBreakdown = () => {
  const { chartData, isLoading } = useLocationBreakdownData();

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  if (!chartData || chartData.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-muted-foreground">
        No location data available
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 min-h-0 w-full overflow-visible">
        <LocationBreakdownChart data={chartData} />
      </div>
    </div>
  );
};

export default LocationBreakdown;
