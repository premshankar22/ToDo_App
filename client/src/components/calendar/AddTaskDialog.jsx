import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";

import taskApi from "../../api/task/taskApi";

function AddTaskDialog({ open, date, onClose, refresh }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = async () => {
    if (!title.trim()) return;

    try {
      await taskApi.createTask({
        title,
        status: "pending",
        priority: priority
          ? priority.charAt(0).toUpperCase() + priority.slice(1)
          : null,
        dueDate: new Date(date).toISOString(),
      });

      setTitle("");
      setPriority("");

      refresh();
      onClose();
    } catch (err) {
      console.error("Task create error:", err.response?.data || err.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Add Task</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />

          <TextField
            select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            fullWidth
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </TextField>

          <TextField
            label="Due date"
            value={date ? new Date(date).toDateString() : ""}
            disabled
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={handleSubmit}>
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTaskDialog;
