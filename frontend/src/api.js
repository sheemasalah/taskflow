import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const fetchTasks = () => API.get("/tasks");
export const createTask = (data) => API.post("/tasks", data);
export const toggleTask = (id) => API.patch(`/tasks/${id}/toggle`);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);