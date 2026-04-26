import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ loading, projects, onCardClick }) {
  if (loading) return <p className="loading">Loading projects…</p>;
  if (projects.length === 0) return <p className="empty">No projects match your search.</p>;

  return (
    <div className="cards-grid">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} onClick={onCardClick} />
      ))}
    </div>
  );
}
