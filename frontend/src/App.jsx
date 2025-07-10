// Main Todo App component. Handles state, API calls, and UI rendering.
import { useState, useEffect } from "react";
import axios from "axios";

// API endpoint for tasks
const API_URL = "https://todo-qnbf.onrender.com/api/tasks";

// Allow credentials in requests
// axios.defaults.withCredentials = true;

// Add icon
const AddIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);
// Edit icon
const EditIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);
// Delete icon
const DeleteIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);
// Check icon
const CheckIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);
// Loading spinner
const LoadingSpinner = () => (
  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

//Main App Component

function App() {
  // State
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState({ id: "", title: "" });

  // Fetch all tasks from backend
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        headers: { "Content-Type": "application/json" },
      });
      setTasks(response.data);
      setError(null);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch tasks. Please check if the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      setLoading(true);
      const response = await axios.post(
        API_URL,
        { title: newTask },
        { headers: { "Content-Type": "application/json" } }
      );
      setTasks([...tasks, response.data]);
      setNewTask("");
      setError(null);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create task. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete a task by ID
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      setTasks(tasks.filter((task) => task._id !== id));
      setError(null);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete task. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Toggle task completion
  const handleToggle = async (id, isCompleted) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${API_URL}/${id}`,
        { isCompleted: !isCompleted },
        { headers: { "Content-Type": "application/json" } }
      );
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      setError(null);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update task. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Open edit dialog for a task
  const handleEditClick = (task) => {
    setEditingTask({ id: task._id, title: task.title });
    setEditDialogOpen(true);
  };

  // Submit task edits
  const handleEditSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${API_URL}/${editingTask.id}`,
        { title: editingTask.title },
        { headers: { "Content-Type": "application/json" } }
      );
      setTasks(
        tasks.map((task) =>
          task._id === editingTask.id ? response.data : task
        )
      );
      setEditDialogOpen(false);
      setError(null);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update task. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  /**
   * Main UI Render
   * This section contains all the JSX that makes up the user interface
   */
  return (
    // Main container with soft neutral background and responsive padding
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-300 to-primary-500">
      {/* Center the content with max width for better readability */}
      <div className="max-w-md mx-auto">
        {/* Main Container - Clean white card */}
        <div className="bg-background-800 shadow-4xl p-6 animate-fade-in min-h-screen">
          {/* Header Section */}
          <div className="text-center mb-8">
            {/* Removed the To-Do App title */}
            {/* Task Statistics Counters remain unchanged */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Total Tasks Counter */}
              <div className="counter-card bg-primary-200 border border-primary-300">
                <div className="text-2xl font-bold text-primary-800">
                  {tasks.length}
                </div>
                <div className="text-xs text-primary-800 font-medium">
                  Total Tasks
                </div>
              </div>
              {/* Open Tasks Counter */}
              <div className="counter-card bg-primary-300 border border-primary-400">
                <div className="text-2xl font-bold text-primary-900">
                  {tasks.filter((task) => !task.isCompleted).length}
                </div>
                <div className="text-xs text-primary-900 font-medium">
                  Open Tasks
                </div>
              </div>
              {/* Completed Tasks Counter */}
              <div className="counter-card bg-primary-400 border border-primary-500">
                <div className="text-2xl font-bold text-white">
                  {tasks.filter((task) => task.isCompleted).length}
                </div>
                <div className="text-xs text-white font-medium">Completed</div>
              </div>
            </div>
          </div>

          {/* Add Task Form Section */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-3">
              {/* Task input field */}
              <input
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                disabled={loading} // Disable input when loading
                className="input-field flex-1"
              />

              {/* Add button */}
              <button
                type="submit"
                disabled={!newTask.trim() || loading} // Disable if input is empty or loading
                className="btn-primary flex items-center gap-2 min-w-[120px] h-[52px]"
              >
                {loading ? <LoadingSpinner /> : <AddIcon />}
                Add
              </button>
            </div>
          </form>

          {/* Tasks List Section */}
          {loading && tasks.length === 0 ? (
            // Show loading spinner when fetching initial tasks
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner />
            </div>
          ) : (
            // Render the list of tasks
            <div className="space-y-3">
              {tasks.map((task, index) => (
                // Individual task item with staggered animation
                <div
                  key={task._id}
                  className={`task-item animate-slide-up`}
                  style={{ animationDelay: `${index * 50}ms` }} // Stagger animation
                >
                  <div className="flex items-start gap-3">
                    {/* Checkbox - Toggle task completion */}
                    <button
                      onClick={() => handleToggle(task._id, task.isCompleted)}
                      disabled={loading}
                      className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                        task.isCompleted
                          ? "bg-gradient-to-r from-primary-400 to-primary-600 border-primary-400 text-white shadow-lg" // Completed state
                          : "border-accent-300 hover:border-primary-400 dark:border-slate-600 hover:shadow-md" // Incomplete state
                      }`}
                    >
                      {task.isCompleted && <CheckIcon />}
                    </button>

                    {/* Task Content - Title and timestamps */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium transition-all duration-200 ${
                          task.isCompleted
                            ? "task-completed" // Strikethrough for completed tasks
                            : "text-primary-900"
                        }`}
                      >
                        {task.title}
                      </p>

                      {/* Task timestamps */}
                      <div className="text-xs text-accent-900 dark:text-slate-900 mt-1">
                        <div>Created: {formatDate(task.createdAt)}</div>
                        {/* Only show updated timestamp if different from created */}
                        {task.updatedAt !== task.createdAt && (
                          <div>Updated: {formatDate(task.updatedAt)}</div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons - Edit and Delete */}
                    <div className="flex gap-1">
                      {/* Edit button */}
                      <button
                        onClick={() => handleEditClick(task)}
                        disabled={loading}
                        className="p-2 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200 hover:shadow-md"
                        title="Edit task"
                      >
                        <EditIcon />
                      </button>

                      {/* Delete button */}
                      <button
                        onClick={() => handleDelete(task._id)}
                        disabled={loading}
                        className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200 hover:shadow-md"
                        title="Delete task"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State - Show when no tasks exist */}
          {!loading && tasks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 animate-float">📝</div>
              <p className="text-accent-600 dark:text-accent-400">
                No tasks yet. Add your first task above!
              </p>
            </div>
          )}
        </div>

        {/* Edit Dialog - Modal for editing tasks */}
        {editDialogOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white/95 dark:bg-slate-800/95 rounded-xl p-6 w-full max-w-md animate-bounce-in backdrop-blur-md border border-white/20 dark:border-slate-700/50 shadow-2xl">
              <h2 className="text-xl font-semibold text-accent-900 dark:text-white mb-4">
                Edit Task
              </h2>

              {/* Edit input field */}
              <input
                type="text"
                value={editingTask.title}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, title: e.target.value })
                }
                className="input-field mb-6"
                placeholder="Task title"
                autoFocus
              />

              {/* Dialog action buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setEditDialogOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSubmit}
                  disabled={!editingTask.title.trim()}
                  className="btn-primary"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Toast - Display error messages */}
        {error && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
            <div className="bg-gradient-to-r from-error-500 to-error-600 text-white px-6 py-3 rounded-lg shadow-2xl max-w-md backdrop-blur-md border border-error-400/50">
              <div className="flex items-center gap-2">
                {/* Error icon */}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                {/* Error message */}
                <span className="text-sm font-medium">{error}</span>

                {/* Close button */}
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-white hover:text-error-100 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
