
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAdminPassword = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data } = await supabase.auth.getUser();
      setIsAuthenticated(!!data.user);
    };
    
    checkAuthStatus();
    
    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session?.user);
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Check if user is authenticated
      if (!isAuthenticated) {
        setError("You must be logged in to set admin privileges.");
        toast({
          variant: "destructive",
          title: "Error",
          description: "You must be logged in to set admin privileges.",
        });
        return;
      }

      if (password === "mac2024") {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setError("Authentication error. Please try logging in again.");
          return;
        }

        const { error: adminError } = await supabase
          .from('admin_users')
          .upsert({ 
            id: user.id,
            is_admin: true 
          });

        if (adminError) throw adminError;

        setIsAdmin(true);
        toast({
          title: "Success",
          description: "Admin privileges granted.",
        });
        
        setPassword("");
      } else {
        setError("Incorrect admin password. Please try again.");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Incorrect admin password. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error in admin password submission:", error);
      setError("An unexpected error occurred. Please try again.");
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
    error,
    isAuthenticated,
    handleSubmit,
  };
};
