
import React from "react";
import { Building2 } from "lucide-react";

interface AuthHeaderProps {
  companyCount: number;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ companyCount }) => {
  return (
    <div className="text-center mb-8">
      <Building2 className="h-12 w-12 mx-auto text-blue-600 mb-4" />
      <h2 className="text-3xl font-bold mb-2">Welcome to AssetGuardian</h2>
      <p className="text-gray-600">
        {companyCount > 0 
          ? "Sign in to access your company's dashboard" 
          : "Sign in or create an account to get started"}
      </p>
    </div>
  );
};
