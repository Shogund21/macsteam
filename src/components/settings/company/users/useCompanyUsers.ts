
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "./types";

export const useCompanyUsers = (companyId: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadUsers = async () => {
    try {
      setLoading(true);
      // Changed the query to avoid using the join that causes issues
      const { data, error } = await supabase
        .from("company_users")
        .select("id, user_id, role, is_admin")
        .eq("company_id", companyId);

      if (error) throw error;

      if (!data) {
        setUsers([]);
        return;
      }

      // Then fetch user emails separately for each user_id
      const usersWithEmails = await Promise.all(
        data.map(async (item) => {
          try {
            if (!item.user_id) {
              return {
                id: item.id,
                user_id: undefined,
                email: "Unknown user",
                role: item.role,
                is_admin: item.is_admin,
              };
            }
            
            // Get user email from auth.users table
            const { data: userData, error: userError } = await supabase.auth.admin.getUserById(item.user_id);
            
            if (userError) throw userError;
            
            return {
              id: item.id,
              user_id: item.user_id,
              email: userData?.user?.email || "Unknown",
              role: item.role,
              is_admin: item.is_admin,
            };
          } catch (error) {
            console.error(`Error fetching user data for ${item.user_id}:`, error);
            return {
              id: item.id,
              user_id: item.user_id,
              email: "Error fetching email",
              role: item.role,
              is_admin: item.is_admin,
            };
          }
        })
      );

      setUsers(usersWithEmails);
    } catch (error) {
      console.error("Error loading users:", error);
      toast({
        title: "Error",
        description: "Failed to load company users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [companyId]);

  return {
    users,
    loading,
    loadUsers
  };
};
