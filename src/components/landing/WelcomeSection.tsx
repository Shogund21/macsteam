
import React from "react";

interface WelcomeSectionProps {
  hasCompanies: boolean;
}

const WelcomeSection = ({ hasCompanies }: WelcomeSectionProps) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4">Welcome to AssetGuardian</h2>
      {hasCompanies ? (
        <p className="text-lg text-gray-600 mb-8">
          Select your company to access your facility management dashboard
        </p>
      ) : (
        <p className="text-lg text-gray-600 mb-8">
          Get started by creating your first company
        </p>
      )}
    </div>
  );
};

export default WelcomeSection;
