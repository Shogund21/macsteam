
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Company } from "@/types/company";

interface CompanyCardProps {
  company: Company;
  onEdit: (company: Company) => void;
  onManageUsers: (company: Company) => void;
  onDelete: (company: Company) => void;
  onSuccess: () => void;
}

export const CompanyCard = ({
  company,
  onEdit,
  onManageUsers,
  onDelete
}: CompanyCardProps) => {
  return (
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
            onClick={() => onManageUsers(company)}
          >
            <Users className="h-4 w-4 mr-1" />
            Users
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(company)}
          >
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 hover:bg-red-50"
            onClick={() => onDelete(company)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
