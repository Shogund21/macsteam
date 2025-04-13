
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Company } from "@/types/company";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteCompanyDialogProps {
  company: Company | null;
  onClose: () => void;
  onSuccess: () => void;
  currentCompanyId?: string | null;
  onCurrentCompanyDeleted?: (newCompanyId: string | null) => void;
  availableCompanies: Company[];
}

export const DeleteCompanyDialog = ({
  company,
  onClose,
  onSuccess,
  currentCompanyId,
  onCurrentCompanyDeleted,
  availableCompanies
}: DeleteCompanyDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!company) return;

    try {
      setIsDeleting(true);
      const { error } = await supabase
        .from("companies")
        .delete()
        .eq("id", company.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Company deleted successfully",
      });

      // If we deleted the current company, select a different one
      if (currentCompanyId === company.id && availableCompanies.length > 1 && onCurrentCompanyDeleted) {
        const newCompany = availableCompanies.find(c => c.id !== company.id);
        if (newCompany) {
          onCurrentCompanyDeleted(newCompany.id);
        }
      }

      onSuccess();
    } catch (error) {
      console.error("Error deleting company:", error);
      toast({
        title: "Error",
        description: "Failed to delete company",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  return (
    <AlertDialog open={!!company} onOpenChange={() => onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this company?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the company
            and all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
