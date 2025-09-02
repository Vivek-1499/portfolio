import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaExternalLinkAlt, FaGithub, FaLightbulb, FaCode, FaChartLine, FaDownload, FaShareAlt } from "react-icons/fa";

export default function DashboardDetails() {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
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
                ctx.fillText('Analytics Dashboard', canvas.width / 2, canvas.height / 2 + 20);
                
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
                    <div className="bg-cyan-500/20 p-3 rounded-lg">
                      <feature.icon className="text-cyan-400" size={24} />
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
                <h2 className="text-3xl font-bold text-white">Technology Stack</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {Object.entries(project.techStack).map(([category, techs]) => (
                  <div key={category} className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-purple-300 mb-4">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {techs.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium border border-purple-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Overview */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-6">Project Overview</h2>
              <div className="text-gray-300 space-y-4 text-lg leading-relaxed">
                <p>
                  The Social Media Dashboard showcases advanced data analytics capabilities and demonstrates proficiency 
                  in handling complex data visualization challenges. This project addresses the growing need for 
                  comprehensive social media management tools in today's digital landscape.
                </p>
                <p>
                  Built with a Python Django backend for robust data processing and a React frontend for dynamic user 
                  interactions, the dashboard provides real-time insights into social media performance across multiple 
                  platforms. The use of D3.js enables sophisticated data visualizations that make complex metrics accessible.
                </p>
                <p>
                  The automated reporting system demonstrates understanding of workflow automation and business intelligence, 
                  providing stakeholders with actionable insights without manual intervention. PostgreSQL ensures reliable 
                  data storage and efficient querying for large datasets.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Stats */}
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
                  <span className="text-white font-semibold">Analytics</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status</span>
                  <span className="text-yellow-400 font-semibold">Demo</span>
                </div>
              </div>
            </div>

            {/* Technical Highlights */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6">Technical Highlights</h3>
              <div className="space-y-4 text-sm">
                <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                  <span className="text-blue-400 font-medium">Data Analytics</span>
                  <p className="text-gray-300 mt-1">Advanced data processing with Pandas & NumPy</p>
                </div>
                <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                  <span className="text-green-400 font-medium">Real-time Dashboard</span>
                  <p className="text-gray-300 mt-1">Live data updates and interactive charts</p>
                </div>
                <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                  <span className="text-purple-400 font-medium">API Integration</span>
                  <p className="text-gray-300 mt-1">Multi-platform social media APIs</p>
                </div>
              </div>
            </div>

            {/* Related Projects */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6">Related Projects</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/project/2')}
                  className="block w-full text-left p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                >
                  <div className="text-white font-medium">SoMo</div>
                  <div className="text-gray-400 text-sm mt-1">Social Media Platform</div>
                </button>
                <button
                  onClick={() => navigate('/project/1')}
                  className="block w-full text-left p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                >
                  <div className="text-white font-medium">Saveior</div>
                  <div className="text-gray-400 text-sm mt-1">Finance Management</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}