// DeadlinePicker — calendar date picker for selecting a project deadline
// Props:
//   value    (string)   — date string in "yyyy-MM-dd" format
//   onChange (function) — called with new date string when date is picked

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DeadlinePicker({ value, onChange }) {
  // Convert stored "yyyy-MM-dd" string to a Date object for the picker
  const selected = value ? new Date(value) : null;

  function handleChange(date) {
    // Convert picked Date object back to "yyyy-MM-dd" string
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
