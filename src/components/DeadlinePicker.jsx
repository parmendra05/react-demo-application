import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DeadlinePicker({ value, onChange }) {
  const selected = value ? new Date(value) : null;

  function handleChange(date) {
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
