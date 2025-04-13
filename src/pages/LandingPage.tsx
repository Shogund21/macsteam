
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCompany } from "@/contexts/CompanyContext";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import WelcomeSection from "@/components/landing/WelcomeSection";
import CompanyList from "@/components/landing/CompanyList";
import GetStartedCard from "@/components/landing/GetStartedCard";
import { CompanyFormValues } from "@/components/landing/CreateCompanyForm";

const LandingPage = () => {
  const { companies, setCurrentCompany, createCompany } = useCompany();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCompanySelect = (company: any) => {
    setCurrentCompany(company);
    navigate("/dashboard");
  };

  const handleCreateCompany = async (data: CompanyFormValues) => {
    setIsSubmitting(true);
    try {
      // Ensure name is required when creating a company
      const companyData = {
        name: data.name, // This is now guaranteed to exist because of zod validation
        contact_email: data.contact_email || undefined,
        contact_phone: data.contact_phone || undefined,
        address: data.address || undefined
      };
      
      const newCompany = await createCompany(companyData);
      setIsDialogOpen(false);
      handleCompanySelect(newCompany);
    } catch (error) {
      console.error("Error creating company:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <Header onSignOut={handleSignOut} />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <WelcomeSection hasCompanies={companies.length > 0} />

          {companies.length > 0 ? (
            <CompanyList 
              companies={companies}
              onCompanySelect={handleCompanySelect}
              onCreateCompany={handleCreateCompany}
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
              isSubmitting={isSubmitting}
            />
          ) : (
            <GetStartedCard 
              onCreateCompany={handleCreateCompany}
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
