# Sprint 4 — Styling & Final Integration

**Assignee:** Team Member 4  
**Depends on:** Sprints 1–3 complete  
**Goal:** Apply all CSS, fix the root layout, and verify the full app runs correctly.

---

## Tasks

### 1. Update `src/index.css`

Find the `#root` block and replace it with:

```css
#root {
  width: 100%;
  min-height: 100svh;
}
```

> The default Vite template sets a fixed max-width on `#root` which breaks the dashboard layout.

---

### 2. Replace `src/App.css` with full styles

```css
:root {
  --bg: #f0f2f7;
  --surface: #ffffff;
  --border: #e2e8f0;
  --text: #1e293b;
  --muted: #64748b;
  --accent: #4f46e5;
  --green: #16a34a;
  --amber: #d97706;
  --red: #dc2626;
  --blue: #2563eb;
  --radius: 12px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: var(--bg); color: var(--text); font-family: system-ui, sans-serif; }

.dashboard { max-width: 1200px; margin: 0 auto; padding: 32px 24px; }

.dash-header { margin-bottom: 28px; }
.dash-title { font-size: 1.8rem; font-weight: 700; }
.dash-sub { color: var(--muted); margin-top: 4px; }

/* Stats row */
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.stat-card { background: var(--surface); border-radius: var(--radius); padding: 20px 24px; display: flex; flex-direction: column; gap: 4px; border: 1px solid var(--border); }
.stat-num { font-size: 2rem; font-weight: 700; }
.stat-label { font-size: .85rem; color: var(--muted); }
.progress-stat .stat-num { color: var(--blue); }
.completed-stat .stat-num { color: var(--green); }
.hold-stat .stat-num { color: var(--amber); }

/* Filter bar */
.filter-bar { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-bottom: 24px; }
.search-input { flex: 1; min-width: 220px; padding: 10px 14px; border: 1px solid var(--border); border-radius: 8px; font-size: .95rem; background: var(--surface); }
.search-input:focus { outline: 2px solid var(--accent); }
.filter-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-tab { padding: 8px 16px; border: 1px solid var(--border); border-radius: 20px; background: var(--surface); cursor: pointer; font-size: .875rem; }
.filter-tab.active { background: var(--accent); color: #fff; border-color: var(--accent); }

/* Cards grid */
.cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; }
.project-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; cursor: pointer; display: flex; flex-direction: column; gap: 10px; transition: box-shadow .2s; }
.project-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,.08); }
.card-header { display: flex; justify-content: space-between; align-items: center; }
.card-title { font-size: 1rem; font-weight: 600; }
.card-manager { font-size: .875rem; color: var(--muted); }
.card-desc { font-size: .85rem; color: var(--muted); line-height: 1.5; }

/* Badges */
.badge { padding: 3px 10px; border-radius: 20px; font-size: .75rem; font-weight: 600; }
.badge-progress { background: #dbeafe; color: var(--blue); }
.badge-completed { background: #dcfce7; color: var(--green); }
.badge-hold { background: #fef3c7; color: var(--amber); }
.badge-lg { padding: 5px 14px; font-size: .85rem; }

/* Deadline */
.deadline { font-size: .8rem; color: var(--muted); }
.deadline.overdue { color: var(--red); font-weight: 600; }
.deadline.soon { color: var(--amber); font-weight: 600; }

/* Progress bar */
.progress-wrap { display: flex; align-items: center; gap: 10px; }
.progress-bar { flex: 1; height: 6px; background: var(--border); border-radius: 99px; overflow: hidden; }
.progress-fill { height: 100%; background: var(--accent); border-radius: 99px; }
.progress-label { font-size: .8rem; color: var(--muted); min-width: 32px; text-align: right; }

.view-btn { margin-top: 4px; padding: 8px 0; background: none; border: none; color: var(--accent); font-weight: 600; cursor: pointer; font-size: .875rem; text-align: left; }

/* Loading & empty */
.loading { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 60px; color: var(--muted); }
.spinner { width: 36px; height: 36px; border: 3px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin .7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.empty { text-align: center; padding: 60px; color: var(--muted); }

/* Modal */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 16px; }
.modal { background: var(--surface); border-radius: var(--radius); width: 100%; max-width: 560px; max-height: 90vh; overflow-y: auto; padding: 28px; position: relative; }
.modal-close { position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--muted); }
.modal-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 12px; }
.modal-header h2 { font-size: 1.2rem; font-weight: 700; }
.modal-desc { color: var(--muted); font-size: .9rem; line-height: 1.6; margin-bottom: 16px; }
.modal-meta { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; font-size: .9rem; }
.modal-meta > div { display: flex; gap: 12px; }
.meta-label { color: var(--muted); min-width: 80px; }
.modal-progress { margin-bottom: 20px; }
.tasks-heading { font-size: .95rem; font-weight: 600; margin-bottom: 10px; }
.task-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.task-item { display: flex; align-items: center; gap: 10px; font-size: .875rem; }
.task-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.task-done { background: var(--green); color: var(--green); }
.task-progress { background: var(--blue); color: var(--blue); }
.task-pending { background: var(--border); color: var(--muted); }
.task-title { flex: 1; }
.task-badge { padding: 2px 8px; border-radius: 20px; font-size: .75rem; background: var(--bg); }
```

**Key CSS concepts used:**
- CSS Custom Properties (`--accent`, `--green`, etc.) defined in `:root` — change a color in one place, updates everywhere
- `grid-template-columns: repeat(4, 1fr)` — 4 equal-width stat columns
- `repeat(auto-fill, minmax(340px, 1fr))` — cards grid auto-adjusts columns based on screen width, no media queries needed
- `position: fixed; inset: 0` — modal overlay covers the full viewport
- `animation: spin .7s linear infinite` — pure CSS loading spinner

---

### 3. Verify the Full App

```bash
npm run dev
```

Open `http://localhost:5173` and check each item:

- [ ] Stats row shows: 6 Total, 2 In Progress, 2 Completed, 2 On Hold
- [ ] Loading spinner appears for ~700ms on first load
- [ ] Typing in search filters cards by project name and manager name
- [ ] Filter tabs (All / In Progress / Completed / On Hold) update the grid
- [ ] Clicking a card opens the modal with task list
- [ ] Clicking the overlay background or ✕ closes the modal
- [ ] No errors in browser console (F12 → Console tab)

---

### 4. Production Build Check

```bash
npm run build
npm run preview
```

Verify the production build loads correctly at the preview URL.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Blank page | Check F12 Console for import path errors |
| Cards not showing | Confirm `src/data/mockData.js` exports `fetchProjects` |
| Modal won't close on overlay click | Confirm `e.stopPropagation()` is on the inner `.modal` div |
| Layout broken / narrow | Confirm `#root` in `index.css` has `width: 100%` |
| Spinner never stops | Confirm `setLoading(false)` is called inside `.then()` in App.jsx |

---

## Definition of Done
- [ ] `src/App.css` fully replaced with dashboard styles
- [ ] `src/index.css` `#root` block updated to `width: 100%`
- [ ] All verification checklist items above pass
- [ ] `npm run build` completes with no errors
- [ ] App is fully functional end-to-end
