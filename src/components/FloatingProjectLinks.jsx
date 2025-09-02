import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExternalLinkAlt, FaInfoCircle } from "react-icons/fa";
import { projectsData } from "../../data/projectsData";

const FloatingProjectLinks = ({ section, currentPage }) => {
  const navigate = useNavigate();
  
  if (section !== 2 || currentPage < 1) return null;
  
  const projectIndex = Math.min(currentPage - 1, projectsData.length - 1);
  const project = projectsData[projectIndex];
  
  if (!project) return null;

  const handleDetailsClick = () => {
    navigate(`/project/${project.id}`);
  };

  const handleLiveDemoClick = () => {
    if (project.liveUrl) {
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    }
  };


  return (
    <div className="fixed right-8 top-1/4 -translate-y-1/2 z-50 pointer-events-auto ">
      <div className="bg-black/90 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl min-w-[280px] max-w-[300px]">
        

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleDetailsClick}
            className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium shadow-lg group"
          >
            <FaInfoCircle size={18} className="group-hover:scale-110 transition-transform" />
            <span>View Details</span>
          </button>
          
          {project.liveUrl && (
            <button
              onClick={handleLiveDemoClick}
              className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium shadow-lg group"
            >
              <FaExternalLinkAlt size={18} className="group-hover:scale-110 transition-transform" />
              <span>Live Demo</span>
            </button>
          )}
          
        </div>

        {/* Project Status Indicator */}
        
      </div>
    </div>
  );
};

export default FloatingProjectLinks;