# Sprint 4 — Styling & Final Integration

**Assignee:** Team Member 4  
**Depends on:** Sprints 1–3 complete  
**Goal:** Add CSS styles, fix the root layout, and verify the full app works end-to-end.

---

## Tasks

### 1. Update `src/index.css`

Find the `#root` block and replace it with:

```css
#root {
  width: 100%;
}
```

> The default Vite template limits `#root` to a narrow width — this fix makes the dashboard use the full page width.

---

### 2. Replace `src/App.css` with the styles below

```css
/* ── Global reset ── */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #f0f2f7;
  color: #1e293b;
  font-family: system-ui, sans-serif;
}

/* ── Page wrapper ── */
.dashboard {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px;
}

/* ── Header ── */
.dash-header {
  margin-bottom: 28px;
}

.dash-header h1 {
  font-size: 1.8rem;
}

.dash-header p {
  color: #64748b;
  margin-top: 4px;
}

/* ── Stats row ── */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-num {
  font-size: 2rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.85rem;
  color: #64748b;
}

/* ── Filter bar ── */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 24px;
}

.search-input {
  flex: 1;
  min-width: 200px;
  padding: 10px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #1e293b;
  background: #ffffff;
}

.search-input:focus {
  outline: 2px solid #4f46e5;
}

.filter-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  background: #ffffff;
  color: #1e293b;
  cursor: pointer;
  font-size: 0.875rem;
}

.filter-tab.active {
  background: #4f46e5;
  color: #ffffff;
  border-color: #4f46e5;
}

/* ── Cards grid ── */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.project-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.project-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
}

.card-manager {
  font-size: 0.875rem;
  color: #64748b;
}

.card-desc {
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.5;
}

.deadline {
  font-size: 0.8rem;
  color: #64748b;
}

/* ── Status badges ── */
.badge {
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-in-progress {
  background: #dbeafe;
  color: #2563eb;
}

.badge-completed {
  background: #dcfce7;
  color: #16a34a;
}

.badge-on-hold {
  background: #fef3c7;
  color: #d97706;
}

/* ── Loading & empty states ── */
.loading,
.empty {
  text-align: center;
  padding: 60px;
  color: #64748b;
}

/* ── Modal ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.modal {
  background: #ffffff;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  padding: 28px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #64748b;
}

.modal-desc {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.6;
}
```

**What each section does:**
- `* { box-sizing: border-box; }` — makes sizing predictable: padding is included inside the element width
- `.stats-row` uses `grid-template-columns: repeat(4, 1fr)` — 4 equal columns automatically
- `.cards-grid` uses `repeat(auto-fill, minmax(300px, 1fr))` — cards wrap to a new row automatically on smaller screens
- `.badge-in-progress / .badge-completed / .badge-on-hold` — these match the class names built in ProjectCard and ProjectModal
- `.modal-overlay` uses `position: fixed; inset: 0` — covers the entire screen on top of everything else

---

### 3. Verify the Full App

```bash
npm run dev
```

Open `http://localhost:5173` and check:

- [ ] Stats row shows: 4 Total, 2 In Progress, 1 Completed, 1 On Hold
- [ ] "Loading projects…" text appears briefly on first load
- [ ] Typing in the search box filters the cards
- [ ] Filter tabs update which cards are shown
- [ ] Clicking a card opens the modal with project details
- [ ] Clicking the dark background or ✕ closes the modal
- [ ] No red errors in browser console (F12 → Console tab)

---

### 4. Production Build Check

```bash
npm run build
npm run preview
```

Verify the app loads correctly at the preview URL.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Blank page | Open F12 Console and check for import path errors |
| Cards not showing | Confirm `src/data/mockData.js` exports `fetchProjects` |
| Badge has no colour | Check the status string matches exactly: `"In Progress"`, `"Completed"`, `"On Hold"` |
| Modal won't close on overlay click | Confirm `e.stopPropagation()` is on the inner `.modal` div |
| Layout is narrow | Confirm `#root` in `index.css` has `width: 100%` |

---

## Definition of Done
- [ ] `src/App.css` replaced with the styles above
- [ ] `src/index.css` `#root` updated to `width: 100%`
- [ ] All checklist items in step 3 pass
- [ ] `npm run build` completes with no errors
