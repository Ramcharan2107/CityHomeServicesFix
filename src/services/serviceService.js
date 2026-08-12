import api from "./api";

const getAll = async () => {
    const response = await api.get("/Services");
    return response.data;
};

const getById = async (id) => {
    const response = await api.get(`/Services/${id}`);
    return response.data;
};

const create = async (request) => {
    const response = await api.post("/Services", request);
    return response.data;
};

const update = async (id, request) => {
    const response = await api.put(`/Services/${id}`, request);
    return response.data;
};

const remove = async (id) => {
    const response = await api.delete(`/Services/${id}`);
    return response.data;
};

export default {
    getAll,
    getById,
    create,
    update,
    remove
};