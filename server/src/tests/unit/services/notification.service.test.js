import mongoose from "mongoose";
import Notification from "../../../models/Notification.model.js";
import * as notificationService from "../../../services/notification.service.js";
import {
  connectTestDB,
  clearTestDB,
  disconnectTestDB,
} from "../../setup/testDB.js";

describe("Notification Service", () => {
  let userId;

  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  beforeEach(async () => {
    await clearTestDB();
    userId = new mongoose.Types.ObjectId();
  });

  test("should create notification", async () => {
    const result = await notificationService.createNotification(
      userId,
      "task_created",
      "Test",
      "Message"
    );

    expect(result.title).toBe("Test");
  });

  test("should get notifications", async () => {
    await Notification.create({
      user: userId,
      title: "N1",
      message: "Hello",
      type: "task_created",
    });

    const result = await notificationService.getNotifications(userId);

    expect(result.length).toBe(1);
  });

  test("should mark as read", async () => {
    const n = await Notification.create({
      user: userId,
      title: "N1",
      message: "Hello",
      type: "task_created",
      isRead: false,
    });

    const result = await notificationService.markAsRead(
      n._id,
      userId
    );

    expect(result.isRead).toBe(true);
  });

  test("should throw error if markAsRead notification not found", async () => {
    await expect(
      notificationService.markAsRead(
        new mongoose.Types.ObjectId(),
        userId
      )
    ).rejects.toThrow("Notification not found");
  });

  test("should delete notification", async () => {
    const n = await Notification.create({
      user: userId,
      title: "N1",
      message: "Hello",
      type: "task_created",
    });

    const result = await notificationService.deleteNotification(
      n._id,
      userId
    );

    expect(result).toBe(true);
  });

  test("should throw error if deleteNotification not found", async () => {
    await expect(
      notificationService.deleteNotification(
        new mongoose.Types.ObjectId(),
        userId
      )
    ).rejects.toThrow("Notification not found");
  });
});