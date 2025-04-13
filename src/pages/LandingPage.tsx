
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCompany } from "@/contexts/CompanyContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

const LandingPage = () => {
  const { companies, setCurrentCompany } = useCompany();
  const navigate = useNavigate();

  const handleCompanySelect = (company: any) => {
    setCurrentCompany(company);
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <header className="p-6 border-b bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            AssetGuardian
          </h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Welcome to AssetGuardian</h2>
            <p className="text-lg text-gray-600 mb-8">
              Select your company to access your facility management dashboard
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <Card 
                key={company.id} 
                className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => handleCompanySelect(company)}
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
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-white py-6 border-t">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} AssetGuardian. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
