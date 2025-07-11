import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Stack,
  type ChipProps,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import type { Task } from "../types/Task";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const getPriorityColor = (priority: number): ChipProps["color"] => {
  switch (priority) {
    case 5:
      return "error";
    case 4:
      return "warning";
    case 3:
      return "info";
    case 2:
      return "success";
    case 1:
    default:
      return "default";
  }
};

const getPriorityLabel = (priority: number) => {
  switch (priority) {
    case 5:
      return "Critical";
    case 4:
      return "High";
    case 3:
      return "Medium";
    case 2:
      return "Low";
    case 1:
    default:
      return "Very Low";
  }
};

export default function TaskItem({ task, onDelete }: TaskItemProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card
      sx={{
        mb: 2,
        backgroundColor: task.isOverdue ? "#ffebee" : "background.paper",
        border: task.isOverdue ? "1px solid #f44336" : "none",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
        >
          <Box flex={1}>
            <Stack direction="row" alignItems="center" gap={1} mb={1}>
              {task.isOverdue && <WarningIcon color="error" fontSize="small" />}
              <Typography variant="h6" component="h3">
                {task.name}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" gap={2} mb={1}>
              <Typography variant="body2" color="text.secondary">
                Due: {formatDate(task.dueDate)}
              </Typography>
              <Chip
                label={getPriorityLabel(task.priority)}
                color={getPriorityColor(task.priority)}
                size="small"
              />
            </Stack>

            {task.isOverdue && (
              <Typography variant="caption" color="error">
                This task is overdue
              </Typography>
            )}
          </Box>

          <Box>
            <IconButton color="primary" size="small">
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => onDelete(task.id)}
              color="error"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
