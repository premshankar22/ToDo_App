import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import { TaskSidebarProvider } from "./context/TaskSidebarContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <BrowserRouter>

      <TaskSidebarProvider>
        <App />
      </TaskSidebarProvider>

    </BrowserRouter>

  </StrictMode>
);