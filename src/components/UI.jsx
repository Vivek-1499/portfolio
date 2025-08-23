import { atom, useAtom } from "jotai";
import { useState } from "react";

export const pageAtom = atom(0);

// Projects data - Add your actual projects here
export const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, shopping cart, payment integration, and admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
    features: [
      "User authentication & authorization",
      "Shopping cart functionality", 
      "Payment processing with Stripe",
      "Admin panel for product management",
      "Responsive design"
    ],
    moreUrl: "/projects/ecommerce",
    liveUrl: "https://your-ecommerce-demo.com",
    image: "/images/image4.png" // Updated to use actual image path
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    technologies: ["React", "TypeScript", "Firebase", "Material-UI"],
    features: [
      "Real-time collaboration",
      "Drag & drop task management",
      "Team workspaces",
      "Progress tracking",
      "Mobile responsive"
    ],
    moreUrl: "/projects/task",
    liveUrl: "https://your-taskmanager-demo.com",
    image: "/images/image1.png"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A modern weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
    technologies: ["Vue.js", "OpenWeatherMap API", "Chart.js", "Tailwind CSS"],
    features: [
      "Location-based weather",
      "7-day forecast",
      "Interactive weather maps",
      "Weather analytics",
      "Offline support"
    ],
    moreUrl: "/projects/weather" ,
    liveUrl: "https://your-weather-demo.com",
    image: "/images/image2.png"
  },
  {
    id: 4,
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media management with data visualization and automated reporting features.",
    technologies: ["Python", "Django", "React", "D3.js", "PostgreSQL"],
    features: [
      "Multi-platform analytics",
      "Automated reporting",
      "Custom data visualizations",
      "User engagement tracking",
      "Export functionality"
    ],
    moreUrl: "/projects/social" ,
    liveUrl: "https://your-social-demo.com",
    image: "/images/image4.png"
  }
];

// Create pages structure for the book - MODIFIED STRUCTURE
export const pages = [
  // Cover page (same as before)
  {
    type: "cover",
    front: "cover",
    back: `project-${projectsData[0].id}-info`, // First project info on back of cover
    project: projectsData[0]
  },
];

// Add project pages (each project takes 1 page spread)
projectsData.forEach((project, index) => {
  if (index === 0) {
    // First project: info is already on back of cover, so this page shows image
    pages.push({
      type: "project",
      projectId: project.id,
      front: `project-${project.id}-image`, // Image on front
      back: index + 1 < projectsData.length ? `project-${projectsData[index + 1].id}-info` : "back-cover", // Next project info or back cover
      project: project,
      nextProject: index + 1 < projectsData.length ? projectsData[index + 1] : null
    });
  } else if (index === projectsData.length - 1) {
    // Last project: only image page needed
    pages.push({
      type: "project",
      projectId: project.id,
      front: `project-${project.id}-image`, // Image on front
      back: "back-cover", // Back cover on back
      project: project
    });
  } else {
    // Middle projects: image on front, next project info on back
    pages.push({
      type: "project",
      projectId: project.id,
      front: `project-${project.id}-image`, // Image on front
      back: `project-${projectsData[index + 1].id}-info`, // Next project info on back
      project: project,
      nextProject: projectsData[index + 1]
    });
  }
});

// Final back cover page
pages.push({
  type: "back-cover",
  front: "contact-info",
  back: "back-cover-final",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (projectId) => {
    setSelectedProject(projectsData.find(p => p.id === projectId));
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Page Navigation */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 pointer-events-auto z-50">
        <div className="bg-black/80 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
          <div className="flex items-center gap-4">
            {pages.map((pageData, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                  index === page
                    ? "bg-indigo-500 text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
                onClick={() => setPage(index)}>
                {pageData.type === "cover" ? "Cover" : 
                 pageData.type === "project" ? `P${pageData.projectId}` :
                 pageData.type === "back-cover" ? "End" : `${index}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
          <p className="text-white/80 text-sm text-center">
            Click and drag to rotate the book • Click pages to navigate • Explore project details
          </p>
        </div>
      </div>
    </div>
  );
};