
import React from "react";
import { useAnalyticsFilters } from "./AnalyticsFilterContext";
import { useTrendsData } from "./trends/useTrendsData";
import MaintenanceChartHelp from "./trends/MaintenanceChartHelp";
import MaintenanceChart from "./trends/MaintenanceChart";

const MaintenanceTrends = () => {
  const { dateRange } = useAnalyticsFilters();
  const { chartData, isLoading } = useTrendsData(dateRange);

  if (isLoading && chartData.length === 0) {
    return <div className="h-96 flex items-center justify-center">Loading chart data...</div>;
  }

  if (chartData.length === 0) {
    return <div className="h-96 flex items-center justify-center">No maintenance trend data available</div>;
  }

  return (
    <div className="space-y-2">
      <MaintenanceChartHelp />
      <MaintenanceChart chartData={chartData} />
    </div>
  );
};

export default MaintenanceTrends;
