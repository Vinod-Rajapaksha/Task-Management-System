import mongoose from "mongoose";
import { TASK_STATUS, TASK_PRIORITY } from "../utils/constants.js";
import { calculatePriority } from "../utils/priorityHelper.js";

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

      dueDate: {
        type: Date,
      },

      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      deadlineReminderSent: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
);

taskSchema.virtual("priority").get(function () {
  return calculatePriority(this.dueDate);
});

const Task = mongoose.model(
  "Task",
  taskSchema
);

export default Task;