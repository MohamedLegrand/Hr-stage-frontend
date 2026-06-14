import axiosInstance from "../../api/axiosInstance";

const documentsService = {
  getMesDocuments: async () => {
    const response = await axiosInstance.get("/documents/mes-documents");
    return response.data;
  },
  uploadDocument: async (type, file) => {
    const formData = new FormData();
    formData.append("type", type);
    formData.append("file", file);
    const response = await axiosInstance.post("/documents/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
  },
  deleteDocument: async (id) => {
    const response = await axiosInstance.delete(`/documents/${id}`);
    return response.data;
  }

  ,
  getDocumentsByStagiaire: async (userId) => {
    const response = await axiosInstance.get(`/documents/stagiaire/${userId}`);
    return response.data;
  },
  updateDocumentStatut: async (documentId, statut, commentaire) => {
    const response = await axiosInstance.put(`/documents/${documentId}/statut`, { statut, commentaire });
    return response.data;
  }
};

export default documentsService;