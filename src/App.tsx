import { useState } from "react";
import { Container, Box } from "@mui/material";
import { DateTime } from "luxon";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import type { Task, TaskFilter, TaskFormData } from "./types/Task";

const mockTasks: Task[] = [
  {
    id: 1,
    name: "Comprar pan",
    dueDate: "2024-12-20T00:00:00Z",
    priority: 4,
    createdAt: "2024-12-01T10:00:00Z",
    updatedAt: "2024-12-01T10:00:00Z",
    isOverdue: false,
  },
  {
    id: 2,
    name: "Hacer ejercicio",
    dueDate: "2024-11-15T00:00:00Z",
    priority: 5,
    createdAt: "2024-11-01T09:00:00Z",
    updatedAt: "2024-11-01T09:00:00Z",
    isOverdue: true,
  },
  {
    id: 3,
    name: "Hacer la cena",
    dueDate: "2024-12-25T00:00:00Z",
    priority: 2,
    createdAt: "2024-12-01T14:00:00Z",
    updatedAt: "2024-12-01T14:00:00Z",
    isOverdue: false,
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading] = useState(false);

  const handleAddTask = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleFormSubmit = (taskData: TaskFormData) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                name: taskData.name,
                dueDate: DateTime.fromISO(taskData.dueDate).toISO() || taskData.dueDate,
                priority: taskData.priority,
                updatedAt: DateTime.now().toISO(),
              }
            : task
        )
      );
    } else {
      const newTask: Task = {
        id: Math.max(...tasks.map((t) => t.id)) + 1,
        name: taskData.name,
        dueDate: DateTime.fromISO(taskData.dueDate).toISO() || taskData.dueDate,
        priority: taskData.priority,
        createdAt: DateTime.now().toISO(),
        updatedAt: DateTime.now().toISO(),
        isOverdue: DateTime.fromISO(taskData.dueDate) < DateTime.now(),
      };
      setTasks((prev) => [...prev, newTask]);
    }
    setFormOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
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
      </Box>
    </Container>
  );
}

export default App;
