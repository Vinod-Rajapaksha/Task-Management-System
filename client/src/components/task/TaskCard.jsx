import React from "react";
import PropTypes from "prop-types";
import { Calendar, Edit2, Trash2, CheckCircle2, Clock } from "lucide-react";

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const getPriorityBadge = (prio) => {
    const styles = {
      HIGH: "bg-red-50 text-red-600 border-red-100",
      MEDIUM: "bg-amber-50 text-amber-600 border-amber-100",
      LOW: "bg-emerald-50 text-emerald-600 border-emerald-100",
    };
    return styles[prio] || "bg-slate-50 text-slate-600";
  };

  const getStatusBadge = (status) => {
    const styles = {
      COMPLETED: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white",
      IN_PROGRESS: "bg-gradient-to-r from-purple-600 to-indigo-500 text-white",
      PENDING: "bg-slate-200 text-slate-700",
    };
    return styles[status] || "bg-slate-100";
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-100/50 
      flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
      <div className="space-y-2">
        {/* Card Header Tags */}
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border 
            ${getPriorityBadge(task.priority)}`}>
            {task.priority || "NORMAL"} Priority
          </span>
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm 
            ${getStatusBadge(task.status)}`}>
            {task.status?.replace("_", " ")}
          </span>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{task.title}</h4>
          <p className="text-xs font-semibold text-slate-400 mt-1 line-clamp-2 min-h-[2rem]">
            {task.description || "No description provided."}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
          <Calendar size={13} className="text-purple-500" />
          <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</span>
        </div>

        <div className="flex items-center gap-1">
          {task.status !== "COMPLETED" && (
            <button
              onClick={() => onStatusChange(task.status === "PENDING" ? "IN_PROGRESS" : "COMPLETED")}
              title="Advance Status"
              className="p-1.5 hover:bg-purple-50 text-purple-600 rounded-lg transition-colors"
            >
              {task.status === "PENDING" ? <Clock size={14} /> : <CheckCircle2 size={14} />}
            </button>
          )}
          <button
            onClick={() => onEdit(task)} 
            title="Edit Task"
            className="p-1.5 hover:bg-slate-50 text-slate-500 rounded-lg transition-colors"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={onDelete}
            title="Delete Task"
            className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default TaskCard;