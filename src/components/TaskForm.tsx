import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";
import type { Task, TaskFormData } from "../types/Task";

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (taskData: TaskFormData) => void;
  editingTask?: Task | null;
}

export default function TaskForm({
  open,
  onClose,
  onSubmit,
  editingTask,
}: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    name: "",
    dueDate: DateTime.now().toISODate(),
    priority: 3,
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        name: editingTask.name,
        dueDate: DateTime.fromISO(editingTask.dueDate).toISODate() || "",
        priority: editingTask.priority,
      });
    } else {
      setFormData({
        name: "",
        dueDate: DateTime.now().toISODate(),
        priority: 3,
      });
    }
  }, [editingTask, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleDateChange = (date: DateTime | null) => {
    if (date) {
      setFormData({
        ...formData,
        dueDate: date.toISODate() || "",
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{editingTask ? "Edit Task" : "Add New Task"}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1, display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Task Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              fullWidth
              required
              autoFocus
            />

            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <DatePicker
                label="Due Date"
                value={DateTime.fromISO(formData.dueDate)}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                  },
                }}
              />
            </LocalizationProvider>

            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={formData.priority}
                label="Priority"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: Number(e.target.value),
                  })
                }
              >
                <MenuItem value={1}>Very Low</MenuItem>
                <MenuItem value={2}>Low</MenuItem>
                <MenuItem value={3}>Medium</MenuItem>
                <MenuItem value={4}>High</MenuItem>
                <MenuItem value={5}>Critical</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {editingTask ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
