import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaExternalLinkAlt, FaGithub, FaLightbulb, FaCode, FaChartLine, FaDownload, FaShareAlt } from "react-icons/fa";
import Menu from "./Menu";

export default function DashboardDetails() {
  const navigate = useNavigate();
  const [section, setSection] = useState(0);

  const project = {
    id: 4,
    title: "Social Media Dashboard",
    description: "A comprehensive analytics dashboard for social media management featuring advanced data visualization, automated reporting, and multi-platform integration. Built with Python Django backend and React frontend for optimal performance.",
    technologies: ["Python", "Django", "React", "D3.js", "PostgreSQL"],
    features: [
      "Multi-platform analytics",
      "Automated reporting",
      "Custom data visualizations",
      "User engagement tracking",
      "Export functionality"
    ],
    liveUrl: "https://your-social-demo.com",
    githubUrl: "https://github.com/vivekpandit/social-media-dashboard",
    image: "/images/image4.png",
    detailedFeatures: [
      {
        title: "Advanced Analytics Engine",
        description: "Comprehensive data analysis across multiple social media platforms with real-time metrics, engagement tracking, and performance insights powered by Django and PostgreSQL.",
        icon: FaChartLine
      },
      {
        title: "Automated Reporting System",
        description: "Intelligent report generation with customizable templates, scheduled delivery, and advanced filtering options to keep stakeholders informed with minimal manual effort.",
        icon: FaShareAlt
      },
      {
        title: "Data Export & Visualization",
        description: "Interactive charts and graphs using D3.js with export capabilities in multiple formats (PDF, CSV, PNG) for seamless integration with existing workflows.",
        icon: FaDownload
      }
    ],
    techStack: {
      "Frontend": ["React", "D3.js", "Chart.js"],
      "Backend": ["Python", "Django", "Django REST Framework"],
      "Database": ["PostgreSQL", "Redis"],
      "Analytics": ["Pandas", "NumPy"],
      "Visualization": ["D3.js", "Plotly"],
      "Deployment": ["Docker", "AWS"],
      "API Integration": ["Social Media APIs", "REST APIs"]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 project-detail-page">
      <Menu onSectionChange={setSection} section={section} />
      {/* Navigation */}
      <nav className="p-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
        >
          <FaArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </button>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
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
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}