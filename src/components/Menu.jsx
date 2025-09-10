import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Menu = ({ onSectionChange, section, isDetailPage = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're on a detail page
  const isOnDetailPage = isDetailPage || location.pathname.startsWith('/project/');

  if (isOnDetailPage) {
    // Render different menu for detail pages
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
            >
              <svg 
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Portfolio</span>
            </button>
            
            <div className="text-white/80 text-sm">
              <span>Project Details</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Home</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Original menu for main portfolio page
  const menuItems = ["About", "Skills", "Projects", "Contact"];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center justify-center gap-x-6 md:gap-x-8 rounded-full border border-white/20 bg-black/20 px-2 py-2 text-sm font-light text-white/80 shadow-lg shadow-black/20 backdrop-blur-lg">
        {menuItems.map((item, index) => (
          <button
            key={item}
            onClick={() => onSectionChange(index)}
            className={`shine-effect hover:text-white transition-colors duration-300 tracking-wide px-3 py-2 rounded-full cursor-pointer ${
              section === index
                ? "bg-white/20 text-white"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}>
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
};
export default Menu