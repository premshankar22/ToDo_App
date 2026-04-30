import { Box, TextField, IconButton, Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";

import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import NoteTool from "./NoteTool";

function NoteEditor({ note, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const editorRef = useRef(null);
  const draggedImage = useRef(null);
  const dropIndicator = useRef(null);

  useEffect(() => {
    if (note && editorRef.current) {
      setTitle(note.title || "");

      // ✅ FIX: Load content into editor
      editorRef.current.innerHTML = note.content || "";
    }
  }, [note]);

  /* ✅ IMAGE RESIZE LOGIC */

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    let currentWrapper = null;
    let startX = 0;
    let startWidth = 0;

    const onMouseDown = (e) => {
      if (e.target.classList.contains("resize-handle")) {
        currentWrapper = e.target.parentElement;
        startX = e.clientX;
        startWidth = currentWrapper.offsetWidth;

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      }
    };

    const onMouseMove = (e) => {
      if (!currentWrapper) return;

      const newWidth = Math.max(100, startWidth + (e.clientX - startX));

      currentWrapper.style.width = newWidth + "px";
    };

    const onMouseUp = () => {
      currentWrapper = null;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    editor.addEventListener("mousedown", onMouseDown);

    return () => {
      editor.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  /* ✅ SAVE NOTE */

  const handleSave = () => {
    let content = editorRef.current?.innerHTML || "";

    // ✅ Clean empty HTML
    if (content === "<br>" || content === "<div><br></div>") {
      content = "";
    }

    const newNote = {
      title: title.trim() || "Untitled",
      content,
    };

    onSave?.(newNote);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 900,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        background: "#ffffff",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1.5,
          borderBottom: "1px solid #e5e7eb",
          background: "#fafafa",
          gap: 1,
        }}
      >
        <TextField
          variant="standard"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          InputProps={{
            disableUnderline: true,
            style: { fontSize: 22, fontWeight: 700 },
          }}
        />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              boxShadow: "none",
            }}
          >
            Save
          </Button>

          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      {/* TOOLBAR */}
      <Box
        sx={{
          borderBottom: "1px solid #e5e7eb",
          background: "#ffffff",
          position: "sticky",
          top: 0,
          zIndex: 5,
        }}
      >
        <NoteTool />
      </Box>

      {/* EDITOR */}
      <Box
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        /* ✅ DRAG START */
        onDragStart={(e) => {
          const wrapper = e.target.closest(".img-wrapper");

          if (wrapper) {
            draggedImage.current = wrapper;

            // 🔥 Create smooth drag ghost
            const ghost = wrapper.cloneNode(true);
            ghost.style.position = "absolute";
            ghost.style.top = "-9999px";
            ghost.style.opacity = "0.6";
            ghost.style.pointerEvents = "none";

            document.body.appendChild(ghost);

            e.dataTransfer.setDragImage(ghost, 20, 20);

            setTimeout(() => document.body.removeChild(ghost), 0);

            e.dataTransfer.setData("text/plain", "image");
            e.dataTransfer.effectAllowed = "move";

            // ✨ Add dragging style
            wrapper.classList.add("dragging");
          }
        }}
        /* ✅ DRAG OVER */
        onDragOver={(e) => {
          e.preventDefault();

          const editor = editorRef.current;
          if (!editor) return;

          let indicator = dropIndicator.current;

          if (!indicator) {
            indicator = document.createElement("div");
            indicator.style.height = "2px";
            indicator.style.background = "#3b82f6";
            indicator.style.margin = "4px 0";
            indicator.style.borderRadius = "2px";

            dropIndicator.current = indicator;
          }

          const range = document.caretRangeFromPoint(e.clientX, e.clientY);

          if (!range) return;

          range.insertNode(indicator);
        }}
        /* ✅ DROP (FIXED) */
        onDrop={(e) => {
          e.preventDefault();

          const wrapper = draggedImage.current;
          if (!wrapper) return;

          const indicator = dropIndicator.current;

          if (indicator && indicator.parentNode) {
            indicator.parentNode.insertBefore(wrapper, indicator);
            indicator.remove();
          }

          wrapper.classList.remove("dragging");
          draggedImage.current = null;
        }}
        /* ✅ CLEANUP */
        onDragEnd={() => {
          draggedImage.current = null;
        }}
        /* ✅ LINK CLICK */
        onClick={(e) => {
          const link = e.target.closest("a");

          if (link) {
            e.preventDefault();
            window.open(link.href, "_blank");
          }
        }}
        sx={{
          flex: 1,
          p: 3,
          overflowY: "auto",
          outline: "none",
          fontSize: 16,
          lineHeight: 1.7,

          "&:empty:before": {
            content: '"Start writing your note..."',
            color: "#94a3b8",
          },

          /* IMAGE WRAPPER */
          "& .img-wrapper": {
            display: "inline-block",
            position: "relative",
            marginTop: "10px",
            cursor: "move",
            transition: "all 0.2s ease",
          },

          "& .img-wrapper img": {
            width: "100%",
            display: "block",
            borderRadius: "8px",
            userSelect: "none", // 🔥 important
            pointerEvents: "none", // 🔥 smoother drag
          },
          "& .img-wrapper.dragging": {
            opacity: 0.4,
            transform: "scale(0.95)",
          },

          "& .resize-handle": {
            width: "12px",
            height: "12px",
            background: "#3b82f6",
            position: "absolute",
            right: 0,
            bottom: 0,
            cursor: "nwse-resize",
            borderRadius: "2px",
          },

          "& blockquote": {
            borderLeft: "4px solid #e2e8f0",
            paddingLeft: "12px",
            color: "#475569",
          },

          "& pre": {
            background: "#0f172a",
            color: "#f8fafc",
            padding: "10px",
            borderRadius: "6px",
          },

          "& a": {
            color: "#2563eb",
            textDecoration: "underline",
          },
        }}
      />
    </Box>
  );
}

export default NoteEditor;
