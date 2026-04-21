export default function ProjectCard({ project, onClick }) {
  return (
    <div className="project-card" onClick={() => onClick(project)}>

      {/* Top row: status badge + deadline */}
      <div className="card-header">
        <span className={"badge badge-" + project.status.toLowerCase().replace(" ", "-")}>
          {project.status}
        </span>
        <span className="deadline">📅 {project.deadline}</span>
      </div>

      {/* Project info */}
      <h3 className="card-title">{project.name}</h3>
      <p className="card-manager">👤 {project.manager}</p>
      <p className="card-desc">  {project.description}</p>

    </div>
  );
}
