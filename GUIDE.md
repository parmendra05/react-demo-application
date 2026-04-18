# Project Dashboard — Complete Build Guide for New Members

This guide walks you through building the **Project Dashboard** from scratch, step by step.  
No prior React experience needed — every concept is explained as it appears.

---

## Table of Contents

1. [What We Are Building](#1-what-we-are-building)
2. [Prerequisites & Tools](#2-prerequisites--tools)
3. [Project Setup](#3-project-setup)
4. [Folder Structure](#4-folder-structure)
5. [React Concepts You Will Use](#5-react-concepts-you-will-use)
6. [Step 1 — Mock Data & Fake API](#6-step-1--mock-data--fake-api)
7. [Step 2 — FilterBar Component](#7-step-2--filterbar-component)
8. [Step 3 — ProjectCard Component](#8-step-3--projectcard-component)
9. [Step 4 — ProjectModal Component](#9-step-4--projectmodal-component)
10. [Step 5 — App.jsx (Main Dashboard)](#10-step-5--appjsx-main-dashboard)
11. [Step 6 — Styling with CSS](#11-step-6--styling-with-css)
12. [How Everything Connects](#12-how-everything-connects)
13. [Run the Project](#13-run-the-project)

---

## 1. What We Are Building

A **Project Dashboard** web app where employees and managers can:

- See a summary of all internal projects (total, in-progress, completed, on-hold)
- Search projects by name or manager
- Filter projects by status using tab buttons
- Click any project card to open a detail modal showing tasks and metadata

**Tech stack:** React 19, Vite, plain CSS (no external UI libraries)

---

## 2. Prerequisites & Tools

Before starting, make sure you have these installed:

| Tool | Version | Why |
|------|---------|-----|
| Node.js | 18 or higher | Runs JavaScript outside the browser |
| npm | comes with Node | Installs packages |
| VS Code | any recent | Code editor |

Check your versions by running in a terminal:

```bash
node -v
npm -v
```

If Node is not installed, download it from https://nodejs.org (choose the LTS version).

---

## 3. Project Setup

Open a terminal, navigate to where you want the project, and run:

```bash
npm create vite@latest demo-application -- --template react
cd demo-application
npm install
npm run dev
```

**What each command does:**
- `npm create vite@latest` — scaffolds a new project using Vite (a fast build tool)
- `--template react` — tells Vite to set up a React project
- `npm install` — downloads all dependencies listed in `package.json`
- `npm run dev` — starts the local development server at `http://localhost:5173`

You should see the default Vite + React starter page in your browser.

---

## 4. Folder Structure

After setup, your `src/` folder will look like the default Vite template.  
You need to **create two new folders** inside `src/`:

```
src/
├── components/        ← create this folder
│   ├── FilterBar.jsx
│   ├── ProjectCard.jsx
│   └── ProjectModal.jsx
├── data/              ← create this folder
│   └── mockData.js
├── App.jsx            ← already exists, you will replace its content
├── App.css            ← already exists, you will replace its content
├── index.css          ← already exists, small edit needed
└── main.jsx           ← already exists, no changes needed
```

Create the folders manually in VS Code (right-click `src` → New Folder) or via terminal:

```bash
mkdir src/data
mkdir src/components
```

---

## 5. React Concepts You Will Use

Before writing code, here is a quick reference for every React concept used in this project.

### Components
A component is a JavaScript function that returns HTML-like syntax called JSX.

```jsx
function Greeting() {
  return <h1>Hello, World!</h1>;
}
```

### Props
Props are how a parent component passes data down to a child component.

```jsx
// Parent passes data
<ProjectCard project={projectObject} onClick={handleClick} />

// Child receives it
function ProjectCard({ project, onClick }) {
  return <h3>{project.name}</h3>;
}
```

### useState
useState lets a component remember a value and re-render when it changes.

```jsx
const [search, setSearch] = useState("");
// search = current value
// setSearch = function to update it
```

### useEffect
useEffect runs code after the component renders — used here to fetch data on page load.

```jsx
useEffect(() => {
  fetchProjects().then((data) => setProjects(data));
}, []); // the [] means "run only once on first load"
```

### Conditional Rendering
Show different UI based on a condition:

```jsx
{loading ? <Spinner /> : <ProjectList />}
```

### List Rendering
Render a list of items using `.map()`. Every item needs a unique `key` prop:

```jsx
{projects.map((p) => (
  <ProjectCard key={p.id} project={p} />
))}
```

---

## 6. Step 1 — Mock Data & Fake API

**File to create:** `src/data/mockData.js`

Since we have no real backend, we create a JavaScript file that holds our data and exports a function that pretends to be an API call (using `setTimeout` to simulate network delay).

```js
export const mockProjects = [
  {
    id: 1,
    name: "HR Platform Migration",
    manager: "Ranjat Srivastava",
    status: "In Progress",
    progress: 62,
    deadline: "2026-06-15",
    description: "Migrating the legacy HR platform to a new cloud-native architecture.",
    tasks: [
      { id: 1, title: "Audit existing HR modules", status: "Done" },
      { id: 2, title: "Design cloud architecture", status: "Done" },
      { id: 3, title: "Migrate employee data", status: "In Progress" },
      { id: 4, title: "UAT & QA testing", status: "Pending" },
      { id: 5, title: "Go-live & monitoring", status: "Pending" },
    ],
  },
  {
    id: 2,
    name: "Q2 Marketing Campaign Analytics",
    manager: "Priya Sharma",
    status: "Completed",
    progress: 100,
    deadline: "2026-04-30",
    description: "Analyze the performance of all digital marketing campaigns from the second quarter.",
    tasks: [
      { id: 1, title: "Collect campaign data", status: "Done" },
      { id: 2, title: "Build analytics dashboard", status: "Done" },
      { id: 3, title: "Generate Q2 report", status: "Done" },
      { id: 4, title: "Present findings to stakeholders", status: "Done" },
    ],
  },
  {
    id: 3,
    name: "Customer Support AI Chatbot",
    manager: "Sushant Mishra",
    status: "On Hold",
    progress: 35,
    deadline: "2026-09-01",
    description: "Develop a new AI-powered chatbot to handle initial customer support queries.",
    tasks: [
      { id: 1, title: "Define chatbot scope & intents", status: "Done" },
      { id: 2, title: "Train NLP model", status: "In Progress" },
      { id: 3, title: "Integrate with support ticketing", status: "Pending" },
      { id: 4, title: "Beta testing with support team", status: "Pending" },
    ],
  },
  {
    id: 4,
    name: "Internal DevOps Toolchain Upgrade",
    manager: "Ankit Verma",
    status: "In Progress",
    progress: 48,
    deadline: "2026-07-20",
    description: "Upgrade CI/CD pipelines and containerize all internal services using Docker and Kubernetes.",
    tasks: [
      { id: 1, title: "Evaluate current CI/CD setup", status: "Done" },
      { id: 2, title: "Dockerize microservices", status: "In Progress" },
      { id: 3, title: "Set up Kubernetes cluster", status: "In Progress" },
      { id: 4, title: "Migrate pipelines to new toolchain", status: "Pending" },
    ],
  },
  {
    id: 5,
    name: "Employee Wellness Portal",
    manager: "Neha Kapoor",
    status: "Completed",
    progress: 100,
    deadline: "2026-03-31",
    description: "Build a self-service portal for employees to access wellness resources and book sessions.",
    tasks: [
      { id: 1, title: "Gather requirements from HR", status: "Done" },
      { id: 2, title: "Design UI/UX", status: "Done" },
      { id: 3, title: "Develop portal", status: "Done" },
      { id: 4, title: "Launch & communicate to employees", status: "Done" },
    ],
  },
  {
    id: 6,
    name: "Finance Reporting Automation",
    manager: "Rahul Gupta",
    status: "On Hold",
    progress: 20,
    deadline: "2026-10-15",
    description: "Automate monthly and quarterly financial reports using Python scripts and Power BI.",
    tasks: [
      { id: 1, title: "Map existing report templates", status: "Done" },
      { id: 2, title: "Write data extraction scripts", status: "In Progress" },
      { id: 3, title: "Build Power BI dashboards", status: "Pending" },
      { id: 4, title: "Schedule automated runs", status: "Pending" },
    ],
  },
];

export const fetchProjects = () =>
  new Promise((resolve) => setTimeout(() => resolve(mockProjects), 700));
```

**Key concepts here:**
- `export const` — makes the variable available to import in other files
- `fetchProjects` returns a `Promise` — this is how real API calls work too, so the pattern is identical to using `fetch()`
- `setTimeout(..., 700)` — waits 700ms before resolving, simulating a real network request so you can see the loading spinner

---

## 7. Step 2 — FilterBar Component

**File to create:** `src/components/FilterBar.jsx`

This component renders a search input and four filter buttons (All, In Progress, Completed, On Hold).

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

**Concept breakdown:**

- `STATUSES` is defined outside the component because it never changes — no need to recreate it on every render
- `value={search}` + `onChange` makes this a **controlled input** — React owns the value, not the browser
- `onSearch(e.target.value)` calls the function passed down from App.jsx with the new typed value
- `` `filter-tab ${filter === s ? "active" : ""}` `` — dynamically adds the `active` CSS class to whichever button matches the current filter
- This component holds **no state of its own** — it only receives values and calls callbacks. This is called a "stateless" or "presentational" component

---

## 8. Step 3 — ProjectCard Component

**File to create:** `src/components/ProjectCard.jsx`

Displays a single project as a clickable card with status badge, deadline countdown, description, and progress bar.

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

**Concept breakdown:**

- `STATUS_CLASS` is a lookup object — instead of writing a long if/else chain, we use the status string as a key to get the right CSS class name
- **Deadline calculation:** `new Date(project.deadline) - new Date()` subtracts two Date objects, giving milliseconds. Dividing by `(1000 * 60 * 60 * 24)` converts to days
- `daysLeft < 0` means the deadline has passed → show "overdue" in red
- `daysLeft < 30` means deadline is within a month → show "soon" in amber
- `style={{ width: \`${project.progress}%\` }}` — inline style sets the progress bar fill width dynamically
- `onClick={() => onClick(project)}` — wraps the call in an arrow function so we can pass the `project` object as an argument up to the parent

---

## 9. Step 4 — ProjectModal Component

**File to create:** `src/components/ProjectModal.jsx`

A full-screen overlay that shows detailed project info and its task list when a card is clicked.

```jsx
const TASK_CLASS = {
  Done: "task-done",
  "In Progress": "task-progress",
  Pending: "task-pending"
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

**Concept breakdown:**

- `if (!project) return null` — when no project is selected, render nothing. This is the standard React pattern for conditional rendering of modals
- **Click-outside-to-close:** The overlay `div` has `onClick={onClose}`. The inner modal `div` has `onClick={(e) => e.stopPropagation()}` — this stops the click from "bubbling up" to the overlay, so clicking inside the modal does not close it
- `toLocaleDateString("en-US", {...})` — formats the ISO date string `"2026-06-15"` into a readable format like "June 15, 2026"
- `project.tasks.length` — dynamically shows the task count in the heading

---

## 10. Step 5 — App.jsx (Main Dashboard)

**File to modify:** `src/App.jsx` — replace all existing content with:

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

**Concept breakdown:**

**State variables and their roles:**

| State | Initial Value | Purpose |
|-------|--------------|---------|
| `projects` | `[]` | Holds all projects fetched from mock API |
| `loading` | `true` | Shows spinner while data is being fetched |
| `search` | `""` | Current text in the search input |
| `filter` | `"All"` | Currently active status filter tab |
| `selected` | `null` | The project object to show in the modal (null = modal closed) |

**The filtering logic:**
```js
const filtered = projects.filter((p) => {
  const matchesFilter = filter === "All" || p.status === filter;
  const matchesSearch = p.name.toLowerCase().includes(q) || p.manager.toLowerCase().includes(q);
  return matchesFilter && matchesSearch;
});
```
Both conditions must be true (`&&`) for a project to appear. This runs on every render automatically — no button press needed.

**Passing state down as props:**
- `search` and `filter` are passed to `FilterBar` as values
- `setSearch` and `setFilter` are passed as `onSearch` / `onFilter` callbacks
- When the user types or clicks a tab, FilterBar calls these functions, which updates state in App, which re-renders everything with the new filtered list — this is called **"lifting state up"**

**The three-way conditional render:**
```jsx
{loading ? <Spinner /> : filtered.length === 0 ? <Empty /> : <Grid />}
```
This is a nested ternary — first check if loading, then check if results are empty, otherwise show the grid.

---

## 11. Step 6 — Styling with CSS

**File to modify:** `src/App.css` — replace all existing content.

The project uses **CSS Custom Properties** (variables) defined in `:root` so colors can be changed in one place:

```css
:root {
  --bg: #f0f2f7;
  --surface: #ffffff;
  --accent: #4f46e5;
  --green: #16a34a;
  --amber: #d97706;
  --red: #dc2626;
  --blue: #2563eb;
  --radius: 12px;
}
```

Key layout techniques used:

**CSS Grid for the stats row** — 4 equal columns:
```css
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
```

**CSS Grid for the cards** — auto-fill columns, minimum 340px wide:
```css
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
}
```
`auto-fill` + `minmax` means the grid automatically decides how many columns fit — no media queries needed for the card grid.

**The loading spinner** — pure CSS animation:
```css
.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
```

**The modal overlay** — covers the full screen using `position: fixed` and `inset: 0`:
```css
.modal-overlay {
  position: fixed;
  inset: 0;               /* shorthand for top/right/bottom/left: 0 */
  background: rgba(0,0,0,.45);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

**Also update `src/index.css`** — find the `#root` block and replace it with:
```css
#root {
  width: 100%;
  min-height: 100svh;
}
```
The original Vite template sets a fixed width on `#root` which would break the dashboard layout.

---

## 12. How Everything Connects

Here is the complete data and event flow:

```
mockData.js
    │
    │  fetchProjects() called on mount
    ▼
App.jsx  ←── holds all state: projects, loading, search, filter, selected
    │
    ├──▶ FilterBar.jsx
    │       receives: search, filter (values)
    │       calls back: onSearch → setSearch, onFilter → setFilter
    │       effect: App re-renders → filtered list updates
    │
    ├──▶ ProjectCard.jsx  (rendered for each item in filtered[])
    │       receives: project (object)
    │       calls back: onClick → setSelected(project)
    │       effect: selected state is set → modal opens
    │
    └──▶ ProjectModal.jsx
            receives: project (selected or null)
            calls back: onClose → setSelected(null)
            effect: modal closes
```

**The golden rule of React data flow:**
- Data flows **down** via props (parent → child)
- Events flow **up** via callback functions (child → parent)
- State always lives in the **highest component** that needs it

---

## 13. Run the Project

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

**Other useful commands:**

```bash
npm run build    # creates a production-ready build in the /dist folder
npm run preview  # serves the production build locally to test it
npm run lint     # checks your code for errors using ESLint
```

**If you see a blank page**, open browser DevTools (F12) → Console tab and check for errors. Common issues:
- Wrong file path in an import (check spelling and capitalization)
- Missing `export default` on a component
- Forgot to create the `src/data/` or `src/components/` folders

---

*Guide version 1.0 — covers the complete Project Dashboard build.*
