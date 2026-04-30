import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import EmailOTP from "../pages/auth/EmailOTP";

import AddTaskPage from "../pages/AddTaskPage";
import CalendarPage from "../pages/CalendarPage";
import NotesPage from "../pages/NotesPage";

function AppRoutes() {
  return (
    <Routes>
      {/* 🔥 LANDING */}
      <Route path="/" element={<LandingPage />} />

      {/* 🔐 AUTH */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
         <Route path="otp" element={<EmailOTP />} /> {/* ✅ NEW */}
      </Route>

      {/* 🧠 APP */}
      <Route path="/app" element={<MainLayout />}>
        <Route index element={<Navigate to="tasks" />} />
        <Route path="tasks" element={<AddTaskPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="notes" element={<NotesPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;