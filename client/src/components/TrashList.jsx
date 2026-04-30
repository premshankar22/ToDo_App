import {
  List,
  ListItem,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";

import { TRASH_ICONS } from "../constants/taskOptions";

import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function TrashList({ tasks, restoreTask, deleteForever }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%" }}>
      {/* ---------- HEADER ---------- */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {TRASH_ICONS.header}
            Trash
          </Typography>

          <Typography sx={{ fontSize: 13, color: "#64748b" }}>
            Deleted tasks can be restored or permanently removed.
          </Typography>
        </Box>

        {/* CLOSE BUTTON */}

        <IconButton
          size="small"
          onClick={() => navigate("/tasks")}
          sx={{
            color: "#64748b",
            "&:hover": { background: "#f1f5f9" },
          }}
        >
          {TRASH_ICONS.close}
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* ---------- EMPTY STATE ---------- */}

      {tasks.length === 0 && (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Typography sx={{ fontSize: 14, color: "#94a3b8" }}>
            Trash is empty
          </Typography>
        </Box>
      )}

      {/* ---------- TRASH LIST ---------- */}

      <List sx={{ width: "100%" }}>
        {tasks.map((task) => (
          <ListItem
            key={task.taskId}
            sx={{
              borderBottom: "1px solid #f1f5f9",
              py: 1.5,
              alignItems: "center",
            }}
          >
            {/* TASK INFO */}

            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                {task.title}
              </Typography>

              {task.deletedAt && (
                <Typography
                  sx={{
                    fontSize: 11,
                    color: "#94a3b8",
                    mt: 0.3,
                  }}
                >
                  Deleted {dayjs(task.deletedAt).format("DD MMM YYYY • HH:mm")}
                </Typography>
              )}
            </Box>

            {/* ACTION BUTTONS */}

            <Box sx={{ display: "flex", gap: 1 }}>
              {/* RESTORE */}

              <Tooltip title="Restore Task">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => restoreTask(task.taskId)}
                >
                  {TRASH_ICONS.restore}
                </IconButton>
              </Tooltip>

              {/* DELETE FOREVER */}

              <Tooltip title="Delete Permanently">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => deleteForever(task.taskId)}
                >
                  {TRASH_ICONS.deleteForever}
                </IconButton>
              </Tooltip>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default TrashList;
