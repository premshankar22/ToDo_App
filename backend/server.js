const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./src/config/db");

/* ✅ IMPORT MODEL (FIX) */
const TempUser = require("./src/models/TempUser");

dotenv.config();
connectDB();

const app = express();

app.use(cors());

// 🔥 IMPORTANT (fix large payload issue)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

/* 🧹 AUTO CLEANUP (SAFE VERSION) */
setInterval(async () => {
  try {
    const result = await TempUser.deleteMany({
      tokenExpiry: { $lt: Date.now() },
    });

    if (result.deletedCount > 0) {
      console.log(`🧹 Deleted ${result.deletedCount} expired users`);
    }
  } catch (err) {
    console.error("Cleanup error:", err.message);
  }
}, 1000 * 60 * 10); // every 10 min

// static images
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/tasks", require("./src/routes/taskRoutes"));
app.use("/api/notes", require("./src/routes/noteRoutes"));
app.use("/api/auth", require("./src/routes/authRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});