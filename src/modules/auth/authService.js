import axiosInstance from "../../api/axiosInstance";

const authService = {
  login: async (data) => {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  },
  register: async (data) => {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  },
  me: async () => {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  },
  getProfile: async () => {
    const response = await axiosInstance.get("/auth/profile");
    return response.data;
  },
  updateProfile: async (data) => {
    const response = await axiosInstance.put("/auth/profile", data);
    return response.data;
  }
};

export default authService;