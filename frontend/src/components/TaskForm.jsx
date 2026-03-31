import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dateTime, setDateTime] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title,
      description,
      priority: priority || "medium",
      dueDate: dateTime
        ? dateTime.toISOString().split("T")[0]
        : null,
      dueTime: dateTime
        ? dateTime.toTimeString().slice(0, 5)
        : null,
    });

    // Reset fields
    setTitle("");
    setDescription("");
    setPriority("");
    setDateTime(null);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>

      <input
        type="text"
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
      />

      <div className="form-row">
        {/* Priority */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={`custom-select ${priority === "" ? "dim" : ""}`}
        >
          <option value="" disabled>
            Select priority
          </option>
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>

        {/* Date + Time Picker */}
        <DatePicker
          selected={dateTime}
          onChange={(date) => setDateTime(date)}
          showTimeSelect
          timeIntervals={30}
          dateFormat="dd MMM yyyy h:mm aa"
          placeholderText="Select date & time"
          className="custom-datepicker"
        />
      </div>

      <button type="submit">+ Add Task</button>
    </form>
  );
}