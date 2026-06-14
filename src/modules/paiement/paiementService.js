import axiosInstance from "../../api/axiosInstance";

const paiementService = {
  getStatut: async () => {
    const response = await axiosInstance.get("/paiement/statut");
    return response.data;
  },
  initierPaiement: async (data) => {
    const response = await axiosInstance.post("/paiement/initier", data);
    return response.data;
  }
};

export default paiementService;

// Optional: admin-facing list endpoint (non-admin route exists at /admin/paiements)
paiementService.getPaiementsList = async () => {
  const response = await axiosInstance.get("/paiement/liste");
  return response.data;
};