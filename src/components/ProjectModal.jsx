// Maps task status to its CSS class
const TASK_CLASS = {
  "Done": "task-done",
  "In Progress": "task-progress",
  "Pending": "task-pending",
};

// Returns the right badge CSS class for a project status
function getBadgeClass(status) {
  if (status === "Completed") return "badge-completed";
  if (status === "On Hold") return "badge-hold";
  return "badge-progress";
}

// Formats "2026-06-15" → "June 15, 2026"
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ProjectModal({ project, onClose }) {
  // If no project is selected, render nothing (modal stays hidden)
  if (!project) return null;

  return (
    // Clicking the dark overlay closes the modal
    <div className="modal-overlay" onClick={onClose}>

      {/* stopPropagation prevents clicks inside the modal from closing it */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Header: project name + status badge */}
        <div className="modal-header">
          <h2>{project.name}</h2>
          <span className={`badge badge-lg ${getBadgeClass(project.status)}`}>
            {project.status}
          </span>
        </div>

        <p className="modal-desc">{project.description}</p>

        {/* Meta info grid: manager, deadline, progress */}
        <div className="modal-meta">
          <div>
            <span className="meta-label">Manager</span>
            <span>{project.manager}</span>
          </div>
          <div>
            <span className="meta-label">Deadline</span>
            <span>{formatDate(project.deadline)}</span>
          </div>
          <div>
            <span className="meta-label">Progress</span>
            <span>{project.progress}%</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="modal-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Task list */}
        <h4 className="tasks-heading">Tasks ({project.tasks.length})</h4>
        <ul className="task-list">
          {project.tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span className={`task-dot ${TASK_CLASS[task.status]}`} />
              <span className="task-title">{task.title}</span>
              <span className={`task-badge ${TASK_CLASS[task.status]}`}>
                {task.status}
              </span>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
