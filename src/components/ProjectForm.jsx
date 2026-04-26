import { useState } from "react";
import ModalOverlay from "./ModalOverlay";
import ManagerSelect from "./ManagerSelect";
import DeadlinePicker from "./DeadlinePicker";

const STATUSES = ["In Progress", "Completed", "On Hold"];

export default function ProjectForm({ initial, onSave, onCancel, projects }) {
  const existingManagers = [...new Set(projects.map((p) => p.manager))];

  const [form, setForm] = useState(() => {
    if (initial) return initial;
    return { name: "", manager: existingManagers[0] ?? "", status: "In Progress", deadline: "", description: "" };
  });
  const [isNewManager, setIsNewManager] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleManagerChange(value) {
    setForm((prev) => ({ ...prev, manager: value }));
  }

  function handleToggleNewManager() {
    setIsNewManager((prev) => {
      if (prev) setForm((f) => ({ ...f, manager: existingManagers[0] ?? "" }));
      else setForm((f) => ({ ...f, manager: "" }));
      return !prev;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.manager.trim() || !form.deadline) return;
    onSave(form);
  }

  return (
    <ModalOverlay onClose={onCancel} className="form-modal">
      <button className="modal-close" onClick={onCancel}>✕</button>
      <h2>{initial ? "Edit Project" : "Add New Project"}</h2>

      <form className="project-form" onSubmit={handleSubmit}>
        <label>Project Name
          <input name="name" value={form.name} onChange={handleChange} placeholder="Enter project name" required />
        </label>

        <label>Manager
          <ManagerSelect
            managers={existingManagers}
            value={form.manager}
            onChange={handleManagerChange}
            isNew={isNewManager}
            onToggleNew={handleToggleNewManager}
          />
        </label>

        <label>Status
          <select name="status" value={form.status} onChange={handleChange}>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>

        <label>Deadline
          <DeadlinePicker
            value={form.deadline}
            onChange={(date) => setForm((prev) => ({ ...prev, deadline: date }))}
          />
        </label>

        <label>Description
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Enter project description" rows={3} />
        </label>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn-primary">{initial ? "Save Changes" : "Add Project"}</button>
        </div>
      </form>
    </ModalOverlay>
  );
}
