# Sprint 2 — FilterBar & ProjectCard Components

**Assignee:** Team Member 2  
**Depends on:** Sprint 1 complete  
**Goal:** Build two simple presentational components — FilterBar and ProjectCard.

---

## Tasks

### 1. Create `src/components/FilterBar.jsx`

This component shows a search box and four filter buttons.

```jsx
const STATUSES = ["All", "In Progress", "Completed", "On Hold"];

export default function FilterBar({ search, onSearch, filter, onFilter }) {
  return (
    <div className="filter-bar">
      <input
        className="search-input"
        type="text"
        placeholder="Search projects or managers…"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="filter-tabs">
        {STATUSES.map((s) => (
          <button
            key={s}
            className={filter === s ? "filter-tab active" : "filter-tab"}
            onClick={() => onFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
```

**What each part does:**
- `STATUSES` — the list of filter button labels, defined once outside the component
- `value={search}` + `onChange` — keeps the input in sync with React state (called a controlled input)
- `filter === s ? "filter-tab active" : "filter-tab"` — adds the `active` class only to the currently selected button
- This component has **no state of its own** — it just receives values and calls functions passed from the parent

---

### 2. Create `src/components/ProjectCard.jsx`

This component displays one project as a clickable card.

```jsx
export default function ProjectCard({ project, onClick }) {
  return (
    <div className="project-card" onClick={() => onClick(project)}>
      <div className="card-header">
        <span className={"badge badge-" + project.status.toLowerCase().replace(" ", "-")}>
          {project.status}
        </span>
        <span className="deadline">📅 {project.deadline}</span>
      </div>
      <h3 className="card-title">{project.name}</h3>
      <p className="card-manager">👤 {project.manager}</p>
      <p className="card-desc">{project.description}</p>
    </div>
  );
}
```

**What each part does:**
- `onClick={() => onClick(project)}` — when the card is clicked, it sends the full project object up to the parent (App.jsx)
- `"badge badge-" + project.status.toLowerCase().replace(" ", "-")` — builds the CSS class name from the status string:
  - `"In Progress"` → `"badge badge-in-progress"`
  - `"Completed"` → `"badge badge-completed"`
  - `"On Hold"` → `"badge badge-on-hold"`
- `project.deadline` — displays the deadline date string directly from the data
- The card itself holds **no state** — it only displays what it receives via `project` prop

---

## Definition of Done
- [ ] `src/components/FilterBar.jsx` created
- [ ] `src/components/ProjectCard.jsx` created
- [ ] No console errors when files are saved
- [ ] Hand off: notify Sprint 3 assignee that both components are ready
