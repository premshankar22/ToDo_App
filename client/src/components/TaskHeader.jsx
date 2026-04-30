import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { useState } from "react";

import {
  STATUS_OPTIONS,
  CATEGORY_OPTIONS,
  DUE_DATE_OPTIONS,
  TASK_HEADER_ICONS,
} from "../constants/taskOptions";

const purple = "#7c3aed";

function TaskHeader({ filters, setFilters }) {
  const [alphaMenu, setAlphaMenu] = useState(null);
  const [priorityMenu, setPriorityMenu] = useState(null);
  const [timeMenu, setTimeMenu] = useState(null);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAlphaSort = (value) => {
    updateFilter("sortAlpha", value);
    setAlphaMenu(null);
  };

  const handlePrioritySort = (value) => {
    updateFilter("sortPriority", value);
    setPriorityMenu(null);
  };

  const handleTimeSort = (value) => {
    updateFilter("sortTime", value);
    setTimeMenu(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "13vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 4,
        background: "#fff",
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      {/* TITLE */}

      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          fontSize: 20,
          fontWeight: 700,
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          letterSpacing: "-0.3px",
          color: "#1e293b",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "8px",
            background: "rgba(124,58,237,0.08)",
          }}
        >
          <TASK_HEADER_ICONS.home size={18} color={purple} />
        </Box>
        Task Manager
      </Typography>

      {/* FILTERS */}

      <Box sx={{ display: "flex", gap: 3 }}>
        {/* STATUS */}

        <FormControl variant="standard" size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Status</InputLabel>

          <Select
            value={filters.status || ""}
            onChange={(e) => updateFilter("status", e.target.value)}
            disableUnderline
            sx={{
              borderBottom: "1px solid #e2e8f0",
              "&:hover": {
                borderBottom: "1px solid #7c3aed",
              },
              "&.Mui-focused": {
                borderBottom: "2px solid #7c3aed",
              },
            }}
            renderValue={(selected) => {
              const item = STATUS_OPTIONS.find((i) => i.value === selected);
              if (!item) return "Status";

              return (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {item.icon}
                  {item.label}
                </Box>
              );
            }}
          >
            {STATUS_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText>{option.label}</ListItemText>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* DUE DATE */}

        <FormControl variant="standard" size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Due Date</InputLabel>

          <Select
            value={filters.dueDate || ""}
            onChange={(e) => updateFilter("dueDate", e.target.value)}
            disableUnderline
            sx={{
              borderBottom: "1px solid #e2e8f0",
              "&:hover": {
                borderBottom: "1px solid #7c3aed",
              },
              "&.Mui-focused": {
                borderBottom: "2px solid #7c3aed",
              },
            }}
            renderValue={(selected) => {
              const item = DUE_DATE_OPTIONS.find((i) => i.value === selected);
              if (!item) return "Due Date";

              return (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {item.icon}
                  {item.label}
                </Box>
              );
            }}
          >
            {DUE_DATE_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText>{option.label}</ListItemText>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* CATEGORY */}

        <FormControl variant="standard" size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Category</InputLabel>

          <Select
            value={filters.category || ""}
            onChange={(e) => updateFilter("category", e.target.value)}
            disableUnderline
            sx={{
              borderBottom: "1px solid #e2e8f0",
              "&:hover": {
                borderBottom: "1px solid #7c3aed",
              },
              "&.Mui-focused": {
                borderBottom: "2px solid #7c3aed",
              },
            }}
            renderValue={(selected) => {
              const item = CATEGORY_OPTIONS.find((i) => i.value === selected);
              if (!item) return "Category";

              return (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {item.icon}
                  {item.label}
                </Box>
              );
            }}
          >
            {CATEGORY_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText>{option.label}</ListItemText>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* SORT OPTIONS */}

      <Box sx={{ display: "flex", gap: 1 }}>
        {/* ALPHA SORT */}

        <Tooltip title="Sort Alphabetically">
          <IconButton onClick={(e) => setAlphaMenu(e.currentTarget)}>
            <TASK_HEADER_ICONS.sortAlpha sx={{ color: "#6366f1" }} />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={alphaMenu}
          open={Boolean(alphaMenu)}
          onClose={() => setAlphaMenu(null)}
        >
          <MenuItem onClick={() => handleAlphaSort("az")}>
            <ListItemIcon>
              <TASK_HEADER_ICONS.arrowUp />
            </ListItemIcon>
            A → Z
          </MenuItem>

          <MenuItem onClick={() => handleAlphaSort("za")}>
            <ListItemIcon>
              <TASK_HEADER_ICONS.arrowDown />
            </ListItemIcon>
            Z → A
          </MenuItem>
        </Menu>

        {/* PRIORITY SORT */}

        <Tooltip title="Sort by Priority">
          <IconButton onClick={(e) => setPriorityMenu(e.currentTarget)}>
            <TASK_HEADER_ICONS.sortPriority sx={{ color: "#ef4444" }} />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={priorityMenu}
          open={Boolean(priorityMenu)}
          onClose={() => setPriorityMenu(null)}
        >
          <MenuItem onClick={() => handlePrioritySort("high")}>
            🔴 High Priority
          </MenuItem>
          <MenuItem onClick={() => handlePrioritySort("medium")}>
            🟡 Medium Priority
          </MenuItem>
          <MenuItem onClick={() => handlePrioritySort("low")}>
            🟢 Low Priority
          </MenuItem>
        </Menu>

        {/* TIME SORT */}

        <Tooltip title="Sort by Creation Time">
          <IconButton onClick={(e) => setTimeMenu(e.currentTarget)}>
            <TASK_HEADER_ICONS.sortTime sx={{ color: "#10b981" }} />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={timeMenu}
          open={Boolean(timeMenu)}
          onClose={() => setTimeMenu(null)}
        >
          <MenuItem onClick={() => handleTimeSort("newest")}>
            <ListItemIcon>
              <TASK_HEADER_ICONS.arrowDown />
            </ListItemIcon>
            Newest First
          </MenuItem>

          <MenuItem onClick={() => handleTimeSort("oldest")}>
            <ListItemIcon>
              <TASK_HEADER_ICONS.arrowUp />
            </ListItemIcon>
            Oldest First
          </MenuItem>
        </Menu>

        <Tooltip title="Advanced Filters">
          <IconButton>
            <TASK_HEADER_ICONS.filter sx={{ color: purple }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default TaskHeader;
