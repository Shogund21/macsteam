import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAdminPassword = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (password === "mac2024") {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // First update the admin_users table
          const { error: adminError } = await supabase
            .from('admin_users')
            .upsert({ 
              id: user.id,
              is_admin: true 
            });

          if (adminError) throw adminError;

          // Then update the user's JWT claims to include the admin role
          const { error: updateError } = await supabase.rpc('set_claim', {
            uid: user.id,
            claim: 'role',
            value: 'admin'
          });

          if (updateError) throw updateError;

          // Refresh the session to get the new JWT with admin claims
          const { error: refreshError } = await supabase.auth.refreshSession();
          if (refreshError) throw refreshError;

          setIsAdmin(true);
          toast({
            title: "Success",
            description: "Admin privileges granted. You can now manage locations.",
          });
          
          setPassword("");
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "You must be logged in to set admin privileges.",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Incorrect admin password. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error in admin password submission:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    password,
    setPassword,
    isLoading,
    isAdmin,
    handleSubmit,
  };
};