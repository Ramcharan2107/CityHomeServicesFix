import api from "./api";

// ----------------------
// Customer APIs
// ----------------------

const create = async (request) => {
    const response = await api.post("/ServiceRequests", request);
    return response.data;
};

const getAll = async () => {
    const response = await api.get("/ServiceRequests");
    return response.data;
};

const getById = async (id) => {
    const response = await api.get(`/ServiceRequests/${id}`);
    return response.data;
};

const updateStatus = async (request) => {
    const response = await api.put("/ServiceRequests/status", request);
    return response.data;
};

const remove = async (id) => {
    await api.delete(`/ServiceRequests/${id}`);
};

// ----------------------
// Admin APIs
// ----------------------

const getAllAdmin = async () => {
    const response = await api.get("/ServiceRequests/admin");
    return response.data;
};

const getAdminById = async (id) => {
    const response = await api.get(`/ServiceRequests/admin/${id}`);
    return response.data;
};

const updateAdminStatus = async (requestId, status) => {
    const response = await api.put("/ServiceRequests/admin/status", {
        requestId,
        status
    });

    return response.data;
};

export default {
    // Customer
    create,
    getAll,
    getById,
    updateStatus,
    remove,

    // Admin
    getAllAdmin,
    getAdminById,
    updateAdminStatus
};