
import React from "react";
import { Loader2 } from "lucide-react";
import { CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthState } from "@/contexts/AuthStateContext";

interface RegisterFormProps {
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const { 
    email, 
    setEmail, 
    password, 
    setPassword, 
    confirmPassword, 
    setConfirmPassword, 
    error, 
    isSubmitting 
  } = useAuthState();

  return (
    <form onSubmit={onSubmit}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Sign up to access the facility management system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="register-email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="register-email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="register-password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="register-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="confirm-password" className="text-sm font-medium">
            Confirm Password
          </label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </CardContent>
      <CardFooter>
        <Button 
          type="submit" 
          className="w-full" 
          variant="default"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Register"
          )}
        </Button>
      </CardFooter>
    </form>
  );
};
