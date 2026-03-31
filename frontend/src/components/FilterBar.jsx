export default function FilterBar({ filter, setFilter, counts }) {
  const filters = [
    { label: `All (${counts.all})`, value: "all" },
    { label: `Active (${counts.active})`, value: "active" },
    { label: `Completed (${counts.completed})`, value: "completed" },
  ];

  return (
    <div className="filter-bar">
      {filters.map((f) => (
        <button
          key={f.value}
          className={filter === f.value ? "active" : ""}
          onClick={() => setFilter(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}