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

Each project has 5 fields: `id`, `name`, `manager`, `status`, `deadline`, and `description`.

```js
export const mockProjects = [
  {
    id: 1,
    name: "HR Platform Migration",
    manager: "Ranjat Srivastava",
    status: "In Progress",
    deadline: "2026-06-15",
    description: "Migrating the legacy HR platform to a new cloud-native architecture."
  },
  {
    id: 2,
    name: "Q2 Marketing Campaign Analytics",
    manager: "Priya Sharma",
    status: "Completed",
    deadline: "2026-04-30",
    description: "Analyze the performance of all digital marketing campaigns from the second quarter."
  },
  {
    id: 3,
    name: "Customer Support AI Chatbot",
    manager: "Sushant Mishra",
    status: "On Hold",
    deadline: "2026-09-01",
    description: "Develop a new AI-powered chatbot to handle initial customer support queries."
  },
  {
    id: 4,
    name: "Internal DevOps Toolchain Upgrade",
    manager: "Ankit Verma",
    status: "In Progress",
    deadline: "2026-07-20",
    description: "Upgrade CI/CD pipelines and containerize all internal services using Docker and Kubernetes."
  }
];

export const fetchProjects = () =>
  new Promise((resolve) => setTimeout(() => resolve(mockProjects), 700));
```

**Key concepts:**
- `export const` — makes the variable available to import in other files
- `fetchProjects` returns a `Promise` — this is how real API calls work too
- `setTimeout(..., 700)` — waits 700ms before returning data, so you can see the loading spinner

---

## Definition of Done
- [ ] `npm run dev` starts without errors
- [ ] `src/data/mockData.js` exists and exports `mockProjects` and `fetchProjects`
- [ ] `src/components/` folder exists (empty is fine)
- [ ] Hand off: share the repo/branch with Sprint 2 assignee
