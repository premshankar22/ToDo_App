import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";
import taskApi from "../../api/task/taskApi";

function TaskDates({ task, setTask, selectedTaskId }) {
  return (
    <>
      {/* DUE DATE */}

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <EventOutlinedIcon fontSize="small" />

            <Typography fontSize={13}>
              {task?.dueDate
                ? dayjs(task.dueDate).format("DD MMM YYYY")
                : "Due Date"}
            </Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={task?.dueDate ? dayjs(task.dueDate) : null}
              onChange={async (value) => {
                await taskApi.updateTask(selectedTaskId, {
                  dueDate: value.toISOString(),
                });

                setTask({ ...task, dueDate: value });
              }}
            />
          </LocalizationProvider>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <NotificationsNoneOutlinedIcon fontSize="small" />

            <Typography fontSize={13}>
              {task?.reminder
                ? dayjs(task.reminder).format("DD MMM YYYY HH:mm")
                : "Reminder"}
            </Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={task?.reminder ? dayjs(task.reminder) : null}
              onChange={async (value) => {
                await taskApi.updateTask(selectedTaskId, {
                  reminder: value.toISOString(),
                });

                setTask({ ...task, reminder: value });
              }}
            />
          </LocalizationProvider>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default TaskDates;
