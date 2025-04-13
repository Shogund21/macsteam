
import { useState } from "react";
import { useCompany } from "@/contexts/CompanyContext";
import { CompanyCard } from "./CompanyCard";
import { EditCompanyDialog } from "./EditCompanyDialog";
import { ManageUsersDialog } from "./ManageUsersDialog";
import { DeleteCompanyDialog } from "./DeleteCompanyDialog";
import { Company } from "@/types/company";

interface CompanyListProps {
  onSuccess: () => void;
}

export const CompanyList = ({ onSuccess }: CompanyListProps) => {
  const { companies, currentCompany, setCurrentCompany } = useCompany();
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUsersDialogOpen, setIsUsersDialogOpen] = useState(false);
  const [isDeletingCompany, setIsDeletingCompany] = useState<Company | null>(null);

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setIsEditDialogOpen(true);
  };

  const handleManageUsers = (company: Company) => {
    setEditingCompany(company);
    setIsUsersDialogOpen(true);
  };

  const handleDeleteClick = (company: Company) => {
    setIsDeletingCompany(company);
  };
  
  const handleCurrentCompanyDeleted = (newCompanyId: string | null) => {
    if (newCompanyId && companies.length > 0) {
      const newCompany = companies.find(c => c.id === newCompanyId);
      if (newCompany) {
        setCurrentCompany(newCompany);
      }
    }
  };

  if (companies.length === 0) {
    return <div className="text-center py-8 text-gray-500">No companies added yet</div>;
  }

  return (
    <div className="space-y-4">
      {companies.map((company) => (
        <CompanyCard 
          key={company.id}
          company={company}
          onEdit={handleEdit}
          onManageUsers={handleManageUsers}
          onDelete={handleDeleteClick}
          onSuccess={onSuccess}
        />
      ))}

      <EditCompanyDialog 
        company={editingCompany}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSuccess={onSuccess}
      />

      <ManageUsersDialog 
        company={editingCompany}
        isOpen={isUsersDialogOpen}
        onClose={() => setIsUsersDialogOpen(false)}
      />

      <DeleteCompanyDialog 
        company={isDeletingCompany}
        onClose={() => setIsDeletingCompany(null)}
        onSuccess={onSuccess}
        currentCompanyId={currentCompany?.id}
        onCurrentCompanyDeleted={handleCurrentCompanyDeleted}
        availableCompanies={companies}
      />
    </div>
  );
};
