import { Box, Select, MenuItem } from "@mui/material";

function CalendarFilters({ filters, setFilters }) {

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>

      <Select
        size="small"
        value={filters.priority || ""}
        displayEmpty
        onChange={(e)=>setFilters({...filters, priority:e.target.value})}
      >
        <MenuItem value="">All Priorities</MenuItem>
        <MenuItem value="high">High</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="low">Low</MenuItem>
      </Select>

      <Select
        size="small"
        value={filters.category || ""}
        displayEmpty
        onChange={(e)=>setFilters({...filters, category:e.target.value})}
      >
        <MenuItem value="">All Categories</MenuItem>
        <MenuItem value="work">Work</MenuItem>
        <MenuItem value="personal">Personal</MenuItem>
      </Select>

    </Box>
  );
}

export default CalendarFilters;