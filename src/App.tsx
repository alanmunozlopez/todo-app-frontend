import { useState, useEffect, useCallback } from "react";
import { Container, Box, Alert, Snackbar } from "@mui/material";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { taskApi } from "./services/api";
import type { Task, TaskFilter, TaskFormData } from "./types/Task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

  const showSnackbar = (message: string, severity: "success" | "error" = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      let data: Task[];
      
      if (filter === "all") {
        data = await taskApi.getAllTasks();
      } else {
        data = await taskApi.getTasksByType(filter);
      }
      
      setTasks(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load tasks";
      showSnackbar(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleAddTask = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleFormSubmit = async (taskData: TaskFormData) => {
    try {
      setLoading(true);
      
      if (editingTask) {
        await taskApi.updateTask(editingTask.id, taskData);
        showSnackbar("Task updated successfully");
      } else {
        await taskApi.createTask(taskData);
        showSnackbar("Task created successfully");
      }
      
      setFormOpen(false);
      setEditingTask(null);
      await loadTasks();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to save task";
      showSnackbar(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      setLoading(true);
      await taskApi.deleteTask(id);
      showSnackbar("Task deleted successfully");
      await loadTasks();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete task";
      showSnackbar(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box>
        <TaskList
          tasks={tasks}
          loading={loading}
          filter={filter}
          onFilterChange={setFilter}
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
        <TaskForm
          open={formOpen}
          onClose={() => {
            setFormOpen(false);
            setEditingTask(null);
          }}
          onSubmit={handleFormSubmit}
          editingTask={editingTask}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default App;
