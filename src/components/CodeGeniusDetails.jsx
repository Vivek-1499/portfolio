import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaExternalLinkAlt, FaGithub, FaLightbulb, FaCode, FaGraduationCap, FaQuestionCircle, FaUser } from "react-icons/fa";
import Menu from "./Menu";
import SharedNavigation from "./SharedNavigation";

export default function CodeGeniusDetails() {
  const navigate = useNavigate();
  const [section, setSection] = useState(0);

  const project = {
    id: 3,
    title: "CodeGenius",
    description: "An interactive e-learning web platform designed to make programming education accessible and engaging. Features comprehensive language learning modules and a real-time developer help system for instant code assistance.",
    technologies: ["PHP", "HTML", "CSS", "JavaScript"],
    features: [
      "Language learning modules",
      "Submit code help requests",
      "User registration/login system",
      "Interactive UI with PHP backend"
    ],
    liveUrl: "https://vivek-1499.github.io/CodeGenius/",
    githubUrl: "https://github.com/Vivek-1499/CodeGenius",
    image: "/images/cg.png",
    detailedFeatures: [
      {
        title: "Interactive Learning Modules",
        description: "Comprehensive programming courses with hands-on exercises, code examples, and progressive difficulty levels designed to help learners master different programming languages.",
        icon: FaGraduationCap
      },
      {
        title: "Real-time Code Help",
        description: "Submit code snippets and get instant assistance from experienced developers. A collaborative environment for learning and problem-solving with peer support.",
        icon: FaQuestionCircle
      },
      {
        title: "User Management System",
        description: "Secure user authentication and profile management built with PHP, allowing learners to track progress and maintain their learning journey.",
        icon: FaUser
      }
    ],
    techStack: {
      "Frontend": ["HTML5", "CSS3", "JavaScript"],
      "Backend": ["PHP"],
      "Database": ["MySQL"],
      "Styling": ["Custom CSS", "Responsive Design"],
      "Features": ["Session Management", "Form Validation"],
      "Deployment": ["GitHub Pages", "Static Hosting"]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 project-detail-page">
      <SharedNavigation currentProject="CodeDenius" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
            {project.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {project.description}
          </p>
          
          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <FaExternalLinkAlt size={20} />
              <span>Live Demo</span>
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <FaGithub size={20} />
              <span>View Code</span>
            </a>
          </div>
        </div>

        {/* Project Image */}
        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[500px] object-cover"
              onError={(e) => {
                const canvas = document.createElement('canvas');
                canvas.width = 1200;
                canvas.height = 600;
                const ctx = canvas.getContext('2d');
                
                ctx.fillStyle = '#4a5568';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 48px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(project.title, canvas.width / 2, canvas.height / 2 - 20);

                ctx.fillStyle = '#a0aec0';
                ctx.font = '24px Arial';
                ctx.fillText('E-Learning Platform', canvas.width / 2, canvas.height / 2 + 20);
                
                e.target.src = canvas.toDataURL();
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Key Features */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-8">
                <FaLightbulb className="text-yellow-400" size={28} />
                <h2 className="text-3xl font-bold text-white">Key Features</h2>
              </div>
              <div className="grid gap-6">
                {project.detailedFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="bg-orange-500/20 p-3 rounded-lg">
                      <feature.icon className="text-orange-400" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-8">
                <FaCode className="text-purple-400" size={28} />
                <h2 className="text-3xl font-bold text-white">Tech Stack</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                {Object.entries(project.techStack).map(([category, techs]) => (
                  <div key={category}>
                    <h4 className="text-lg font-semibold text-white/80 mb-3">{category}</h4>
                    <ul className="space-y-2">
                      {techs.map((tech, i) => (
                        <li key={i} className="bg-white/5 border border-white/10 px-3 py-1 rounded-md text-gray-300 text-sm">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Project Stats */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6">Project Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Technologies</span>
                  <span className="text-white font-semibold">{project.technologies.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Key Features</span>
                  <span className="text-white font-semibold">{project.features.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Category</span>
                  <span className="text-white font-semibold">E-Learning</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-400 font-semibold">Live</span>
                </div>
              </div>
            </div>

            {/* Technical Highlights */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6">Technical Highlights</h3>
              <div className="space-y-4 text-sm">
                <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                  <span className="text-blue-400 font-medium">PHP Backend</span>
                  <p className="text-gray-300 mt-1">Server-side processing and database management</p>
                </div>
                <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                  <span className="text-green-400 font-medium">Interactive UI</span>
                  <p className="text-gray-300 mt-1">Dynamic JavaScript interfaces for learning</p>
                </div>
                <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                  <span className="text-purple-400 font-medium">Educational Focus</span>
                  <p className="text-gray-300 mt-1">Structured learning paths and progress tracking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}