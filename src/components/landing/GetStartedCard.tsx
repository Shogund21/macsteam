
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import CreateCompanyForm, { CompanyFormValues } from "./CreateCompanyForm";

interface GetStartedCardProps {
  onCreateCompany: (data: CompanyFormValues) => Promise<void>;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
}

const GetStartedCard = ({ 
  onCreateCompany,
  isDialogOpen,
  setIsDialogOpen,
  isSubmitting
}: GetStartedCardProps) => {
  return (
    <div className="text-center">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Get Started</CardTitle>
          <CardDescription>Create your first company to start using AssetGuardian</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <PlusCircle className="h-5 w-5" />
                Create Company
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
        </CardContent>
      </Card>
    </div>
  );
};

export default GetStartedCard;
