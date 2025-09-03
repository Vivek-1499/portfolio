import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";

const SharedNavigation = ({ currentProject }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
          >
            <FaArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </button>
          
          {currentProject && (
            <div className="text-white/80 text-sm">
              <span>Project Details: </span>
              <span className="text-white font-medium">{currentProject}</span>
            </div>
          )}
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <FaHome size={16} />
              <span>Home</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SharedNavigation;