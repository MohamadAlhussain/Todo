// Task routes
import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// GET all tasks
router.get("/", getTasks);
// POST new task
router.post("/", createTask);
// PUT update task
router.put("/:id", updateTask);
// DELETE task
router.delete("/:id", deleteTask);

export default router;
