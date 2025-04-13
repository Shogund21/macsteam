
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

interface AuthContainerProps {
  onLogin: (e: React.FormEvent) => Promise<void>;
  onSignUp: (e: React.FormEvent) => Promise<void>;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export const AuthContainer: React.FC<AuthContainerProps> = ({
  onLogin,
  onSignUp,
  activeTab,
  setActiveTab
}) => {
  return (
    <Card>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <LoginForm onSubmit={onLogin} />
        </TabsContent>

        <TabsContent value="register">
          <RegisterForm onSubmit={onSignUp} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};
