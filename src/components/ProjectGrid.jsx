// ProjectGrid — handles 3 display states: loading, empty, or cards grid
// Props:
//   loading  (bool)     — true while data is being fetched
//   projects (array)    — filtered list of projects to display
//   onCardClick (func)  — called with a project object when a card is clicked

import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ loading, projects, onCardClick }) {
  if (loading) {
    return <p className="loading">Loading projects…</p>;
  }

  if (projects.length === 0) {
    return <p className="empty">No projects match your search.</p>;
  }

  return (
    <div className="cards-grid">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} onClick={onCardClick} />
      ))}
    </div>
  );
}
