import { useEffect, useState } from "react";
import taskApi from "../api/task/taskApi";
import { useTaskSidebar } from "../context/TaskSidebarContext";

export default function useTaskSidebarLogic() {

  const { selectedTaskId, closeTaskSidebar } = useTaskSidebar();

  const [task, setTask] = useState(null);
  const [priority, setPriority] = useState(null);
  const [status, setStatus] = useState(null);

  const [priorityMenu, setPriorityMenu] = useState(null);
  const [statusMenu, setStatusMenu] = useState(null);

  const [files, setFiles] = useState([]);
  const [fileMenu, setFileMenu] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {

    if (!selectedTaskId) return;

    const loadTask = async () => {
      const res = await taskApi.getTasks();
      const found = res.data.find(t => t.taskId === selectedTaskId);

      setTask(found);
      setPriority(found?.priority);
      setStatus(found?.status);
      setFiles(found?.files || []);  
    };

    loadTask();

  }, [selectedTaskId]);
  
  // keep files synced with task
 useEffect(() => {
  if (task?.files) {
    setFiles(task.files);
  }
}, [task]);

  const selectPriority = async (value) => {
    setPriority(value);
    await taskApi.updateTask(selectedTaskId,{ priority:value });
    setPriorityMenu(null);
  };

  const selectStatus = async (value) => {
    setStatus(value);
    await taskApi.updateTask(selectedTaskId,{ status:value });
    setStatusMenu(null);
  };


  const deleteTask = async ()=>{
  await taskApi.deleteTask(selectedTaskId);
  closeTaskSidebar();
  window.location.reload();
};


const deleteFile = async (file) => {
  const updatedFiles = files.filter(f => f.url !== file.url);
  const res = await taskApi.updateTask(
    selectedTaskId,
    { files: updatedFiles }
  );
  setTask(res.data);
  setFiles(res.data.files || []);
};

const saveNote = async (noteText)=>{
  const res = await taskApi.updateTask(
    selectedTaskId,
    { note: noteText }
  );
  setTask(res.data);
};

const handleFileUpload = async (e) => {

  const selected = Array.from(e.target.files);

  const formData = new FormData();

  selected.forEach(file => {
    formData.append("files", file);
  });

  const res = await taskApi.uploadFiles(
    selectedTaskId,
    formData
  );

  setTask(res.data);
  setFiles(res.data.files || []);
};


  return {

    task,
    setTask,
    priority,
    status,
    files,
    selectedFile,

    priorityMenu,
    statusMenu,
    fileMenu,

    setPriorityMenu,
    setStatusMenu,
    setFileMenu,
    setSelectedFile,

    selectPriority,
    selectStatus,
    deleteTask,
    handleFileUpload,
   
  deleteFile,
   saveNote,
  selectedTaskId,
  closeTaskSidebar
  };
}