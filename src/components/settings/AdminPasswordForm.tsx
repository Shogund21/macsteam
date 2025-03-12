
import { Button } from "@/components/ui/button";
import { AdminPasswordInput } from "./admin/AdminPasswordInput";
import { useAdminPassword } from "@/hooks/use-admin-password";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

export const AdminPasswordForm = () => {
  const {
    password,
    setPassword,
    isLoading,
    isAdmin,
    error,
    isAuthenticated,
    handleSubmit,
  } = useAdminPassword();

  return (
    <div className="w-full space-y-4">
      {!isAuthenticated && (
        <Alert variant="destructive" className="bg-red-100 text-red-800 border-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You must be logged in to set admin privileges.
          </AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <AdminPasswordInput
            value={password}
            onChange={setPassword}
            disabled={isLoading || !isAuthenticated}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !isAuthenticated}
            className="w-full bg-[#1EAEDB] hover:bg-[#33C3F0] text-white"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
      
      {error && (
        <Alert variant="destructive" className="bg-red-100 text-red-800 border-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}
      
      {isAdmin && (
        <Alert className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            You have admin privileges.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
