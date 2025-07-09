// Task controller for CRUD logic
import Task from "../models/Task.js";

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }
    const newTask = await Task.create({ title: title.trim() });
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { isCompleted, title } = req.body;
    const updateData = {};
    if (typeof isCompleted !== "undefined")
      updateData.isCompleted = isCompleted;
    if (title && title.trim() !== "") updateData.title = title.trim();
    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
      new: true,
    });
    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};
