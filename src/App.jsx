import { useState, useEffect } from "react";
import { fetchProjects } from "./data/mockData";
import FilterBar from "./components/FilterBar";
import StatsRow from "./components/StatsRow";
import ProjectGrid from "./components/ProjectGrid";
import ProjectModal from "./components/ProjectModal";
import ProjectForm from "./components/ProjectForm";
import "./App.css";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [formProject, setFormProject] = useState(null);

  // Fetch projects once when the page loads
  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  function handleAdd(formData) {
    setProjects((prev) => [...prev, { ...formData, id: Date.now() }]);
    setFormProject(null);
  }

  function handleEdit(formData) {
    setProjects((prev) => prev.map((p) => (p.id === formData.id ? formData : p)));
    setFormProject(null);
    setSelected(null);
  }

  function handleDelete(id) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setSelected(null);
  }

  // Filter projects by active tab and search text
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
        <div>
          <h1>Project Dashboard</h1>
          <p>Track and manage all internal projects</p>
        </div>
        <button className="btn-primary" onClick={() => setFormProject({})}>+ Add Project</button>
      </header>

      {/* Summary counts */}
      <StatsRow projects={projects} />

      {/* Search + filter tabs */}
      <FilterBar search={search} onSearch={setSearch} filter={filter} onFilter={setFilter} />

      {/* Cards grid (handles loading + empty states too) */}
      <ProjectGrid loading={loading} projects={filtered} onCardClick={setSelected} />

      {/* Detail popup */}
      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
        onEdit={(p) => { setSelected(null); setFormProject(p); }}
        onDelete={handleDelete}
      />

      {/* Add / Edit form popup */}
      {formProject !== null && (
        <ProjectForm
          initial={formProject.id ? formProject : null}
          onSave={formProject.id ? handleEdit : handleAdd}
          onCancel={() => setFormProject(null)}
          projects={projects}
        />
      )}

    </div>
  );
}
