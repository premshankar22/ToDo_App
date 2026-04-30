const Task = require("../models/Task");
const generateTaskId = require("../util/generateTaskId");

/* ---------------- GET TASKS ---------------- */

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId,  isDeleted: false }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- CREATE TASK ---------------- */

exports.createTask = async (req, res) => {
  try {
    const { title, status, priority, dueDate, reminder } = req.body;

    const newTask = new Task({
      user: req.user.userId,
      taskId: generateTaskId(),
      title,
      status: status || "pending",
      priority: priority || null,
      dueDate: dueDate || null,
      reminder: reminder || null,
      category: null,
      note: null,
      files: [],
    });

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Create Task Error:", error); // 🔥 ADD THIS
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- MOVE TO TRASH ---------------- */

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { taskId: req.params.taskId },
      { isDeleted: true, deletedAt: new Date() },
      { returnDocument: "after" },
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task moved to trash" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- UPDATE TASK ---------------- */

exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { taskId: req.params.taskId, user: req.user.userId},
      req.body,
      { returnDocument: "after" },
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- UPLOAD FILES ---------------- */

exports.uploadFiles = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    if (!req.files) {
      return res.status(400).json({ message: "Files missing" });
    }

    const files = req.files.map((file) => ({
      name: file.originalname,
      url: `/uploads/${file.filename}`,
      size: file.size,
      type: file.mimetype,
    }));

    const task = await Task.findOneAndUpdate(
      { taskId },
      { $push: { files: { $each: files } } },
      { returnDocument: "after" },
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- GET TRASH ---------------- */

exports.getTrash = async (req, res) => {
  try {
    const tasks = await Task.find({ isDeleted: true }).sort({ deletedAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- RESTORE TASK ---------------- */

exports.restoreTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { taskId: req.params.taskId },
      { isDeleted: false, deletedAt: null },
      { returnDocument: "after" },
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
