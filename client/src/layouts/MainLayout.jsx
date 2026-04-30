import { Outlet } from "react-router-dom";
import "./MainLayout.css";
import TodoHeader from "../components/TodoHeader";
import Sidebar from "../components/Sidebar";
import { useTaskSidebar } from "../context/TaskSidebarContext";
import TaskSidebar from "../components/taskSidebar/TaskSidebar";

function MainLayout() {
  const { openSidebar } = useTaskSidebar();

  return (
    <div className="layout">

      <header className="header">
        <TodoHeader />
      </header>

      <div className="dashboard">

        <aside className="sidebar">
        <Sidebar />
        </aside>

        <main className="content">
          <Outlet />
        </main>

        {openSidebar && (
    <aside className="taskSidebar">
      <TaskSidebar />
    </aside>
  )}

      </div>

    </div>
  );
}

export default MainLayout;