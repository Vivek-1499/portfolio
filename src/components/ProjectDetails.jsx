import { useParams } from "react-router-dom";
import { projectsData } from "./UI";

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projectsData.find(p => p.id.toString() === id);

  if (!project) return <h1>Project not found</h1>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <img src={project.image} alt={project.title} className="rounded-lg mb-4" />
      <p className="mb-4">{project.description}</p>

      <h2 className="text-xl font-semibold">Technologies</h2>
      <ul className="list-disc list-inside mb-4">
        {project.technologies.map((tech, i) => (
          <li key={i}>{tech}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold">Features</h2>
      <ul className="list-disc list-inside mb-4">
        {project.features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>

      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600"
        >
          🌐 Live Demo
        </a>
      )}
    </div>
  );
}
