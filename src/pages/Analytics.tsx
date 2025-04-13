
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import MaintenanceTrends from "@/components/analytics/MaintenanceTrends";
import EquipmentStatusChart from "@/components/analytics/EquipmentStatusChart";
import MaintenanceCompletionRate from "@/components/analytics/MaintenanceCompletionRate";
import TechnicianPerformance from "@/components/analytics/technician/TechnicianPerformance";
import LocationBreakdown from "@/components/analytics/location/LocationBreakdown";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import { useState } from "react";
import { DatePickerWithRange } from "@/components/analytics/DateRangePicker";
import { DateRange } from "react-day-picker";
import { sub } from "date-fns";
import { AnalyticsFilterProvider } from "@/components/analytics/AnalyticsFilterContext";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Analytics = () => {
  // Default date range is last 30 days
  const defaultDateRange: DateRange = {
    from: sub(new Date(), { days: 30 }),
    to: new Date(),
  };
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Analytics refreshed",
        description: "Chart data has been updated with the latest information."
      });
    }, 1000);
  };

  const handleExportData = () => {
    toast({
      title: "Export initiated",
      description: "Analytics data export feature will be implemented in a future update."
    });
  };

  return (
    <Layout>
      <AnalyticsFilterProvider>
        <div className="max-w-full p-3 md:p-6 pb-20 space-y-6">
          {/* Header Section */}
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Analytics & Reporting</h1>
              <p className="text-muted-foreground mt-1">
                View insights and track maintenance performance metrics
              </p>
            </div>
            
            {/* Controls Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full justify-between">
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

          {/* Main Trends Chart - Full width */}
          <div className="bg-white shadow rounded-xl p-4 w-full">
            <h2 className="text-lg font-semibold mb-2">Maintenance Trends over Time</h2>
            <div className="h-[400px] w-full">
              <MaintenanceTrends />
            </div>
          </div>

          {/* Charts Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {/* Equipment Status */}
            <div className="bg-white shadow rounded-xl p-4 w-full">
              <h2 className="text-lg font-semibold mb-2">Equipment Status</h2>
              <div className="h-[350px] w-full">
                <EquipmentStatusChart />
              </div>
            </div>
            
            {/* Maintenance Completion Rate */}
            <div className="bg-white shadow rounded-xl p-4 w-full">
              <h2 className="text-lg font-semibold mb-2">Maintenance Completion Rate</h2>
              <div className="h-[350px] w-full">
                <MaintenanceCompletionRate />
              </div>
            </div>
          
            {/* Technician Performance */}
            <div className="bg-white shadow rounded-xl p-4 w-full">
              <h2 className="text-lg font-semibold mb-2">Technician Performance</h2>
              <div className="h-[350px] w-full">
                <TechnicianPerformance />
              </div>
            </div>
            
            {/* Equipment by Location */}
            <div className="bg-white shadow rounded-xl p-4 w-full">
              <h2 className="text-lg font-semibold mb-2">Equipment by Location</h2>
              <div className="h-[350px] w-full">
                <LocationBreakdown />
              </div>
            </div>
          </div>
        </div>
      </AnalyticsFilterProvider>
    </Layout>
  );
};

export default Analytics;

