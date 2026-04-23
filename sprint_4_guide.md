# Sprint 4 — FilterBar & ProjectCard Components

**Goal:** Build the search bar with filter tabs and the individual project card.

---

## What You Will Do
- Create `FilterBar` — search input + status filter tab buttons
- Create `ProjectCard` — a clickable card showing one project's details

---

## Step 1 — Create `src/components/FilterBar.jsx`

```jsx
// FilterBar — search input + status filter tab buttons
// Props:
//   search   (string)   — current text in the search box
//   onSearch (function) — called every time the user types
//   filter   (string)   — currently active tab e.g. "All"
//   onFilter (function) — called when a tab button is clicked

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

**Understanding each part:**

`STATUSES` array — defined outside the component so it is created only once, not on every render:
```js
const STATUSES = ["All", "In Progress", "Completed", "On Hold"];
```

Controlled input — React controls the value, not the browser:
```jsx
<input value={search} onChange={(e) => onSearch(e.target.value)} />
```
Every keystroke → calls `onSearch` → updates state in App.jsx → React re-renders with new value.

Active tab highlight — adds `active` CSS class only to the selected tab:
```jsx
className={filter === s ? "filter-tab active" : "filter-tab"}
```

This component has **no state of its own** — it only receives values and fires callbacks up to App.jsx.

---

## Step 2 — Create `src/components/ProjectCard.jsx`

```jsx
// ProjectCard — displays one project as a clickable card
// Props:
//   project (object)   — project data (name, status, manager, deadline, description)
//   onClick (function) — called with the project object when card is clicked

import StatusBadge from "./StatusBadge";

export default function ProjectCard({ project, onClick }) {
  return (
    <div className="project-card" onClick={() => onClick(project)}>

      {/* Top row: status badge + deadline */}
      <div className="card-header">
        <StatusBadge status={project.status} />
        <span className="deadline">📅 {project.deadline}</span>
      </div>

      {/* Project info */}
      <h3 className="card-title">{project.name}</h3>
      <p className="card-manager">👤 {project.manager}</p>
      <p className="card-desc">{project.description}</p>

    </div>
  );
}
```

**Understanding each part:**

The whole card is clickable and sends the project up to App.jsx:
```jsx
<div onClick={() => onClick(project)}>
```
When clicked → calls `onClick(project)` → App.jsx receives the full project object → opens the modal.

Uses `StatusBadge` instead of repeating badge code:
```jsx
import StatusBadge from "./StatusBadge";
<StatusBadge status={project.status} />
```

---

## Key Concept — Props Flow

```
App.jsx
  │
  │  passes down: project={p}  onClick={setSelected}
  ▼
ProjectCard
  │
  │  user clicks card
  │  calls: onClick(project)   ← sends project object UP to App
  ▼
App.jsx receives it → setSelected(project) → modal opens
```

Data goes **down** as props.
Events go **up** as function calls.
This is the core React pattern.

---

## Definition of Done
- [ ] `src/components/FilterBar.jsx` created
- [ ] `src/components/ProjectCard.jsx` created
- [ ] Both files import correctly with no errors
