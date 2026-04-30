import {
  Box,
  IconButton,
  Divider,
  Tooltip,
  Select,
  MenuItem,
  Popover,
} from "@mui/material";
import { useRef, useState } from "react";

/* TEXT FORMAT */
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";

/* LISTS */
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ChecklistIcon from "@mui/icons-material/Checklist";

/* EXTRA */
import LinkIcon from "@mui/icons-material/Link";
import CodeIcon from "@mui/icons-material/Code";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

/* HISTORY */
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

/* IMAGE */
import ImageIcon from "@mui/icons-material/Image";

/* COLORS */
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import HighlightIcon from "@mui/icons-material/Highlight";

/* SCRIPT */
import SuperscriptIcon from "@mui/icons-material/Superscript";
import SubscriptIcon from "@mui/icons-material/Subscript";

/* CLEAR */
import FormatClearIcon from "@mui/icons-material/FormatClear";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

/* CUSTOM */
import InsertLinkDialog from "./InsertLinkDialog";
import ColorPicker from "./ColorPicker";
import noteApi from "../../api/task/noteApi";


function NoteTool() {
  const fileInputRef = useRef(null);
  const selectionRef = useRef(null);

  const [openLinkDialog, setOpenLinkDialog] = useState(false);
  const [anchorElText, setAnchorElText] = useState(null);
  const [anchorElBg, setAnchorElBg] = useState(null);

  /* ------------------ SELECTION ------------------ */

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      selectionRef.current = selection.getRangeAt(0);
    }
  };

  const restoreSelection = () => {
    const selection = window.getSelection();
    if (selectionRef.current) {
      selection.removeAllRanges();
      selection.addRange(selectionRef.current);
    }
  };

  const applyFormat = (command, value = null) => {
    restoreSelection();
    document.execCommand(command, false, value);
  };

  const applyFontSize = (size) => {
    restoreSelection();

    document.execCommand("fontSize", false, "7");

    const fonts = document.getElementsByTagName("font");

    for (let i = 0; i < fonts.length; i++) {
      if (fonts[i].size === "7") {
        fonts[i].removeAttribute("size");
        fonts[i].style.fontSize = size + "px";
      }
    }
  };
  /* ------------------ IMAGE ------------------ */

  const openFilePicker = () => fileInputRef.current.click();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // optional: limit file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    restoreSelection();

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await noteApi.uploadImage(formData);

      const imageUrl = res.data.url;

      const html = `
      <div class="img-wrapper" contenteditable="false" draggable="true">
        <img src="${imageUrl}" />
        <span class="resize-handle"></span>
      </div>
    `;

      document.execCommand("insertHTML", false, html);
    } catch (err) {
      console.error("Image upload failed:", err);
    }

    event.target.value = "";
  };

  /* ------------------ LINK ------------------ */

  const insertLink = ({ title, url }) => {
    restoreSelection();
    const html = `<a href="${url}" target="_blank">${title}</a>`;
    document.execCommand("insertHTML", false, html);
  };

  /* ------------------ COLORS ------------------ */

  const handleTextColor = (color) => {
    applyFormat("foreColor", color);
    setAnchorElText(null);
  };

  const handleBgColor = (color) => {
    applyFormat("hiliteColor", color);
    setAnchorElBg(null);
  };

  /* ------------------ STYLE ------------------ */

  const buttonStyle = {
    borderRadius: "6px",
    "&:hover": {
      backgroundColor: "#f1f5f9",
      transform: "scale(1.05)",
    },
  };

  /* ------------------ UI ------------------ */

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 1,
        p: 1,
        borderRadius: "10px",
        background: "#fff",
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      {/* FONT FAMILY */}
      <Select
        size="small"
        defaultValue="Arial"
        onChange={(e) => applyFormat("fontName", e.target.value)}
        sx={{ minWidth: 180 }}
      >
        {/* SYSTEM FONTS */}
        <MenuItem value="Arial" sx={{ fontFamily: "Arial" }}>
          Arial
        </MenuItem>
        <MenuItem value="Helvetica" sx={{ fontFamily: "Helvetica" }}>
          Helvetica
        </MenuItem>
        <MenuItem value="Verdana" sx={{ fontFamily: "Verdana" }}>
          Verdana
        </MenuItem>
        <MenuItem value="Tahoma" sx={{ fontFamily: "Tahoma" }}>
          Tahoma
        </MenuItem>

        <Divider />

        {/* SERIF */}
        <MenuItem
          value="Times New Roman"
          sx={{ fontFamily: "Times New Roman" }}
        >
          Times New Roman
        </MenuItem>
        <MenuItem value="Georgia" sx={{ fontFamily: "Georgia" }}>
          Georgia
        </MenuItem>
        <MenuItem value="Garamond" sx={{ fontFamily: "Garamond" }}>
          Garamond
        </MenuItem>

        <Divider />

        {/* MONOSPACE */}
        <MenuItem value="Courier New" sx={{ fontFamily: "Courier New" }}>
          Courier New
        </MenuItem>
        <MenuItem value="Lucida Console" sx={{ fontFamily: "Lucida Console" }}>
          Lucida Console
        </MenuItem>
        <MenuItem value="Monospace" sx={{ fontFamily: "monospace" }}>
          Monospace
        </MenuItem>
        {/* MODERN WEB FONTS */}
        <MenuItem value="Roboto" sx={{ fontFamily: "Roboto" }}>
          Roboto
        </MenuItem>
        <MenuItem value="Inter" sx={{ fontFamily: "Inter" }}>
          Inter
        </MenuItem>
        <MenuItem value="Poppins" sx={{ fontFamily: "Poppins" }}>
          Poppins
        </MenuItem>
        <MenuItem value="Open Sans" sx={{ fontFamily: "Open Sans" }}>
          Open Sans
        </MenuItem>
        <MenuItem value="Lato" sx={{ fontFamily: "Lato" }}>
          Lato
        </MenuItem>
        <MenuItem value="Montserrat" sx={{ fontFamily: "Montserrat" }}>
          Montserrat
        </MenuItem>

        <Divider />

        {/* STYLISH / CREATIVE */}
        <MenuItem
          value="Playfair Display"
          sx={{ fontFamily: "Playfair Display" }}
        >
          Playfair Display
        </MenuItem>
        <MenuItem value="Merriweather" sx={{ fontFamily: "Merriweather" }}>
          Merriweather
        </MenuItem>
        <MenuItem value="Pacifico" sx={{ fontFamily: "Pacifico" }}>
          Pacifico
        </MenuItem>
      </Select>

      {/* FONT SIZE */}
      <Select
        size="small"
        defaultValue="14"
        onChange={(e) => applyFontSize(e.target.value)}
        sx={{ width: 100 }}
      >
        <MenuItem value="10">10 px</MenuItem>
        <MenuItem value="12">12 px</MenuItem>
        <MenuItem value="14">14 px</MenuItem>
        <MenuItem value="16">16 px</MenuItem>
        <MenuItem value="18">18 px</MenuItem>
        <MenuItem value="20">20 px</MenuItem>
        <MenuItem value="24">24 px</MenuItem>
        <MenuItem value="28">28 px</MenuItem>
        <MenuItem value="32">32 px</MenuItem>
        <MenuItem value="40">40 px</MenuItem>
        <MenuItem value="48">48 px</MenuItem>
      </Select>

      {/* HEADINGS */}
      <Select
        size="small"
        defaultValue="p"
        onChange={(e) => applyFormat("formatBlock", e.target.value)}
        sx={{ width: 90 }}
      >
        <MenuItem value="p">Normal</MenuItem>
        <MenuItem value="h1">H1</MenuItem>
        <MenuItem value="h2">H2</MenuItem>
        <MenuItem value="h3">H3</MenuItem>
      </Select>

      <Divider orientation="vertical" flexItem />

      {/* TEXT */}
      <Tooltip title="Bold">
        <IconButton sx={buttonStyle} onClick={() => applyFormat("bold")}>
          <FormatBoldIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Italic">
        <IconButton sx={buttonStyle} onClick={() => applyFormat("italic")}>
          <FormatItalicIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Underline">
        <IconButton sx={buttonStyle} onClick={() => applyFormat("underline")}>
          <FormatUnderlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Strike">
        <IconButton
          sx={buttonStyle}
          onClick={() => applyFormat("strikeThrough")}
        >
          <StrikethroughSIcon />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem />

      {/* LIST */}
      <Tooltip title="Bullet">
        <IconButton
          sx={buttonStyle}
          onClick={() => applyFormat("insertUnorderedList")}
        >
          <FormatListBulletedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Numbered">
        <IconButton
          sx={buttonStyle}
          onClick={() => applyFormat("insertOrderedList")}
        >
          <FormatListNumberedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Checklist">
        <IconButton
          sx={buttonStyle}
          onClick={() => applyFormat("insertUnorderedList")}
        >
          <ChecklistIcon />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem />

      {/* LINK */}
      <Tooltip title="Link">
        <IconButton
          sx={buttonStyle}
          onClick={() => {
            saveSelection();
            setOpenLinkDialog(true);
          }}
        >
          <LinkIcon />
        </IconButton>
      </Tooltip>

      {/* IMAGE */}
      <Tooltip title="Image">
        <IconButton sx={buttonStyle} onClick={openFilePicker}>
          <ImageIcon />
        </IconButton>
      </Tooltip>

      <input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={handleImageUpload}
      />

      <Divider orientation="vertical" flexItem />

      {/* COLORS */}
      <Tooltip title="Text Color">
        <IconButton
          onClick={(e) => {
            saveSelection();
            setAnchorElText(e.currentTarget);
          }}
        >
          <FormatColorTextIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Highlight">
        <IconButton
          onClick={(e) => {
            saveSelection();
            setAnchorElBg(e.currentTarget);
          }}
        >
          <HighlightIcon />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem />

      {/* EXTRA */}
      <Tooltip title="Code">
        <IconButton onClick={() => applyFormat("formatBlock", "pre")}>
          <CodeIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Quote">
        <IconButton onClick={() => applyFormat("formatBlock", "blockquote")}>
          <FormatQuoteIcon />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem />

      {/* SCRIPT */}
      <Tooltip title="Superscript">
        <IconButton onClick={() => applyFormat("superscript")}>
          <SuperscriptIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Subscript">
        <IconButton onClick={() => applyFormat("subscript")}>
          <SubscriptIcon />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem />

      {/* HISTORY */}
      <Tooltip title="Undo">
        <IconButton onClick={() => applyFormat("undo")}>
          <UndoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Redo">
        <IconButton onClick={() => applyFormat("redo")}>
          <RedoIcon />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem />

      {/* CLEAR */}
      <Tooltip title="Clear">
        <IconButton onClick={() => applyFormat("removeFormat")}>
          <FormatClearIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Line">
        <IconButton onClick={() => applyFormat("insertHorizontalRule")}>
          <HorizontalRuleIcon />
        </IconButton>
      </Tooltip>

      {/* DIALOG */}
      <InsertLinkDialog
        open={openLinkDialog}
        onClose={() => setOpenLinkDialog(false)}
        onInsert={insertLink}
      />

      {/* COLOR PICKERS */}
      <Popover
        open={Boolean(anchorElText)}
        anchorEl={anchorElText}
        onClose={() => setAnchorElText(null)}
      >
        <ColorPicker onSelect={handleTextColor} />
      </Popover>

      <Popover
        open={Boolean(anchorElBg)}
        anchorEl={anchorElBg}
        onClose={() => setAnchorElBg(null)}
      >
        <ColorPicker onSelect={handleBgColor} />
      </Popover>
    </Box>
  );
}

export default NoteTool;
