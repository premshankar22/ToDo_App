import { createContext, useContext, useState } from "react";

const TaskSidebarContext = createContext();

export function TaskSidebarProvider({ children }) {

  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false);

  const openTaskSidebar = (taskId) => {
    setSelectedTaskId(taskId);
    setOpenSidebar(true);
  };

  const closeTaskSidebar = () => {
    setSelectedTaskId(null);
    setOpenSidebar(false);
  };

  return (
    <TaskSidebarContext.Provider
      value={{
        selectedTaskId,
        openSidebar,
        openTaskSidebar,
        closeTaskSidebar
      }}
    >
      {children}
    </TaskSidebarContext.Provider>
  );
}

export const useTaskSidebar = () => useContext(TaskSidebarContext);