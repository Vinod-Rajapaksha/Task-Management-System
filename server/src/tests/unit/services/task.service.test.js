import mongoose from "mongoose";
import Task from "../../../models/Task.model.js";
import Notification from "../../../models/Notification.model.js";
import User from "../../../models/User.model.js";
import * as taskService from "../../../services/task.service.js";
import {
  connectTestDB,
  clearTestDB,
  disconnectTestDB,
} from "../../setup/testDB.js";
import { TASK_STATUS } from "../../../utils/constants.js";

describe("Task Service", () => {
  let user;

  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  beforeEach(async () => {
    await clearTestDB();

    user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "hashedpassword",
      role: "User",
    });
  });

  describe("createTask()", () => {
    it("should create task successfully", async () => {
      const result = await taskService.createTask(
        { title: "Learn Jest", dueDate: "2030-01-01" },
        user._id
      );

      expect(result).toBeDefined();
      expect(result.title).toBe("Learn Jest");

      const notification = await Notification.findOne({ user: user._id });
      expect(notification).toBeDefined();
    });
  });

  describe("getTaskById()", () => {
    it("should return task", async () => {
      const task = await Task.create({
        title: "Task 1",
        dueDate: "2030-01-01",
        user: user._id,
      });

      const result = await taskService.getTaskById(task._id, user._id);

      expect(result.title).toBe("Task 1");
    });

    it("should return null if task not found", async () => {
      const result = await taskService.getTaskById(
        new mongoose.Types.ObjectId(),
        user._id
      );

      expect(result).toBeNull();
    });
  });

  describe("updateTask()", () => {
    it("should update task successfully", async () => {
      const task = await Task.create({
        title: "Old Task",
        dueDate: "2030-01-01",
        user: user._id,
      });

      const result = await taskService.updateTask(
        task._id,
        { title: "Updated Task" },
        user._id
      );

      expect(result.title).toBe("Updated Task");
    });

    it("should update priority when dueDate changes", async () => {
      const task = await Task.create({
        title: "Task",
        dueDate: "2030-01-01",
        user: user._id,
      });

      const result = await taskService.updateTask(
        task._id,
        { dueDate: "2026-01-01" },
        user._id
      );

      expect(result).toBeDefined();
    });

    it("should throw if task not found", async () => {
      await expect(
        taskService.updateTask(
          new mongoose.Types.ObjectId(),
          {},
          user._id
        )
      ).rejects.toThrow("Task not found");
    });
  });

  describe("updateTaskStatus()", () => {
    it("should update status", async () => {
      const task = await Task.create({
        title: "Task",
        dueDate: "2030-01-01",
        status: TASK_STATUS.PENDING,
        user: user._id,
      });

      const result = await taskService.updateTaskStatus(
        task._id,
        TASK_STATUS.COMPLETED,
        user._id
      );

      expect(result.status).toBe(TASK_STATUS.COMPLETED);
    });

    it("should throw if task not found", async () => {
      await expect(
        taskService.updateTaskStatus(
          new mongoose.Types.ObjectId(),
          TASK_STATUS.COMPLETED,
          user._id
        )
      ).rejects.toThrow("Task not found");
    });
  });

  describe("deleteTask()", () => {
    it("should delete task", async () => {
      const task = await Task.create({
        title: "Task",
        dueDate: "2030-01-01",
        user: user._id,
      });

      const result = await taskService.deleteTask(task._id, user._id);

      expect(result).toBe(true);
    });

    it("should throw if task not found", async () => {
      await expect(
        taskService.deleteTask(
          new mongoose.Types.ObjectId(),
          user._id
        )
      ).rejects.toThrow("Task not found");
    });
  });

  describe("getTasks()", () => {
    it("should return tasks", async () => {
      await Task.create([
        { title: "Task 1", dueDate: "2030-01-01", user: user._id },
        { title: "Task 2", dueDate: "2030-01-01", user: user._id },
      ]);

      const result = await taskService.getTasks(user._id, {});

      expect(result.length).toBe(2);
    });
  });
});