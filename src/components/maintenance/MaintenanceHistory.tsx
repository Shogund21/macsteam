import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

type MaintenanceCheckStatus = Database["public"]["Enums"]["maintenance_check_status"];

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
      return data;
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
    onError: () => {
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
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Equipment</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Technician</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Issues Found</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {checks?.map((check) => (
            <TableRow key={check.id}>
              <TableCell>
                {format(new Date(check.check_date), 'MMM d, yyyy HH:mm')}
              </TableCell>
              <TableCell>{check.equipment?.name}</TableCell>
              <TableCell>{check.equipment?.location}</TableCell>
              <TableCell>
                {check.technician?.firstName} {check.technician?.lastName}
              </TableCell>
              <TableCell>
                <Badge variant={check.status === 'completed' ? 'default' : 'destructive'}>
                  {check.status}
                </Badge>
              </TableCell>
              <TableCell>
                {(check.unusual_noise || check.vibration_observed) && (
                  <Badge variant="destructive">Issues Found</Badge>
                )}
              </TableCell>
              <TableCell>
                <Select
                  value={check.status}
                  onValueChange={(value: MaintenanceCheckStatus) => handleStatusChange(check.id, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Update status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="issue_found">Issue Found</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MaintenanceHistory;