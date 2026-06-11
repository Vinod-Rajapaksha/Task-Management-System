import api from "./api";

// Get all tasks
export const getTasks = async (filters = {}) => {
  const response = await api.get("/tasks", {
    params: filters,
  });

  return response.data;
};

// Get single task
export const getTask = async (taskId) => {
  const response = await api.get(
    `/tasks/${taskId}`
  );

  return response.data;
};

// Create task
export const createTask = async (taskData) => {
  const response = await api.post(
    "/tasks",
    taskData
  );

  return response.data;
};

// Update task
export const updateTask = async (
  taskId,
  taskData
) => {
  const response = await api.put(
    `/tasks/${taskId}`,
    taskData
  );

  return response.data;
};

// Delete task
export const deleteTask = async (
  taskId
) => {
  const response = await api.delete(
    `/tasks/${taskId}`
  );

  return response.data;
};

// Update task status
export const updateTaskStatus = async (
  taskId,
  status
) => {
  const response = await api.patch(
    `/tasks/${taskId}/status`,
    { status }
  );

  return response.data;
};