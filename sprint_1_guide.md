# Sprint 1 — Project Setup & Folder Structure

**Goal:** Install the tools, create the project, and set up the folder structure.

---

## What You Will Do
- Install Node.js and npm
- Create a new React project using Vite
- Set up the correct folder structure for the app

---

## Step 1 — Check Your Tools

Open a terminal and run:
```bash
node -v
npm -v
```

You need **Node 18 or higher**. If not installed, download from https://nodejs.org (choose LTS version).

---

## Step 2 — Create the Project

Run these commands one by one:
```bash
npm create vite@latest demo-application -- --template react
cd demo-application
npm install
npm run dev
```

**What each command does:**
- `npm create vite@latest` — creates a new project using Vite (a fast build tool)
- `--template react` — sets it up as a React project
- `npm install` — downloads all required packages
- `npm run dev` — starts the app at `http://localhost:5173`

Open `http://localhost:5173` in your browser — you should see the default Vite starter page. ✅

---

## Step 3 — Create Folders

Inside the `src/` folder, create two new folders:
```bash
mkdir src/data
mkdir src/components
```

---

## Step 4 — Final Folder Structure

After this sprint, your `src/` should look like this:
```
src/
├── components/       ← empty for now, components go here from Sprint 2 onwards
├── data/             ← empty for now, mock data goes here in Sprint 2
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
App (the whole page)
 ├── Header
 ├── StatsRow
 ├── FilterBar
 └── ProjectGrid
      └── ProjectCard (one per project)
```

Each component is just a JavaScript function that returns HTML-like code called **JSX**.

---

## Definition of Done
- [ ] `npm run dev` starts without errors
- [ ] Browser shows the Vite starter page at `http://localhost:5173`
- [ ] `src/components/` folder exists
- [ ] `src/data/` folder exists
