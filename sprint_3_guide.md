# Sprint 3 — Reusable Building Blocks (StatusBadge & ModalOverlay)

**Goal:** Build two tiny reusable components that will be shared across the whole app.

---

## What You Will Do
- Create `StatusBadge` — a colored label that shows project status
- Create `ModalOverlay` — a dark background wrapper used by all popups

---

## Why Reusable Components?

Without reusable components, you would copy-paste the same code in multiple places.
If you ever need to change the badge color, you'd have to find and update every copy.

With a reusable component, you change it **once** and every place that uses it updates automatically.

```
Before:  ProjectCard has badge code
         ProjectModal has badge code     ← same code in 2 places ❌
         ProjectForm has badge code

After:   StatusBadge component          ← one place ✅
         ProjectCard uses StatusBadge
         ProjectModal uses StatusBadge
```

---

## Step 1 — Create `src/components/StatusBadge.jsx`

```jsx
// StatusBadge — shows a colored label based on project status
// Props:
//   status (string) — e.g. "In Progress", "Completed", "On Hold"

export default function StatusBadge({ status }) {
  const className = "badge badge-" + status.toLowerCase().replace(" ", "-");
  return <span className={className}>{status}</span>;
}
```

**How the CSS class is built:**
| Status value | CSS class produced |
|---|---|
| `"In Progress"` | `"badge badge-in-progress"` |
| `"Completed"` | `"badge badge-completed"` |
| `"On Hold"` | `"badge badge-on-hold"` |

- `.toLowerCase()` converts to lowercase: `"In Progress"` → `"in progress"`
- `.replace(" ", "-")` replaces the space: `"in progress"` → `"in-progress"`
- These match the CSS classes defined in `App.css`

**How to use it:**
```jsx
import StatusBadge from "./StatusBadge";

<StatusBadge status="In Progress" />   // renders a blue badge
<StatusBadge status="Completed" />     // renders a green badge
<StatusBadge status="On Hold" />       // renders a yellow badge
```

---

## Step 2 — Create `src/components/ModalOverlay.jsx`

```jsx
// ModalOverlay — dark background wrapper for all modals
// Props:
//   onClose   (function) — called when user clicks the dark background
//   children             — the white modal box rendered inside
//   className (string)   — optional extra CSS class for the inner box

export default function ModalOverlay({ onClose, children, className = "" }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation prevents clicks inside from closing the modal */}
      <div className={`modal ${className}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
```

**Key concept — stopPropagation:**

When you click inside the white modal box, the click event would normally "bubble up" to the dark overlay and trigger `onClose` — accidentally closing the modal.

`e.stopPropagation()` stops the click from bubbling up.

```
User clicks inside modal
        ↓
Inner div catches click → stopPropagation() → STOPS here ✅
        ✗
Overlay never receives the click → modal stays open ✅
```

**Key concept — children prop:**

`children` is a special React prop that represents whatever you put between the opening and closing tags of a component.

```jsx
<ModalOverlay onClose={handleClose}>
  <h2>Hello</h2>        ← this is "children"
  <p>Some content</p>   ← this is also "children"
</ModalOverlay>
```

---

## Definition of Done
- [ ] `src/components/StatusBadge.jsx` created
- [ ] `src/components/ModalOverlay.jsx` created
- [ ] No errors in the terminal
