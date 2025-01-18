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
          equipment:equipment_id(name),
          technician:technician_id(firstName, lastName)
        `)
        .order('check_date', { ascending: false });

      if (error) throw error;
      return data;
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Maintenance Management</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Manage individual maintenance checks.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {checks.map((check) => (
            <div key={check.id} className="border rounded-lg p-4 bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">
                    {check.equipment?.name} - {format(new Date(check.check_date || ''), "PPP")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Technician: {check.technician ? `${check.technician.firstName} ${check.technician.lastName}` : 'Unassigned'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(check)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(check)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

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