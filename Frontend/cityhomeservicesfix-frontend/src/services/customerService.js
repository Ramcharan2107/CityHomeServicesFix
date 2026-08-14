import api from "./api";

const customerService = {

    // Get all registered users
    getAll: async () => {
        const response = await api.get("/Users");
        return response.data;
    },

    // Get one user
    getById: async (userId) => {
        const response = await api.get(`/Users/${userId}`);
        return response.data;
    },

    // Delete user account
    delete: async (userId) => {
        const response = await api.delete(`/Users/${userId}`);
        return response.data;
    },

    // Update user
    update: async (userId, data) => {
        const response = await api.put(
            `/Users/${userId}`,
            data
        );

        return response.data;
    }

};

export default customerService;