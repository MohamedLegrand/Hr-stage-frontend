import axiosInstance from "../../api/axiosInstance";

const adminService = {
  getDashboard: async () => {
    const response = await axiosInstance.get("/admin/dashboard");
    return response.data;
  },
  getDossiers: async () => {
    const response = await axiosInstance.get("/admin/dossiers");
    return response.data;
  },
  getDossierDetail: async (userId) => {
    const response = await axiosInstance.get(`/admin/dossiers/${userId}`);
    return response.data;
  },
  validerDocument: async (id, commentaire) => {
    const response = await axiosInstance.put(`/admin/documents/${id}/valider`, { commentaire });
    return response.data;
  },
  rejeterDocument: async (id, commentaire) => {
    const response = await axiosInstance.put(`/admin/documents/${id}/rejeter`, { commentaire });
    return response.data;
  },
  validerPaiement: async (id) => {
    const response = await axiosInstance.put(`/admin/paiements/${id}/valider`);
    return response.data;
  },
  rejeterPaiement: async (id, commentaire) => {
    const response = await axiosInstance.put(`/admin/paiements/${id}/rejeter`, { commentaire });
    return response.data;
  },
  getPaiements: async () => {
    const response = await axiosInstance.get("/admin/paiements");
    return response.data;
  }
  ,
  activerStagiaire: async (userId) => {
    const response = await axiosInstance.put(`/admin/stagiaires/${userId}/activer`);
    return response.data;
  },
  deleteStagiaire: async (userId) => {
    const response = await axiosInstance.delete(`/admin/stagiaires/${userId}`);
    return response.data;
  }
};

export default adminService;