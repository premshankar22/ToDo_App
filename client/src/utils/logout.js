import axiosClient from "../api/axiosClient";

export const logoutUser = (navigate) => {
  try {
    /* ✅ Remove auth data */
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    /* ✅ Remove axios auth header */
    delete axiosClient.defaults.headers.common["Authorization"];

    /* ✅ Redirect */
    navigate("/auth/login", { replace: true });

  } catch (error) {
    console.error("Logout error:", error);
  }
};