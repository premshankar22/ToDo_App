const Note = require("../models/Note");
const { v4: uuidv4 } = require("uuid"); 

/* ---------------- HELPERS ---------------- */
const cleanString = (str) =>
  typeof str === "string" ? str.trim() : str;

/* ---------------- CREATE ---------------- */

exports.createNote = async (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    let { title, content } = req.body;

    title = cleanString(title) || "Untitled";
    content = cleanString(content) || "";

    const note = await Note.create({
      noteId: uuidv4(), // ✅ FORCE UNIQUE ID
      title,
      content,
    });

    res.status(201).json({
      success: true,
      data: note,
    });
  } catch (err) {
    console.error("CREATE ERROR FULL:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ---------------- GET ALL ---------------- */
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ isDeleted: false })
      .sort({ pinned: -1, updatedAt: -1 })
      .lean(); // ✅ faster

    res.json({
      success: true,
      data: notes,
    });
  } catch (err) {
    console.error("GET ALL ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ---------------- GET ONE ---------------- */
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      noteId: req.params.id,
      isDeleted: false, // ✅ FIX
    }).lean();

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    res.json({ success: true, data: note });
  } catch (err) {
    console.error("GET ONE ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ---------------- UPDATE ---------------- */
exports.updateNote = async (req, res) => {
  try {
    let { title, content, pinned, tags } = req.body;

    const updateData = {};

    if (title !== undefined) {
      const cleaned = cleanString(title);
      if (cleaned) updateData.title = cleaned;
    }

    if (content !== undefined) {
      updateData.content = cleanString(content) || "";
    }

    if (pinned !== undefined) {
      updateData.pinned = pinned;
    }

    if (tags !== undefined) {
      updateData.tags = tags;
    }

    const note = await Note.findOneAndUpdate(
      {
        noteId: req.params.id,
        isDeleted: false, // ✅ FIX
      },
      updateData,
      {
        new: true,
        runValidators: true, // ✅ important
      }
    );

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    res.json({
      success: true,
      data: note,
    });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ---------------- DELETE ---------------- */
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      {
        noteId: req.params.id,
        isDeleted: false, // ✅ FIX
      },
      { isDeleted: true },
      { new: true }
    );

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    res.json({
      success: true,
      message: "Note deleted",
      data: note,
    });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};