// src/api/task/authApi.js

import axiosClient from "../axiosClient";

/* ---------------- REGISTER ---------------- */
export const registerUser = (data) => {
  return axiosClient.post("/auth/register", data);
};

/* ---------------- LOGIN ---------------- */
export const loginUser = (data) => {
  return axiosClient.post("/auth/login", data);
};


export const verifyOtp = (data) => {
  return axiosClient.post("/auth/verify-otp", data);
};