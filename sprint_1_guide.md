# Sprint 1 — Project Setup & Mock Data

**Assignee:** Team Member 1  
**Goal:** Bootstrap the Vite + React project and create the mock data layer.

---

## Tasks

### 1. Environment Check

Run in terminal:
```bash
node -v
npm -v
```
Requires Node 18+. Download from https://nodejs.org if missing.

---

### 2. Scaffold the Project

```bash
npm create vite@latest demo-application -- --template react
cd demo-application
npm install
npm run dev
```

Verify the default Vite starter loads at `http://localhost:5173`.

---

### 3. Create Folder Structure

```bash
mkdir src/data
mkdir src/components
```

Final `src/` layout:
```
src/
├── components/     ← Sprint 2 & 3 will populate this
├── data/
│   └── mockData.js ← you create this now
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

### 4. Create `src/data/mockData.js`

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

**Key concepts:**
- `export const` — makes data importable in other files
- `fetchProjects` returns a `Promise` with a 700ms delay to simulate a real API call
- `setTimeout(..., 700)` — lets you see the loading spinner before data appears

---

## Definition of Done
- [ ] `npm run dev` starts without errors
- [ ] `src/data/mockData.js` exists and exports `mockProjects` and `fetchProjects`
- [ ] `src/components/` folder exists (empty is fine)
- [ ] Hand off: share the repo/branch with Sprint 2 assignee
