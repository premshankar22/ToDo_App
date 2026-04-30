const mongoose = require("mongoose");

/* ---------- FILE SCHEMA ---------- */
const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      default: 0,
    },

    type: {
      type: String,
      default: "file", // image, pdf, doc, etc.
    },
  },
  { _id: false }
);

/* ---------- TASK SCHEMA ---------- */
const taskSchema = new mongoose.Schema(
  {
    /* OWNER */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /*  TASK ID */
    taskId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    /* TITLE */
    title: {
      type: String,
      required: true,
      trim: true,
    },

    /* STATUS */
    status: {
      type: String,
      enum: ["pending", "inprogress", "completed", "overdue", "archived"],
      default: "pending",
    },

    /* PRIORITY */
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: null,
    },

    /* DATES */
    dueDate: {
      type: Date,
      default: null,
    },

    reminder: {
      type: Date,
      default: null,
    },

    /* CATEGORY */
    category: {
      type: String,
      default: null,
    },

    /* NOTE */
    note: {
      type: String,
      default: "",
    },

    /* FILES */
    files: {
      type: [fileSchema],
      default: [],
    },

    /* 🗑 TRASH FEATURE */
    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);