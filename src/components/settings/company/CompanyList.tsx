
import { useState } from "react";
import { useCompany } from "@/contexts/CompanyContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CompanyForm } from "./CompanyForm";
import CompanyUsers from "./CompanyUsers";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Users, Trash2 } from "lucide-react";
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

interface CompanyListProps {
  onSuccess: () => void;
}

export const CompanyList = ({ onSuccess }: CompanyListProps) => {
  const { companies, currentCompany, setCurrentCompany } = useCompany();
  const [editingCompany, setEditingCompany] = useState<any | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUsersDialogOpen, setIsUsersDialogOpen] = useState(false);
  const [isDeletingCompany, setIsDeletingCompany] = useState<any | null>(null);
  const { toast } = useToast();

  const handleEditSuccess = () => {
    onSuccess();
    setIsEditDialogOpen(false);
  };

  const handleEdit = (company: any) => {
    setEditingCompany(company);
    setIsEditDialogOpen(true);
  };

  const handleManageUsers = (company: any) => {
    setEditingCompany(company);
    setIsUsersDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!isDeletingCompany) return;

    try {
      const { error } = await supabase
        .from("companies")
        .delete()
        .eq("id", isDeletingCompany.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Company deleted successfully",
      });

      // If we deleted the current company, select a different one
      if (currentCompany?.id === isDeletingCompany.id && companies.length > 1) {
        const newCompany = companies.find(c => c.id !== isDeletingCompany.id);
        if (newCompany) {
          setCurrentCompany(newCompany);
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
      setIsDeletingCompany(null);
    }
  };

  if (companies.length === 0) {
    return <div className="text-center py-8 text-gray-500">No companies added yet</div>;
  }

  return (
    <div className="space-y-4">
      {companies.map((company) => (
        <Card key={company.id} className="p-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div>
              <h3 className="text-lg font-semibold">{company.name}</h3>
              {company.contact_email && (
                <p className="text-sm text-gray-500">{company.contact_email}</p>
              )}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleManageUsers(company)}
              >
                <Users className="h-4 w-4 mr-1" />
                Users
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(company)}
              >
                <Pencil className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 hover:bg-red-50"
                onClick={() => setIsDeletingCompany(company)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Company</DialogTitle>
          </DialogHeader>
          {editingCompany && (
            <CompanyForm
              initialData={editingCompany}
              onSuccess={handleEditSuccess}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isUsersDialogOpen} onOpenChange={setIsUsersDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Manage Company Users</DialogTitle>
          </DialogHeader>
          {editingCompany && (
            <CompanyUsers companyId={editingCompany.id} companyName={editingCompany.name} />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!isDeletingCompany} onOpenChange={() => setIsDeletingCompany(null)}>
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
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
