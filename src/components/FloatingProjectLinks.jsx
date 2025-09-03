import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExternalLinkAlt, FaInfoCircle } from "react-icons/fa";
import { projectsData } from "../../data/projectsData";

const FloatingProjectLinks = ({ section, currentPage }) => {
  // Since we've moved the links into the book itself, 
  // we can hide this component or keep it minimal
  return null;
  
  // Alternative: Keep a minimal indicator
  /*
  if (section !== 2 || currentPage < 1) return null;
  
  const projectIndex = Math.min(currentPage - 1, projectsData.length - 1);
  const project = projectsData[projectIndex];
  
  if (!project) return null;

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
      <div className="bg-black/70 backdrop-blur-sm border border-white/20 rounded-lg p-3 shadow-lg">
        <div className="text-white text-sm text-center">
          <p className="font-medium">{project.title}</p>
          <p className="text-gray-400 text-xs mt-1">Click buttons in book</p>
        </div>
      </div>
    </div>
  );
  */
};

export default FloatingProjectLinks;