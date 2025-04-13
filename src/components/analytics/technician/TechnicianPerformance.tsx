
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

  return (
    <div className="h-full w-full overflow-hidden">
      <TechnicianPerformanceChart data={chartData} />
    </div>
  );
};

export default TechnicianPerformance;
