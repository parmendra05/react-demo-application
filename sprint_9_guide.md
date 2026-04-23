# Sprint 9 — Styling the Application (App.css)

**Goal:** Add all the CSS styles that make the dashboard look clean and professional.

---

## What You Will Do
- Understand the CSS structure used in this project
- Apply styles for every component: header, stats, cards, badges, modals, forms, buttons

---

## Step 1 — Update `src/index.css`

Find the `#root` block and replace it with:
```css
#root {
  width: 100%;
}
```
The default Vite template limits `#root` to a narrow centered width — this fix makes the dashboard use the full page width.

---

## Step 2 — Replace `src/App.css` with the full styles below

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}

.dash-header h1 { font-size: 1.8rem; }
.dash-header p  { color: #64748b; margin-top: 4px; }

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

.stat-num   { font-size: 2rem; font-weight: 700; }
.stat-label { font-size: 0.85rem; color: #64748b; }

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

.search-input:focus { outline: 2px solid #4f46e5; }

.filter-tabs { display: flex; gap: 8px; flex-wrap: wrap; }

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

.project-card:hover { box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); }

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title   { font-size: 1rem; font-weight: 600; }
.card-manager { font-size: 0.875rem; color: #64748b; }
.card-desc    { font-size: 0.85rem; color: #64748b; line-height: 1.5; }
.deadline     { font-size: 0.8rem; color: #64748b; }

/* ── Status badges ── */
.badge {
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-in-progress { background: #dbeafe; color: #2563eb; }
.badge-completed   { background: #dcfce7; color: #16a34a; }
.badge-on-hold     { background: #fef3c7; color: #d97706; }

/* ── Loading & empty states ── */
.loading, .empty {
  text-align: center;
  padding: 60px;
  color: #64748b;
}

/* ── Modal overlay ── */
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

.modal-desc { color: #64748b; font-size: 0.9rem; line-height: 1.6; }

/* ── Modal action buttons ── */
.modal-actions { display: flex; gap: 10px; margin-top: 8px; }

/* ── Buttons ── */
.btn-primary {
  padding: 9px 18px;
  background: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
}
.btn-primary:hover { background: #4338ca; }

.btn-secondary {
  padding: 9px 18px;
  background: #f1f5f9;
  color: #1e293b;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
}
.btn-secondary:hover { background: #e2e8f0; }

.btn-danger {
  padding: 9px 18px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
}
.btn-danger:hover { background: #fecaca; }

/* ── Project Form ── */
.form-modal { max-width: 520px; }

.project-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.project-form label {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.project-form input,
.project-form select,
.project-form textarea {
  padding: 9px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #1e293b;
  background: #fff;
  font-family: inherit;
}

.project-form input:focus,
.project-form select:focus,
.project-form textarea:focus { outline: 2px solid #4f46e5; }

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 4px;
}

/* ── New manager inline row ── */
.new-manager-row { display: flex; gap: 8px; align-items: center; }
.new-manager-row input { flex: 1; }
.new-manager-row .btn-secondary { padding: 9px 12px; flex-shrink: 0; }

/* ── Datepicker full width fix ── */
.project-form .react-datepicker-wrapper { width: 100%; }
.project-form .react-datepicker__input-container input { width: 100%; }
```

---

## CSS Concepts Explained

**`box-sizing: border-box`** — padding is included inside the element's width, not added on top. Makes sizing predictable.

**CSS Grid for stats row** — 4 equal columns:
```css
grid-template-columns: repeat(4, 1fr);
```
`1fr` means "1 fraction of available space" — all 4 columns share the width equally.

**CSS Grid for cards** — auto-fill responsive columns:
```css
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
```
The browser automatically decides how many columns fit. Cards wrap to a new row on smaller screens — no media queries needed.

**`position: fixed; inset: 0`** — covers the entire screen:
```css
.modal-overlay {
  position: fixed;  /* stays in place even when scrolling */
  inset: 0;         /* shorthand for top:0; right:0; bottom:0; left:0 */
}
```

**Color system used:**
| Color | Hex | Used for |
|-------|-----|---------|
| Purple | `#4f46e5` | Primary buttons, active tab, focus ring |
| Blue | `#2563eb` | In Progress badge text |
| Green | `#16a34a` | Completed badge text |
| Amber | `#d97706` | On Hold badge text |
| Red | `#dc2626` | Delete button text |
| Slate | `#64748b` | Secondary text, labels |

---

## Definition of Done
- [ ] `src/index.css` `#root` updated to `width: 100%`
- [ ] `src/App.css` replaced with the styles above
- [ ] Dashboard looks clean with white cards on a light grey background
- [ ] Status badges show correct colors (blue, green, yellow)
- [ ] Buttons show correct colors (purple, grey, red)
- [ ] Modal appears centered with dark overlay
