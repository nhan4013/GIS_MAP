import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-2">
      <div className="container mx-auto flex items-center justify-between px-6">
        <span className="text-sm">
          &copy; {new Date().getFullYear()} GIS Project
        </span>
        <span className="text-sm">
          All rights reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;