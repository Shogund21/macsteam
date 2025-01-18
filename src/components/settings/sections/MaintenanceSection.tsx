import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PasswordProtectionModal from "@/components/equipment/PasswordProtectionModal";

export const MaintenanceSection = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { toast } = useToast();

  const handleDeleteAllChecks = async () => {
    const { error } = await supabase
      .from("hvac_maintenance_checks")
      .delete()
      .neq("id", "placeholder"); // Delete all records

    if (error) {
      toast({
        title: "Error deleting maintenance checks",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Maintenance checks deleted",
        description: "All maintenance checks have been deleted successfully.",
      });
      setIsPasswordModalOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Maintenance Management</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Manage maintenance checks and related data.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Button 
            variant="destructive"
            onClick={() => setIsPasswordModalOpen(true)}
            className="w-full md:w-auto"
          >
            Delete All Maintenance Checks
          </Button>
        </div>
        <PasswordProtectionModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          onSuccess={handleDeleteAllChecks}
        />
      </CardContent>
    </Card>
  );
};