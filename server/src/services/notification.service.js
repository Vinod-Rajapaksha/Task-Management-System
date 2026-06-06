import Notification from "../models/Notification.model.js";
import { NOTIFICATION_TYPES } from "../utils/constants.js";

export const createNotification =
  async (
    userId,
    type,
    title,
    message
  ) => {
    return await Notification.create({
      user: userId,
      type,
      title,
      message,
    });
  };

export const getNotifications =
  async (userId) => {
    return await Notification.find({
      user: userId,
    }).sort({
      createdAt: -1,
    });
  };

export const markAsRead =
  async (
    notificationId,
    userId
  ) => {
    const notification =
      await Notification.findOne({
        _id: notificationId,
        user: userId,
      });

    if (!notification) {
      throw new Error(
        "Notification not found"
      );
    }

    notification.isRead = true;

    await notification.save();

    return notification;
  };

export const deleteNotification =
  async (
    notificationId,
    userId
  ) => {
    const notification =
      await Notification.findOne({
        _id: notificationId,
        user: userId,
      });

    if (!notification) {
      throw new Error(
        "Notification not found"
      );
    }

    await notification.deleteOne();

    return true;
  };