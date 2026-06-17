import React, { useState, useEffect } from "react";
import TaskCard from "../../components/task/TaskCard";
import TaskModal from "../../components/task/TaskModal";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Alert from "../../utils/alert";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from "../../services/task.service";
import {
  ListTodo,
  Search,
  Filter,
  SlidersHorizontal,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    search: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTaskList = async () => {
    try {
      setLoading(true);
      const data = await getTasks(filters);
      setTasks(data.tasks || []);
      setCurrentPage(1);
    } catch (error) {
      Alert.error(
        "Failed to load tasks",
        error.response?.data?.message || error.message
      );
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchTaskList();
    }, 350);

    return () => clearTimeout(delayDebounce);
  }, [filters]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenModal = (task = null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (formData) => {
    try {
      if (selectedTask) {
        const data = await updateTask(selectedTask._id, formData);
        if (data.success) {
          Alert.success("Task updated successfully");
        }
      } else {
        const data = await createTask(formData);
        if (data.success) {
          Alert.success("Task created successfully");
        }
      }
      await fetchTaskList();
      setIsModalOpen(false);
      setSelectedTask(null);
    } catch (error) {
      Alert.error(
        "Operation failed",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const data = await updateTaskStatus(taskId, newStatus);
      if (data.success) {
        Alert.success("Status updated successfully");
        await fetchTaskList();
      }
    } catch (error) {
      Alert.error("Failed to update status");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const result = await Alert.confirm(
        "Are you sure?",
        "You are about to permanently delete this task."
      );

      if (result.isConfirmed) {
        const data = await deleteTask(taskId);
        if (data.success) {
          Alert.success("Deleted!", "Task has been removed.");
          await fetchTaskList();
        }
      }
    } catch (error) {
      Alert.error(
        "Failed to delete task",
        error.response?.data?.message || ""
      );
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const statusA = a.status?.toUpperCase() || "";
    const statusB = b.status?.toUpperCase() || "";

    if (statusA === "COMPLETED" && statusB !== "COMPLETED") return 1;
    if (statusA !== "COMPLETED" && statusB === "COMPLETED") return -1;

    if (statusA !== "COMPLETED" && statusB !== "COMPLETED") {
      if (!a.dueDate) return 1;  
      if (!b.dueDate) return -1;
      
      return new Date(a.dueDate) - new Date(b.dueDate); 
    }

    return 0;
  });

  const totalPages = Math.ceil(sortedTasks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPaginatedTasks = sortedTasks.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 min-h-screen bg-slate-50/50 rounded-3xl">
      
      {/* Header Container */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/50">
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
        <Button onClick={() => handleOpenModal()} variant="primary">
          + Create New Task
        </Button>
      </div>

      {/* Filters Dashboard */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-100/50 space-y-4">
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
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />

          <select
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 focus:outline-none focus:ring-4 focus:ring-purple-400/20 focus:border-purple-600 transition-all h-[42px]"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">All Workflow Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 focus:outline-none focus:ring-4 focus:ring-purple-400/20 focus:border-purple-600 transition-all h-[42px]"
            value={filters.priority}
            onChange={(e) => handleFilterChange("priority", e.target.value)}
          >
            <option value="">All Priority Metrics</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Grid Content Space */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-2 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <Loader2 size={24} className="animate-spin text-purple-600" />
          <p className="text-xs font-bold text-slate-400">Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl shadow-sm shadow-slate-100/50 flex flex-col items-center justify-center space-y-2">
          <Filter size={28} className="text-slate-300" />
          <h4 className="text-xs font-bold text-slate-700">No matching items found</h4>
          <p className="text-[11px] font-semibold text-slate-400 max-w-xs px-4">
            Try changing your filters or create a new task.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentPaginatedTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={() => handleOpenModal(task)}
                onDelete={() => handleDeleteTask(task._id)}
                onStatusChange={(status) => handleStatusChange(task._id, status)}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl px-6 py-4 shadow-sm shadow-slate-100/50">
              <p className="text-[11px] font-bold text-slate-500">
                Showing <span className="text-purple-600">{indexOfFirstItem + 1}</span> -{" "}
                <span className="text-purple-600">{Math.min(indexOfLastItem, tasks.length)}</span> of{" "}
                <span className="text-slate-700">{tasks.length}</span> Workspace Tasks
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx + 1}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                        currentPage === idx + 1
                          ? "bg-purple-600 text-white shadow-sm shadow-purple-500/20"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          task={selectedTask}
          onSubmit={handleModalSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};

export default Tasks;