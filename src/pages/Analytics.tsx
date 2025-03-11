
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MaintenanceTrends from "@/components/analytics/MaintenanceTrends";
import EquipmentStatusChart from "@/components/analytics/EquipmentStatusChart";
import MaintenanceCompletionRate from "@/components/analytics/MaintenanceCompletionRate";
import TechnicianPerformance from "@/components/analytics/TechnicianPerformance";
import LocationBreakdown from "@/components/analytics/LocationBreakdown";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import { useState } from "react";
import { DatePickerWithRange } from "@/components/analytics/DateRangePicker";
import { DateRange } from "react-day-picker";
import { sub } from "date-fns";
import { AnalyticsFilterProvider } from "@/components/analytics/AnalyticsFilterContext";

const Analytics = () => {
  // Default date range is last 30 days
  const defaultDateRange: DateRange = {
    from: sub(new Date(), { days: 30 }),
    to: new Date(),
  };
  
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleExportData = () => {
    // This is a placeholder for the export functionality
    // In a real application, this would generate a CSV or PDF file
    alert("Analytics data export feature will be implemented in a future update.");
  };

  return (
    <Layout>
      <AnalyticsFilterProvider>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Analytics & Reporting</h1>
              <p className="text-muted-foreground mt-1">
                View insights and track maintenance performance metrics
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <DatePickerWithRange defaultDateRange={defaultDateRange} />
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="flex-1 sm:flex-none"
                  onClick={handleRefresh} 
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 sm:flex-none"
                  onClick={handleExportData}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Equipment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <EquipmentStatusChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Maintenance Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <MaintenanceCompletionRate />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Maintenance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <MaintenanceTrends />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Technician Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <TechnicianPerformance />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Equipment by Location</CardTitle>
              </CardHeader>
              <CardContent>
                <LocationBreakdown />
              </CardContent>
            </Card>
          </div>
        </div>
      </AnalyticsFilterProvider>
    </Layout>
  );
};

export default Analytics;
