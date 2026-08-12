import api from "./api";

const getAll = async () => {
    const response = await api.get("/Addresses");
    return response.data;
};

const create = async (data) => {
    const response = await api.post("/Addresses", data);
    return response.data;
};

const update = async (addressId, data) => {
    const response = await api.put(`/Addresses/${addressId}`, data);
    return response.data;
};

const remove = async (id) => {
    await api.delete(`/Addresses/${id}`);
};

const setDefault = async (id, isDefault = true) => {
    const response = await api.put(
        `/Addresses/${id}/default`,
        { isDefault }
    );

    return response.data;
};

export default {
    getAll,
    create,
    update,
    remove,
    setDefault
};