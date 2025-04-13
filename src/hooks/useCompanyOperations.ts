
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Company } from "@/types/company";

export const useCompanyOperations = () => {
  const { toast } = useToast();

  const addUserToCompany = async (
    userId: string,
    companyId: string,
    role: string = "user",
    isAdmin: boolean = false
  ) => {
    try {
      const { error } = await supabase
        .from("company_users")
        .insert([
          {
            user_id: userId,
            company_id: companyId,
            role,
            is_admin: isAdmin,
          },
        ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User added to company successfully",
      });
    } catch (error: any) {
      console.error("Error adding user to company:", error);
      toast({
        title: "Error",
        description: error.message || "Could not add user to company",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Create a new company
  const createCompany = async (companyData: { name: string } & Partial<Omit<Company, 'id' | 'created_at' | 'updated_at'>>): Promise<Company> => {
    try {
      // Insert company - ensuring name is required in the type
      const { data, error } = await supabase
        .from("companies")
        .insert(companyData)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error("Failed to create company");

      toast({
        title: "Success",
        description: "Company created successfully",
      });

      return data;
    } catch (error: any) {
      console.error("Error creating company:", error);
      toast({
        title: "Error",
        description: error.message || "Could not create company",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    addUserToCompany,
    createCompany
  };
};
