import {
  List,
  ListItem,
  Checkbox,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";

import { STATUS_ICONS, TASK_LIST_ICONS } from "../constants/taskOptions";
import dayjs from "dayjs";
import { useTaskSidebar } from "../context/TaskSidebarContext";

function TaskList({ tasks }) {
  const { openTaskSidebar } = useTaskSidebar();

  return (
    <List sx={{ width: "100%" }}>
      {tasks.map((task) => (
        <ListItem
          key={task.taskId}
          onClick={() => openTaskSidebar(task.taskId)}
          sx={{
            borderBottom: "1px solid #f1f5f9",
            alignItems: "flex-start",
            py: 1.5,
            cursor: "pointer",
          }}
        >
          {/* CHECKBOX */}

          <Checkbox checked={task.completed} size="small" sx={{ mr: 1 }} />

          {/* TASK CONTENT */}

          <Box sx={{ flex: 1 }}>
            {/* TITLE + PRIORITY */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.title}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {/* PRIORITY */}

                {task.priority && (
                  <Tooltip title={`Priority: ${task.priority}`}>
                    <TASK_LIST_ICONS.priority
                      sx={{
                        fontSize: 18,
                        color:
                          task.priority === "High"
                            ? "#ef4444"
                            : task.priority === "Medium"
                              ? "#f59e0b"
                              : "#22c55e",
                      }}
                    />
                  </Tooltip>
                )}

                {/* STATUS */}

                {task.status && STATUS_ICONS[task.status] && (
                  <Tooltip title={STATUS_ICONS[task.status].label}>
                    {STATUS_ICONS[task.status].icon}
                  </Tooltip>
                )}
              </Box>
            </Box>

            {/* TASK META */}

            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 0.7,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {task.dueDate && (
                <Meta
                  icon={TASK_LIST_ICONS.dueDate}
                  text={dayjs(task.dueDate).format("DD MMM YYYY")}
                />
              )}

              {task.reminder && (
                <Meta
                  icon={TASK_LIST_ICONS.reminder}
                  text={dayjs(task.reminder).format("DD MMM YYYY HH:mm")}
                />
              )}

              {task.note && <Meta icon={TASK_LIST_ICONS.note} text="Note" />}

              {task.category && (
                <Meta icon={TASK_LIST_ICONS.category} text={task.category} />
              )}

              {Array.isArray(task.files) && task.files.length > 0 && (
                <FileMeta count={task.files.length} />
              )}
            </Box>
          </Box>
        </ListItem>
      ))}
    </List>
  );
}

function Meta({ icon, text }) {
  const IconComponent = icon;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        color: "#64748b",
      }}
    >
      <IconComponent sx={{ fontSize: 16 }} />

      <Typography
        sx={{
          fontSize: 12,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

function FileMeta({ count }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        color: "#64748b",
      }}
    >
      <TASK_LIST_ICONS.file sx={{ fontSize: 16 }} />

      <Typography sx={{ fontSize: 12 }}>File Upload ({count})</Typography>
    </Box>
  );
}

export default TaskList;
