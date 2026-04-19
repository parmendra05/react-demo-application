# Sprint 3 — ProjectModal & App.jsx (Main Dashboard)

**Assignee:** Team Member 3  
**Depends on:** Sprint 1 & Sprint 2 complete  
**Goal:** Build the modal component and wire everything together in App.jsx.

---

## Tasks

### 1. Create `src/components/ProjectModal.jsx`

```jsx
const TASK_CLASS = {
  Done: "task-done",
  "In Progress": "task-progress",
  Pending: "task-pending",
};

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-header">
          <h2>{project.name}</h2>
          <span className={`badge badge-lg ${
            project.status === "Completed" ? "badge-completed" :
            project.status === "On Hold" ? "badge-hold" : "badge-progress"
          }`}>
            {project.status}
          </span>
        </div>
        <p className="modal-desc">{project.description}</p>
        <div className="modal-meta">
          <div><span className="meta-label">Manager</span><span>{project.manager}</span></div>
          <div>
            <span className="meta-label">Deadline</span>
            <span>{new Date(project.deadline).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric"
            })}</span>
          </div>
          <div><span className="meta-label">Progress</span><span>{project.progress}%</span></div>
        </div>
        <div className="modal-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${project.progress}%` }} />
          </div>
        </div>
        <h4 className="tasks-heading">Tasks ({project.tasks.length})</h4>
        <ul className="task-list">
          {project.tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span className={`task-dot ${TASK_CLASS[task.status]}`} />
              <span className="task-title">{task.title}</span>
              <span className={`task-badge ${TASK_CLASS[task.status]}`}>{task.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

**Key concepts:**
- `if (!project) return null` — standard React pattern: render nothing when modal is closed
- Click-outside-to-close: overlay has `onClick={onClose}`, inner modal has `e.stopPropagation()` to prevent the click bubbling up to the overlay
- `toLocaleDateString("en-US", {...})` formats `"2026-06-15"` → `"June 15, 2026"`
- `project.tasks.length` — dynamically shows task count in the heading

---

### 2. Replace `src/App.jsx`

```jsx
import { useState, useEffect } from "react";
import { fetchProjects } from "./data/mockData";
import FilterBar from "./components/FilterBar";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import "./App.css";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const filtered = projects.filter((p) => {
    const matchesFilter = filter === "All" || p.status === filter;
    const q = search.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(q) ||
      p.manager.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const counts = {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === "In Progress").length,
    completed: projects.filter((p) => p.status === "Completed").length,
    onHold: projects.filter((p) => p.status === "On Hold").length,
  };

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div>
          <h1 className="dash-title">Project Dashboard</h1>
          <p className="dash-sub">Track and manage all internal projects</p>
        </div>
      </header>

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-num">{counts.total}</span>
          <span className="stat-label">Total Projects</span>
        </div>
        <div className="stat-card progress-stat">
          <span className="stat-num">{counts.inProgress}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card completed-stat">
          <span className="stat-num">{counts.completed}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card hold-stat">
          <span className="stat-num">{counts.onHold}</span>
          <span className="stat-label">On Hold</span>
        </div>
      </div>

      <FilterBar
        search={search}
        onSearch={setSearch}
        filter={filter}
        onFilter={setFilter}
      />

      {loading ? (
        <div className="loading">
          <div className="spinner" />
          <p>Loading projects…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty">No projects match your search.</div>
      ) : (
        <div className="cards-grid">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} onClick={setSelected} />
          ))}
        </div>
      )}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
```

**State reference:**

| State | Initial Value | Purpose |
|-------|--------------|---------|
| `projects` | `[]` | All projects from mock API |
| `loading` | `true` | Shows spinner while fetching |
| `search` | `""` | Current search input value |
| `filter` | `"All"` | Active status tab |
| `selected` | `null` | Project shown in modal (`null` = closed) |

**Key concepts:**
- `useEffect` with `[]` — runs once on mount to fetch data
- Filtering runs on every render automatically — no button press needed
- `setSearch` and `setFilter` are passed directly as `onSearch`/`onFilter` props — this is called **lifting state up**
- Three-way conditional render: loading → empty → grid

---

## Definition of Done
- [ ] `src/components/ProjectModal.jsx` created
- [ ] `src/App.jsx` replaced with full dashboard logic
- [ ] Clicking a card opens the modal; clicking overlay or ✕ closes it
- [ ] Search and filter tabs update the card grid correctly
- [ ] Hand off: notify Sprint 4 assignee that logic is complete
