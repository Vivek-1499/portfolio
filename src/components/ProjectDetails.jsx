import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projectsData } from "./UI";
import { FaArrowLeft, FaExternalLinkAlt, FaGithub, FaLightbulb, FaCode, FaUsers } from "react-icons/fa";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find(p => p.id.toString() === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project not found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto"
          >
            <FaArrowLeft size={20} />
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="p-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <FaArrowLeft size={20} />
          Back to Portfolio
        </button>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {project.description}
          </p>
        </div>

        {/* Project Image */}
        <div className="mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-96 object-cover"
              onError={(e) => {
                // Create a simple placeholder SVG
                const canvas = document.createElement('canvas');
                canvas.width = 800;
                canvas.height = 400;
                const ctx = canvas.getContext('2d');
                
                // Dark background
                ctx.fillStyle = '#4a5568';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // White text
                ctx.fillStyle = '#ffffff';
                ctx.font = '24px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(`${project.title} Screenshot`, canvas.width / 2, canvas.height / 2);
                
                e.target.src = canvas.toDataURL();
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Technologies Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <FaCode className="text-purple-400" size={24} />
                <h2 className="text-2xl font-bold text-white">Technologies Used</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium border border-purple-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <FaLightbulb className="text-yellow-400" size={24} />
                <h2 className="text-2xl font-bold text-white">Key Features</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <FaUsers className="text-cyan-400" size={24} />
                <h2 className="text-2xl font-bold text-white">Project Details</h2>
              </div>
              <div className="text-gray-300 space-y-3">
                <p>
                  This project demonstrates my expertise in full-stack development and modern web technologies. 
                  It showcases my ability to create scalable, user-friendly applications with clean code architecture.
                </p>
                <p>
                  The development process involved careful planning, iterative design, and thorough testing to ensure 
                  a robust and maintainable codebase. Special attention was paid to performance optimization and 
                  user experience design.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Project Links</h3>
              
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 group"
                >
                  <FaExternalLinkAlt size={20} />
                  <span>Live Demo</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 group"
                >
                  <FaGithub size={20} />
                  <span>View Code</span>
                </a>
              )}
            </div>

            {/* Project Stats */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Project Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Technologies:</span>
                  <span className="text-white">{project.technologies.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Features:</span>
                  <span className="text-white">{project.features.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white">Full Stack</span>
                </div>
              </div>
            </div>

            {/* Related Projects */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Other Projects</h3>
              <div className="space-y-2">
                {projectsData
                  .filter(p => p.id !== project.id)
                  .slice(0, 3)
                  .map((relatedProject) => (
                    <button
                      key={relatedProject.id}
                      onClick={() => navigate(`/project/${relatedProject.id}`)}
                      className="block w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="text-white text-sm font-medium">
                        {relatedProject.title}
                      </div>
                      <div className="text-gray-400 text-xs mt-1">
                        {relatedProject.technologies.slice(0, 2).join(', ')}
                      </div>
                    </button>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}