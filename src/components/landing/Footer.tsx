
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white py-6 border-t">
      <div className="container mx-auto px-4 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} AssetGuardian. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
