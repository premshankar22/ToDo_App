import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/task/authApi";
import axiosClient from "../../api/axiosClient";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    if (!form.email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Invalid email format";
    if (!form.password) return "Password is required";
    if (form.password.length < 6)
      return "Password must be at least 6 characters";

    return "";
  };

  /* ---------------- LOGIN ---------------- */
  const handleLogin = async () => {
  const validationError = validate();

  if (validationError) {
    setError(validationError);
    return;
  }

  try {
    setError("");
    setLoading(true);

    const res = await loginUser({
      email: form.email,
      password: form.password,
    });

    /* ✅ Save token */
    localStorage.setItem("token", res.data.token);

    /* ✅ Optional: save user */
    localStorage.setItem("user", JSON.stringify(res.data.user));
    
    /* ✅ Set token globally */
axiosClient.defaults.headers.common[
  "Authorization"
] = `Bearer ${res.data.token}`;

    navigate("/app/tasks");

  } catch (err) {
    setError(err?.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      
      {/* TITLE */}
      <Box textAlign="center" mb={1}>
        <Typography variant="h5" fontWeight={700}>
          Welcome Back 👋
        </Typography>
        <Typography fontSize={13} color="#64748b">
          Login to continue managing your tasks
        </Typography>
      </Box>

      {/* ERROR */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* EMAIL */}
      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        size="small"
      />

      {/* PASSWORD */}
      <TextField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={form.password}
        onChange={handleChange}
        fullWidth
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* REMEMBER + FORGOT */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <FormControlLabel
          control={
            <Checkbox
              name="remember"
              checked={form.remember}
              onChange={handleChange}
              size="small"
            />
          }
          label={<Typography fontSize={13}>Remember me</Typography>}
        />

        <Typography
          fontSize={13}
          sx={{ cursor: "pointer", color: "#6366f1" }}
        >
          Forgot password?
        </Typography>
      </Box>

      {/* LOGIN BUTTON */}
      <Button
        variant="contained"
        onClick={handleLogin}
        disabled={loading}
        sx={{
          bgcolor: "#111827",
          height: 42,
          "&:hover": { bgcolor: "#000" },
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>

      {/* DIVIDER */}
      <Box display="flex" alignItems="center" gap={1} my={1}>
        <Box flex={1} height={1} bgcolor="#e2e8f0" />
        <Typography fontSize={12} color="#94a3b8">
          OR
        </Typography>
        <Box flex={1} height={1} bgcolor="#e2e8f0" />
      </Box>

      {/* SOCIAL LOGIN (UI ONLY) */}
      <Button variant="outlined">Continue with Google</Button>

      {/* REGISTER LINK */}
      <Typography
        fontSize={13}
        textAlign="center"
        sx={{ cursor: "pointer" }}
        onClick={() => navigate("/auth/register")}
      >
        Don’t have an account?{" "}
        <span style={{ fontWeight: 600 }}>Register</span>
      </Typography>
    </Box>
  );
}

export default LoginPage;