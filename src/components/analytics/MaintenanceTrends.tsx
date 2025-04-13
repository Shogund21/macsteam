
import React from "react";
import { useAnalyticsFilters } from "./AnalyticsFilterContext";
import { useTrendsData } from "./trends/useTrendsData";
import MaintenanceChart from "./trends/MaintenanceChart";
import { Skeleton } from "@/components/ui/skeleton";

const MaintenanceTrends = () => {
  const { dateRange } = useAnalyticsFilters();
  const { chartData, isLoading } = useTrendsData(dateRange);

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="w-full space-y-4">
          <Skeleton className="h-[40px] w-full" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    );
  }

  if (!chartData || chartData.length === 0) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center">
        <div className="text-muted-foreground">
          <p className="text-lg font-medium">No maintenance trend data available</p>
          <p className="text-sm mt-2">Try adjusting your date range or adding maintenance records</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="h-[350px] w-full">
        <MaintenanceChart chartData={chartData} />
      </div>
    </div>
  );
};

export default MaintenanceTrends;
