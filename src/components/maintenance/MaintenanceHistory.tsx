import { useQuery } from "@tanstack/react-query";
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

const MaintenanceHistory = () => {
  const { data: checks, isLoading } = useQuery({
    queryKey: ['maintenance-checks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hvac_maintenance_checks')
        .select(`
          *,
          equipment:equipment_id(name),
          technician:technician_id(firstName, lastName)
        `)
        .order('check_date', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Loading maintenance history...</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Equipment</TableHead>
            <TableHead>Technician</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Issues Found</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {checks?.map((check) => (
            <TableRow key={check.id}>
              <TableCell>
                {format(new Date(check.check_date), 'MMM d, yyyy HH:mm')}
              </TableCell>
              <TableCell>{check.equipment?.name}</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MaintenanceHistory;