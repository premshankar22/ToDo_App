import axiosClient from "../axiosClient";

const noteApi = {
  /* ---------------- GET ---------------- */
  getNotes: () => axiosClient.get("/notes"),

  getNoteById: (noteId) =>
    axiosClient.get(`/notes/${noteId}`),

  /* ---------------- CREATE ---------------- */
  createNote: (data) =>
    axiosClient.post("/notes", data),

  /* ---------------- UPDATE ---------------- */
  updateNote: (noteId, data) =>
    axiosClient.put(`/notes/${noteId}`, data),

  /* ---------------- DELETE ---------------- */
  deleteNote: (noteId) =>
    axiosClient.delete(`/notes/${noteId}`),

  /* ---------------- PIN ---------------- */
  togglePin: (noteId, pinned) =>
    axiosClient.patch(`/notes/${noteId}/pin`, { pinned }),

  /* ---------------- SEARCH ---------------- */
  searchNotes: (query) =>
    axiosClient.get(`/notes?search=${query}`),

  /* ---------------- IMAGE ---------------- */
  uploadImage: (formData) =>
    axiosClient.post("/notes/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default noteApi;