
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Company } from "@/types/company";
import CompanyCard from "./CompanyCard";
import CreateCompanyForm, { CompanyFormValues } from "./CreateCompanyForm";

interface CompanyListProps {
  companies: Company[];
  onCompanySelect: (company: Company) => void;
  onCreateCompany: (data: CompanyFormValues) => Promise<void>;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
}

const CompanyList = ({ 
  companies, 
  onCompanySelect,
  onCreateCompany,
  isDialogOpen,
  setIsDialogOpen,
  isSubmitting
}: CompanyListProps) => {
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <CompanyCard 
            key={company.id} 
            company={company} 
            onSelect={onCompanySelect}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <PlusCircle className="h-5 w-5" />
              Create New Company
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Company</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new company.
              </DialogDescription>
            </DialogHeader>
            <CreateCompanyForm 
              onSubmit={onCreateCompany}
              isSubmitting={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CompanyList;
