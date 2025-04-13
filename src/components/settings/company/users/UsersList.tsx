
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Check, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "./types";

interface UsersListProps {
  users: User[];
  loading: boolean;
  onRefresh: () => void;
}

export const UsersList = ({ users, loading, onRefresh }: UsersListProps) => {
  const { toast } = useToast();

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

      onRefresh();
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

      onRefresh();
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading users...</div>;
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No users added to this company yet
      </div>
    );
  }

  return (
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
  );
};
