
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

  return (
    <div className="h-full w-full overflow-hidden">
      <LocationBreakdownChart data={chartData} />
    </div>
  );
};

export default LocationBreakdown;
