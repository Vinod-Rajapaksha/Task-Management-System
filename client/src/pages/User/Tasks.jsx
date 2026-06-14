import React, { useState, useEffect } from "react";
import * as taskService from "../../services/task.service";
import TaskCard from "../../components/task/TaskCard";
import TaskModal from "../../components/task/TaskModal";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Alert from "../../utils/alert"; 
import { ListTodo, Search, Filter, SlidersHorizontal, Loader2 } from "lucide-react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    search: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async (currentFilters = filters) => {
    try {
      setLoading(true);
      
      const queryParams = {};
      if (currentFilters.status) queryParams.status = currentFilters.status;
      if (currentFilters.priority) queryParams.priority = currentFilters.priority;
      if (currentFilters.search) queryParams.search = currentFilters.search.trim();

      const data = await taskService.getTasks(queryParams);
      if (data.success) {
        setTasks(data.tasks || []);
      }
    } catch (error) {
      Alert.error("Failed to load tasks", error.response?.data?.message || "");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    fetchTasks(updatedFilters); 
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchTasks();
    }, 350);

    return () => clearTimeout(delayDebounce);
  }, [filters.search]);

  const handleOpenModal = (task = null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (formData) => {
    try {
      if (selectedTask) {
        const taskId = selectedTask._id || selectedTask.id;
        
        if (!taskId) {
          Alert.error("Operation failed", "Task item reference ID is missing or broken.");
          return;
        }

        const data = await taskService.updateTask(taskId, formData);
        if (data.success) Alert.success("Task updated successfully");
      } else {
        const data = await taskService.createTask(formData);
        if (data.success) Alert.success("Task created successfully");
      }
      
      setIsModalOpen(false); 
      setSelectedTask(null); 
      await fetchTasks();
    } catch (error) {
      Alert.error("Operation failed", error.response?.data?.message || error.message);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const data = await taskService.updateTaskStatus(taskId, newStatus);
      if (data.success) {
        Alert.success("Status updated successfully");
        await fetchTasks();
      }
    } catch (error) {
      Alert.error("Failed to update status");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const result = await Alert.confirm(
        "Are you sure?",
        "You are about to permanently delete this task items layer."
      );

      if (result.isConfirmed) {
        const data = await taskService.deleteTask(taskId);
        if (data.success) {
          Alert.success("Deleted!", "Task has been completely cleared.");
          await fetchTasks();
        }
      }
    } catch (error) {
      Alert.error("Failed to delete task", error.response?.data?.message || "");
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between 
        gap-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/50">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <ListTodo size={22} />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800">Workspace Tasks</h1>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">
              Organize, track workflow progressions, and measure task priorities.
            </p>
          </div>
        </div>
        <div className="sm:self-center">
          <Button onClick={() => handleOpenModal(null)} variant="primary">
            + Create New Task
          </Button>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm 
        shadow-slate-100/50 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <SlidersHorizontal size={14} className="text-purple-500" />
          <h3 className="text-xs font-bold text-slate-700">Filter & Search Engine</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            type="text"
            placeholder="Search by keyword..."
            icon={Search}
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />

          <div className="space-y-1.5">
            <select
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs 
                font-semibold text-slate-600 focus:outline-none focus:ring-4 focus:ring-purple-400/20 
                focus:border-purple-600 transition-all h-[34px]"
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="">All Workflow Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <select
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs 
                font-semibold text-slate-600 focus:outline-none focus:ring-4 focus:ring-purple-400/20 
                focus:border-purple-600 transition-all h-[34px]"
              value={filters.priority}
              onChange={(e) => handleFilterChange("priority", e.target.value)}
            >
              <option value="">All Priority Metrics</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-2 
          bg-white border border-slate-100 rounded-2xl shadow-sm">
          <Loader2 size={24} className="animate-spin text-purple-600" />
          <p className="text-xs font-bold text-slate-400">Syncing database roadmap...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl 
          shadow-sm shadow-slate-100/50 flex flex-col items-center justify-center space-y-2">
          <Filter size={28} className="text-slate-300" />
          <h4 className="text-xs font-bold text-slate-700">No matching items found</h4>
          <p className="text-[11px] font-semibold text-slate-400 max-w-xs px-4">
            Try revising your drop-down filter settings or register a 
            brand new execution item to clear this window.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={(clickedTask) => handleOpenModal(clickedTask)} 
              onDelete={() => handleDeleteTask(task._id)}
              onStatusChange={(status) => handleStatusChange(task._id, status)}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
          }}
          onSubmit={handleModalSubmit}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default Tasks;