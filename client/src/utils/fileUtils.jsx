import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import AudiotrackOutlinedIcon from "@mui/icons-material/AudiotrackOutlined";
import VideoFileOutlinedIcon from "@mui/icons-material/VideoFileOutlined";
import FolderZipOutlinedIcon from "@mui/icons-material/FolderZipOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";

export const getFileIcon = (type) => {

  if (!type) 
    return <InsertDriveFileOutlinedIcon sx={{ color: "#64748b" }} />;

  type = type.toLowerCase();

  if (type.includes("pdf"))
    return <PictureAsPdfOutlinedIcon sx={{ color: "#ef4444" }} />;

  if (type.includes("image"))
    return <ImageOutlinedIcon sx={{ color: "#3b82f6" }} />;

  if (type.includes("word") || type.includes("document"))
    return <DescriptionOutlinedIcon sx={{ color: "#2563eb" }} />;

  if (type.includes("excel") || type.includes("spreadsheet") || type.includes("csv"))
    return <TableChartOutlinedIcon sx={{ color: "#16a34a" }} />;

  if (type.includes("powerpoint") || type.includes("presentation"))
    return <SlideshowOutlinedIcon sx={{ color: "#ea580c" }} />;

  if (type.includes("audio"))
    return <AudiotrackOutlinedIcon sx={{ color: "#9333ea" }} />;

  if (type.includes("video"))
    return <VideoFileOutlinedIcon sx={{ color: "#f59e0b" }} />;

  if (type.includes("zip") || type.includes("rar") || type.includes("compressed"))
    return <FolderZipOutlinedIcon sx={{ color: "#f97316" }} />;

  if (type.includes("javascript") || type.includes("json") || type.includes("html") || type.includes("css"))
    return <CodeOutlinedIcon sx={{ color: "#0ea5e9" }} />;

  if (type.includes("text"))
    return <TextSnippetOutlinedIcon sx={{ color: "#64748b" }} />;

  return <InsertDriveFileOutlinedIcon sx={{ color: "#64748b" }} />;
};