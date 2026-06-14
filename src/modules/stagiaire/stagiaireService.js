import axiosInstance from "../../api/axiosInstance";

const stagiaireService = {
  getProfil: async () => {
    const response = await axiosInstance.get("/stagiaire/profil");
    return response.data;
  },
  updateProfil: async (data) => {
    const response = await axiosInstance.put("/stagiaire/profil", data);
    return response.data;
  }
};

export default stagiaireService;