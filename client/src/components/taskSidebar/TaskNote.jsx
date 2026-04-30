import { useState, useEffect } from "react";
import { Box, Typography, TextField, IconButton, Tooltip } from "@mui/material";

import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

function TaskNote({ task, saveNote }) {
  const [note, setNote] = useState("");

  useEffect(() => {
    setNote(task?.note || "");
  }, [task]);

  return (
    <Box
      sx={{
        border: "1px solid #f1f5f9",
        borderRadius: 2,
        p: 1.5,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {/* HEADER */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <NotesOutlinedIcon fontSize="small" sx={{ color: "#64748b" }} />

          <Typography fontSize={13} fontWeight={500}>
            Note
          </Typography>
        </Box>

        <Tooltip title="Save Note">
          <IconButton size="small" onClick={() => saveNote(note)}>
            <SaveOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* NOTE INPUT */}

      <TextField
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write a note for this task..."
        multiline
        minRows={3}
        variant="outlined"
        size="small"
        sx={{
          background: "#fafafa",
          "& .MuiOutlinedInput-root": {
            fontSize: 13,
          },
        }}
      />
    </Box>
  );
}

export default TaskNote;
