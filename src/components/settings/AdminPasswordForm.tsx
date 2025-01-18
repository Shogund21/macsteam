import { Button } from "@/components/ui/button";
import { AdminPasswordInput } from "./admin/AdminPasswordInput";
import { useAdminPassword } from "@/hooks/use-admin-password";

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
      <div className="text-sm text-muted-foreground">
        Please log in to access admin features.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AdminPasswordInput
        value={password}
        onChange={setPassword}
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};