const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const upload = require("../middleware/upload");
const Note = require("../models/Note"); // ✅ REQUIRED

const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

/* ---------------- NOTE CRUD ---------------- */
router.use(protect);
router.post("/", createNote);
router.get("/", getNotes);
router.get("/:id", getNoteById);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

/* ---------------- IMAGE UPLOAD ---------------- */

router.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.json({
      url: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id/pin", async (req, res) => {
  try {
    const { pinned } = req.body;

    const note = await Note.findOneAndUpdate(
      { noteId: req.params.id, isDeleted: false },
      { pinned },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.json({ success: true, data: note });
  } catch (err) {
    console.error("PIN ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;