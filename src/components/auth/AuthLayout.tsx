
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <header className="p-6 border-b bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            AssetGuardian
          </h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="max-w-md w-full">
          {children}
        </div>
      </main>
    </div>
  );
};
