import { Box, Chip } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import TaskHeader from "../components/TaskHeader";
import Add from "../components/Add";
import TaskList from "../components/TaskList";
import TrashList from "../components/TrashList";
import { applyFilters } from "../utils/taskFilters";
import taskApi from "../api/task/taskApi";


/* ---------------- FILTER LABELS ---------------- */

const FILTER_LABELS = {
  status: "Status",
  category: "Category",
  dueDate: "Due Date",
  sortAlpha: "Sort",
  sortTime: "Created",
  sortPriority: "Priority"
};


/* ---------------- COMPONENT ---------------- */

function AddTaskPage() {

  const location = useLocation();

  /* ---------- STATE ---------- */

  const [filters, setFilters] = useState({});
  const [tasks, setTasks] = useState([]);
  const [trashTasks, setTrashTasks] = useState([]);
  
  /* ---------- FILTERED TASKS ---------- */

  const filteredTasks = applyFilters(tasks, filters);

  /* ---------- FILTER HELPERS ---------- */

  const removeFilter = (key) => {
    const updated = { ...filters };
    delete updated[key];
    setFilters(updated);
  };

  const hasFilters = Object.keys(filters).length > 0;


  /* ---------- RESTORE / DELETE ---------- */

  const restoreTask = async (taskId) => {

    await taskApi.restoreTask(taskId);

    const res = await taskApi.getTrash();

    setTrashTasks(res.data);

  };


  const deleteForever = async (taskId) => {

    await taskApi.deleteForever(taskId);

    const res = await taskApi.getTrash();

    setTrashTasks(res.data);

  };


  /* ---------- DATA LOADING ---------- */

  useEffect(() => {

    const loadData = async () => {

      try {

        if (location.pathname === "/trash") {

          const res = await taskApi.getTrash();

          setTrashTasks(res.data);

        } else {

          const res = await taskApi.getTasks();

          setTasks(res.data);

        }

      } catch (error) {

        console.error("Fetch error:", error);

      }

    };

    loadData();

  }, [location.pathname]);


  /* ---------- UI ---------- */

  return (

    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >

      {/* HEADER */}

      <TaskHeader
        filters={filters}
        setFilters={setFilters}
      />


      {/* ADD TASK */}

{location.pathname !== "/trash" && (
  <Add refreshTasks={async () => {
    const res = await taskApi.getTasks();
    setTasks(res.data);
  }} />
)}


      {/* FILTER CHIPS */}

    {hasFilters && location.pathname !== "/trash" && (

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 3,
            py: 1,
            flexWrap: "wrap",
            borderBottom: "1px solid #f1f5f9"
          }}
        >

          {Object.entries(filters).map(([key, value]) => (

            <Chip
              key={key}
              label={`${FILTER_LABELS[key] || key}: ${value}`}
              onDelete={() => removeFilter(key)}
              size="small"
              sx={{
                background: "#eef2ff",
                color: "#4f46e5",
                fontWeight: 500
              }}
            />

          ))}

        </Box>

      )}


      {/* MAIN CONTENT */}

      <Box
        sx={{
          flex: 1,
          p: 3,
          overflowY: "auto"
        }}
      >

        {location.pathname === "/trash" ? (

          <TrashList
            tasks={trashTasks}
            restoreTask={restoreTask}
            deleteForever={deleteForever}
          />

        ) : (

         <TaskList tasks={filteredTasks} />

        )}

      </Box>

    </Box>

  );

}

export default AddTaskPage;