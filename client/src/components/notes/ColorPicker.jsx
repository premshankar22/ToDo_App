import { Box } from "@mui/material";

/* PROFESSIONAL COLOR PALETTE */

const COLORS = [
  // Grayscale
  "#000000", "#1f2937", "#374151", "#6b7280", "#9ca3af", "#d1d5db", "#f3f4f6", "#ffffff",

  // Red
  "#7f1d1d", "#b91c1c", "#dc2626", "#ef4444", "#f87171", "#fca5a5",

  // Orange
  "#7c2d12", "#c2410c", "#ea580c", "#f97316", "#fb923c", "#fdba74",

  // Yellow
  "#713f12", "#a16207", "#ca8a04", "#eab308", "#facc15", "#fde047",

  // Green
  "#14532d", "#166534", "#16a34a", "#22c55e", "#4ade80", "#86efac",

  // Teal
  "#134e4a", "#0f766e", "#14b8a6", "#2dd4bf", "#5eead4", "#99f6e4",

  // Blue
  "#1e3a8a", "#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa", "#93c5fd",

  // Purple
  "#4c1d95", "#6d28d9", "#7c3aed", "#8b5cf6", "#a78bfa", "#c4b5fd",

  // Pink
  "#831843", "#be185d", "#db2777", "#ec4899", "#f472b6", "#f9a8d4"
];

function ColorPicker({ onSelect }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 24px)",
        gap: 1,
        p: 1.5,
        maxWidth: 280
      }}
    >
      {COLORS.map((color) => (
        <Box
          key={color}
          onClick={() => onSelect(color)}
          sx={{
            width: 24,
            height: 24,
            borderRadius: "4px",
            background: color,
            border: color === "#ffffff" ? "1px solid #ccc" : "none",
            cursor: "pointer",
            transition: "all 0.2s",

            "&:hover": {
              transform: "scale(1.15)",
              boxShadow: "0 0 0 2px #00000020"
            }
          }}
        />
      ))}
    </Box>
  );
}

export default ColorPicker;