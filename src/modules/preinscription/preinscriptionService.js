import axiosInstance from "../../api/axiosInstance";

const preinscriptionService = {
  getStatut: async () => {
    const response = await axiosInstance.get("/preinscription/statut");
    return response.data;
  },
  initierPreinscription: async (data) => {
    const response = await axiosInstance.post("/preinscription/initier", data);
    return response.data;
  },
  getListe: async () => {
    const response = await axiosInstance.get("/preinscription/liste");
    return response.data;
  },
  validerPreinscription: async (id) => {
    const response = await axiosInstance.put(`/preinscription/${id}/valider`);
    return response.data;
  },
  rejeterPreinscription: async (id) => {
    const response = await axiosInstance.put(`/preinscription/${id}/rejeter`);
    return response.data;
  }
};

export default preinscriptionService;
