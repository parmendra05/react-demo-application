import { useState, useEffect } from "react";
import { fetchProjects, createProject, updateProject, deleteProject } from "./api/projectApi";
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

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  async function handleAdd(formData) {
    try {
      const newProject = await createProject(formData);
      setProjects((prev) => [...prev, newProject]);
      setFormProject(null);
    } catch (error) {
      console.error("Failed to add project:", error);
      alert("Failed to add project. Is the backend running?");
    }
  }

  async function handleEdit(formData) {
    try {
      const updated = await updateProject(formData.id, formData);
      setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setFormProject(null);
      setSelected(null);
    } catch (error) {
      console.error("Failed to update project:", error);
      alert("Failed to update project. Is the backend running?");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setSelected(null);
    } catch (error) {
      console.error("Failed to delete project:", error);
      alert("Failed to delete project. Is the backend running?");
    }
  }

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

      <StatsRow projects={projects} />

      <FilterBar search={search} onSearch={setSearch} filter={filter} onFilter={setFilter} />

      <ProjectGrid loading={loading} projects={filtered} onCardClick={setSelected} />

      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
        onEdit={(p) => { setSelected(null); setFormProject(p); }}
        onDelete={handleDelete}
      />

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
