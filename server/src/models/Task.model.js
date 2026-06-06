import mongoose from "mongoose";
import { TASK_STATUS, TASK_PRIORITY } from "../utils/constants.js";

const taskSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
      },

      status: {
        type: String,
        enum: Object.values(
          TASK_STATUS
        ),
        default:
          TASK_STATUS.PENDING,
      },

      priority: {
        type: String,
        enum: Object.values(
          TASK_PRIORITY
        ),
      },

      dueDate: {
        type: Date,
      },

      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
);

const Task = mongoose.model(
  "Task",
  taskSchema
);

export default Task;