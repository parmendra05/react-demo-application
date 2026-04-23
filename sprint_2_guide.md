# Sprint 2 — Mock Data & Fake API

**Goal:** Create the data layer that the whole app will use.

---

## What You Will Do
- Create the project data as a JavaScript array
- Create a fake API function that simulates loading data from a server

---

## What is Mock Data?

In a real app, data comes from a server (API).
Since we have no server yet, we create a JavaScript file that **pretends** to be an API.
This is called **mock data**.

The pattern is identical to a real API call — so when you connect a real backend later, almost nothing changes.

---

## Step 1 — Create `src/data/mockData.js`

Create a new file at `src/data/mockData.js` and paste this code:

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

---

## Understanding the Code

**The data array:**
```js
export const mockProjects = [ ... ];
```
- `export` — makes it available to import in other files
- Each project is an object `{ }` with 6 fields: `id`, `name`, `manager`, `status`, `deadline`, `description`
- `id` is a unique number — React uses this to track each item in a list

**The fake API function:**
```js
export const fetchProjects = () =>
  new Promise((resolve) => setTimeout(() => resolve(mockProjects), 700));
```
- `fetchProjects` is a function that returns a **Promise**
- A Promise represents a value that will arrive in the future (like waiting for a server response)
- `setTimeout(..., 700)` waits 700 milliseconds before returning the data
- This delay lets you see the "Loading..." message — just like a real network request

**How to use it in another file:**
```js
import { fetchProjects } from "./data/mockData";

fetchProjects().then((data) => {
  console.log(data); // prints the 4 projects after 700ms
});
```

---

## Key Concept — What is a Promise?

Think of a Promise like ordering food at a restaurant:
1. You place the order (call `fetchProjects()`)
2. You get a ticket/promise that food is coming
3. When food is ready, `.then()` is called with the result

```js
fetchProjects()           // 1. place the order
  .then((data) => {       // 3. food arrived — data = the projects array
    setProjects(data);
  });
```

---

## Definition of Done
- [ ] `src/data/mockData.js` file created
- [ ] File exports both `mockProjects` and `fetchProjects`
- [ ] No errors in the terminal
