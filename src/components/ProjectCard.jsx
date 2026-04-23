// ProjectCard — displays one project as a clickable card
// Props:
//   project (object)   — project data (name, status, manager, deadline, description)
//   onClick (function) — called with the project object when card is clicked

import StatusBadge from "./StatusBadge";

export default function ProjectCard({ project, onClick }) {
  return (
    <div className="project-card" onClick={() => onClick(project)}>

      {/* Top row: status badge + deadline */}
      <div className="card-header">
        <StatusBadge status={project.status} />
        <span className="deadline">📅 {project.deadline}</span>
      </div>

      {/* Project info */}
      <h3 className="card-title">{project.name}</h3>
      <p className="card-manager">👤 {project.manager}</p>
      <p className="card-desc">{project.description}</p>

    </div>
  );
}
