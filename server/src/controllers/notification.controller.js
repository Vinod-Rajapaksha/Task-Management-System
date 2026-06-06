import * as notificationService from "../services/notification.service.js";

export const getNotifications = async ( req, res, next ) => {
    try {
      const notifications =
        await notificationService.getNotifications(
          req.user._id
        );

      res.status(200).json({
        success: true,
        count:
          notifications.length,
        notifications,
      });
    } catch (error) {
      next(error);
    }
};

export const markRead = async ( req, res, next ) => {
    try {
      const notification =
        await notificationService.markAsRead(
          req.params.id,
          req.user._id
        );

      res.status(200).json({
        success: true,
        notification,
      });
    } catch (error) {
      next(error);
    }
};

export const deleteNotification = async ( req, res, next ) => {
    try {
      await notificationService.deleteNotification(
        req.params.id,
        req.user._id
      );

      res.status(200).json({
        success: true,
        message:
          "Notification deleted",
      });
    } catch (error) {
      next(error);
    }
};