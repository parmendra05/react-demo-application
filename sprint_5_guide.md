# Sprint 5 — StatsRow, ProjectGrid & ProjectModal

**Goal:** Build the stats summary row, the cards grid with loading/empty states, and the project detail popup.

---

## What You Will Do
- Create `StatsRow` — 4 summary count cards at the top of the dashboard
- Create `ProjectGrid` — handles loading, empty, and cards grid display
- Create `ProjectModal` — popup showing full project details

---

## Step 1 — Create `src/components/StatsRow.jsx`

```jsx
// StatsRow — shows 4 summary cards at the top of the dashboard
// Props:
//   projects (array) — full list of ALL projects (not filtered)

export default function StatsRow({ projects }) {
  const counts = {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === "In Progress").length,
    completed: projects.filter((p) => p.status === "Completed").length,
    onHold: projects.filter((p) => p.status === "On Hold").length,
  };

  return (
    <div className="stats-row">
      <div className="stat-card">
        <span className="stat-num">{counts.total}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat-card">
        <span className="stat-num">{counts.inProgress}</span>
        <span className="stat-label">In Progress</span>
      </div>
      <div className="stat-card">
        <span className="stat-num">{counts.completed}</span>
        <span className="stat-label">Completed</span>
      </div>
      <div className="stat-card">
        <span className="stat-num">{counts.onHold}</span>
        <span className="stat-label">On Hold</span>
      </div>
    </div>
  );
}
```

**Important:** StatsRow receives the **full** `projects` array (not the filtered one) so the counts always show totals, not just what's currently visible.

---

## Step 2 — Create `src/components/ProjectGrid.jsx`

```jsx
// ProjectGrid — handles 3 display states: loading, empty, or cards grid
// Props:
//   loading     (bool)     — true while data is being fetched
//   projects    (array)    — filtered list of projects to display
//   onCardClick (function) — called with a project object when a card is clicked

import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ loading, projects, onCardClick }) {
  if (loading) {
    return <p className="loading">Loading projects…</p>;
  }

  if (projects.length === 0) {
    return <p className="empty">No projects match your search.</p>;
  }

  return (
    <div className="cards-grid">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} onClick={onCardClick} />
      ))}
    </div>
  );
}
```

**Understanding the 3 states:**
```
loading = true          → show "Loading projects…"
loading = false
  projects.length = 0   → show "No projects match your search."
  projects.length > 0   → show the cards grid
```

**Why `key={p.id}`?**
When rendering a list with `.map()`, React needs a unique `key` on each item so it can track which items changed, were added, or removed efficiently.

---

## Step 3 — Create `src/components/ProjectModal.jsx`

```jsx
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
```

**Key concept — Early Return:**
```jsx
if (!project) return null;
```
When `project` is `null` (nothing selected), the component returns nothing — the modal is completely invisible.
When `project` has a value, the full modal renders.
This is the standard React pattern for showing/hiding modals.

**Edit and Delete buttons:**
- ✏️ Edit → calls `onEdit(project)` → App.jsx opens the form pre-filled with this project's data
- 🗑️ Delete → calls `onDelete(project.id)` → App.jsx removes this project from the list

---

## Definition of Done
- [ ] `src/components/StatsRow.jsx` created
- [ ] `src/components/ProjectGrid.jsx` created
- [ ] `src/components/ProjectModal.jsx` created
- [ ] No import errors in the terminal
