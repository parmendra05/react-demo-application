# Sprint 1 — Project Setup & Folder Structure

**Goal:** Install all required tools, create both projects, and set up the correct folder structure.

---

## What You Will Do
- Verify Node.js, Java 17, and Maven are installed
- Create the React frontend project using Vite
- Create the Spring Boot backend project folder
- Set up the correct folder structure for both apps

---

## Step 1 — Check Your Tools

Open a terminal and run each command:

```bash
node -v        # must be 18 or higher
npm -v         # comes with Node
java -version  # must be 17
mvn -version   # must be 3.x
```

If Node is missing → download from https://nodejs.org (choose LTS)
If Java 17 is missing → download from https://adoptium.net

---

## Step 2 — Create the React Frontend

```bash
npm create vite@latest demo-application -- --template react
cd demo-application
npm install
npm run dev
```

Open `http://localhost:5173` — you should see the default Vite starter page. ✅

**What each command does:**
- `npm create vite@latest` — scaffolds a new React project using Vite
- `--template react` — sets it up as a React (JSX) project
- `npm install` — downloads all packages listed in `package.json`
- `npm run dev` — starts the dev server at `http://localhost:5173`

---

## Step 3 — Create Folders Inside React Project

```bash
mkdir src/components
mkdir src/api
```

- `src/components/` — all React UI components go here
- `src/api/` — all HTTP calls to the backend go here

> Note: There is no `src/data/` folder in this project. Data comes from the Spring Boot backend, not from a local file.

---

## Step 4 — Create the Spring Boot Backend Folder

The backend is a separate project in its own folder alongside the React app:

```
New folder/
├── demo-application/          ← React frontend (created above)
└── project-dashboard-api/     ← Spring Boot backend (created in Sprint 2)
```

---

## Step 5 — Final Frontend Folder Structure

After this sprint, `demo-application/src/` should look like:

```
src/
├── api/              ← HTTP calls to Spring Boot (populated in Sprint 2)
├── components/       ← React components (populated from Sprint 3 onwards)
├── App.jsx           ← already exists
├── App.css           ← already exists
├── index.css         ← already exists
└── main.jsx          ← already exists, never needs to change
```

---

## Key Concept — What is React?

React is a JavaScript library for building user interfaces.
Instead of writing one big HTML file, you break the UI into small reusable pieces called **components**.

```
App.jsx  (the whole page)
 ├── StatsRow
 ├── FilterBar
 ├── ProjectGrid
 │    └── ProjectCard
 ├── ProjectModal
 └── ProjectForm
```

Each component is a JavaScript function that returns HTML-like code called **JSX**.

---

## Key Concept — Two Applications, One System

This project has two separate applications that work together:

```
demo-application/        ← React (runs on port 5173)
      ↕  HTTP requests via Vite proxy
project-dashboard-api/   ← Spring Boot (runs on port 8080)
      ↕  SQL queries
      H2 in-memory database
```

React never talks to the database directly — it always goes through the Spring Boot API.

---

## Definition of Done
- [ ] `node -v` shows 18 or higher
- [ ] `java -version` shows 17
- [ ] `mvn -version` shows 3.x
- [ ] `npm run dev` starts without errors
- [ ] Browser shows Vite starter page at `http://localhost:5173`
- [ ] `src/components/` folder exists
- [ ] `src/api/` folder exists
