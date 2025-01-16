import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MaintenanceCheck, MaintenanceCheckStatus } from "@/types/maintenance";
import { MaintenanceTableHeader } from "./table/MaintenanceTableHeader";
import MaintenanceTableRow from "./table/MaintenanceTableRow";
import { useEffect, useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

const MaintenanceHistory = () => {
  const [checks, setChecks] = useState<MaintenanceCheck[]>([]);
  const { toast } = useToast();

  const fetchMaintenanceChecks = async () => {
    const { data, error } = await supabase
      .from("hvac_maintenance_checks")
      .select(`
        *,
        equipment:equipment_id(name, location),
        technician:technician_id(firstName, lastName)
      `)
      .order("equipment(location)", { ascending: true })
      .order("check_date", { ascending: false });

    if (error) {
      toast({
        title: "Error fetching maintenance checks",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setChecks(data as MaintenanceCheck[]);
    }
  };

  const handleStatusChange = async (id: string, status: MaintenanceCheckStatus) => {
    const { error } = await supabase
      .from("hvac_maintenance_checks")
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Status updated",
        description: "The maintenance check status has been updated successfully.",
      });
      fetchMaintenanceChecks();
    }
  };

  useEffect(() => {
    fetchMaintenanceChecks();
  }, []);

  return (
    <Card className="overflow-hidden border rounded-lg bg-white shadow-sm">
      <div className="w-full overflow-auto">
        <Table>
          <MaintenanceTableHeader />
          <TableBody>
            {checks.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-muted-foreground">
                  No maintenance checks found
                </td>
              </tr>
            ) : (
              checks.map((check) => (
                <MaintenanceTableRow
                  key={check.id}
                  check={check}
                  onStatusChange={handleStatusChange}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default MaintenanceHistory;