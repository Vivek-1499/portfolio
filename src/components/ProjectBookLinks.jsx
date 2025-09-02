// src/components/BookProjectLinks.jsx

import React from 'react';
import { Html } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { FaExternalLinkAlt, FaGithub, FaInfoCircle } from 'react-icons/fa';
import { projectsData } from '../../data/projectsData';

export function BookProjectLinks({ section, currentPage }) {
  const navigate = useNavigate();

  // Hide the component if not in the projects section or on the cover page
  if (section !== 2 || currentPage < 1) {
    return null;
  }

  const projectIndex = Math.min(currentPage - 1, projectsData.length - 1);
  const project = projectsData[projectIndex];

  if (!project) {
    return null;
  }

  const handleDetailsClick = (e) => {
    e.stopPropagation(); // Prevents the book page from turning
    navigate(`/project/${project.id}`);
  };

  return (
    // This is the magic part! We wrap our UI in the <Html> component.
    <Html
      position={[0.1, 0.25, 0.1]} // Position it relative to the book's center [x, y, z]
      rotation-x={-Math.PI / 2} // Rotate it to lay flat on top of the book
      transform // This makes it transform (scale, rotate) with the parent object
      distanceFactor={1.5} // Controls how it scales with distance
      occlude // This will hide the links if another 3D object passes in front
      wrapperClass="book-links-wrapper" // A CSS class for the container div
    >
      <div className="bg-black/80 backdrop-blur-lg border border-white/20 rounded-xl p-4 shadow-2xl min-w-[220px]">
        {/* Project Header */}
        <div className="mb-4 text-center">
          <h3 className="text-white font-bold text-lg mb-1">{project.title}</h3>
          <p className="text-gray-400 text-xs leading-snug">
            {project.description.substring(0, 80)}...
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleDetailsClick}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg transition-all text-sm font-medium group"
          >
            <FaInfoCircle />
            <span>View Details</span>
          </button>
          
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-all text-sm font-medium group"
            >
              <FaExternalLinkAlt />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </Html>
  );
}