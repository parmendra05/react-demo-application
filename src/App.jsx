import { useState, useEffect } from "react";
import { fetchProjects } from "./data/mockData";
import FilterBar from "./components/FilterBar";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import "./App.css";

export default function App() {
  // State: list of all projects (starts empty)
  const [projects, setProjects] = useState([]);
  // State: true while data is loading
  const [loading, setLoading] = useState(true);
  // State: current text in the search box
  const [search, setSearch] = useState("");
  // State: which filter tab is active
  const [filter, setFilter] = useState("All");
  // State: which project card was clicked (null = modal closed)
  const [selected, setSelected] = useState(null);

  // Fetch projects once when the page loads
  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  // Filter the projects list based on search text and active filter tab
  const filtered = projects.filter((p) => {
    const matchesFilter = filter === "All" || p.status === filter;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.manager.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="dashboard">

      <header className="dash-header">
        <h1>Project Dashboard</h1>
        <p>Track and manage all internal projects</p>
      </header>

      {/* Stats row — counts projects by status */}
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-num">{projects.length}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{projects.filter(p => p.status === "In Progress").length}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{projects.filter(p => p.status === "Completed").length}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{projects.filter(p => p.status === "On Hold").length}</span>
          <span className="stat-label">On Hold</span>
        </div>
      </div>

      {/* Search box and filter tabs */}
      <FilterBar
        search={search}
        onSearch={setSearch}
        filter={filter}
        onFilter={setFilter}
      />

      {/* Show loading text, empty message, or the cards grid */}
      {loading ? (
        <p className="loading">Loading projects…</p>
      ) : filtered.length === 0 ? (
        <p className="empty">No projects match your search.</p>
      ) : (
        <div className="cards-grid">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} onClick={setSelected} />
          ))}
        </div>
      )}

      {/* Modal — only visible when a card is clicked */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />

    </div>
  );
}
