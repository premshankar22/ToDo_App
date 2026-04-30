const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const protect = require("../middleware/protect");

router.use(protect);
const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  uploadFiles,
  getTrash,
  restoreTask
} = require("../controllers/taskController");

router.get("/", getTasks);

router.post("/", createTask);

router.delete("/:taskId", deleteTask);

router.put("/:taskId", updateTask);

router.post(
  "/:taskId/files",
  upload.array("files"),
  uploadFiles
);


router.get("/trash",getTrash);

router.put("/:taskId/restore",restoreTask);

module.exports = router;