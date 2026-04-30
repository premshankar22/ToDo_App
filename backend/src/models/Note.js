const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const noteSchema = new mongoose.Schema(
  {
    user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
    noteId: {
      type: String,
      unique: true,
      default: () => uuidv4(), 
      index: true,
    },

    title: {
      type: String,
      default: "Untitled",
      trim: true,
      maxlength: 200, 
    },

    content: {
      type: String,
      default: "",
      maxlength: 50000, 
    },

    pinned: {
      type: Boolean,
      default: false,
      index: true, 
    },

    tags: [
      {
        type: String,
        trim: true, 
        lowercase: true, 
      },
    ],

    isDeleted: {
      type: Boolean,
      default: false,
      index: true, 
    },
  },
  {
    timestamps: true,
  }
);

noteSchema.index({
  isDeleted: 1,
  pinned: -1,
  updatedAt: -1,
});

noteSchema.index({
  title: "text",
  content: "text",
});


noteSchema.pre("save", function () {
  if (this.title) {
    this.title = this.title.trim() || "Untitled";
  }
});

noteSchema.pre("validate", function () {
  if (this.content && this.content.length > 50000) {
    throw new Error("Content too large"); // ✅ FIX
  }
});


module.exports = mongoose.model("Note", noteSchema);