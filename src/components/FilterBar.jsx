import { useState } from "react";

// The 4 filter tab options
const STATUSES = ["All", "In Progress", "Completed", "On Hold"];

// FilterBar receives the full projects list and calls onFilterChange
// with the filtered result whenever the user types or clicks a tab.
export default function FilterBar({ projects, onFilterChange }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Called every time search text or filter tab changes
  function applyFilters(newSearch, newFilter) {
    const query = newSearch.toLowerCase();

    const result = projects.filter((project) => {
      const matchesTab =
        newFilter === "All" || project.status === newFilter;

      const matchesSearch =
        project.name.toLowerCase().includes(query) ||
        project.manager.toLowerCase().includes(query);

      return matchesTab && matchesSearch;
    });

    onFilterChange(result);
  }

  function handleSearch(value) {
    setSearch(value);
    applyFilters(value, activeFilter);
  }

  function handleTabClick(status) {
    setActiveFilter(status);
    applyFilters(search, status);
  }

  return (
    <div className="filter-bar">
      <input
        className="search-input"
        type="text"
        placeholder="Search projects or managers…"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="filter-tabs">
        {STATUSES.map((status) => (
          <button
            key={status}
            className={`filter-tab ${activeFilter === status ? "active" : ""}`}
            onClick={() => handleTabClick(status)}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}
