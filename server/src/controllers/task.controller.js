import * as taskService from "../services/task.service.js";

export const createTask = async ( req, res, next ) => {
    try {
      const task =
        await taskService.createTask(
          req.validatedData.body,
          req.user._id
        );

      res.status(201).json({
        success: true,
        task,
      });
    } catch (error) {
      next(error);
    }
};

export const getTasks = async ( req, res, next ) => {
    try {
      const tasks =
        await taskService.getTasks(
          req.user._id,
          req.query
        );

      res.status(200).json({
        success: true,
        count: tasks.length,
        tasks,
      });
    } catch (error) {
      next(error);
    }
};

export const getTask = async ( req, res, next ) => {
    try {
      const task =
        await taskService.getTaskById(
          req.validatedData.params.id,
          req.user._id
        );

      if (!task) {
        res.status(404);
        throw new Error(
          "Task not found"
        );
      }

      res.status(200).json({
        success: true,
        task,
      });
    } catch (error) {
      next(error);
    }
};

export const updateTask = async ( req, res, next ) => {
    try {
      console.log(req.params);
      console.log(req.validatedData);
      
      const task =
        await taskService.updateTask(
          req.params.id,
          req.body, 
          req.user._id
        );

      res.status(200).json({
        success: true,
        task,
      });
    } catch (error) {
      next(error);
    }
};

export const deleteTask = async ( req, res, next ) => {
    try {
      await taskService.deleteTask(
        req.validatedData.params.id,
        req.user._id
      );

      res.status(200).json({
        success: true,
        message:
          "Task deleted successfully",
      });
    } catch (error) {
      next(error);
    }
};

export const updateStatus = async ( req, res, next ) => {
    try {
      const task =
        await taskService.updateTaskStatus(
          req.validatedData.params.id,
          req.validatedData.body.status,
          req.user._id
        );

      res.status(200).json({
        success: true,
        task,
      });
    } catch (error) {
      next(error);
    }
};