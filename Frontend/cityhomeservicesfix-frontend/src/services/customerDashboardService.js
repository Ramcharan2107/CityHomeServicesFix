import api from "./api";

const getDashboard = async () => {
    const response = await api.get("/Customers/dashboard");
    return response.data;
};

export default {
    getDashboard
};