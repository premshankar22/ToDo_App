export const eventStyleGetter = (event) => {

  let background = "linear-gradient(135deg,#6366f1,#8b5cf6)";

  if (event.priority === "high")
    background = "linear-gradient(135deg,#ef4444,#f97316)";

  if (event.priority === "medium")
    background = "linear-gradient(135deg,#f59e0b,#fbbf24)";

  if (event.priority === "low")
    background = "linear-gradient(135deg,#10b981,#22c55e)";

  return {
    style: {
      background,
      borderRadius: "8px",
      color: "white",
      border: "none",
      padding: "3px 8px",
      fontWeight: 600,
      fontSize: "12px",
      boxShadow: "0 3px 8px rgba(0,0,0,0.15)"
    }
  };
};