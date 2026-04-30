import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  IconButton,
  Tooltip,
  TextField,
  Avatar,
} from "@mui/material";
import { HEADER_ICONS } from "../constants/taskOptions";

function TodoHeader() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Box
      sx={{
        height: "10vh",
        width: "100%",
        px: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      {/* LEFT */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        {HEADER_ICONS.logo}

        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: "#1e293b",
          }}
        >
          MyNote
        </Typography>
      </Box>

      {/* CENTER SEARCH */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TextField
          placeholder="Search notes, tasks, reminders..."
          size="small"
          sx={{
            width: "60%",
            backgroundColor: "#f8fafc",
            borderRadius: 2,
          }}
          InputProps={{
            startAdornment: HEADER_ICONS.search,
          }}
        />
      </Box>

      {/* RIGHT ACTIONS */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Tooltip title="What's New">
          <IconButton sx={{ color: "#334155" }}>
            {HEADER_ICONS.whatsNew}
          </IconButton>
        </Tooltip>

        <Tooltip title="Help & Feedback">
          <IconButton sx={{ color: "#334155" }}>{HEADER_ICONS.help}</IconButton>
        </Tooltip>

        <Tooltip title="Profile">
          <IconButton>
            <Avatar
              sx={{
                width: 30,
                height: 30,
                bgcolor: "#2563eb",
                fontSize: "0.85rem",
              }}
            >
               {user?.name?.charAt(0)?.toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>

        <Button
          startIcon={HEADER_ICONS.home}
          onClick={() => navigate("/")}
          sx={{
            textTransform: "none",
            fontWeight: 500,
            color: "#1e293b",
          }}
        >
          Home
        </Button>
      </Box>
    </Box>
  );
}

export default TodoHeader;
