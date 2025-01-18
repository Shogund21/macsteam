import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const AdminPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkAuthStatus();
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
          
          // Clear the password field
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

  if (!isAuthenticated) {
    return (
      <div className="text-sm text-muted-foreground">
        Please log in to access admin features.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};