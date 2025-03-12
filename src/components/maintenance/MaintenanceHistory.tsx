
import { useEffect, useState } from "react";
import { MaintenanceCheck } from "@/types/maintenance";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import MaintenanceTableRow from "./table/MaintenanceTableRow";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

const MaintenanceHistory = () => {
  const [maintenanceChecks, setMaintenanceChecks] = useState<MaintenanceCheck[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const fetchMaintenanceChecks = async () => {
    try {
      const { data, error } = await supabase
        .from("hvac_maintenance_checks")
        .select(`
          *,
          equipment:equipment_id (
            name,
            location
          ),
          technician:technician_id (
            firstName,
            lastName
          )
        `)
        .order("check_date", { ascending: false });

      if (error) throw error;

      setMaintenanceChecks(data || []);
    } catch (error) {
      console.error("Error fetching maintenance checks:", error);
      toast({
        title: "Error fetching maintenance checks",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    id: string,
    status: "completed" | "pending" | "issue_found"
  ) => {
    try {
      const { error } = await supabase
        .from("hvac_maintenance_checks")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: "Maintenance check status has been updated successfully.",
      });

      fetchMaintenanceChecks();
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error updating status",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchMaintenanceChecks();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className={`text-xl ${isMobile ? 'text-center' : 'text-2xl'} font-bold`}>
        Maintenance History
      </h2>
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-24 w-full" />
          ))
        ) : maintenanceChecks.length === 0 ? (
          <p className="text-muted-foreground text-center">No maintenance checks found.</p>
        ) : (
          maintenanceChecks.map((check) => (
            <MaintenanceTableRow
              key={check.id}
              check={check}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MaintenanceHistory;
