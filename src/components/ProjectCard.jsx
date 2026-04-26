import StatusBadge from "./StatusBadge";

export default function ProjectCard({ project, onClick }) {
  return (
    <div className="project-card" onClick={() => onClick(project)}>
      <div className="card-header">
        <StatusBadge status={project.status} />
        <span className="deadline">📅 {project.deadline}</span>
      </div>
      <h3 className="card-title">{project.name}</h3>
      <p className="card-manager">👤 {project.manager}</p>
      <p className="card-desc">{project.description}</p>
    </div>
  );
}
