
import React from "react";
import { AuthStateProvider } from "@/contexts/AuthStateContext";
import { AuthContent } from "@/components/auth/AuthContent";

const Auth = () => {
  return (
    <AuthStateProvider>
      <AuthContent />
    </AuthStateProvider>
  );
};

export default Auth;
