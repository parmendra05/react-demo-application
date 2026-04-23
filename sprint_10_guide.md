# Sprint 10 — Final Verification & Complete App Reference

**Goal:** Verify the complete app works end-to-end, understand the full component tree, and have a reference for troubleshooting.

---

## What You Will Do
- Run the complete app and verify every feature works
- Review the full component tree and file structure
- Learn how to troubleshoot common issues

---

## Step 1 — Start the App

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Step 2 — Verification Checklist

Go through each item and confirm it works:

**Page Load**
- [ ] "Loading projects…" text appears briefly (700ms delay from mock API)
- [ ] 4 project cards appear after loading
- [ ] Stats row shows: 4 Total, 2 In Progress, 1 Completed, 1 On Hold

**Search**
- [ ] Type "Priya" → only Q2 Marketing Campaign Analytics card shows
- [ ] Type "HR" → only HR Platform Migration card shows
- [ ] Clear the search → all 4 cards return

**Filter Tabs**
- [ ] Click "In Progress" → 2 cards show (HR Migration + DevOps Upgrade)
- [ ] Click "Completed" → 1 card shows (Q2 Marketing)
- [ ] Click "On Hold" → 1 card shows (AI Chatbot)
- [ ] Click "All" → all 4 cards return
- [ ] Active tab is highlighted in purple

**Search + Filter Together**
- [ ] Click "In Progress" tab, then type "Ankit" → only DevOps card shows
- [ ] Both conditions work at the same time

**Project Cards**
- [ ] Each card shows: status badge (correct color), deadline, project name, manager, description
- [ ] Hovering a card shows a subtle shadow

**Detail Modal (Read)**
- [ ] Click any card → modal opens with full project details
- [ ] Click the dark overlay → modal closes
- [ ] Click the ✕ button → modal closes
- [ ] Clicking inside the modal does NOT close it

**Edit Project**
- [ ] Click a card → click ✏️ Edit → form opens pre-filled with project data
- [ ] Change the project name → click "Save Changes" → card updates with new name
- [ ] Manager dropdown shows all existing managers
- [ ] Calendar opens when clicking the Deadline field
- [ ] Past dates are disabled in the calendar

**Add Project**
- [ ] Click "+ Add Project" button → empty form opens
- [ ] Fill in all fields → click "Add Project" → new card appears in the grid
- [ ] Stats row total increases by 1
- [ ] Select "➕ Add New Manager" → text input appears
- [ ] Type a new manager name → submit → new manager appears in dropdown next time

**Delete Project**
- [ ] Click a card → click 🗑️ Delete → card is removed from the grid
- [ ] Stats row count decreases by 1
- [ ] Modal closes after deletion

**Empty State**
- [ ] Type "zzzzz" in search → "No projects match your search." message appears
- [ ] Clear search → cards return

---

## Complete File Structure

```
demo-application/
├── src/
│   ├── components/
│   │   ├── StatusBadge.jsx      ← Sprint 3: colored status label
│   │   ├── ModalOverlay.jsx     ← Sprint 3: dark background wrapper
│   │   ├── FilterBar.jsx        ← Sprint 4: search input + filter tabs
│   │   ├── ProjectCard.jsx      ← Sprint 4: single project card
│   │   ├── StatsRow.jsx         ← Sprint 5: 4 summary stat cards
│   │   ├── ProjectGrid.jsx      ← Sprint 5: loading/empty/cards grid
│   │   ├── ProjectModal.jsx     ← Sprint 5: project detail popup
│   │   ├── ManagerSelect.jsx    ← Sprint 6: manager dropdown + new manager input
│   │   ├── DeadlinePicker.jsx   ← Sprint 6: calendar date picker
│   │   └── ProjectForm.jsx      ← Sprint 7: add/edit form modal
│   ├── data/
│   │   └── mockData.js          ← Sprint 2: project data + fake API
│   ├── App.jsx                  ← Sprint 8: main component, all state + CRUD
│   ├── App.css                  ← Sprint 9: all styles
│   ├── index.css                ← Sprint 9: global reset + #root fix
│   └── main.jsx                 ← never changes
```

---

## Complete Component Tree

```
App.jsx
 ├── StatsRow
 ├── FilterBar
 ├── ProjectGrid
 │    └── ProjectCard
 │         └── StatusBadge
 ├── ProjectModal
 │    ├── ModalOverlay
 │    └── StatusBadge
 └── ProjectForm
      ├── ModalOverlay
      ├── ManagerSelect
      └── DeadlinePicker
```

---

## Props Reference — Every Component

| Component | Props it receives | What each prop does |
|-----------|------------------|---------------------|
| `StatsRow` | `projects` | Full project array to count statuses |
| `FilterBar` | `search`, `onSearch`, `filter`, `onFilter` | Search text + filter tab state and callbacks |
| `ProjectGrid` | `loading`, `projects`, `onCardClick` | Controls which of 3 states to show |
| `ProjectCard` | `project`, `onClick` | One project's data + click handler |
| `StatusBadge` | `status` | Status string to build CSS class |
| `ProjectModal` | `project`, `onClose`, `onEdit`, `onDelete` | Selected project + 3 action callbacks |
| `ModalOverlay` | `onClose`, `children`, `className` | Close handler + inner content + optional CSS class |
| `ProjectForm` | `initial`, `onSave`, `onCancel`, `projects` | Pre-fill data + save/cancel callbacks + manager list |
| `ManagerSelect` | `managers`, `value`, `onChange`, `isNew`, `onToggleNew` | Manager list + current value + mode toggle |
| `DeadlinePicker` | `value`, `onChange` | Current date string + change handler |

---

## Troubleshooting Guide

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Blank white page | Import path error | Open F12 → Console, check for red errors |
| Cards not showing | `mockData.js` not exporting correctly | Check `export const fetchProjects` exists |
| Badge has no color | Status string doesn't match exactly | Must be exactly `"In Progress"`, `"Completed"`, `"On Hold"` |
| Modal closes when clicking inside | Missing `stopPropagation` | Check `ModalOverlay.jsx` has `e.stopPropagation()` on inner div |
| Form doesn't open | `formProject` state issue | Check `setFormProject({})` is called on button click |
| Calendar not showing | `react-datepicker` not installed | Run `npm install react-datepicker` |
| Layout is very narrow | `#root` not updated | Set `width: 100%` on `#root` in `index.css` |
| New project disappears on refresh | No persistent storage | Data lives in React state only — see note below |

> **Note on data persistence:** When you refresh the page, all added/edited/deleted projects reset back to the original `mockData.js` data. This is because React state only lives in memory. To persist data across refreshes, you would need to add `localStorage` (browser storage) or a real backend database.

---

## Production Build

When the app is ready to deploy:
```bash
npm run build
```
This creates a `dist/` folder with optimized files ready to upload to any web server or cloud service like **AWS Amplify**.

To preview the production build locally:
```bash
npm run preview
```

---

## What You Built — Summary

| Feature | How it works |
|---------|-------------|
| View projects | `fetchProjects()` loads data → stored in `projects` state → rendered as cards |
| Search | `search` state filters `projects` array in real time |
| Filter tabs | `filter` state filters `projects` array by status |
| View details | Clicking a card sets `selected` state → `ProjectModal` renders |
| Add project | `+ Add Project` sets `formProject` to `{}` → form opens → `handleAdd` appends to array |
| Edit project | ✏️ Edit sets `formProject` to the project → form pre-fills → `handleEdit` replaces in array |
| Delete project | 🗑️ Delete calls `handleDelete` → `.filter()` removes from array |

---

*Sprint 10 complete — the full Project Dashboard application is built! 🎉*
