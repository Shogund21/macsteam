
import React from "react";
import { useAnalyticsFilters } from "./AnalyticsFilterContext";
import { useTrendsData } from "./trends/useTrendsData";
import MaintenanceChartHelp from "./trends/MaintenanceChartHelp";
import MaintenanceChart from "./trends/MaintenanceChart";

const MaintenanceTrends = () => {
  const { dateRange } = useAnalyticsFilters();
  const { chartData, isLoading } = useTrendsData(dateRange);

  if (isLoading && chartData.length === 0) {
    return <div className="h-80 flex items-center justify-center">Loading chart data...</div>;
  }

  if (chartData.length === 0) {
    return <div className="h-80 flex items-center justify-center">No maintenance trend data available</div>;
  }

  return (
    <div className="space-y-2 overflow-visible w-full">
      <MaintenanceChartHelp />
      <div className="w-full pb-6 overflow-visible">
        <MaintenanceChart chartData={chartData} />
      </div>
    </div>
  );
};

export default MaintenanceTrends;
