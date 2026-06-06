import Task from "../models/Task.model.js";
import Notification from "../models/Notification.model.js";
import { TASK_STATUS, NOTIFICATION_TYPES } from "../utils/constants.js";
import { calculatePriority } from "../utils/priorityHelper.js";

export const createTask =
  async (taskData, userId) => {
    const priority =
      calculatePriority(
        taskData.dueDate
      );

    const task =
      await Task.create({
        ...taskData,
        priority,
        user: userId,
      });

    await Notification.create({
      user: userId,
      type:
        NOTIFICATION_TYPES.TASK_CREATED,
      title: "Task Created",
      message: `${task.title} was created successfully.`,
    });

    return task;
  };

export const getTasks =
  async (
    userId,
    filters
  ) => {
    const query = {
      user: userId,
    };

    if (filters.status) {
      query.status =
        filters.status;
    }

    if (filters.priority) {
      query.priority =
        filters.priority;
    }

    if (filters.search) {
      query.title = {
        $regex:
          filters.search,
        $options: "i",
      };
    }

    return await Task.find(
      query
    ).sort({
      createdAt: -1,
    });
};

export const getTaskById =
  async (
    taskId,
    userId
  ) => {
    return await Task.findOne({
      _id: taskId,
      user: userId,
    });
  };

export const updateTask =
  async (
    taskId,
    taskData,
    userId
  ) => {
    const task =
      await Task.findOne({
        _id: taskId,
        user: userId,
      });

    if (!task) {
      throw new Error(
        "Task not found"
      );
    }

    if (taskData.dueDate) {
      task.priority =
        calculatePriority(
          taskData.dueDate
        );
    }

    Object.assign(
      task,
      taskData
    );

    await task.save();

    await Notification.create({
      user: userId,
      type:
        NOTIFICATION_TYPES.TASK_UPDATED,
      title: "Task Updated",
      message: `${task.title} was updated successfully.`,
    });

    return task;
  };

export const deleteTask =
  async (
    taskId,
    userId
  ) => {
    const task =
      await Task.findOne({
        _id: taskId,
        user: userId,
      });

    if (!task) {
      throw new Error(
        "Task not found"
      );
    }

    await Notification.create({
      user: userId,
      type:
        NOTIFICATION_TYPES.TASK_DELETED,
      title: "Task Deleted",
      message: `${task.title} was deleted.`,
    });

    await task.deleteOne();

    return true;
  };

export const updateTaskStatus =
  async (
    taskId,
    status,
    userId
  ) => {
    const task =
      await Task.findOne({
        _id: taskId,
        user: userId,
      });

    if (!task) {
      throw new Error(
        "Task not found"
      );
    }

    task.status = status;

    await task.save();

    if (
      status ===
      TASK_STATUS.COMPLETED
    ) {
      await Notification.create({
        user: userId,
        type:
          NOTIFICATION_TYPES.TASK_COMPLETED,
        title: "Task Completed",
        message: `${task.title} has been completed.`,
      });
    }

    return task;
  };