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
  simulerSucces: async (referenceInterne) => {
    const response = await axiosInstance.post(`/preinscription/simuler-succes/${referenceInterne}`);
    return response.data;
  },
  getListe: async () => {
    const response = await axiosInstance.get("/preinscription/liste");
    return response.data;
  },
};

export default preinscriptionService;
