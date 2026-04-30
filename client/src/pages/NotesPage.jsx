import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

import NotesList from "../components/notes/NotesList";
import NoteEditor from "../components/notes/NoteEditor";

import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

import noteApi from "../api/task/noteApi"; // ✅ FIXED PATH

function NotesPage() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);

  /* ---------------- LOAD NOTES ---------------- */
  const fetchNotes = async () => {
    try {
      const res = await noteApi.getNotes();
      setNotes(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  /* ---------------- SAVE NOTE ---------------- */
  const handleSave = async (note) => {
    try {
      const payload = {
        title: note.title || "Untitled",
        content: note.content || "",
      };

      if (selectedNote?.noteId) {
        const res = await noteApi.updateNote(selectedNote.noteId, payload);

        // ✅ IMPORTANT: update editor state
       setSelectedNote(res.data.data);
      } else {
        const res = await noteApi.createNote(payload);
       setSelectedNote(res.data.data);
      }

      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (noteId) => {
    try {
      await noteApi.deleteNote(noteId);
      fetchNotes();
      setSelectedNote(null);
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- PIN ---------------- */
  const handlePin = async (noteId, pinned) => {
    try {
      await noteApi.togglePin(noteId, pinned);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      {/* NOTES LIST */}
      <Box
        sx={{
          width: 300,
          borderRight: "1px solid #e2e8f0",
          background: "#f8fafc",
        }}
      >
        <NotesList
          notes={notes}
          onSelect={setSelectedNote}
          onDelete={handleDelete}
          onPin={handlePin} // ✅ FIXED
          refresh={fetchNotes}
        />
      </Box>

      {/* EDITOR */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          p: 3,
        }}
      >
        {selectedNote ? (
          <NoteEditor
            key={selectedNote?.noteId}
            note={selectedNote}
            onClose={() => setSelectedNote(null)}
            onSave={handleSave}
          />
        ) : (
          <Box
            sx={{
              textAlign: "center",
              color: "#64748b",
              maxWidth: 320,
            }}
          >
            <EditNoteOutlinedIcon
              sx={{
                fontSize: 80,
                color: "#cbd5f5",
                mb: 2,
              }}
            />

            <Typography fontWeight={600} fontSize={18}>
              No note selected
            </Typography>

            <Typography fontSize={13} mt={1}>
              Create or select a note to get started ✨
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default NotesPage;
