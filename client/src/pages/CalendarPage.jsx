import { useEffect, useState, useCallback } from "react";
import { Box } from "@mui/material";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";

import CalendarFilters from "../components/calendar/CalendarFilters";
import CalendarPreviewModal from "../components/calendar/CalendarPreviewModal";
import { mapTasksToEvents } from "../components/calendar/calendarUtils";
import { eventStyleGetter } from "../components/calendar/calendarStyles";
import AddTaskDialog from "../components/calendar/AddTaskDialog";

import "../styles/calendarTheme.css";
import taskApi from "../api/task/taskApi";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("month");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  /* ---------------- LOAD TASKS ---------------- */

  const loadTasks = useCallback(async () => {
    try {
      const res = await taskApi.getTasks();
      const tasks = res.data;

      let mapped = mapTasksToEvents(tasks);

      if (filters.priority) {
        mapped = mapped.filter((e) => e.priority === filters.priority);
      }

      if (filters.category) {
        mapped = mapped.filter((e) => e.category === filters.category);
      }

      setEvents(mapped);
    } catch (err) {
      console.error("Calendar load error:", err);
    }
  }, [filters]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  /* ---------------- EVENT CLICK ---------------- */

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setPreviewOpen(true);
  };

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  /* ---------------- CREATE TASK ---------------- */
  const handleCreateTask = ({ start }) => {
    setSelectedDate(start);
    setDialogOpen(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <CalendarFilters filters={filters} setFilters={setFilters} />

      <Calendar
        localizer={localizer}
        events={events}
        date={date}
        view={view}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        startAccessor="start"
        endAccessor="end"
        selectable
        popup
        toolbar
        views={["month", "week", "day", "agenda"]}
        onSelectSlot={handleCreateTask}
        onSelectEvent={handleEventClick}
        eventPropGetter={eventStyleGetter}
        style={{ height: "65vh" }}
      />

      <CalendarPreviewModal
        event={selectedEvent}
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />

      <AddTaskDialog
        open={dialogOpen}
        date={selectedDate}
        onClose={() => setDialogOpen(false)}
        refresh={loadTasks}
      />
    </Box>
  );
}

export default CalendarPage;
