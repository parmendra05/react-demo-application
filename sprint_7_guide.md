# Sprint 7 — ProjectForm Component (Add & Edit)

**Goal:** Build the form modal that handles both adding a new project and editing an existing one.

---

## What You Will Do
- Create `ProjectForm` — a single form component used for both Add and Edit
- Understand how one component can serve two different purposes

---

## Step 1 — Create `src/components/ProjectForm.jsx`

```jsx
// ProjectForm — form modal for adding or editing a project
// Props:
//   initial  (object|null) — project to edit (pre-fills the form), null = add mode
//   onSave   (function)    — called with form data when user submits
//   onCancel (function)    — called when user cancels, closes the form
//   projects (array)       — full project list, used to get existing manager names

import { useState } from "react";
import ModalOverlay from "./ModalOverlay";
import ManagerSelect from "./ManagerSelect";
import DeadlinePicker from "./DeadlinePicker";

const STATUSES = ["In Progress", "Completed", "On Hold"];

export default function ProjectForm({ initial, onSave, onCancel, projects }) {
  const existingManagers = [...new Set(projects.map((p) => p.manager))];

  const [form, setForm] = useState(() => {
    if (initial) return initial;
    return { name: "", manager: existingManagers[0] ?? "", status: "In Progress", deadline: "", description: "" };
  });
  const [isNewManager, setIsNewManager] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleManagerChange(value) {
    setForm((prev) => ({ ...prev, manager: value }));
  }

  function handleToggleNewManager() {
    setIsNewManager((prev) => {
      if (prev) setForm((f) => ({ ...f, manager: existingManagers[0] ?? "" }));
      else setForm((f) => ({ ...f, manager: "" }));
      return !prev;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.manager.trim() || !form.deadline) return;
    onSave(form);
  }

  return (
    <ModalOverlay onClose={onCancel} className="form-modal">
      <button className="modal-close" onClick={onCancel}>✕</button>
      <h2>{initial ? "Edit Project" : "Add New Project"}</h2>

      <form className="project-form" onSubmit={handleSubmit}>

        <label>Project Name
          <input name="name" value={form.name} onChange={handleChange} placeholder="Enter project name" required />
        </label>

        <label>Manager
          <ManagerSelect
            managers={existingManagers}
            value={form.manager}
            onChange={handleManagerChange}
            isNew={isNewManager}
            onToggleNew={handleToggleNewManager}
          />
        </label>

        <label>Status
          <select name="status" value={form.status} onChange={handleChange}>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>

        <label>Deadline
          <DeadlinePicker
            value={form.deadline}
            onChange={(date) => setForm((prev) => ({ ...prev, deadline: date }))}
          />
        </label>

        <label>Description
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Enter project description" rows={3} />
        </label>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn-primary">{initial ? "Save Changes" : "Add Project"}</button>
        </div>

      </form>
    </ModalOverlay>
  );
}
```

---

## Understanding the Code

**Add mode vs Edit mode — one form, two purposes:**

| | Add mode | Edit mode |
|---|---|---|
| `initial` prop | `null` | project object |
| Form starts | empty | pre-filled with project data |
| Submit button | "Add Project" | "Save Changes" |
| `onSave` called with | new project data | updated project data |

```jsx
// In App.jsx — how the form is opened:
// Add mode:
setFormProject({})           // empty object → initial is falsy → add mode

// Edit mode:
setFormProject(project)      // real project → initial has data → edit mode
```

**`useState` with a function (lazy initializer):**
```jsx
const [form, setForm] = useState(() => {
  if (initial) return initial;       // edit mode: start with existing data
  return { name: "", manager: ... }; // add mode: start empty
});
```
The function inside `useState(() => {...})` runs only once on first render — this is called a **lazy initializer**.

**`handleChange` — one function for all text inputs:**
```jsx
function handleChange(e) {
  setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
}
```
- `e.target.name` — the `name` attribute of the input that changed (e.g. `"name"`, `"description"`)
- `[e.target.name]` — computed property key, dynamically sets the right field
- `...prev` — spread operator, copies all existing form fields first, then overwrites just the changed one

**`e.preventDefault()` on form submit:**
```jsx
function handleSubmit(e) {
  e.preventDefault(); // stops the browser from refreshing the page
  onSave(form);
}
```
By default, submitting an HTML form refreshes the page. `preventDefault()` stops that so React can handle it.

**Getting unique manager names:**
```jsx
const existingManagers = [...new Set(projects.map((p) => p.manager))];
```
- `.map((p) => p.manager)` — extracts just the manager name from each project
- `new Set(...)` — removes duplicates (a Set can only hold unique values)
- `[...new Set(...)]` — converts the Set back to a regular array

---

## Definition of Done
- [ ] `src/components/ProjectForm.jsx` created
- [ ] Form opens in add mode (empty) when `+ Add Project` is clicked
- [ ] Form opens in edit mode (pre-filled) when ✏️ Edit is clicked
- [ ] No errors in the terminal
