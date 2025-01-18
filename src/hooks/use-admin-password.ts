import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAdminPassword = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkAuthStatus();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAuthStatus();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkAuthStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAuthenticated(!!user);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!isAuthenticated) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "You must be logged in to set admin privileges.",
        });
        return;
      }

      if (password === "mac2024") {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { error } = await supabase
            .from('admin_users')
            .upsert({ 
              id: user.id,
              is_admin: true 
            });

          if (error) {
            console.error("Error setting admin privileges:", error);
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to set admin privileges. Please try again.",
            });
            return;
          }

          toast({
            title: "Success",
            description: "Admin privileges granted. You can now manage locations.",
          });
          
          setPassword("");
        }
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Incorrect password. Please try again.",
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
    isAuthenticated,
    handleSubmit,
  };
};