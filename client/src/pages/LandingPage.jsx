import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Chip,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import TaskAltIcon from "@mui/icons-material/TaskAlt";
import NotesIcon from "@mui/icons-material/Notes";
import AlarmIcon from "@mui/icons-material/Alarm";
import BoltIcon from "@mui/icons-material/Bolt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function LandingPage() {
  const navigate = useNavigate();

  const cardStyle = {
    p: 2,
    borderRadius: 3,
    transition: "all 0.25s ease",
    border: "1px solid #e2e8f0",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    },
  };

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>
      
      {/* 🔥 HERO */}
      <Box textAlign="center" py={10} px={2}>
        <Typography variant="h3" fontWeight={800} color="#0f172a">
          Organize Everything. Effortlessly.
        </Typography>

        <Typography mt={2} fontSize={16} color="#64748b" maxWidth={600} mx="auto">
          Tasks, notes, reminders — all in one clean workspace designed
          for focus and productivity.
        </Typography>

        <Box mt={4} display="flex" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            sx={{ bgcolor: "#111827", "&:hover": { bgcolor: "#000" } }}
            onClick={() => navigate("/auth/login")}
          >
            Get Started
          </Button>

          <Button
            variant="outlined"
            sx={{ borderColor: "#e2e8f0", color: "#0f172a" }}
            onClick={() => navigate("/auth/register")}
          >
            Create Account
          </Button>
        </Box>
      </Box>

      {/* 📊 STATS (NEW 🔥) */}
      <Box display="flex" justifyContent="center" gap={6} pb={6}>
        {[
          { label: "Tasks Completed", value: "12K+" },
          { label: "Active Users", value: "3.2K" },
          { label: "Notes Created", value: "45K+" },
        ].map((item, i) => (
          <Box key={i} textAlign="center">
            <Typography fontWeight={700} fontSize={20}>
              {item.value}
            </Typography>
            <Typography fontSize={12} color="#64748b">
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* 📊 PREVIEW */}
      <Box px={4} pb={10}>
        <Grid container spacing={3} justifyContent="center">
          
          {/* TASKS */}
          <Grid item xs={12} md={3}>
            <Paper sx={cardStyle}>
              <Box display="flex" alignItems="center" gap={1}>
                <TaskAltIcon fontSize="small" />
                <Typography fontWeight={600}>Tasks</Typography>
              </Box>

              <Box mt={2}>
                <Typography fontSize={14}>✔ UI Design</Typography>
                <Typography fontSize={14}>✔ API Setup</Typography>
                <Typography fontSize={14} color="#94a3b8">
                  ☐ Deployment
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* NOTES */}
          <Grid item xs={12} md={3}>
            <Paper sx={cardStyle}>
              <Box display="flex" alignItems="center" gap={1}>
                <NotesIcon fontSize="small" />
                <Typography fontWeight={600}>Notes</Typography>
              </Box>

              <Box mt={2}>
                <Typography fontSize={13}>
                  💡 Dashboard UX improvement
                </Typography>
                <Typography fontSize={13}>
                  🧠 Optimize performance
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* REMINDERS */}
          <Grid item xs={12} md={3}>
            <Paper sx={cardStyle}>
              <Box display="flex" alignItems="center" gap={1}>
                <AlarmIcon fontSize="small" />
                <Typography fontWeight={600}>Reminders</Typography>
              </Box>

              <Box mt={2}>
                <Chip label="Meeting 4PM" size="small" sx={{ mr: 1 }} />
                <Chip label="Workout 7PM" size="small" />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* ⚡ FEATURES */}
      <Box bgcolor="#fff" py={8} px={4} textAlign="center">
        <Typography variant="h5" fontWeight={700}>
          Why You’ll Love It
        </Typography>

        <Grid container spacing={4} mt={2} justifyContent="center">
          <Grid item xs={12} md={3}>
            <BoltIcon />
            <Typography mt={1} fontWeight={600}>
              Fast & Smooth
            </Typography>
            <Typography fontSize={13} color="#64748b">
              Instant updates with zero lag.
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <TaskAltIcon />
            <Typography mt={1} fontWeight={600}>
              All-in-One
            </Typography>
            <Typography fontSize={13} color="#64748b">
              Everything in one place.
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <TrendingUpIcon />
            <Typography mt={1} fontWeight={600}>
              Productivity Boost
            </Typography>
            <Typography fontSize={13} color="#64748b">
              Track and improve daily workflow.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* 🚀 FINAL CTA (NEW 🔥) */}
      <Box textAlign="center" py={8}>
        <Typography variant="h5" fontWeight={700}>
          Ready to get organized?
        </Typography>

        <Button
          sx={{
            mt: 3,
            bgcolor: "#111827",
            color: "#fff",
            px: 4,
            "&:hover": { bgcolor: "#000" },
          }}
          onClick={() => navigate("/auth/register")}
        >
          Start Now
        </Button>
      </Box>

      {/* 🔻 FOOTER */}
      <Box textAlign="center" py={3}>
        <Divider sx={{ mb: 2 }} />
        <Typography fontSize={12} color="#94a3b8">
          © 2026 My Notes App — Built for productivity
        </Typography>
      </Box>
    </Box>
  );
}

export default LandingPage;