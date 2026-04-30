import {
  Box,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Avatar,
  Button,
  Slide,
  Fade,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/logout";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

import { useEffect } from "react";

function SettingsMenu({ open, onClose }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!open) return null;
  

  return (
    <Fade in={open}>
      <Box
        onClick={onClose}
        sx={{
          position: "fixed",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.2)",
          zIndex: 2000,
        }}
      >
        <Slide direction="left" in={open}>
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              width: 320,
              height: "100%",
              bgcolor: "#fff",
              position: "absolute",
              right: 0,
              top: 0,
              boxShadow: "-10px 0 30px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              p: 2,
            }}
          >
            {/* HEADER */}
            <Box display="flex" alignItems="center" gap={2} mb={2}>
  <Avatar
    sx={{
      bgcolor: "#2563eb",
      width: 40,
      height: 40,
      fontWeight: 600,
    }}
  >
    {user?.name?.charAt(0)?.toUpperCase()}
  </Avatar>

  <Box>
    <Typography fontWeight={600}>
      {user?.name || "User"}
    </Typography>

    <Typography fontSize={12} color="#64748b">
      {user?.email}
    </Typography>
  </Box>
</Box>

            <Divider />

            {/* ACCOUNT */}
            <Typography mt={2} mb={1} fontSize={12} color="#94a3b8">
              ACCOUNT
            </Typography>

            <List>
              <ListItemButton>
                <ListItemIcon>
                  <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Profile Settings" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <SecurityOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Security & Password" />
              </ListItemButton>
            </List>

            {/* PREFERENCES */}
            <Typography mt={2} mb={1} fontSize={12} color="#94a3b8">
              PREFERENCES
            </Typography>

            <List>
              <ListItemButton>
                <ListItemIcon>
                  <DarkModeOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Dark Mode" />
                <Switch size="small" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <NotificationsNoneOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
                <Switch size="small" />
              </ListItemButton>
            </List>

            {/* APP */}
            <Typography mt={2} mb={1} fontSize={12} color="#94a3b8">
              APP
            </Typography>

            <List>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="General Settings" />
              </ListItemButton>
            </List>

            <Box flex={1} />

            <Divider sx={{ mb: 2 }} />

            {/* LOGOUT */}
            <Button
              startIcon={<LogoutIcon />}
              variant="contained"
              color="error"
              onClick={() => {
              logoutUser(navigate);  // 🔥 clean logout
              onClose();             // close sidebar
             }}
            >
              Logout
            </Button>
          </Box>
        </Slide>
      </Box>
    </Fade>
  );
}

export default SettingsMenu;