import StatusBadge from "./StatusBadge";
import ModalOverlay from "./ModalOverlay";

export default function ProjectModal({ project, onClose, onEdit, onDelete }) {
  if (!project) return null;

  return (
    <ModalOverlay onClose={onClose}>
      <button className="modal-close" onClick={onClose}>✕</button>
      <h2>{project.name}</h2>
      <StatusBadge status={project.status} />
      <p className="modal-desc">{project.description}</p>
      <p><strong>Manager:</strong> {project.manager}</p>
      <p><strong>Deadline:</strong> {project.deadline}</p>
      <div className="modal-actions">
        <button className="btn-secondary" onClick={() => onEdit(project)}>✏️ Edit</button>
        <button className="btn-danger" onClick={() => onDelete(project.id)}>🗑️ Delete</button>
      </div>
    </ModalOverlay>
  );
}
