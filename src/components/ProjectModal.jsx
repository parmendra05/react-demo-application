export default function ProjectModal({ project, onClose }) {
  // If no project is selected, render nothing (modal stays hidden)
  if (!project) return null;

  return (
    // Clicking the dark overlay closes the modal
    <div className="modal-overlay" onClick={onClose}>

      {/* stopPropagation prevents clicks inside the modal from closing it */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <button className="modal-close" onClick={onClose}>✕</button>

        <h2>{project.name}</h2>
        <span className={"badge badge-" + project.status.toLowerCase().replace(" ", "-")}>
          {project.status}
        </span>

        <p className="modal-desc">{project.description}</p>

        <p><strong>Manager:</strong> {project.manager}</p>
        <p><strong>Deadline:</strong> {project.deadline}</p>

      </div>
    </div>
  );
}
