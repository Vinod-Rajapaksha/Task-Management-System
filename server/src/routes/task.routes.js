import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  updateStatus,
} from "../controllers/task.controller.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .post(createTask)
  .get(getTasks);

router.route("/:id")
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

router.patch(
  "/:id/status",
  updateStatus
);

export default router;