const STATUSES = ["All", "In Progress", "Completed", "On Hold"];

export default function FilterBar({ search, onSearch, filter, onFilter }) {
  return (
    <div className="filter-bar">
      <input
        className="search-input"
        type="text"
        placeholder="Search projects or managers…"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="filter-tabs">
        {STATUSES.map((s) => (
          <button
            key={s}
            className={filter === s ? "filter-tab active" : "filter-tab"}
            onClick={() => onFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
