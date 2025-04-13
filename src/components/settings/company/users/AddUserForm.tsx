
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AuthUserResponse } from "./types";

interface AddUserFormProps {
  companyId: string;
  onSuccess: () => void;
}

export const AddUserForm = ({ companyId, onSuccess }: AddUserFormProps) => {
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("user");
  const [newUserIsAdmin, setNewUserIsAdmin] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const handleAddUser = async () => {
    if (!newUserEmail.trim()) {
      toast({
        title: "Error",
        description: "Email is required",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsAdding(true);

      // First, check if the user exists by searching all auth users
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) throw authError;
      
      // Properly type the auth data response
      const typedAuthData = authData as AuthUserResponse;
      const foundUser = typedAuthData.users?.find(u => u.email === newUserEmail);
      
      if (!foundUser) {
        toast({
          title: "Error",
          description: "User not found. Please check the email address.",
          variant: "destructive",
        });
        return;
      }

      // Then check if the user is already associated with this company
      const { data: existingUsers } = await supabase
        .from("company_users")
        .select("*")
        .eq("company_id", companyId)
        .eq("user_id", foundUser.id);

      if (existingUsers && existingUsers.length > 0) {
        toast({
          title: "Error",
          description: "User is already a member of this company",
          variant: "destructive",
        });
        return;
      }

      // Add the user to the company
      const { error } = await supabase
        .from("company_users")
        .insert([
          {
            company_id: companyId,
            user_id: foundUser.id,
            role: newUserRole,
            is_admin: newUserIsAdmin,
          },
        ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User added to company successfully",
      });

      // Reset form and reload users
      setNewUserEmail("");
      setNewUserRole("user");
      setNewUserIsAdmin(false);
      onSuccess();
    } catch (error) {
      console.error("Error adding user:", error);
      toast({
        title: "Error",
        description: "Failed to add user to company",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md border">
      <h4 className="text-sm font-medium mb-2">Add User</h4>
      <div className="flex flex-col md:flex-row gap-2">
        <Input
          placeholder="User email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          className="max-w-md"
        />
        <Select
          value={newUserRole}
          onValueChange={setNewUserRole}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="technician">Technician</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="is-admin"
            checked={newUserIsAdmin}
            onCheckedChange={(checked) => 
              setNewUserIsAdmin(checked === true)
            }
          />
          <label
            htmlFor="is-admin"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Admin
          </label>
        </div>
        <Button
          onClick={handleAddUser}
          disabled={isAdding}
          className="w-full md:w-auto"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          {isAdding ? "Adding..." : "Add User"}
        </Button>
      </div>
    </div>
  );
};
