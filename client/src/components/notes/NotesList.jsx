import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Divider,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PushPinIcon from "@mui/icons-material/PushPin";

import { useState } from "react";
import noteApi from "../../api/task/noteApi";

function NotesList({ notes = [], onSelect, onDelete, onPin, refresh }) {
  const [selectedId, setSelectedId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeNote, setActiveNote] = useState(null);
  const [search, setSearch] = useState("");

  /* ---------------- CREATE ---------------- */
  const createNote = async () => {
    try {
      const res = await noteApi.createNote({
        title: "New Note",
        content: "",
      });

      onSelect(res.data.data); // ✅ FIXED
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- MENU ---------------- */
  const openMenu = (e, note) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    setActiveNote(note);
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setActiveNote(null);
  };

  /* ---------------- DELETE ---------------- */
  const deleteNote = async () => {
    if (!activeNote) return;
    await onDelete(activeNote.noteId);
    closeMenu();
  };

  /* ---------------- PIN ---------------- */
  const togglePin = async () => {
    if (!activeNote) return;
    await onPin(activeNote.noteId, !activeNote.pinned);
    closeMenu();
  };

  /* ---------------- FILTER ---------------- */
  const filteredNotes = notes.filter((n) =>
    n.title?.toLowerCase().includes(search.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter((n) => n.pinned);
  const otherNotes = filteredNotes.filter((n) => !n.pinned);

  /* ---------------- RENDER ITEM ---------------- */
  const renderItem = (note) => (
    <ListItemButton
      key={note.noteId}
      selected={selectedId === note.noteId}
      onClick={() => {
        setSelectedId(note.noteId);
        onSelect(note);
      }}
      sx={{
        borderRadius: 2,
        mx: 1,
        mb: 0.5,
        alignItems: "flex-start",
        transition: "all 0.2s ease",

        "&:hover": {
          background: "#f1f5f9",
        },

        "&.Mui-selected": {
          background: "#e0f2fe",
        },

        "&:hover .menu-btn": {
          opacity: 1,
        },
      }}
    >
      <ListItemText
        primary={note.title || "Untitled"}
        secondary={note.pinned ? "📌 Pinned" : ""}
        primaryTypographyProps={{
          fontSize: 14,
          fontWeight: 500,
          noWrap: true,
        }}
        secondaryTypographyProps={{
          fontSize: 11,
          color: "#64748b",
        }}
      />

      {/* MENU BUTTON */}
      <IconButton
        size="small"
        className="menu-btn"
        onClick={(e) => openMenu(e, note)}
        sx={{
          opacity: 0,
          transition: "0.2s",
        }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
    </ListItemButton>
  );

  return (
    <Box>
      {/* HEADER */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight={700}>Notes</Typography>

          <IconButton size="small" onClick={createNote}>
            <AddIcon />
          </IconButton>
        </Box>

        {/* SEARCH */}
        <TextField
          size="small"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* NOTES */}
      <List sx={{ pb: 2 }}>
        {/* 📌 PINNED */}
        {pinnedNotes.length > 0 && (
          <>
            <Typography
              sx={{
                px: 2,
                py: 1,
                fontSize: 11,
                fontWeight: 600,
                color: "#64748b",
              }}
            >
              📌 PINNED
            </Typography>

            {pinnedNotes.map(renderItem)}

            <Divider sx={{ my: 1 }} />
          </>
        )}

        {/* 📝 OTHERS */}
        {otherNotes.length > 0 && (
          <>
            <Typography
              sx={{
                px: 2,
                py: 1,
                fontSize: 11,
                fontWeight: 600,
                color: "#64748b",
              }}
            >
              NOTES
            </Typography>

            {otherNotes.map(renderItem)}
          </>
        )}

        {/* EMPTY STATE */}
        {filteredNotes.length === 0 && (
          <Typography
            sx={{
              textAlign: "center",
              color: "#94a3b8",
              mt: 4,
              fontSize: 13,
            }}
          >
            No notes found
          </Typography>
        )}
      </List>

      {/* MENU */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem onClick={togglePin}>
          <PushPinIcon fontSize="small" sx={{ mr: 1 }} />
          {activeNote?.pinned ? "Unpin" : "Pin"}
        </MenuItem>

        <MenuItem onClick={deleteNote}>
          <DeleteOutlineIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default NotesList;