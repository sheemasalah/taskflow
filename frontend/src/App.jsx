import { useEffect, useState } from "react";
import { fetchTasks, createTask, toggleTask, deleteTask } from "./api";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import FilterBar from "./components/FilterBar";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await fetchTasks();
      setTasks(res.data);
    } catch {
      setError("Could not connect to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (taskData) => {
    try {
      const res = await createTask(taskData);
      setTasks([res.data, ...tasks]);
    } catch {
      alert("Failed to add task.");
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await toggleTask(id);
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch {
      alert("Failed to update task.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch {
      alert("Failed to delete task.");
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>TaskFlow</h1>
        <p>Stay organized, stay ahead.</p>
      </header>
      <main className="app-main">
        <TaskForm onAdd={handleAdd} />
        <FilterBar filter={filter} setFilter={setFilter} counts={counts} />
        {loading && <p className="status-msg">Loading tasks...</p>}
        {error && <p className="status-msg error">{error}</p>}
        {!loading && !error && filteredTasks.length === 0 && (
          <p className="status-msg">No tasks here. Add one above! 🎉</p>
        )}
        <div className="task-list">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>
    </div>
  );
}