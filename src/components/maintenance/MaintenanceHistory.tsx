import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { MaintenanceCheck, MaintenanceCheckStatus } from "@/types/maintenance";
import { MaintenanceTableHeader } from "./table/MaintenanceTableHeader";
import { MaintenanceTableRow } from "./table/MaintenanceTableRow";

const MaintenanceHistory = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: checks, isLoading } = useQuery({
    queryKey: ['maintenance-checks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hvac_maintenance_checks')
        .select(`
          *,
          equipment:equipment_id(name, location),
          technician:technician_id(firstName, lastName)
        `)
        .order('check_date', { ascending: false });
      
      if (error) throw error;
      return data as MaintenanceCheck[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: MaintenanceCheckStatus }) => {
      const { error } = await supabase
        .from('hvac_maintenance_checks')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance-checks'] });
      toast({
        title: "Success",
        description: "Maintenance check status updated successfully",
      });
    },
    onError: (error) => {
      console.error('Error updating status:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update maintenance check status. Please try again.",
      });
    },
  });

  const handleStatusChange = (id: string, newStatus: MaintenanceCheckStatus) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  if (isLoading) return <div>Loading maintenance history...</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <MaintenanceTableHeader />
        <TableBody>
          {checks?.map((check) => (
            <MaintenanceTableRow
              key={check.id}
              check={check}
              onStatusChange={handleStatusChange}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MaintenanceHistory;