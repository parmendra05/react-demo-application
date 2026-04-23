// ManagerSelect — dropdown of existing managers with an option to add a new one
// Props:
//   managers      (array)    — list of existing manager names
//   value         (string)   — currently selected manager name
//   onChange      (function) — called with the new manager name string
//   isNew         (bool)     — true when "Add New Manager" mode is active
//   onToggleNew   (function) — switches between dropdown and text input mode

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
          onToggleNew();
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
