import api from "./api";

export const getDashboard = async () => {
    const response = await api.get("/Customers/dashboard");
    return response.data;
};