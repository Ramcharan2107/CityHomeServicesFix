import api from "./api";

const customerService = {
    getAll: async () => {
        const response = await api.get("/Customers");
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/Customers/${id}`);
        return response.data;
    },

    create: async (customer) => {
        const response = await api.post("/Customers", customer);
        return response.data;
    },

    update: async (id, customer) => {
        const response = await api.put(`/Customers/${id}`, customer);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/Customers/${id}`);
        return response.data;
    }
};

export default customerService;