import axiosInstance from "../../api/axiosInstance";

const paiementService = {
  // Retourne null (200) si aucun paiement, objet paiement sinon
  getStatut: async () => {
    const { data } = await axiosInstance.get("/paiement/statut");
    return data;
  },

  initierPaiement: async ({ telephone, operateur }) => {
    const { data } = await axiosInstance.post("/paiement/initier", { telephone, operateur });
    return data;
  },

  simulerSucces: async (referenceInterne) => {
    const { data } = await axiosInstance.post(`/paiement/simuler-succes/${referenceInterne}`);
    return data;
  },
};

export default paiementService;
