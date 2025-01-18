import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const AdminPasswordForm = () => {
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === "mac2024") { // This is a simple example - in production, use environment variables
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { error } = await supabase
          .from('admin_users')
          .upsert({ 
            id: user.id,
            is_admin: true 
          });

        if (error) {
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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};