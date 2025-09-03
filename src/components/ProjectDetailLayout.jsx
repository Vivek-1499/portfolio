import React from "react";
import Menu from "./Menu"; // Assuming Menu.jsx is in the same folder

const ProjectDetailLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 project-detail-page overflow-y-auto">
      <Menu isDetailPage={true} />
      {/* Add top padding to the main content to avoid being hidden by the fixed menu */}
      <main className="max-w-7xl mx-auto px-6 pb-12 pt-28">
        {children}
      </main>
    </div>
  );
};

export default ProjectDetailLayout;