# Sprint 6 — Form Sub-Components (ManagerSelect & DeadlinePicker)

**Goal:** Build two small focused components that handle the manager dropdown and the calendar date picker inside the project form.

---

## What You Will Do
- Install `react-datepicker` package
- Create `ManagerSelect` — dropdown of existing managers + option to add a new one
- Create `DeadlinePicker` — calendar popup for picking a deadline date

---

## Step 1 — Install react-datepicker

Run in your terminal:
```bash
npm install react-datepicker
```

This adds a ready-made calendar component so we don't have to build one from scratch.

---

## Step 2 — Create `src/components/ManagerSelect.jsx`

```jsx
// ManagerSelect — dropdown of existing managers with option to add a new one
// Props:
//   managers    (array)    — list of existing manager name strings
//   value       (string)   — currently selected manager name
//   onChange    (function) — called with the new manager name string
//   isNew       (bool)     — true when "Add New Manager" text input is active
//   onToggleNew (function) — switches between dropdown mode and text input mode

const NEW_MANAGER_VALUE = "__new__";

export default function ManagerSelect({ managers, value, onChange, isNew, onToggleNew }) {
  if (isNew) {
    return (
      <div className="new-manager-row">
        <input
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter new manager name"
          required
        />
        {/* ✕ cancels new manager mode and goes back to dropdown */}
        <button type="button" className="btn-secondary" onClick={onToggleNew}>✕</button>
      </div>
    );
  }

  return (
    <select
      value={value}
      onChange={(e) => {
        if (e.target.value === NEW_MANAGER_VALUE) {
          onToggleNew();   // switch to text input mode
        } else {
          onChange(e.target.value);
        }
      }}
    >
      {managers.map((m) => <option key={m} value={m}>{m}</option>)}
      <option value={NEW_MANAGER_VALUE}>➕ Add New Manager</option>
    </select>
  );
}
```

**How it works — two modes:**

```
isNew = false (default)
  → shows a <select> dropdown
  → lists all existing managers
  → last option is "➕ Add New Manager"
  → selecting "➕ Add New Manager" calls onToggleNew() → switches to text input mode

isNew = true
  → hides the dropdown
  → shows a text <input> with autoFocus
  → user types the new manager name
  → ✕ button calls onToggleNew() → switches back to dropdown mode
```

**Why `NEW_MANAGER_VALUE = "__new__"`?**
We need a special value for the "Add New Manager" option that will never match a real manager name.
Using `"__new__"` (with double underscores) ensures it's unique and won't accidentally match.

---

## Step 3 — Create `src/components/DeadlinePicker.jsx`

```jsx
// DeadlinePicker — calendar date picker for selecting a project deadline
// Props:
//   value    (string)   — date string in "yyyy-MM-dd" format e.g. "2026-06-15"
//   onChange (function) — called with new date string when a date is picked

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DeadlinePicker({ value, onChange }) {
  // Convert stored "yyyy-MM-dd" string → Date object for the picker
  const selected = value ? new Date(value) : null;

  function handleChange(date) {
    // Convert picked Date object → back to "yyyy-MM-dd" string
    onChange(date ? date.toISOString().split("T")[0] : "");
  }

  return (
    <DatePicker
      selected={selected}
      onChange={handleChange}
      dateFormat="yyyy-MM-dd"
      placeholderText="Select a deadline"
      minDate={new Date()}
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      required
    />
  );
}
```

**Understanding the date conversion:**

The app stores dates as simple strings like `"2026-06-15"` (easy to save and display).
But `react-datepicker` needs a JavaScript `Date` object to work.
So we convert back and forth:

```
Stored in form state:  "2026-06-15"  (string)
         ↓  new Date("2026-06-15")
Passed to DatePicker:  Date object
         ↓  date.toISOString().split("T")[0]
Saved back to state:   "2026-06-15"  (string)
```

**DatePicker props explained:**
| Prop | What it does |
|------|-------------|
| `selected` | The currently selected date (Date object) |
| `onChange` | Called when user picks a date |
| `minDate={new Date()}` | Disables all past dates |
| `showMonthDropdown` | Adds a month dropdown at the top of the calendar |
| `showYearDropdown` | Adds a year dropdown at the top of the calendar |
| `dropdownMode="select"` | Makes month/year dropdowns use `<select>` elements |

---

## Definition of Done
- [ ] `npm install react-datepicker` completed successfully
- [ ] `src/components/ManagerSelect.jsx` created
- [ ] `src/components/DeadlinePicker.jsx` created
- [ ] No errors in the terminal
