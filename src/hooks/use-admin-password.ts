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
          const { error } = await supabase
            .from('admin_users')
            .upsert({ 
              id: user.id,
              is_admin: true 
            });

          if (error) throw error;
        }

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