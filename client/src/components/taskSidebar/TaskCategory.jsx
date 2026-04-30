import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  ListItemIcon,
  Typography,
  Box,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";

import { CATEGORY_OPTIONS } from "../../constants/taskOptions";
import taskApi from "../../api/task/taskApi";

function TaskCategory({ task, setTask, selectedTaskId }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LabelOutlinedIcon fontSize="small" />

          <Typography fontSize={13}>
            {task?.category
              ? CATEGORY_OPTIONS.find((c) => c.value === task.category)?.label
              : "Category"}
          </Typography>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {CATEGORY_OPTIONS.map((item) => (
            <MenuItem
              key={item.value}
              selected={task?.category === item.value}
              onClick={async () => {
                await taskApi.updateTask(selectedTaskId, {
                  category: item.value,
                });

                setTask((prev) => ({
                  ...prev,
                  category: item.value,
                }));
              }}
              sx={{
                borderRadius: 1,
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>

              {item.label}
            </MenuItem>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default TaskCategory;
