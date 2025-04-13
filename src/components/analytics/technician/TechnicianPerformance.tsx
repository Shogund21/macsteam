
import React from "react";
import { useTechnicianPerformanceData } from "./useTechnicianPerformanceData";
import TechnicianPerformanceChart from "./TechnicianPerformanceChart";
import { Skeleton } from "@/components/ui/skeleton";

const TechnicianPerformance = () => {
  const { chartData, isLoading } = useTechnicianPerformanceData();

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
        No technician data available
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 min-h-0 w-full overflow-visible">
        <TechnicianPerformanceChart data={chartData} />
      </div>
    </div>
  );
};

export default TechnicianPerformance;
