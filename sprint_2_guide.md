# Sprint 2 — FilterBar & ProjectCard Components

**Assignee:** Team Member 2  
**Depends on:** Sprint 1 complete (project scaffolded, `src/data/mockData.js` exists)  
**Goal:** Build the two presentational components — FilterBar and ProjectCard.

---

## Tasks

### 1. Create `src/components/FilterBar.jsx`

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
            className={`filter-tab ${filter === s ? "active" : ""}`}
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

**Key concepts:**
- `STATUSES` is defined outside the component — it never changes, no need to recreate on each render
- `value={search}` + `onChange` = controlled input (React owns the value, not the browser)
- Dynamic `active` class: `` `filter-tab ${filter === s ? "active" : ""}` ``
- This component holds **no state** — purely presentational, receives values and calls callbacks

---

### 2. Create `src/components/ProjectCard.jsx`

```jsx
const STATUS_CLASS = {
  "In Progress": "badge-progress",
  Completed: "badge-completed",
  "On Hold": "badge-hold",
};

export default function ProjectCard({ project, onClick }) {
  const daysLeft = Math.ceil(
    (new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="project-card" onClick={() => onClick(project)}>
      <div className="card-header">
        <span className={`badge ${STATUS_CLASS[project.status]}`}>
          {project.status}
        </span>
        <span className={`deadline ${daysLeft < 0 ? "overdue" : daysLeft < 30 ? "soon" : ""}`}>
          {daysLeft < 0 ? `${Math.abs(daysLeft)}d overdue` : `${daysLeft}d left`}
        </span>
      </div>
      <h3 className="card-title">{project.name}</h3>
      <p className="card-manager">👤 {project.manager}</p>
      <p className="card-desc">{project.description}</p>
      <div className="progress-wrap">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <span className="progress-label">{project.progress}%</span>
      </div>
      <button className="view-btn">View Details →</button>
    </div>
  );
}
```

**Key concepts:**
- `STATUS_CLASS` lookup object avoids long if/else chains — use the status string as a key to get the CSS class
- Deadline math: `new Date(deadline) - new Date()` → milliseconds → divide by `(1000 * 60 * 60 * 24)` → days
- `daysLeft < 0` → overdue (red), `daysLeft < 30` → soon (amber)
- `style={{ width: \`${project.progress}%\` }}` — inline style drives the progress bar fill width
- `onClick={() => onClick(project)}` — arrow function passes the full project object up to the parent

---

## Definition of Done
- [ ] `src/components/FilterBar.jsx` created with correct props interface
- [ ] `src/components/ProjectCard.jsx` created with deadline logic and progress bar
- [ ] No console errors when components are imported
- [ ] Hand off: notify Sprint 3 assignee that both components are ready
