// StatusBadge — shows a colored label based on project status
// Props:
//   status (string) — e.g. "In Progress", "Completed", "On Hold"

export default function StatusBadge({ status }) {
  const className = "badge badge-" + status.toLowerCase().replace(" ", "-");
  return <span className={className}>{status}</span>;
}
