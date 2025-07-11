import {
  Box,
  Typography,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import TaskItem from "./TaskItem";
import type { Task, TaskFilter } from "../types/Task";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
}

export default function TaskList({
  tasks,
  loading,
  filter,
  onFilterChange,
  onEditTask,
  onDeleteTask,
}: TaskListProps) {
  const getFilteredTasks = () => {
    switch (filter) {
      case "pending":
        return tasks.filter((task) => !task.isOverdue);
      case "overdue":
        return tasks.filter((task) => task.isOverdue);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h1">
          My Tasks
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Task
        </Button>
      </Stack>

      <Box mb={3}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(_, newFilter) => {
            if (newFilter !== null) {
              onFilterChange(newFilter);
            }
          }}
          size="small"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="pending">Pending</ToggleButton>
          <ToggleButton value="overdue">Overdue</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : filteredTasks.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            No tasks found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {filter === "all"
              ? "Create your first task to get started"
              : `No ${filter} tasks`}
          </Typography>
        </Box>
      ) : (
        <Box>
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
