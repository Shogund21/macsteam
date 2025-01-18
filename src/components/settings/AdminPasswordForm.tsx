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

  if (!isAuthenticated) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertDescription>
          You must be logged in to set admin privileges.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <AdminPasswordInput
          value={password}
          onChange={setPassword}
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={isLoading} 
          className="w-full"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};