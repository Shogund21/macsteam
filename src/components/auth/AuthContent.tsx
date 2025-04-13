
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCompany } from "@/contexts/CompanyContext";
import { Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { AuthContainer } from "@/components/auth/AuthContainer";
import { AuthStateProvider, useAuthState } from "@/contexts/AuthStateContext";

export const AuthContent: React.FC = () => {
  const { signIn, signUp, user, isLoading } = useAuth();
  const { companies } = useCompany();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const {
    email,
    password,
    confirmPassword,
    error,
    setError,
    isSubmitting,
    setIsSubmitting
  } = useAuthState();

  useEffect(() => {
    if (user && !isLoading) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  const handleFormValidation = (type: "login" | "register") => {
    setError("");
    
    if (!email || !password) {
      setError("Email and password are required");
      return false;
    }

    if (type === "register") {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return false;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return false;
      }
    }

    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!handleFormValidation("login")) return;

    try {
      setIsSubmitting(true);
      await signIn(email, password);
    } catch (error) {
      // Error handling is done in AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!handleFormValidation("register")) return;

    try {
      setIsSubmitting(true);
      await signUp(email, password);
      setActiveTab("login");
    } catch (error) {
      // Error handling is done in AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <AuthLayout>
      <AuthHeader companyCount={companies.length} />
      
      <AuthContainer 
        onLogin={handleLogin}
        onSignUp={handleSignUp}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <AuthFooter />
    </AuthLayout>
  );
};
