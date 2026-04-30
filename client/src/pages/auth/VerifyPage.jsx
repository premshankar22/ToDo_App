// src/pages/auth/VerifyPage.jsx

import { useParams, useNavigate } from "react-router-dom";
import { verifyUser } from "../../api/task/authApi";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

function VerifyPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("Click below to activate your account");

  const handleVerify = async () => {
    try {
      setLoading(true);

      await verifyUser(token);

      setMsg("Account Verified ✅ Redirecting to login...");

      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);

    } catch {
      setMsg("Invalid or Expired Link ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box textAlign="center">
      <Typography mb={2}>{msg}</Typography>

      <Button
        variant="contained"
        onClick={handleVerify}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Activate Account"}
      </Button>

      <Typography mt={2} sx={{ cursor: "pointer" }} onClick={() => navigate("/auth/login")}>
        Go to Login
      </Typography>
    </Box>
  );
}

export default VerifyPage;