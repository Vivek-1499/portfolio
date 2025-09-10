import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaExternalLinkAlt, FaGithub, FaLightbulb, FaCode, FaUsers, FaComments, FaMoon } from "react-icons/fa";
import SharedNavigation from "./SharedNavigation";

export default function SoMoDetails() {
  const navigate = useNavigate();

  const project = {
    id: 2,
    title: "SoMo",
    description: "A modern MERN-stack social media application featuring real-time messaging, interactive posts, and a sleek responsive design. Built with Socket.io for instant communication and Tailwind CSS for a polished user interface.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Tailwind CSS"],
    features: [
      "User sign-up/login (JWT)",
      "Create/edit posts with image cropping",
      "Like, comment, bookmark functionality",
      "Realtime messaging (chat)",
      "Responsive UI with dark mode and notifications"
    ],
    liveUrl: "https://somo-two.vercel.app",
    githubUrl: "https://github.com/Vivek-1499/SoMo",
    image: "/images/somo.png",
    detailedFeatures: [
      {
        title: "Real-time Messaging",
        description: "Instant messaging system built with Socket.io enabling seamless communication between users with message notifications and online status indicators.",
        icon: FaComments
      },
      {
        title: "Interactive Social Features",
        description: "Complete social media functionality including post creation, image uploads with cropping, likes, comments, and bookmark system for saving favorite content.",
        icon: FaUsers
      },
      {
        title: "Modern UI/UX",
        description: "Responsive design with dark mode support, smooth animations, and mobile-first approach ensuring excellent user experience across all devices.",
        icon: FaMoon
      }
    ],
    techStack: {
      "Frontend": ["React", "Tailwind CSS", "React Router"],
      "Backend": ["Node.js", "Express.js"],
      "Database": ["MongoDB", "Mongoose"],
      "Real-time": ["Socket.io"],
      "Authentication": ["JWT", "bcrypt"],
      "File Upload": ["Multer", "Cloudinary"],
      "Deployment": ["Vercel", "MongoDB Atlas"]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 project-detail-page">
      {/* Navigation */}
      <SharedNavigation currentProject="SoMo" />
      

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-pink-400 to-violet-600 bg-clip-text text-transparent">
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
                ctx.fillText('Social Media Platform', canvas.width / 2, canvas.height / 2 + 20);
                
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
                    <div className="bg-pink-500/20 p-3 rounded-lg">
                      <feature.icon className="text-pink-400" size={24} />
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
                  SoMo is a comprehensive social media platform that demonstrates modern web development practices and 
                  real-time communication technologies. The application provides a complete social networking experience 
                  with features comparable to major social platforms.
                </p>
                <p>
                  The real-time messaging system powered by Socket.io creates an engaging user experience with instant 
                  notifications and seamless communication. The responsive design ensures optimal performance across 
                  desktop and mobile devices, while the dark mode feature provides comfortable viewing in any environment.
                </p>
                <p>
                  Built with security and scalability in mind, the application implements JWT authentication, secure 
                  image handling, and efficient database queries to support a growing user base while maintaining 
                  excellent performance.
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
                  <span className="text-white font-semibold">Social Media</span>
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
                  <span className="text-blue-400 font-medium">Real-time Chat</span>
                  <p className="text-gray-300 mt-1">Socket.io for instant messaging</p>
                </div>
                <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                  <span className="text-green-400 font-medium">Image Processing</span>
                  <p className="text-gray-300 mt-1">Advanced cropping and upload system</p>
                </div>
                <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                  <span className="text-purple-400 font-medium">Responsive Design</span>
                  <p className="text-gray-300 mt-1">Mobile-first with dark mode support</p>
                </div>
              </div>
            </div>

            {/* Related Projects */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6">Related Projects</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/project/1')}
                  className="block w-full text-left p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                >
                  <div className="text-white font-medium">Saveior</div>
                  <div className="text-gray-400 text-sm mt-1">Finance Management</div>
                </button>
                <button
                  onClick={() => navigate('/project/4')}
                  className="block w-full text-left p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                >
                  <div className="text-white font-medium">Social Media Dashboard</div>
                  <div className="text-gray-400 text-sm mt-1">Analytics Platform</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}