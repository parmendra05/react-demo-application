// StatsRow — shows 4 summary cards at the top of the dashboard
// Props:
//   projects (array) — full list of all projects (not filtered)

export default function StatsRow({ projects }) {
  const counts = {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === "In Progress").length,
    completed: projects.filter((p) => p.status === "Completed").length,
    onHold: projects.filter((p) => p.status === "On Hold").length,
  };

  return (
    <div className="stats-row">
      <div className="stat-card">
        <span className="stat-num">{counts.total}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat-card">
        <span className="stat-num">{counts.inProgress}</span>
        <span className="stat-label">In Progress</span>
      </div>
      <div className="stat-card">
        <span className="stat-num">{counts.completed}</span>
        <span className="stat-label">Completed</span>
      </div>
      <div className="stat-card">
        <span className="stat-num">{counts.onHold}</span>
        <span className="stat-label">On Hold</span>
      </div>
    </div>
  );
}
