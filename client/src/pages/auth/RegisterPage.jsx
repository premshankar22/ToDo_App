import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  LinearProgress,
  Checkbox, 
  FormControlLabel,
} from "@mui/material";

import PersonOutline from "@mui/icons-material/PersonOutline";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/task/authApi";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [registered, setRegistered] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [agree, setAgree] = useState(false);

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------- PASSWORD RULES ---------------- */
  const rules = {
    length: form.password.length >= 6,
    uppercase: /[A-Z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    special: /[^A-Za-z0-9]/.test(form.password),
  };

  /* ---------------- PASSWORD STRENGTH ---------------- */
  const getStrength = () => {
    let score = Object.values(rules).filter(Boolean).length;

    if (score <= 1)
      return { label: "Weak", value: 25, color: "#ef4444" };
    if (score === 2 || score === 3)
      return { label: "Medium", value: 60, color: "#f59e0b" };
    return { label: "Strong", value: 100, color: "#10b981" };
  };

  const strength = getStrength();

  const isEmailValid = /\S+@\S+\.\S+/.test(form.email);
  const isMatch = form.password === form.confirmPassword;

  const isFormValid =
  form.name &&
  isEmailValid &&
  form.password.length >= 10 &&
  isMatch &&
  agree; // ✅ added

  /* ---------------- REGISTER ---------------- */
  /* ---------------- REGISTER ---------------- */
  const handleRegister = async () => {
    if (!isFormValid) return;

    if (!agree) {
      setError("You must accept Terms & Privacy Policy");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      /* ✅ SWITCH UI */
      setRegistered(true);
      /* 👉 Navigate to OTP page */
navigate("/auth/otp", { state: { email: form.email } });

    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- SUCCESS SCREEN ---------------- */
  if (registered) {
    return (
      <Box textAlign="center">
        <Typography variant="h6" fontWeight={600}>
          📩 Check Your Email
        </Typography>

        <Typography mt={1} fontSize={14} color="#64748b">
          We sent a verification link to your email.
          <br />
          Please open it and activate your account.
        </Typography>

        <Typography mt={3} fontSize={13}>
          Didn’t receive email?
        </Typography>

        <Typography
          mt={1}
          sx={{ cursor: "pointer", color: "#2563eb", fontWeight: 500 }}
          onClick={() => navigate("/auth/login")}
        >
          Go to Login
        </Typography>
      </Box>
    );
  }


  /* ---------------- RULE UI ---------------- */
  const Rule = ({ ok, label }) => (
    <Typography
      fontSize={11}
      sx={{
        color: ok ? "#10b981" : "#94a3b8",
        display: "flex",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      {ok ? "✓" : "•"} {label}
    </Typography>
  );

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      
      {/* HEADER */}
      <Box textAlign="center" mb={1}>
        <Typography variant="h5" fontWeight={700}>
          Create Account ✨
        </Typography>
        <Typography fontSize={13} color="#64748b">
          Start managing your work smarter
        </Typography>
      </Box>

      {/* ALERTS */}
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      {/* NAME */}
      <TextField
        label="Full Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutline fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      {/* EMAIL */}
      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        size="small"
        error={form.email && !isEmailValid}
        helperText={
          form.email && !isEmailValid ? "Enter a valid email address" : ""
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailOutlined fontSize="small" />
            </InputAdornment>
          ),
        }}
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
        helperText="Use at least 6 characters with mix of letters, numbers & symbols"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlined fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* PASSWORD STRENGTH */}
      {form.password && (
        <Box>
          <LinearProgress
            variant="determinate"
            value={strength.value}
            sx={{
              height: 6,
              borderRadius: 5,
              background: "#e5e7eb",
              "& .MuiLinearProgress-bar": {
                backgroundColor: strength.color,
              },
            }}
          />

          <Typography fontSize={11} mt={0.5}>
            Strength:{" "}
            <span style={{ color: strength.color, fontWeight: 600 }}>
              {strength.label}
            </span>
          </Typography>

          {/* RULE CHECKLIST */}
          <Box mt={1} display="flex" flexDirection="column" gap={0.3}>
            <Rule ok={rules.length} label="At least 6 characters" />
            <Rule ok={rules.uppercase} label="One uppercase letter" />
            <Rule ok={rules.number} label="One number" />
            <Rule ok={rules.special} label="One special character" />
          </Box>
        </Box>
      )}

      {/* CONFIRM PASSWORD */}
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type={showConfirm ? "text" : "password"}
        value={form.confirmPassword}
        onChange={handleChange}
        fullWidth
        size="small"
        error={form.confirmPassword && !isMatch}
        helperText={
          form.confirmPassword
            ? isMatch
              ? "Passwords match ✓"
              : "Passwords do not match"
            : ""
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlined fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <FormControlLabel
  control={
    <Checkbox
      checked={agree}
      onChange={(e) => setAgree(e.target.checked)}
      size="small"
      sx={{
        p: 0.5,
      }}
    />
  }
  label={
    <Typography fontSize={12} color="#64748b">
      I agree to the{" "}
      <span
        style={{
          color: "#2563eb",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Terms of Service
      </span>{" "}
      and{" "}
      <span
        style={{
          color: "#2563eb",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Privacy Policy
      </span>
    </Typography>
  }
/>

      {/* BUTTON */}
      <Button
        variant="contained"
        onClick={handleRegister}
        disabled={!isFormValid || loading}
        sx={{
          bgcolor: "#111827",
          height: 42,
          "&:hover": { bgcolor: "#000" },
        }}
      >
        {loading ? "Creating account..." : "Register"}
      </Button>

      {/* LOGIN LINK */}
      <Typography
        fontSize={13}
        textAlign="center"
        sx={{ cursor: "pointer" }}
        onClick={() => navigate("/auth/login")}
      >
        Already have an account?{" "}
        <span style={{ fontWeight: 600 }}>Login</span>
      </Typography>
    </Box>
  );
}

export default RegisterPage;