import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  MenuItem,
  ListItemIcon,
  Menu,
} from "@mui/material";

import { TASK_FILE_ICONS } from "../../constants/taskOptions";
import { getFileIcon } from "../../utils/fileUtils";

function TaskFiles({ files = [], handleFileUpload, deleteFile }) {
  const [fileMenu, setFileMenu] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const openMenu = (event, file) => {
    setFileMenu(event.currentTarget);
    setSelectedFile(file);
  };

  const closeMenu = () => {
    setFileMenu(null);
    setSelectedFile(null);
  };

  const viewFile = () => {
    if (!selectedFile) return;
    const fileUrl = `http://localhost:5000${selectedFile.url}`;
    window.open(fileUrl, "_blank", "noopener,noreferrer");
    closeMenu();
  };

  const removeFile = () => {
    deleteFile(selectedFile);
    closeMenu();
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={TASK_FILE_ICONS.expand}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {TASK_FILE_ICONS.uploadSmall}
          <Typography fontSize={13}>Files</Typography>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {/* FILE LIST */}

          {files.length > 0 ? (
            files.map((file, index) => (
              <Box
                key={file.url || index}
                onClick={(e) => openMenu(e, file)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                  p: 1,
                  borderRadius: 1,
                  border: "1px solid #f1f5f9",
                  background: "#fafafa",
                  cursor: "pointer",
                  "&:hover": { background: "#f1f5f9" },
                }}
              >
                <Typography fontSize={13} fontWeight={500}>
                  {file.name || "Unknown File"}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {getFileIcon(file.type)}

                  <Typography fontSize={11} color="#64748b">
                    {file.type?.split("/")[1] || "file"} •{" "}
                    {file.size ? (file.size / 1024).toFixed(1) : "0"} KB
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography fontSize={12} color="#94a3b8">
              No files uploaded
            </Typography>
          )}

          {/* FILE MENU */}

          <Menu
            anchorEl={fileMenu}
            open={Boolean(fileMenu)}
            onClose={closeMenu}
            PaperProps={{ sx: { width: 160 } }}
          >
            <MenuItem onClick={viewFile}>
              <ListItemIcon>{TASK_FILE_ICONS.view}</ListItemIcon>
              View
            </MenuItem>

            <MenuItem onClick={removeFile}>
              <ListItemIcon>{TASK_FILE_ICONS.delete}</ListItemIcon>
              Delete
            </MenuItem>
          </Menu>

          {/* UPLOAD BUTTON */}

          <label>
            <input type="file" multiple hidden onChange={handleFileUpload} />

            <MenuItem>
              <ListItemIcon>{TASK_FILE_ICONS.upload}</ListItemIcon>
              Upload File
            </MenuItem>
          </label>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default TaskFiles;
