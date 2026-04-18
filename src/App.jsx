import { useState, useEffect } from "react";
import { fetchProjects } from "./data/mockData";
import FilterBar from "./components/FilterBar";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import "./App.css";

export default function App() {
  // All projects loaded from the mock API
  const [projects, setProjects] = useState([]);

  // Projects currently visible after filtering/searching
  const [filtered, setFiltered] = useState([]);

  // Show spinner while data is loading
  const [loading, setLoading] = useState(true);

  // The project the user clicked on (null = modal is closed)
  const [selected, setSelected] = useState(null);

  // Fetch projects once when the page first loads
  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data);
      setFiltered(data); // show all projects by default
      setLoading(false);
    });
  }, []);

  return (
    <div className="dashboard">

      {/* Page header */}
      <header className="dash-header">
        <h1 className="dash-title">Project Dashboard</h1>
        <p className="dash-sub">Track and manage all internal projects</p>
      </header>

      {/* Summary stats */}
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-num">{projects.length}</span>
          <span className="stat-label">Total Projects</span>
        </div>
        <div className="stat-card progress-stat">
          <span className="stat-num">
            {projects.filter((p) => p.status === "In Progress").length}
          </span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card completed-stat">
          <span className="stat-num">
            {projects.filter((p) => p.status === "Completed").length}
          </span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card hold-stat">
          <span className="stat-num">
            {projects.filter((p) => p.status === "On Hold").length}
          </span>
          <span className="stat-label">On Hold</span>
        </div>
      </div>

      {/* Search + filter tabs — FilterBar handles its own logic */}
      <FilterBar projects={projects} onFilterChange={setFiltered} />

      {/* Main content area */}
      {loading ? (
        <div className="loading">
          <div className="spinner" />
          <p>Loading projects…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty">No projects match your search.</div>
      ) : (
        <div className="cards-grid">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelected}
            />
          ))}
        </div>
      )}

      {/* Detail modal — only visible when a project is selected */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />

    </div>
  );
}
