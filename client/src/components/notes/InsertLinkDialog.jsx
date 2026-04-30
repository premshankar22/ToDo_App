import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";

import { useState } from "react";

function InsertLinkDialog({ open, onClose, onInsert }) {

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleInsert = () => {

    if (!url) return;

    onInsert({
      title: title || url,
      url
    });

    setTitle("");
    setUrl("");
    onClose();
  };

  return (

    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>

      <DialogTitle>Insert Link</DialogTitle>

      <DialogContent>

        <TextField
          label="Title"
          placeholder="Text to display"
          fullWidth
          margin="dense"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="URL"
          placeholder="https://example.com"
          fullWidth
          margin="dense"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleInsert}
        >
          Insert
        </Button>

      </DialogActions>

    </Dialog>

  );
}

export default InsertLinkDialog;