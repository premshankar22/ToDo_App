import {
  Box,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  ADD_TASK_ICONS,
  TASK_FILE_ICONS,
  QUICK_DATE_OPTIONS,
  PRIORITY_MENU_OPTIONS,
} from "../constants/taskOptions";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import dayjs from "dayjs";
import { useState } from "react";
import taskApi from "../api/task/taskApi";

const purple = "#7c3aed";

function Add({ refreshTasks }) {
  const [title, setTitle] = useState("");
  const [dateMenu, setDateMenu] = useState(null);
  const [priorityMenu, setPriorityMenu] = useState(null);

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [priority, setPriority] = useState(null);

  const [reminderMenu, setReminderMenu] = useState(null);
  const [reminderDate, setReminderDate] = useState(null);
  const [reminderTime, setReminderTime] = useState(dayjs());

  const openReminder = (e) => setReminderMenu(e.currentTarget);
  const closeReminder = () => setReminderMenu(null);

  const saveReminder = () => {
    if (!reminderDate) return;

    closeReminder();
  };

  const openDateMenu = Boolean(dateMenu);
  const openPriorityMenu = Boolean(priorityMenu);

  const openDate = (e) => setDateMenu(e.currentTarget);
  const closeDate = () => {
    setDateMenu(null);
    setShowCalendar(false);
  };

  const openPriority = (e) => setPriorityMenu(e.currentTarget);
  const closePriority = () => setPriorityMenu(null);

  const setQuickDate = (type) => {
    let date;

    if (type === "today") date = dayjs();
    if (type === "tomorrow") date = dayjs().add(1, "day");
    if (type === "week") date = dayjs().add(7, "day");

    setSelectedDate(date);
    closeDate();
  };

  const saveDate = () => closeDate();

  const selectPriority = (level) => {
    const map = {
      high: "High",
      medium: "Medium",
      low: "Low",
    };

    setPriority(map[level]);
    closePriority();
  };

  const handleAddTask = async () => {
    if (!title.trim()) return;

    try {
      const payload = {
        title,
      };

      if (priority) {
        payload.priority = priority;
      }

      if (selectedDate) {
        payload.dueDate = selectedDate.toISOString();
      }

      if (reminderDate && reminderTime) {
        const reminder = reminderDate
          .hour(reminderTime.hour())
          .minute(reminderTime.minute())
          .second(0)
          .toISOString();

        payload.reminder = reminder;
      }

      await taskApi.createTask(payload);

      refreshTasks();
      // reset form
      setTitle("");
      setSelectedDate(null);
      setReminderDate(null);
      setPriority(null);
    } catch (error) {
      console.error("Create task error:", error);
    }
  };

  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        borderBottom: "1px solid #f1f5f9",
        background: "#ffffff",
      }}
    >
      <Accordion
        disableGutters
        elevation={0}
        sx={{
          border: "1px solid #e2e8f0",
          borderRadius: 2,
          "&:before": { display: "none" },
        }}
      >
        {/* HEADER */}

        <AccordionSummary expandIcon={TASK_FILE_ICONS.expand}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {ADD_TASK_ICONS.add}
            <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
              Add Task
            </Typography>
          </Box>
        </AccordionSummary>

        {/* CONTENT */}

        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* TEXT AREA */}

            <TextField
              placeholder="What needs to be done?"
              multiline
              minRows={3}
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* SELECTED META PREVIEW */}

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {selectedDate && (
                <Typography fontSize={13} color="#64748b">
                  📅 {selectedDate.format("DD MMM YYYY")}
                </Typography>
              )}

              {reminderDate && reminderTime && (
                <Typography fontSize={13} color="#64748b">
                  ⏰ {reminderDate.format("DD MMM")}{" "}
                  {reminderTime.format("HH:mm")}
                </Typography>
              )}

              {priority && (
                <Typography fontSize={13} color="#64748b">
                  🚩 {priority}
                </Typography>
              )}
            </Box>

            {/* ICON OPTIONS */}

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* DUE DATE */}

              <Tooltip title="Add Due Date">
                <IconButton size="small" onClick={openDate}>
                  {ADD_TASK_ICONS.reminder}
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={dateMenu}
                open={openDateMenu}
                onClose={closeDate}
                PaperProps={{
                  sx: { width: 230, borderRadius: 2 },
                }}
              >
                {/* QUICK OPTIONS */}

                {!showCalendar && (
                  <Box>
                    <Typography
                      sx={{
                        px: 2,
                        pt: 1,
                        pb: 0.5,
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#64748b",
                      }}
                    >
                      Due
                    </Typography>

                    {QUICK_DATE_OPTIONS?.map((item) => (
                      <MenuItem
                        key={item.value}
                        onClick={() => setQuickDate(item.value)}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>

                        {item.label}
                      </MenuItem>
                    ))}

                    <Divider />

                    <MenuItem onClick={() => setShowCalendar(true)}>
                      <ListItemIcon>{ADD_TASK_ICONS.pickDate}</ListItemIcon>
                      Pick a Date
                    </MenuItem>
                  </Box>
                )}

                {/* CALENDAR */}

                {showCalendar && (
                  <Box sx={{ px: 1, py: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        sx={{
                          width: 210,
                          "& .MuiPickersDay-root": {
                            fontSize: "0.8rem",
                          },
                        }}
                      />
                    </LocalizationProvider>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        px: 1,
                        pb: 1,
                      }}
                    >
                      <Button
                        size="small"
                        variant="contained"
                        onClick={saveDate}
                        sx={{
                          textTransform: "none",
                          background: purple,
                        }}
                      >
                        Save
                      </Button>
                    </Box>
                  </Box>
                )}
              </Menu>

              {/* REMINDER */}

              <Tooltip title="Remind Me">
                <IconButton size="small" onClick={openReminder}>
                  <NotificationsNoneOutlinedIcon />
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={reminderMenu}
                open={Boolean(reminderMenu)}
                onClose={closeReminder}
                PaperProps={{
                  sx: {
                    width: 240,
                    borderRadius: 2,
                    p: 1,
                  },
                }}
              >
                <Typography
                  sx={{
                    px: 1,
                    pb: 1,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#64748b",
                  }}
                >
                  Reminder
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* SMALL CALENDAR */}

                  <DateCalendar
                    value={reminderDate}
                    onChange={(newValue) => setReminderDate(newValue)}
                    sx={{
                      width: 210,
                      "& .MuiPickersDay-root": {
                        fontSize: "0.75rem",
                      },
                    }}
                  />

                  {/* TIME PICKER */}

                  <Box sx={{ px: 1, mt: 1 }}>
                    <TimePicker
                      value={reminderTime}
                      onChange={(value) => setReminderTime(value)}
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                        },
                      }}
                    />
                  </Box>
                </LocalizationProvider>

                {/* SAVE BUTTON */}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    px: 1,
                    pt: 1,
                  }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={ADD_TASK_ICONS.alarm}
                    onClick={saveReminder}
                    sx={{
                      textTransform: "none",
                      background: purple,
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </Menu>

              {/* PRIORITY MENU */}

              <Tooltip title="Set Priority">
                <IconButton size="small" onClick={openPriority}>
                  {ADD_TASK_ICONS.flag}
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={priorityMenu}
                open={openPriorityMenu}
                onClose={closePriority}
                PaperProps={{ sx: { width: 180, borderRadius: 2 } }}
              >
                {PRIORITY_MENU_OPTIONS.map((item) => (
                  <MenuItem
                    key={item.value}
                    onClick={() => selectPriority(item.value)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* ADD BUTTON */}

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                startIcon={ADD_TASK_ICONS.add}
                onClick={handleAddTask}
                sx={{
                  textTransform: "none",
                  background: purple,
                  "&:hover": { background: "#6d28d9" },
                }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default Add;
