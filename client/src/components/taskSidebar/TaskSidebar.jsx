import { useState } from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import useTaskSidebarLogic from "../../hooks/useTaskSidebarLogic";

import TaskPriorityStatus from "./TaskPriorityStatus";
import TaskDates from "./TaskDates";
import TaskCategory from "./TaskCategory";
import TaskFiles from "./TaskFiles";
import TaskNote from "./TaskNote";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function TaskSidebar() {
  const logic = useTaskSidebarLogic();
  const [openDelete, setOpenDelete] = useState(false);

  const { task, selectedTaskId, closeTaskSidebar, deleteTask } = logic;

  return (
    <>
      <Box
        sx={{
          width: 360,
          height: "100%",
          background: "#ffffff",
          borderLeft: "1px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* HEADER */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 1.5,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Typography fontWeight={600} fontSize={15}>
            Task Details
          </Typography>

          <IconButton size="small" onClick={closeTaskSidebar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* CONTENT */}

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            px: 2,
            py: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,

            "&::-webkit-scrollbar": {
              width: "6px",
            },

            "&::-webkit-scrollbar-thumb": {
              background: "#d1d5db",
              borderRadius: "10px",
            },
          }}
        >
          {/* TITLE */}

          <Box>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 600,
                lineHeight: 1.4,
                letterSpacing: "0.2px",
                color: "#0f172a",
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              {task?.title || "Untitled Task"}
            </Typography>
          </Box>

          {/* PRIORITY + STATUS */}

          <TaskPriorityStatus {...logic} />

          {/* DATES */}

          <TaskDates {...logic} />

          {/* CATEGORY */}

          <TaskCategory {...logic} />

          {/* FILES */}

          <TaskFiles {...logic} />

          {/* NOTE */}

          <TaskNote {...logic} />
        </Box>

        {/* FOOTER */}

        <Box
          sx={{
            borderTop: "1px solid #e5e7eb",
            px: 2,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          {/* TASK ID */}

          <Typography
            sx={{
              fontSize: 12,
              color: "#64748b",
              fontFamily: "monospace",
            }}
          >
            {selectedTaskId || "No Task Selected"}
          </Typography>

          {/* DELETE BUTTON */}

          <IconButton
            size="small"
            onClick={() => setOpenDelete(true)}
            sx={{
              color: "#ef4444",
              "&:hover": {
                background: "#fef2f2",
              },
            }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Move Task to Trash?</DialogTitle>

        <DialogContent>
          <Typography fontSize={14}>
            This task will be moved to Trash. You can restore it later.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>

          <Button
            color="error"
            onClick={() => {
              deleteTask();
              setOpenDelete(false);
            }}
          >
            Move to Trash
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TaskSidebar;
