import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        background: "#f8fafc",
      }}
    >
      {/* ---------------- LEFT (30%) ---------------- */}
      <Box
        sx={{
          width: "30%",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "space-between",
          p: 5,

          background: "#ffffff",
          borderRight: "1px solid #e2e8f0",
        }}
      >
        {/* LOGO */}
        <Typography fontWeight={700} fontSize={18} color="#0f172a">
          MyWorkspace
        </Typography>

        {/* CLEAN CONTENT */}
        <Box>
          <Typography
            fontSize={26}
            fontWeight={700}
            color="#0f172a"
            lineHeight={1.3}
          >
            Stay organized.
            <br />
            Work smarter.
          </Typography>

          <Typography mt={2} fontSize={14} color="#64748b">
            Manage tasks, notes, and reminders in one clean space.
          </Typography>

          {/* SIMPLE FEATURE LIST */}
          <Box mt={4} display="flex" flexDirection="column" gap={1.5}>
            <Typography fontSize={13} color="#334155">
              ✔ Tasks & productivity
            </Typography>
            <Typography fontSize={13} color="#334155">
              ✔ Notes & ideas
            </Typography>
            <Typography fontSize={13} color="#334155">
              ✔ Smart reminders
            </Typography>
          </Box>
        </Box>

        {/* FOOTER */}
        <Typography fontSize={12} color="#94a3b8">
          © 2026 MyWorkspace
        </Typography>
      </Box>

      {/* ---------------- RIGHT (70%) ---------------- */}
      <Box
        sx={{
          width: { xs: "100%", md: "70%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        {/* FORM */}
        <Box
          sx={{
            width: 380,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AuthLayout;