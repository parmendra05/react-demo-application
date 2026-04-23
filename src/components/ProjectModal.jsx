// ProjectModal — shows full project details in a popup
// Props:
//   project  (object|null) — selected project, null means modal is hidden
//   onClose  (function)    — closes the modal
//   onEdit   (function)    — opens the edit form for this project
//   onDelete (function)    — deletes this project by id

import StatusBadge from "./StatusBadge";
import ModalOverlay from "./ModalOverlay";

export default function ProjectModal({ project, onClose, onEdit, onDelete }) {
  // Return nothing if no project is selected — modal stays hidden
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
