import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  
} from "@mui/material";

import { NavLink } from "react-router-dom";
import { useState } from "react";
import SettingsMenu from "./SettingsMenu";

import {
  SIDEBAR_NAV_ITEMS,
  SIDEBAR_BOTTOM_ITEMS,
} from "../constants/taskOptions";

const purple = "#7c3aed";
const activePurple = "#5b21b6";

function Sidebar() {
  const [openSettings, setOpenSettings] = useState(false);

  const navItemStyle = (isActive) => ({
    borderRadius: 2,
    mx: 1,
    mb: 0.5,

    color: isActive ? activePurple : "#475569",
    backgroundColor: isActive
      ? "rgba(124,58,237,0.10)"
      : "transparent",

    "&:hover": {
      backgroundColor: "rgba(124,58,237,0.06)",
    },

    "& .MuiListItemIcon-root": {
      color: isActive ? activePurple : purple,
      minWidth: 36,
    },
  });

  return (
    <>
      <Box
        sx={{
          width: 220,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f8fafc",
          borderRight: "1px solid #f1f5f9",
          py: 1,
        }}
      >
        {/* ================= TOP ================= */}
        <List>
          {SIDEBAR_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <ListItemButton sx={navItemStyle(isActive)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          ))}
        </List>

        {/* ================= BOTTOM ================= */}
        <Box>
          <Divider sx={{ my: 1 }} />

          {/* 📌 BOTTOM ITEMS */}
          {SIDEBAR_BOTTOM_ITEMS.map((item) => {
            // 🔥 HANDLE SETTINGS CLICK (NO NAVIGATION)
            if (item.label === "Settings") {
              return (
                <ListItemButton
                  key={item.label}
                  onClick={() => setOpenSettings(true)}
                  sx={navItemStyle(false)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  />
                </ListItemButton>
              );
            }

            // 🔥 NORMAL ROUTES
            return (
              <NavLink
                key={item.path}
                to={item.path}
                style={{ textDecoration: "none" }}
              >
                {({ isActive }) => (
                  <ListItemButton sx={navItemStyle(isActive)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>

                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    />
                  </ListItemButton>
                )}
              </NavLink>
            );
          })}
        </Box>
      </Box>

      {/* ⚙️ SETTINGS PANEL */}
      <SettingsMenu
        open={openSettings}
        onClose={() => setOpenSettings(false)}
      />
    </>
  );
}

export default Sidebar;
