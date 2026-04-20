# Sprint 3 — ProjectModal & App.jsx (Main Dashboard)

**Assignee:** Team Member 3  
**Depends on:** Sprint 1 & Sprint 2 complete  
**Goal:** Build the modal popup and wire all components together in App.jsx.

---

## Tasks

### 1. Create `src/components/ProjectModal.jsx`

This component shows a popup with full project details when a card is clicked.

```jsx
export default function ProjectModal({ project, onClose }) {
  // If no project is selected, render nothing
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
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
```

**What each part does:**
- `if (!project) return null` — when nothing is selected, the modal is invisible. This is the standard React way to show/hide things
- `onClick={onClose}` on the overlay — clicking the dark background closes the modal
- `e.stopPropagation()` on the inner modal — stops the click from reaching the overlay, so clicking inside the modal does NOT close it
- The badge class is built the same way as in ProjectCard: `"badge badge-" + status`

---

### 2. Replace `src/App.jsx`

App.jsx is the main component. It holds all the state and connects every other component.

```jsx
import { useState, useEffect } from "react";
import { fetchProjects } from "./data/mockData";
import FilterBar from "./components/FilterBar";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import "./App.css";

export default function App() {
  // State: list of all projects (starts empty)
  const [projects, setProjects] = useState([]);
  // State: true while data is loading
  const [loading, setLoading] = useState(true);
  // State: current text in the search box
  const [search, setSearch] = useState("");
  // State: which filter tab is active
  const [filter, setFilter] = useState("All");
  // State: which project card was clicked (null = modal closed)
  const [selected, setSelected] = useState(null);

  // Fetch projects once when the page loads
  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  // Filter the projects list based on search text and active filter tab
  const filtered = projects.filter((p) => {
    const matchesFilter = filter === "All" || p.status === filter;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.manager.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="dashboard">

      <header className="dash-header">
        <h1>Project Dashboard</h1>
        <p>Track and manage all internal projects</p>
      </header>

      {/* Stats row — counts projects by status */}
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-num">{projects.length}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{projects.filter(p => p.status === "In Progress").length}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{projects.filter(p => p.status === "Completed").length}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{projects.filter(p => p.status === "On Hold").length}</span>
          <span className="stat-label">On Hold</span>
        </div>
      </div>

      {/* Search box and filter tabs */}
      <FilterBar
        search={search}
        onSearch={setSearch}
        filter={filter}
        onFilter={setFilter}
      />

      {/* Show spinner while loading, empty message if no results, otherwise show cards */}
      {loading ? (
        <p className="loading">Loading projects…</p>
      ) : filtered.length === 0 ? (
        <p className="empty">No projects match your search.</p>
      ) : (
        <div className="cards-grid">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} onClick={setSelected} />
          ))}
        </div>
      )}

      {/* Modal — only visible when a card is clicked */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />

    </div>
  );
}
```

**State explained simply:**

| State | Starts as | What it stores |
|-------|-----------|----------------|
| `projects` | `[]` | All 4 projects from the mock API |
| `loading` | `true` | Becomes `false` once data arrives |
| `search` | `""` | Whatever the user types in the search box |
| `filter` | `"All"` | Which filter button is active |
| `selected` | `null` | The project to show in the modal (`null` = closed) |

**How data flows:**
- App.jsx fetches data → stores in `projects`
- App.jsx passes `search` and `filter` down to FilterBar as props
- FilterBar calls `onSearch` / `onFilter` when user types or clicks → updates state in App.jsx
- Updated state causes App.jsx to re-render → `filtered` list recalculates automatically
- Clicking a card calls `setSelected(project)` → modal opens with that project's data

---

## Definition of Done
- [ ] `src/components/ProjectModal.jsx` created
- [ ] `src/App.jsx` replaced with the code above
- [ ] Clicking a card opens the modal
- [ ] Clicking the dark overlay or ✕ closes the modal
- [ ] Search and filter tabs work correctly
- [ ] Hand off: notify Sprint 4 assignee that logic is complete
