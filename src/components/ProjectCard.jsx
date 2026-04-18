// Maps each status to its CSS badge class
const STATUS_CLASS = {
  "In Progress": "badge-progress",
  "Completed": "badge-completed",
  "On Hold": "badge-hold",
};

// Calculates how many days are left until the deadline
function getDeadlineInfo(deadline) {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysLeft = Math.ceil((deadlineDate - today) / msPerDay);

  if (daysLeft < 0) {
    return { label: `${Math.abs(daysLeft)}d overdue`, className: "overdue" };
  }
  if (daysLeft < 30) {
    return { label: `${daysLeft}d left`, className: "soon" };
  }
  return { label: `${daysLeft}d left`, className: "" };
}

export default function ProjectCard({ project, onClick }) {
  const deadline = getDeadlineInfo(project.deadline);

  return (
    <div className="project-card" onClick={() => onClick(project)}>

      {/* Top row: status badge + deadline */}
      <div className="card-header">
        <span className={`badge ${STATUS_CLASS[project.status]}`}>
          {project.status}
        </span>
        <span className={`deadline ${deadline.className}`}>
          {deadline.label}
        </span>
      </div>

      {/* Project info */}
      <h3 className="card-title">{project.name}</h3>
      <p className="card-manager">👤 {project.manager}</p>
      <p className="card-desc">{project.description}</p>

      {/* Progress bar */}
      <div className="progress-wrap">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <span className="progress-label">{project.progress}%</span>
      </div>

      <button className="view-btn">View Details →</button>
    </div>
  );
}
