import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PasswordProtectionModal from "@/components/equipment/PasswordProtectionModal";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import EditMaintenanceDialog from "@/components/maintenance/EditMaintenanceDialog";
import { MaintenanceCheck } from "@/types/maintenance";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export const MaintenanceSection = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedCheck, setSelectedCheck] = useState<MaintenanceCheck | null>(null);
  const [actionType, setActionType] = useState<'edit' | 'delete'>('edit');
  const { toast } = useToast();

  const { data: checks = [], refetch } = useQuery({
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
      
      return data.map(check => ({
        ...check,
        equipment: check.equipment ? {
          name: check.equipment.name,
          location: check.equipment.location
        } : undefined,
        technician: check.technician ? {
          firstName: check.technician.firstName,
          lastName: check.technician.lastName
        } : undefined
      })) as MaintenanceCheck[];
    },
  });

  const handleDelete = async (check: MaintenanceCheck) => {
    setSelectedCheck(check);
    setActionType('delete');
    setIsPasswordModalOpen(true);
  };

  const handleEdit = async (check: MaintenanceCheck) => {
    setSelectedCheck(check);
    setActionType('edit');
    setIsPasswordModalOpen(true);
  };

  const handlePasswordSuccess = async () => {
    if (!selectedCheck) return;

    if (actionType === 'delete') {
      try {
        const { error } = await supabase
          .from("hvac_maintenance_checks")
          .delete()
          .eq("id", selectedCheck.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Maintenance check deleted successfully.",
        });
        refetch();
      } catch (error) {
        toast({
          title: "Error deleting maintenance check",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    }
    setIsPasswordModalOpen(false);
  };

  const getStatusBadge = (status: string | null) => {
    const statusColors = {
      completed: "bg-green-500",
      pending: "bg-yellow-500",
      issue_found: "bg-red-500"
    };
    
    return (
      <Badge className={`${statusColors[status as keyof typeof statusColors] || "bg-gray-500"}`}>
        {status?.replace("_", " ").toUpperCase() || "UNKNOWN"}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Maintenance Management</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Manage individual maintenance checks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {checks.map((check) => (
              <div 
                key={check.id} 
                className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">
                        {check.equipment?.name}
                      </h3>
                      {getStatusBadge(check.status)}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Location: {check.equipment?.location}</p>
                      <p>Date: {format(new Date(check.check_date || ''), "PPP")}</p>
                      <p>
                        Technician: {check.technician ? 
                          `${check.technician.firstName} ${check.technician.lastName}` : 
                          'Unassigned'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(check)}
                      className="hover:bg-blue-50"
                    >
                      <Pencil className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(check)}
                      className="hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <PasswordProtectionModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          onSuccess={handlePasswordSuccess}
        />

        {selectedCheck && actionType === 'edit' && (
          <EditMaintenanceDialog
            check={selectedCheck}
            open={isPasswordModalOpen}
            onOpenChange={(open) => setIsPasswordModalOpen(open)}
            onComplete={() => {
              refetch();
              setSelectedCheck(null);
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};