import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaExternalLinkAlt, FaGithub, FaLightbulb, FaCode, FaRobot, FaEnvelope, FaChartLine, FaHome } from "react-icons/fa";
import SharedNavigation from "./SharedNavigation";

export default function SaveiorDetails() {
  const navigate = useNavigate();

  const project = {
    id: 1,
    title: "Saveior",
    description: "A comprehensive fullstack Next.js web application designed for modern finance management. Features AI-powered receipt scanning using Google Gemini, automated monthly reports via email, and intelligent workflows for seamless expense tracking.",
    technologies: ["Next.js", "Prisma", "Arcjet", "Inngest", "Resend", "Clerk", "Supabase", "Google Gemini"],
    features: [
      "AI receipt scanning",
      "User authentication",
      "Monthly email reports",
      "Automated workflows",
      "Graph-based insights"
    ],
    liveUrl: "https://saveior.vercel.app/",
    githubUrl: "https://github.com/Vivek-1499/Saveior",
    image: "/images/saveior.png",
    detailedFeatures: [
      {
        title: "AI-Powered Receipt Scanning",
        description: "Leverages Google Gemini AI to automatically extract data from receipt images, categorize expenses, and populate transaction details with high accuracy.",
        icon: FaRobot
      },
      {
        title: "Automated Email Reports",
        description: "Monthly financial summaries sent automatically via Resend, providing insights into spending patterns and budget performance.",
        icon: FaEnvelope
      },
      {
        title: "Advanced Analytics",
        description: "Interactive graphs and charts powered by modern visualization libraries to help users understand their financial habits.",
        icon: FaChartLine
      }
    ],
    techStack: {
      "Frontend": ["Next.js", "React", "Tailwind CSS"],
      "Backend": ["Next.js API Routes", "Prisma ORM"],
      "Database": ["Supabase PostgreSQL"],
      "AI/ML": ["Google Gemini"],
      "Authentication": ["Clerk"],
      "Email": ["Resend"],
      "Security": ["Arcjet"],
      "Automation": ["Inngest"]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-y-auto">
      {/* Shared Navigation Header */}
      <SharedNavigation currentProject="Saveior" />

      {/* Main Content with proper spacing for fixed header */}
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
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
                  ctx.fillText('Finance Management Dashboard', canvas.width / 2, canvas.height / 2 + 20);
                  
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
                      <div className="bg-blue-500/20 p-3 rounded-lg">
                        <feature.icon className="text-blue-400" size={24} />
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
                    Saveior represents a modern approach to personal finance management, combining cutting-edge AI technology 
                    with intuitive user experience design. The application addresses the common pain points of expense tracking 
                    by automating data entry through intelligent receipt scanning.
                  </p>
                  <p>
                    Built with Next.js for optimal performance and SEO, the application leverages a robust tech stack including 
                    Supabase for data management, Clerk for secure authentication, and Google Gemini for AI-powered features. 
                    The automated workflow system powered by Inngest ensures users receive timely financial insights without manual intervention.
                  </p>
                  <p>
                    The user interface prioritizes clarity and accessibility, featuring interactive charts and graphs that 
                    transform complex financial data into actionable insights. Security is paramount, with Arcjet providing 
                    comprehensive protection against common web vulnerabilities.
                  </p>
                </div>
              </div>

              {/* Additional Development Process Section */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-6">Development Process</h2>
                <div className="text-gray-300 space-y-4 text-lg leading-relaxed">
                  <p>
                    The development of Saveior followed modern software engineering practices, starting with comprehensive 
                    requirement analysis and user journey mapping. The architecture was designed with scalability in mind, 
                    utilizing microservices principles through Inngest workflows.
                  </p>
                  <p>
                    Special emphasis was placed on the AI integration, where multiple iterations were performed to optimize 
                    the receipt scanning accuracy. The Google Gemini API was fine-tuned with custom prompts to extract 
                    structured data from various receipt formats with high precision.
                  </p>
                  <p>
                    Testing strategies included unit testing for individual components, integration testing for API endpoints, 
                    and end-to-end testing for critical user flows. The deployment pipeline utilizes Vercel's edge functions 
                    for optimal global performance.
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
                    <span className="text-white font-semibold">Full Stack</span>
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
                    <span className="text-blue-400 font-medium">AI Integration</span>
                    <p className="text-gray-300 mt-1">Google Gemini API for intelligent receipt processing</p>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <span className="text-green-400 font-medium">Real-time Updates</span>
                    <p className="text-gray-300 mt-1">Live data synchronization with Supabase</p>
                  </div>
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <span className="text-purple-400 font-medium">Automation</span>
                    <p className="text-gray-300 mt-1">Inngest workflows for background tasks</p>
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
                    onClick={() => navigate('/project/3')}
                    className="block w-full text-left p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                  >
                    <div className="text-white font-medium">CodeGenius</div>
                    <div className="text-gray-400 text-sm mt-1">E-Learning Platform</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}