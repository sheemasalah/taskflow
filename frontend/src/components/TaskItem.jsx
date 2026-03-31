export default function TaskItem({ task, onToggle, onDelete }) {
  const priorityColors = {
    low: "#22c55e",
    medium: "#f59e0b",
    high: "#ef4444",
  };

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return null;
    const [hour, minute] = time.split(":");
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const displayHour = h % 12 || 12;
    return `${displayHour}:${minute} ${ampm}`;
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-left">
        <button
          className={`check-btn ${task.completed ? "checked" : ""}`}
          onClick={() => onToggle(task._id)}
        >
          {task.completed ? "✓" : ""}
        </button>
        <div className="task-info">
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
          <div className="task-meta">
            <span
              className="priority-badge"
              style={{ backgroundColor: priorityColors[task.priority] }}
            >
              {task.priority}
            </span>
            {task.dueDate && (
              <span className="due-date">
                📅 {formatDate(task.dueDate)}
                {task.dueTime && (
                  <span className="due-time"> ⏰ {formatTime(task.dueTime)}</span>
                )}
              </span>
            )}
            {!task.dueDate && task.dueTime && (
              <span className="due-date">⏰ {formatTime(task.dueTime)}</span>
            )}
          </div>
        </div>
      </div>
      <button className="delete-btn" onClick={() => onDelete(task._id)}>
        🗑️
      </button>
    </div>
  );
}