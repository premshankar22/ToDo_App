import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import React from "react";

import dayjs from "dayjs";

import { TASK_LIST_ICONS, STATUS_ICONS } from "../../constants/taskOptions";

function CalendarPreviewModal({ event, open, onClose }) {
  if (!event) return null;

  const task = event.task;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>

      {/* TITLE */}

      <DialogTitle sx={{ fontWeight: 600 }}>
        {task.title}
      </DialogTitle>

      <DialogContent>

        {/* STATUS + PRIORITY */}

        <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>

          {task.status && STATUS_ICONS[task.status] && (
            <Meta
              icon={STATUS_ICONS[task.status].icon}
              text={STATUS_ICONS[task.status].label}
            />
          )}

          {task.priority && (
            <Meta
              icon={TASK_LIST_ICONS.priority}
              text={`Priority: ${task.priority}`}
              color={
                task.priority === "High"
                  ? "#ef4444"
                  : task.priority === "Medium"
                  ? "#f59e0b"
                  : "#22c55e"
              }
            />
          )}

        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* META INFORMATION */}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>

          {task.dueDate && (
            <Meta
              icon={TASK_LIST_ICONS.dueDate}
              text={`Due: ${dayjs(task.dueDate).format("DD MMM YYYY")}`}
            />
          )}

          {task.reminder && (
            <Meta
              icon={TASK_LIST_ICONS.reminder}
              text={`Reminder: ${dayjs(task.reminder).format(
                "DD MMM YYYY HH:mm"
              )}`}
            />
          )}

          {task.category && (
            <Meta
              icon={TASK_LIST_ICONS.category}
              text={`Category: ${task.category}`}
            />
          )}

          {task.note && (
            <Meta
              icon={TASK_LIST_ICONS.note}
              text={`Note: ${task.note}`}
            />
          )}

          {Array.isArray(task.files) && task.files.length > 0 && (
            <Meta
              icon={TASK_LIST_ICONS.file}
              text={`Files: ${task.files.length}`}
            />
          )}

        </Box>

        <Divider sx={{ my: 2 }} />

        {/* CREATED INFO */}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>

          {task.createdAt && (
            <Typography fontSize={12} color="#64748b">
              Created: {dayjs(task.createdAt).format("DD MMM YYYY HH:mm")}
            </Typography>
          )}

          {task.updatedAt && (
            <Typography fontSize={12} color="#64748b">
              Updated: {dayjs(task.updatedAt).format("DD MMM YYYY HH:mm")}
            </Typography>
          )}

        </Box>

      </DialogContent>
    </Dialog>
  );
}

/* ---------- META ITEM ---------- */

function Meta({ icon, text, color }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        color: color || "#475569",
      }}
    >
      {React.isValidElement(icon)
        ? icon
        : icon && React.createElement(icon, { sx: { fontSize: 18 } })}

      <Typography fontSize={13}>
        {text}
      </Typography>
    </Box>
  );
}
export default CalendarPreviewModal;