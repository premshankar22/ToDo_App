import axiosClient from "../axiosClient";

const taskApi = {

  getTasks: () => {
    return axiosClient.get("/tasks");
  },

  createTask: (data) => {
    return axiosClient.post("/tasks", data);
  },

  updateTask: (taskId, data) => {
    return axiosClient.put(`/tasks/${taskId}`, data);
  },

  deleteTask: (taskId) => {
    return axiosClient.delete(`/tasks/${taskId}`);
  },

  uploadFiles: (taskId, formData) => {
    return axiosClient.post(`/tasks/${taskId}/files`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },

  getTrash: () => {
  return axiosClient.get("/tasks/trash");
},

restoreTask: (taskId) => {
  return axiosClient.put(`/tasks/${taskId}/restore`);
},

deleteForever: (taskId) => {
  return axiosClient.delete(`/tasks/${taskId}?permanent=true`);
}

};

export default taskApi;