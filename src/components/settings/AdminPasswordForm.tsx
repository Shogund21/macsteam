import { Button } from "@/components/ui/button";
import { AdminPasswordInput } from "./admin/AdminPasswordInput";
import { useAdminPassword } from "@/hooks/use-admin-password";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const AdminPasswordForm = () => {
  const {
    password,
    setPassword,
    isLoading,
    isAuthenticated,
    handleSubmit,
  } = useAdminPassword();

  return (
    <div className="w-full space-y-4">
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
            className="w-full"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
      
      {!isAuthenticated && (
        <Alert variant="destructive">
          <AlertDescription>
            You must be logged in to set admin privileges.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};