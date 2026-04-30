import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp } from "../../api/task/authApi";

function EmailOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    try {
      setLoading(true);
      setError("");

      await verifyOtp({ email, otp });

      navigate("/auth/login");

    } catch (err) {
      setError(err?.response?.data?.message || "OTP failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box textAlign="center">
      <Typography variant="h6">Enter OTP</Typography>

      <Typography fontSize={13} color="#64748b" mb={2}>
        OTP sent to {email}
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        fullWidth
        sx={{ my: 2 }}
      />

      <Button
        variant="contained"
        onClick={handleVerify}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </Button>
    </Box>
  );
}

export default EmailOTP;