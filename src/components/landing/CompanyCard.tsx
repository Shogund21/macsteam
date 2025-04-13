
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { Company } from "@/types/company";

interface CompanyCardProps {
  company: Company;
  onSelect: (company: Company) => void;
}

const CompanyCard = ({ company, onSelect }: CompanyCardProps) => {
  return (
    <Card 
      className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() => onSelect(company)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          {company.logo_url ? (
            <img 
              src={company.logo_url} 
              alt={company.name} 
              className="w-8 h-8 object-contain" 
            />
          ) : (
            <Building2 className="w-8 h-8 text-blue-600" />
          )}
          {company.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          Select Company
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
