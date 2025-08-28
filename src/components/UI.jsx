import { atom, useAtom } from "jotai";
import { useState } from "react";
import { projectsData } from "../../data/projectsData";
export const pageAtom = atom(0);
export const pages = [
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