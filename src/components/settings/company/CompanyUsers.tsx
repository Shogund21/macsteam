
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Trash2, Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CompanyUsersProps {
  companyId: string;
  companyName: string;
}

interface User {
  id: string;
  user_id?: string;
  email: string;
  role: string;
  is_admin: boolean;
}

interface AuthUser {
  id: string;
  email?: string;
}

// Define the structure of the auth users API response
interface AuthUserResponse {
  users?: {
    id: string;
    email?: string;
    [key: string]: any;
  }[];
  [key: string]: any;
}

const CompanyUsers = ({ companyId, companyName }: CompanyUsersProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("user");
  const [newUserIsAdmin, setNewUserIsAdmin] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
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
      loadUsers();
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

  const handleRemoveUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("company_users")
        .delete()
        .eq("id", userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User removed from company",
      });

      loadUsers();
    } catch (error) {
      console.error("Error removing user:", error);
      toast({
        title: "Error",
        description: "Failed to remove user",
        variant: "destructive",
      });
    }
  };

  const handleToggleAdmin = async (user: User) => {
    try {
      const { error } = await supabase
        .from("company_users")
        .update({ is_admin: !user.is_admin })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `User ${user.is_admin ? "removed from" : "made"} admin`,
      });

      loadUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Users for {companyName}</h3>

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

      {loading ? (
        <div className="text-center py-4">Loading users...</div>
      ) : (
        users.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {user.is_admin ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-gray-300" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleAdmin(user)}
                      >
                        {user.is_admin ? "Remove Admin" : "Make Admin"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => handleRemoveUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-4 text-gray-500">
            No users added to this company yet
          </div>
        )
      )}
    </div>
  );
};

export default CompanyUsers;
