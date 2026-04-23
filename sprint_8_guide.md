# Sprint 8 — App.jsx (Wiring Everything Together)

**Goal:** Build the main App.jsx that holds all state and connects every component together with full CRUD functionality.

---

## What You Will Do
- Write the complete `App.jsx`
- Understand how all state variables work together
- Wire up Add, Edit, and Delete functionality

---

## Step 1 — Replace `src/App.jsx`

```jsx
import { useState, useEffect } from "react";
import { fetchProjects } from "./data/mockData";
import FilterBar from "./components/FilterBar";
import StatsRow from "./components/StatsRow";
import ProjectGrid from "./components/ProjectGrid";
import ProjectModal from "./components/ProjectModal";
import ProjectForm from "./components/ProjectForm";
import "./App.css";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [formProject, setFormProject] = useState(null);

  // Fetch projects once when the page loads
  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  function handleAdd(formData) {
    setProjects((prev) => [...prev, { ...formData, id: Date.now() }]);
    setFormProject(null);
  }

  function handleEdit(formData) {
    setProjects((prev) => prev.map((p) => (p.id === formData.id ? formData : p)));
    setFormProject(null);
    setSelected(null);
  }

  function handleDelete(id) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setSelected(null);
  }

  // Filter projects by active tab and search text
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
        <div>
          <h1>Project Dashboard</h1>
          <p>Track and manage all internal projects</p>
        </div>
        <button className="btn-primary" onClick={() => setFormProject({})}>+ Add Project</button>
      </header>

      {/* Summary counts */}
      <StatsRow projects={projects} />

      {/* Search + filter tabs */}
      <FilterBar search={search} onSearch={setSearch} filter={filter} onFilter={setFilter} />

      {/* Cards grid (handles loading + empty states too) */}
      <ProjectGrid loading={loading} projects={filtered} onCardClick={setSelected} />

      {/* Detail popup */}
      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
        onEdit={(p) => { setSelected(null); setFormProject(p); }}
        onDelete={handleDelete}
      />

      {/* Add / Edit form popup */}
      {formProject !== null && (
        <ProjectForm
          initial={formProject.id ? formProject : null}
          onSave={formProject.id ? handleEdit : handleAdd}
          onCancel={() => setFormProject(null)}
          projects={projects}
        />
      )}

    </div>
  );
}
```

---

## Understanding All 6 State Variables

| State | Starts as | What it stores |
|-------|-----------|----------------|
| `projects` | `[]` | All projects from the mock API |
| `loading` | `true` | Becomes `false` once data arrives |
| `search` | `""` | Text the user types in the search box |
| `filter` | `"All"` | Which filter tab is active |
| `selected` | `null` | Project to show in detail modal (`null` = closed) |
| `formProject` | `null` | Controls the form: `null` = closed, `{}` = add mode, project object = edit mode |

---

## Understanding the 3 CRUD Functions

**handleAdd — creates a new project:**
```js
function handleAdd(formData) {
  setProjects((prev) => [...prev, { ...formData, id: Date.now() }]);
  setFormProject(null); // close the form
}
```
- `Date.now()` generates a unique number (milliseconds since 1970) as the new project's `id`
- `[...prev, newProject]` — spread the existing array, then add the new project at the end

**handleEdit — updates an existing project:**
```js
function handleEdit(formData) {
  setProjects((prev) => prev.map((p) => (p.id === formData.id ? formData : p)));
  setFormProject(null);
  setSelected(null);
}
```
- `.map()` goes through every project
- If `p.id === formData.id` → replace with the updated `formData`
- Otherwise → keep the original `p`
- Result: a new array with only the edited project replaced

**handleDelete — removes a project:**
```js
function handleDelete(id) {
  setProjects((prev) => prev.filter((p) => p.id !== id));
  setSelected(null); // close the modal
}
```
- `.filter()` keeps only projects where `p.id !== id`
- The project with the matching `id` is excluded → effectively deleted

---

## Understanding the Form Modal Logic

```jsx
{formProject !== null && (
  <ProjectForm
    initial={formProject.id ? formProject : null}
    onSave={formProject.id ? handleEdit : handleAdd}
    ...
  />
)}
```

| `formProject` value | Form visible? | Mode | `initial` | `onSave` |
|---|---|---|---|---|
| `null` | No | — | — | — |
| `{}` (empty object) | Yes | Add | `null` | `handleAdd` |
| `{ id: 1, name: ... }` | Yes | Edit | project object | `handleEdit` |

`formProject.id` is the key check:
- Empty object `{}` has no `id` → add mode
- Real project has an `id` → edit mode

---

## Complete Data Flow Diagram

```
mockData.js
    │  fetchProjects() on mount
    ▼
App.jsx  ← owns: projects, loading, search, filter, selected, formProject
    │
    ├──▶ StatsRow        receives: projects (full list)
    │
    ├──▶ FilterBar       receives: search, filter
    │                    fires: onSearch, onFilter → updates state in App
    │
    ├──▶ ProjectGrid     receives: loading, filtered projects
    │         └──▶ ProjectCard  fires: onClick → setSelected(project)
    │
    ├──▶ ProjectModal    receives: selected project
    │                    fires: onEdit → setFormProject(project)
    │                    fires: onDelete → handleDelete(id)
    │
    └──▶ ProjectForm     receives: initial, projects
                         fires: onSave → handleAdd or handleEdit
                         fires: onCancel → setFormProject(null)
```

---

## Definition of Done
- [ ] `src/App.jsx` replaced with the code above
- [ ] `+ Add Project` button opens the form
- [ ] Submitting the form adds a new card to the grid
- [ ] Clicking a card opens the detail modal
- [ ] ✏️ Edit opens the form pre-filled with project data
- [ ] 🗑️ Delete removes the card from the grid
- [ ] Search and filter tabs still work correctly
