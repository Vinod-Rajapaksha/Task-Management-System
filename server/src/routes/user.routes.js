import express from "express";
import { getUsers, getUser, deleteUser } from "../controllers/user.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, admin, getUsers);
router.get("/:id", protect, admin, getUser);
router.delete("/:id", protect, admin, deleteUser);

export default router;