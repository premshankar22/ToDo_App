import {
  Box,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip,
  Button,
} from "@mui/material";

import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "../../constants/taskOptions";

function TaskPriorityStatus({
  priority,
  status,
  priorityMenu,
  statusMenu,
  setPriorityMenu,
  setStatusMenu,
  selectPriority,
  selectStatus,
}) {
  const openPriority = (e) => setPriorityMenu(e.currentTarget);
  const closePriority = () => setPriorityMenu(null);

  const openStatus = (e) => setStatusMenu(e.currentTarget);
  const closeStatus = () => setStatusMenu(null);

  const currentStatus = STATUS_OPTIONS.find((s) => s.value === status);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
        mt: 2,
        alignItems: "center",
      }}
    >
      {/* ---------------- PRIORITY ---------------- */}

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          sx={{
            fontSize: 13,
            color: "#64748b",
            fontWeight: 500,
          }}
        >
          Priority
        </Typography>

        <Tooltip title="Change Priority">
          <Button
            onClick={openPriority}
            size="small"
            startIcon={<FlagOutlinedIcon />}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 1.5,
              fontSize: 12,
              color:
                priority === "High"
                  ? "#ef4444"
                  : priority === "Medium"
                    ? "#f59e0b"
                    : priority === "Low"
                      ? "#22c55e"
                      : "#64748b",
              background: "#f8fafc",
              "&:hover": {
                background: "#f1f5f9",
              },
            }}
          >
            {priority || "None"}
          </Button>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={priorityMenu}
        open={Boolean(priorityMenu)}
        onClose={closePriority}
        PaperProps={{ sx: { width: 180, borderRadius: 2 } }}
      >
        {PRIORITY_OPTIONS.map((item) => (
          <MenuItem key={item.value} onClick={() => selectPriority(item.value)}>
            <ListItemIcon>{item.icon}</ListItemIcon>

            {item.label}
          </MenuItem>
        ))}
      </Menu>

      {/* ---------------- STATUS ---------------- */}

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          sx={{
            fontSize: 13,
            color: "#64748b",
            fontWeight: 500,
          }}
        >
          Status
        </Typography>

        <Tooltip title="Change Status">
          <Button
            onClick={openStatus}
            size="small"
            startIcon={
              currentStatus ? (
                currentStatus.icon
              ) : (
                <PendingActionsIcon sx={{ color: "#94a3b8" }} />
              )
            }
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 1.5,
              fontSize: 12,
              background: "#f8fafc",
              "&:hover": {
                background: "#f1f5f9",
              },
            }}
          >
            {currentStatus?.label || "Pending"}
          </Button>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={statusMenu}
        open={Boolean(statusMenu)}
        onClose={closeStatus}
        PaperProps={{ sx: { width: 200, borderRadius: 2 } }}
      >
        {STATUS_OPTIONS.map((item) => (
          <MenuItem key={item.value} onClick={() => selectStatus(item.value)}>
            <ListItemIcon>{item.icon}</ListItemIcon>

            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default TaskPriorityStatus;
