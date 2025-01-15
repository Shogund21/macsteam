import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MaintenanceCheck, MaintenanceCheckStatus } from "@/types/maintenance";
import { MaintenanceTableHeader } from "./table/MaintenanceTableHeader";
import MaintenanceTableRow from "./table/MaintenanceTableRow";
import { useEffect, useState } from "react";

const MaintenanceHistory = () => {
  const [checks, setChecks] = useState<MaintenanceCheck[]>([]);
  const { toast } = useToast();

  const fetchMaintenanceChecks = async () => {
    const { data, error } = await supabase
      .from("maintenance_checks")
      .select("*")
      .order("check_date", { ascending: false });

    if (error) {
      toast({
        title: "Error fetching maintenance checks",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setChecks(data);
    }
  };

  const handleStatusChange = async (id: string, status: MaintenanceCheckStatus) => {
    const { error } = await supabase
      .from("maintenance_checks")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive",
      });
    } else {
      fetchMaintenanceChecks();
    }
  };

  useEffect(() => {
    fetchMaintenanceChecks();
  }, []);

  return (
    <div className="overflow-hidden rounded-md border border-gray-200">
      <MaintenanceTableHeader />
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="divide-y divide-gray-200">
          {checks.map((check) => (
            <MaintenanceTableRow
              key={check.id}
              check={check}
              onStatusChange={handleStatusChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceHistory;
